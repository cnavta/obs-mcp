# Deliverable Verification – sprint-6-f9e4a2

## Completed
- [x] Updated `package.json` deploy script to use `--project=${PROJECT_ID:-$(gcloud config get-value project)}`.
- [x] Verified that the `--project` flag is present.
- [x] All tests passed.

## Partial
None.

## Deferred
None.

## Alignment Notes
- The fix addresses the user's report that environment variables were being ignored. By explicitly passing the project ID to the `gcloud` command, we ensure it respects the environment.
