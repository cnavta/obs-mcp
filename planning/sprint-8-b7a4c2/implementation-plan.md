# Implementation Plan – sprint-8-b7a4c2

## Objective
Update the deployment script to support an optional Serverless VPC Access connector and configure Cloud Run networking and authentication accordingly.

## Scope
- Modify `cloudbuild.yaml` to handle conditional deployment flags for VPC and Ingress.
- Modify `package.json` to allow passing the VPC connector name via environment variable.
- Ensure authentication remains public when the connector is used.

## Deliverables
- Updated `cloudbuild.yaml`
- Updated `package.json`
- `validate_deliverable.sh` script

## Acceptance Criteria
- [ ] `npm run deploy` accepts an optional `VPC_CONNECTOR` environment variable.
- [ ] If `VPC_CONNECTOR` is set, the Cloud Run deployment includes `--vpc-connector`, `--ingress=internal-and-cloud-load-balancing`, and `--allow-unauthenticated`.
- [ ] If `VPC_CONNECTOR` is not set, the Cloud Run deployment behaves as before (no VPC, default ingress, `--allow-unauthenticated`).
- [ ] The build and tests still pass before deployment.

## Testing Strategy
- **Validation Script**: A script that checks the `cloudbuild.yaml` and `package.json` for the required changes.
- **Dry Run**: Verify that `gcloud builds submit` command in `package.json` is correctly formed.

## Definition of Done
- Code changes implemented.
- Validation script passes.
- Sprint artifacts created and documented.
