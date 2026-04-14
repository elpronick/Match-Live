# Match-Live

App para encontrar habitacion en piso compartido, con frontend en React y backend en FastAPI.

## Estructura actual

- `frontend/`: aplicacion cliente en React
- `backend/`: API en FastAPI
- `.github/workflows/`: automatizaciones de despliegue
- `memory/` y `test_reports/`: archivos auxiliares del proyecto

## Como arrancar el proyecto

### Frontend

```powershell
cd frontend
npm install
npm start
```

La app de desarrollo se sirve con Vite.

### Backend

```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements-local.txt
uvicorn server:app --reload
```

Si necesitas todas las dependencias del backend, usa `requirements.txt` en lugar de `requirements-local.txt`.

## Deploy

GitHub Pages publica el frontend mediante GitHub Actions usando el workflow:

- `.github/workflows/deploy-pages.yml`

Ese workflow construye `frontend/dist` y lo despliega en Pages al hacer push a `main`.
