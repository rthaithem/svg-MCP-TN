import * as React from 'react';
import { Copy, Check, Code, Maximize2, Sparkles } from 'lucide-react';
import { EmojiItem, generateReactComponent } from '@/src/data/emojis';
import { Badge } from '@/components/ui/badge';

export interface EmojiCardProps {
  key?: React.Key;
  emoji: EmojiItem;
  displaySize: number;
  onSelect: (emoji: EmojiItem) => void;
}

export const EmojiCard: React.FC<EmojiCardProps> = ({ emoji, displaySize, onSelect }) => {
  const [copiedSvg, setCopiedSvg] = React.useState(false);
  const [copiedReact, setCopiedReact] = React.useState(false);

  const handleCopySvg = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(emoji.svg);
    setCopiedSvg(true);
    setTimeout(() => setCopiedSvg(false), 1800);
  };

  const handleCopyReact = (e: React.MouseEvent) => {
    e.stopPropagation();
    const componentCode = generateReactComponent(emoji);
    navigator.clipboard.writeText(componentCode);
    setCopiedReact(true);
    setTimeout(() => setCopiedReact(false), 1800);
  };

  return (
    <div
      onClick={() => onSelect(emoji)}
      className="group relative flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-3 sm:p-4 transition-all duration-200 hover:-translate-y-1 hover:border-sky-500/50 hover:shadow-lg hover:shadow-sky-500/10 dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-sky-500/50 dark:hover:shadow-black/40 cursor-pointer overflow-hidden"
    >
      {/* Top row: ID badge & category */}
      <div className="flex items-center justify-between gap-1.5 min-w-0">
        <span className="font-mono text-[10px] sm:text-[11px] font-medium text-slate-400 group-hover:text-sky-600 dark:text-slate-500 dark:group-hover:text-sky-400 transition-colors truncate max-w-[65px] sm:max-w-none">
          #{emoji.id}
        </span>
        <Badge
          variant="outline"
          className="text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0 border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/60 truncate max-w-[75px] sm:max-w-none shrink-0"
        >
          {emoji.category}
        </Badge>
      </div>

      {/* SVG Icon Stage */}
      <div className="my-3 sm:my-4 flex items-center justify-center min-h-[58px] sm:min-h-[70px] transition-transform duration-200 group-hover:scale-110">
        <div
          style={{ width: `${displaySize}px`, height: `${displaySize}px` }}
          className="flex items-center justify-center drop-shadow-sm select-none max-w-[56px] max-h-[56px] sm:max-w-none sm:max-h-none"
          dangerouslySetInnerHTML={{ __html: emoji.svg }}
        />
      </div>

      {/* Emoji Name & Metadata */}
      <div className="min-w-0">
        <h3 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 truncate group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
          {emoji.name}
        </h3>
        <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 line-clamp-1 leading-snug">
          {emoji.description}
        </p>

        {/* Tags pills */}
        <div className="mt-2 flex flex-wrap gap-1">
          {emoji.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="inline-block rounded bg-slate-100 px-1.5 py-0.5 text-[9px] sm:text-[10px] text-slate-600 dark:bg-slate-800 dark:text-slate-400 truncate max-w-[70px]"
            >
              {tag}
            </span>
          ))}
          {emoji.tags.length > 2 && (
            <span className="hidden sm:inline-block rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600 dark:bg-slate-800 dark:text-slate-400">
              {emoji.tags[2]}
            </span>
          )}
          {emoji.tags.length > 3 && (
            <span className="text-[9px] sm:text-[10px] text-slate-400 self-center">
              +{emoji.tags.length - 2}
            </span>
          )}
        </div>
      </div>

      {/* Quick Action Buttons on bottom */}
      <div className="mt-3 pt-2.5 sm:mt-3.5 sm:pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-1 sm:gap-1.5">
        <button
          onClick={handleCopySvg}
          className="flex-1 min-w-0 flex items-center justify-center gap-1 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 py-1.5 px-1 sm:px-2 text-[11px] sm:text-xs font-medium text-slate-700 dark:text-slate-200 transition-colors"
          title="Copy raw SVG code"
        >
          {copiedSvg ? (
            <>
              <Check className="h-3 w-3 text-emerald-500 shrink-0" />
              <span className="text-emerald-600 dark:text-emerald-400 truncate text-[10px] sm:text-xs">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3 text-slate-400 shrink-0" />
              <span className="truncate">SVG</span>
            </>
          )}
        </button>

        <button
          onClick={handleCopyReact}
          className="flex-1 min-w-0 flex items-center justify-center gap-1 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 py-1.5 px-1 sm:px-2 text-[11px] sm:text-xs font-medium text-slate-700 dark:text-slate-200 transition-colors"
          title="Copy React JSX/TSX Component"
        >
          {copiedReact ? (
            <>
              <Check className="h-3 w-3 text-emerald-500 shrink-0" />
              <span className="text-emerald-600 dark:text-emerald-400 truncate text-[10px] sm:text-xs">Copied</span>
            </>
          ) : (
            <>
              <Code className="h-3 w-3 text-slate-400 shrink-0" />
              <span className="truncate">React</span>
            </>
          )}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(emoji);
          }}
          className="rounded-md p-1.5 shrink-0 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
          title="Preview & Inspect"
          aria-label="Preview details"
        >
          <Maximize2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
