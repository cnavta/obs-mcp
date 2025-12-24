# Key Learnings – sprint-11-8b2d4e

- **Global Interception**: To add logging to all MCP tools, wrap `server.tool` early in the server lifecycle.
- **Transport Safety**: Always use `stderr` for logs in MCP servers to prevent protocol corruption on `stdout`.
- **SSE Visibility**: Adding a simple middleware to Express `app.use((req, res, next) => { ... })` is sufficient for basic request tracking.
- **Timestamps**: ISO timestamps in logs are essential for correlating server events with client behavior.
