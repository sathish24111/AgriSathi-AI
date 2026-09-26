# AgriSathi AI - Server & Infrastructure Orchestration

This directory houses the containerization, reverse proxying, and deployment scripts for the AgriSathi AI web application.

## 🚀 Running with Docker Compose

### Local Development Setup:
```bash
cd web/server
docker compose up --build
```
This spins up:
- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000`
- **Nginx Gateway**: `http://localhost:80` (routes `/api` to backend and root `/` to frontend)

---

### Production Deployment:
```bash
cd web/server
docker compose -f docker-compose.prod.yml up --build -d
```
Or use the automated deploy script:
```bash
bash scripts/deploy.sh
```

