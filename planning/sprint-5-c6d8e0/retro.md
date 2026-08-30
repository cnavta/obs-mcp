# Retro – sprint-5-c6d8e0

## What Worked
- Implementing the requested script was straightforward.
- Chaining commands in `package.json` provides a simple entry point for developers.

## What Didn't Work
- Initial attempts to create files using `printf` in `bash` failed for long strings, requiring a switch to the `create` tool.
- Directory context was lost at some point, requiring explicit `cd` or absolute paths.

## Key Learnings
- Use absolute paths or always verify `pwd` when using tools that rely on the filesystem.
- `package.json` scripts are a powerful way to document and standardize the development workflow.
