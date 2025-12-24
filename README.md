# OBS MCP Server

An MCP server for OBS Studio that provides tools to control OBS via the OBS WebSocket protocol.

## Features

- Connect to OBS WebSocket server
- Control OBS via MCP tools
- Provides tools for:
  - General operations
  - Scene management
  - Source control
  - Scene item manipulation
  - Streaming and recording
  - Transitions


## Usage

1. Make sure OBS Studio is running with WebSocket server enabled (Tools > WebSocket Server Settings). Note the password for the WS.
2. Set the WebSocket password in environment variable (if needed):

```bash
export OBS_WEBSOCKET_PASSWORD="your_password_here"
```

3. Add the MCP server to Claude desktop with the MCP server settings:

```json
{
  "mcpServers": {
    "obs": {
      "command": "npx",
      "args": ["-y", "obs-mcp@latest"],
      "env": {
        "OBS_WEBSOCKET_PASSWORD": "<password_from_obs>"
      }
    }
  }
}
```

4. Use Claude to control your OBS!

## Development

If you want to run the server locally using the code in this git repo, you can do the following:


```bash
npm run build
npm run start
```

Then configure Claude desktop:

```json
{
  "mcpServers": {
    "obs": {
      "command": "node",
      "args": [
        "<obs-mcp_root>/build/index.js"
      ],
      "env": {
        "OBS_WEBSOCKET_PASSWORD": "<password_from_obs>"
      }
    }
  }
}
```

## Available Tools

The server provides tools organized by category:

- General tools: Version info, stats, hotkeys, studio mode
- Scene tools: List scenes, switch scenes, create/remove scenes
- Source tools: Manage sources, settings, audio levels, mute/unmute
- Scene item tools: Manage items in scenes (position, visibility, etc.)
- Streaming tools: Start/stop streaming, recording, virtual camera
- Transition tools: Set transitions, durations, trigger transitions

## Environment Variables

- `OBS_WEBSOCKET_URL`: WebSocket URL (default: `ws://localhost:4455`)
- `OBS_WEBSOCKET_PASSWORD`: Password for authenticating with OBS WebSocket (if required)
- `MCP_TRANSPORT`: Choice of transport, either `stdio` (default) or `sse`
- `MCP_AUTH_TOKEN`: Bearer token for securing SSE endpoints
- `PORT`: Port for SSE server (default: `8080`)

## Remote Access (SSE)

The server can be run in SSE (Server-Sent Events) mode for remote access, which is required for deployment on platforms like Cloud Run.

### Running with SSE

```bash
export MCP_TRANSPORT=sse
export MCP_AUTH_TOKEN=your-secret-token
export PORT=8080
npm run start
```

The server will expose:
- `GET /sse`: SSE connection endpoint.
- `POST /messages`: Message handling endpoint.

Clients must provide the `Authorization: Bearer <your-secret-token>` header if `MCP_AUTH_TOKEN` is set.

## Docker Setup

### Using Docker Compose

The easiest way to run the server in a container is using Docker Compose:

```bash
docker-compose up -d
```

By default, this will use `MCP_TRANSPORT=sse` and attempt to connect to OBS on your host machine.

### Manual Docker Build

```bash
docker build -t obs-mcp .
docker run -e MCP_TRANSPORT=sse -p 8080:8080 obs-mcp
```

## Cloud Deployment

A `cloudbuild.yaml` is provided for automated deployment to Google Cloud Run.

```bash
gcloud builds submit --config cloudbuild.yaml .
```

## Requirements

- Node.js 16+
- OBS Studio 31+ with WebSocket server enabled
- Claude desktop

## License

See the [LICENSE](LICENSE) file for details.