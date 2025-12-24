# Retro – sprint-10-8f9a2b

## What Worked
- The `ws` library's `rejectUnauthorized` option made the implementation straightforward.
- Mocking `ws` in Vitest allowed for precise verification of constructor arguments without needing a real network connection.

## What Didn't
- Initial confusion about where `WebSocket` was instantiated, but analysis quickly pointed to `src/client.ts`.

## Improvements for Future Sprints
- Continue using unit tests with mocks for external libraries like `ws` to ensure configuration options are correctly propagated.
