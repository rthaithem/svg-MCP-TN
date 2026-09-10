/**
 * @file route.ts
 * @description Cloudflare Pages Edge-compatible Model Context Protocol (MCP) Route Handler.
 * Supports JSON-RPC 2.0 over HTTP and Server-Sent Events (SSE) for Cursor, Claude, and Windsurf.
 * Enforces edge runtime execution for ultra-low latency globally distributed delivery.
 */

import {
  handleMcpRequest,
  MCP_SERVER_INFO,
  MCP_TOOLS_SPEC,
  JsonRpcRequest,
} from '@/src/server/mcp-core';

/**
 * Cloudflare Workers / Pages Edge Runtime configuration.
 * Guarantees execution at the edge with zero Node.js server overhead.
 */
export const runtime = 'edge';

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, mcp-session-id, x-mcp-version',
  'Cache-Control': 'no-cache, no-transform',
};

/**
 * Preflight CORS handler for AI assistant clients.
 */
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

/**
 * GET handler:
 * - If client requests SSE (`Accept: text/event-stream`), establishes an active MCP event stream.
 * - Otherwise, returns JSON server status, version, and tool definitions.
 */
export async function GET(request: Request) {
  const acceptHeader = request.headers.get('accept') || '';

  // Handle Server-Sent Events (SSE) transport requested by modern MCP clients
  if (acceptHeader.includes('text/event-stream')) {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        // Send initial endpoint announcement
        const endpointUrl = new URL(request.url);
        controller.enqueue(
          encoder.encode(
            `event: endpoint\ndata: ${endpointUrl.pathname}\n\n`
          )
        );

        // Keepalive ping comment
        controller.enqueue(
          encoder.encode(
            `: keepalive svg-mcp-tn edge server\n\n`
          )
        );
      },
    });

    return new Response(stream, {
      status: 200,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
      },
    });
  }

  // Standard JSON response for browser checks & API consumers
  const statusPayload = {
    status: 'online',
    protocol: 'Model Context Protocol (MCP) JSON-RPC 2.0',
    runtime: 'Cloudflare Pages Edge Runtime',
    serverInfo: MCP_SERVER_INFO,
    endpoints: {
      http: '/api/mcp',
      sse: '/api/mcp (with Accept: text/event-stream)',
    },
    tools: MCP_TOOLS_SPEC,
    quickUsage: {
      cursor: 'Add to .cursor/mcp.json as an SSE/HTTP MCP server',
      claude: 'Add to claude_desktop_config.json',
      windsurf: 'Add to ~/.codeium/windsurf/mcp_config.json',
    },
  };

  return new Response(JSON.stringify(statusPayload, null, 2), {
    status: 200,
    headers: {
      ...CORS_HEADERS,
      'Content-Type': 'application/json',
    },
  });
}

/**
 * POST handler:
 * Processes incoming JSON-RPC 2.0 requests from Cursor, Claude, Windsurf, or REST callers.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Handle batch JSON-RPC requests
    if (Array.isArray(body)) {
      const responses = body
        .map((req: JsonRpcRequest) => handleMcpRequest(req))
        .filter(Boolean);
      return new Response(JSON.stringify(responses), {
        status: 200,
        headers: {
          ...CORS_HEADERS,
          'Content-Type': 'application/json',
        },
      });
    }

    // Single JSON-RPC request
    const response = handleMcpRequest(body as JsonRpcRequest);

    // Notifications return 204 No Content
    if (!response) {
      return new Response(null, {
        status: 204,
        headers: CORS_HEADERS,
      });
    }

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'application/json',
      },
    });
  } catch (err: any) {
    const errorResponse = {
      jsonrpc: '2.0',
      id: null,
      error: {
        code: -32700,
        message: 'Parse error: Invalid JSON was received by the server.',
        data: err?.message,
      },
    };

    return new Response(JSON.stringify(errorResponse), {
      status: 400,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'application/json',
      },
    });
  }
}
