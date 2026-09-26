# AgriSathi AI - Comprehensive Agriculture Intelligence Platform

AgriSathi AI is an end-to-end intelligent agricultural ecosystem featuring:
1. **Android Application**: Offline-capable, multilingual native app powered by Jetpack Compose, Room, CameraX, and local AI.
2. **Web Application**: Full-stack web portal featuring a React + TypeScript SPA frontend, Node.js/Express REST API backend, and Dockerized Nginx reverse proxy infrastructure.

---

## 📁 Repository Directory Structure

```text
agrisathi-ai/
│
├── app/                               # ANDROID APPLICATION MODULE (Jetpack Compose)
│   ├── proguard-rules.pro             # Code shrinking & obfuscation rules
│   ├── build.gradle.kts               # Android build script
│   └── src/
│       ├── androidTest/               # Android instrumented tests
│       ├── test/                      # JVM local unit tests
│       └── main/
│           ├── AndroidManifest.xml
│           ├── java/com/agrisathi/ai/
│           │   ├── AgriSathiApp.kt
│           │   ├── MainActivity.kt
│           │   ├── data/              # Local Room DB, Network & Repositories
│           │   ├── service/           # Voice guidance & background tasks
│           │   ├── ui/                # Compose screens, widgets & theme
│           │   └── util/              # Formatters, constants & resource wrappers
│           └── res/                   # Drawables, mipmaps & strings
│
├── web/                               # WEB APPLICATION PLATFORM
│   ├── frontend/                      # React 18 + TypeScript + Vite SPA
│   │   ├── src/
│   │   │   ├── components/            # Header, Sidebar, Weather, Scanner, Market cards
│   │   │   ├── context/               # Auth & Multilingual Language providers
│   │   │   ├── pages/                 # Dashboard, Scanner, Market, Planner, Alerts, Profile
│   │   │   ├── services/              # Axios REST API services
│   │   │   └── utils/                 # Currency & date formatters
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   ├── backend/                       # Node.js + Express + TypeScript REST API
│   │   ├── src/
│   │   │   ├── config/                # Environment & Database config
│   │   │   ├── controllers/           # Auth, Crop, Market, Weather handlers
│   │   │   ├── middlewares/           # JWT, Upload, Error & Rate Limiting
│   │   │   ├── models/                # User, CropScan, MarketPrice schemas
│   │   │   ├── routes/                # API router modules
│   │   │   ├── services/              # AI Crop diagnosis & Mandi services
│   │   │   └── utils/                 # Logging & response helpers
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   └── server/                        # Infrastructure & Deployment Orchestration
│       ├── nginx/                     # Nginx reverse proxy & load balancer
│       ├── scripts/                   # Automated deployment & DB seeding scripts
│       ├── docker-compose.yml         # Local development orchestration
│       └── docker-compose.prod.yml    # Production container orchestration
│
├── .github/                           # CI/CD Workflows
├── gradle/                            # Gradle wrapper distribution
├── .gitignore                         # Project-wide Git ignore rules
├── build.gradle.kts                   # Project-level Gradle build script
├── gradle.properties                  # Gradle JVM configuration
├── gradlew.bat                        # Windows Gradle wrapper script
└── settings.gradle.kts                # Project module inclusion
```

---

## 🚀 Getting Started

### 📱 Android Application
1. Open the project in **Android Studio**.
2. Run `./gradlew assembleDebug` or launch directly on an emulator / physical device.

### 🌐 Web Platform (Full Stack)
Run the entire stack with Docker:
```bash
cd web/server
docker compose up --build
```
- **Web UI**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000`
- **Nginx Gateway**: `http://localhost:80`
