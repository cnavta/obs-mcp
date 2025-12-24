#!/usr/bin/env bash
set -euo pipefail

echo "🔧 Installing dependencies..."
npm install

echo "🧱 Building project..."
npm run build

echo "🧪 Running tests..."
npm test

echo "🔍 Verifying documentation..."
grep -q "OBS_WEBSOCKET_SELF_SIGNED" README.md || (echo "❌ Documentation missing" && exit 1)

echo "✅ Validation complete."
