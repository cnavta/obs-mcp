# Implementation Plan – sprint-6-f9e4a2

## Objective
Remediate the hardcoded deployment project issue by ensuring the `deploy` script in `package.json` respects the `PROJECT_ID` environment variable.

## Scope
- Modify `package.json` to include the `--project` flag in the `gcloud builds submit` command.
- Ensure the `PROJECT_ID` environment variable is used if present, falling back to the default gcloud project if not.
- Verify that `GOOGLE_APPLICATION_CREDENTIALS` is respected by `gcloud` (this is standard behavior, but worth noting).

## Deliverables
- Updated `package.json` with a flexible `deploy` script.

## Acceptance Criteria
- [ ] `npm run deploy` uses the `--project` flag.
- [ ] If `PROJECT_ID` is set in the environment, `gcloud` uses that project.
- [ ] If `PROJECT_ID` is not set, `gcloud` uses its default configuration.

## Testing Strategy
- Manual inspection of `package.json`.
- Validation script to check the presence of the `--project` flag.
- Dry-run verification if possible.

## Deployment Approach
- Continue using `gcloud builds submit` but with better parameterization.

## Definition of Done
- Change implemented and verified.
- `validate_deliverable.sh` passes.
- PR created.
