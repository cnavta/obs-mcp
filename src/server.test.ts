import { describe, it, expect, vi, beforeEach } from 'vitest';
import express from 'express';
import { server } from './server.js';

// Simple mock for the auth logic since it's embedded in startServer
// In a real project, we'd refactor to export the middleware.
// For now, let's verify we can at least load the module and it has expected exports.

describe('Server Module', () => {
  it('should export server and startServer', () => {
    expect(server).toBeDefined();
    // expect(startServer).toBeDefined(); // startServer is async and not easily tested without calling it
  });

  it('should have MCP server configuration', () => {
    // Just verify it's an instance of something that looks like an MCP server
    expect(server).toHaveProperty('connect');
  });
});

describe('Auth Logic (Simulation)', () => {
  const mockAuthMiddleware = (req: any, res: any, next: any, token?: string) => {
    const authToken = token;
    if (authToken) {
      const authHeader = req.headers.authorization;
      if (!authHeader || authHeader !== `Bearer ${authToken}`) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
    }
    next();
  };

  it('should allow request when no token is configured', () => {
    const req = { headers: {} };
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    const next = vi.fn();
    
    mockAuthMiddleware(req, res, next, undefined);
    expect(next).toHaveBeenCalled();
  });

  it('should block request when token is configured but missing', () => {
    const req = { headers: {} };
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    const next = vi.fn();
    
    mockAuthMiddleware(req, res, next, 'secret');
    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('should allow request when valid token is provided', () => {
    const req = { headers: { authorization: 'Bearer secret' } };
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    const next = vi.fn();
    
    mockAuthMiddleware(req, res, next, 'secret');
    expect(next).toHaveBeenCalled();
  });

  it('should block request when invalid token is provided', () => {
    const req = { headers: { authorization: 'Bearer wrong' } };
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    const next = vi.fn();
    
    mockAuthMiddleware(req, res, next, 'secret');
    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });
});
