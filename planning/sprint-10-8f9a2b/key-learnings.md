# Key Learnings – sprint-10-8f9a2b

- **WebSocket Options**: The `ws` library allows passing options like `rejectUnauthorized` directly to the constructor, which is essential for handling self-signed certificates in secure environments.
- **Vitest Mocking**: Using `vi.mock` with a factory function that returns a mocked constructor is an effective way to test how external dependencies are instantiated.
- **Config propagation**: Passing options through from environment variables in `server.ts` to constructor arguments in `client.ts` maintains a clean separation of concerns while allowing for flexible configuration.
