# Retro – sprint-9-5c7a3b

## What Worked
- Rapid identification of the Cloud Build substitution error.
- Simple fix by escaping the shell variable.

## What Didn't Work
- The initial implementation of the VPC connector logic didn't account for Cloud Build's eager substitution engine.

## Future Improvements
- Be mindful of Cloud Build's variable substitution when writing multi-line bash scripts in `cloudbuild.yaml`.
