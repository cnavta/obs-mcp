#!/usr/bin/env bash
set -euo pipefail

echo "🔧 Installing dependencies..."
npm install

echo "🧱 Building project..."
npm run build

echo "🧪 Running tests..."
npm test

echo "📝 Checking cloudbuild.yaml for VPC support..."
grep "_VPC_CONNECTOR" cloudbuild.yaml
grep "VPC_ARGS" cloudbuild.yaml
grep "internal-and-cloud-load-balancing" cloudbuild.yaml

echo "📝 Checking package.json for VPC_CONNECTOR support..."
grep "_VPC_CONNECTOR=\${VPC_CONNECTOR:-}" package.json

echo "✅ Validation complete."
