# Retro – sprint-11-8b2d4e

## What worked
- Wrapping `server.tool` was an effective way to add global logging without modifying dozens of individual tool definitions.
- Adding a simple Express middleware provided immediate visibility into SSE traffic.
- Standardizing timestamps makes the logs much more useful for debugging timing issues.

## What didn't work
- Initial attempt to reassign `server.tool` without `any` failed due to complex TypeScript overloads in the MCP SDK. Using `any` was a pragmatic solution given the context.

## Learnings
- In MCP servers, it's critical to log to `stderr` because `stdout` is the communication channel for the protocol.
- Intercepting method calls on the `McpServer` instance is a powerful pattern for adding cross-cutting concerns like logging or telemetry.
