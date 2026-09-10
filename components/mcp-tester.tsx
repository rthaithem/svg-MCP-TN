import * as React from 'react';
import {
  Terminal,
  Play,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Layers,
  ArrowRight,
  Code2,
  Clock,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EMOJIS } from '@/src/data/emojis';
import { handleMcpRequest, JsonRpcRequest } from '@/src/server/mcp-core';

export function McpTester() {
  const [selectedTool, setSelectedTool] = React.useState<
    'search_emoji' | 'get_emoji_svg' | 'get_emoji_component' | 'tools/list' | 'initialize'
  >('search_emoji');

  // Input fields
  const [searchQuery, setSearchQuery] = React.useState('rocket');
  const [categoryFilter, setCategoryFilter] = React.useState('all');
  const [selectedEmojiId, setSelectedEmojiId] = React.useState('rocket');
  const [targetFramework, setTargetFramework] = React.useState<'react' | 'vue'>('react');
  const [customComponentName, setCustomComponentName] = React.useState('RocketIcon');

  // Response state
  const [requestPayload, setRequestPayload] = React.useState<string>('');
  const [responsePayload, setResponsePayload] = React.useState<string>('');
  const [latency, setLatency] = React.useState<number | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [copiedReq, setCopiedReq] = React.useState(false);
  const [copiedRes, setCopiedRes] = React.useState(false);
  const [renderedSvg, setRenderedSvg] = React.useState<string | null>(null);

  // Generate request object based on current inputs
  const buildRequest = React.useCallback((): JsonRpcRequest => {
    if (selectedTool === 'tools/list') {
      return {
        jsonrpc: '2.0',
        id: Date.now(),
        method: 'tools/list',
        params: {},
      };
    }

    if (selectedTool === 'initialize') {
      return {
        jsonrpc: '2.0',
        id: Date.now(),
        method: 'initialize',
        params: {
          protocolVersion: '2024-11-05',
          capabilities: {},
          clientInfo: {
            name: 'Web-Tester',
            version: '1.0.0',
          },
        },
      };
    }

    if (selectedTool === 'search_emoji') {
      return {
        jsonrpc: '2.0',
        id: Date.now(),
        method: 'tools/call',
        params: {
          name: 'search_emoji',
          arguments: {
            query: searchQuery,
            category: categoryFilter,
            limit: 5,
          },
        },
      };
    }

    if (selectedTool === 'get_emoji_svg') {
      return {
        jsonrpc: '2.0',
        id: Date.now(),
        method: 'tools/call',
        params: {
          name: 'get_emoji_svg',
          arguments: {
            id: selectedEmojiId,
          },
        },
      };
    }

    if (selectedTool === 'get_emoji_component') {
      return {
        jsonrpc: '2.0',
        id: Date.now(),
        method: 'tools/call',
        params: {
          name: 'get_emoji_component',
          arguments: {
            id: selectedEmojiId,
            framework: targetFramework,
            componentName: customComponentName,
          },
        },
      };
    }

    return {
      jsonrpc: '2.0',
      id: 1,
      method: 'ping',
    };
  }, [
    selectedTool,
    searchQuery,
    categoryFilter,
    selectedEmojiId,
    targetFramework,
    customComponentName,
  ]);

  // Update request preview whenever inputs change
  React.useEffect(() => {
    const req = buildRequest();
    setRequestPayload(JSON.stringify(req, null, 2));
  }, [buildRequest]);

  // Execute request
  const executeCall = async () => {
    setIsLoading(true);
    setRenderedSvg(null);
    const req = buildRequest();
    setRequestPayload(JSON.stringify(req, null, 2));

    const startTime = performance.now();

    try {
      // Execute fetch to /api/mcp endpoint
      const res = await fetch('/api/mcp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      });

      const elapsed = Math.max(1, Math.round(performance.now() - startTime));
      setLatency(elapsed);

      if (res.ok) {
        const data = await res.json();
        setResponsePayload(JSON.stringify(data, null, 2));

        // If it's get_emoji_svg and returned SVG text, extract it for live rendering
        if (
          selectedTool === 'get_emoji_svg' &&
          data.result?.content?.[0]?.text?.startsWith('<svg')
        ) {
          setRenderedSvg(data.result.content[0].text);
        }
      } else {
        // Fallback to internal engine
        const fallbackRes = handleMcpRequest(req);
        setResponsePayload(JSON.stringify(fallbackRes, null, 2));
        if (
          selectedTool === 'get_emoji_svg' &&
          fallbackRes?.result?.content?.[0]?.text?.startsWith('<svg')
        ) {
          setRenderedSvg(fallbackRes.result.content[0].text);
        }
      }
    } catch {
      // Local fallback execution
      const elapsed = Math.max(1, Math.round(performance.now() - startTime));
      setLatency(elapsed);
      const fallbackRes = handleMcpRequest(req);
      setResponsePayload(JSON.stringify(fallbackRes, null, 2));

      if (
        selectedTool === 'get_emoji_svg' &&
        fallbackRes?.result?.content?.[0]?.text?.startsWith('<svg')
      ) {
        setRenderedSvg(fallbackRes.result.content[0].text);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Run on first load
  React.useEffect(() => {
    executeCall();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 font-sans">
              Interactive MCP Live Tester
            </h2>
            <Badge variant="sky" className="text-xs">
              JSON-RPC 2.0
            </Badge>
          </div>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Simulate how Cursor, Claude, and Windsurf AI assistants query your edge MCP server.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            variant="primary"
            onClick={executeCall}
            disabled={isLoading}
            className="gap-2 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 shadow-sm"
          >
            <Play className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Executing...' : 'Execute JSON-RPC Call'}</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Tool Configurator */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Terminal className="h-4 w-4 text-sky-500" />
              <span>Select MCP Tool</span>
            </h3>

            {/* Tool Selection Radio Pills */}
            <div className="space-y-1.5">
              {[
                { id: 'search_emoji', label: 'search_emoji', desc: 'Find emojis by query or tag' },
                { id: 'get_emoji_svg', label: 'get_emoji_svg', desc: 'Fetch clean raw SVG markup' },
                {
                  id: 'get_emoji_component',
                  label: 'get_emoji_component',
                  desc: 'Generate React / Vue SFC code',
                },
                { id: 'tools/list', label: 'tools/list', desc: 'Discover all registered MCP tools' },
                { id: 'initialize', label: 'initialize', desc: 'Test protocol handshake' },
              ].map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id as any)}
                  className={`w-full text-left p-2.5 rounded-lg border transition-all ${
                    selectedTool === tool.id
                      ? 'border-sky-500 bg-sky-50/70 text-sky-900 dark:border-sky-500 dark:bg-sky-950/40 dark:text-sky-200'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold">{tool.label}</span>
                    {selectedTool === tool.id && (
                      <span className="h-2 w-2 rounded-full bg-sky-600 dark:bg-sky-400" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {tool.desc}
                  </p>
                </button>
              ))}
            </div>

            {/* Dynamic Parameter Inputs */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Tool Parameters
              </h4>

              {selectedTool === 'search_emoji' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Query Keyword:
                    </label>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="e.g. rocket, database, brain"
                      className="w-full h-8 px-2.5 text-xs rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-sky-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Category Filter:
                    </label>
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="w-full h-8 px-2.5 text-xs rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    >
                      <option value="all">all categories</option>
                      <option value="developer">developer</option>
                      <option value="ai-tech">ai-tech</option>
                      <option value="cloud-infra">cloud-infra</option>
                      <option value="security">security</option>
                      <option value="status-energy">status-energy</option>
                      <option value="creative">creative</option>
                    </select>
                  </div>
                </div>
              )}

              {(selectedTool === 'get_emoji_svg' || selectedTool === 'get_emoji_component') && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Emoji ID:
                    </label>
                    <select
                      value={selectedEmojiId}
                      onChange={(e) => setSelectedEmojiId(e.target.value)}
                      className="w-full h-8 px-2.5 text-xs rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-sky-500 font-mono"
                    >
                      {EMOJIS.map((e) => (
                        <option key={e.id} value={e.id}>
                          {e.id} ({e.name})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {selectedTool === 'get_emoji_component' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Framework:
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setTargetFramework('react')}
                        className={`flex-1 py-1 text-xs rounded border transition-colors ${
                          targetFramework === 'react'
                            ? 'bg-sky-600 text-white font-medium border-sky-600'
                            : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        React (TSX)
                      </button>
                      <button
                        onClick={() => setTargetFramework('vue')}
                        className={`flex-1 py-1 text-xs rounded border transition-colors ${
                          targetFramework === 'vue'
                            ? 'bg-emerald-600 text-white font-medium border-emerald-600'
                            : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        Vue 3 SFC
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Component Name:
                    </label>
                    <input
                      type="text"
                      value={customComponentName}
                      onChange={(e) => setCustomComponentName(e.target.value)}
                      placeholder="e.g. RocketIcon"
                      className="w-full h-8 px-2.5 text-xs rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-sky-500 font-mono"
                    />
                  </div>
                </div>
              )}

              {(selectedTool === 'tools/list' || selectedTool === 'initialize') && (
                <p className="text-xs text-slate-500 italic">
                  No input parameters required for standard discovery handshake.
                </p>
              )}
            </div>

            <Button
              variant="primary"
              onClick={executeCall}
              disabled={isLoading}
              className="w-full h-9 text-xs font-semibold gap-1.5 bg-sky-600 hover:bg-sky-500 text-white"
            >
              <Play className="h-3.5 w-3.5" />
              <span>Send Request to Server</span>
            </Button>
          </div>
        </div>

        {/* Right Column: Live Payloads & Live Stage */}
        <div className="lg:col-span-8 space-y-4">
          {/* Top Stage: Live Rendered SVG if applicable */}
          {renderedSvg && (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="h-14 w-14 flex items-center justify-center p-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs"
                  dangerouslySetInnerHTML={{ __html: renderedSvg }}
                />
                <div>
                  <h4 className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                    Live SVG Rendered from Tool Output
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    Received clean vector paths from `get_emoji_svg`.
                  </p>
                </div>
              </div>
              <Badge variant="success" className="text-xs">
                Parsed OK
              </Badge>
            </div>
          )}

          {/* Request & Response Side-by-Side or Stacked */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Outgoing Request Box */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                <span className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">
                  JSON-RPC Request (Client &rarr; Server)
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(requestPayload);
                    setCopiedReq(true);
                    setTimeout(() => setCopiedReq(false), 1500);
                  }}
                  className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                >
                  {copiedReq ? (
                    <Check className="h-3 w-3 text-emerald-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                  <span>{copiedReq ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <pre className="overflow-x-auto rounded-lg bg-slate-950 p-3 text-[11px] text-slate-200 font-mono leading-relaxed border border-slate-800 flex-1 min-h-[220px] max-h-[360px]">
                <code>{requestPayload}</code>
              </pre>
            </div>

            {/* Incoming Response Box */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Server Response (JSON-RPC 2.0)
                  </span>
                  {latency !== null && (
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded">
                      <Clock className="h-2.5 w-2.5" />
                      {latency}ms
                    </span>
                  )}
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(responsePayload);
                    setCopiedRes(true);
                    setTimeout(() => setCopiedRes(false), 1500);
                  }}
                  className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                >
                  {copiedRes ? (
                    <Check className="h-3 w-3 text-emerald-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                  <span>{copiedRes ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <pre className="overflow-x-auto rounded-lg bg-slate-950 p-3 text-[11px] text-emerald-400 font-mono leading-relaxed border border-slate-800 flex-1 min-h-[220px] max-h-[360px]">
                <code>{responsePayload || '// Waiting for execution...'}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
