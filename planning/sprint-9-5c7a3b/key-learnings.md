# Key Learnings – sprint-9-5c7a3b

- **Cloud Build Substitutions**: Any string in `args` starting with `$` that isn't a known substitution must be escaped with `$$` if it's intended for the shell, otherwise Cloud Build will fail the build if it doesn't recognize it as a valid substitution.
- **Bash in Cloud Build**: When using `bash -c` in Cloud Build steps, double-check all shell variables for proper escaping to avoid conflicts with the Cloud Build template engine.
