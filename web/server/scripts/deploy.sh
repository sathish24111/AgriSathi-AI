#!/usr/bin/env bash
set -e

echo "🚀 Starting AgriSathi AI Production Deployment..."

# 1. Pull latest git changes
git pull origin main

# 2. Build and restart containers using production compose
docker compose -f ../server/docker-compose.prod.yml down
docker compose -f ../server/docker-compose.prod.yml build --no-cache
docker compose -f ../server/docker-compose.prod.yml up -d

echo "✅ AgriSathi AI deployed successfully and running with Nginx reverse proxy!"

