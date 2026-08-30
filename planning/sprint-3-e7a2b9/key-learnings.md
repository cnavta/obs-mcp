# Key Learnings – sprint-3-e7a2b9

## Technical
- **MCP SSE**: `SSEServerTransport` in the MCP SDK requires a specific pairing of `GET /sse` and `POST /messages`. It handles the long-lived response for SSE.
- **Express + MCP**: Don't use `express.json()` globally if you want MCP transports to handle the request stream themselves, although for SSE `POST /messages`, the SDK usually handles it.
- **Docker + OBS**: When running in Docker, `localhost` refers to the container. Use `host.docker.internal` (and `extra_hosts` in compose) to reach OBS running on the host machine.

## Process
- **Sprint Continuity**: Reusing the backlog and implementation plan from a "Planning" sprint into an "Execution" sprint works well for maintaining traceability.
- **Validation Scripts**: Including checks for specific README sections in `validate_deliverable.sh` ensures documentation doesn't lag behind code.
