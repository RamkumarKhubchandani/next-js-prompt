export const day36 = {
  day: 36,
  title: "Accessibility (a11y) Best Practices",
  intro: "Build inclusive Angular apps. Implement ARIA, keyboard navigation, and screen reader support.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">♿ Accessibility</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Accessibility ensures everyone can use your app. It's not optional—it's essential.
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-blue-500">
<pre class="text-gray-800 dark:text-gray-100">
// Semantic HTML
<button (click)="submit()">Submit</button> // ✅
<div (click)="submit()">Submit</div> // ❌

// ARIA labels
<button aria-label="Close dialog" (click)="close()">
  <span aria-hidden="true">×</span>
</button>

// Keyboard navigation
<div tabindex="0" (keydown.enter)="select()" (keydown.space)="select()">
  Selectable item
</div>
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ a11y Checklist</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-8">
  <li>✅ Use semantic HTML (button, nav, main, etc.)</li>
  <li>✅ Provide alt text for images</li>
  <li>✅ Ensure keyboard navigation works</li>
  <li>✅ Maintain focus management</li>
  <li>✅ Use ARIA when semantic HTML isn't enough</li>
  <li>✅ Test with screen readers</li>
</ul>
`,
  code: `// Focus management
import { ElementRef, ViewChild } from '@angular/core';

export class DialogComponent {
  @ViewChild('closeButton') closeButton!: ElementRef;
  
  ngAfterViewInit() {
    // Focus close button when dialog opens
    this.closeButton.nativeElement.focus();
  }
}`,
  comparison: {
    junior: `// ❌ Div button (not accessible)
<div (click)="submit()">Submit</div>`,
    senior: `// ✅ Real button (keyboard + screen reader)
<button (click)="submit()">Submit</button>`
  },
  interview: {
    questions: [
      {
        q: "What is ARIA and when should you use it?",
        a: "ARIA (Accessible Rich Internet Applications) adds accessibility info to HTML. Use it when semantic HTML isn't enough, but prefer semantic HTML first."
      }
    ]
  }
};

export const day37 = {
  day: 37,
  title: "Build Optimization & Bundle Analysis",
  intro: "Optimize your Angular build for production. Analyze bundles, reduce size, and improve load times.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📦 Build Optimization</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Production builds should be small, fast, and optimized. Angular CLI does most of this automatically.
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-green-500">
<pre class="text-gray-800 dark:text-gray-100">
// Production build
ng build --configuration=production

// Analyze bundle size
ng build --stats-json
npx webpack-bundle-analyzer dist/stats.json

// Key optimizations (automatic in prod):
// - Minification
// - Tree-shaking
// - Dead code elimination
// - AOT compilation
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Optimization Techniques</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-8">
  <li><strong class="text-brand-primary">Lazy Loading:</strong> Split code by routes</li>
  <li><strong class="text-brand-primary">Tree-Shaking:</strong> Remove unused code</li>
  <li><strong class="text-brand-primary">Code Splitting:</strong> Separate vendor bundles</li>
  <li><strong class="text-brand-primary">Compression:</strong> Enable gzip/brotli</li>
</ul>
`,
  code: `// Budget configuration (angular.json)
{
  "budgets": [{
    "type": "initial",
    "maximumWarning": "500kb",
    "maximumError": "1mb"
  }]
}`,
  comparison: {
    junior: `// ❌ Import entire library
import * as _ from 'lodash';`,
    senior: `// ✅ Import only what you need
import { debounce } from 'lodash-es';`
  },
  interview: {
    questions: [
      {
        q: "What is tree-shaking?",
        a: "Removing unused code from the final bundle. Works with ES modules. Import only what you use for best results."
      }
    ]
  }
};

export const day38 = {
  day: 38,
  title: "Bundle Analysis & Performance Monitoring",
  intro: "Measure and improve performance. Use Chrome DevTools, Lighthouse, and bundle analyzers.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📊 Performance Monitoring</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
You can't improve what you don't measure. Use tools to identify bottlenecks.
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-purple-500">
<pre class="text-gray-800 dark:text-gray-100">
// Performance API
const start = performance.now();
// ... expensive operation
const end = performance.now();
console.log(\`Took \${end - start}ms\`);

// Core Web Vitals
// - LCP (Largest Contentful Paint): < 2.5s
// - FID (First Input Delay): < 100ms
// - CLS (Cumulative Layout Shift): < 0.1
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Performance Tools</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-8">
  <li><strong class="text-brand-primary">Lighthouse:</strong> Overall performance score</li>
  <li><strong class="text-brand-primary">Chrome DevTools:</strong> Profiling and debugging</li>
  <li><strong class="text-brand-primary">webpack-bundle-analyzer:</strong> Bundle visualization</li>
  <li><strong class="text-brand-primary">source-map-explorer:</strong> Code size analysis</li>
</ul>
`,
  code: `// Performance monitoring service
@Injectable({ providedIn: 'root' })
export class PerformanceService {
  measureTime(label: string, fn: () => void) {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(\`[\${label}] \${(end - start).toFixed(2)}ms\`);
  }
}`,
  comparison: {
    junior: `// ❌ No performance monitoring`,
    senior: `// ✅ Track key metrics
this.perf.measureTime('data-load', () => this.loadData());`
  },
  interview: {
    questions: [
      {
        q: "What are Core Web Vitals?",
        a: "Google's metrics for user experience: LCP (loading), FID (interactivity), CLS (visual stability). Important for SEO and UX."
      }
    ]
  }
};

export const day39 = {
  day: 39,
  title: "Micro-Frontends with Module Federation",
  intro: "Build scalable apps with micro-frontends. Share code, deploy independently, and scale teams.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🧩 Micro-Frontends</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Micro-frontends split your app into independently deployable pieces. Great for large teams.
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-blue-500">
<pre class="text-gray-800 dark:text-gray-100">
// Module Federation (webpack.config.js)
new ModuleFederationPlugin({
  name: 'shell',
  remotes: {
    dashboard: 'dashboard@http://localhost:4201/remoteEntry.js',
    profile: 'profile@http://localhost:4202/remoteEntry.js'
  },
  shared: {
    '@angular/core': { singleton: true },
    '@angular/common': { singleton: true }
  }
})
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Benefits & Challenges</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-8">
  <li>✅ Independent deployment</li>
  <li>✅ Team autonomy</li>
  <li>✅ Technology flexibility</li>
  <li>❌ Complexity overhead</li>
  <li>❌ Shared state management</li>
</ul>
`,
  code: `// Load remote module
const routes: Routes = [{
  path: 'dashboard',
  loadChildren: () => import('dashboard/Module')
    .then(m => m.DashboardModule)
}];`,
  comparison: {
    junior: `// ❌ Monolith (one big app)`,
    senior: `// ✅ Micro-frontends (independent apps)`
  },
  interview: {
    questions: [
      {
        q: "When should you use micro-frontends?",
        a: "Large apps with multiple teams, need for independent deployment, or mixing technologies. Overkill for small apps."
      }
    ]
  }
};

export const day40 = {
  day: 40,
  title: "Monorepo with Nx",
  intro: "Manage multiple apps and libraries in one repo. Use Nx for powerful tooling and code sharing.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📚 Monorepo</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Monorepos keep related projects together. Nx makes it easy to manage Angular monorepos.
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-green-500">
<pre class="text-gray-800 dark:text-gray-100">
// Create Nx workspace
npx create-nx-workspace@latest

// Generate app
nx g @nx/angular:app my-app

// Generate library
nx g @nx/angular:lib shared-ui

// Run app
nx serve my-app

// Build with affected
nx affected:build
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Nx Benefits</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-8">
  <li><strong class="text-brand-primary">Code Sharing:</strong> Shared libraries</li>
  <li><strong class="text-brand-primary">Affected Commands:</strong> Only build what changed</li>
  <li><strong class="text-brand-primary">Dependency Graph:</strong> Visualize dependencies</li>
  <li><strong class="text-brand-primary">Caching:</strong> Fast rebuilds</li>
</ul>
`,
  code: `// Import shared library
import { ButtonComponent } from '@myorg/shared-ui';

@Component({
  imports: [ButtonComponent]
})
export class MyComponent {}`,
  comparison: {
    junior: `// ❌ Copy-paste code between apps`,
    senior: `// ✅ Shared library in monorepo`
  },
  interview: {
    questions: [
      {
        q: "Monorepo vs Polyrepo?",
        a: "Monorepo: All projects in one repo (easier sharing, atomic changes). Polyrepo: Separate repos (more isolation, harder to share)."
      }
    ]
  }
};

export const day41 = {
  day: 41,
  title: "Enterprise Patterns & Architecture",
  intro: "Build scalable enterprise apps. Learn layered architecture, feature modules, and design patterns.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🏢 Enterprise Architecture</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Enterprise apps need solid architecture. Organize by features, use layers, and follow SOLID principles.
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-purple-500">
<pre class="text-gray-800 dark:text-gray-100">
// Feature-based structure
src/
  app/
    features/
      user-management/
        components/
        services/
        models/
        user-management.routes.ts
      product-catalog/
        ...
    core/
      auth/
      http/
      guards/
    shared/
      components/
      directives/
      pipes/
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Architecture Layers</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-8">
  <li><strong class="text-brand-primary">Presentation:</strong> Components, templates</li>
  <li><strong class="text-brand-primary">Business Logic:</strong> Services, state management</li>
  <li><strong class="text-brand-primary">Data Access:</strong> HTTP, repositories</li>
  <li><strong class="text-brand-primary">Core:</strong> Auth, interceptors, guards</li>
</ul>
`,
  code: `// Repository pattern
@Injectable({ providedIn: 'root' })
export class UserRepository {
  constructor(private http: HttpClient) {}
  
  findAll(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }
  
  findById(id: string): Observable<User> {
    return this.http.get<User>(\`/api/users/\${id}\`);
  }
  
  save(user: User): Observable<User> {
    return user.id 
      ? this.http.put<User>(\`/api/users/\${user.id}\`, user)
      : this.http.post<User>('/api/users', user);
  }
}`,
  comparison: {
    junior: `// ❌ HTTP calls in components
this.http.get('/api/users').subscribe(...)`,
    senior: `// ✅ Repository pattern
this.userRepo.findAll().subscribe(...)`
  },
  interview: {
    questions: [
      {
        q: "What is the Repository pattern?",
        a: "Abstracts data access logic. Components don't know if data comes from HTTP, localStorage, or IndexedDB. Makes testing easier."
      }
    ]
  }
};

export const day42 = {
  day: 42,
  title: "Interview Mastery & Real-World Projects",
  intro: "Master Angular interviews. Review key concepts, common questions, and build a portfolio project.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 Interview Preparation</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
You've learned Angular. Now ace the interview. Review concepts, practice coding, and build projects.
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-green-500">
<pre class="text-gray-800 dark:text-gray-100">
// Top Interview Topics:
1. Signals vs RxJS
2. Change Detection (Default vs OnPush)
3. Standalone Components
4. Dependency Injection
5. Lazy Loading & Performance
6. Forms (Reactive vs Template-Driven)
7. RxJS Operators (switchMap, combineLatest)
8. Guards & Interceptors
9. SSR & Hydration
10. Testing Strategies
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Portfolio Project Ideas</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-8">
  <li><strong class="text-brand-primary">E-commerce:</strong> Product catalog, cart, checkout</li>
  <li><strong class="text-brand-primary">Social Media:</strong> Posts, comments, real-time updates</li>
  <li><strong class="text-brand-primary">Dashboard:</strong> Charts, tables, filters</li>
  <li><strong class="text-brand-primary">Task Manager:</strong> Drag-drop, state management</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎓 Next Steps</h3>
<div class="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl mb-8">
  <p class="text-gray-700 dark:text-gray-300 mb-4">
    Congratulations on completing the Angular course! You've mastered:
  </p>
  <ul class="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
    <li>Modern Angular (Signals, Standalone, Control Flow)</li>
    <li>State Management & Performance</li>
    <li>HTTP, RxJS, Forms, Routing</li>
    <li>Testing, Security, i18n, a11y</li>
    <li>SSR, PWA, Enterprise Patterns</li>
  </ul>
</div>
`,
  code: `// Example interview question
/*
Q: Implement a search component with debouncing

Requirements:
- Input field
- Debounce 300ms
- Cancel previous requests
- Display results
*/

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: \`
    <input [formControl]="searchControl" />
    <div *ngFor="let result of results">{{ result }}</div>
  \`
})
export class SearchComponent {
  searchControl = new FormControl('');
  results: string[] = [];
  
  constructor(private http: HttpClient) {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.http.get<string[]>(\`/api/search?q=\${term}\`))
    ).subscribe(results => {
      this.results = results;
    });
  }
}`,
  comparison: {
    junior: `// ❌ Basic knowledge
"I know Angular basics"`,
    senior: `// ✅ Deep understanding + projects
"I built an e-commerce app with SSR, state management, and 95+ Lighthouse score"`
  },
  interview: {
    questions: [
      {
        q: "Explain the difference between Signals and RxJS Observables.",
        a: "Signals: Synchronous, reactive primitives for state. RxJS: Asynchronous streams for events/data over time. Use Signals for state, RxJS for async operations."
      },
      {
        q: "How would you optimize a slow Angular app?",
        a: "1) OnPush change detection 2) Lazy loading 3) Track by in loops 4) Virtual scrolling 5) Bundle analysis 6) Preloading strategies 7) SSR/Prerendering"
      },
      {
        q: "What's your approach to testing Angular apps?",
        a: "Unit tests for services/pipes (70%), component tests for behavior (20%), E2E for critical paths (10%). Use TestBed, mock dependencies, test user behavior not implementation."
      }
    ]
  }
};
