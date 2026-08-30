import { McpServer } from "@modelcontextprotocol/server";
import { OBSWebSocketClient } from "../client.js";
import { z } from "zod";

export function initialize(server: McpServer, client: OBSWebSocketClient): void {
  // GetVirtualCamStatus tool
  server.registerTool("obs-get-virtual-cam-status", { description: "Gets the status of the virtualcam output", inputSchema: z.object({}) }, async () => {
              try {
                const response = await client.sendRequest("GetVirtualCamStatus");
                return {
                  content: [
                    {
                      type: "text",
                      text: `Virtual camera is ${response.outputActive ? "active" : "inactive"}`
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error getting virtual camera status: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // ToggleVirtualCam tool
  server.registerTool("obs-toggle-virtual-cam", { description: "Toggles the state of the virtualcam output", inputSchema: z.object({}) }, async () => {
              try {
                const response = await client.sendRequest("ToggleVirtualCam");
                return {
                  content: [
                    {
                      type: "text",
                      text: `Virtual camera toggled, now ${response.outputActive ? "active" : "inactive"}`
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error toggling virtual camera: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // StartVirtualCam tool
  server.registerTool("obs-start-virtual-cam", { description: "Starts the virtualcam output", inputSchema: z.object({}) }, async () => {
              try {
                await client.sendRequest("StartVirtualCam");
                return {
                  content: [
                    {
                      type: "text",
                      text: "Virtual camera started"
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error starting virtual camera: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // StopVirtualCam tool
  server.registerTool("obs-stop-virtual-cam", { description: "Stops the virtualcam output", inputSchema: z.object({}) }, async () => {
              try {
                await client.sendRequest("StopVirtualCam");
                return {
                  content: [
                    {
                      type: "text",
                      text: "Virtual camera stopped"
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error stopping virtual camera: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // GetReplayBufferStatus tool
  server.registerTool("obs-get-replay-buffer-status", { description: "Gets the status of the replay buffer output", inputSchema: z.object({}) }, async () => {
              try {
                const response = await client.sendRequest("GetReplayBufferStatus");
                return {
                  content: [
                    {
                      type: "text",
                      text: `Replay buffer is ${response.outputActive ? "active" : "inactive"}`
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error getting replay buffer status: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // ToggleReplayBuffer tool
  server.registerTool("obs-toggle-replay-buffer", { description: "Toggles the state of the replay buffer output", inputSchema: z.object({}) }, async () => {
              try {
                const response = await client.sendRequest("ToggleReplayBuffer");
                return {
                  content: [
                    {
                      type: "text",
                      text: `Replay buffer toggled, now ${response.outputActive ? "active" : "inactive"}`
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error toggling replay buffer: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // StartReplayBuffer tool
  server.registerTool("obs-start-replay-buffer", { description: "Starts the replay buffer output", inputSchema: z.object({}) }, async () => {
              try {
                await client.sendRequest("StartReplayBuffer");
                return {
                  content: [
                    {
                      type: "text",
                      text: "Replay buffer started"
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error starting replay buffer: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // StopReplayBuffer tool
  server.registerTool("obs-stop-replay-buffer", { description: "Stops the replay buffer output", inputSchema: z.object({}) }, async () => {
              try {
                await client.sendRequest("StopReplayBuffer");
                return {
                  content: [
                    {
                      type: "text",
                      text: "Replay buffer stopped"
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error stopping replay buffer: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // SaveReplayBuffer tool
  server.registerTool("obs-save-replay-buffer", { description: "Saves the contents of the replay buffer output", inputSchema: z.object({}) }, async () => {
              try {
                await client.sendRequest("SaveReplayBuffer");
                return {
                  content: [
                    {
                      type: "text",
                      text: "Replay buffer saved"
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error saving replay buffer: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // GetLastReplayBufferReplay tool
  server.registerTool("obs-get-last-replay-buffer-replay", { description: "Gets the filename of the last replay buffer save file", inputSchema: z.object({}) }, async () => {
              try {
                const response = await client.sendRequest("GetLastReplayBufferReplay");
                return {
                  content: [
                    {
                      type: "text",
                      text: `Last replay buffer save file: ${response.savedReplayPath}`
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error getting last replay buffer file: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // GetOutputList tool
  server.registerTool("obs-get-output-list", { description: "Gets the list of available outputs", inputSchema: z.object({}) }, async () => {
              try {
                const response = await client.sendRequest("GetOutputList");
                return {
                  content: [
                    {
                      type: "text",
                      text: JSON.stringify(response, null, 2)
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error getting output list: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // GetOutputStatus tool
  server.registerTool("obs-get-output-status", { description: "Gets the status of an output", inputSchema: z.object({
              outputName: z.string().describe("Output name")
            }) }, async ({ outputName }) => {
              try {
                const response = await client.sendRequest("GetOutputStatus", { outputName });
                return {
                  content: [
                    {
                      type: "text",
                      text: JSON.stringify(response, null, 2)
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error getting output status: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // ToggleOutput tool
  server.registerTool("obs-toggle-output", { description: "Toggles the status of an output", inputSchema: z.object({
              outputName: z.string().describe("Output name")
            }) }, async ({ outputName }) => {
              try {
                const response = await client.sendRequest("ToggleOutput", { outputName });
                return {
                  content: [
                    {
                      type: "text",
                      text: `Output '${outputName}' toggled, now ${response.outputActive ? "active" : "inactive"}`
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error toggling output: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // StartOutput tool
  server.registerTool("obs-start-output", { description: "Starts an output", inputSchema: z.object({
              outputName: z.string().describe("Output name")
            }) }, async ({ outputName }) => {
              try {
                await client.sendRequest("StartOutput", { outputName });
                return {
                  content: [
                    {
                      type: "text",
                      text: `Output '${outputName}' started`
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error starting output: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // StopOutput tool
  server.registerTool("obs-stop-output", { description: "Stops an output", inputSchema: z.object({
              outputName: z.string().describe("Output name")
            }) }, async ({ outputName }) => {
              try {
                await client.sendRequest("StopOutput", { outputName });
                return {
                  content: [
                    {
                      type: "text",
                      text: `Output '${outputName}' stopped`
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error stopping output: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // GetOutputSettings tool
  server.registerTool("obs-get-output-settings", { description: "Gets the settings of an output", inputSchema: z.object({
              outputName: z.string().describe("Output name")
            }) }, async ({ outputName }) => {
              try {
                const response = await client.sendRequest("GetOutputSettings", { outputName });
                return {
                  content: [
                    {
                      type: "text",
                      text: JSON.stringify(response, null, 2)
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error getting output settings: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // SetOutputSettings tool
  server.registerTool("obs-set-output-settings", { description: "Sets the settings of an output", inputSchema: z.object({
              outputName: z.string().describe("Output name"),
              outputSettings: z.record(z.string(), z.any()).describe("Output settings")
            }) }, async ({ outputName, outputSettings }) => {
              try {
                await client.sendRequest("SetOutputSettings", { outputName, outputSettings });
                return {
                  content: [
                    {
                      type: "text",
                      text: `Settings updated for output '${outputName}'`
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error setting output settings: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });
}