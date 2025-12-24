#!/usr/bin/env bash
set -euo pipefail

echo "🔧 Installing dependencies..."
npm install

echo "🧱 Building project..."
npm run build

echo "🧪 Running tests..."
npm test

echo "📝 Checking package.json for --project flag..."
if grep -q "gcloud builds submit.*--project=" package.json; then
  echo "✅ Found --project flag in package.json"
else
  echo "❌ Could not find --project flag in package.json"
  exit 1
fi

echo "✅ Validation complete."
