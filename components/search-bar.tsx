import * as React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { EMOJI_CATEGORIES, EmojiCategoryId } from '@/src/data/emojis';
import { Badge } from '@/components/ui/badge';

export interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: EmojiCategoryId) => void;
  previewSize: number;
  setPreviewSize: (size: number) => void;
  totalFiltered: number;
  totalAll: number;
}

export function SearchBar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  previewSize,
  setPreviewSize,
  totalFiltered,
  totalAll,
}: SearchBarProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Keyboard shortcut: '/' focuses search
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full space-y-4">
      {/* Search Input and View Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Bar Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search emojis by name, tag, or keyword..."
            className="w-full h-11 pl-10 pr-12 sm:pr-20 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 shadow-xs transition-colors"
          />

          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="rounded-md p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            ) : (
              <kbd className="hidden sm:inline-flex items-center rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                /
              </kbd>
            )}
          </div>
        </div>

        {/* Display Size Toggle */}
        <div className="flex items-center justify-between sm:justify-start gap-2 rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900 shadow-xs px-2.5 sm:px-3">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <SlidersHorizontal className="h-3 w-3" />
            <span>Size:</span>
          </span>

          <div className="flex items-center gap-1">
            {[
              { size: 28, label: 'S' },
              { size: 36, label: 'M' },
              { size: 48, label: 'L' },
              { size: 60, label: 'XL' },
            ].map(({ size, label }) => (
              <button
                key={size}
                onClick={() => setPreviewSize(size)}
                className={`h-7 sm:h-7 min-w-[32px] px-2 rounded-md text-xs font-medium transition-all ${
                  previewSize === size
                    ? 'bg-sky-600 text-white shadow-xs font-semibold'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                }`}
                title={`Set preview size to ${size}px`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Pills & Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1">
        {/* Category horizontal scroll list */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 sm:pb-0 scrollbar-none touch-pan-x -mx-1 px-1 sm:mx-0 sm:px-0">
          {EMOJI_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as EmojiCategoryId)}
                className={`whitespace-nowrap shrink-0 rounded-lg px-2.5 sm:px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-xs'
                    : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800/60'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto text-xs text-slate-500 dark:text-slate-400 shrink-0">
          <span>Showing</span>
          <span className="font-semibold text-slate-900 dark:text-slate-100">
            {totalFiltered}
          </span>
          <span>of</span>
          <span className="font-semibold text-slate-900 dark:text-slate-100">
            {totalAll}
          </span>
          <span>emojis</span>
        </div>
      </div>
    </div>
  );
}
