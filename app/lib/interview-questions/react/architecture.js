export const architectureQuestions = [
  {
    id: 'react-arch-1',
    category: 'Architecture',
    difficulty: 'Expert',
    question: 'Micro-Frontend Architecture with Module Federation',
    answer: `Staff/Principal level question at **large tech companies**.

### What is Micro-Frontend?
Breaking a monolithic frontend into smaller, independently deployable applications.

### Module Federation (Webpack 5):
- Share code at runtime (not build time)
- Load remote components dynamically
- Independent deployments
- Separate teams, separate repos

### Key Concepts:
1. **Host** - Container app that loads remotes
2. **Remote** - Exposes components
3. **Shared** - Common dependencies

### Trade-offs:
+ Independent deployments
+ Team autonomy
+ Technology flexibility
- Complexity
- Bundle optimization harder
- Shared state challenges`,
    codeExample: `// Module Federation Architecture
console.log('=== Module Federation Concept ===');

// Host Application (Container)
const hostConfig = {
  name: 'shell',
  remotes: {
    cart: 'cart@https://cart.example.com/remoteEntry.js',
    products: 'products@https://products.example.com/remoteEntry.js',
    checkout: 'checkout@https://checkout.example.com/remoteEntry.js'
  },
  shared: ['react', 'react-dom']
};

console.log('Host Application Config:');
console.log(JSON.stringify(hostConfig, null, 2));

// Remote Application
const remoteConfig = {
  name: 'cart',
  filename: 'remoteEntry.js',
  exposes: {
    './CartWidget': './src/components/CartWidget',
    './useCart': './src/hooks/useCart'
  },
  shared: ['react', 'react-dom']
};

console.log('\\nRemote Application Config:');
console.log(JSON.stringify(remoteConfig, null, 2));

console.log('\\n=== Loading Remote Component ===');

// Dynamic import of remote component
async function loadRemoteCart() {
  console.log('[Host] Loading cart remote...');
  
  // In real MF: const Cart = await import('cart/CartWidget');
  console.log('[Host] Remote loaded successfully');
  console.log('[Host] Rendering CartWidget from cart.example.com');
}

loadRemoteCart();

console.log('\\n=== Architecture Diagram ===');
console.log('');
console.log('┌──────────────────────────────────────────┐');
console.log('│            Shell (Host App)              │');
console.log('│  ┌─────────────────────────────────────┐ │');
console.log('│  │    Header    │   Navigation        │ │');
console.log('│  ├──────────────┼─────────────────────┤ │');
console.log('│  │              │                     │ │');
console.log('│  │   Products   │   Cart Widget       │ │');
console.log('│  │   (Remote)   │     (Remote)        │ │');
console.log('│  │              │                     │ │');
console.log('│  ├──────────────┴─────────────────────┤ │');
console.log('│  │          Checkout (Remote)         │ │');
console.log('│  └─────────────────────────────────────┘ │');
console.log('└──────────────────────────────────────────┘');

console.log('\\n=== When to Use ===');
console.log('✓ Multiple teams, large organization');
console.log('✓ Independent deployment requirements');
console.log('✓ Different release cycles');
console.log('');
console.log('✗ Small teams (overhead not worth it)');
console.log('✗ Simple applications');`
  },
  {
    id: 'react-arch-2',
    category: 'Architecture',
    difficulty: 'Hard',
    question: 'Design System Architecture - Component Library',
    answer: `Essential for **Stripe, Airbnb, Shopify** interviews.

### Component Library Essentials:
1. **Atomic Design** - Atoms → Molecules → Organisms
2. **Compound Components** - Flexible composition
3. **Tokens** - Design tokens for theming
4. **Variants** - Polymorphic components
5. **Documentation** - Storybook or similar

### Key Patterns:
- Headless components (logic only, no styles)
- Slot patterns for composition
- Polymorphic "as" prop
- CSS-in-JS or CSS modules

### Production Requirements:
- Accessibility built-in
- Tree-shakeable exports
- TypeScript types
- Comprehensive testing`,
    codeExample: `// Design System Component Patterns
console.log('=== Atomic Design Hierarchy ===');

console.log('');
console.log('Atoms → Molecules → Organisms → Templates → Pages');
console.log('');
console.log('Atoms: Button, Input, Label, Icon');
console.log('Molecules: InputField (Label + Input + Error)');
console.log('Organisms: LoginForm (Multiple Molecules)');
console.log('Templates: AuthLayout (Header + Content + Footer)');
console.log('Pages: LoginPage (Template + Data)');

console.log('\\n=== Polymorphic "as" Props ===');

// Polymorphic component pattern
function Button({ as: Component = 'button', children, ...props }) {
  console.log('Rendering as:', Component);
  return { type: Component, props, children };
}

console.log('\\n// Render as button');
Button({ children: 'Click me' });

console.log('\\n// Render as link');
Button({ as: 'a', href: '/home', children: 'Go Home' });

console.log('\\n// Render as custom component');
Button({ as: 'Link', to: '/dashboard', children: 'Dashboard' });

console.log('\\n=== Design Tokens ===');

const tokens = {
  colors: {
    primary: '#0066FF',
    secondary: '#6B7280',
    error: '#EF4444',
    success: '#10B981'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  typography: {
    h1: { fontSize: '2.5rem', fontWeight: 700 },
    body: { fontSize: '1rem', fontWeight: 400 }
  }
};

console.log('Design Tokens:');
console.log(JSON.stringify(tokens, null, 2));

console.log('\\n=== Compound Component Pattern ===');

console.log('// Flexible composition');
console.log('<Select>');
console.log('  <Select.Trigger>Choose option</Select.Trigger>');
console.log('  <Select.Content>');
console.log('    <Select.Item value="1">Option 1</Select.Item>');
console.log('    <Select.Item value="2">Option 2</Select.Item>');
console.log('  </Select.Content>');
console.log('</Select>');

console.log('\\n=== Export Strategy ===');
console.log('// Named exports for tree-shaking');
console.log('export { Button } from "./Button";');
console.log('export { Input } from "./Input";');
console.log('export { Select } from "./Select";');
console.log('');
console.log('// NOT: export * from "./components"');

console.log('\\n✓ Design systems: consistency + productivity');`
  },
  {
    id: 'react-arch-3',
    category: 'Architecture',
    difficulty: 'Expert',
    question: 'Monorepo Patterns - Nx and Turborepo',
    answer: `Staff level question at **large engineering organizations**.

### What is Monorepo?
Single repository containing multiple projects/packages with shared code.

### Benefits:
- Shared code and configs
- Atomic changes across packages
- Consistent tooling
- Easier refactoring

### Key Tools:
**Nx:**
- Full framework with generators
- Intelligent build caching
- Dependency graph visualization

**Turborepo:**
- Lighter weight
- Remote caching
- Incremental builds

### Monorepo Structure:
- /apps (deployable applications)
- /packages (shared libraries)
- /tools (internal tooling)`,
    codeExample: `// Monorepo Structure
console.log('=== Monorepo Directory Structure ===');

const structure = {
  'apps/': {
    'web/': 'Main web application',
    'admin/': 'Admin dashboard',
    'docs/': 'Documentation site',
    'mobile/': 'React Native app'
  },
  'packages/': {
    'ui/': 'Shared component library',
    'utils/': 'Common utilities',
    'config/': 'Shared configs (ESLint, TS)',
    'types/': 'Shared TypeScript types'
  },
  'tools/': {
    'generators/': 'Code generators',
    'scripts/': 'Build scripts'
  }
};

console.log(JSON.stringify(structure, null, 2));

console.log('\\n=== Package Dependencies ===');

console.log('');
console.log('┌─────────┐    ┌─────────┐');
console.log('│   web   │    │  admin  │');
console.log('└────┬────┘    └────┬────┘');
console.log('     │              │');
console.log('     └──────┬───────┘');
console.log('            │');
console.log('      ┌─────▼─────┐');
console.log('      │    ui     │');
console.log('      └─────┬─────┘');
console.log('            │');
console.log('     ┌──────┴──────┐');
console.log('     │             │');
console.log('┌────▼────┐  ┌─────▼────┐');
console.log('│  utils  │  │  types   │');
console.log('└─────────┘  └──────────┘');

console.log('\\n=== Turborepo - turbo.json ===');

const turboConfig = {
  pipeline: {
    'build': {
      dependsOn: ['^build'],
      outputs: ['dist/**', '.next/**']
    },
    'test': {
      dependsOn: ['build'],
      outputs: []
    },
    'lint': {},
    'dev': {
      cache: false
    }
  }
};

console.log(JSON.stringify(turboConfig, null, 2));

console.log('\\n=== Build Caching ===');

console.log('First build:');
console.log('  turbo run build');
console.log('  → Building @repo/utils... 5s');
console.log('  → Building @repo/ui... 8s');
console.log('  → Building @repo/web... 15s');
console.log('  Total: 28s');

console.log('\\nSecond build (cached):');
console.log('  turbo run build');
console.log('  → @repo/utils... CACHED');
console.log('  → @repo/ui... CACHED');
console.log('  → @repo/web... CACHED');
console.log('  Total: 0.5s');

console.log('\\n✓ Monorepos: share code, atomic changes');
console.log('✓ Nx/Turborepo: fast builds with caching');`
  },
  {
    id: 'react-arch-4',
    category: 'Architecture',
    difficulty: 'Hard',
    question: 'Feature Flags Implementation',
    answer: `Production pattern at **every scale company**.

### What are Feature Flags?
Toggles that enable/disable features without deployment.

### Use Cases:
1. **Gradual rollout** - 10% → 50% → 100%
2. **A/B testing** - Compare variants
3. **Kill switch** - Disable broken features fast
4. **Beta features** - Internal/beta user access
5. **Ops toggles** - Performance tuning

### Implementation Options:
- LaunchDarkly, Flagsmith (SaaS)
- Unleash (self-hosted)
- Custom implementation

### Best Practices:
- Clean up old flags
- Type-safe flag access
- Default to safe values
- Log flag evaluations`,
    codeExample: `// Feature Flags Implementation
console.log('=== Feature Flag System ===');

// Simple feature flag provider
function createFeatureFlags(defaultFlags) {
  let flags = { ...defaultFlags };
  const listeners = new Set();
  
  return {
    get: (key) => {
      console.log('[Flag] Evaluating:', key, '=', flags[key]);
      return flags[key];
    },
    set: (key, value) => {
      flags[key] = value;
      console.log('[Flag] Updated:', key, '=', value);
      listeners.forEach(l => l(flags));
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  };
}

const featureFlags = createFeatureFlags({
  newCheckout: false,
  darkMode: true,
  experimentalSearch: 'control',
  maxUploadSize: 10
});

console.log('\\n=== Using Feature Flags ===');

// Check boolean flag
function CheckoutButton() {
  const useNewCheckout = featureFlags.get('newCheckout');
  
  if (useNewCheckout) {
    console.log('Rendering: <NewCheckoutButton />');
  } else {
    console.log('Rendering: <OldCheckoutButton />');
  }
}

CheckoutButton();

// Gradual rollout simulation
console.log('\\n=== Percentage Rollout ===');

function isEnabledForUser(flagName, userId, percentage) {
  // Consistent hash based on userId
  const hash = userId % 100;
  const enabled = hash < percentage;
  console.log('[Rollout] User', userId, ':', enabled ? 'IN' : 'OUT', '(' + percentage + '%)');
  return enabled;
}

console.log('10% rollout:');
isEnabledForUser('newFeature', 1, 10);
isEnabledForUser('newFeature', 15, 10);
isEnabledForUser('newFeature', 50, 10);

console.log('\\n50% rollout:');
isEnabledForUser('newFeature', 1, 50);
isEnabledForUser('newFeature', 50, 50);
isEnabledForUser('newFeature', 75, 50);

console.log('\\n=== React Hook Pattern ===');

function useFeatureFlag(flagName) {
  const value = featureFlags.get('darkMode');
  
  useEffect(() => {
    console.log('[useFeatureFlag] Subscribing to:', flagName);
    return () => console.log('[useFeatureFlag] Unsubscribing');
  }, [flagName]);
  
  return value;
}

console.log('\\nComponent usage:');
console.log('const showNewUI = useFeatureFlag("newCheckout");');
console.log('return showNewUI ? <NewUI /> : <OldUI />;');

useFeatureFlag('darkMode');

console.log('\\n✓ Feature flags: deploy != release');
console.log('✓ Remove old flags to avoid tech debt');`
  },
  {
    id: 'react-arch-5',
    category: 'Architecture',
    difficulty: 'Expert',
    question: 'Plugin Architecture - Extensible Applications',
    answer: `Advanced pattern for **platforms and tools**.

### What is Plugin Architecture?
Core application that can be extended via plugins without modifying core code.

### Key Concepts:
- Plugin registry/loader
- Lifecycle hooks
- API surface for plugins
- Sandboxing/isolation

### Use Cases:
- VS Code extensions
- WordPress plugins
- Babel/ESLint plugins
- Design tool plugins

### Implementation:
- Event system for hooks
- Dependency injection
- Dynamic imports`,
    codeExample: `// Plugin Architecture
console.log('=== Plugin System ===');

function createPluginSystem() {
  const plugins = [];
  const hooks = {};
  
  return {
    register: (plugin) => {
      console.log('[System] Registering plugin:', plugin.name);
      plugins.push(plugin);
      plugin.init?.();
    },
    hook: (name, callback) => {
      if (!hooks[name]) hooks[name] = [];
      hooks[name].push(callback);
      console.log('[System] Hook registered:', name);
    },
    trigger: (name, data) => {
      console.log('[System] Triggering hook:', name);
      hooks[name]?.forEach(cb => cb(data));
    }
  };
}

const system = createPluginSystem();

console.log('\\n=== Example Plugins ===');

const analyticsPlugin = {
  name: 'analytics',
  init: () => {
    console.log('[Analytics] Plugin initialized');
    system.hook('page:view', (page) => {
      console.log('[Analytics] Track page view:', page);
    });
  }
};

const themePlugin = {
  name: 'theme',
  init: () => {
    console.log('[Theme] Plugin initialized');
    system.hook('app:mount', () => {
      console.log('[Theme] Applying dark theme');
    });
  }
};

system.register(analyticsPlugin);
system.register(themePlugin);

console.log('\\n=== Triggering Hooks ===');
system.trigger('app:mount');
system.trigger('page:view', '/dashboard');

console.log('\\n✓ Plugins: extend without modifying core');`
  },
  {
    id: 'react-arch-6',
    category: 'Architecture',
    difficulty: 'Hard',
    question: 'Performance Budgets - Enforcing Speed',
    answer: `Production requirement at **performance-focused companies**.

### What are Performance Budgets?
Limits on metrics like bundle size, LCP, FID that fail builds if exceeded.

### Key Metrics:
- Bundle size (< 200KB initial)
- Time to Interactive (< 3s)
- Largest Contentful Paint (< 2.5s)
- First Input Delay (< 100ms)

### Tools:
- bundlesize package
- Lighthouse CI
- webpack-bundle-analyzer
- Performance budgets in webpack

### Enforcement:
- CI/CD pipeline checks
- Pre-commit hooks
- PR comments with stats`,
    codeExample: `// Performance Budgets
console.log('=== Bundle Size Budget ===');

console.log('// package.json');
console.log('{');
console.log('  "bundlesize": [');
console.log('    {');
console.log('      "path": "./dist/main.*.js",');
console.log('      "maxSize": "200 KB"');
console.log('    },');
console.log('    {');
console.log('      "path": "./dist/vendor.*.js",');
console.log('      "maxSize": "150 KB"');
console.log('    }');
console.log('  ]');
console.log('}');

console.log('\\n=== CI Check ===');
console.log('npm run build');
console.log('bundlesize');
console.log('');
console.log('✓ main.abc123.js: 185 KB < 200 KB');
console.log('✗ vendor.def456.js: 165 KB > 150 KB');
console.log('');
console.log('Build failed: Bundle size exceeded!');

console.log('\\n=== Lighthouse Budget ===');
const budget = {
  resourceSizes: [
    { resourceType: 'script', budget: 200 },
    { resourceType: 'stylesheet', budget: 50 },
    { resourceType: 'image', budget: 300 }
  ],
  timings: [
    { metric: 'interactive', budget: 3000 },
    { metric: 'first-contentful-paint', budget: 1500 }
  ]
};

console.log(JSON.stringify(budget, null, 2));

console.log('\\n✓ Performance budgets prevent regressions');`
  }
];
