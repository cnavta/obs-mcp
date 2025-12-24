# Retro – sprint-4-b3d9e2

## What Worked
- Quick identification of image path changes in `cloudbuild.yaml`.
- Validation script confirmed both the presence of new paths and the absence of old ones.

## What Didn't
- Ambiguity in Artifact Registry path format (repository vs image name) required some interpretation.

## Lessons for Future Sprints
- Artifact Registry migration is straightforward but requires consistent updating across `steps` and `images` sections.
