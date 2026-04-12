# Auth Testing Guide

## Step 1: MongoDB Verification
```bash
mongosh
use match_live
db.users.find({role: "admin"}).pretty()
db.users.findOne({role: "admin"}, {password_hash: 1})
```
Verify: bcrypt hash starts with `$2b$`, indexes exist.

## Step 2: API Testing
```bash
# Login
curl -c cookies.txt -X POST http://localhost:8001/api/auth/login -H "Content-Type: application/json" -d '{"email":"admin@matchlive.com","password":"Admin123!"}'
cat cookies.txt

# Me endpoint
curl -b cookies.txt http://localhost:8001/api/auth/me

# Register
curl -c cookies2.txt -X POST http://localhost:8001/api/auth/register -H "Content-Type: application/json" -d '{"email":"newuser@test.com","password":"Test123!","name":"New User","city":"Barcelona"}'

# Profile update
curl -b cookies2.txt -X PUT http://localhost:8001/api/auth/profile -H "Content-Type: application/json" -d '{"city":"Madrid","budget":500}'

# Save property
curl -b cookies2.txt -X POST http://localhost:8001/api/saved/1

# Get saved
curl -b cookies2.txt http://localhost:8001/api/saved

# Unsave
curl -b cookies2.txt -X DELETE http://localhost:8001/api/saved/1

# Logout
curl -b cookies2.txt -X POST http://localhost:8001/api/auth/logout
```

## Brute Force Test
5 failed attempts = 15 min lockout (HTTP 429)
