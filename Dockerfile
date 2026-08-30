# Stage 1: Build
FROM node:20-slim AS builder

WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-slim

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# Install production dependencies only
COPY package*.json ./
RUN npm ci --omit=dev

# Copy build artifacts
COPY --from=builder /app/build ./build

# Security: Run as non-root user
# Node image already has a 'node' user, let's use it or create a specific one
RUN groupadd -r mcpuser && useradd -r -g mcpuser mcpuser && \
    chown -R mcpuser:mcpuser /app

USER mcpuser

EXPOSE 8080

# Start the server
CMD ["node", "build/index.js"]
