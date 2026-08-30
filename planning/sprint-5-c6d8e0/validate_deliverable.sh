#!/usr/bin/env bash
set -euo pipefail

echo "🔧 Installing dependencies..."
npm install

echo "🧱 Building project..."
npm run build

echo "🧪 Running tests..."
npm test

echo "📝 Checking package.json for deploy script..."
grep -q "\"deploy\":" package.json || (echo "❌ deploy script missing in package.json" && exit 1)

echo "✅ Validation complete."
