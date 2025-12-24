#!/usr/bin/env bash
set -euo pipefail

echo "🔧 Installing dependencies..."
npm install

echo "🧱 Building project..."
npm run build

echo "🧪 Running tests..."
npm test

echo "🐳 Verifying Docker artifacts..."
if [ -f "Dockerfile" ] && [ -f "docker-compose.yml" ] && [ -f ".dockerignore" ]; then
    echo "✅ Docker artifacts exist"
else
    echo "❌ Missing Docker artifacts"
    exit 1
fi

echo "🚀 Verifying Cloud Build config..."
if [ -f "cloudbuild.yaml" ]; then
    echo "✅ cloudbuild.yaml exists"
else
    echo "❌ cloudbuild.yaml missing"
    exit 1
fi

echo "📝 Checking for documentation updates..."
if grep -q "Remote Access (SSE)" README.md; then
    echo "✅ README updated with SSE info"
else
    echo "❌ README missing SSE info"
    exit 1
fi

echo "✅ Validation complete."
