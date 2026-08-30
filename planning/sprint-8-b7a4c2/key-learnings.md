# Key Learnings – sprint-8-b7a4c2

## Technical
- Cloud Build substitutions are simple string replacements. To implement conditional logic based on them, use a shell entrypoint in the build step.
- `gcloud run deploy` flags like `--ingress` can be combined with `--vpc-connector` to satisfy specific networking requirements.

## Process
- Always check the current state of `cloudbuild.yaml` before adding new flags to ensure they don't conflict with existing ones (e.g., `--allow-unauthenticated`).
