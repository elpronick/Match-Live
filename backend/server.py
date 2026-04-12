from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, HTTPException, Request, Response, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional
import os
import bcrypt
import jwt
import secrets
from datetime import datetime, timezone, timedelta
from bson import ObjectId
import motor.motor_asyncio

# --- Config ---
MONGO_URL = os.environ["MONGO_URL"]
DB_NAME = os.environ["DB_NAME"]
JWT_ALGORITHM = "HS256"

def get_jwt_secret():
    return os.environ["JWT_SECRET"]

# --- App ---
app = FastAPI(title="Match&Live API")

FRONTEND_URL = os.environ.get("FRONTEND_URL", "http://localhost:3000")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

# --- Password ---
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))

# --- JWT ---
def create_access_token(user_id: str, email: str) -> str:
    payload = {"sub": user_id, "email": email, "exp": datetime.now(timezone.utc) + timedelta(minutes=15), "type": "access"}
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)

def create_refresh_token(user_id: str) -> str:
    payload = {"sub": user_id, "exp": datetime.now(timezone.utc) + timedelta(days=7), "type": "refresh"}
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)

def set_auth_cookies(response: Response, access_token: str, refresh_token: str):
    response.set_cookie(key="access_token", value=access_token, httponly=True, secure=False, samesite="lax", max_age=900, path="/")
    response.set_cookie(key="refresh_token", value=refresh_token, httponly=True, secure=False, samesite="lax", max_age=604800, path="/")

# --- Auth Helper ---
async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        user["_id"] = str(user["_id"])
        user.pop("password_hash", None)
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

def serialize_user(user: dict) -> dict:
    u = {**user}
    u["_id"] = str(u["_id"]) if isinstance(u.get("_id"), ObjectId) else u.get("_id")
    u.pop("password_hash", None)
    if "created_at" in u and isinstance(u["created_at"], datetime):
        u["created_at"] = u["created_at"].isoformat()
    if "updated_at" in u and isinstance(u["updated_at"], datetime):
        u["updated_at"] = u["updated_at"].isoformat()
    return u

# --- Brute Force ---
async def check_brute_force(ip: str, email: str):
    identifier = f"{ip}:{email}"
    record = await db.login_attempts.find_one({"identifier": identifier})
    if record and record.get("attempts", 0) >= 5:
        lockout_until = record.get("lockout_until")
        if lockout_until:
            now = datetime.now(timezone.utc)
            if lockout_until.tzinfo is None:
                lockout_until = lockout_until.replace(tzinfo=timezone.utc)
            if now < lockout_until:
                raise HTTPException(status_code=429, detail="Too many failed attempts. Try again in 15 minutes.")
            else:
                await db.login_attempts.delete_one({"identifier": identifier})

async def record_failed_attempt(ip: str, email: str):
    identifier = f"{ip}:{email}"
    await db.login_attempts.update_one(
        {"identifier": identifier},
        {"$inc": {"attempts": 1}, "$setOnInsert": {"identifier": identifier}},
        upsert=True
    )
    record = await db.login_attempts.find_one({"identifier": identifier})
    if record and record.get("attempts", 0) >= 5 and not record.get("lockout_until"):
        await db.login_attempts.update_one(
            {"identifier": identifier},
            {"$set": {"lockout_until": datetime.now(timezone.utc) + timedelta(minutes=15)}}
        )

async def clear_failed_attempts(ip: str, email: str):
    await db.login_attempts.delete_one({"identifier": f"{ip}:{email}"})

# --- Models ---
class RegisterRequest(BaseModel):
    email: str
    password: str
    name: str
    city: Optional[str] = ""
    budget: Optional[int] = 0
    lifestyle: Optional[str] = ""
    description: Optional[str] = ""

class LoginRequest(BaseModel):
    email: str
    password: str

class ProfileUpdate(BaseModel):
    name: Optional[str] = None
    city: Optional[str] = None
    budget: Optional[int] = None
    lifestyle: Optional[str] = None
    description: Optional[str] = None

class ForgotPasswordRequest(BaseModel):
    email: str

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str

# --- Startup ---
@app.on_event("startup")
async def startup():
    await db.users.create_index("email", unique=True)
    await db.password_reset_tokens.create_index("expires_at", expireAfterSeconds=0)
    await db.login_attempts.create_index("identifier")
    await db.saved_properties.create_index([("user_id", 1), ("property_id", 1)], unique=True)
    await seed_admin()

async def seed_admin():
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@matchlive.com").lower()
    admin_password = os.environ.get("ADMIN_PASSWORD", "Admin123!")
    existing = await db.users.find_one({"email": admin_email})
    if existing is None:
        await db.users.insert_one({
            "email": admin_email,
            "password_hash": hash_password(admin_password),
            "name": "Admin",
            "city": "Madrid",
            "budget": 0,
            "lifestyle": "",
            "description": "Administrador de Match&Live",
            "role": "admin",
            "created_at": datetime.now(timezone.utc),
        })
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.users.update_one({"email": admin_email}, {"$set": {"password_hash": hash_password(admin_password)}})

# --- Health ---
@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "Match&Live"}

# --- Auth Endpoints ---
@app.post("/api/auth/register")
async def register(req: RegisterRequest, response: Response):
    email = req.email.strip().lower()
    if len(req.password) < 6:
        raise HTTPException(status_code=400, detail="La contraseña debe tener al menos 6 caracteres")
    existing = await db.users.find_one({"email": email})
    if existing:
        raise HTTPException(status_code=400, detail="Ya existe una cuenta con este email")
    user_doc = {
        "email": email,
        "password_hash": hash_password(req.password),
        "name": req.name.strip(),
        "city": req.city or "",
        "budget": req.budget or 0,
        "lifestyle": req.lifestyle or "",
        "description": req.description or "",
        "role": "user",
        "created_at": datetime.now(timezone.utc),
    }
    result = await db.users.insert_one(user_doc)
    user_doc["_id"] = result.inserted_id
    access = create_access_token(str(user_doc["_id"]), email)
    refresh = create_refresh_token(str(user_doc["_id"]))
    set_auth_cookies(response, access, refresh)
    return serialize_user(user_doc)

@app.post("/api/auth/login")
async def login(req: LoginRequest, request: Request, response: Response):
    email = req.email.strip().lower()
    ip = request.headers.get("X-Forwarded-For", request.headers.get("X-Real-IP", request.client.host if request.client else "unknown")).split(",")[0].strip()
    await check_brute_force(ip, email)
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(req.password, user["password_hash"]):
        await record_failed_attempt(ip, email)
        raise HTTPException(status_code=401, detail="Email o contraseña incorrectos")
    await clear_failed_attempts(ip, email)
    access = create_access_token(str(user["_id"]), email)
    refresh = create_refresh_token(str(user["_id"]))
    set_auth_cookies(response, access, refresh)
    return serialize_user(user)

@app.post("/api/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
    return {"message": "Sesion cerrada"}

@app.get("/api/auth/me")
async def me(request: Request):
    user = await get_current_user(request)
    return user

@app.post("/api/auth/refresh")
async def refresh_token(request: Request, response: Response):
    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(status_code=401, detail="No refresh token")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        access = create_access_token(str(user["_id"]), user["email"])
        response.set_cookie(key="access_token", value=access, httponly=True, secure=False, samesite="lax", max_age=900, path="/")
        return {"message": "Token refreshed"}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Refresh token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

# --- Profile ---
@app.put("/api/auth/profile")
async def update_profile(req: ProfileUpdate, request: Request):
    user = await get_current_user(request)
    update_data = {}
    if req.name is not None:
        update_data["name"] = req.name.strip()
    if req.city is not None:
        update_data["city"] = req.city
    if req.budget is not None:
        update_data["budget"] = req.budget
    if req.lifestyle is not None:
        update_data["lifestyle"] = req.lifestyle
    if req.description is not None:
        update_data["description"] = req.description
    if update_data:
        update_data["updated_at"] = datetime.now(timezone.utc)
        await db.users.update_one({"_id": ObjectId(user["_id"])}, {"$set": update_data})
    updated = await db.users.find_one({"_id": ObjectId(user["_id"])})
    return serialize_user(updated)

# --- Saved Properties ---
@app.post("/api/saved/{property_id}")
async def save_property(property_id: int, request: Request):
    user = await get_current_user(request)
    try:
        await db.saved_properties.insert_one({
            "user_id": user["_id"],
            "property_id": property_id,
            "saved_at": datetime.now(timezone.utc),
        })
    except Exception:
        pass
    return {"message": "Guardado"}

@app.delete("/api/saved/{property_id}")
async def unsave_property(property_id: int, request: Request):
    user = await get_current_user(request)
    await db.saved_properties.delete_one({"user_id": user["_id"], "property_id": property_id})
    return {"message": "Eliminado de guardados"}

@app.get("/api/saved")
async def get_saved(request: Request):
    user = await get_current_user(request)
    cursor = db.saved_properties.find({"user_id": user["_id"]}, {"_id": 0, "property_id": 1, "saved_at": 1})
    saved = []
    async for doc in cursor:
        if "saved_at" in doc and isinstance(doc["saved_at"], datetime):
            doc["saved_at"] = doc["saved_at"].isoformat()
        saved.append(doc)
    return saved

# --- Forgot / Reset Password ---
@app.post("/api/auth/forgot-password")
async def forgot_password(req: ForgotPasswordRequest):
    email = req.email.strip().lower()
    user = await db.users.find_one({"email": email})
    if not user:
        return {"message": "Si el email existe, recibirás instrucciones para resetear tu contraseña"}
    token = secrets.token_urlsafe(32)
    await db.password_reset_tokens.insert_one({
        "token": token,
        "user_id": str(user["_id"]),
        "expires_at": datetime.now(timezone.utc) + timedelta(hours=1),
        "used": False,
    })
    print(f"[RESET LINK] {FRONTEND_URL}/reset-password?token={token}")
    return {"message": "Si el email existe, recibirás instrucciones para resetear tu contraseña"}

@app.post("/api/auth/reset-password")
async def reset_password(req: ResetPasswordRequest):
    record = await db.password_reset_tokens.find_one({"token": req.token, "used": False})
    if not record:
        raise HTTPException(status_code=400, detail="Token inválido o expirado")
    if record["expires_at"] < datetime.now(timezone.utc):
        raise HTTPException(status_code=400, detail="Token expirado")
    if len(req.new_password) < 6:
        raise HTTPException(status_code=400, detail="La contraseña debe tener al menos 6 caracteres")
    await db.users.update_one(
        {"_id": ObjectId(record["user_id"])},
        {"$set": {"password_hash": hash_password(req.new_password)}}
    )
    await db.password_reset_tokens.update_one({"token": req.token}, {"$set": {"used": True}})
    return {"message": "Contraseña actualizada correctamente"}
