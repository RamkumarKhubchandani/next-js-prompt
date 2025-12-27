export const performanceQuestions = [
    {
        id: 'angular-perf-1',
        category: 'Performance',
        difficulty: 'Hard',
        question: 'Bundle Optimization - Code Splitting and Tree Shaking',
        answer: `**Bundle optimization** reduces application size.

### Techniques:
- **Lazy loading** - Load on demand
- **Tree shaking** - Remove unused code
- **Code splitting** - Separate bundles

### Tools:
- webpack-bundle-analyzer
- source-map-explorer`,
        codeExample: `// Bundle Optimization
console.log('=== Lazy Loading ===');
console.log('const routes = [');
console.log('  {');
console.log('    path: "admin",');
console.log('    loadComponent: () => import("./admin")');
console.log('  }');
console.log('];');
console.log('// Creates separate bundle for admin');

console.log('\\n=== Tree Shaking ===');
console.log('// Use named imports');
console.log('import { map, filter } from "rxjs/operators"; // ✓');
console.log('import * as operators from "rxjs/operators"; // ✗');

console.log('\\n✓ Lazy loading: Smaller initial bundle');
console.log('✓ Tree shaking: Remove unused code');`
    },
    {
        id: 'angular-perf-2',
        category: 'Performance',
        difficulty: 'Medium',
        question: 'Virtual Scrolling - CDK ScrollingModule',
        answer: `**Virtual scrolling** renders only visible items.

### Benefits:
- Better performance for large lists
- Lower memory usage
- Smooth scrolling

### Implementation:
Use CDK ScrollingModule`,
        codeExample: `// Virtual Scrolling
console.log('=== Setup ===');
console.log('import { ScrollingModule } from "@angular/cdk/scrolling";');

console.log('\\n=== Template ===');
console.log('<cdk-virtual-scroll-viewport itemSize="50" class="viewport">');
console.log('  @for (item of items; track item.id) {');
console.log('    <div class="item">{{ item.name }}</div>');
console.log('  }');
console.log('</cdk-virtual-scroll-viewport>');

console.log('\\n=== Performance ===');
console.log('Without virtual scrolling:');
console.log('  10,000 items = 10,000 DOM nodes');
console.log('');
console.log('With virtual scrolling:');
console.log('  10,000 items = ~20 DOM nodes (visible only)');

console.log('\\n✓ Virtual scrolling: Render only visible');`
    },
    {
        id: 'angular-perf-3',
        category: 'Performance',
        difficulty: 'Hard',
        question: 'TrackBy Functions - Optimize *ngFor Performance',
        answer: `**TrackBy** optimizes list rendering.

### Problem:
Without trackBy, Angular re-renders entire list on change.

### Solution:
Use trackBy to identify items by unique property.

### Best Practice:
Always use trackBy for lists`,
        codeExample: `// TrackBy Functions
console.log('=== Without TrackBy (Bad) ===');
console.log('@for (user of users; track user) {');
console.log('  <div>{{ user.name }}</div>');
console.log('}');
console.log('// Re-renders all items on any change');

console.log('\\n=== With TrackBy (Good) ===');
console.log('@for (user of users; track user.id) {');
console.log('  <div>{{ user.name }}</div>');
console.log('}');
console.log('// Only re-renders changed items');

console.log('\\n=== Performance Impact ===');
console.log('1000 items, update 1:');
console.log('  Without trackBy: 1000 DOM updates');
console.log('  With trackBy: 1 DOM update');

console.log('\\n✓ TrackBy: Essential for lists');`
    },
    {
        id: 'angular-perf-4',
        category: 'Performance',
        difficulty: 'Expert',
        question: 'Web Vitals - Measuring Core Performance Metrics',
        answer: `**Web Vitals** measure user experience.

### Core Metrics:
- **LCP** - Largest Contentful Paint (< 2.5s)
- **FID** - First Input Delay (< 100ms)
- **CLS** - Cumulative Layout Shift (< 0.1)

### Tools:
- Lighthouse
- web-vitals library
- Chrome DevTools`,
        codeExample: `// Web Vitals
console.log('=== Measuring Web Vitals ===');
console.log('import { onLCP, onFID, onCLS } from "web-vitals";');
console.log('');
console.log('onLCP(console.log); // Largest Contentful Paint');
console.log('onFID(console.log); // First Input Delay');
console.log('onCLS(console.log); // Cumulative Layout Shift');

console.log('\\n=== Target Metrics ===');
console.log('LCP: < 2.5s (Good)');
console.log('FID: < 100ms (Good)');
console.log('CLS: < 0.1 (Good)');

console.log('\\n=== Optimization Tips ===');
console.log('LCP: Optimize images, lazy load');
console.log('FID: Reduce JavaScript, use OnPush');
console.log('CLS: Set image dimensions, avoid layout shifts');

console.log('\\n✓ Web Vitals: Measure user experience');`
    },
    {
        id: 'angular-perf-5',
        category: 'Performance',
        difficulty: 'Medium',
        question: 'Image Optimization - NgOptimizedImage Directive',
        answer: `**NgOptimizedImage** optimizes image loading.

### Features:
- Lazy loading
- Responsive images
- Priority hints
- Automatic srcset

### Benefits:
- Better LCP
- Smaller bundles
- Better UX`,
        codeExample: `// NgOptimizedImage
console.log('=== Basic Usage ===');
console.log('<img ngSrc="hero.jpg" width="400" height="300" priority>');

console.log('\\n=== Features ===');
console.log('// Lazy loading (default)');
console.log('<img ngSrc="image.jpg" width="400" height="300">');
console.log('');
console.log('// Priority (above fold)');
console.log('<img ngSrc="hero.jpg" width="400" height="300" priority>');
console.log('');
console.log('// Responsive');
console.log('<img ngSrc="image.jpg" width="400" height="300" sizes="100vw">');

console.log('\\n=== Benefits ===');
console.log('✓ Automatic lazy loading');
console.log('✓ Better LCP scores');
console.log('✓ Responsive images');

console.log('\\n✓ NgOptimizedImage: Better image performance');`
    },
    {
        id: 'angular-perf-6',
        category: 'Performance',
        difficulty: 'Hard',
        question: 'Performance Profiling - Angular DevTools and Chrome DevTools',
        answer: `**Performance profiling** identifies bottlenecks.

### Tools:
- **Angular DevTools** - Component profiling
- **Chrome DevTools** - Performance tab
- **Lighthouse** - Overall metrics

### Metrics to Track:
- Change detection cycles
- Component render time
- Bundle size`,
        codeExample: `// Performance Profiling
console.log('=== Angular DevTools ===');
console.log('1. Install Angular DevTools extension');
console.log('2. Open DevTools > Angular tab');
console.log('3. Click "Profiler"');
console.log('4. Record interaction');
console.log('5. Analyze change detection cycles');

console.log('\\n=== Chrome DevTools ===');
console.log('1. Open DevTools > Performance tab');
console.log('2. Click Record');
console.log('3. Interact with app');
console.log('4. Stop recording');
console.log('5. Analyze flame graph');

console.log('\\n=== Common Issues ===');
console.log('• Too many change detection cycles');
console.log('• Large components without OnPush');
console.log('• Expensive computations in templates');
console.log('• Missing trackBy in lists');

console.log('\\n✓ Profile to find bottlenecks');
console.log('✓ Use Angular DevTools for CD analysis');`
    }
];
