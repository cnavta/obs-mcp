# Deliverable Verification – sprint-10-8f9a2b

## Completed
- [x] Modified `OBSWebSocketClient` to accept `selfSigned` option.
- [x] Integrated `OBS_WEBSOCKET_SELF_SIGNED` environment variable in `server.ts`.
- [x] Added unit tests in `src/client.test.ts` to verify `WebSocket` options.
- [x] Updated `README.md` with the new environment variable.
- [x] Verified all tests pass (10/10).

## Partial
- None

## Deferred
- None

## Alignment Notes
- The implementation uses `rejectUnauthorized: false` when `OBS_WEBSOCKET_SELF_SIGNED=true`, which is the standard way to handle self-signed certificates in the `ws` library.
