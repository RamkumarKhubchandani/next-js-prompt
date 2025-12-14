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
      why: ['Everything dynamic in the browser is JavaScript (or compiles to it).'],
      learn: ['Scopes & closures', 'Promises/async', 'DOM', 'Modules', 'Fetch', 'Error handling'],
      demo: {
        kind: 'none',
      },
    },
    react: {
      id: 'react',
      title: 'React',
      level: 'framework',
      summary: 'Component architecture, state, rendering, performance, and patterns.',
      why: ['React is the dominant UI component model in industry.'],
      learn: ['Components', 'State & effects', 'Rendering model', 'Performance', 'Testing'],
      demo: {
        kind: 'none',
      },
    },
    nextjs: {
      id: 'nextjs',
      title: 'Next.js',
      level: 'framework',
      summary: 'Full-stack React: routing, SSR/SSG, APIs, caching, and deployment.',
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
  extras: ['css-grid'],
};



