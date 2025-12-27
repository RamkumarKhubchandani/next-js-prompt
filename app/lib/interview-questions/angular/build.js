export const buildQuestions = [
    {
        id: 'angular-build-1',
        category: 'Build & Deploy',
        difficulty: 'Medium',
        question: 'Angular CLI - Build Configurations and Environments',
        answer: `**Angular CLI** provides build and development tools.

### Commands:
- \`ng build\` - Production build
- \`ng serve\` - Development server
- \`ng test\` - Run tests

### Configurations:
- Development
- Production
- Custom environments`,
        codeExample: `// Build Configurations
console.log('=== Production Build ===');
console.log('ng build --configuration production');
console.log('// Optimized, minified bundle');

console.log('\\n=== Development Build ===');
console.log('ng build');
console.log('// Source maps, no optimization');

console.log('\\n=== Custom Configuration ===');
console.log('// angular.json');
console.log('"configurations": {');
console.log('  "staging": {');
console.log('    "fileReplacements": [{');
console.log('      "replace": "src/environments/environment.ts",');
console.log('      "with": "src/environments/environment.staging.ts"');
console.log('    }]');
console.log('  }');
console.log('}');

console.log('\\n✓ Angular CLI: Build & development tools');`
    },
    {
        id: 'angular-build-2',
        category: 'Build & Deploy',
        difficulty: 'Hard',
        question: 'Bundle Analysis and Optimization',
        answer: `**Bundle analysis** identifies optimization opportunities.

### Tools:
- webpack-bundle-analyzer
- source-map-explorer

### Optimization Techniques:
- Lazy loading
- Tree shaking
- Code splitting`,
        codeExample: `// Bundle Analysis
console.log('=== Analyze Bundle ===');
console.log('ng build --stats-json');
console.log('npx webpack-bundle-analyzer dist/stats.json');

console.log('\\n=== Optimization Checklist ===');
console.log('✓ Lazy load routes');
console.log('✓ Use OnPush change detection');
console.log('✓ Remove unused dependencies');
console.log('✓ Optimize images');
console.log('✓ Enable production mode');

console.log('\\n=== Production Optimizations ===');
console.log('ng build --configuration production');
console.log('// Enables:');
console.log('// - AOT compilation');
console.log('// - Minification');
console.log('// - Tree shaking');
console.log('// - Dead code elimination');

console.log('\\n✓ Bundle analysis: Find optimization opportunities');`
    },
    {
        id: 'angular-build-3',
        category: 'Build & Deploy',
        difficulty: 'Medium',
        question: 'Deployment Strategies - Static Hosting and Docker',
        answer: `**Deployment** strategies for Angular apps.

### Options:
- Static hosting (Netlify, Vercel)
- Docker containers
- Cloud platforms (AWS, Azure)

### Best Practice:
Use CDN for static assets`,
        codeExample: `// Deployment
console.log('=== Static Hosting ===');
console.log('ng build --configuration production');
console.log('// Deploy dist/ folder to:');
console.log('// - Netlify');
console.log('// - Vercel');
console.log('// - Firebase Hosting');

console.log('\\n=== Docker ===');
console.log('# Dockerfile');
console.log('FROM node:18 AS build');
console.log('WORKDIR /app');
console.log('COPY . .');
console.log('RUN npm ci && npm run build');
console.log('');
console.log('FROM nginx:alpine');
console.log('COPY --from=build /app/dist /usr/share/nginx/html');

console.log('\\n=== nginx.conf for SPA ===');
console.log('location / {');
console.log('  try_files $uri $uri/ /index.html;');
console.log('}');

console.log('\\n✓ Deploy to static hosting or containers');`
    },
    {
        id: 'angular-build-4',
        category: 'Build & Deploy',
        difficulty: 'Expert',
        question: 'Build Performance - esbuild and Incremental Builds',
        answer: `**Build performance** optimization techniques.

### esbuild (Angular 17+):
- Faster builds
- Better dev experience
- Enabled by default

### Incremental Builds:
- Only rebuild changed files
- Faster development`,
        codeExample: `// Build Performance
console.log('=== esbuild (Default in Angular 17+) ===');
console.log('// angular.json');
console.log('"builder": "@angular-devkit/build-angular:application"');
console.log('// Uses esbuild automatically');

console.log('\\n=== Performance Comparison ===');
console.log('Webpack (old):');
console.log('  Initial build: 30s');
console.log('  Rebuild: 5s');
console.log('');
console.log('esbuild (new):');
console.log('  Initial build: 5s');
console.log('  Rebuild: <1s');

console.log('\\n=== Optimization Tips ===');
console.log('✓ Use esbuild builder');
console.log('✓ Enable incremental builds');
console.log('✓ Reduce dependencies');
console.log('✓ Use build cache');

console.log('\\n✓ esbuild: 5-10x faster builds');`
    }
];
