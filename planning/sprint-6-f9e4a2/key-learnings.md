# Key Learnings – sprint-6-f9e4a2

- **gcloud environment variables**: `gcloud` command-line tool does not automatically pick up `PROJECT_ID` as the active project. It must be explicitly passed via `--project` or set via `gcloud config set project`.
- **package.json scripts**: Using shell expansion like `${VAR:-default}` in `package.json` scripts is a powerful way to provide defaults while allowing environment overrides.
