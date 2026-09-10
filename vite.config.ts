import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';
import { handleMcpRequest, MCP_SERVER_INFO, MCP_TOOLS_SPEC } from './src/server/mcp-core';

function mcpServerPlugin(): Plugin {
  return {
    name: 'mcp-server-endpoint',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api/mcp')) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, mcp-session-id, x-mcp-version');

          if (req.method === 'OPTIONS') {
            res.statusCode = 204;
            res.end();
            return;
          }

          if (req.method === 'GET') {
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify(
                {
                  status: 'online',
                  protocol: 'Model Context Protocol (MCP) JSON-RPC 2.0',
                  runtime: 'Cloudflare Pages Edge & Local Dev Server',
                  serverInfo: MCP_SERVER_INFO,
                  tools: MCP_TOOLS_SPEC,
                },
                null,
                2
              )
            );
            return;
          }

          if (req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });
            req.on('end', () => {
              try {
                const parsed = JSON.parse(body || '{}');
                if (Array.isArray(parsed)) {
                  const responses = parsed.map((item) => handleMcpRequest(item)).filter(Boolean);
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(responses));
                  return;
                }
                const result = handleMcpRequest(parsed);
                if (!result) {
                  res.statusCode = 204;
                  res.end();
                  return;
                }
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(result));
              } catch (err: any) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(
                  JSON.stringify({
                    jsonrpc: '2.0',
                    id: null,
                    error: {
                      code: -32700,
                      message: 'Parse error',
                      data: err?.message,
                    },
                  })
                );
              }
            });
            return;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), mcpServerPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
