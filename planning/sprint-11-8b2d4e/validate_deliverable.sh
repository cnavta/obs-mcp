#!/usr/bin/env bash
set -euo pipefail

echo "🔧 Installing dependencies..."
npm install

echo "🧱 Building project..."
npm run build

echo "🧪 Running tests..."
npm test

echo "🔍 Verifying logging implementation..."
# Check if the code contains the logging logic
if grep -q "MCP Tool Request" src/server.ts && grep -q "HTTP \${req.method}" src/server.ts; then
  echo "✅ Logging logic found in src/server.ts"
else
  echo "❌ Logging logic missing in src/server.ts"
  exit 1
fi

echo "✅ Validation complete."
