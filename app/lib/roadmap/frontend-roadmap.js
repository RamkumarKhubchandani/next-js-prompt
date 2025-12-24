export const FRONTEND_ROADMAP_2025 = {
  id: 'frontend-roadmap-2025',
  title: 'Frontend Roadmap 2025',
  updatedAt: '2025-12-12',
  nodes: {
    html: {
      id: 'html',
      title: 'HTML',
      level: 'foundation',
      summary: 'Semantics, accessibility-first markup, and document structure.',
      requires: [],
      courseId: null,
      why: [
        'HTML is the contract between your content and the browser.',
        'Semantic HTML reduces a11y work and improves SEO automatically.',
      ],
      learn: ['Semantic tags', 'Forms', 'Accessibility basics (labels, landmarks)', 'Media elements'],
      demo: {
        kind: 'none',
      },
    },
    css: {
      id: 'css',
      title: 'CSS',
      level: 'foundation',
      summary: 'Layout, responsiveness, and design tokens.',
      requires: ['html'],
      courseId: null,
      why: ['Most “frontend” work is UI layout and styling.', 'CSS mastery makes you fast and confident.'],
      learn: ['Box model', 'Flexbox', 'Grid', 'Responsive design', 'Positioning', 'Cascade & specificity'],
      demo: {
        kind: 'none',
      },
    },
    'css-grid': {
      id: 'css-grid',
      title: 'CSS Grid',
      level: 'core',
      summary: 'Two-dimensional layout system for real UI layouts (dashboards, cards, pages).',
      requires: ['css'],
      courseId: null,
      why: ['Grid solves layout problems that Flexbox cannot (rows + columns).'],
      learn: ['grid-template-columns', 'gap', 'auto-fit/auto-fill', 'minmax()', 'grid areas'],
      demo: {
        kind: 'media',
        label: 'Cursor demo: generate a grid layout in seconds',
        // NOTE: add your own media file in /public/roadmap-demos/ later
        src: '/roadmap-demos/css-grid-cursor.mp4',
        mediaType: 'video', // 'video' | 'gif'
      },
    },
    javascript: {
      id: 'javascript',
      title: 'JavaScript',
      level: 'foundation',
      summary: 'The runtime: execution model, async, DOM, modules, and patterns.',
      requires: ['css'],
      courseId: 'javascript',
      why: ['Everything dynamic in the browser is JavaScript (or compiles to it).'],
      learn: ['Scopes & closures', 'Promises/async', 'DOM', 'Modules', 'Fetch', 'Error handling'],
      demo: {
        kind: 'none',
      },
    },
    typescript: {
      id: 'typescript',
      title: 'TypeScript',
      level: 'core',
      summary: 'Types that scale: safer refactors, better APIs, and faster teams.',
      requires: ['javascript'],
      courseId: null,
      why: ['TypeScript makes large codebases maintainable and refactors safe.'],
      learn: ['Types & interfaces', 'Generics', 'Narrowing', 'TS config', 'Typing React props'],
      demo: { kind: 'none' },
    },
    nodejs: {
      id: 'nodejs',
      title: 'Node.js Basics',
      level: 'core',
      summary: 'Event loop, HTTP, APIs, and practical backend fundamentals for frontend devs.',
      requires: ['javascript'],
      courseId: 'fullstack',
      why: ['Most frontend engineers ship full-stack features now.'],
      learn: ['Event loop', 'HTTP', 'REST APIs', 'Auth basics', 'Env & deployment'],
      demo: { kind: 'none' },
    },
    react: {
      id: 'react',
      title: 'React',
      level: 'framework',
      summary: 'Component architecture, state, rendering, performance, and patterns.',
      requires: ['javascript'],
      courseId: 'react',
      why: ['React is the dominant UI component model in industry.'],
      learn: ['Components', 'State & effects', 'Rendering model', 'Performance', 'Testing'],
      demo: {
        kind: 'none',
      },
    },
    testing: {
      id: 'testing',
      title: 'Testing (Unit → E2E)',
      level: 'core',
      summary: 'Confidence at scale: unit tests, integration tests, and E2E flows.',
      requires: ['react'],
      courseId: null,
      why: ['Tests let you ship faster with fewer regressions.'],
      learn: ['React Testing Library', 'Mocking', 'API testing', 'Playwright basics'],
      demo: { kind: 'none' },
    },
    performance: {
      id: 'performance',
      title: 'Performance',
      level: 'core',
      summary: 'Make apps fast: profiling, memoization, rendering, and web vitals.',
      requires: ['react'],
      courseId: null,
      why: ['Performance is user experience and conversion.'],
      learn: ['Profiler', 'Memoization', 'Bundle analysis', 'Web Vitals', 'Caching strategies'],
      demo: { kind: 'none' },
    },
    nextjs: {
      id: 'nextjs',
      title: 'Next.js',
      level: 'framework',
      summary: 'Full-stack React: routing, SSR/SSG, APIs, caching, and deployment.',
      requires: ['react'],
      courseId: null,
      why: ['Most production React apps need routing + data fetching + performance defaults.'],
      learn: ['App Router', 'Server Components', 'Caching', 'Deployment', 'Auth patterns'],
      demo: {
        kind: 'none',
      },
    },
  },
  // Core visual path
  path: ['html', 'css', 'javascript', 'react', 'nextjs'],
  // Optional nodes shown under the main path
  extras: ['css-grid', 'typescript', 'nodejs', 'testing', 'performance'],
  // Skill-tree layout for a "wow" tree view.
  // Coordinates are in pixels within a large canvas (the UI supports pan/zoom).
  layout: {
    nodes: {
      html: { x: 0, y: 0 },
      css: { x: 0, y: 170 },
      javascript: { x: 0, y: 340 },
      react: { x: 0, y: 510 },
      nextjs: { x: 0, y: 680 },

      'css-grid': { x: -260, y: 235 },
      typescript: { x: 260, y: 405 },
      nodejs: { x: -260, y: 405 },
      testing: { x: 260, y: 575 },
      performance: { x: -260, y: 575 },
    },
    edges: [
      ['html', 'css'],
      ['css', 'javascript'],
      ['javascript', 'react'],
      ['react', 'nextjs'],
      ['css', 'css-grid'],
      ['javascript', 'typescript'],
      ['javascript', 'nodejs'],
      ['react', 'testing'],
      ['react', 'performance'],
    ],
  },
};






