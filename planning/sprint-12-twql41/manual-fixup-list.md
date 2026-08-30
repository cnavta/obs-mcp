# Manual Fixup List - MCP SDK v2 Migration

**Date**: 2026-08-30
**Sprint**: sprint-12-twql41
**Task**: P0-004

## Codemod Results Summary

**Changes**: 144 across 15 files
**Error Markers**: 0 (no @mcp-codemod-error markers found)
**Status**: Codemod completed successfully

### What the Codemod Did

1. **Package.json Updates**:
   - ✅ Removed: `@modelcontextprotocol/sdk`
   - ✅ Added: `@modelcontextprotocol/server` ^2.0.0
   - ✅ Added: `@modelcontextprotocol/server-legacy` ^2.0.0
   - ⚠️ Zod still at ^3.22.4 (needs manual update to ^4.2.0)

2. **Import Updates**:
   - ✅ `McpServer` from `@modelcontextprotocol/server`
   - ✅ `StdioServerTransport` from `@modelcontextprotocol/server/stdio`
   - ⚠️ `SSEServerTransport` from `@modelcontextprotocol/server-legacy/sse` (deprecated, needs migration)

3. **Schema Wrapping**:
   - ✅ 128 tool schemas wrapped with `z.object()`
   - All tool registration schemas updated automatically

## Required Manual Fixes

### Priority 1: Critical (Must Fix)

#### 1. Update Zod Version (P0-006)
**File**: `package.json`
**Issue**: Zod version is still ^3.22.4, needs ^4.2.0
**Fix**:
```json
- "zod": "^3.22.4"
+ "zod": "^4.2.0"
```
**Task**: P0-006

#### 2. Migrate SSE Transport to Express Adapter (P0-020 to P0-029)
**File**: `src/server.ts`
**Issue**: SSEServerTransport is deprecated, using server-legacy package
**Current**:
```typescript
import { SSEServerTransport } from "@modelcontextprotocol/server-legacy/sse";
```
**Required**: Migrate to Express adapter
**Fix**: Remove SSE code entirely, implement Express adapter pattern
**Tasks**: P0-020 through P0-029

#### 3. Add Missing Package: @modelcontextprotocol/express (P0-005)
**File**: `package.json`
**Issue**: Express adapter package not added by codemod
**Fix**:
```json
"@modelcontextprotocol/express": "^2.0.0"
```
**Task**: P0-005

#### 4. Add Missing Package: @modelcontextprotocol/node (P0-005)
**File**: `package.json`
**Issue**: Node package not added by codemod
**Fix**:
```json
"@modelcontextprotocol/node": "^2.0.0"
```
**Task**: P0-005

### Priority 2: High (Should Fix)

#### 5. Implement Server Factory Pattern (P1-001 to P1-005)
**File**: `src/server.ts`
**Issue**: Current architecture doesn't support per-request server instances
**Fix**: Create `buildServer()` factory function
**Tasks**: P1-001 through P1-005

#### 6. Update Handler Signatures (Covered by tool migration tasks)
**Files**: `src/tools/*.ts` (13 files)
**Issue**: Handler parameter is still called `extra`, needs to be `ctx` with v2 structure
**Note**: Codemod may have updated some, but need to verify all handlers use v2 context API
**Tasks**: P1-007 through P1-019

### Priority 3: Medium (Nice to Fix)

#### 7. Remove server-legacy Package (P1-026)
**File**: `package.json`
**Issue**: `@modelcontextprotocol/server-legacy` added by codemod for SSE compatibility
**Fix**: Remove after migrating to Express adapter
**Task**: P1-026

#### 8. Update Explicit Request Logging Wrapper (src/server.ts:23-38)
**File**: `src/server.ts`
**Issue**: The custom wrapper that wraps `server.tool()` may need updating for v2 API
**Current Code**:
```typescript
const originalTool = server.tool.bind(server);
(server as any).tool = (name: string, description: string, schema: any, handler: any) => {
  return originalTool(name, description, schema, async (args: any, extra: any) => {
    logger.log(`MCP Tool Request: ${name} with args: ${JSON.stringify(args)}`);
    // ...
  });
};
```
**Note**: In v2, tool registration uses `registerTool()`, not `tool()`
**Fix**: Update or remove this wrapper, implement logging in v2 style
**Tasks**: Part of tool migration (P1-007 to P1-019)

## Codemod Transformation Quality

### Excellent ✅
- Import path transformations (all updated correctly)
- Schema wrapping (all 128 instances wrapped with z.object())
- Package.json dependency updates (mostly correct)

### Good ⚠️
- SSE transport handling (flagged as deprecated, provided legacy import)
- Zod version warning (warned but didn't update)

### Needs Verification
- Handler parameter updates (need to check if `extra` → `ctx` was done)
- Context property access (extra.signal → ctx.mcpReq.signal, etc.)

## What Does NOT Need Manual Fixing

1. ✅ Tool schema wrapping - all done automatically
2. ✅ Import paths for McpServer - updated correctly
3. ✅ Import paths for StdioServerTransport - updated correctly
4. ✅ Package.json v1 SDK removal - done automatically
5. ✅ Basic v2 package additions - done automatically

## Next Steps

### Immediate (Phase 2)
1. ✅ P0-005: Add missing packages (@modelcontextprotocol/express, /node)
2. ✅ P0-006: Update zod to ^4.2.0
3. ✅ P0-007: Run npm install
4. ✅ P0-008: Verify no peer dependency conflicts

### After Dependencies (Phase 3)
1. ✅ P0-010 to P0-014: Import path validation and fixes

### After Imports (Phase 4-7)
1. ✅ P1-001 to P1-005: Server factory pattern
2. ✅ P0-015 to P0-019: Stdio transport migration
3. ✅ P1-007 to P1-019: Tool registration migration
4. ✅ P0-020 to P0-029: HTTP/Express transport migration

### Cleanup (Phase 11)
1. ✅ P1-026: Remove @modelcontextprotocol/server-legacy

## Files Modified by Codemod

```
package.json              |    5 +-
src/server.ts             |    6 +-
src/tools/config.ts       |  957 changes
src/tools/filters.ts      |  592 changes
src/tools/general.ts      |  682 changes
src/tools/index.ts        |    2 +-
src/tools/inputs.ts       | 1182 changes
src/tools/media-inputs.ts |  242 changes
src/tools/outputs.ts      |  895 changes
src/tools/record.ts       |  473 changes
src/tools/scene-items.ts  |  493 changes
src/tools/scenes.ts       |  426 changes
src/tools/sources.ts      |  233 changes
src/tools/streaming.ts    |  261 changes
src/tools/transitions.ts  |  473 changes
src/tools/ui.ts           |  548 changes
---
Total: 16 files, 3,418 insertions, 4,052 deletions
```

## Validation Checklist

- [x] Codemod executed successfully
- [x] No @mcp-codemod-error markers found
- [x] Package.json updated
- [x] Import paths updated
- [x] Schemas wrapped with z.object()
- [ ] Zod version updated (manual)
- [ ] Missing packages added (manual)
- [ ] SSE transport migrated (manual)
- [ ] Server factory implemented (manual)
- [ ] All tool handlers verified (manual)

## Conclusion

The codemod performed very well, handling 144 changes automatically with no errors. The main manual work required is:

1. **Critical**: Update zod version, add missing packages, migrate SSE transport
2. **High**: Implement server factory pattern, verify/update tool handlers
3. **Medium**: Remove legacy packages after migration complete

The foundation is solid, and we can proceed to Phase 2 (Dependency Management).
