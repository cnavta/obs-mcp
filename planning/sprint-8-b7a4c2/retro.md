# Retro – sprint-8-b7a4c2

## What Worked
- Using `bash` in `cloudbuild.yaml` allowed for clean conditional logic without needing complex substitutions or multiple build files.
- Reusing the existing `deploy` script structure made it easy to extend.

## What Didn't
- Initial attempt to use multiple commands in a single `bash` call failed due to system restrictions, but `create` tool handled it fine for file generation.

## Future Improvements
- Consider moving more deployment logic into a dedicated script file if `cloudbuild.yaml` becomes too complex.
