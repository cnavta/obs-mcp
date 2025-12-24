# Deliverable Verification – sprint-8-b7a4c2

## Completed
- [x] Updated `cloudbuild.yaml` to support optional VPC connector.
- [x] Updated `package.json` to pass `VPC_CONNECTOR` environment variable.
- [x] Implemented conditional logic in Cloud Build via bash.
- [x] Verified build and tests pass.

## Partial
None.

## Deferred
None.

## Alignment Notes
- Ingress is set to `internal-and-cloud-load-balancing` ONLY if a VPC connector is provided.
- Authentication remains public (`--allow-unauthenticated`) as per instructions.
