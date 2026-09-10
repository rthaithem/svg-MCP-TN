import * as React from 'react';
import {
  Sparkles,
  Bot,
  Code2,
  BookOpen,
  Sun,
  Moon,
  Github,
  Terminal,
  ExternalLink,
  Menu,
  X,
  Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface NavbarProps {
  activeView: 'gallery' | 'docs' | 'tester';
  setActiveView: (view: 'gallery' | 'docs' | 'tester') => void;
  onOpenMcpModal: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  totalEmojis: number;
}

export function Navbar({
  activeView,
  setActiveView,
  onOpenMcpModal,
  theme,
  toggleTheme,
  totalEmojis,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Close mobile menu on view switch
  const handleSelectView = (view: 'gallery' | 'docs' | 'tester') => {
    setActiveView(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95 transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <button
            onClick={() => handleSelectView('gallery')}
            className="flex items-center gap-2 sm:gap-2.5 text-left group focus:outline-none min-w-0"
            aria-label="svg-MCP-TN Home"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-tr from-sky-600 to-indigo-600 text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base tracking-tight font-sans truncate">
                  svg-MCP-TN
                </span>
                <span className="rounded bg-sky-100 px-1 py-0.2 text-[9px] sm:text-[10px] font-semibold text-sky-700 dark:bg-sky-950 dark:text-sky-300 shrink-0">
                  v1.0
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 leading-none hidden xs:block truncate">
                Vector SVG Emojis • MCP
              </p>
            </div>
          </button>

          {/* Edge Server Status Pill - Desktop only */}
          <div className="hidden lg:flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Edge MCP Active</span>
          </div>
        </div>

        {/* Desktop Navigation (>= md screens) */}
        <div className="hidden md:flex items-center gap-2">
          {/* View Switchers */}
          <div className="flex items-center rounded-lg border border-slate-200 bg-slate-100/70 p-0.5 dark:border-slate-800 dark:bg-slate-900">
            <button
              onClick={() => setActiveView('gallery')}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                activeView === 'gallery'
                  ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-800 dark:text-slate-100'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <Code2 className="h-3.5 w-3.5" />
              <span>Library</span>
              <Badge variant="secondary" className="px-1 text-[10px]">
                {totalEmojis}
              </Badge>
            </button>

            <button
              onClick={() => setActiveView('tester')}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                activeView === 'tester'
                  ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-800 dark:text-slate-100'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>MCP Tester</span>
            </button>

            <button
              onClick={() => setActiveView('docs')}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                activeView === 'docs'
                  ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-800 dark:text-slate-100'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Docs</span>
            </button>
          </div>

          {/* Connect to AI / MCP CTA */}
          <Button
            size="sm"
            variant="primary"
            onClick={onOpenMcpModal}
            className="flex items-center gap-1.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-xs font-semibold shadow-xs"
          >
            <Bot className="h-3.5 w-3.5" />
            <span>Connect MCP</span>
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="iconSm"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="text-slate-600 dark:text-slate-300"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-slate-600" />
            )}
          </Button>

          {/* GitHub Repo Link */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 transition-colors"
            title="GitHub Repository"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>

        {/* Mobile Header Controls (< md screens) */}
        <div className="flex md:hidden items-center gap-1.5">
          {/* Quick MCP trigger */}
          <Button
            size="sm"
            variant="primary"
            onClick={onOpenMcpModal}
            className="h-8 px-2.5 text-xs font-semibold bg-gradient-to-r from-sky-600 to-indigo-600 text-white flex items-center gap-1 shadow-xs"
          >
            <Bot className="h-3.5 w-3.5" />
            <span>MCP</span>
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="iconSm"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="h-8 w-8 text-slate-600 dark:text-slate-300"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-slate-600" />
            )}
          </Button>

          {/* Hamburger Menu Toggle Button */}
          <Button
            variant="outline"
            size="iconSm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="h-8 w-8 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white/98 dark:border-slate-800 dark:bg-slate-950/98 px-4 py-3 shadow-lg transition-all animate-in slide-in-from-top-2 duration-150">
          <div className="space-y-1">
            <button
              onClick={() => handleSelectView('gallery')}
              className={`w-full flex items-center justify-between rounded-lg p-2.5 text-left text-sm font-medium transition-colors ${
                activeView === 'gallery'
                  ? 'bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300'
                  : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Code2 className="h-4 w-4 text-sky-500" />
                <span>Emoji Library</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {totalEmojis}
              </Badge>
            </button>

            <button
              onClick={() => handleSelectView('tester')}
              className={`w-full flex items-center justify-between rounded-lg p-2.5 text-left text-sm font-medium transition-colors ${
                activeView === 'tester'
                  ? 'bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300'
                  : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Terminal className="h-4 w-4 text-indigo-500" />
                <span>Interactive MCP Tester</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">JSON-RPC</span>
            </button>

            <button
              onClick={() => handleSelectView('docs')}
              className={`w-full flex items-center justify-between rounded-lg p-2.5 text-left text-sm font-medium transition-colors ${
                activeView === 'docs'
                  ? 'bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300'
                  : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="h-4 w-4 text-emerald-500" />
                <span>Documentation & Setup</span>
              </div>
              <span className="text-[10px] text-slate-400">Cloudflare Pages</span>
            </button>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <Button
              variant="primary"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMcpModal();
              }}
              className="w-full justify-center gap-2 h-10 text-xs font-semibold bg-gradient-to-r from-sky-600 to-indigo-600 text-white"
            >
              <Bot className="h-4 w-4" />
              <span>Connect AI (Cursor, Claude, Windsurf)</span>
            </Button>

            <div className="flex items-center justify-between px-1 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>Edge MCP Server: Ready</span>
              </span>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-200"
              >
                <Github className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
