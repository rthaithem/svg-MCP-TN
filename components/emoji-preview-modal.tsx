import * as React from 'react';
import {
  Copy,
  Check,
  Download,
  Code2,
  Terminal,
  FileCode,
  Layers,
  Sparkles,
  Sliders,
} from 'lucide-react';
import {
  EmojiItem,
  generateReactComponent,
  generateVueComponent,
} from '@/src/data/emojis';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface EmojiPreviewModalProps {
  emoji: EmojiItem | null;
  onClose: () => void;
}

export function EmojiPreviewModal({ emoji, onClose }: EmojiPreviewModalProps) {
  const [activeTab, setActiveTab] = React.useState('svg');
  const [previewSize, setPreviewSize] = React.useState(72);
  const [bgColor, setBgColor] = React.useState<'white' | 'slate' | 'grid'>('grid');
  const [copiedTab, setCopiedTab] = React.useState<string | null>(null);

  if (!emoji) return null;

  const reactCode = generateReactComponent(emoji);
  const vueCode = generateVueComponent(emoji);

  const mcpPayload = JSON.stringify(
    {
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: {
        name: 'get_emoji_svg',
        arguments: {
          id: emoji.id,
        },
      },
    },
    null,
    2
  );

  const mcpComponentPayload = JSON.stringify(
    {
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/call',
      params: {
        name: 'get_emoji_component',
        arguments: {
          id: emoji.id,
          framework: 'react',
        },
      },
    },
    null,
    2
  );

  const handleCopy = (text: string, tabKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(tabKey);
    setTimeout(() => setCopiedTab(null), 1800);
  };

  const handleDownloadSvg = () => {
    const blob = new Blob([emoji.svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${emoji.id}-emoji.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={Boolean(emoji)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent onClose={onClose} className="max-w-3xl">
        <DialogHeader>
          <div className="flex flex-wrap items-center gap-2 pr-6">
            <DialogTitle className="text-lg sm:text-xl font-bold flex items-center gap-2">
              <span>{emoji.name}</span>
              <span className="font-mono text-xs sm:text-sm font-normal text-slate-400">
                #{emoji.id}
              </span>
            </DialogTitle>
            <Badge variant="outline" className="text-[10px] sm:text-xs">
              {emoji.category}
            </Badge>
          </div>
          <DialogDescription className="text-xs sm:text-sm">{emoji.description}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 mt-4">
          {/* Left Column: Visual Stage & Customizer */}
          <div className="md:col-span-5 flex flex-col space-y-3 sm:space-y-4">
            {/* Interactive Stage */}
            <div
              className={`relative flex items-center justify-center min-h-[170px] sm:min-h-[220px] rounded-xl border border-slate-200 dark:border-slate-800 transition-colors ${
                bgColor === 'white'
                  ? 'bg-white'
                  : bgColor === 'slate'
                  ? 'bg-slate-900'
                  : 'bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] bg-slate-50 dark:bg-slate-950'
              }`}
            >
              <div
                style={{ width: `${previewSize}px`, height: `${previewSize}px` }}
                className="transition-all duration-200 drop-shadow-md select-none"
                dangerouslySetInnerHTML={{ __html: emoji.svg }}
              />

              <div className="absolute bottom-2 right-2 text-[10px] font-mono text-slate-400 bg-white/70 dark:bg-slate-900/70 px-1.5 py-0.5 rounded backdrop-blur-xs border border-slate-200/50 dark:border-slate-800/50">
                {previewSize}px
              </div>
            </div>

            {/* Stage Controls: Size Slider & Background */}
            <div className="space-y-3 rounded-lg border border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/40 p-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  Size: {previewSize}px
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setBgColor('grid')}
                    className={`h-5 w-5 rounded border ${
                      bgColor === 'grid' ? 'ring-2 ring-sky-500' : 'border-slate-300 dark:border-slate-700'
                    } bg-slate-100`}
                    title="Grid background"
                  />
                  <button
                    onClick={() => setBgColor('white')}
                    className={`h-5 w-5 rounded border ${
                      bgColor === 'white' ? 'ring-2 ring-sky-500' : 'border-slate-300 dark:border-slate-700'
                    } bg-white`}
                    title="White background"
                  />
                  <button
                    onClick={() => setBgColor('slate')}
                    className={`h-5 w-5 rounded border ${
                      bgColor === 'slate' ? 'ring-2 ring-sky-500' : 'border-slate-300 dark:border-slate-700'
                    } bg-slate-900`}
                    title="Dark background"
                  />
                </div>
              </div>

              <input
                type="range"
                min="24"
                max="128"
                step="4"
                value={previewSize}
                onChange={(e) => setPreviewSize(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-sky-600"
              />

              {/* Tags list */}
              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
                <span className="text-[11px] font-medium text-slate-500 block mb-1.5">Tags:</span>
                <div className="flex flex-wrap gap-1">
                  {emoji.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-slate-200/70 px-1.5 py-0.5 text-[10px] text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Download Action */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadSvg}
                className="w-full gap-1.5 mt-2 border-slate-300 dark:border-slate-700 h-9 text-xs"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download .svg File</span>
              </Button>
            </div>
          </div>

          {/* Right Column: Code Snippets & MCP Integration */}
          <div className="md:col-span-7 flex flex-col min-w-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start overflow-x-auto scrollbar-none touch-pan-x">
                <TabsTrigger value="svg" className="text-xs px-2.5 sm:px-3 shrink-0">SVG Code</TabsTrigger>
                <TabsTrigger value="react" className="text-xs px-2.5 sm:px-3 shrink-0">React TSX</TabsTrigger>
                <TabsTrigger value="vue" className="text-xs px-2.5 sm:px-3 shrink-0">Vue 3</TabsTrigger>
                <TabsTrigger value="mcp" className="text-xs px-2.5 sm:px-3 shrink-0">MCP Payload</TabsTrigger>
              </TabsList>

              {/* Tab: Raw SVG */}
              <TabsContent value="svg" className="relative mt-2 min-w-0">
                <div className="relative">
                  <pre className="overflow-x-auto rounded-lg bg-slate-950 p-3.5 pt-10 sm:p-4 text-xs text-slate-200 font-mono leading-relaxed max-h-[260px] sm:max-h-[320px] border border-slate-800">
                    <code>{emoji.svg}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleCopy(emoji.svg, 'svg')}
                    className="absolute right-2.5 top-2.5 h-7 text-xs bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white"
                  >
                    {copiedTab === 'svg' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy SVG</span>
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>

              {/* Tab: React TSX */}
              <TabsContent value="react" className="relative mt-2 min-w-0">
                <div className="relative">
                  <pre className="overflow-x-auto rounded-lg bg-slate-950 p-3.5 pt-10 sm:p-4 text-xs text-slate-200 font-mono leading-relaxed max-h-[260px] sm:max-h-[320px] border border-slate-800">
                    <code>{reactCode}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleCopy(reactCode, 'react')}
                    className="absolute right-2.5 top-2.5 h-7 text-xs bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white"
                  >
                    {copiedTab === 'react' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Component</span>
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>

              {/* Tab: Vue 3 */}
              <TabsContent value="vue" className="relative mt-2 min-w-0">
                <div className="relative">
                  <pre className="overflow-x-auto rounded-lg bg-slate-950 p-3.5 pt-10 sm:p-4 text-xs text-slate-200 font-mono leading-relaxed max-h-[260px] sm:max-h-[320px] border border-slate-800">
                    <code>{vueCode}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleCopy(vueCode, 'vue')}
                    className="absolute right-2.5 top-2.5 h-7 text-xs bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white"
                  >
                    {copiedTab === 'vue' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Vue SFC</span>
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>

              {/* Tab: MCP JSON-RPC */}
              <TabsContent value="mcp" className="relative mt-2 min-w-0">
                <div className="relative space-y-2">
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                    Your AI Assistant (Cursor, Claude, Windsurf) executes this JSON-RPC payload
                    to automatically query this emoji:
                  </p>
                  <pre className="overflow-x-auto rounded-lg bg-slate-950 p-3.5 pt-10 sm:p-4 text-xs text-slate-200 font-mono leading-relaxed max-h-[240px] sm:max-h-[280px] border border-slate-800">
                    <code>{mcpPayload}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleCopy(mcpPayload, 'mcp')}
                    className="absolute right-2.5 top-8 h-7 text-xs bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white"
                  >
                    {copiedTab === 'mcp' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Payload</span>
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
