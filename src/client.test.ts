import { describe, it, expect, vi, beforeEach } from 'vitest';
import WebSocket from 'ws';
import { OBSWebSocketClient } from './client.js';

vi.mock('ws', () => {
  const MockWebSocket = vi.fn();
  (MockWebSocket as any).prototype.on = vi.fn();
  (MockWebSocket as any).prototype.once = vi.fn();
  (MockWebSocket as any).prototype.terminate = vi.fn();
  return { default: MockWebSocket };
});

describe('OBSWebSocketClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should pass rejectUnauthorized: false when selfSigned is true', async () => {
    const client = new OBSWebSocketClient('ws://localhost:4455', null, { selfSigned: true });
    
    // We don't need to await connect() as we just want to see the constructor call
    client.connect().catch(() => {});
    
    expect(WebSocket).toHaveBeenCalledWith(
      'ws://localhost:4455',
      expect.objectContaining({ rejectUnauthorized: false })
    );
  });

  it('should NOT pass rejectUnauthorized: false by default', async () => {
    const client = new OBSWebSocketClient('ws://localhost:4455', null);
    
    client.connect().catch(() => {});
    
    expect(WebSocket).toHaveBeenCalledWith(
      'ws://localhost:4455',
      expect.not.objectContaining({ rejectUnauthorized: false })
    );
  });
});
