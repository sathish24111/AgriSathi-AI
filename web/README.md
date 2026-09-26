# AgriSathi AI - Web Platform

This directory contains the full-stack web application structure for AgriSathi AI, divided into modular components for frontend, backend, and server deployment orchestration.

## 📂 Architecture Overview

```text
web/
├── frontend/                  # Modern React + TypeScript SPA (Vite)
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── assets/            # Images, icons, SVGs
│   │   ├── components/        # Reusable UI widgets & layouts
│   │   ├── context/           # React Context (Auth, Language)
│   │   ├── hooks/             # Custom React Hooks
│   │   ├── pages/             # Route pages (Dashboard, Scanner, Market, etc.)
│   │   ├── services/          # REST API clients (Axios / Fetch)
│   │   ├── styles/            # Tailwind / CSS stylesheets
│   │   ├── types/             # TypeScript interfaces
│   │   └── utils/             # Helper functions
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                   # Node.js + Express + TypeScript REST API
│   ├── src/
│   │   ├── config/            # DB & Environment configs
│   │   ├── controllers/       # HTTP Request Handlers
│   │   ├── middlewares/       # Auth, Upload, Error & Rate Limiting
│   │   ├── models/            # Database Models / Schemas
│   │   ├── routes/            # Express API Routes
│   │   ├── services/          # Business logic & AI crop diagnosis
│   │   └── utils/             # Loggers & Response Formatters
│   ├── package.json
│   └── tsconfig.json
│
└── server/                    # Deployment & Infrastructure Configuration
    ├── nginx/                 # Nginx Reverse Proxy & Load Balancer
    ├── scripts/               # Automation & Deployment shell scripts
    ├── docker-compose.yml     # Multi-container local orchestration
    └── docker-compose.prod.yml# Production deployment configuration
```

