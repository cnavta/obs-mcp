#!/usr/bin/env bash
set -euo pipefail

echo "🔧 Installing dependencies..."
npm install

echo "🧱 Building project..."
npm run build

echo "🧪 Running tests..."
npm test

echo "🔍 Verifying cloudbuild.yaml fix..."
if grep -q "\$\$VPC_ARGS" cloudbuild.yaml; then
  echo "✅ cloudbuild.yaml uses escaped \$\$VPC_ARGS."
else
  echo "❌ cloudbuild.yaml does NOT use escaped \$\$VPC_ARGS."
  exit 1
fi

echo "✅ Validation complete."
