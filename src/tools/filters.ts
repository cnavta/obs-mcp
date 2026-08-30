import { McpServer } from "@modelcontextprotocol/server";
import { OBSWebSocketClient } from "../client.js";
import { z } from "zod";

export function initialize(server: McpServer, client: OBSWebSocketClient): void {
  // GetSourceFilterKindList tool
  server.registerTool("obs-get-filter-kind-list", { description: "Gets an array of all available source filter kinds", inputSchema: z.object({}) }, async () => {
              try {
                const response = await client.sendRequest("GetSourceFilterKindList");
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
                      text: `Error getting filter kind list: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // GetSourceFilterList tool
  server.registerTool("obs-get-source-filter-list", { description: "Gets an array of all of a source's filters", inputSchema: z.object({
              sourceName: z.string().describe("Name of the source")
            }) }, async ({ sourceName }) => {
              try {
                const response = await client.sendRequest("GetSourceFilterList", { sourceName });
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
                      text: `Error getting source filter list: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // GetSourceFilterDefaultSettings tool
  server.registerTool("obs-get-filter-default-settings", { description: "Gets the default settings for a filter kind", inputSchema: z.object({
              filterKind: z.string().describe("Filter kind to get the default settings for")
            }) }, async ({ filterKind }) => {
              try {
                const response = await client.sendRequest("GetSourceFilterDefaultSettings", { filterKind });
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
                      text: `Error getting filter default settings: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // CreateSourceFilter tool
  server.registerTool("obs-create-source-filter", { description: "Creates a new filter, adding it to the specified source", inputSchema: z.object({
              sourceName: z.string().describe("Name of the source to add the filter to"),
              filterName: z.string().describe("Name of the new filter to be created"),
              filterKind: z.string().describe("The kind of filter to be created"),
              filterSettings: z.record(z.string(), z.any()).optional().describe("Settings object to initialize the filter with")
            }) }, async ({ sourceName, filterName, filterKind, filterSettings }) => {
              try {
                const requestParams: Record<string, any> = { sourceName, filterName, filterKind };
                if (filterSettings !== undefined) {
                  requestParams.filterSettings = filterSettings;
                }

                await client.sendRequest("CreateSourceFilter", requestParams);
                return {
                  content: [
                    {
                      type: "text",
                      text: `Successfully created filter '${filterName}' of kind '${filterKind}' on source '${sourceName}'`
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error creating source filter: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // RemoveSourceFilter tool
  server.registerTool("obs-remove-source-filter", { description: "Removes a filter from a source", inputSchema: z.object({
              sourceName: z.string().describe("Name of the source the filter is on"),
              filterName: z.string().describe("Name of the filter to remove")
            }) }, async ({ sourceName, filterName }) => {
              try {
                await client.sendRequest("RemoveSourceFilter", { sourceName, filterName });
                return {
                  content: [
                    {
                      type: "text",
                      text: `Successfully removed filter '${filterName}' from source '${sourceName}'`
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error removing source filter: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // SetSourceFilterName tool
  server.registerTool("obs-set-source-filter-name", { description: "Sets the name of a source filter (rename)", inputSchema: z.object({
              sourceName: z.string().describe("Name of the source the filter is on"),
              filterName: z.string().describe("Current name of the filter"),
              newFilterName: z.string().describe("New name for the filter")
            }) }, async ({ sourceName, filterName, newFilterName }) => {
              try {
                await client.sendRequest("SetSourceFilterName", { sourceName, filterName, newFilterName });
                return {
                  content: [
                    {
                      type: "text",
                      text: `Successfully renamed filter '${filterName}' to '${newFilterName}' on source '${sourceName}'`
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error renaming source filter: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // GetSourceFilter tool
  server.registerTool("obs-get-source-filter", { description: "Gets the info for a specific source filter", inputSchema: z.object({
              sourceName: z.string().describe("Name of the source"),
              filterName: z.string().describe("Name of the filter")
            }) }, async ({ sourceName, filterName }) => {
              try {
                const response = await client.sendRequest("GetSourceFilter", { sourceName, filterName });
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
                      text: `Error getting source filter info: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // SetSourceFilterIndex tool
  server.registerTool("obs-set-source-filter-index", { description: "Sets the index position of a filter on a source", inputSchema: z.object({
              sourceName: z.string().describe("Name of the source the filter is on"),
              filterName: z.string().describe("Name of the filter"),
              filterIndex: z.number().min(0).describe("New index position of the filter")
            }) }, async ({ sourceName, filterName, filterIndex }) => {
              try {
                await client.sendRequest("SetSourceFilterIndex", { sourceName, filterName, filterIndex });
                return {
                  content: [
                    {
                      type: "text",
                      text: `Successfully set filter '${filterName}' to index ${filterIndex} on source '${sourceName}'`
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error setting source filter index: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // SetSourceFilterSettings tool
  server.registerTool("obs-set-source-filter-settings", { description: "Sets the settings of a source filter", inputSchema: z.object({
              sourceName: z.string().describe("Name of the source the filter is on"),
              filterName: z.string().describe("Name of the filter to set the settings of"),
              filterSettings: z.record(z.string(), z.any()).describe("Object of settings to apply"),
              overlay: z.boolean().optional().describe("True to apply settings on top of existing ones, False to reset to defaults first")
            }) }, async ({ sourceName, filterName, filterSettings, overlay }) => {
              try {
                const requestParams: Record<string, any> = { sourceName, filterName, filterSettings };
                if (overlay !== undefined) {
                  requestParams.overlay = overlay;
                }

                await client.sendRequest("SetSourceFilterSettings", requestParams);
                return {
                  content: [
                    {
                      type: "text",
                      text: `Successfully updated settings for filter '${filterName}' on source '${sourceName}'`
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error setting source filter settings: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });

  // SetSourceFilterEnabled tool
  server.registerTool("obs-set-source-filter-enabled", { description: "Sets the enable state of a source filter", inputSchema: z.object({
              sourceName: z.string().describe("Name of the source the filter is on"),
              filterName: z.string().describe("Name of the filter"),
              filterEnabled: z.boolean().describe("New enable state of the filter")
            }) }, async ({ sourceName, filterName, filterEnabled }) => {
              try {
                await client.sendRequest("SetSourceFilterEnabled", { sourceName, filterName, filterEnabled });
                return {
                  content: [
                    {
                      type: "text",
                      text: `Successfully ${filterEnabled ? "enabled" : "disabled"} filter '${filterName}' on source '${sourceName}'`
                    }
                  ]
                };
              } catch (error) {
                return {
                  content: [
                    {
                      type: "text",
                      text: `Error setting source filter enabled state: ${error instanceof Error ? error.message : String(error)}`
                    }
                  ],
                  isError: true
                };
              }
            });
}