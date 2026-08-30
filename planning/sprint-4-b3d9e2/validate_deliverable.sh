#!/usr/bin/env bash
set -euo pipefail

echo "🧪 Validating sprint-4-b3d9e2..."

echo "🧱 Building project..."
npm run build

echo "🧪 Running tests..."
npm test

echo "🔍 Checking cloudbuild.yaml for Artifact Registry paths..."
if grep -q "us-central1-docker.pkg.dev/\$PROJECT_ID/obs-mcp" cloudbuild.yaml; then
  echo "✅ cloudbuild.yaml updated correctly."
else
  echo "❌ cloudbuild.yaml does NOT contain the Artifact Registry path."
  exit 1
fi

if grep -q "gcr.io/\$PROJECT_ID/obs-mcp" cloudbuild.yaml; then
  echo "❌ cloudbuild.yaml still contains old GCR paths."
  exit 1
else
  echo "✅ cloudbuild.yaml GCR paths removed."
fi

echo "✅ Validation complete."
