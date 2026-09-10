> ⚠️ **NOTICE: PROJECT UNDER ACTIVE DEVELOPMENT & CURRENTLY UNSTABLE**  
> **This project is in active development and is considered experimental and unstable.** Architectural interfaces, JSON-RPC tool contracts, API endpoint payloads, and vector data representations are subject to breaking changes without prior notice. Use in production environments at your own risk.

<div align="center">

# svg-MCP-TN
### Modern Vector SVG Emoji Library & Model Context Protocol (MCP) Server

[![Project Status: Experimental](https://img.shields.io/badge/status-experimental%20%2F%20unstable-orange.svg?style=flat-square)](https://github.com)
[![Protocol](https://img.shields.io/badge/MCP-JSON--RPC%202.0-blue.svg?style=flat-square)](https://modelcontextprotocol.io)
[![Runtime](https://img.shields.io/badge/runtime-Cloudflare%20Edge-f38020.svg?style=flat-square)](https://pages.cloudflare.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5+-3178c6.svg?style=flat-square)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)](LICENSE)

<p align="center">
  <strong>Empower your AI coding agents (Cursor, Claude Desktop, Windsurf) to search, inspect, and generate clean, standardized vector SVG emojis directly into your codebases.</strong>
</p>

</div>

---

## 📋 Table of Contents

1. [Executive Overview](#executive-overview)
2. [Why svg-MCP-TN? (The Problem We Solve)](#why-svg-mcp-tn-the-problem-we-solve)
3. [System Architecture](#system-architecture)
4. [Model Context Protocol (MCP) Specifications](#model-context-protocol-mcp-specifications)
   - [Protocol Transport](#protocol-transport)
   - [Exposed Tool Signatures](#exposed-tool-signatures)
5. [AI Assistant Integration Guide](#ai-assistant-integration-guide)
   - [Cursor IDE](#1-cursor-ide)
   - [Claude Desktop](#2-claude-desktop)
   - [Windsurf Editor](#3-windsurf-editor)
   - [Cline / Roo-Code Extension](#4-cline--roo-code)
   - [Direct JSON-RPC 2.0 (cURL / HTTP)](#5-direct-json-rpc-20-curl--http)
6. [Supported Export Targets](#supported-export-targets)
7. [Edge Runtime & Cloudflare Deployment](#edge-runtime--cloudflare-deployment)
8. [Local Development & Contribution Guidelines](#local-development--contribution-guidelines)
9. [Stability Status & Development Roadmap](#stability-status--development-roadmap)
10. [License & Community](#license--community)

---

## 🏢 Executive Overview

**`svg-MCP-TN`** is an open-source, enterprise-grade vector emoji library and high-speed **Model Context Protocol (MCP)** server. It provides developers and autonomous AI coding agents with a structured, queryable index of handcrafted SVG vector graphics.

Instead of relying on native operating system fonts (which render inconsistently across Apple, Windows, and Linux environments) or prompting LLMs to generate ad-hoc, broken inline SVG markup, `svg-MCP-TN` allows AI assistants to retrieve mathematically clean, viewBox-normalized SVG paths, React (TSX) components, and Vue 3 Single File Components (SFC) in sub-millisecond roundtrips.

---

## 🎯 Why svg-MCP-TN? (The Problem We Solve)

| Common Industry Dilemma | The `svg-MCP-TN` Solution |
| :--- | :--- |
| **Hallucinated Vector Markup:** AI assistants often output malformed, clipping, or unoptimized SVG paths when asked to code icons from scratch. | **Deterministic Tooling:** AI calls verified MCP tools that return peer-reviewed, optimized vector nodes. |
| **Cross-Platform OS Fragmentation:** Unicode emojis look radically different on Apple macOS, Windows 11, Google Android, and Ubuntu Linux. | **100% Visual Parity:** Pure vector `<svg>` geometry ensures exact pixel-matched rendering across all target platforms. |
| **Bloated Webfont Bundles:** Heavy font icon sheets add blocking network latency and render-tree layout shifts. | **Zero Font Overhead:** Tree-shakeable individual SVG files, inline code snippets, and tiny payload footprints. |
| **Manual Developer Asset Hunting:** Engineers waste time browsing external asset galleries, copying raw files, and refactoring props. | **In-Editor Context:** AI agents query and paste complete typed components directly into current workspace files. |

---

## 🏗️ System Architecture

```
                                  +-----------------------------+
                                  |   AI Developer Assistants   |
                                  | (Cursor, Claude, Windsurf)  |
                                  +--------------+--------------+
                                                 |
                                     JSON-RPC 2.0 (HTTP / SSE)
                                                 |
                                                 v
                       +-------------------------------------------------+
                       |             svg-MCP-TN Edge Gateway             |
                       |    (Cloudflare Pages / V8 Edge Runtime)         |
                       +-------------------------+-----------------------+
                                                 |
                       +-------------------------+-----------------------+
                       |                                                 |
                       v                                                 v
         +---------------------------+                     +---------------------------+
         |     MCP Server Engine     |                     |    Interactive Web App    |
         |  - search_emoji           |                     |  - Live Emoji Catalog     |
         |  - get_emoji_svg          |                     |  - Playground & Tester    |
         |  - get_emoji_component    |                     |  - One-Click Integration  |
         +---------------------------+                     +---------------------------+
```

### Technical Highlights
- **Edge Native:** Runs on the Cloudflare Workers / Pages V8 Edge Runtime via `export const runtime = 'edge';`.
- **JSON-RPC 2.0 Compliance:** Strictly adheres to the [Model Context Protocol Specification](https://modelcontextprotocol.io) with error schemas and parameter validation.
- **Strict Typing:** 100% end-to-end TypeScript codebase with zero runtime dependencies for the vector core.
- **Microsecond Latency:** Global CDN distribution ensures instant response times for developer IDE workflows worldwide.

---

## 📡 Model Context Protocol (MCP) Specifications

### Protocol Transport
- **Protocol Version:** MCP `2024-11-05`
- **Default RPC Endpoint:** `/api/mcp`
- **Accepted Request Format:** `application/json`
- **JSON-RPC Version:** `2.0`

### Exposed Tool Signatures

The server exposes three core functions via `tools/list` and `tools/call`:

#### 1. `search_emoji`
Searches the emoji catalog by natural language keywords, emotional sentiment, semantic tags, or categorization.

*Input Schema:*
```json
{
  "type": "object",
  "properties": {
    "query": {
      "type": "string",
      "description": "Keyword, mood, or name to search (e.g. 'rocket', 'celebrate', 'heart', 'code')"
    },
    "category": {
      "type": "string",
      "enum": ["all", "smileys", "gestures", "tech", "activities", "symbols", "objects"],
      "description": "Optional category filter"
    },
    "limit": {
      "type": "number",
      "description": "Maximum number of results to return (default: 10, max: 50)"
    }
  },
  "required": ["query"]
}
```

*Sample Response:*
```json
{
  "total": 1,
  "results": [
    {
      "id": "rocket",
      "name": "Rocket",
      "category": "tech",
      "tags": ["launch", "speed", "startup", "deploy", "fast"]
    }
  ]
}
```

---

#### 2. `get_emoji_svg`
Returns clean, standalone SVG source code ready for embedding or saving to `.svg` files.

*Input Schema:*
```json
{
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "description": "The unique emoji identifier (e.g. 'rocket', 'fire', 'heart')"
    },
    "size": {
      "type": "number",
      "description": "Desired width and height dimension in pixels (default: 64)"
    }
  },
  "required": ["id"]
}
```

*Sample Response Content:*
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" fill="none">
  <!-- Optimized vector path data -->
</svg>
```

---

#### 3. `get_emoji_component`
Generates a production-ready, fully typed frontend component in the requested framework.

*Input Schema:*
```json
{
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "description": "The unique emoji identifier"
    },
    "framework": {
      "type": "string",
      "enum": ["react", "vue", "html"],
      "description": "Frontend framework syntax: 'react' (TSX), 'vue' (SFC), or 'html' (inline web component)"
    },
    "size": {
      "type": "number",
      "description": "Default render size in pixels (default: 32)"
    }
  },
  "required": ["id", "framework"]
}
```

*Sample React (TSX) Output:*
```tsx
import React from 'react';

export interface RocketEmojiProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export const RocketEmoji: React.FC<RocketEmojiProps> = ({
  size = 32,
  className = '',
  ...props
}) => (
  <svg
    viewBox="0 0 64 64"
    width={size}
    height={size}
    fill="none"
    className={className}
    {...props}
  >
    {/* Clean vector paths */}
  </svg>
);
```

---

## 🤖 AI Assistant Integration Guide

### 1. Cursor IDE

To enable direct emoji lookups and component generation within your Cursor workspace, add the MCP server definition to your workspace configuration file:

**Location:** `.cursor/mcp.json`

```json
{
  "mcpServers": {
    "svg-emojis": {
      "url": "https://your-domain.pages.dev/api/mcp",
      "transport": "http"
    }
  }
}
```

*Once configured, you can prompt Cursor:*  
> *"Add a celebratory vector emoji component to our checkout page using the `svg-emojis` MCP tool."*

---

### 2. Claude Desktop

Connect Claude Desktop to `svg-MCP-TN` using the standard desktop configuration:

**Location:**
- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "svg-emojis": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-proxy",
        "https://your-domain.pages.dev/api/mcp"
      ]
    }
  }
}
```

---

### 3. Windsurf Editor

Add the server in your Windsurf workspace settings:

**Location:** `~/.codeium/windsurf/mcp_config.json`

```json
{
  "mcpServers": {
    "svg-emojis": {
      "serverUrl": "https://your-domain.pages.dev/api/mcp"
    }
  }
}
```

---

### 4. Cline / Roo-Code

In your VS Code extension settings for Cline:

```json
{
  "mcpServers": {
    "svg-emojis": {
      "type": "stream",
      "url": "https://your-domain.pages.dev/api/mcp"
    }
  }
}
```

---

### 5. Direct JSON-RPC 2.0 (cURL / HTTP)

Execute a raw JSON-RPC call from any terminal or automated test pipeline:

```bash
curl -X POST https://your-domain.pages.dev/api/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "search_emoji",
      "arguments": {
        "query": "fire"
      }
    }
  }'
```

---

## 🎨 Supported Export Targets

| Format | Output Description | Ideal Usage |
| :--- | :--- | :--- |
| **Raw SVG** | Standalone `<svg ...>` node with explicit viewBox and clean path data | Static asset pipelines, Figma imports, `.svg` files |
| **React TSX** | Typed functional React component with standard SVG attributes | Next.js, Vite React, Remix, Gatsby |
| **Vue 3 SFC** | Single File Component with `<template>` and `<script setup lang="ts">` | Nuxt 3, Vite Vue 3 applications |
| **Inline Web Markup** | Minified, accessible HTML SVG snippet with `role="img"` | Vanilla JavaScript, Hugo, Astro, Static HTML |

---

## ⚡ Edge Runtime & Cloudflare Deployment

`svg-MCP-TN` is built specifically to deploy to Cloudflare Pages using Edge runtime workers for zero cold starts and ultra-low latency worldwide.

### Deployment Prerequisites
Ensure the Wrangler CLI is authenticated:
```bash
npm install -g wrangler
wrangler login
```

### Production Build & Deploy
```bash
# 1. Build client-side assets & compile edge routes
npm run build

# 2. Deploy bundle to Cloudflare Pages
npx @cloudflare/next-on-pages
wrangler pages deploy dist --project-name=svg-mcp-tn
```

---

## 💻 Local Development & Contribution Guidelines

### Prerequisites
- Node.js `v18.0.0` or higher
- npm / pnpm / bun

### Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/svg-MCP-TN.git
cd svg-MCP-TN

# Install project dependencies
npm install

# Start local development server (binds to http://localhost:3000)
npm run dev

# Run TypeScript linter & static analysis
npm run lint

# Compile production bundle
npm run build
```

### Vector Contribution Standards
1. **ViewBox:** All vector graphics must use a standardized `viewBox="0 0 64 64"`.
2. **No Font Glyphs:** Never use `<text>` elements or system font references. Every shape must be composed of clean `<path>`, `<circle>`, `<rect>`, or `<polygon>` vector data.
3. **Palette Consistency:** Utilize curated gradient and flat color tokens matching modern accessible standards.
4. **Id Uniqueness:** Ensure emoji identifier names follow `kebab-case` (e.g. `party-popper`, `rocket`, `sparkles`).

---

## 🚦 Stability Status & Development Roadmap

> ⚠️ **Project Status: ALPHA / EXPERIMENTAL (Pre-1.0)**  
> The internal API schema and MCP endpoints are under rapid development.

| Milestone | Status | Description |
| :--- | :---: | :--- |
| **Core Vector Catalog** | 🟡 In Progress | Expanding baseline icon set across 6 core categories |
| **MCP JSON-RPC 2.0 Gateway** | 🟢 Operational | Full support for `tools/list` and `tools/call` |
| **Interactive Developer Playground** | 🟢 Operational | In-browser testing suite for real-time JSON-RPC payload debugging |
| **SSE (Server-Sent Events) Stream** | 🟡 Under Evaluation | Adding real-time streaming capability for dynamic updates |
| **Figma Plugin Integration** | ⚪ Planned | Direct import from Figma design tokens |
| **v1.0.0 Specification Freeze** | ⚪ Planned | Permanent API stabilization & semantic versioning enforcement |

---

## 📄 License & Community

Distributed under the **MIT License**. See `LICENSE` for more information.

- **Issue Tracker:** Submit bug reports, schema suggestions, or icon requests via GitHub Issues.
- **Community Standards:** Please adhere to our Code of Conduct in all discussions and pull requests.
- **Commercial Inquiries & Sponsorship:** Contact the maintainers for custom enterprise icon collections.

<div align="center">
  <sub>Engineered with precision for modern developers and AI agents.</sub>
</div>
