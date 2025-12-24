# Retro – sprint-7-c7b2d1

## What Worked
- Identifying the missing `$COMMIT_SHA` as the root cause of the invalid image name.
- Using user-defined substitutions with defaults to make the build robust against different execution contexts (manual vs. trigger).
- Automated validation of the configuration changes.

## What Didn't Work
- Initial thought of using `COMMIT_SHA` directly in command line might have worked but custom variables with underscores are safer in Cloud Build.

## Improvements for Future Sprints
- Always provide defaults for substitutions in `cloudbuild.yaml` to avoid "brittle" builds that only work when triggered by a specific event.
