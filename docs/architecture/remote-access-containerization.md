# Technical Architecture: Remote Access & Containerization

## 1. Introduction
This document outlines the architectural changes required to enable remote access for the OBS MCP server, containerize the application, and prepare it for deployment on Google Cloud Run.

## 2. Remote Access via SSE
Currently, the server uses `StdioServerTransport`, which is limited to local execution where the client (e.g., an LLM desktop app) launches the server as a child process.

To enable remote access, we will implement `SSEServerTransport` (Server-Sent Events).

### 2.1 Implementation Details
- **Web Framework**: Integrate `express` to handle HTTP requests.
- **Endpoints**:
  - `GET /sse`: Establishes the SSE connection.
  - `POST /messages`: Receives MCP messages from the client.
- **Transport Switch**: Add a mechanism (e.g., environment variable `MCP_TRANSPORT=sse|stdio`) to choose between transports at startup.

### 2.2 Connectivity to OBS
When running in Cloud Run, the server must reach the OBS WebSocket server, which typically runs on a local machine behind a NAT.
- **Recommended Approach**: Use a secure tunnel (e.g., Tailscale, Cloudflare Tunnel, or ngrok) to expose the OBS WebSocket port (default 4455) to the internet or a private network reachable by Cloud Run.
- **Configuration**: `OBS_WEBSOCKET_URL` will be updated to point to the tunnel's public/private endpoint.

## 3. Containerization
The application will be containerized using Docker to ensure environment consistency and ease of deployment.

### 3.1 Dockerfile Strategy
- **Base Image**: `node:20-slim` for a small footprint.
- **Build Stage**: Multi-stage build to keep the production image lean.
- **Dependencies**: Install only production dependencies in the final image.
- **User**: Run as a non-root user for security.

### 3.2 Environment Variables
The container will rely on the following environment variables:
- `OBS_WEBSOCKET_URL`: URL of the OBS WebSocket server.
- `OBS_WEBSOCKET_PASSWORD`: Password for OBS WebSocket.
- `PORT`: The port on which the SSE server will listen (default 8080 for Cloud Run).
- `MCP_TRANSPORT`: Choice of transport (`stdio` or `sse`).

## 4. Cloud Run Deployment
Cloud Run is ideal for this server as it scales to zero when not in use and provides a managed environment for containerized web services.

### 4.1 Deployment Configuration
- **Memory/CPU**: Low requirements (e.g., 512MB RAM, 1 vCPU).
- **Concurrency**: SSE maintains long-lived connections; concurrency settings should be tuned accordingly.
- **Authentication**: Access to the Cloud Run service should be protected (e.g., via IAM or a custom API key/token implemented in the MCP server).

### 4.2 CI/CD Pipeline
- **Cloud Build**: A `cloudbuild.yaml` will be created to automate the build and deploy process.
- **Trigger**: Pushes to the `main` branch will trigger a deployment to the staging/production environment.

## 5. Security Considerations
- **Transport Security**: SSE must be served over HTTPS (provided automatically by Cloud Run).
- **OBS Credentials**: Use Secret Manager for `OBS_WEBSOCKET_PASSWORD` in Cloud Run.
- **Access Control**: Implement a simple Bearer Token authentication for the SSE endpoints to prevent unauthorized access to OBS tools.

## 6. Next Steps
1. Implement Express-based SSE transport in `src/server.ts`.
2. Create `Dockerfile` and `docker-compose.yml`.
3. Set up `cloudbuild.yaml` for GCP integration.
