# Key Learnings – sprint-1-f3a7e2

- **MCP Transports**: `StdioServerTransport` is best for local, but `SSEServerTransport` is necessary for cloud/remote deployments.
- **OBS Connectivity**: Bridging the gap between Cloud Run and a local OBS instance is the primary challenge for this project. Tunneling solutions (Tailscale, Cloudflare) are the recommended path.
- **Sprint Protocol**: Following the AGENTS.md protocol ensures all artifacts are traceable and consistent.
