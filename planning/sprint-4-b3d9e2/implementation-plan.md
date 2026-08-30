# Implementation Plan – sprint-4-b3d9e2

## Objective
Update the cloud build process to publish the generated container to Google Artifact Registry at `us-central1-docker.pkg.dev/$PROJECT_ID/obs-mcp`.

## Scope
- Modify `cloudbuild.yaml` to use the new Artifact Registry path for building, pushing, and deploying.
- Update `README.md` if it contains hardcoded GCR paths or instructions.
- Ensure the build process remains functional.

## Deliverables
- Updated `cloudbuild.yaml`.
- Updated `README.md`.

## Acceptance Criteria
- `cloudbuild.yaml` uses `us-central1-docker.pkg.dev/$PROJECT_ID/obs-mcp` for all image references.
- `validate_deliverable.sh` passes (checking file contents and basic build).

## Testing Strategy
- Manual inspection of `cloudbuild.yaml`.
- Run `validate_deliverable.sh` to ensure no regressions in build/test.

## Deployment Approach
- Cloud Build (dry-run/linting if possible).

## Dependencies
- GCP Project with Artifact Registry enabled and repository `obs-mcp` created (assumed as per instruction).

## Definition of Done
- `cloudbuild.yaml` updated.
- `README.md` updated.
- Sprint artifacts completed.
- PR created (locally).
