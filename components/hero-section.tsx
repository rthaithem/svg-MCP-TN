import * as React from 'react';
import { Bot, Copy, Check, Terminal, Zap, Shield, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface HeroSectionProps {
  onOpenMcpModal: () => void;
  onOpenTester: () => void;
  totalEmojis: number;
}

export function HeroSection({ onOpenMcpModal, onOpenTester, totalEmojis }: HeroSectionProps) {
  const [copied, setCopied] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'cursor' | 'claude' | 'curl'>('cursor');

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://your-domain.com';
  const mcpUrl = `${origin}/api/mcp`;

  const cursorSnippet = `{
  "mcpServers": {
    "svg-emojis": {
      "url": "${mcpUrl}",
      "transport": "sse"
    }
  }
}`;

  const claudeSnippet = `{
  "mcpServers": {
    "svg-emojis": {
      "url": "${mcpUrl}"
    }
  }
}`;

  const curlSnippet = `curl -X POST ${mcpUrl} \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"search_emoji","arguments":{"query":"rocket"}}}'`;

  const currentSnippet =
    activeTab === 'cursor'
      ? cursorSnippet
      : activeTab === 'claude'
      ? claudeSnippet
      : curlSnippet;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-slate-50/50 via-white to-white py-12 md:py-16 dark:border-slate-800/80 dark:from-slate-950/60 dark:via-slate-950 dark:to-slate-950 transition-colors">
      {/* Subtle Background Grid */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-semibold text-sky-700 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-300 mb-3 sm:mb-4">
              <Sparkles className="h-3.5 w-3.5 text-sky-500 shrink-0" />
              <span className="truncate">MCP Protocol • Cloudflare Edge Runtime</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-sans leading-[1.2]">
              Modern Vector SVG Emojis for{' '}
              <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Developers & AI Assistants
              </span>
            </h1>

            {/* Description */}
            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal">
              High-performance, handcrafted SVG vector emojis with an integrated JSON-RPC 2.0
              MCP Server. Let Cursor, Claude, and Windsurf search emojis, fetch clean SVG paths, and
              generate React & Vue components straight in your editor.
            </p>

            {/* Key feature pills */}
            <div className="mt-5 sm:mt-6 flex flex-wrap gap-1.5 sm:gap-2.5">
              <Badge variant="secondary" className="gap-1.5 py-1 px-2.5 sm:px-3 text-[11px] sm:text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                {totalEmojis}+ Vector SVGs
              </Badge>
              <Badge variant="secondary" className="gap-1.5 py-1 px-2.5 sm:px-3 text-[11px] sm:text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-500 shrink-0" />
                Zero System Fonts
              </Badge>
              <Badge variant="secondary" className="gap-1.5 py-1 px-2.5 sm:px-3 text-[11px] sm:text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0" />
                Cloudflare Pages Edge
              </Badge>
              <Badge variant="secondary" className="gap-1.5 py-1 px-2.5 sm:px-3 text-[11px] sm:text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                React TSX & Vue 3 SFC
              </Badge>
            </div>

            {/* Primary Action Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                onClick={onOpenMcpModal}
                className="w-full sm:w-auto justify-center bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-sm font-semibold shadow-md shadow-sky-600/20 h-11"
              >
                <Bot className="h-4 w-4" />
                <span>Connect to Cursor & Claude</span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={onOpenTester}
                className="w-full sm:w-auto justify-center text-sm font-medium border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 h-11"
              >
                <Terminal className="h-4 w-4" />
                <span>Live MCP Playground</span>
              </Button>
            </div>
          </div>

          {/* Right Column: Interactive Quick MCP Connection Card */}
          <div className="lg:col-span-5 w-full">
            <div className="rounded-xl border border-slate-200 bg-white/95 p-4 sm:p-5 shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-black/40 backdrop-blur-xs">
              {/* Header with platform tabs */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 truncate">
                    Live MCP Config
                  </span>
                </div>

                <div className="flex items-center rounded-md bg-slate-100 p-0.5 dark:bg-slate-800 text-xs shrink-0">
                  <button
                    onClick={() => setActiveTab('cursor')}
                    className={`px-2 py-0.5 rounded text-[11px] sm:text-xs transition-colors ${
                      activeTab === 'cursor'
                        ? 'bg-white font-medium text-slate-900 shadow-xs dark:bg-slate-700 dark:text-white'
                        : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
                    }`}
                  >
                    Cursor
                  </button>
                  <button
                    onClick={() => setActiveTab('claude')}
                    className={`px-2 py-0.5 rounded text-[11px] sm:text-xs transition-colors ${
                      activeTab === 'claude'
                        ? 'bg-white font-medium text-slate-900 shadow-xs dark:bg-slate-700 dark:text-white'
                        : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
                    }`}
                  >
                    Claude
                  </button>
                  <button
                    onClick={() => setActiveTab('curl')}
                    className={`px-2 py-0.5 rounded text-[11px] sm:text-xs transition-colors ${
                      activeTab === 'curl'
                        ? 'bg-white font-medium text-slate-900 shadow-xs dark:bg-slate-700 dark:text-white'
                        : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
                    }`}
                  >
                    cURL
                  </button>
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="relative mt-3">
                <pre className="overflow-x-auto rounded-lg bg-slate-950 p-3 sm:p-3.5 text-xs text-slate-200 font-mono leading-relaxed border border-slate-800 max-h-48 scrollbar-none">
                  <code>{currentSnippet}</code>
                </pre>

                <button
                  onClick={handleCopy}
                  className="absolute right-2 top-2 flex items-center gap-1 rounded bg-slate-800/90 px-2 py-1 text-[10px] sm:text-[11px] font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors border border-slate-700 backdrop-blur-xs"
                  aria-label="Copy MCP Configuration"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Footer instruction */}
              <div className="mt-3 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="truncate">
                  {activeTab === 'cursor' && 'Add to project .cursor/mcp.json'}
                  {activeTab === 'claude' && 'Add to Claude Desktop config file'}
                  {activeTab === 'curl' && 'Execute in terminal for JSON-RPC test'}
                </span>
                <button
                  onClick={onOpenMcpModal}
                  className="inline-flex items-center gap-1 text-sky-600 hover:text-sky-500 dark:text-sky-400 font-medium shrink-0"
                >
                  <span>Full Guide</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
