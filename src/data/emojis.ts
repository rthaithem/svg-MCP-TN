/**
 * @file emojis.ts
 * @description Master dataset of modern, handcrafted vector SVG emojis for svg-MCP-TN.
 * Designed for web developers, designers, and AI coding assistants via MCP.
 * Every emoji is rendered using pure SVG vector paths and clean gradients.
 */

export interface EmojiItem {
  id: string;
  name: string;
  category: 'developer' | 'ai-tech' | 'cloud-infra' | 'security' | 'status-energy' | 'creative';
  tags: string[];
  keywords: string[];
  description: string;
  svg: string;
}

export const EMOJI_CATEGORIES = [
  { id: 'all', label: 'All Emojis' },
  { id: 'developer', label: 'Developer & Code' },
  { id: 'ai-tech', label: 'AI & Intelligence' },
  { id: 'cloud-infra', label: 'Cloud & Database' },
  { id: 'security', label: 'Security & Auth' },
  { id: 'status-energy', label: 'Status & Energy' },
  { id: 'creative', label: 'Design & Tools' },
] as const;

export type EmojiCategoryId = (typeof EMOJI_CATEGORIES)[number]['id'];

/**
 * Handcrafted vector SVG emojis with crisp 32x32 viewbox.
 * Each item has accessible descriptions, tags, and production-ready SVG strings.
 */
export const EMOJIS: EmojiItem[] = [
  {
    id: 'rocket',
    name: 'Rocket Launch',
    category: 'developer',
    tags: ['deploy', 'launch', 'startup', 'ship', 'fast', 'production'],
    keywords: ['space', 'boost', 'speed', 'release', 'ci-cd'],
    description: 'Modern spacecraft with exhaust flame, ideal for deployments and releases.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="rocket-body" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="100%" stop-color="#2563EB"/>
    </linearGradient>
    <linearGradient id="rocket-flame" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE047"/>
      <stop offset="50%" stop-color="#F97316"/>
      <stop offset="100%" stop-color="#EF4444"/>
    </linearGradient>
  </defs>
  <!-- Flame Trail -->
  <path d="M10 22C8 25 7 28 8 30C10 29 13 28 16 26C13.5 25.5 11.5 24 10 22Z" fill="url(#rocket-flame)"/>
  <path d="M11 23C9.8 25 9.2 27 10 28.5C11.5 27.8 13.2 27 15 25.5C13.2 25 12 24.2 11 23Z" fill="#FEF08A"/>
  <!-- Left Fin -->
  <path d="M7 17C6 21 8 24 10 24L11 19L7 17Z" fill="#1D4ED8"/>
  <!-- Right Fin -->
  <path d="M19 11L17 7C21 6 24 8 24 10L19 11Z" fill="#1D4ED8"/>
  <!-- Rocket Main Fuselage -->
  <path d="M27 5C22 5 15 8 11 13C8.8 15.8 8 19 8.5 21.5L10.5 23.5C13 24 16.2 23.2 19 21C24 17 27 10 27 5Z" fill="url(#rocket-body)"/>
  <!-- Nosecone Accent -->
  <path d="M23 5C24.5 5 26 5.5 27 5C26.5 6 27 7.5 27 9C26 7.5 24.5 6 23 5Z" fill="#BAE6FD"/>
  <!-- Viewport Window -->
  <circle cx="19.5" cy="12.5" r="3" fill="#0F172A"/>
  <circle cx="19.5" cy="12.5" r="2.2" fill="#E0F2FE"/>
  <circle cx="20.2" cy="11.8" r="0.8" fill="#FFFFFF"/>
</svg>`,
  },
  {
    id: 'fire',
    name: 'Blazing Fire',
    category: 'status-energy',
    tags: ['hot', 'trend', 'flame', 'energy', 'streak', 'popular'],
    keywords: ['burn', 'lit', 'urgent', 'active', 'power'],
    description: 'Dynamic dual-tone flame symbol representing trending activity or high energy.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="fire-outer" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FB923C"/>
      <stop offset="40%" stop-color="#F97316"/>
      <stop offset="100%" stop-color="#DC2626"/>
    </linearGradient>
    <linearGradient id="fire-inner" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FEF08A"/>
      <stop offset="70%" stop-color="#FDE047"/>
      <stop offset="100%" stop-color="#F97316"/>
    </linearGradient>
  </defs>
  <!-- Outer Flame Body -->
  <path d="M16 2C16 6 13 9 13 13C13 13.5 13.1 14 13.2 14.5C11.5 13.2 11 11.2 11 9.5C7.5 12.5 5 17 5 21.5C5 27.3 9.9 31 16 31C22.1 31 27 27.3 27 21.5C27 15 20.5 11 19 5C17.5 7.5 18 10.5 17.5 12.5C16.8 9.5 16 6 16 2Z" fill="url(#fire-outer)"/>
  <!-- Inner Heart Flame -->
  <path d="M16 14C17.5 17 19.5 18.5 19.5 21C19.5 24 17.5 27 16 27C14.5 27 12.5 24 12.5 21C12.5 18 15 15.5 16 14Z" fill="url(#fire-inner)"/>
</svg>`,
  },
  {
    id: 'code',
    name: 'Code Brackets',
    category: 'developer',
    tags: ['programming', 'developer', 'source', 'syntax', 'script', 'react'],
    keywords: ['html', 'jsx', 'typescript', 'algorithm', 'tag'],
    description: 'Modern developer angle brackets with a sleek slash separator.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="code-left" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="100%" stop-color="#0284C7"/>
    </linearGradient>
    <linearGradient id="code-right" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#A855F7"/>
      <stop offset="100%" stop-color="#7C3AED"/>
    </linearGradient>
    <linearGradient id="code-slash" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34D399"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
  </defs>
  <!-- Left Bracket -->
  <path d="M10 8L3.5 14.5C2.8 15.2 2.8 16.8 3.5 17.5L10 24" stroke="url(#code-left)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Right Bracket -->
  <path d="M22 8L28.5 14.5C29.2 15.2 29.2 16.8 28.5 17.5L22 24" stroke="url(#code-right)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Center Slash -->
  <path d="M18.5 6L13.5 26" stroke="url(#code-slash)" stroke-width="3" stroke-linecap="round"/>
</svg>`,
  },
  {
    id: 'spark',
    name: 'Magic Spark',
    category: 'ai-tech',
    tags: ['ai', 'magic', 'smart', 'generate', 'enhance', 'gemini'],
    keywords: ['star', 'brilliance', 'creation', 'intelligence', 'feature'],
    description: 'Four-point luminous star with accent sparkles representing AI and smart capabilities.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="spark-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCD34D"/>
      <stop offset="50%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>
    <linearGradient id="spark-minor" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#67E8F9"/>
      <stop offset="100%" stop-color="#06B6D4"/>
    </linearGradient>
  </defs>
  <!-- Primary Sparkle -->
  <path d="M16 2C16 8.5 20.5 13 27 16C20.5 19 16 23.5 16 30C16 23.5 11.5 19 5 16C11.5 13 16 8.5 16 2Z" fill="url(#spark-grad)"/>
  <!-- Small Top Right Sparkle -->
  <path d="M25 4C25 6 26.5 7.5 28.5 8.5C26.5 9.5 25 11 25 13C25 11 23.5 9.5 21.5 8.5C23.5 7.5 25 6 25 4Z" fill="url(#spark-minor)"/>
  <!-- Center Core Shine -->
  <circle cx="16" cy="16" r="2.5" fill="#FFFBEB"/>
</svg>`,
  },
  {
    id: 'brain',
    name: 'Neural Brain',
    category: 'ai-tech',
    tags: ['ai', 'neural', 'llm', 'learning', 'cognitive', 'agent'],
    keywords: ['machine-learning', 'mind', 'intellect', 'algorithm', 'mcp'],
    description: 'Synaptic neural network brain with circuit trace points representing LLMs and reasoning.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="brain-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#C084FC"/>
      <stop offset="50%" stop-color="#A855F7"/>
      <stop offset="100%" stop-color="#7E22CE"/>
    </linearGradient>
  </defs>
  <!-- Brain Hemispheres & Synapses -->
  <path d="M12 4C9 4 6 7 6 10C4.5 11.5 4 14 5 16C4 18 4.5 21 6.5 22.5C7 25 9.5 27 12 27C13.5 27 14.5 26.2 15 25.5V6.5C14.5 5.8 13.5 4 12 4Z" fill="url(#brain-grad)" fill-opacity="0.9"/>
  <path d="M20 4C23 4 26 7 26 10C27.5 11.5 28 14 27 16C28 18 27.5 21 25.5 22.5C25 25 22.5 27 20 27C18.5 27 17.5 26.2 17 25.5V6.5C17.5 5.8 18.5 4 20 4Z" fill="url(#brain-grad)"/>
  <!-- Central Divider -->
  <line x1="16" y1="5" x2="16" y2="27" stroke="#3B0764" stroke-width="1.5" stroke-linecap="round"/>
  <!-- Synaptic Nodes -->
  <circle cx="10" cy="11" r="1.5" fill="#F3E8FF"/>
  <circle cx="22" cy="11" r="1.5" fill="#F3E8FF"/>
  <circle cx="9" cy="18" r="1.5" fill="#F3E8FF"/>
  <circle cx="23" cy="18" r="1.5" fill="#F3E8FF"/>
  <path d="M10 11L14 13M22 11L18 13M9 18L14 19M23 18L18 19" stroke="#F3E8FF" stroke-width="1.2" stroke-linecap="round"/>
</svg>`,
  },
  {
    id: 'database',
    name: 'Cloud Database',
    category: 'cloud-infra',
    tags: ['storage', 'sql', 'postgres', 'data', 'cloud', 'backend'],
    keywords: ['nosql', 'tables', 'schema', 'redis', 'cluster'],
    description: 'Multi-tiered cylindrical database cluster with active status indicators.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="db-tier" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0284C7"/>
      <stop offset="50%" stop-color="#38BDF8"/>
      <stop offset="100%" stop-color="#0369A1"/>
    </linearGradient>
  </defs>
  <!-- Top Tier -->
  <ellipse cx="16" cy="7" rx="11" ry="3.8" fill="#7DD3FC"/>
  <path d="M5 7V13C5 15.1 9.9 16.8 16 16.8C22.1 16.8 27 15.1 27 13V7C27 9.1 22.1 10.8 16 10.8C9.9 10.8 5 9.1 5 7Z" fill="url(#db-tier)"/>
  <!-- Middle Tier -->
  <path d="M5 14V20C5 22.1 9.9 23.8 16 23.8C22.1 23.8 27 22.1 27 20V14C27 16.1 22.1 17.8 16 17.8C9.9 17.8 5 16.1 5 14Z" fill="url(#db-tier)"/>
  <!-- Bottom Tier -->
  <path d="M5 21V26C5 28.1 9.9 29.8 16 29.8C22.1 29.8 27 28.1 27 26V21C27 23.1 22.1 24.8 16 24.8C9.9 24.8 5 23.1 5 21Z" fill="url(#db-tier)"/>
  <!-- Status LEDs -->
  <circle cx="9" cy="11.5" r="1" fill="#4ADE80"/>
  <circle cx="9" cy="18.5" r="1" fill="#4ADE80"/>
  <circle cx="9" cy="25.5" r="1" fill="#4ADE80"/>
</svg>`,
  },
  {
    id: 'lightning',
    name: 'Volt Lightning',
    category: 'status-energy',
    tags: ['fast', 'electric', 'power', 'speed', 'charge', 'instant'],
    keywords: ['voltage', 'energy', 'flash', 'quick', 'boost'],
    description: 'Crisp, high-energy lightning bolt designed with sharp dynamic angles.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="bolt-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FACC15"/>
      <stop offset="60%" stop-color="#EAB308"/>
      <stop offset="100%" stop-color="#CA8A04"/>
    </linearGradient>
  </defs>
  <path d="M18.5 2L6 17H15.5L13.5 30L26 15H16.5L18.5 2Z" fill="url(#bolt-grad)" stroke="#A16207" stroke-width="1" stroke-linejoin="round"/>
  <!-- Facet highlight -->
  <path d="M18.5 2L10 17H15.5L13.5 30L16.5 15H17.5L18.5 2Z" fill="#FEF08A" fill-opacity="0.4"/>
</svg>`,
  },
  {
    id: 'shield',
    name: 'Security Shield',
    category: 'security',
    tags: ['security', 'auth', 'verified', 'protection', 'guard', 'privacy'],
    keywords: ['safe', 'firewall', 'encrypt', 'ssl', 'secure'],
    description: 'Defensive heraldic shield featuring an integrated verification checkmark.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10B981"/>
      <stop offset="100%" stop-color="#047857"/>
    </linearGradient>
  </defs>
  <!-- Shield Crest -->
  <path d="M16 3L6 7V15.5C6 22 10.5 27.5 16 29C21.5 27.5 26 22 26 15.5V7L16 3Z" fill="url(#shield-grad)"/>
  <!-- Inner Rim Highlight -->
  <path d="M16 5.5L8 8.8V15.5C8 20.8 11.6 25.3 16 26.8V5.5Z" fill="#34D399" fill-opacity="0.3"/>
  <!-- Checkmark -->
  <path d="M11.5 15.5L14.5 18.5L20.5 12" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  {
    id: 'terminal',
    name: 'Developer Terminal',
    category: 'developer',
    tags: ['cli', 'bash', 'console', 'shell', 'command', 'terminal'],
    keywords: ['prompt', 'linux', 'macos', 'zsh', 'code'],
    description: 'Classic developer console window with command line prompt and status controls.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="term-bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
  </defs>
  <!-- Window Base -->
  <rect x="3" y="5" width="26" height="22" rx="4" fill="url(#term-bg)" stroke="#334155" stroke-width="1.2"/>
  <!-- Header Bar -->
  <path d="M3 9C3 6.8 4.8 5 7 5H25C27.2 5 29 6.8 29 9V10H3V9Z" fill="#334155"/>
  <!-- Window Buttons -->
  <circle cx="6.5" cy="7.5" r="1.2" fill="#EF4444"/>
  <circle cx="10" cy="7.5" r="1.2" fill="#F59E0B"/>
  <circle cx="13.5" cy="7.5" r="1.2" fill="#10B981"/>
  <!-- Command Prompt >_ -->
  <path d="M8 15L12 18L8 21" stroke="#38BDF8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <line x1="14" y1="21" x2="20" y2="21" stroke="#4ADE80" stroke-width="2" stroke-linecap="round"/>
</svg>`,
  },
  {
    id: 'coffee',
    name: 'Hacker Coffee',
    category: 'status-energy',
    tags: ['coffee', 'caffeine', 'break', 'energy', 'morning', 'work'],
    keywords: ['tea', 'mug', 'cup', 'fuel', 'rest'],
    description: 'Hot steaming mug of developer fuel for late-night coding sessions.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="mug-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F97316"/>
      <stop offset="100%" stop-color="#C2410C"/>
    </linearGradient>
  </defs>
  <!-- Rising Steam -->
  <path d="M10 4C9 6 11 8 10 10M15 3C14 5 16 7 15 9M20 4C19 6 21 8 20 10" stroke="#FDBA74" stroke-width="1.8" stroke-linecap="round"/>
  <!-- Mug Handle -->
  <path d="M22 13C25.5 13 27 15.5 27 18C27 20.5 25.5 23 22 23" stroke="#C2410C" stroke-width="3" stroke-linecap="round"/>
  <!-- Mug Body -->
  <path d="M7 11H23V21C23 25.4 19.4 29 15 29C10.6 29 7 25.4 7 21V11Z" fill="url(#mug-grad)"/>
  <ellipse cx="15" cy="11.5" rx="7" ry="2" fill="#78350F"/>
</svg>`,
  },
  {
    id: 'git-branch',
    name: 'Git Branch',
    category: 'developer',
    tags: ['git', 'github', 'branch', 'vcs', 'commit', 'merge', 'pr'],
    keywords: ['repository', 'pull-request', 'version', 'tree'],
    description: 'Version control branch with interconnected commit nodes and merge flow.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%" fill="none">
  <!-- Connective Branch Lines -->
  <line x1="9" y1="8" x2="9" y2="24" stroke="#64748B" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M9 18C9 14 13 11 18 11H22" stroke="#64748B" stroke-width="2.5" stroke-linecap="round"/>
  <!-- Nodes -->
  <circle cx="9" cy="8" r="4.5" fill="#3B82F6"/>
  <circle cx="9" cy="8" r="2" fill="#FFFFFF"/>
  <circle cx="9" cy="24" r="4.5" fill="#10B981"/>
  <circle cx="9" cy="24" r="2" fill="#FFFFFF"/>
  <circle cx="23" cy="11" r="4.5" fill="#EC4899"/>
  <circle cx="23" cy="11" r="2" fill="#FFFFFF"/>
</svg>`,
  },
  {
    id: 'bug',
    name: 'Cyber Bug',
    category: 'developer',
    tags: ['bug', 'debug', 'issue', 'fix', 'error', 'patch'],
    keywords: ['glitch', 'exception', 'defect', 'testing', 'qa'],
    description: 'Stylized software bug icon for issues, ticketing, and debugging.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="bug-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EF4444"/>
      <stop offset="100%" stop-color="#991B1B"/>
    </linearGradient>
  </defs>
  <!-- Antennae -->
  <path d="M12 8L8 4M20 8L24 4" stroke="#991B1B" stroke-width="2" stroke-linecap="round"/>
  <!-- Legs -->
  <path d="M4 14H8M24 14H28M4 20H7M25 20H28M5 26L9 24M27 26L23 24" stroke="#991B1B" stroke-width="2" stroke-linecap="round"/>
  <!-- Bug Body -->
  <ellipse cx="16" cy="19" rx="7" ry="8.5" fill="url(#bug-grad)"/>
  <!-- Bug Head -->
  <circle cx="16" cy="10.5" r="4" fill="#7F1D1D"/>
  <circle cx="14" cy="9.8" r="1" fill="#FEF2F2"/>
  <circle cx="18" cy="9.8" r="1" fill="#FEF2F2"/>
  <!-- Center Dorsal Line -->
  <line x1="16" y1="14" x2="16" y2="26" stroke="#450A0A" stroke-width="1.5"/>
</svg>`,
  },
  {
    id: 'zap',
    name: 'Speed Zap',
    category: 'status-energy',
    tags: ['quick', 'performance', 'latency', 'optimize', 'edge', 'cache'],
    keywords: ['fast', 'turbo', 'speedy', 'boost', 'cloudflare'],
    description: 'Vibrant zap badge signifying high speed, low latency, and Edge execution.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="zap-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3B82F6"/>
      <stop offset="100%" stop-color="#1D4ED8"/>
    </linearGradient>
  </defs>
  <rect x="3" y="3" width="26" height="26" rx="7" fill="url(#zap-bg)"/>
  <path d="M17 6L9 17H16L14.5 26L23 15H16L17 6Z" fill="#FACC15" stroke="#FFFFFF" stroke-width="1.2" stroke-linejoin="round"/>
</svg>`,
  },
  {
    id: 'layers',
    name: 'Stack Layers',
    category: 'cloud-infra',
    tags: ['architecture', 'stack', 'layers', 'fullstack', 'system'],
    keywords: ['tiers', 'microservices', 'composability', 'modular'],
    description: 'Isometric decoupled architectural layers illustrating full-stack tech stacks.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%" fill="none">
  <!-- Top Layer -->
  <path d="M16 3L28 9L16 15L4 9L16 3Z" fill="#38BDF8"/>
  <!-- Middle Layer -->
  <path d="M4 14.5L16 20.5L28 14.5L28 17.5L16 23.5L4 17.5V14.5Z" fill="#6366F1"/>
  <!-- Bottom Layer -->
  <path d="M4 21.5L16 27.5L28 21.5L28 24.5L16 30.5L4 24.5V21.5Z" fill="#4338CA"/>
</svg>`,
  },
  {
    id: 'cube',
    name: 'Module Cube',
    category: 'developer',
    tags: ['package', 'npm', 'module', 'bundle', 'webpack', 'vite'],
    keywords: ['box', '3d', 'library', 'dependency', 'container'],
    description: '3D isometric module cube symbolizing packages, containers, and bundlers.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%" fill="none">
  <!-- Top Face -->
  <path d="M16 3L27 9.5L16 16L5 9.5L16 3Z" fill="#60A5FA"/>
  <!-- Left Face -->
  <path d="M5 9.5L16 16V28.5L5 22V9.5Z" fill="#2563EB"/>
  <!-- Right Face -->
  <path d="M27 9.5L16 16V28.5L27 22V9.5Z" fill="#1D4ED8"/>
  <!-- Highlight Wireframes -->
  <path d="M16 3L27 9.5L16 16L5 9.5Z" stroke="#93C5FD" stroke-width="1"/>
</svg>`,
  },
  {
    id: 'lock',
    name: 'Secure Lock',
    category: 'security',
    tags: ['auth', 'crypto', 'oauth', 'jwt', 'privacy', 'secret'],
    keywords: ['password', 'key', 'ssl', 'https', 'token'],
    description: 'Hardened metallic padlock with golden shackle for credentials and encryption.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="lock-body" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>
  </defs>
  <!-- Shackle -->
  <path d="M10 13V9C10 5.7 12.7 3 16 3C19.3 3 22 5.7 22 9V13" stroke="#CBD5E1" stroke-width="3.5" stroke-linecap="round"/>
  <!-- Lock Base -->
  <rect x="6" y="13" width="20" height="16" rx="4" fill="url(#lock-body)" stroke="#B45309" stroke-width="1"/>
  <!-- Keyhole -->
  <circle cx="16" cy="19.5" r="2.2" fill="#78350F"/>
  <path d="M15 19.5L14.5 24.5H17.5L17 19.5" fill="#78350F"/>
</svg>`,
  },
  {
    id: 'heart-pulse',
    name: 'Health Pulse',
    category: 'status-energy',
    tags: ['health', 'uptime', 'telemetry', 'monitor', 'ping', 'heartbeat'],
    keywords: ['vital', 'status', 'metric', 'prometheus', 'dashboard'],
    description: 'Heart rate pulse representing server health, telemetry, and uptime status.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="heart-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F43F5E"/>
      <stop offset="100%" stop-color="#BE123C"/>
    </linearGradient>
  </defs>
  <!-- Heart Silhouette -->
  <path d="M16 28C16 28 4 20.5 4 12C4 7.5 7.5 4 12 4C14.5 4 15.8 5.2 16 6C16.2 5.2 17.5 4 20 4C24.5 4 28 7.5 28 12C28 20.5 16 28 16 28Z" fill="url(#heart-grad)"/>
  <!-- ECG Trace Line -->
  <path d="M5 14H10L12.5 9L15 18L17 11L18.5 15L20 14H27" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  {
    id: 'robot',
    name: 'AI Agent Bot',
    category: 'ai-tech',
    tags: ['bot', 'agent', 'automation', 'mcp', 'copilot', 'assistant'],
    keywords: ['cursor', 'windsurf', 'claude', 'intelligence', 'autonomous'],
    description: 'Friendly AI robot avatar symbolizing autonomous coding agents and assistants.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="bot-head" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#475569"/>
      <stop offset="100%" stop-color="#1E293B"/>
    </linearGradient>
  </defs>
  <!-- Antenna -->
  <line x1="16" y1="2" x2="16" y2="7" stroke="#94A3B8" stroke-width="2"/>
  <circle cx="16" cy="2.5" r="2.2" fill="#38BDF8"/>
  <!-- Head -->
  <rect x="6" y="7" width="20" height="18" rx="6" fill="url(#bot-head)" stroke="#64748B" stroke-width="1.2"/>
  <!-- Ears -->
  <rect x="3" y="13" width="3" height="6" rx="1.5" fill="#94A3B8"/>
  <rect x="26" y="13" width="3" height="6" rx="1.5" fill="#94A3B8"/>
  <!-- Visor Screen -->
  <rect x="9" y="11" width="14" height="6" rx="3" fill="#0F172A"/>
  <!-- Optic Sensors (Eyes) -->
  <circle cx="12.5" cy="14" r="1.8" fill="#38BDF8"/>
  <circle cx="19.5" cy="14" r="1.8" fill="#38BDF8"/>
  <!-- Voice Grid -->
  <line x1="12" y1="20" x2="20" y2="20" stroke="#94A3B8" stroke-width="1.8" stroke-linecap="round"/>
</svg>`,
  },
  {
    id: 'cloud',
    name: 'Edge Cloud',
    category: 'cloud-infra',
    tags: ['cloudflare', 'serverless', 'workers', 'edge', 'deploy', 'api'],
    keywords: ['hosting', 'network', 'distributed', 'cdn', 'aws'],
    description: 'Modern cloud infrastructure icon denoting edge computing and serverless runtimes.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="cloud-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F97316"/>
      <stop offset="100%" stop-color="#EA580C"/>
    </linearGradient>
  </defs>
  <path d="M9 25H23C26.3 25 29 22.3 29 19C29 16 26.8 13.5 23.9 13.1C23.4 8.5 19.5 5 15 5C10.9 5 7.4 7.9 6.4 12C3.9 12.8 2 15.2 2 18C2 21.9 5.1 25 9 25Z" fill="url(#cloud-grad)"/>
  <!-- Edge Sparkles -->
  <circle cx="21" cy="11" r="1.5" fill="#FED7AA"/>
  <circle cx="10" cy="18" r="1.5" fill="#FED7AA"/>
</svg>`,
  },
  {
    id: 'star',
    name: 'GitHub Star',
    category: 'developer',
    tags: ['star', 'github', 'favorite', 'open-source', 'bookmark', 'score'],
    keywords: ['rating', 'popular', 'stargazer', 'tribute'],
    description: 'Crisp faceted 5-point star representing GitHub stars and favorites.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="star-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FBBF24"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>
  </defs>
  <path d="M16 2.5L20.2 11.2L29.5 12.5L22.8 19L24.3 28.5L16 24L7.7 28.5L9.2 19L2.5 12.5L11.8 11.2L16 2.5Z" fill="url(#star-grad)" stroke="#B45309" stroke-width="1" stroke-linejoin="round"/>
  <!-- Facet Shadow -->
  <path d="M16 2.5V24L7.7 28.5L9.2 19L2.5 12.5L11.8 11.2L16 2.5Z" fill="#F59E0B" fill-opacity="0.3"/>
</svg>`,
  },
  {
    id: 'palette',
    name: 'Color Palette',
    category: 'creative',
    tags: ['design', 'ui', 'tailwind', 'theme', 'color', 'css'],
    keywords: ['style', 'tokens', 'art', 'canvas', 'ux'],
    description: 'Artist palette loaded with bright vibrant primary accents for theme systems.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%" fill="none">
  <!-- Wooden Palette Frame -->
  <path d="M16 3C8.8 3 3 8.8 3 16C3 20.8 5.6 25 9.5 27.2C10.8 28 12.5 27.2 12.5 25.7V24C12.5 21.8 14.3 20 16.5 20H19C24 20 28 16 28 11C28 6.6 22.6 3 16 3Z" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.2"/>
  <!-- Paint Wells -->
  <circle cx="9" cy="11" r="2.2" fill="#EF4444"/>
  <circle cx="15" cy="8" r="2.2" fill="#F59E0B"/>
  <circle cx="21" cy="9" r="2.2" fill="#10B981"/>
  <circle cx="24" cy="14" r="2.2" fill="#3B82F6"/>
  <circle cx="20" cy="24" r="2.5" fill="#64748B"/>
</svg>`,
  },
  {
    id: 'cpu',
    name: 'Silicon CPU',
    category: 'ai-tech',
    tags: ['hardware', 'processor', 'compute', 'silicon', 'gpu', 'chip'],
    keywords: ['core', 'performance', 'server', 'tpu', 'threads'],
    description: 'Microprocessor chip with silicon die and high-frequency interconnect pins.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="cpu-die" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284C7"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
  </defs>
  <!-- Connector Pins -->
  <path d="M10 2V6M16 2V6M22 2V6M10 26V30M16 26V30M22 26V30M2 10H6M2 16H6M2 22H6M26 10H30M26 16H30M26 22H30" stroke="#64748B" stroke-width="2" stroke-linecap="round"/>
  <!-- Ceramic Body -->
  <rect x="6" y="6" width="20" height="20" rx="3" fill="#1E293B" stroke="#475569" stroke-width="1.5"/>
  <!-- Inner Silicon Core -->
  <rect x="10" y="10" width="12" height="12" rx="2" fill="url(#cpu-die)"/>
  <circle cx="16" cy="16" r="2" fill="#38BDF8"/>
</svg>`,
  },
  {
    id: 'gauge',
    name: 'Benchmark Gauge',
    category: 'status-energy',
    tags: ['speed', 'lighthouse', 'benchmark', 'metric', 'fps', 'performance'],
    keywords: ['meter', 'speedometer', 'fast', 'kpi', 'analytics'],
    description: 'High performance dial showing top-tier 100% benchmark score.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%" fill="none">
  <!-- Dial Arc -->
  <path d="M6 22C4.5 19 4 16 4 16C4 9.4 9.4 4 16 4C22.6 4 28 9.4 28 16C28 16 27.5 19 26 22" stroke="#E2E8F0" stroke-width="3" stroke-linecap="round"/>
  <path d="M6 22C4.5 19 4 16 4 16C4 9.4 9.4 4 16 4C22.6 4 28 9.4 28 16" stroke="#10B981" stroke-width="3.2" stroke-linecap="round"/>
  <!-- Pointer Needle -->
  <line x1="16" y1="20" x2="23" y2="10" stroke="#EF4444" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="16" cy="20" r="3" fill="#1E293B"/>
  <circle cx="16" cy="20" r="1.5" fill="#FFFFFF"/>
</svg>`,
  },
  {
    id: 'search',
    name: 'Lens Search',
    category: 'creative',
    tags: ['search', 'find', 'filter', 'discover', 'lookup', 'mcp'],
    keywords: ['query', 'magnifier', 'explore', 'scan'],
    description: 'Precision optical lens for querying emojis, tokens, and resources.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="lens-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E0F2FE"/>
      <stop offset="100%" stop-color="#BAE6FD"/>
    </linearGradient>
  </defs>
  <!-- Handle -->
  <line x1="19.5" y1="19.5" x2="28" y2="28" stroke="#334155" stroke-width="4.5" stroke-linecap="round"/>
  <!-- Lens Frame -->
  <circle cx="13" cy="13" r="9" fill="url(#lens-grad)" stroke="#0284C7" stroke-width="2.5"/>
  <circle cx="11" cy="10" r="2.5" fill="#FFFFFF" fill-opacity="0.8"/>
</svg>`,
  },
  {
    id: 'key',
    name: 'API Key',
    category: 'security',
    tags: ['api-key', 'secret', 'auth', 'token', 'credentials', 'access'],
    keywords: ['security', 'password', 'passkey', 'permission'],
    description: 'Golden cryptographic key for API authentications and secret management.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="key-gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCD34D"/>
      <stop offset="100%" stop-color="#B45309"/>
    </linearGradient>
  </defs>
  <!-- Key Head Ring -->
  <circle cx="10" cy="16" r="7" fill="url(#key-gold)" stroke="#92400E" stroke-width="1"/>
  <circle cx="10" cy="16" r="3.2" fill="#FFFFFF"/>
  <!-- Shaft & Teeth -->
  <path d="M16 14.5H27C27.8 14.5 28.5 15.2 28.5 16C28.5 16.8 27.8 17.5 27 17.5H26V21H23V17.5H21V20H19V17.5H16V14.5Z" fill="url(#key-gold)"/>
</svg>`,
  },
  {
    id: 'api',
    name: 'REST API',
    category: 'developer',
    tags: ['api', 'rest', 'graphql', 'endpoints', 'json', 'rpc'],
    keywords: ['connect', 'webhook', 'integration', 'transport', 'http'],
    description: 'Interconnected gateway nodes representing JSON-RPC 2.0 and REST endpoints.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%" fill="none">
  <!-- Connecting Links -->
  <line x1="8" y1="16" x2="24" y2="8" stroke="#94A3B8" stroke-width="2.5"/>
  <line x1="8" y1="16" x2="24" y2="24" stroke="#94A3B8" stroke-width="2.5"/>
  <line x1="24" y1="8" x2="24" y2="24" stroke="#94A3B8" stroke-width="2.5"/>
  <!-- Nodes -->
  <circle cx="8" cy="16" r="5" fill="#3B82F6"/>
  <circle cx="8" cy="16" r="2" fill="#FFFFFF"/>
  <circle cx="24" cy="8" r="4.5" fill="#10B981"/>
  <circle cx="24" cy="8" r="1.8" fill="#FFFFFF"/>
  <circle cx="24" cy="24" r="4.5" fill="#8B5CF6"/>
  <circle cx="24" cy="24" r="1.8" fill="#FFFFFF"/>
</svg>`,
  },
  {
    id: 'server',
    name: 'Rack Server',
    category: 'cloud-infra',
    tags: ['server', 'cloud', 'hosting', 'datacenter', 'infra', 'devops'],
    keywords: ['node', 'blade', 'rack', 'cluster', 'edge'],
    description: 'Modern enterprise rack blade server with drive slots and status activity.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%" fill="none">
  <!-- Server Unit 1 -->
  <rect x="4" y="5" width="24" height="9" rx="2" fill="#1E293B" stroke="#475569" stroke-width="1.2"/>
  <line x1="8" y1="9.5" x2="16" y2="9.5" stroke="#64748B" stroke-width="2" stroke-linecap="round"/>
  <circle cx="21" cy="9.5" r="1.2" fill="#10B981"/>
  <circle cx="24" cy="9.5" r="1.2" fill="#38BDF8"/>
  <!-- Server Unit 2 -->
  <rect x="4" y="18" width="24" height="9" rx="2" fill="#1E293B" stroke="#475569" stroke-width="1.2"/>
  <line x1="8" y1="22.5" x2="16" y2="22.5" stroke="#64748B" stroke-width="2" stroke-linecap="round"/>
  <circle cx="21" cy="22.5" r="1.2" fill="#10B981"/>
  <circle cx="24" cy="22.5" r="1.2" fill="#F59E0B"/>
</svg>`,
  },
  {
    id: 'globe',
    name: 'Global CDN',
    category: 'cloud-infra',
    tags: ['cdn', 'global', 'edge', 'world', 'network', 'cloudflare'],
    keywords: ['web', 'internet', 'distribution', 'regions', 'dns'],
    description: 'Latitude & longitude network globe for distributed edge points of presence.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="globe-fill" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284C7"/>
      <stop offset="100%" stop-color="#0369A1"/>
    </linearGradient>
  </defs>
  <circle cx="16" cy="16" r="12" fill="url(#globe-fill)" stroke="#0284C7" stroke-width="1"/>
  <!-- Latitude Ellipses -->
  <ellipse cx="16" cy="16" rx="5.5" ry="12" stroke="#7DD3FC" stroke-width="1.2" fill="none"/>
  <line x1="4" y1="16" x2="28" y2="16" stroke="#7DD3FC" stroke-width="1.2"/>
  <path d="M6 10C8 11.5 12 12.5 16 12.5C20 12.5 24 11.5 26 10" stroke="#7DD3FC" stroke-width="1.2" fill="none"/>
  <path d="M6 22C8 20.5 12 19.5 16 19.5C20 19.5 24 20.5 26 22" stroke="#7DD3FC" stroke-width="1.2" fill="none"/>
</svg>`,
  },
  {
    id: 'bell',
    name: 'Alert Bell',
    category: 'status-energy',
    tags: ['alert', 'notification', 'bell', 'event', 'push', 'signal'],
    keywords: ['alarm', 'notice', 'reminder', 'sound'],
    description: 'Alert notification bell ringing with active sound waves.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="bell-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FBBF24"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>
  </defs>
  <!-- Top Loop -->
  <path d="M16 3C14.9 3 14 3.9 14 5V6.2C10.6 7.6 8 11 8 15V21L5 24V25H27V24L24 21V15C24 11 21.4 7.6 18 6.2V5C18 3.9 17.1 3 16 3Z" fill="url(#bell-grad)"/>
  <!-- Clapper -->
  <circle cx="16" cy="27.5" r="2.5" fill="#B45309"/>
  <!-- Sound Wave -->
  <path d="M28 10C29.5 12 30 14 30 16" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/>
</svg>`,
  },
  {
    id: 'tool',
    name: 'Craft Tool',
    category: 'creative',
    tags: ['tool', 'config', 'setup', 'repair', 'settings', 'utility'],
    keywords: ['wrench', 'options', 'custom', 'tweak', 'admin'],
    description: 'Precision mechanical wrench for configuration, tuning, and utilities.',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="wrench-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#94A3B8"/>
      <stop offset="100%" stop-color="#475569"/>
    </linearGradient>
  </defs>
  <path d="M26.5 5.5C24.5 3.5 21.2 3.8 19.5 6L21 9L18 10.5L15 9C14 10.5 14.2 12.5 15.5 14L5.5 24C4.8 24.7 4.8 25.8 5.5 26.5C6.2 27.2 7.3 27.2 8 26.5L18 16.5C19.5 17.8 21.5 18 23 17L21.5 14L23 11L26 12.5C28.2 10.8 28.5 7.5 26.5 5.5Z" fill="url(#wrench-grad)"/>
</svg>`,
  },
];

/**
 * Searches emojis by text query, tags, or category.
 * @param query Text search query
 * @param category Optional category filter
 * @returns Filtered array of EmojiItem
 */
export function searchEmojis(query: string = '', category: string = 'all'): EmojiItem[] {
  const normalized = query.trim().toLowerCase();
  return EMOJIS.filter((item) => {
    const matchesCategory = category === 'all' || item.category === category;
    if (!matchesCategory) return false;

    if (!normalized) return true;

    const nameMatch = item.name.toLowerCase().includes(normalized);
    const idMatch = item.id.toLowerCase().includes(normalized);
    const tagMatch = item.tags.some((t) => t.toLowerCase().includes(normalized));
    const keywordMatch = item.keywords.some((k) => k.toLowerCase().includes(normalized));
    const descMatch = item.description.toLowerCase().includes(normalized);

    return nameMatch || idMatch || tagMatch || keywordMatch || descMatch;
  });
}

/**
 * Finds an emoji by exact ID.
 */
export function getEmojiById(id: string): EmojiItem | undefined {
  return EMOJIS.find((item) => item.id.toLowerCase() === id.toLowerCase());
}

/**
 * Generates a clean React Component string for an emoji.
 */
export function generateReactComponent(item: EmojiItem, componentName?: string): string {
  const name =
    componentName ||
    item.id
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('') + 'Emoji';

  return `import React from 'react';

export interface ${name}Props extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

/**
 * ${item.name} - Modern Vector SVG Emoji
 * ${item.description}
 * Tags: ${item.tags.join(', ')}
 */
export const ${name}: React.FC<${name}Props> = ({
  size = 32,
  className = '',
  ...props
}) => {
  return (
    ${item.svg
      .replace('<svg ', `<svg width={size} height={size} className={className} `)
      .split('\n')
      .map((line, i) => (i === 0 ? line : '    ' + line))
      .join('\n')}
  );
};

export default ${name};`;
}

/**
 * Generates a ready-to-use Vue 3 SFC component.
 */
export function generateVueComponent(item: EmojiItem): string {
  return `<template>
  <div class="inline-flex items-center justify-center" :style="{ width: size + 'px', height: size + 'px' }">
    ${item.svg}
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: number | string;
  }>(),
  {
    size: 32,
  }
);
</script>
`;
}
