#!/usr/bin/env bash
set -euo pipefail

SPRINT_ID="sprint-2-0ec1f2"
SPRINT_DIR="planning/$SPRINT_ID"

echo "🔍 Validating artifacts for $SPRINT_ID..."

REQUIRED_FILES=(
  "sprint-manifest.yaml"
  "implementation-plan.md"
  "backlog.yaml"
  "request-log.md"
)

for file in "${REQUIRED_FILES[@]}"; do
  if [ -f "$SPRINT_DIR/$file" ]; then
    echo "✅ Found $file"
  else
    echo "❌ Missing $file"
    exit 1
  fi
done

echo "🧱 Checking project buildability..."
npm run build

echo "🧪 Running existing tests..."
npm test

echo "✅ Validation successful."
