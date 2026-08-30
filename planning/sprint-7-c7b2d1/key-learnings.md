# Key Learnings – sprint-7-c7b2d1

- **Cloud Build Substitutions**: Default substitutions like `$COMMIT_SHA` and `$SHORT_SHA` are only available when the build is triggered by a source repository (e.g., via a push).
- **Manual Builds**: When running `gcloud builds submit`, these variables are not automatically populated, which can lead to invalid resource names if they are used as tags.
- **Robust Configuration**: Always define custom substitutions (starting with `_`) and provide reasonable defaults in the `substitutions` block of `cloudbuild.yaml` to ensure the build works in both manual and automated contexts.
