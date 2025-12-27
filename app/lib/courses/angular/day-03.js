export const day03 = {
  day: 3,
  title: "Dependency Injection (Providers, Scopes, Tokens)",
  intro: "DI is Angular’s superpower. Learn provider scopes, injection tokens, and how to structure services for testability.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">DI Mental Model</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-purple-700 dark:text-purple-300 mb-6 overflow-x-auto">
<pre>
Injector (tree)
  ├─ root providers (app-wide)
  ├─ route providers (feature scope)
  └─ component providers (instance scope)
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Providers are Scopes</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
The same service class can behave like a singleton or like a per-feature instance depending on where it’s provided.
That’s the difference between “global state” and “feature state”.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Tokens for Config (No Hardcoding)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Production apps never hardcode API URLs. Use an InjectionToken for configuration so environment changes don’t require code rewrites.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Testability</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
DI makes testing easy: swap real services with mocks, or inject alternate implementations for offline/dev.
</p>
            `,
  code: `/**
 * Day 3: InjectionToken + service boundary (conceptual)
 */

// export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');
//
// bootstrapApplication(AppComponent, {
//   providers: [
//     { provide: API_BASE_URL, useValue: 'https://api.example.com' },
//   ],
// });
//
// @Injectable({ providedIn: 'root' })
// export class UsersApi {
//   constructor(private http: HttpClient, @Inject(API_BASE_URL) private baseUrl: string) {}
//   list() { return this.http.get<User[]>(this.baseUrl + '/users'); }
// }`,
  comparison: {
    junior: `// ❌ hard-coded config
const baseUrl = 'http://localhost:3000';`,
    senior: `// ✅ injected config via token
// works across dev/staging/prod safely`
  },
  interview: {
    questions: [
      {
        q: "What does providedIn: 'root' mean?",
        a: "Angular creates a singleton service in the root injector. It’s tree-shakeable and available application-wide."
      },
      {
        q: "When would you use component-level providers?",
        a: "When you need a new service instance per component instance (e.g., local state store per component)."
      },
      {
        q: "Why use InjectionToken?",
        a: "To inject non-class dependencies (strings/config) and to avoid name collisions while keeping DI typed and explicit."
      }
    ]
  }
};
