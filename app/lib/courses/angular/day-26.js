export const day26 = {
  day: 26,
  title: "SSR (Server-Side Rendering) Fundamentals",
  intro: "A blank white screen on load is unacceptable in 2025. Today, we enable <strong>Server-Side Rendering (SSR)</strong> to deliver HTML instantly to your users.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 26. Single Page Apps (SPAs) have a flaw: they download an empty HTML file. SEO bots hate this."
      },
      {
        type: "talk",
        message: "SSR runs your Angular app on the Server (Node.js) to generate the full HTML string before sending it to the browser."
      },
      {
        type: "challenge",
        instruction: "This code accesses `window` directly, which crashes the server. Wrap it in a platform check.",
        buggyCode: `// ❌ Crashes on Server (Node.js has no window)
constructor() {
  this.width = window.innerWidth;
}`,
        solutionCode: `// ✅ Safe Platform Check
constructor(@Inject(PLATFORM_ID) private pid: object) {
  if (isPlatformBrowser(this.pid)) {
    this.width = window.innerWidth;
  }
}`,
        verifyOutput: "isPlatformBrowser",
        successMessage: "Safe! Now your app won't crash when the server tries to render it.",
        hint: "Inject `PLATFORM_ID` and use `isPlatformBrowser`."
      }
    ]
  },
  content: `
<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🌐 1. What is SSR?</h3>
<p class="mb-4 text-gray-600 dark:text-light-300 leading-relaxed">
By default (CSR), your browser downloads an empty <code>index.html</code> and waits for JS to execute.
With SSR, the <strong>Server</strong> executes the JS and sends a fully populated HTML page.
</p>

<div class="bg-gray-100 dark:bg-dark-800 p-6 rounded-xl border-l-4 border-purple-500 mb-10">
<p class="text-xs font-bold text-purple-500 uppercase mb-2">Command</p>
<code class="text-lg font-mono text-gray-800 dark:text-gray-200">ng add @angular/ssr</code>
</div>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">⚡ 2. The Browser Check</h3>
<p class="mb-4 text-gray-600 dark:text-light-300 leading-relaxed">
Your code now runs on the Server (Node.js) AND the Browser.
<code>window</code>, <code>document</code>, and <code>localStorage</code> do NOT exist on the server. Accessing them will crash your app.
</p>

<div class="grid md:grid-cols-2 gap-6 mb-10">
    <div class="bg-red-50 dark:bg-red-900/10 p-5 rounded-xl border border-red-200 dark:border-red-900/30">
        <h4 class="font-bold text-red-800 dark:text-red-300 mb-3">Crash 💥</h4>
        <pre class="text-xs font-mono text-gray-600 dark:text-gray-400">
constructor() {
  localStorage.setItem('x', 'y');
  // Error: localStorage is not defined
}
        </pre>
    </div>
    <div class="bg-green-50 dark:bg-green-900/10 p-5 rounded-xl border border-green-200 dark:border-green-900/30">
        <h4 class="font-bold text-green-800 dark:text-green-300 mb-3">Safe ✅</h4>
        <pre class="text-xs font-mono text-gray-600 dark:text-gray-400">
if (isPlatformBrowser(this.platformId)) {
   localStorage.setItem('x', 'y');
}
        </pre>
    </div>
</div>
`,
  code: `// Check if running in browser or server
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';

export class MyComponent {
  platformId = inject(PLATFORM_ID);
  
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Browser-only code (e.g., localStorage, window)
      console.log('Running in browser');
    }
  }
}`,
  comparison: {
    junior: `// ❌ Assumes browser
localStorage.getItem('token'); // Breaks SSR!`,
    senior: `// ✅ Platform-aware
if (isPlatformBrowser(this.platformId)) {
  localStorage.getItem('token');
}`
  },
  interview: {
    questions: [
      {
        q: "What's the difference between SSR and CSR?",
        a: "SSR renders on server (HTML sent to browser). CSR renders in browser (JavaScript builds DOM). SSR is better for SEO and initial load."
      }
    ]
  }
};

export const day27 = {
  day: 27,
  title: "Hydration & Performance Optimization",
  intro: "Optimize SSR apps with hydration strategies. Avoid flickering and improve perceived performance.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">💧 Hydration</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Hydration is the process of attaching event listeners and making the server-rendered app interactive.
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-blue-500">
<pre class="text-gray-800 dark:text-gray-100">
// Enable hydration in Angular 18+
export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration()
  ]
};
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Hydration Strategies</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-8">
  <li><strong class="text-brand-primary">Full Hydration:</strong> Hydrate entire app at once</li>
  <li><strong class="text-brand-primary">Progressive Hydration:</strong> Hydrate components as needed</li>
  <li><strong class="text-brand-primary">Partial Hydration:</strong> Only hydrate interactive parts</li>
</ul>
`,
  code: `// Hydration example
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig = {
  providers: [
    provideClientHydration()
  ]
};`,
  comparison: {
    junior: `// ❌ No hydration (re-renders everything)
// Flicker, wasted work`,
    senior: `// ✅ With hydration (reuses server HTML)
provideClientHydration()`
  },
  interview: {
    questions: [
      {
        q: "What is hydration mismatch?",
        a: "When server-rendered HTML doesn't match client-rendered HTML. Causes re-render and console warnings. Fix by ensuring consistent rendering."
      }
    ]
  }
};

export const day28 = {
  day: 28,
  title: "Prerendering & Static Site Generation",
  intro: "Generate static HTML at build time for blazing-fast page loads and perfect SEO.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📄 Prerendering</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Prerendering generates static HTML files at build time. Perfect for content-heavy sites.
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-green-500">
<pre class="text-gray-800 dark:text-gray-100">
// angular.json
{
  "prerender": {
    "routes": [
      "/",
      "/about",
      "/blog/post-1",
      "/blog/post-2"
    ]
  }
}
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ When to Use</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-8">
  <li>✅ Marketing pages, blogs, documentation</li>
  <li>✅ Content that doesn't change often</li>
  <li>❌ User-specific content (dashboards)</li>
  <li>❌ Real-time data</li>
</ul>
`,
  code: `// Prerender configuration
export default {
  prerender: {
    routes: ['/', '/about', '/contact']
  }
};`,
  comparison: {
    junior: `// ❌ SSR for static content (wasted server resources)`,
    senior: `// ✅ Prerender static pages (instant load)`
  },
  interview: {
    questions: [
      {
        q: "Prerendering vs SSR?",
        a: "Prerendering: HTML generated at build time. SSR: HTML generated per request. Prerendering is faster but can't handle dynamic content."
      }
    ]
  }
};

export const day29 = {
  day: 29,
  title: "Angular Universal Deep Dive",
  intro: "Master Angular Universal for production SSR apps. Handle transfer state, caching, and edge cases.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🚀 Angular Universal</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Angular Universal is the official SSR solution. Handles server rendering, transfer state, and more.
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-purple-500">
<pre class="text-gray-800 dark:text-gray-100">
// Transfer state (avoid duplicate HTTP calls)
import { TransferState, makeStateKey } from '@angular/platform-browser';

const DATA_KEY = makeStateKey<any>('data');

// Server: Store data
this.transferState.set(DATA_KEY, data);

// Browser: Retrieve data
const cachedData = this.transferState.get(DATA_KEY, null);
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Production Considerations</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-8">
  <li><strong class="text-brand-primary">Caching:</strong> Cache rendered pages</li>
  <li><strong class="text-brand-primary">Error Handling:</strong> Graceful fallbacks</li>
  <li><strong class="text-brand-primary">Performance:</strong> Monitor server load</li>
</ul>
`,
  code: `// Transfer state example
import { TransferState, makeStateKey } from '@angular/platform-browser';

const USERS_KEY = makeStateKey('users');

export class UserService {
  transferState = inject(TransferState);
  
  getUsers() {
    const cached = this.transferState.get(USERS_KEY, null);
    if (cached) return of(cached);
    
    return this.http.get('/api/users').pipe(
      tap(users => this.transferState.set(USERS_KEY, users))
    );
  }
}`,
  comparison: {
    junior: `// ❌ Duplicate HTTP calls (server + browser)`,
    senior: `// ✅ Transfer state (single HTTP call)`
  },
  interview: {
    questions: [
      {
        q: "What is transfer state?",
        a: "Mechanism to pass data from server to browser, avoiding duplicate HTTP calls during hydration."
      }
    ]
  }
};

export const day30 = {
  day: 30,
  title: "PWA (Progressive Web Apps)",
  intro: "Transform your Angular app into a PWA. Add offline support, push notifications, and installability.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📱 Progressive Web Apps</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
PWAs combine the best of web and native apps. Work offline, installable, and feel native.
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-blue-500">
<pre class="text-gray-800 dark:text-gray-100">
// Add PWA support
ng add @angular/pwa

// Service worker configuration (ngsw-config.json)
{
  "assetGroups": [{
    "name": "app",
    "installMode": "prefetch",
    "resources": {
      "files": ["/favicon.ico", "/index.html"]
    }
  }]
}
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ PWA Features</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-8">
  <li><strong class="text-brand-primary">Offline:</strong> Work without internet</li>
  <li><strong class="text-brand-primary">Installable:</strong> Add to home screen</li>
  <li><strong class="text-brand-primary">Push Notifications:</strong> Re-engage users</li>
  <li><strong class="text-brand-primary">Background Sync:</strong> Sync when online</li>
</ul>
`,
  code: `// Check for updates
import { SwUpdate } from '@angular/service-worker';

export class AppComponent {
  swUpdate = inject(SwUpdate);
  
  ngOnInit() {
    this.swUpdate.versionUpdates.subscribe(event => {
      if (event.type === 'VERSION_READY') {
        if (confirm('New version available. Load it?')) {
          window.location.reload();
        }
      }
    });
  }
}`,
  comparison: {
    junior: `// ❌ No offline support`,
    senior: `// ✅ PWA with service worker`
  },
  interview: {
    questions: [
      {
        q: "What makes a PWA?",
        a: "HTTPS, service worker, web app manifest. Provides offline support, installability, and native-like experience."
      }
    ]
  }
};
