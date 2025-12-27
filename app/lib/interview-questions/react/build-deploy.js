export const buildDeployQuestions = [
    {
        id: 'react-build-1',
        category: 'Build & Deploy',
        difficulty: 'Expert',
        question: 'Webpack vs Vite vs Turbopack - Modern Build Tools',
        answer: `Critical for **production deployments** at all companies.

### Webpack (Traditional):
- Most mature, battle-tested
- Huge ecosystem of plugins
- Slower build times
- Complex configuration

### Vite (Modern):
- Lightning-fast dev server (ESM)
- Fast HMR (Hot Module Replacement)
- Simple configuration
- Production uses Rollup

### Turbopack (Next.js 13+):
- Built in Rust, extremely fast
- Incremental compilation
- Integrated with Next.js
- Still maturing

### Performance Comparison:
- **Dev server start**: Vite (instant) > Turbopack > Webpack
- **HMR**: Vite/Turbopack (< 50ms) > Webpack (100-500ms)
- **Production build**: Similar (all optimized)`,
        codeExample: `// Build Tools Comparison
console.log('=== Webpack Configuration ===');

console.log('// webpack.config.js');
console.log('module.exports = {');
console.log('  entry: "./src/index.js",');
console.log('  output: {');
console.log('    filename: "bundle.[contenthash].js",');
console.log('    path: path.resolve(__dirname, "dist")');
console.log('  },');
console.log('  module: {');
console.log('    rules: [');
console.log('      { test: /\\\\.jsx?$/, use: "babel-loader" },');
console.log('      { test: /\\\\.css$/, use: ["style-loader", "css-loader"] }');
console.log('    ]');
console.log('  },');
console.log('  plugins: [new HtmlWebpackPlugin()]');
console.log('};');
console.log('');
console.log('Pros: Mature, powerful, huge ecosystem');
console.log('Cons: Slow, complex configuration');

console.log('\\n=== Vite Configuration ===');

console.log('\\n// vite.config.js');
console.log('export default {');
console.log('  plugins: [react()],');
console.log('  build: {');
console.log('    rollupOptions: {');
console.log('      output: { manualChunks: { vendor: ["react", "react-dom"] } }');
console.log('    }');
console.log('  }');
console.log('};');
console.log('');
console.log('Pros: Fast dev, simple config, modern');
console.log('Cons: Newer, smaller ecosystem');

console.log('\\n=== Performance Metrics ===');

const metrics = {
  'Webpack': { devStart: '10-30s', hmr: '100-500ms', build: '30-60s' },
  'Vite': { devStart: '< 1s', hmr: '< 50ms', build: '20-40s' },
  'Turbopack': { devStart: '< 2s', hmr: '< 50ms', build: '15-30s' }
};

Object.entries(metrics).forEach(([tool, perf]) => {
  console.log('\\n' + tool + ':');
  console.log('  Dev Start:', perf.devStart);
  console.log('  HMR:', perf.hmr);
  console.log('  Build:', perf.build);
});

console.log('\\n=== When to Use Each ===');

console.log('\\nWebpack:');
console.log('  • Legacy projects');
console.log('  • Need specific plugins');
console.log('  • Complex build requirements');

console.log('\\nVite:');
console.log('  • New projects');
console.log('  • Fast development priority');
console.log('  • Modern browser targets');

console.log('\\nTurbopack:');
console.log('  • Next.js 13+ projects');
console.log('  • Maximum speed needed');

console.log('\\n✓ Vite: best for new React projects');
console.log('✓ Webpack: still dominant in production');`
    },
    {
        id: 'react-build-2',
        category: 'Build & Deploy',
        difficulty: 'Hard',
        question: 'Code Splitting Strategies - Route vs Component Level',
        answer: `Essential for **performance** at scale.

### Route-Based Splitting:
Split by page/route - most common and effective.

**Benefits:**
- Users only load what they need
- Smaller initial bundle
- Better Core Web Vitals

### Component-Based Splitting:
Split heavy components (charts, editors, modals).

**When to Use:**
- Component > 50KB
- Not needed on initial render
- Used conditionally

### Techniques:
1. **React.lazy()** - Dynamic imports
2. **Suspense** - Loading states
3. **Prefetching** - Load on hover/idle
4. **Webpack magic comments** - Control chunks`,
        codeExample: `// Code Splitting Strategies
console.log('=== Route-Based Splitting ===');

console.log('// App.js');
console.log('import { lazy, Suspense } from "react";');
console.log('');
console.log('const Home = lazy(() => import("./pages/Home"));');
console.log('const Dashboard = lazy(() => import("./pages/Dashboard"));');
console.log('const Profile = lazy(() => import("./pages/Profile"));');
console.log('');
console.log('<Suspense fallback={<Loading />}>');
console.log('  <Routes>');
console.log('    <Route path="/" element={<Home />} />');
console.log('    <Route path="/dashboard" element={<Dashboard />} />');
console.log('    <Route path="/profile" element={<Profile />} />');
console.log('  </Routes>');
console.log('</Suspense>');
console.log('');
console.log('Result: 3 separate bundles, loaded on demand');

console.log('\\n=== Component-Based Splitting ===');

console.log('\\n// Heavy chart component');
console.log('const Chart = lazy(() => import("./Chart"));');
console.log('');
console.log('function Dashboard() {');
console.log('  const [showChart, setShowChart] = useState(false);');
console.log('  ');
console.log('  return (');
console.log('    <>');
console.log('      <button onClick={() => setShowChart(true)}>');
console.log('        Show Chart');
console.log('      </button>');
console.log('      {showChart && (');
console.log('        <Suspense fallback={<ChartSkeleton />}>');
console.log('          <Chart data={data} />');
console.log('        </Suspense>');
console.log('      )}');
console.log('    </>');
console.log('  );');
console.log('}');

console.log('\\n=== Prefetching on Hover ===');

console.log('\\nconst Dashboard = lazy(() => import("./Dashboard"));');
console.log('');
console.log('function Nav() {');
console.log('  const prefetchDashboard = () => {');
console.log('    // Prefetch on hover');
console.log('    import("./Dashboard");');
console.log('  };');
console.log('  ');
console.log('  return (');
console.log('    <Link');
console.log('      to="/dashboard"');
console.log('      onMouseEnter={prefetchDashboard}');
console.log('    >');
console.log('      Dashboard');
console.log('    </Link>');
console.log('  );');
console.log('}');

console.log('\\n=== Webpack Magic Comments ===');

console.log('\\nconst Chart = lazy(() =>');
console.log('  import(');
console.log('    /* webpackChunkName: "chart" */');
console.log('    /* webpackPrefetch: true */');
console.log('    "./Chart"');
console.log('  )');
console.log(');');
console.log('');
console.log('// Creates chart.bundle.js with prefetch hint');

console.log('\\n=== Bundle Size Impact ===');

console.log('\\nBefore splitting:');
console.log('  main.js: 850KB (everything)');

console.log('\\nAfter route splitting:');
console.log('  main.js: 200KB (core + home)');
console.log('  dashboard.js: 300KB (lazy)');
console.log('  profile.js: 150KB (lazy)');
console.log('  chart.js: 200KB (lazy)');
console.log('');
console.log('Initial load: 200KB vs 850KB (76% reduction!)');

console.log('\\n✓ Split by route first');
console.log('✓ Split heavy components (>50KB)');
console.log('✓ Prefetch on hover for better UX');`
    },
    {
        id: 'react-build-3',
        category: 'Build & Deploy',
        difficulty: 'Hard',
        question: 'Environment Variables and Build-Time vs Runtime Config',
        answer: `Critical for **multi-environment deployments**.

### Build-Time Variables:
Embedded in bundle during build.

**Pros:** Fast, type-safe
**Cons:** Need rebuild for changes

### Runtime Variables:
Loaded when app starts.

**Pros:** Change without rebuild
**Cons:** Slower, exposed to client

### Best Practices:
- Prefix client vars (REACT_APP_, VITE_, NEXT_PUBLIC_)
- Never commit secrets
- Use .env.local for local overrides
- Different .env per environment`,
        codeExample: `// Environment Variables
console.log('=== Build-Time Variables ===');

console.log('// .env.production');
console.log('VITE_API_URL=https://api.prod.com');
console.log('VITE_ANALYTICS_ID=UA-12345');
console.log('');
console.log('// In code:');
console.log('const apiUrl = import.meta.env.VITE_API_URL;');
console.log('console.log(apiUrl); // "https://api.prod.com"');
console.log('');
console.log('// Embedded at build time, cannot change');

console.log('\\n=== Runtime Configuration ===');

console.log('\\n// public/config.js');
console.log('window.APP_CONFIG = {');
console.log('  apiUrl: "https://api.prod.com",');
console.log('  features: { newUI: true }');
console.log('};');
console.log('');
console.log('// In code:');
console.log('const config = window.APP_CONFIG;');
console.log('console.log(config.apiUrl);');
console.log('');
console.log('// Can change without rebuild!');

console.log('\\n=== Environment Files ===');

console.log('\\n.env                 # Defaults');
console.log('.env.local           # Local overrides (gitignored)');
console.log('.env.development     # Dev environment');
console.log('.env.production      # Prod environment');
console.log('');
console.log('Priority: .env.local > .env.production > .env');

console.log('\\n=== Security Best Practices ===');

console.log('\\n✓ Safe (public):');
console.log('  VITE_API_URL=https://api.example.com');
console.log('  VITE_APP_VERSION=1.2.3');

console.log('\\n❌ Unsafe (secrets):');
console.log('  VITE_SECRET_KEY=abc123  # Exposed to client!');
console.log('  VITE_DB_PASSWORD=pass   # Never do this!');

console.log('\\nSecrets belong on SERVER, not client!');

console.log('\\n=== Multi-Environment Setup ===');

console.log('\\n// package.json');
console.log('{');
console.log('  "scripts": {');
console.log('    "dev": "vite",');
console.log('    "build:staging": "vite build --mode staging",');
console.log('    "build:prod": "vite build --mode production"');
console.log('  }');
console.log('}');

console.log('\\n// .env.staging');
console.log('VITE_API_URL=https://api.staging.com');

console.log('\\n// .env.production');
console.log('VITE_API_URL=https://api.prod.com');

console.log('\\n✓ Use build-time for most config');
console.log('✓ Use runtime for feature flags');
console.log('✓ Never commit secrets to repo');`
    },
    {
        id: 'react-build-4',
        category: 'Build & Deploy',
        difficulty: 'Expert',
        question: 'CI/CD for React - Automated Testing and Deployment',
        answer: `Production requirement at **all companies**.

### CI/CD Pipeline Stages:
1. **Lint & Type Check** - ESLint, TypeScript
2. **Unit Tests** - Jest, Vitest
3. **Build** - Production bundle
4. **E2E Tests** - Playwright, Cypress
5. **Deploy** - Vercel, Netlify, AWS

### Best Practices:
- Run tests in parallel
- Cache dependencies
- Preview deployments for PRs
- Automated rollbacks
- Performance budgets

### Tools:
- GitHub Actions
- GitLab CI
- CircleCI
- Jenkins`,
        codeExample: `// CI/CD Pipeline
console.log('=== GitHub Actions Workflow ===');

console.log('# .github/workflows/ci.yml');
console.log('name: CI/CD');
console.log('');
console.log('on: [push, pull_request]');
console.log('');
console.log('jobs:');
console.log('  test:');
console.log('    runs-on: ubuntu-latest');
console.log('    steps:');
console.log('      - uses: actions/checkout@v3');
console.log('      ');
console.log('      - name: Setup Node');
console.log('        uses: actions/setup-node@v3');
console.log('        with:');
console.log('          node-version: 18');
console.log('          cache: "npm"');
console.log('      ');
console.log('      - name: Install');
console.log('        run: npm ci');
console.log('      ');
console.log('      - name: Lint');
console.log('        run: npm run lint');
console.log('      ');
console.log('      - name: Type Check');
console.log('        run: npm run type-check');
console.log('      ');
console.log('      - name: Test');
console.log('        run: npm test -- --coverage');
console.log('      ');
console.log('      - name: Build');
console.log('        run: npm run build');

console.log('\\n=== Deployment Stage ===');

console.log('\\n  deploy:');
console.log('    needs: test');
console.log('    if: github.ref == \\'refs/heads/main\\'');
console.log('    runs-on: ubuntu-latest');
console.log('    steps:');
console.log('      - uses: actions/checkout@v3');
console.log('      ');
console.log('      - name: Deploy to Vercel');
console.log('        run: vercel --prod');
console.log('        env:');
console.log('          VERCEL_TOKEN: secrets.VERCEL_TOKEN');

console.log('\\n=== Performance Budget ===');

console.log('\\n// package.json');
console.log('{');
console.log('  "bundlesize": [');
console.log('    {');
console.log('      "path": "./dist/main.*.js",');
console.log('      "maxSize": "200 KB"');
console.log('    }');
console.log('  ]');
console.log('}');
console.log('');
console.log('// Fails build if bundle > 200KB');

console.log('\\n=== Preview Deployments ===');

console.log('\\nPull Request #123:');
console.log('  ✓ Tests passed');
console.log('  ✓ Build successful');
console.log('  🚀 Preview: https://pr-123.preview.app');
console.log('');
console.log('Automatic preview for every PR!');

console.log('\\n=== Caching Strategy ===');

console.log('\\n- name: Cache node_modules');
console.log('  uses: actions/cache@v3');
console.log('  with:');
console.log('    path: node_modules');
console.log('    key: runner.os-node-hashFiles');
console.log('');
console.log('Speeds up builds by 2-3x');

console.log('\\n=== Automated Rollback ===');

console.log('\\nif: failure()');
console.log('  - name: Rollback');
console.log('    run: vercel rollback');
console.log('');
console.log('Auto-rollback on deployment failure');

console.log('\\n✓ Automate: lint, test, build, deploy');
console.log('✓ Preview deployments for PRs');
console.log('✓ Performance budgets prevent bloat');`
    }
];
