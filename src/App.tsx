import * as React from 'react';
import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero-section';
import { SearchBar } from '@/components/search-bar';
import { EmojiGrid } from '@/components/emoji-grid';
import { EmojiPreviewModal } from '@/components/emoji-preview-modal';
import { McpConfigModal } from '@/components/mcp-config-modal';
import { McpTester } from '@/components/mcp-tester';
import { DocsView } from '@/components/docs-view';
import { EMOJIS, EmojiItem, EmojiCategoryId, searchEmojis } from '@/src/data/emojis';
import { Bot, Sparkles, Terminal, Code2, Heart, ExternalLink, Github, BookOpen, AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function App() {
  // Advisory top banner state
  const [showBanner, setShowBanner] = React.useState(true);

  // App views
  const [activeView, setActiveView] = React.useState<'gallery' | 'docs' | 'tester'>('gallery');

  // Search & Filtering State
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<EmojiCategoryId>('all');
  const [previewSize, setPreviewSize] = React.useState(36);

  // Modals state
  const [selectedEmoji, setSelectedEmoji] = React.useState<EmojiItem | null>(null);
  const [isMcpModalOpen, setIsMcpModalOpen] = React.useState(false);

  // Dark/Light Theme state
  const [theme, setTheme] = React.useState<'light' | 'dark'>('dark');

  // Initialize theme from preference or localStorage
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('svg-mcp-theme') as 'light' | 'dark' | null;
    const initialTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(initialTheme);
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('svg-mcp-theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Filtered emojis
  const filteredEmojis = React.useMemo(() => {
    return searchEmojis(searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory]);

  const handleResetSearch = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans selection:bg-sky-500 selection:text-white transition-colors">
      {/* Top Advisory Banner: Project Under Active Construction & Unstable */}
      {showBanner && (
        <aside
          role="alert"
          className="relative z-50 bg-amber-500/10 dark:bg-amber-500/15 border-b border-amber-500/25 px-3 py-2 text-xs text-amber-950 dark:text-amber-200"
        >
          <div className="mx-auto max-w-7xl flex items-center justify-between gap-2.5 px-1 sm:px-4">
            <div className="flex items-center gap-2 min-w-0">
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 shrink-0">
                <AlertTriangle className="h-3 w-3" />
                Experimental
              </span>
              <p className="text-[11px] sm:text-xs font-medium truncate sm:whitespace-normal">
                <strong>Project Under Active Construction &amp; Currently Unstable:</strong> Architectural interfaces and MCP JSON-RPC schemas are in active development.
              </p>
            </div>
            <button
              onClick={() => setShowBanner(false)}
              className="text-amber-700/80 hover:text-amber-950 dark:text-amber-400 dark:hover:text-amber-100 p-1 shrink-0 rounded transition-colors"
              aria-label="Dismiss notice"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </aside>
      )}

      {/* Navigation Header */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenMcpModal={() => setIsMcpModalOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
        totalEmojis={EMOJIS.length}
      />

      {/* Main View Switcher */}
      <main className="flex-1">
        {activeView === 'gallery' && (
          <div>
            {/* Hero Section */}
            <HeroSection
              onOpenMcpModal={() => setIsMcpModalOpen(true)}
              onOpenTester={() => setActiveView('tester')}
              totalEmojis={EMOJIS.length}
            />

            {/* Gallery & Search Content */}
            <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-5 sm:space-y-6">
              {/* Search Bar & Category Navigation */}
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                previewSize={previewSize}
                setPreviewSize={setPreviewSize}
                totalFiltered={filteredEmojis.length}
                totalAll={EMOJIS.length}
              />

              {/* Emoji Icons Grid */}
              <EmojiGrid
                emojis={filteredEmojis}
                displaySize={previewSize}
                onSelectEmoji={(emoji) => setSelectedEmoji(emoji)}
                onResetSearch={handleResetSearch}
                hasFilters={Boolean(searchQuery || selectedCategory !== 'all')}
              />

              {/* Bottom Feature Card: Connect AI Assistant */}
              <div className="mt-8 sm:mt-12 rounded-2xl border border-sky-500/20 bg-gradient-to-r from-sky-500/5 via-indigo-500/5 to-purple-500/5 p-4 sm:p-8 dark:border-sky-400/10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <Bot className="h-5 w-5 text-sky-500 shrink-0" />
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                        Let AI Assist Your Frontend Architecture
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Connect your IDE (Cursor, Windsurf, Claude Desktop) to this server via
                      Model Context Protocol. Your AI can directly find and insert crisp, handcrafted
                      vector SVGs instead of inventing broken inline graphics.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto shrink-0">
                    <Button
                      variant="primary"
                      onClick={() => setIsMcpModalOpen(true)}
                      className="w-full sm:w-auto justify-center bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-xs sm:text-sm h-10"
                    >
                      <Bot className="h-4 w-4" />
                      <span>Get MCP Configuration</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setActiveView('tester')}
                      className="w-full sm:w-auto justify-center border-slate-300 dark:border-slate-700 text-xs sm:text-sm h-10"
                    >
                      <Terminal className="h-4 w-4" />
                      <span>Test in Playground</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'tester' && <McpTester />}

        {activeView === 'docs' && <DocsView />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50/70 py-6 sm:py-8 dark:border-slate-800 dark:bg-slate-900/50 pb-20 md:pb-8 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
            <span className="font-bold text-slate-800 dark:text-slate-200">
              svg-MCP-TN
            </span>
            <span>&bull;</span>
            <span>Open-source Vector SVG Library & MCP Server</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => setActiveView('gallery')}
              className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
            >
              Library
            </button>
            <button
              onClick={() => setActiveView('tester')}
              className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
            >
              MCP Tester
            </button>
            <button
              onClick={() => setActiveView('docs')}
              className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
            >
              Docs
            </button>
            <a
              href="https://modelcontextprotocol.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
            >
              <span>MCP Spec</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar (md:hidden) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-1.5 px-3 flex items-center justify-around shadow-lg">
        <button
          onClick={() => setActiveView('gallery')}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-[10px] font-medium transition-colors ${
            activeView === 'gallery'
              ? 'text-sky-600 dark:text-sky-400 font-semibold'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <Code2 className="h-4 w-4" />
          <span>Library</span>
        </button>

        <button
          onClick={() => setActiveView('tester')}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-[10px] font-medium transition-colors ${
            activeView === 'tester'
              ? 'text-sky-600 dark:text-sky-400 font-semibold'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <Terminal className="h-4 w-4" />
          <span>Tester</span>
        </button>

        <button
          onClick={() => setActiveView('docs')}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-[10px] font-medium transition-colors ${
            activeView === 'docs'
              ? 'text-sky-600 dark:text-sky-400 font-semibold'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>Docs</span>
        </button>

        <button
          onClick={() => setIsMcpModalOpen(true)}
          className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-[10px] font-medium text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400 transition-colors"
        >
          <Bot className="h-4 w-4 text-sky-500" />
          <span>Connect</span>
        </button>
      </nav>

      {/* Quick Preview & Inspect Modal */}
      <EmojiPreviewModal
        emoji={selectedEmoji}
        onClose={() => setSelectedEmoji(null)}
      />

      {/* Connect AI / MCP Config Modal */}
      <McpConfigModal
        open={isMcpModalOpen}
        onOpenChange={setIsMcpModalOpen}
        onOpenTester={() => setActiveView('tester')}
      />
    </div>
  );
}
