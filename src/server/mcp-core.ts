/**
 * @file mcp-core.ts
 * @description Core Model Context Protocol (MCP) JSON-RPC 2.0 Engine for svg-MCP-TN.
 * Implements MCP specification tools: search_emoji, get_emoji_svg, get_emoji_component.
 * Pure TypeScript, zero Node.js dependencies, 100% Cloudflare Edge Runtime compatible.
 */

import {
  EMOJIS,
  searchEmojis,
  getEmojiById,
  generateReactComponent,
  generateVueComponent,
} from '../data/emojis';

export interface JsonRpcRequest {
  jsonrpc: '2.0';
  id?: string | number | null;
  method: string;
  params?: any;
}

export interface JsonRpcResponse {
  jsonrpc: '2.0';
  id: string | number | null;
  result?: any;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
}

export const MCP_SERVER_INFO = {
  name: 'svg-mcp-tn',
  title: 'SVG Emoji Library MCP Server',
  version: '1.0.0',
  description: 'AI-assisted vector SVG emoji search & component generator for web developers.',
  protocolVersion: '2024-11-05',
};

export const MCP_TOOLS_SPEC = [
  {
    name: 'search_emoji',
    description:
      'Search the svg-MCP-TN library of modern vector SVG emojis by keyword, tag, or category. Returns matching emoji IDs, names, tags, and descriptions.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search term or keyword (e.g. "rocket", "deploy", "database", "ai", "security")',
        },
        category: {
          type: 'string',
          enum: ['all', 'developer', 'ai-tech', 'cloud-infra', 'security', 'status-energy', 'creative'],
          description: 'Filter emojis by specific functional category',
        },
        limit: {
          type: 'number',
          description: 'Maximum number of results to return (default: 10)',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'get_emoji_svg',
    description:
      'Retrieve clean, production-ready, handcrafted raw SVG markup for a given emoji ID. Ideal for inlining into HTML, Astro, Svelte, or SVG files.',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'The unique ID of the emoji (e.g., "rocket", "fire", "brain", "code", "database")',
        },
      },
      required: ['id'],
    },
  },
  {
    name: 'get_emoji_component',
    description:
      'Generate ready-to-use component code for React (TSX/JSX) or Vue 3 SFC for a specific emoji ID with customizable size and className props.',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'The unique ID of the emoji (e.g., "rocket", "code", "database")',
        },
        framework: {
          type: 'string',
          enum: ['react', 'vue'],
          description: 'The target frontend framework ("react" for React/Next.js TSX or "vue" for Vue 3 SFC). Default is react.',
        },
        componentName: {
          type: 'string',
          description: 'Optional custom component name (e.g. "RocketEmoji" or "AppLaunchIcon")',
        },
      },
      required: ['id'],
    },
  },
];

/**
 * Handles a single MCP JSON-RPC 2.0 request.
 */
export function handleMcpRequest(req: JsonRpcRequest): JsonRpcResponse | null {
  const { jsonrpc, id = null, method, params } = req;

  // JSON-RPC 2.0 validation
  if (jsonrpc !== '2.0') {
    return {
      jsonrpc: '2.0',
      id: id,
      error: {
        code: -32600,
        message: 'Invalid Request: jsonrpc must be "2.0"',
      },
    };
  }

  // Handle Notifications (no ID)
  if (id === undefined || id === null) {
    if (method === 'notifications/initialized' || method === 'initialized') {
      return null;
    }
  }

  switch (method) {
    case 'ping':
      return {
        jsonrpc: '2.0',
        id,
        result: {},
      };

    case 'initialize':
      return {
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: MCP_SERVER_INFO.protocolVersion,
          capabilities: {
            tools: {
              listChanged: false,
            },
            resources: {},
            prompts: {},
          },
          serverInfo: {
            name: MCP_SERVER_INFO.name,
            version: MCP_SERVER_INFO.version,
          },
        },
      };

    case 'tools/list':
      return {
        jsonrpc: '2.0',
        id,
        result: {
          tools: MCP_TOOLS_SPEC,
        },
      };

    case 'tools/call': {
      const toolName = params?.name;
      const args = params?.arguments || {};

      if (!toolName) {
        return {
          jsonrpc: '2.0',
          id,
          error: {
            code: -32602,
            message: 'Invalid params: Missing tool "name" in params',
          },
        };
      }

      if (toolName === 'search_emoji') {
        const query = typeof args.query === 'string' ? args.query : '';
        const category = typeof args.category === 'string' ? args.category : 'all';
        const limit = typeof args.limit === 'number' && args.limit > 0 ? args.limit : 10;

        const results = searchEmojis(query, category).slice(0, limit);
        const formatted = results.map((e) => ({
          id: e.id,
          name: e.name,
          category: e.category,
          tags: e.tags,
          description: e.description,
        }));

        return {
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: JSON.stringify(
                  {
                    totalFound: results.length,
                    results: formatted,
                    message: `Found ${results.length} matching emojis for query "${query}". Use get_emoji_svg or get_emoji_component to fetch SVG or code.`,
                  },
                  null,
                  2
                ),
              },
            ],
          },
        };
      }

      if (toolName === 'get_emoji_svg') {
        const emojiId = args.id;
        if (!emojiId || typeof emojiId !== 'string') {
          return {
            jsonrpc: '2.0',
            id,
            error: {
              code: -32602,
              message: 'Invalid params: "id" must be a non-empty string',
            },
          };
        }

        const item = getEmojiById(emojiId);
        if (!item) {
          const availableIds = EMOJIS.map((e) => e.id).join(', ');
          return {
            jsonrpc: '2.0',
            id,
            result: {
              isError: true,
              content: [
                {
                  type: 'text',
                  text: `Emoji with ID "${emojiId}" was not found. Available IDs: ${availableIds}`,
                },
              ],
            },
          };
        }

        return {
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: item.svg,
              },
            ],
            metadata: {
              id: item.id,
              name: item.name,
              category: item.category,
            },
          },
        };
      }

      if (toolName === 'get_emoji_component') {
        const emojiId = args.id;
        const framework = (args.framework || 'react').toLowerCase();
        const componentName = args.componentName;

        if (!emojiId || typeof emojiId !== 'string') {
          return {
            jsonrpc: '2.0',
            id,
            error: {
              code: -32602,
              message: 'Invalid params: "id" must be a non-empty string',
            },
          };
        }

        const item = getEmojiById(emojiId);
        if (!item) {
          return {
            jsonrpc: '2.0',
            id,
            result: {
              isError: true,
              content: [
                {
                  type: 'text',
                  text: `Emoji with ID "${emojiId}" was not found.`,
                },
              ],
            },
          };
        }

        let codeSnippet = '';
        if (framework === 'vue') {
          codeSnippet = generateVueComponent(item);
        } else {
          codeSnippet = generateReactComponent(item, componentName);
        }

        return {
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: codeSnippet,
              },
            ],
            metadata: {
              framework,
              id: item.id,
              name: item.name,
            },
          },
        };
      }

      return {
        jsonrpc: '2.0',
        id,
        error: {
          code: -32601,
          message: `Method not found: Tool "${toolName}" is not registered on this MCP server.`,
        },
      };
    }

    case 'resources/list':
      return {
        jsonrpc: '2.0',
        id,
        result: {
          resources: [
            {
              uri: 'svg-mcp://emojis/catalog',
              name: 'SVG Emoji Catalog',
              mimeType: 'application/json',
              description: 'Full catalog of available vector emojis and metadata in svg-MCP-TN',
            },
          ],
        },
      };

    case 'prompts/list':
      return {
        jsonrpc: '2.0',
        id,
        result: {
          prompts: [
            {
              name: 'suggest_emoji',
              description: 'Suggest the most fitting modern vector SVG emojis for a UI component or feature',
              arguments: [
                {
                  name: 'feature_description',
                  description: 'Brief description of the UI feature (e.g., "Deploy button", "Dark mode toggle", "Billing database")',
                  required: true,
                },
              ],
            },
          ],
        },
      };

    default:
      return {
        jsonrpc: '2.0',
        id,
        error: {
          code: -32601,
          message: `Method not found: "${method}"`,
        },
      };
  }
}
