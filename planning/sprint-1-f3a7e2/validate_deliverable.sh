#!/usr/bin/env bash
set -euo pipefail

echo "🔧 Checking sprint artifacts..."

# Check if sprint directory and required files exist
SPRINT_DIR="planning/sprint-1-f3a7e2"
FILES=(
  "sprint-manifest.yaml"
  "implementation-plan.md"
  "backlog.yaml"
  "request-log.md"
)

for file in "${FILES[@]}"; do
  if [ ! -f "$SPRINT_DIR/$file" ]; then
    echo "❌ Missing $file in $SPRINT_DIR"
    exit 1
  fi
done

echo "✅ Sprint artifacts present."

echo "📄 Checking Technical Architecture document..."
ARCH_DOC="docs/architecture/remote-access-containerization.md"
if [ ! -f "$ARCH_DOC" ]; then
  echo "❌ Missing $ARCH_DOC"
  exit 1
fi
echo "✅ Architecture document present."

echo "🧱 Building project to ensure no regressions..."
npm install
npm run build

echo "🧪 Running tests..."
npm test

echo "✅ Validation complete."
