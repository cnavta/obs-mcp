# Execution Plan: MCP SDK 2.0 Migration

**Sprint**: sprint-12-twql41
**Role**: Lead Implementor
**Date**: 2026-08-30
**Status**: Planning

## Overview

This execution plan breaks down the MCP SDK 2.0 migration into concrete, trackable tasks organized by priority and dependency chains. The plan follows a phased approach that minimizes risk through staged migration and continuous validation.

## Execution Strategy

### Core Principles

1. **Staged Migration**: Keep v1 SDK alongside v2 until full migration complete
2. **Incremental Validation**: Test after each major change
3. **Low-Risk First**: Start with automated changes before manual refactoring
4. **Fail Fast**: Validate builds and types continuously
5. **Preserve Functionality**: Maintain existing behavior throughout

### Risk Mitigation

- **Daily builds**: Ensure TypeScript compilation succeeds
- **Test gates**: All tests must pass before proceeding to next phase
- **Rollback ready**: Keep v1 SDK until final validation
- **Manual testing**: Validate both stdio and HTTP transports at each phase

## Phase Breakdown

### Phase 0: Pre-Migration Setup ✅
**Status**: Complete
**Duration**: 4 hours

Tasks completed:
- ✅ Research MCP SDK 2.0 changes
- ✅ Analyze current codebase architecture
- ✅ Create technical architecture document
- ✅ Create execution plan (this document)
- ✅ Create YAML backlog

### Phase 1: Automated Migration
**Priority**: P0 (Critical Path)
**Duration**: 2-3 hours
**Dependencies**: None
**Risk**: Low

**Objectives:**
- Run official codemod to automate mechanical changes
- Review and understand codemod transformations
- Identify manual fixup requirements

**Tasks:**
1. **P0-001**: Run codemod transformation
2. **P0-002**: Review codemod output and error markers
3. **P0-003**: Analyze codemod transformation quality
4. **P0-004**: Document manual fixup requirements

**Exit Criteria:**
- [ ] Codemod executed without errors
- [ ] All `@mcp-codemod-error` markers cataloged
- [ ] Manual fixup list created
- [ ] Initial assessment documented

### Phase 2: Dependency Management
**Priority**: P0 (Critical Path)
**Duration**: 1-2 hours
**Dependencies**: Phase 1 complete
**Risk**: Low

**Objectives:**
- Add v2 SDK packages (staged migration)
- Update Zod to v4.2.0
- Verify dependency resolution

**Tasks:**
1. **P0-005**: Update package.json with v2 packages
2. **P0-006**: Update Zod version to ^4.2.0
3. **P0-007**: Run npm install and verify resolution
4. **P0-008**: Verify no peer dependency conflicts
5. **P0-009**: Test build with both v1 and v2 packages

**Exit Criteria:**
- [ ] All v2 packages installed
- [ ] No dependency conflicts
- [ ] Build succeeds (may have TypeScript errors)
- [ ] Both v1 and v2 packages coexist

### Phase 3: Import Path Updates
**Priority**: P0 (Critical Path)
**Duration**: 1-2 hours
**Dependencies**: Phase 2 complete
**Risk**: Low

**Objectives:**
- Update all import paths to v2 package structure
- Fix any codemod-missed imports
- Ensure consistent import patterns

**Tasks:**
1. **P0-010**: Review codemod import transformations
2. **P0-011**: Fix transport import paths manually
3. **P0-012**: Update error class imports
4. **P0-013**: Verify all imports resolve correctly
5. **P0-014**: Run TypeScript type check

**Exit Criteria:**
- [ ] All imports point to v2 packages
- [ ] No unresolved import errors
- [ ] TypeScript compilation succeeds (may have type errors)

### Phase 4: Server Factory Pattern
**Priority**: P0 (Critical Path)
**Duration**: 2-3 hours
**Dependencies**: Phase 3 complete
**Risk**: Medium

**Objectives:**
- Implement server factory function
- Refactor server initialization
- Prepare for per-request server instances

**Tasks:**
1. **P1-001**: Create buildServer() factory function
2. **P1-002**: Extract tool registration to separate function
3. **P1-003**: Ensure OBS client singleton sharing
4. **P1-004**: Update server initialization logic
5. **P1-005**: Test factory pattern with stdio transport

**Exit Criteria:**
- [ ] buildServer() function implemented
- [ ] OBS client properly shared across instances
- [ ] Server initialization refactored
- [ ] Stdio mode still functional

### Phase 5: Stdio Transport Migration
**Priority**: P0 (Critical Path)
**Duration**: 1-2 hours
**Dependencies**: Phase 4 complete
**Risk**: Low

**Objectives:**
- Migrate stdio transport to v2 API
- Test stdio mode end-to-end
- Validate backward compatibility

**Tasks:**
1. **P0-015**: Update stdio transport imports
2. **P0-016**: Migrate to serveStdio() pattern
3. **P0-017**: Test stdio transport connectivity
4. **P0-018**: Validate tool execution in stdio mode
5. **P0-019**: Test with MCP inspector

**Exit Criteria:**
- [ ] Stdio transport uses v2 API
- [ ] Connection establishes successfully
- [ ] Tools execute correctly
- [ ] MCP inspector validation passes

### Phase 6: Tool Registration API Migration
**Priority**: P0 (Critical Path)
**Duration**: 4-6 hours
**Dependencies**: Phase 5 complete
**Risk**: Medium

**Objectives:**
- Migrate all tool registrations to registerTool()
- Update handler signatures (extra → ctx)
- Update schema definitions
- Migrate 13 tool modules systematically

**Tasks:**
1. **P1-006**: Create tool registration migration helper
2. **P1-007**: Migrate tools/general.ts (3 tools)
3. **P1-008**: Migrate tools/scenes.ts
4. **P1-009**: Migrate tools/sources.ts
5. **P1-010**: Migrate tools/scene-items.ts
6. **P1-011**: Migrate tools/streaming.ts
7. **P1-012**: Migrate tools/transitions.ts
8. **P1-013**: Migrate tools/config.ts
9. **P1-014**: Migrate tools/filters.ts
10. **P1-015**: Migrate tools/inputs.ts
11. **P1-016**: Migrate tools/media-inputs.ts
12. **P1-017**: Migrate tools/outputs.ts
13. **P1-018**: Migrate tools/record.ts
14. **P1-019**: Migrate tools/ui.ts
15. **P1-020**: Test all tools in stdio mode

**Exit Criteria:**
- [ ] All 13 tool modules migrated
- [ ] All handler signatures updated
- [ ] All schemas wrapped with z.object()
- [ ] All tools execute successfully
- [ ] No TypeScript errors in tool files

### Phase 7: HTTP Transport Migration
**Priority**: P0 (Critical Path)
**Duration**: 3-4 hours
**Dependencies**: Phase 6 complete
**Risk**: High

**Objectives:**
- Migrate from SSE to Express adapter
- Preserve authentication middleware
- Implement per-request lifecycle
- Test HTTP transport end-to-end

**Tasks:**
1. **P0-020**: Install @modelcontextprotocol/express
2. **P0-021**: Import createExpressMcpHandler
3. **P0-022**: Remove SSE transport code
4. **P0-023**: Implement Express adapter integration
5. **P0-024**: Update HTTP routes (/sse → /mcp)
6. **P0-025**: Preserve CORS middleware
7. **P0-026**: Preserve Bearer Token auth middleware
8. **P0-027**: Test HTTP transport connectivity
9. **P0-028**: Validate auth middleware
10. **P0-029**: Test tool execution over HTTP

**Exit Criteria:**
- [ ] SSE transport removed
- [ ] Express adapter integrated
- [ ] Authentication working
- [ ] HTTP connection establishes
- [ ] Tools execute over HTTP
- [ ] Auth failures return 401

### Phase 8: Error Handling Migration
**Priority**: P1 (High)
**Duration**: 1-2 hours
**Dependencies**: Phase 7 complete
**Risk**: Low

**Objectives:**
- Update error class usage
- Migrate to ProtocolError
- Update error type definitions

**Tasks:**
1. **P1-021**: Replace McpError with ProtocolError
2. **P1-022**: Replace ErrorCode with ProtocolErrorCode
3. **P1-023**: Update error handling in tool handlers
4. **P1-024**: Test error scenarios
5. **P1-025**: Validate error responses

**Exit Criteria:**
- [ ] No McpError references remain
- [ ] All error handling updated
- [ ] Error scenarios tested
- [ ] Error responses correct

### Phase 9: Test Migration & Validation
**Priority**: P0 (Critical Path)
**Duration**: 3-4 hours
**Dependencies**: Phase 8 complete
**Risk**: Medium

**Objectives:**
- Update unit tests for v2 API
- Add integration tests
- Validate all functionality
- Test edge cases

**Tasks:**
1. **P0-030**: Update src/server.test.ts
2. **P0-031**: Update src/client.test.ts (if affected)
3. **P0-032**: Update src/index.test.ts
4. **P0-033**: Add stdio transport integration test
5. **P0-034**: Add HTTP transport integration test
6. **P0-035**: Add authentication test cases
7. **P0-036**: Test OBS reconnection logic
8. **P0-037**: Test tool execution with OBS disconnected
9. **P0-038**: Run full test suite

**Exit Criteria:**
- [ ] All unit tests pass
- [ ] Integration tests added
- [ ] Test coverage maintained
- [ ] All edge cases covered

### Phase 10: Manual Validation
**Priority**: P0 (Critical Path)
**Duration**: 2-3 hours
**Dependencies**: Phase 9 complete
**Risk**: Low

**Objectives:**
- Manual end-to-end testing
- Validate real-world scenarios
- Test with actual OBS Studio

**Tasks:**
1. **P0-039**: Test stdio mode with real OBS
2. **P0-040**: Test HTTP mode with real OBS
3. **P0-041**: Test Bearer Token authentication
4. **P0-042**: Test connection resilience
5. **P0-043**: Test all tool categories
6. **P0-044**: Validate error handling
7. **P0-045**: Performance validation

**Exit Criteria:**
- [ ] Stdio mode fully functional
- [ ] HTTP mode fully functional
- [ ] Authentication working
- [ ] Reconnection working
- [ ] All tools tested
- [ ] No regressions identified

### Phase 11: Cleanup & Finalization
**Priority**: P1 (High)
**Duration**: 1-2 hours
**Dependencies**: Phase 10 complete
**Risk**: Low

**Objectives:**
- Remove v1 SDK dependency
- Clean up deprecated code
- Update documentation
- Final validation

**Tasks:**
1. **P1-026**: Remove @modelcontextprotocol/sdk from package.json
2. **P1-027**: Remove deprecated code and comments
3. **P1-028**: Clean up temporary migration code
4. **P1-029**: Update README.md
5. **P1-030**: Update CLAUDE.md if needed
6. **P1-031**: Run final build
7. **P1-032**: Run final test suite
8. **P1-033**: Verify package.json scripts

**Exit Criteria:**
- [ ] v1 SDK removed
- [ ] No deprecated code remains
- [ ] Documentation updated
- [ ] Final build succeeds
- [ ] All tests pass
- [ ] Package ready for use

### Phase 12: Documentation & Handoff
**Priority**: P2 (Medium)
**Duration**: 1-2 hours
**Dependencies**: Phase 11 complete
**Risk**: Low

**Objectives:**
- Document migration process
- Create upgrade guide
- Update project documentation

**Tasks:**
1. **P2-001**: Create migration summary document
2. **P2-002**: Document API changes for users
3. **P2-003**: Update deployment documentation
4. **P2-004**: Create troubleshooting guide
5. **P2-005**: Update changelog

**Exit Criteria:**
- [ ] Migration documented
- [ ] User-facing docs updated
- [ ] Deployment docs updated
- [ ] Changelog complete

## Task Prioritization

### P0 - Critical Path (Must Complete)
Tasks that block forward progress or are essential for functionality.
- Phases 1-3: Automated migration and dependencies
- Phase 5: Stdio transport (validation path)
- Phase 7: HTTP transport (critical feature)
- Phase 9-10: Testing and validation

### P1 - High Priority (Should Complete)
Important tasks that enhance stability and completeness.
- Phase 4: Server factory pattern
- Phase 6: Tool registration migration
- Phase 8: Error handling
- Phase 11: Cleanup

### P2 - Medium Priority (Nice to Have)
Tasks that improve documentation and developer experience.
- Phase 12: Documentation and handoff

## Dependencies & Critical Path

```
Phase 1 (Codemod)
    ↓
Phase 2 (Dependencies)
    ↓
Phase 3 (Imports)
    ↓
Phase 4 (Factory Pattern)
    ↓
Phase 5 (Stdio Transport) ←─── Validation Checkpoint 1
    ↓
Phase 6 (Tool Migration)
    ↓
Phase 7 (HTTP Transport) ←─── Validation Checkpoint 2
    ↓
Phase 8 (Error Handling)
    ↓
Phase 9 (Tests)
    ↓
Phase 10 (Manual Testing) ←─── Validation Checkpoint 3
    ↓
Phase 11 (Cleanup)
    ↓
Phase 12 (Documentation)
```

## Validation Checkpoints

### Checkpoint 1: Stdio Functional (After Phase 5)
- Build succeeds with no errors
- Stdio transport connects
- Basic tools execute
- Continue to Phase 6

### Checkpoint 2: HTTP Functional (After Phase 7)
- Build succeeds with no errors
- HTTP transport serves requests
- Authentication works
- Tools execute over HTTP
- Continue to Phase 8

### Checkpoint 3: Full Validation (After Phase 10)
- All tests pass
- Manual testing complete
- No regressions found
- Continue to Phase 11

### Checkpoint 4: Production Ready (After Phase 11)
- v1 SDK removed
- Documentation complete
- Final validation passes
- Ready for deployment

## Resource Requirements

### Development Environment
- Node.js 20+
- TypeScript 5.4+
- OBS Studio with WebSocket enabled
- MCP Inspector (for testing)

### Time Estimates
- **Minimum**: 18 hours (if everything goes smoothly)
- **Expected**: 22-24 hours (with normal debugging)
- **Maximum**: 28 hours (with unexpected issues)

### Effort Distribution
- Automated migration: 15%
- Transport refactoring: 35%
- Tool migration: 25%
- Testing: 20%
- Cleanup & docs: 5%

## Risk Management

### High Risk Areas
1. **HTTP Transport Migration** (Phase 7)
   - Mitigation: Extensive testing, keep v1 for comparison
   - Contingency: Fallback to Node Streamable HTTP if Express adapter issues

2. **Per-Request Server Instances** (Phase 4)
   - Mitigation: Careful OBS client singleton management
   - Contingency: Investigate state management if issues arise

### Medium Risk Areas
1. **Tool Registration Migration** (Phase 6)
   - Mitigation: Systematic module-by-module approach
   - Contingency: Rollback individual modules if issues found

2. **Test Updates** (Phase 9)
   - Mitigation: Incremental test updates with validation
   - Contingency: Temporarily skip failing tests, fix later

### Rollback Triggers
- Build fails after Phase 3 and cannot be fixed within 2 hours
- Stdio transport non-functional after Phase 5
- HTTP transport non-functional after Phase 7
- Critical tests fail after Phase 9
- Performance degradation > 50%

## Quality Gates

All phases must pass these quality gates:

### Build Gate
- `npm run build` succeeds with no errors
- TypeScript compilation clean
- No syntax errors

### Test Gate
- Existing tests pass (may need updates)
- No new test failures introduced
- Test coverage maintained

### Functionality Gate
- Existing features work as before
- No breaking changes to end users
- No performance regressions

## Success Metrics

### Technical Metrics
- [ ] Zero TypeScript errors
- [ ] 100% test pass rate
- [ ] Zero v1 SDK references
- [ ] Both transports functional

### Functional Metrics
- [ ] All 50+ tools working
- [ ] Authentication preserved
- [ ] Reconnection logic working
- [ ] Error handling correct

### Quality Metrics
- [ ] Code review completed
- [ ] Documentation updated
- [ ] No security regressions
- [ ] Performance maintained

## Next Steps

1. **Immediate**: Review and approve this execution plan
2. **Day 1**: Execute Phases 1-3 (automated migration, dependencies, imports)
3. **Day 2**: Execute Phases 4-6 (factory, stdio, tools)
4. **Day 3**: Execute Phases 7-9 (HTTP, errors, tests)
5. **Day 4**: Execute Phases 10-12 (validation, cleanup, docs)

## Appendix: Task Reference

See `backlog.yaml` for detailed task breakdown with:
- Task IDs
- Descriptions
- Acceptance criteria
- Dependencies
- Estimated effort
- Priority levels
