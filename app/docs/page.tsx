import React from 'react';
import { DocsView } from '@/components/docs-view';

export const metadata = {
  title: 'MCP Integration Docs | svg-MCP-TN',
  description: 'Model Context Protocol (MCP) guide and Cloudflare Pages setup for svg-MCP-TN.',
};

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <DocsView />
    </main>
  );
}
