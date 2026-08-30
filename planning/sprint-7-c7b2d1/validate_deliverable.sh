#!/usr/bin/env bash
set -euo pipefail

echo "🔧 Installing dependencies..."
npm install

echo "🧱 Building project..."
npm run build

echo "🧪 Running tests..."
npm test

echo "🔍 Verifying cloudbuild.yaml..."
if grep -q "_COMMIT_SHA" cloudbuild.yaml && grep -q "substitutions:" cloudbuild.yaml; then
  echo "✅ cloudbuild.yaml uses _COMMIT_SHA and has substitutions."
else
  echo "❌ cloudbuild.yaml is missing _COMMIT_SHA or substitutions block."
  exit 1
fi

echo "🔍 Verifying package.json deploy script..."
if grep -q "_COMMIT_SHA=\$(git rev-parse --short HEAD" package.json; then
  echo "✅ package.json deploy script correctly passes _COMMIT_SHA."
else
  echo "❌ package.json deploy script is incorrect."
  exit 1
fi

echo "✅ Validation complete."
