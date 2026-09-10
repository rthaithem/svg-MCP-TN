import * as React from 'react';
import {
  BookOpen,
  Terminal,
  Layers,
  Cloud,
  Code2,
  Copy,
  Check,
  Cpu,
  Shield,
  Bot,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MCP_TOOLS_SPEC } from '@/src/server/mcp-core';

export function DocsView() {
  const [copiedSection, setCopiedSection] = React.useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 1800);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Docs Header */}
      <div className="border-b border-slate-200 pb-8 dark:border-slate-800">
        <Badge variant="sky" className="mb-3 text-xs">
          Documentation & Integration Guide
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-sans">
          Model Context Protocol (MCP) Guide for svg-MCP-TN
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
          Learn how to integrate the svg-MCP-TN emoji library into your AI coding workflows with
          Cursor, Claude Desktop, and Windsurf, and how to deploy this server globally using
          Cloudflare Pages Edge Runtime.
        </p>

        {/* Development Status Warning Banner */}
        <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-900 dark:text-amber-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs sm:text-sm">
              <p className="font-bold tracking-tight text-amber-800 dark:text-amber-300">
                Notice: Project Under Active Construction — Highly Experimental &amp; Unstable
              </p>
              <p className="text-amber-700/90 dark:text-amber-200/80 leading-relaxed">
                This project is currently in active pre-v1.0 development. The MCP tool interfaces, JSON-RPC schemas,
                SVG vector paths, and endpoint contracts are subject to breaking changes without notice.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: Overview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Bot className="h-5 w-5 text-sky-500" />
          <span>1. Architecture & Protocol Fundamentals</span>
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          The <strong>Model Context Protocol (MCP)</strong> is an open standard introduced by
          Anthropic that enables AI agents to securely interact with external tools and data
          sources. In <code>svg-MCP-TN</code>, we expose our curated collection of vector SVG emojis
          directly through an edge-hosted JSON-RPC 2.0 endpoint.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Instead of AI assistants inventing hallucinated, broken SVGs or relying on outdated native
          system fonts, your assistant calls <code>search_emoji</code>, grabs the handcrafted vector
          markup via <code>get_emoji_svg</code>, or directly injects a TypeScript React component via{' '}
          <code>get_emoji_component</code>.
        </p>
      </section>

      {/* Section 2: Tools Specification */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Terminal className="h-5 w-5 text-indigo-500" />
          <span>2. Exposed AI Tools & Schemas</span>
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          The MCP server exposes three primary tools defined in accordance with the JSON Schema
          standard:
        </p>

        <div className="grid grid-cols-1 gap-4 mt-2">
          {MCP_TOOLS_SPEC.map((tool) => (
            <div
              key={tool.name}
              className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-sky-600 dark:text-sky-400">
                  {tool.name}
                </span>
                <Badge variant="outline" className="text-[11px] font-mono">
                  tools/call
                </Badge>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                {tool.description}
              </p>

              <div className="mt-3">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                  Parameters Schema:
                </span>
                <pre className="overflow-x-auto rounded-lg bg-slate-950 p-3 text-xs text-slate-200 font-mono border border-slate-800">
                  <code>{JSON.stringify(tool.inputSchema, null, 2)}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Editor Setup */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Code2 className="h-5 w-5 text-emerald-500" />
          <span>3. Editor Quickstart Configurations</span>
        </h2>

        {/* Cursor */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 space-y-3">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>Cursor IDE (.cursor/mcp.json)</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Create a file named <code>.cursor/mcp.json</code> in the root of your project:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-slate-950 p-3.5 text-xs text-slate-200 font-mono border border-slate-800">
            <code>{`{
  "mcpServers": {
    "svg-mcp-tn": {
      "url": "https://your-domain.pages.dev/api/mcp",
      "transport": "sse"
    }
  }
}`}</code>
          </pre>
        </div>

        {/* Claude Desktop */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 space-y-3">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>Claude Desktop (claude_desktop_config.json)</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Add to your Claude Desktop configuration file:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-slate-950 p-3.5 text-xs text-slate-200 font-mono border border-slate-800">
            <code>{`{
  "mcpServers": {
    "svg-mcp-tn": {
      "url": "https://your-domain.pages.dev/api/mcp"
    }
  }
}`}</code>
          </pre>
        </div>
      </section>

      {/* Section 4: Cloudflare Pages & Edge Runtime */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Cloud className="h-5 w-5 text-sky-500" />
          <span>4. Cloudflare Pages & Workers Optimization</span>
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          The MCP endpoint is configured with <code>export const runtime = 'edge';</code> inside{' '}
          <code>/app/api/mcp/route.ts</code>. This guarantees zero cold starts and sub-millisecond
          execution at Cloudflare Workers edge nodes worldwide.
        </p>

        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 space-y-3">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            wrangler.toml configuration:
          </h3>
          <pre className="overflow-x-auto rounded-lg bg-slate-950 p-3.5 text-xs text-slate-200 font-mono border border-slate-800">
            <code>{`name = "svg-mcp-tn"
compatibility_date = "2024-09-23"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = ".vercel/output/static"`}</code>
          </pre>
        </div>
      </section>

      {/* Section 5: Contributing Custom Emojis */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
          <span>5. Contributing & Adding Custom SVG Emojis</span>
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          To contribute a new emoji, simply add an entry to <code>src/data/emojis.ts</code>:
        </p>
        <pre className="overflow-x-auto rounded-lg bg-slate-950 p-3.5 text-xs text-slate-200 font-mono border border-slate-800">
          <code>{`{
  id: "custom-icon",
  name: "Custom Icon",
  category: "developer",
  tags: ["tag1", "tag2"],
  keywords: ["keyword1"],
  description: "Descriptive explanation for AI tools.",
  svg: \`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" ...>...</svg>\`
}`}</code>
        </pre>
      </section>
    </div>
  );
}
