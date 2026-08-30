import { McpServer } from "@modelcontextprotocol/server";
import { OBSWebSocketClient } from "../client.js";
import { z } from "zod";

export function initialize(server: McpServer, client: OBSWebSocketClient): void {
  // GetInputList tool
  server.registerTool("obs-get-input-list", { description: "Gets an array of all inputs in OBS", inputSchema: z.object({
              inputKind: z.string().optional().describe("Restrict the array to only inputs of the specified kind")
            }) }, async ({ inputKind }) => {
              try {
                const requestParams: Record<string, any> = {};
                if (inputKind !== undefined) {
                  requestParams.inputKind = inputKind;
                }

                const response = await client.sendRequest("GetInputList", requestParams);
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
                      text: `Error getting input list: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // GetInputKindList tool
  server.registerTool("obs-get-input-kind-list", { description: "Gets an array of all available input kinds in OBS", inputSchema: z.object({
              unversioned: z.boolean().optional().describe("True to return all kinds as unversioned, False to return with version suffixes")
            }) }, async ({ unversioned }) => {
              try {
                const requestParams: Record<string, any> = {};
                if (unversioned !== undefined) {
                  requestParams.unversioned = unversioned;
                }

                const response = await client.sendRequest("GetInputKindList", requestParams);
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
                      text: `Error getting input kind list: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // GetSpecialInputs tool
  server.registerTool("obs-get-special-inputs", { description: "Gets the names of all special inputs", inputSchema: z.object({}) }, async () => {
              try {
                const response = await client.sendRequest("GetSpecialInputs");
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
                      text: `Error getting special inputs: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // CreateInput tool
  server.registerTool("obs-create-input", { description: "Creates a new input, adding it as a scene item to the specified scene", inputSchema: z.object({
              sceneName: z.string().describe("Name of the scene to add the input to as a scene item"),
              inputName: z.string().describe("Name of the new input to created"),
              inputKind: z.string().describe("The kind of input to be created"),
              inputSettings: z.record(z.string(), z.any()).optional().describe("Settings object to initialize the input with"),
              sceneItemEnabled: z.boolean().optional().describe("Whether to set the created scene item to enabled or disabled")
            }) }, async ({ sceneName, inputName, inputKind, inputSettings, sceneItemEnabled }) => {
              try {
                const requestParams: Record<string, any> = { sceneName, inputName, inputKind };
                if (inputSettings !== undefined) {
                  requestParams.inputSettings = inputSettings;
                }
                if (sceneItemEnabled !== undefined) {
                  requestParams.sceneItemEnabled = sceneItemEnabled;
                }

                const response = await client.sendRequest("CreateInput", requestParams);
                return {
                  content: [
                    {
                      type: "text",
                      text: `Successfully created input '${inputName}' of kind '${inputKind}' with ID ${response.sceneItemId}`
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error creating input: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // RemoveInput tool
  server.registerTool("obs-remove-input", { description: "Removes an existing input", inputSchema: z.object({
              inputName: z.string().describe("Name of the input to remove")
            }) }, async ({ inputName }) => {
              try {
                await client.sendRequest("RemoveInput", { inputName });
                return {
                  content: [
                    {
                      type: "text",
                      text: `Successfully removed input: ${inputName}`
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error removing input: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // SetInputName tool
  server.registerTool("obs-set-input-name", { description: "Sets the name of an input (rename)", inputSchema: z.object({
              inputName: z.string().describe("Current input name"),
              newInputName: z.string().describe("New name for the input")
            }) }, async ({ inputName, newInputName }) => {
              try {
                await client.sendRequest("SetInputName", { inputName, newInputName });
                return {
                  content: [
                    {
                      type: "text",
                      text: `Successfully renamed input '${inputName}' to '${newInputName}'`
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error renaming input: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // GetInputDefaultSettings tool
  server.registerTool("obs-get-input-default-settings", { description: "Gets the default settings for an input kind", inputSchema: z.object({
              inputKind: z.string().describe("Input kind to get the default settings for")
            }) }, async ({ inputKind }) => {
              try {
                const response = await client.sendRequest("GetInputDefaultSettings", { inputKind });
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
                      text: `Error getting input default settings: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // GetInputSettings tool
  server.registerTool("obs-get-input-settings", { description: "Gets the settings of an input", inputSchema: z.object({
              inputName: z.string().describe("Name of the input to get the settings of")
            }) }, async ({ inputName }) => {
              try {
                const response = await client.sendRequest("GetInputSettings", { inputName });
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
                      text: `Error getting input settings: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // SetInputSettings tool
  server.registerTool("obs-set-input-settings", { description: "Sets the settings of an input", inputSchema: z.object({
              inputName: z.string().describe("Name of the input to set the settings of"),
              inputSettings: z.record(z.string(), z.any()).describe("Object of settings to apply"),
              overlay: z.boolean().optional().describe("True to apply settings on top of existing ones, False to reset to defaults first")
            }) }, async ({ inputName, inputSettings, overlay }) => {
              try {
                const requestParams: Record<string, any> = { inputName, inputSettings };
                if (overlay !== undefined) {
                  requestParams.overlay = overlay;
                }

                await client.sendRequest("SetInputSettings", requestParams);
                return {
                  content: [
                    {
                      type: "text",
                      text: `Successfully updated settings for input: ${inputName}`
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error setting input settings: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // GetInputMute tool
  server.registerTool("obs-get-input-mute", { description: "Gets the audio mute state of an input", inputSchema: z.object({
              inputName: z.string().describe("Name of input to get the mute state of")
            }) }, async ({ inputName }) => {
              try {
                const response = await client.sendRequest("GetInputMute", { inputName });
                return {
                  content: [
                    {
                      type: "text",
                      text: `Input '${inputName}' is ${response.inputMuted ? "muted" : "unmuted"}`
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error getting input mute state: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // SetInputMute tool
  server.registerTool("obs-set-input-mute", { description: "Sets the audio mute state of an input", inputSchema: z.object({
              inputName: z.string().describe("Name of the input to set the mute state of"),
              inputMuted: z.boolean().describe("Whether to mute the input or not")
            }) }, async ({ inputName, inputMuted }) => {
              try {
                await client.sendRequest("SetInputMute", { inputName, inputMuted });
                return {
                  content: [
                    {
                      type: "text",
                      text: `Successfully ${inputMuted ? "muted" : "unmuted"} input: ${inputName}`
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error setting input mute state: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // ToggleInputMute tool
  server.registerTool("obs-toggle-input-mute", { description: "Toggles the audio mute state of an input", inputSchema: z.object({
              inputName: z.string().describe("Name of the input to toggle the mute state of")
            }) }, async ({ inputName }) => {
              try {
                const response = await client.sendRequest("ToggleInputMute", { inputName });
                return {
                  content: [
                    {
                      type: "text",
                      text: `Successfully toggled mute state for input '${inputName}', now ${response.inputMuted ? "muted" : "unmuted"}`
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error toggling input mute state: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // GetInputVolume tool
  server.registerTool("obs-get-input-volume", { description: "Gets the current volume setting of an input", inputSchema: z.object({
              inputName: z.string().describe("Name of the input to get the volume of")
            }) }, async ({ inputName }) => {
              try {
                const response = await client.sendRequest("GetInputVolume", { inputName });
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
                      text: `Error getting input volume: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // SetInputVolume tool
  server.registerTool("obs-set-input-volume", { description: "Sets the volume setting of an input", inputSchema: z.object({
              inputName: z.string().describe("Name of the input to set the volume of"),
              inputVolumeMul: z.number().min(0).max(20).optional().describe("Volume setting in mul (0-20)"),
              inputVolumeDb: z.number().min(-100).max(26).optional().describe("Volume setting in dB (-100 to 26)")
            }) }, async ({ inputName, inputVolumeMul, inputVolumeDb }) => {
              try {
                if (inputVolumeMul === undefined && inputVolumeDb === undefined) {
                  throw new Error("Either inputVolumeMul or inputVolumeDb must be provided");
                }

                const requestParams: Record<string, any> = { inputName };
                if (inputVolumeMul !== undefined) {
                  requestParams.inputVolumeMul = inputVolumeMul;
                }
                if (inputVolumeDb !== undefined) {
                  requestParams.inputVolumeDb = inputVolumeDb;
                }

                await client.sendRequest("SetInputVolume", requestParams);
                return {
                  content: [
                    {
                      type: "text",
                      text: `Successfully set volume for input: ${inputName}`
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error setting input volume: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // GetInputAudioBalance tool
  server.registerTool("obs-get-input-audio-balance", { description: "Gets the audio balance of an input", inputSchema: z.object({
              inputName: z.string().describe("Name of the input to get the audio balance of")
            }) }, async ({ inputName }) => {
              try {
                const response = await client.sendRequest("GetInputAudioBalance", { inputName });
                return {
                  content: [
                    {
                      type: "text",
                      text: `Audio balance for input '${inputName}': ${response.inputAudioBalance}`
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error getting input audio balance: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // SetInputAudioBalance tool
  server.registerTool("obs-set-input-audio-balance", { description: "Sets the audio balance of an input", inputSchema: z.object({
              inputName: z.string().describe("Name of the input to set the audio balance of"),
              inputAudioBalance: z.number().min(0).max(1).describe("New audio balance value (0.0-1.0)")
            }) }, async ({ inputName, inputAudioBalance }) => {
              try {
                await client.sendRequest("SetInputAudioBalance", { inputName, inputAudioBalance });
                return {
                  content: [
                    {
                      type: "text",
                      text: `Successfully set audio balance to ${inputAudioBalance} for input: ${inputName}`
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error setting input audio balance: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // GetInputAudioSyncOffset tool
  server.registerTool("obs-get-input-audio-sync-offset", { description: "Gets the audio sync offset of an input", inputSchema: z.object({
              inputName: z.string().describe("Name of the input to get the audio sync offset of")
            }) }, async ({ inputName }) => {
              try {
                const response = await client.sendRequest("GetInputAudioSyncOffset", { inputName });
                return {
                  content: [
                    {
                      type: "text",
                      text: `Audio sync offset for input '${inputName}': ${response.inputAudioSyncOffset}ms`
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error getting input audio sync offset: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // SetInputAudioSyncOffset tool
  server.registerTool("obs-set-input-audio-sync-offset", { description: "Sets the audio sync offset of an input", inputSchema: z.object({
              inputName: z.string().describe("Name of the input to set the audio sync offset of"),
              inputAudioSyncOffset: z.number().min(-950).max(20000).describe("New audio sync offset in milliseconds")
            }) }, async ({ inputName, inputAudioSyncOffset }) => {
              try {
                await client.sendRequest("SetInputAudioSyncOffset", { inputName, inputAudioSyncOffset });
                return {
                  content: [
                    {
                      type: "text",
                      text: `Successfully set audio sync offset to ${inputAudioSyncOffset}ms for input: ${inputName}`
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error setting input audio sync offset: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // GetInputAudioMonitorType tool
  server.registerTool("obs-get-input-audio-monitor-type", { description: "Gets the audio monitor type of an input", inputSchema: z.object({
              inputName: z.string().describe("Name of the input to get the audio monitor type of")
            }) }, async ({ inputName }) => {
              try {
                const response = await client.sendRequest("GetInputAudioMonitorType", { inputName });
                return {
                  content: [
                    {
                      type: "text",
                      text: `Audio monitor type for input '${inputName}': ${response.monitorType}`
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error getting input audio monitor type: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // SetInputAudioMonitorType tool
  server.registerTool("obs-set-input-audio-monitor-type", { description: "Sets the audio monitor type of an input", inputSchema: z.object({
              inputName: z.string().describe("Name of the input to set the audio monitor type of"),
              monitorType: z.string().describe("Audio monitor type (OBS_MONITORING_TYPE_NONE, OBS_MONITORING_TYPE_MONITOR_ONLY, OBS_MONITORING_TYPE_MONITOR_AND_OUTPUT)")
            }) }, async ({ inputName, monitorType }) => {
              try {
                await client.sendRequest("SetInputAudioMonitorType", { inputName, monitorType });
                return {
                  content: [
                    {
                      type: "text",
                      text: `Successfully set audio monitor type to ${monitorType} for input: ${inputName}`
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error setting input audio monitor type: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });
}