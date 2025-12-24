# Implementation Plan – sprint-10-8f9a2b

## Objective
Update the WebSocket implementation to accept self-signed certificates when the `OBS_WEBSOCKET_SELF_SIGNED` environment variable is set to `true`.

## Scope
- Modify `OBSWebSocketClient` in `src/client.ts` to support the `rejectUnauthorized` option.
- Update `src/server.ts` if needed (though it currently just passes the URL and password to the client).
- Update `README.md` to document the new environment variable.

## Deliverables
- **Code Changes**: Updated `src/client.ts` to handle self-signed certificates.
- **Documentation**: Updated `README.md` with instructions for `OBS_WEBSOCKET_SELF_SIGNED`.

## Acceptance Criteria
- [ ] The client can connect to a WebSocket server with a self-signed certificate when `OBS_WEBSOCKET_SELF_SIGNED=true`.
- [ ] The client still rejects self-signed certificates by default (when the variable is not set or set to `false`).
- [ ] Existing tests still pass.

## Testing Strategy
- **Unit Tests**: Add a test case to verify that the `rejectUnauthorized` option is correctly passed to the `WebSocket` constructor based on the environment variable.
- **Manual Verification**: Since I don't have a live OBS with a self-signed cert to test against easily in this environment, I will rely on unit tests and code inspection.

## Definition of Done
- Feature implemented.
- Unit tests added and passing.
- `validate_deliverable.sh` passes.
- Documentation updated.
