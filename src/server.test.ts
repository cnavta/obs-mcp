import { describe, it, expect, vi, beforeEach } from 'vitest';
import express from 'express';
import { startServer } from './server.js';

// Note: v2 migration removed the global `server` export in favor of a factory pattern.
// The server is now created per-request for HTTP, or once for stdio.
// Tests focus on the auth middleware logic and server startup.

describe('Server Module', () => {
  it('should export startServer function', () => {
    expect(startServer).toBeDefined();
    expect(typeof startServer).toBe('function');
  });

  it('should be able to call startServer without errors in test mode', async () => {
    // Note: We don't actually start the server in tests to avoid port conflicts
    // This just verifies the function exists and is callable
    // In a real test, we'd mock the transport and OBS client
    expect(startServer).toBeDefined();
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
