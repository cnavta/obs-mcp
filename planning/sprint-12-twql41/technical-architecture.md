# Technical Architecture: MCP SDK 2.0 Upgrade

**Sprint**: sprint-12-twql41
**Author**: Architect
**Date**: 2026-08-30
**Status**: Planning

## Executive Summary

This document outlines the technical architecture and upgrade path for migrating obs-mcp from the Model Context Protocol (MCP) TypeScript SDK v1.0 to v2.0. The upgrade represents a significant paradigm shift from connection-based stateful operations to request-based stateless architecture, requiring comprehensive refactoring of transport mechanisms, handler APIs, and state management.

## 1. Current Architecture Analysis

### 1.1 Current SDK Usage (v1.0.0)

**Dependencies:**
- `@modelcontextprotocol/sdk`: ^1.0.0
- `zod`: ^3.22.4

**Key Components:**

1. **Server Implementation** (`src/server.ts`)
   - `McpServer` from `@modelcontextprotocol/sdk/server/mcp.js`
   - Dual transport support:
     - `StdioServerTransport` for stdio mode (default)
     - `SSEServerTransport` for HTTP/SSE mode
   - Express-based HTTP server with CORS and Bearer Token auth
   - Tool registration via `server.tool()` API

2. **Tool Architecture** (`src/tools/**`)
   - 13 tool modules organized by functionality
   - Tools register via `server.tool(name, description, schema, handler)`
   - Handler signature: `async (args: any, extra: any) => result`
   - Uses `extra` parameter for request metadata

3. **OBS Client** (`src/client.ts`)
   - Custom WebSocket client for OBS Studio
   - Connection management with auto-reconnection
   - Independent of MCP SDK (no changes required)

### 1.2 Tool Registration Pattern

```typescript
// Current v1 pattern
server.tool(
  "obs-get-status",
  "Get the current status of the OBS MCP server",
  {}, // Zod schema
  async (args, extra) => {
    // Handler logic
    return { content: [...] };
  }
);
```

### 1.3 Transport Configuration

**Stdio Mode** (default):
```typescript
const transport = new StdioServerTransport();
await server.connect(transport);
```

**SSE Mode** (HTTP):
```typescript
const transport = new SSEServerTransport("/messages", res);
await server.connect(transport);
```

## 2. MCP SDK 2.0 Breaking Changes

### 2.1 Package Structure Changes

**v1 Monolithic Package:**
```
@modelcontextprotocol/sdk
```

**v2 Split Packages:**
```
@modelcontextprotocol/server    → Server implementation
@modelcontextprotocol/client    → Client implementation
@modelcontextprotocol/core      → Public Zod schemas
@modelcontextprotocol/node      → Node.js adapters (stdio, HTTP)
@modelcontextprotocol/express   → Express adapter (optional)
```

### 2.2 Transport Architecture Changes

| v1 Transport | v2 Replacement | Impact |
|--------------|----------------|--------|
| `StdioServerTransport` | `StdioServerTransport` from `@modelcontextprotocol/node` | Import path change only |
| `SSEServerTransport` | **REMOVED** → Migrate to `StreamableHTTPServerTransport` | **Breaking: Complete rewrite** |
| Connection-based | Request-based | **Breaking: Architectural shift** |

**Critical Change**: SSE transport is completely removed. Must migrate to Streamable HTTP with per-request lifecycle.

### 2.3 Handler API Changes

| Aspect | v1 | v2 |
|--------|----|----|
| Parameter name | `extra` | `ctx` |
| Signal access | `extra.signal` | `ctx.mcpReq.signal` |
| Request ID | `extra.requestId` | `ctx.mcpReq.id` |
| Send request | `extra.sendRequest()` | `ctx.mcpReq.send()` |
| Send notification | `extra.sendNotification()` | `ctx.mcpReq.notify()` |
| Session ID | `extra.sessionId` | `ctx.sessionId` |
| HTTP request | `extra.requestInfo` | `ctx.http?.req` (optional) |
| Auth info | `extra.authInfo` | `ctx.http?.authInfo` (optional) |

### 2.4 Registration API Changes

**v1:**
```typescript
server.tool(name, description, schema, handler)
```

**v2:**
```typescript
server.registerTool({
  name: name,
  description: description,
  inputSchema: z.object(schema),
  handler: async (args, ctx) => { ... }
})
```

### 2.5 Error Handling Changes

| v1 | v2 |
|----|-----|
| `McpError` | `ProtocolError` |
| `ErrorCode` | `ProtocolErrorCode` (wire-level) |
| N/A | `SdkErrorCode` (local: `RequestTimeout`, `ConnectionClosed`) |
| N/A | `OAuthError` with `OAuthErrorCode` |
| `StreamableHTTPError` | `SdkHttpError` |

### 2.6 Protocol Version Negotiation

**New in v2**: 2026-07-28 specification support with backward compatibility

**Client-side options:**
- `mode: 'legacy'` (default) - No probing, 2025-compatible
- `mode: 'auto'` - Probes with `server/discover`, falls back to 2025
- `mode: { pin: '2026-07-28' }` - Modern only, rejects legacy

**Server-side**: HTTP serving defaults to 2026-07-28 per-request, with optional legacy support

### 2.7 State Management Paradigm

**v1**: Session-based state across connection lifecycle

**v2**: Request-based state with `requestState` opaque strings
- Servers return `requestState` during `inputRequired()` calls
- State echoed back on retries
- Enables truly stateless HTTP operation
- Recommended: Use `createRequestStateCodec()` for HMAC-sealing

## 3. Impact Analysis

### 3.1 Files Requiring Changes

| File | Change Type | Complexity |
|------|-------------|------------|
| `package.json` | Dependencies update | Low |
| `src/server.ts` | Transport migration, import updates | **High** |
| `src/tools/*.ts` | Handler signature updates (13 files) | Medium |
| `src/client.ts` | No changes | None |
| `tsconfig.json` | No changes | None |

### 3.2 Critical Migration Points

1. **SSE Transport Replacement** (Highest Risk)
   - Current implementation uses `SSEServerTransport` with Express
   - Must migrate to `StreamableHTTPServerTransport` or Express adapter
   - Per-request lifecycle vs. connection lifecycle
   - Authentication middleware may need restructuring

2. **Tool Handler Updates** (Medium Risk)
   - 50+ tool registrations across 13 files
   - Parameter rename: `extra` → `ctx`
   - Context property remapping
   - Schema wrapping requirements

3. **Import Path Updates** (Low Risk)
   - Automated via codemod
   - Manual review required for transport paths

### 3.3 Backward Compatibility

- v2 servers can serve both 2025 and 2026-07-28 clients
- Stdio transport maintains compatibility with legacy handshake
- HTTP transport defaults to modern but supports legacy via routing

## 4. Proposed Migration Architecture

### 4.1 Dependency Updates

**New package.json dependencies:**
```json
{
  "dependencies": {
    "@modelcontextprotocol/server": "^2.0.0",
    "@modelcontextprotocol/node": "^2.0.0",
    "@modelcontextprotocol/express": "^2.0.0",
    "zod": "^4.2.0"
  }
}
```

**Migration Strategy**: Staged migration (both v1 and v2 simultaneously)
- Keep `@modelcontextprotocol/sdk@^1.0.0` initially
- Add v2 packages
- Migrate incrementally
- Remove v1 when complete

### 4.2 Transport Migration Strategy

#### Option A: Express Adapter (Recommended)

**Advantages:**
- Minimal changes to existing Express setup
- Maintains current middleware (CORS, auth)
- Cleaner integration with existing HTTP server

**Implementation:**
```typescript
import { createExpressMcpHandler } from '@modelcontextprotocol/express';
import express from 'express';

const app = express();
app.use(cors());
app.use(authMiddleware); // Existing Bearer Token auth

const mcpHandler = createExpressMcpHandler(() => buildServer());
app.use('/mcp', mcpHandler);
```

#### Option B: Node Streamable HTTP (Alternative)

**Advantages:**
- More control over HTTP handling
- Framework-agnostic

**Disadvantages:**
- Requires rewriting Express integration
- More complex implementation

**Implementation:**
```typescript
import { NodeStreamableHTTPServerTransport } from '@modelcontextprotocol/node';
import { createMcpHandler } from '@modelcontextprotocol/server';

const mcpHandler = createMcpHandler(() => buildServer());
// Integrate with Express route
```

#### Stdio Transport Migration

**Minimal changes required:**
```typescript
// v1
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

// v2
import { StdioServerTransport } from '@modelcontextprotocol/node/stdio';
```

**New v2 pattern** (recommended):
```typescript
import { serveStdio } from '@modelcontextprotocol/server/stdio';

await serveStdio(() => buildServer());
```

### 4.3 Server Factory Pattern

**New architecture** (enables per-request server instances for HTTP):

```typescript
function buildServer(): Server {
  const server = new Server({
    name: "obs-mcp",
    version: "1.0.0",
  });

  // Register all tools
  registerTools(server, obsClient);

  return server;
}

// For HTTP (per-request)
const mcpHandler = createExpressMcpHandler(() => buildServer());

// For stdio (single instance)
await serveStdio(() => buildServer());
```

### 4.4 Tool Registration Refactoring

**Current v1 pattern:**
```typescript
server.tool(
  "obs-get-status",
  "Get server status",
  {},
  async (args, extra) => {
    return { content: [...] };
  }
);
```

**New v2 pattern:**
```typescript
server.registerTool({
  name: "obs-get-status",
  description: "Get server status",
  inputSchema: z.object({}),
  handler: async (args, ctx) => {
    // Access context properties
    const requestId = ctx.mcpReq.id;
    const signal = ctx.mcpReq.signal;

    return { content: [...] };
  }
});
```

**Context migration:**
- `extra.signal` → `ctx.mcpReq.signal`
- `extra.requestId` → `ctx.mcpReq.id`
- HTTP-specific: `ctx.http?.req`, `ctx.http?.authInfo`

### 4.5 Error Handling Updates

**Current v1:**
```typescript
import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';

throw new McpError(ErrorCode.InternalError, "Failed");
```

**New v2:**
```typescript
import { ProtocolError, ProtocolErrorCode } from '@modelcontextprotocol/server';

throw new ProtocolError(ProtocolErrorCode.InternalError, "Failed");
```

**OAuth errors** (if applicable):
```typescript
import { OAuthError, OAuthErrorCode } from '@modelcontextprotocol/server';

if (error instanceof OAuthError && error.code === OAuthErrorCode.InvalidGrant) {
  // Handle OAuth error
}
```

### 4.6 Authentication Architecture

**Current v1**: Express middleware validates Bearer Token before SSE connection

**Proposed v2**: Same middleware pattern with Express adapter

```typescript
// Maintained from v1
app.use((req, res, next) => {
  const authToken = process.env.MCP_AUTH_TOKEN;
  if (authToken) {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== `Bearer ${authToken}`) {
      logger.error(`Unauthorized access attempt from ${req.ip}`);
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
  }
  next();
});

// v2: Apply before MCP handler
app.use(authMiddleware);
app.use('/mcp', mcpHandler);
```

**Note**: Authentication info available in handler via `ctx.http?.authInfo`

## 5. Migration Execution Plan

### Phase 1: Preparation
1. ✅ Research SDK 2.0 changes (completed)
2. ✅ Analyze current codebase (completed)
3. ✅ Create technical architecture (in progress)
4. Run automated codemod: `npx @modelcontextprotocol/codemod@latest v1-to-v2 .`
5. Review codemod output and markers (`grep -rn '@mcp-codemod-error'`)

### Phase 2: Dependency Migration
1. Add v2 packages to `package.json` (staged migration)
2. Update `zod` to `^4.2.0`
3. Run `npm install`
4. Verify no version conflicts

### Phase 3: Core Refactoring

#### 3.1 Server Transport Layer
1. Update stdio transport imports
2. Migrate SSE to Express adapter
3. Implement server factory pattern
4. Update connection lifecycle management
5. Test both stdio and HTTP modes

#### 3.2 Tool Registration Layer
1. Create tool registration migration helper
2. Update all tool modules (13 files):
   - `tools/general.ts`
   - `tools/scenes.ts`
   - `tools/sources.ts`
   - `tools/scene-items.ts`
   - `tools/streaming.ts`
   - `tools/transitions.ts`
   - `tools/config.ts`
   - `tools/filters.ts`
   - `tools/inputs.ts`
   - `tools/media-inputs.ts`
   - `tools/outputs.ts`
   - `tools/record.ts`
   - `tools/ui.ts`
3. Update handler signatures (`extra` → `ctx`)
4. Update context property access patterns

#### 3.3 Error Handling
1. Update error imports
2. Replace `McpError` → `ProtocolError`
3. Replace `ErrorCode` → `ProtocolErrorCode`
4. Add new error types as needed

### Phase 4: Testing & Validation
1. Unit test updates (vitest)
2. Integration testing:
   - Stdio transport with MCP inspector
   - HTTP transport with Bearer Token auth
   - Tool execution end-to-end
3. OBS WebSocket integration testing
4. Connection resilience testing (reconnection logic)

### Phase 5: Cleanup
1. Remove v1 SDK dependency
2. Remove deprecated code
3. Update documentation
4. Final build and validation

## 6. Risk Assessment

### High Risk Items
1. **SSE Transport Migration**
   - Complexity: High
   - Impact: Critical path for HTTP mode
   - Mitigation: Thorough testing with both stdio and HTTP modes

2. **Per-Request Server Instances**
   - Complexity: Medium
   - Impact: Affects stateless operation
   - Mitigation: Ensure OBS client singleton is properly shared

### Medium Risk Items
1. **Tool Handler Updates**
   - Complexity: Medium (repetitive but straightforward)
   - Impact: All 50+ tools must be updated
   - Mitigation: Create helper functions, systematic testing

2. **Context Property Migration**
   - Complexity: Medium
   - Impact: May affect request/notification sending
   - Mitigation: Codemod handles most cases, manual review for edge cases

### Low Risk Items
1. **Import Path Updates**
   - Complexity: Low
   - Impact: Build-time errors, easy to fix
   - Mitigation: Codemod automation + TypeScript compiler

2. **Error Class Renames**
   - Complexity: Low
   - Impact: Limited error handling in codebase
   - Mitigation: TypeScript type checking

## 7. Rollback Strategy

### Staged Migration Approach
- Keep v1 SDK installed during migration
- Revert by removing v2 packages if blocking issues occur
- Git branch isolation for migration work

### Validation Gates
- All tests must pass before removing v1 dependency
- Manual validation of both transport modes
- OBS integration smoke tests

## 8. Open Questions

1. **State Management**: Does obs-mcp need stateful operations?
   - Current: Stateful OBS WebSocket connection (singleton)
   - v2: Request-based state
   - Decision: Maintain singleton OBS client, use factory pattern for MCP server

2. **Protocol Version**: Pin to 2026-07-28 or maintain legacy compatibility?
   - Recommendation: Start with `mode: 'auto'` for maximum compatibility
   - Monitor client adoption, pin to 2026-07-28 when appropriate

3. **OAuth Support**: Is OAuth authentication needed?
   - Current: Bearer Token only
   - v2: Enhanced OAuth support available
   - Decision: Continue with Bearer Token, evaluate OAuth if needed

## 9. Success Criteria

### Functional Requirements
- ✅ All existing tools work in SDK 2.0
- ✅ Stdio transport functional
- ✅ HTTP transport functional with auth
- ✅ OBS WebSocket integration maintained
- ✅ Reconnection logic preserved

### Non-Functional Requirements
- ✅ No breaking changes to end users
- ✅ Build passes with no TypeScript errors
- ✅ All tests pass
- ✅ No regression in performance
- ✅ Documentation updated

### Validation Checklist
- [ ] Codemod executed successfully
- [ ] Dependencies updated
- [ ] All imports updated
- [ ] Server factory pattern implemented
- [ ] Stdio transport working
- [ ] HTTP transport working
- [ ] All 50+ tools migrated
- [ ] Error handling updated
- [ ] Tests passing
- [ ] Manual validation completed
- [ ] v1 SDK removed
- [ ] Documentation updated

## 10. Recommendations

### Primary Recommendation: Express Adapter
Use `@modelcontextprotocol/express` adapter for HTTP transport:
- Minimal disruption to existing architecture
- Clean separation of concerns
- Easy to test and validate

### Secondary Recommendation: Phased Migration
Execute migration in controlled phases:
1. Stdio transport (lower risk)
2. Tool registration layer
3. HTTP transport (higher risk)
4. Final cleanup

### Tertiary Recommendation: Automated Testing
Expand test coverage before migration:
- Add integration tests for both transports
- Test tool execution end-to-end
- Validate auth middleware

## 11. Conclusion

The migration from MCP SDK 1.0 to 2.0 is a significant but manageable undertaking. The primary complexity lies in the SSE-to-Streamable HTTP transport migration and the systematic update of 50+ tool handlers.

**Key Success Factors:**
1. Use automated codemod for mechanical changes
2. Adopt Express adapter for minimal HTTP disruption
3. Implement server factory pattern for per-request lifecycle
4. Systematic testing at each phase
5. Staged migration with v1/v2 coexistence

**Estimated Effort:**
- Planning: 4 hours ✅
- Implementation: 12-16 hours
- Testing: 6-8 hours
- Total: 22-28 hours

**Timeline:**
- Sprint 12: Architecture & Planning (current)
- Sprint 13: Implementation
- Sprint 14: Testing & Validation

**Next Steps:**
1. Review and approve this architecture document
2. Run codemod and analyze output
3. Create detailed implementation plan
4. Begin Phase 1 migration
