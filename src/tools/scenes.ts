import { McpServer } from "@modelcontextprotocol/server";
import { OBSWebSocketClient } from "../client.js";
import { z } from "zod";

export function initialize(server: McpServer, client: OBSWebSocketClient): void {
  // GetSceneList tool
  server.registerTool("obs-get-scene-list", { description: "Get a list of scenes in OBS", inputSchema: z.object({}) }, async () => {
              try {
                const sceneList = await client.sendRequest("GetSceneList");
                return {
                  content: [
                    {
                      type: "text",
                      text: JSON.stringify(sceneList, null, 2)
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error getting scene list: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // GetCurrentProgramScene tool
  server.registerTool("obs-get-current-scene", { description: "Get the current active scene in OBS", inputSchema: z.object({}) }, async () => {
              try {
                const currentScene = await client.sendRequest("GetCurrentProgramScene");
                return {
                  content: [
                    {
                      type: "text",
                      text: `Current scene: ${currentScene.currentProgramSceneName}`
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error getting current scene: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // SetCurrentProgramScene tool
  server.registerTool("obs-set-current-scene", { description: "Set the current active scene in OBS", inputSchema: z.object({
              sceneName: z.string().describe("The name of the scene to set as current")
            }) }, async ({ sceneName }) => {
              try {
                await client.sendRequest("SetCurrentProgramScene", { sceneName });
                return {
                  content: [
                    {
                      type: "text",
                      text: `Successfully switched to scene: ${sceneName}`
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error setting current scene: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // GetCurrentPreviewScene tool (Studio Mode)
  server.registerTool("obs-get-preview-scene", { description: "Get the current preview scene in OBS Studio Mode", inputSchema: z.object({}) }, async () => {
              try {
                const previewScene = await client.sendRequest("GetCurrentPreviewScene");
                return {
                  content: [
                    {
                      type: "text",
                      text: `Preview scene: ${previewScene.currentPreviewSceneName}`
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error getting preview scene: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // SetCurrentPreviewScene tool (Studio Mode)
  server.registerTool("obs-set-preview-scene", { description: "Set the current preview scene in OBS Studio Mode", inputSchema: z.object({
              sceneName: z.string().describe("The name of the scene to set as preview")
            }) }, async ({ sceneName }) => {
              try {
                await client.sendRequest("SetCurrentPreviewScene", { sceneName });
                return {
                  content: [
                    {
                      type: "text",
                      text: `Successfully set preview scene to: ${sceneName}`
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error setting preview scene: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // CreateScene tool
  server.registerTool("obs-create-scene", { description: "Create a new scene in OBS", inputSchema: z.object({
              sceneName: z.string().describe("The name for the new scene")
            }) }, async ({ sceneName }) => {
              try {
                await client.sendRequest("CreateScene", { sceneName });
                return {
                  content: [
                    {
                      type: "text",
                      text: `Successfully created scene: ${sceneName}`
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error creating scene: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // RemoveScene tool
  server.registerTool("obs-remove-scene", { description: "Remove a scene from OBS", inputSchema: z.object({
              sceneName: z.string().describe("The name of the scene to remove")
            }) }, async ({ sceneName }) => {
              try {
                await client.sendRequest("RemoveScene", { sceneName });
                return {
                  content: [
                    {
                      type: "text",
                      text: `Successfully removed scene: ${sceneName}`
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error removing scene: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // TriggerStudioModeTransition tool
  server.registerTool("obs-trigger-studio-transition", { description: "Trigger a transition from preview to program scene in Studio Mode", inputSchema: z.object({}) }, async () => {
              try {
                await client.sendRequest("TriggerStudioModeTransition");
                return {
                  content: [
                    {
                      type: "text",
                      text: "Successfully triggered studio mode transition"
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error triggering studio transition: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });
}