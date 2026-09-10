import * as React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';
import { EmojiItem } from '@/src/data/emojis';
import { EmojiCard } from '@/components/emoji-card';
import { Button } from '@/components/ui/button';

export interface EmojiGridProps {
  emojis: EmojiItem[];
  displaySize: number;
  onSelectEmoji: (emoji: EmojiItem) => void;
  onResetSearch: () => void;
  hasFilters: boolean;
}

export function EmojiGrid({
  emojis,
  displaySize,
  onSelectEmoji,
  onResetSearch,
  hasFilters,
}: EmojiGridProps) {
  if (emojis.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mb-3">
          <SearchX className="h-6 w-6" />
        </div>
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          No emojis matched your query
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-sm">
          Try searching for another keyword like &quot;rocket&quot;, &quot;cloud&quot;, &quot;code&quot;, or reset your filters.
        </p>

        {hasFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onResetSearch}
            className="mt-4 gap-1.5 text-xs border-slate-300 dark:border-slate-700"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Search & Filters</span>
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3.5 md:gap-4">
      {emojis.map((emoji) => (
        <EmojiCard
          key={emoji.id}
          emoji={emoji}
          displaySize={displaySize}
          onSelect={onSelectEmoji}
        />
      ))}
    </div>
  );
}
