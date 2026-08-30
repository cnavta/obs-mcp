# Deliverable Verification – sprint-7-c7b2d1

## Completed
- [x] Updated `cloudbuild.yaml` to use `_COMMIT_SHA` substitution.
- [x] Added `substitutions` block to `cloudbuild.yaml` with default `_COMMIT_SHA: 'latest'`.
- [x] Updated `package.json` deploy script to pass `_COMMIT_SHA` using `git rev-parse`.
- [x] Verified that the server still builds and all tests pass.
- [x] Verified that `cloudbuild.yaml` and `package.json` contain the expected changes.

## Partial
None.

## Deferred
None.

## Alignment Notes
- Using `_COMMIT_SHA` (with underscore) is standard practice for user-defined substitutions in Cloud Build, ensuring compatibility with manual builds while allowing triggers to override it if configured.
