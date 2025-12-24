# Retro – sprint-6-f9e4a2

## What worked
- Quick identification of the issue: `gcloud` doesn't automatically use `PROJECT_ID` env var.
- Simple fix in `package.json` using shell expansion.

## What didn’t
- Initial search for the hardcoded ID failed because it was only in an IDE-specific file (`.idea/workspace.xml`) which is often ignored by standard search tools or not considered part of the "production" code.

## Next Steps
- Monitor if users still report issues with `GOOGLE_APPLICATION_CREDENTIALS`. Standard `gcloud` behavior should respect it, but if they have multiple accounts it might be tricky.
