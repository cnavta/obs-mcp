#!/usr/bin/env node

import { startServer } from "./server.js";

const logger = {
  log: (message: string) => console.error(`[${new Date().toISOString()}] LOG: ${message}`),
  error: (message: string) => console.error(`[${new Date().toISOString()}] ERROR: ${message}`),
  debug: (message: string) => console.error(`[${new Date().toISOString()}] DEBUG: ${message}`),
};

// Set up better error handling
process.on("uncaughtException", (error) => {
  logger.error(`Uncaught exception: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error(`Unhandled rejection at: ${promise}, reason: ${reason}`);
  process.exit(1);
});

// Start the server
startServer().catch((error) => {
  logger.error(`Fatal error in main(): ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});