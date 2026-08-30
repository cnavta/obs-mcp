# Key Learnings – sprint-4-b3d9e2

- **Artifact Registry Paths**: Standard format is `[LOCATION]-docker.pkg.dev/[PROJECT]/[REPOSITORY]/[IMAGE]`. When migrating from GCR, it's common to use the same name for both the repository and the image if a specialized structure isn't requested.
- **Cloud Build `images` section**: Remember to update the top-level `images` list in `cloudbuild.yaml` so Artifact Registry correctly associates the built images with the build result.
