# Implementation Plan – sprint-7-c7b2d1

## Objective
Fix the "invalid image name" error in Cloud Build by ensuring a valid tag is always used, even during manual builds.

## Scope
- Modify `package.json` to pass the current git commit SHA as a substitution to Cloud Build.
- Update `cloudbuild.yaml` to use a substitution variable for the image tag with a safe default.

## Deliverables
- Updated `package.json`
- Updated `cloudbuild.yaml`
- Sprint artifacts (manifest, plan, backlog, etc.)

## Acceptance Criteria
- [ ] `npm run deploy` command (dry-run if possible) correctly formats the image names.
- [ ] `cloudbuild.yaml` is syntactically correct and handles missing tags gracefully.
- [ ] The image name in the error `.../obs-mcp:` is resolved (it should have a tag after the colon).

## Testing Strategy
- Manual verification of the `gcloud builds submit` command string.
- Validation script to check for common pitfalls in `cloudbuild.yaml` and `package.json`.

## Definition of Done
- Fix implemented and verified.
- Validation script passes.
- PR created (noting expected 403 failure in this environment).
