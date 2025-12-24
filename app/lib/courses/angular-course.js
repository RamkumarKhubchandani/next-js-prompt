export const angularContent = {angular: {
    id: 'angular',
    title: 'Angular 21: The Professional Guide',
    description: 'Master Angular 21 end-to-end: standalone architecture, signals, RxJS, routing, forms, SSR/hydration, performance, security, enterprise patterns, plus a complete interview package (problems + solutions). Updated for 2025.',
    totalDays: 42,
    days: [
        {
            day: 0,
            title: 'Day 0: Professional Setup (Angular CLI, Tooling, Standards)',
            intro: "Stop fighting your tools. Set up Angular 21 like a team: deterministic installs, strict TypeScript, formatting, linting, and a clean repo structure.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 Day 0 Outcomes</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li><span class="text-yellow-400 font-bold">Repeatable environment</span> (Node + package manager + lockfile discipline).</li>
  <li><span class="text-yellow-400 font-bold">Professional CLI workflow</span>: generate → test → build → analyze.</li>
  <li><span class="text-yellow-400 font-bold">Strict TypeScript</span> + predictable formatting/linting.</li>
  <li><span class="text-yellow-400 font-bold">Clean repo conventions</span>: where code lives and why.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) Install & Create (Angular CLI)</h3>
<p class="mb-4 text-light-300">
Angular CLI is not optional in real teams. It encodes the “Angular way” for builds, tests, and code generation.
</p>
<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-light-200 overflow-x-auto">
<pre><code>
# Create a new Angular app
npx @angular/cli@latest new my-angular-app
cd my-angular-app

# Run dev server
ng serve

# Generate a standalone component
ng generate component features/home --standalone
</code></pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) Understand the Project Structure (So You Can Debug It)</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
my-angular-app/
  src/
    main.ts          → app bootstrap (entry)
    index.html       → shell HTML
    styles.*         → global styles
    app/             → your feature code
  angular.json       → build/test configuration
  tsconfig*.json     → TypeScript configuration
  package.json       → scripts + deps
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">3) Deterministic Installs (Lockfile Discipline)</h3>
<p class="mb-4 text-light-300">
Frontend builds fail in production because dependency graphs drift. Your goal: <span class="text-yellow-400 font-bold">same inputs → same outputs</span>.
</p>
<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-light-200 overflow-x-auto">
<pre><code>
# Always install from lockfile in CI
npm ci

# Avoid "works on my machine"
# - commit package-lock.json
# - don't hand-edit lockfiles
</code></pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">4) Strict TypeScript (Template Safety)</h3>
<p class="mb-4 text-light-300">
Angular templates are code. Strict template type-checking catches UI bugs before users do.
</p>

<h3 class="text-xl font-bold text-white mb-4">5) The Professional Baseline: Lint + Format + Test</h3>
<div class="bg-dark-800 p-4 rounded-xl border border-dark-600 text-light-300 mb-6">
  <ul class="list-disc list-inside space-y-2 text-sm">
    <li><span class="text-yellow-400 font-bold">Prettier</span>: formatting consistency across team.</li>
    <li><span class="text-yellow-400 font-bold">ESLint</span>: correctness rules and architecture constraints.</li>
    <li><span class="text-yellow-400 font-bold">Unit tests</span>: protect core logic and services.</li>
  </ul>
</div>

<h3 class="text-xl font-bold text-white mb-4">✅ Day 0 Checklist</h3>
<div class="bg-dark-800 p-4 rounded-xl border border-dark-600 text-light-300">
  <ul class="list-disc list-inside space-y-2">
    <li>You can run: <code class="bg-dark-900 px-1 rounded">ng serve</code>, <code class="bg-dark-900 px-1 rounded">ng test</code>, <code class="bg-dark-900 px-1 rounded">ng build</code>.</li>
    <li>Lockfile is committed and CI uses <code class="bg-dark-900 px-1 rounded">npm ci</code>.</li>
    <li>Strict TS is enabled (no silent any).</li>
  </ul>
</div>
            `,
            code: `/**
 * Day 0: Setup guardrails (conceptual)
 * - fail fast in CI when tools drift
 * - keep scripts predictable across developers
 */

// Recommended scripts:
// "start": "ng serve"
// "build": "ng build"
// "test": "ng test"
// "lint": "ng lint"
// "format": "prettier . --write"

// CI rule of thumb:
// - npm ci
// - npm run lint
// - npm test
// - npm run build`,
            comparison: {
                junior: `// ❌ Random setup
// - different Node versions
// - inconsistent formatting
// - no linting
// - unstable builds`,
                senior: `// ✅ Team-grade setup
// - deterministic installs
// - strict TS
// - lint + format
// - consistent scripts for CI`
            },
            interview: {
                questions: [
                    { q: "Why do we pin Node and dependency versions in frontend repos?", a: "To avoid environment drift. Angular builds depend on Node, TypeScript, and bundler behavior. Pinning prevents 'works on my machine' failures and stabilizes CI." },
                    { q: "Why strict TypeScript in Angular projects?", a: "Because templates + DI + refactors get safer. Strictness turns runtime bugs into compile-time errors and makes large codebases maintainable." },
                    { q: "What should every project expose as scripts?", a: "start, build, test, lint (and format). CI should be able to run them without custom tribal knowledge." }
                ]
            }
        },
        {
            day: 1,
            title: 'Components & Templates (Bindings, Inputs/Outputs, Control Flow)',
            intro: "Angular is a component framework. Learn the template syntax, bindings, and the modern control flow style.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Property binding vs event binding vs two-way binding.</li>
  <li><code class="bg-dark-700 px-1 rounded">@Input</code> and <code class="bg-dark-700 px-1 rounded">@Output</code> communication.</li>
  <li>Template control flow (<span class="text-yellow-400 font-bold">if/for</span> style) + trackBy mindset.</li>
</ul>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
Parent Component
  ├─ passes data via @Input  ─────▶ Child Component
  └─ listens via @Output    ◀───── emits events
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">1) Bindings (The 4 You Use Daily)</h3>
<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-light-200 overflow-x-auto">
<pre><code>
{{ title }}                 # interpolation (text)
[disabled]="isSaving"       # property binding
(click)="save()"            # event binding
[(ngModel)]="name"          # two-way binding (forms)
</code></pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) Inputs/Outputs (The Clean Data Flow)</h3>
<p class="mb-4 text-light-300">
Use <span class="text-yellow-400 font-bold">Inputs</span> for data down and <span class="text-yellow-400 font-bold">Outputs</span> for events up.
Avoid a child calling parent services directly; it creates hidden coupling.
</p>

<h3 class="text-xl font-bold text-white mb-4">3) List Rendering (Identity Matters)</h3>
<p class="mb-4 text-light-300">
When lists change, Angular must understand item identity. If identity changes, DOM churn increases.
Always prefer stable IDs and a trackBy mindset.
</p>
            `,
            code: `/**
 * Day 1: Minimal parent-child example (standalone-style)
 */

// parent.component.html
// <app-user-card
//   [user]="user"
//   (deleted)="onDeleted($event)">
// </app-user-card>

// user-card.component.ts
// export class UserCardComponent {
//   @Input({ required: true }) user!: User;
//   @Output() deleted = new EventEmitter<string>();
//
//   delete() {
//     this.deleted.emit(this.user.id);
//   }
// }`,
            comparison: {
                junior: `// ❌ Tight coupling
// child imports parent services directly`,
                senior: `// ✅ Clear contracts
// data down via @Input, events up via @Output`
            },
            interview: {
                questions: [
                    { q: "Difference between property binding and interpolation?", a: "Interpolation sets text in templates. Property binding binds to DOM properties/inputs. Property binding is required for non-string values and dynamic attributes." },
                    { q: "Why avoid two-way binding everywhere?", a: "It can hide data flow and complicate debugging. Prefer unidirectional flow: inputs + events, and use two-way where it truly helps (forms)." },
                    { q: "Why is trackBy important in lists?", a: "It prevents unnecessary DOM destruction/recreation by giving Angular stable identity for items, improving performance." }
                ]
            }
        },
        {
            day: 2,
            title: 'TypeScript for Angular (Types as Architecture)',
            intro: "Angular at scale is TypeScript engineering. Today you’ll learn how to design types that make components safer and refactors cheap.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">Core Ideas</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Interfaces vs types, unions, discriminated unions.</li>
  <li>Typed forms and typed HTTP responses.</li>
  <li>Never lie to the compiler: avoid <code class="bg-dark-700 px-1 rounded">any</code>.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) Model UI State Explicitly</h3>
<p class="mb-4 text-light-300">
Most UI bugs happen because state is implicit (null, undefined, partial objects).
Make state explicit with a union so the template knows what’s safe to render.
</p>

<h3 class="text-xl font-bold text-white mb-4">2) Type the Boundaries</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li><span class="text-yellow-400 font-bold">API boundary</span>: type your HttpClient results.</li>
  <li><span class="text-yellow-400 font-bold">Form boundary</span>: typed reactive forms reduce runtime errors.</li>
  <li><span class="text-yellow-400 font-bold">Component boundary</span>: Inputs should be typed and required.</li>
</ul>
            `,
            code: `/**
 * Day 2: Discriminated union for safe UIs
 */

// type LoadState<T> =
//   | { status: 'idle' }
//   | { status: 'loading' }
//   | { status: 'success'; data: T }
//   | { status: 'error'; message: string };

// Example use:
// let state: LoadState<User[]> = { status: 'idle' };
// state = { status: 'loading' };
// state = { status: 'success', data: [{ id: '1', name: 'Ada' }] };
//
// Template logic becomes obvious:
// if loading -> show spinner
// if success -> render data
// if error -> render message`,
            comparison: {
                junior: `// ❌ any everywhere
let state: any = {};`,
                senior: `// ✅ typed states
// LoadState<User[]> makes UI safe and predictable`
            },
            interview: {
                questions: [
                    { q: "What is a discriminated union and why is it useful?", a: "It models state transitions safely. The compiler narrows types based on a shared discriminator (like status) which reduces null checks and prevents invalid states." },
                    { q: "Why prefer unknown over any?", a: "unknown forces validation before usage, preventing unsafe operations. any disables type checking and spreads bugs." },
                    { q: "How do types improve Angular templates?", a: "Template type checking catches property mistakes at build time and makes refactors safer." }
                ]
            }
        },
        {
            day: 3,
            title: 'Dependency Injection (Providers, Scopes, Tokens)',
            intro: "DI is Angular’s superpower. Learn provider scopes, injection tokens, and how to structure services for testability.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">DI Mental Model</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-purple-300 mb-6 overflow-x-auto">
<pre>
Injector (tree)
  ├─ root providers (app-wide)
  ├─ route providers (feature scope)
  └─ component providers (instance scope)
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">1) Providers are Scopes</h3>
<p class="mb-4 text-light-300">
The same service class can behave like a singleton or like a per-feature instance depending on where it’s provided.
That’s the difference between “global state” and “feature state”.
</p>

<h3 class="text-xl font-bold text-white mb-4">2) Tokens for Config (No Hardcoding)</h3>
<p class="mb-4 text-light-300">
Production apps never hardcode API URLs. Use an InjectionToken for configuration so environment changes don’t require code rewrites.
</p>

<h3 class="text-xl font-bold text-white mb-4">3) Testability</h3>
<p class="mb-6 text-light-300">
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
                    { q: "What does providedIn: 'root' mean?", a: "Angular creates a singleton service in the root injector. It’s tree-shakeable and available application-wide." },
                    { q: "When would you use component-level providers?", a: "When you need a new service instance per component instance (e.g., local state store per component)." },
                    { q: "Why use InjectionToken?", a: "To inject non-class dependencies (strings/config) and to avoid name collisions while keeping DI typed and explicit." }
                ]
            }
        },
        {
            day: 4,
            title: 'RxJS Fundamentals (Observables, Operators, Streams)',
            intro: "Angular’s async model is RxJS. Learn observables, subscriptions, and the operators that power real apps.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">Observables vs Promises</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
Promise: one value, eager (starts immediately)
Observable: many values, lazy (starts on subscribe), cancellable
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">Operators You Must Know</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li><span class="text-yellow-400 font-bold">map</span>, <span class="text-yellow-400 font-bold">filter</span>, <span class="text-yellow-400 font-bold">tap</span></li>
  <li><span class="text-yellow-400 font-bold">switchMap</span> (cancel previous), <span class="text-yellow-400 font-bold">mergeMap</span> (parallel), <span class="text-yellow-400 font-bold">concatMap</span> (queue)</li>
  <li><span class="text-yellow-400 font-bold">catchError</span>, <span class="text-yellow-400 font-bold">retry</span>, <span class="text-yellow-400 font-bold">shareReplay</span></li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) The “Pipe” Mental Model</h3>
<p class="mb-4 text-light-300">
RxJS is a pipeline. You take an input stream and transform it step-by-step. This replaces nested callbacks and nested subscriptions.
</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-purple-300 mb-6 overflow-x-auto">
<pre>
User types → debounce → distinct → switchMap(API) → render result
   (events)    (reduce noise)      (cancel old requests)
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) The Big 3 Flattening Operators</h3>
<div class="grid md:grid-cols-3 gap-4 mb-6 text-sm">
  <div class="bg-dark-800 p-4 rounded-xl border border-dark-600 text-light-200">
    <p class="font-bold text-white mb-1">switchMap</p>
    <p>Latest wins. Cancels previous.</p>
    <p class="text-light-400">Search, typeahead, route changes.</p>
  </div>
  <div class="bg-dark-800 p-4 rounded-xl border border-dark-600 text-light-200">
    <p class="font-bold text-white mb-1">mergeMap</p>
    <p>Parallel. Order not guaranteed.</p>
    <p class="text-light-400">Fire-and-forget tasks.</p>
  </div>
  <div class="bg-dark-800 p-4 rounded-xl border border-dark-600 text-light-200">
    <p class="font-bold text-white mb-1">concatMap</p>
    <p>Queues. Preserves order.</p>
    <p class="text-light-400">Sequential workflows.</p>
  </div>
</div>
            `,
            code: `// Search box stream pattern:
// this.query.valueChanges.pipe(
//   debounceTime(300),
//   distinctUntilChanged(),
//   switchMap(q => this.api.search(q)),
// ).subscribe();`,
            comparison: {
                junior: `// ❌ nested subscriptions
// api.get().subscribe(x => api.get2(x).subscribe(...))`,
                senior: `// ✅ flatten with switchMap/mergeMap
// one pipeline, easy cancellation`
            },
            interview: {
                questions: [
                    { q: "switchMap vs mergeMap vs concatMap?", a: "switchMap cancels previous inner streams (ideal for search). mergeMap runs in parallel (careful with ordering). concatMap queues sequentially (preserves order)." },
                    { q: "What is shareReplay used for?", a: "To share one upstream execution and replay the last value to new subscribers (useful for caching HTTP streams). Must be used carefully to avoid stale caches/memory leaks." },
                    { q: "Why do async pipes help?", a: "They manage subscriptions automatically and prevent memory leaks by unsubscribing when the view is destroyed." }
                ]
            }
        },
        {
            day: 5,
            title: 'Change Detection + Signals (Performance Without Guessing)',
            intro: "To build fast Angular apps, you must understand change detection. We’ll connect classic OnPush with modern Signals.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">Two Worlds</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
  <div class="bg-dark-800 p-4 rounded-xl border border-dark-600 text-light-300">
    <p class="text-white font-bold mb-2">Classic (Zone + CD)</p>
    <p class="text-sm">Angular runs change detection on events and async tasks.</p>
  </div>
  <div class="bg-dark-800 p-4 rounded-xl border border-dark-600 text-light-300">
    <p class="text-white font-bold mb-2">Modern (Signals)</p>
    <p class="text-sm">Reactive primitives that update only where needed.</p>
  </div>
</div>

<h3 class="text-xl font-bold text-white mb-4">OnPush</h3>
<p class="mb-6 text-light-300">
OnPush components update when inputs change by reference, events fire, or observables/signals emit.
This reduces unnecessary work and makes UI performance predictable.
</p>

<h3 class="text-xl font-bold text-white mb-4">1) The “Reference Change” Rule</h3>
<p class="mb-4 text-light-300">
OnPush is simple: if you mutate arrays/objects in place, you keep the same reference and updates may not propagate.
Prefer immutable updates: create a new array/object.
</p>

<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-light-200 overflow-x-auto">
<pre><code>
// ✅ immutable update
items = [...items, newItem];

// ❌ mutation (same reference)
items.push(newItem);
</code></pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) Signals: Fine-Grained Reactivity</h3>
<p class="mb-6 text-light-300">
Signals let Angular re-render only what depends on a value. Think “computed values” and “effects” with clear dependencies.
</p>
            `,
            code: `// Signal idea (conceptual):
// const count = signal(0);
// const doubled = computed(() => count() * 2);
// effect(() => console.log('count', count()));
// count.set(count() + 1);`,
            comparison: {
                junior: `// ❌ random performance fixes
// "add setTimeout and hope"`,
                senior: `// ✅ deliberate CD strategy
// OnPush + signals + trackBy + smaller components`
            },
            interview: {
                questions: [
                    { q: "What triggers change detection in Angular?", a: "User events, async tasks (timers, XHR), input changes, and explicit triggers. With OnPush, it’s more limited and predictable." },
                    { q: "Why can mutable objects hurt OnPush?", a: "If you mutate an object/array in place, the reference doesn’t change, so OnPush may not detect changes. Prefer immutable updates." },
                    { q: "Why are signals useful?", a: "They provide fine-grained reactivity, reducing unnecessary template checks and simplifying state propagation compared to manual subscription management." }
                ]
            }
        },
        {
            day: 6,
            title: 'Routing (Lazy Loading, Guards, Resolvers, Standalone APIs)',
            intro: "Routing is architecture. Learn how to structure features, protect routes, and keep bundles small.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">Routing Checklist</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Lazy load big features.</li>
  <li>Guard access (auth + role).</li>
  <li>Preload intentionally (not accidentally).</li>
  <li>Keep route trees simple.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) Lazy Loading: The Default for Features</h3>
<p class="mb-4 text-light-300">
Bundle size is UX. Lazy loading keeps first load fast, especially for admin/settings features.
</p>

<h3 class="text-xl font-bold text-white mb-4">2) Guards: Auth vs Authz</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li><span class="text-yellow-400 font-bold">Auth guard</span>: user must be signed in.</li>
  <li><span class="text-yellow-400 font-bold">Role guard</span>: user must have permission.</li>
</ul>

<div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl mb-6">
  <p class="text-red-200 text-sm">
    <span class="text-yellow-400 font-bold">Important:</span> route guards are UX and client-side safety.
    Real authorization must still be enforced on the backend.
  </p>
</div>
            `,
            code: `// Standalone route example (conceptual):
// export const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'admin', canActivate: [adminGuard], loadComponent: () => import('./admin').then(m => m.AdminComponent) },
// ];`,
            comparison: {
                junior: `// ❌ one giant app bundle
// all features loaded on first paint`,
                senior: `// ✅ lazy loading by feature
// faster TTI + less JS shipped`
            },
            interview: {
                questions: [
                    { q: "Guard vs Resolver?", a: "Guards decide whether navigation is allowed. Resolvers fetch data before route activation (use carefully to avoid blocking UX)." },
                    { q: "Why lazy load?", a: "To reduce initial bundle size and speed up first load; users only download features when needed." },
                    { q: "What is route-level provider scope good for?", a: "Feature-scoped services/state that should reset when leaving the feature route." }
                ]
            }
        },
        {
            day: 7,
            title: 'Forms (Reactive Forms + Validation Like a Pro)',
            intro: "Reactive forms are the scalable approach: typed controls, custom validators, and clear data flow.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">Why Reactive Forms</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Typed form model.</li>
  <li>Composable validation.</li>
  <li>Predictable updates and testing.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) Form Model = Source of Truth</h3>
<p class="mb-4 text-light-300">
Put validation and form shape in the component class. Keep templates for rendering, not logic.
</p>

<h3 class="text-xl font-bold text-white mb-4">2) Custom Validators</h3>
<p class="mb-4 text-light-300">
Custom validators let you encode business rules (password strength, cross-field match) in reusable functions.
</p>

<h3 class="text-xl font-bold text-white mb-4">3) UX: Show Errors at the Right Time</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Show errors after <span class="text-yellow-400 font-bold">touched</span> or after submit attempt.</li>
  <li>Use consistent error messages; don’t surprise users.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">4) Cross-Field Validation (Password Match)</h3>
<p class="mb-4 text-light-300">
Many real forms validate multiple fields together (password + confirmPassword). This belongs at the <span class="text-yellow-400 font-bold">FormGroup</span> level.
</p>

<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-light-200 overflow-x-auto">
<pre><code>
passwords:
  - password
  - confirmPassword
validator:
  - if mismatch → { passwordMismatch: true }
</code></pre>
</div>
            `,
            code: `/**
 * Day 7: Reactive forms with cross-field validator (conceptual)
 */

// const passwordMatch: ValidatorFn = (group: AbstractControl) => {
//   const password = group.get('password')?.value;
//   const confirm = group.get('confirmPassword')?.value;
//   return password === confirm ? null : { passwordMismatch: true };
// };
//
// form = this.fb.group({
//   email: ['', [Validators.required, Validators.email]],
//   passwords: this.fb.group(
//     {
//       password: ['', [Validators.required, Validators.minLength(8)]],
//       confirmPassword: ['', [Validators.required]],
//     },
//     { validators: [passwordMatch] },
//   ),
// });
//
// submit() {
//   if (this.form.invalid) {
//     this.form.markAllAsTouched();
//     return;
//   }
// }`,
            comparison: {
                junior: `// ❌ validation scattered in template`,
                senior: `// ✅ validators in form model
// reusable + testable`
            },
            interview: {
                questions: [
                    { q: "Template-driven vs Reactive forms?", a: "Template-driven is simpler for small forms but harder to scale. Reactive forms provide explicit, testable form models and complex validation composition." },
                    { q: "How do async validators work?", a: "They return an Observable/Promise and complete with either null (valid) or an error object. Common for server checks (unique username)." },
                    { q: "What is ControlValueAccessor?", a: "The interface that allows custom components to integrate with Angular forms as if they were native controls." }
                ]
            }
        },
        // Days 8–31: advanced topics. Each day maintains the same teaching pattern.
        {
            day: 8,
            title: 'HttpClient (Interceptors, Error Handling, Retries)',
            intro: "Most apps are API-driven. Learn the professional HTTP stack: typed responses, interceptors, and resilient error handling.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">Professional HTTP Rules</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Always type responses.</li>
  <li>Use interceptors for auth headers + correlation IDs.</li>
  <li>Centralize error mapping (don’t repeat it in every component).</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) The “API Layer” Pattern</h3>
<p class="mb-4 text-light-300">
Keep HttpClient calls in a <span class="text-yellow-400 font-bold">data-access service</span>. Components should not assemble URLs or parse responses.
</p>

<h3 class="text-xl font-bold text-white mb-4">2) Interceptors (Cross‑Cutting Concerns)</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Add Authorization header</li>
  <li>Add requestId header</li>
  <li>Map HTTP errors → domain errors</li>
  <li>Handle token refresh (carefully)</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">3) Resilience: Retries and Backoff</h3>
<div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl mb-6">
  <p class="text-red-200 text-sm">
    Retry only when safe. Retrying POST without idempotency can duplicate actions.
  </p>
</div>
            `,
            code: `/**
 * Day 8: HttpClient + interceptor + typed API service (conceptual)
 */

// type ApiError =
//   | { code: 'UNAUTHORIZED' }
//   | { code: 'NOT_FOUND' }
//   | { code: 'VALIDATION_ERROR'; details?: unknown }
//   | { code: 'NETWORK_ERROR' }
//   | { code: 'UNKNOWN' };
//
// @Injectable({ providedIn: 'root' })
// export class UsersApi {
//   constructor(private http: HttpClient, @Inject(API_BASE_URL) private baseUrl: string) {}
//
//   list(): Observable<User[]> {
//     return this.http.get<User[]>(this.baseUrl + '/users');
//   }
// }
//
// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   const token = /* read token from auth store */ '';
//   const authReq = token ? req.clone({ setHeaders: { Authorization: 'Bearer ' + token } }) : req;
//   return next(authReq).pipe(
//     catchError((err: HttpErrorResponse) => {
//       // map to domain errors
//       return throwError(() => err);
//     }),
//   );
// };`,
            comparison: { junior: `// ❌ fetch in components`, senior: `// ✅ HttpClient + service layer + interceptors` },
            interview: { questions: [
                { q: "What are interceptors used for?", a: "Cross-cutting HTTP concerns: auth headers, logging, retries, error mapping, correlation IDs." },
                { q: "How do you cancel HTTP requests in Angular?", a: "Unsubscribe from the observable or use takeUntil; HttpClient cancels the underlying request when unsubscribed." },
                { q: "Where should API calling logic live?", a: "In services (data access layer), not components, to keep UI clean and testable." },
            ] }
        },
        {
            day: 9,
            title: 'State Management (Signals Store, Component Stores, NgRx Basics)',
            intro: "State is where apps rot. Learn patterns that scale: local state, feature state, and global state—without chaos.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">State Layers</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-purple-300 mb-6 overflow-x-auto">
<pre>
Local UI state: component signals
Feature state: route-scoped store/service
Global state: app-level store (when needed)
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">1) The First Rule: Don’t Start with Global State</h3>
<p class="mb-4 text-light-300">
Start local. If multiple components in one feature need shared state, create a feature store.
Only introduce global state when multiple independent features depend on the same data.
</p>

<h3 class="text-xl font-bold text-white mb-4">2) A Practical Feature Store Shape</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
state:
  - loading
  - data
  - error
actions:
  - load()
  - refresh()
  - setFilter()
</pre>
</div>
            `,
            code: `/**
 * Day 9: Feature store pattern with signals (conceptual)
 */

// const users = signal<User[]>([]);
// const loading = signal(false);
// const error = signal<string | null>(null);
//
// const load = async () => {
//   loading.set(true);
//   error.set(null);
//   try {
//     const data = await firstValueFrom(usersApi.list());
//     users.set(data);
//   } catch (e) {
//     error.set('Failed to load users');
//   } finally {
//     loading.set(false);
//   }
// };`,
            comparison: { junior: `// ❌ everything global`, senior: `// ✅ layered state boundaries` },
            interview: { questions: [
                { q: "When do you need a global store?", a: "When multiple unrelated features need the same state and you need centralized consistency (auth user, permissions, feature flags)." },
                { q: "What makes a good state boundary?", a: "Ownership, lifecycle, and dependency. If it should reset on navigation, keep it route-scoped." },
                { q: "What is the cost of NgRx?", a: "More boilerplate and mental overhead, but strong predictability, tooling, and scalability for complex apps." },
            ] }
        },
        {
            day: 10,
            title: 'Component Communication Patterns (Inputs/Outputs vs Services)',
            intro: "Learn when to use Inputs/Outputs, when to lift state, and when a shared service/store is the right move.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">Decision Guide</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Parent-child: Inputs/Outputs</li>
  <li>Siblings: lift state up or use a feature store</li>
  <li>Cross-feature: global store (rare)</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) Presentational vs Container Components</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li><span class="text-yellow-400 font-bold">Presentational</span>: receives data via inputs, emits events, no API calls.</li>
  <li><span class="text-yellow-400 font-bold">Container</span>: fetches data, holds feature state, orchestrates children.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">2) Avoid “Service in Every Child”</h3>
<p class="mb-6 text-light-300">
If every child injects the same service, dependencies become implicit and tests become harder.
Prefer explicit inputs/outputs, or a feature store that the container owns.
</p>
            `,
            code: `/**
 * Day 10: Container + presentational pattern (conceptual)
 */

// Container:
// - injects UsersApi / store
// - passes users to list component
// - handles events like delete
//
// <app-user-list [users]="users()" (delete)="deleteUser($event)"></app-user-list>
//
// Presentational list:
// - no HttpClient, no global knowledge
// - only emits events`,
            comparison: { junior: `// ❌ event spaghetti`, senior: `// ✅ clear boundaries + store` },
            interview: { questions: [
                { q: "Why is a global event bus a bad idea?", a: "It hides dependencies and creates implicit coupling. Debugging becomes difficult and changes cause surprising side effects." },
                { q: "When is a shared service appropriate?", a: "When multiple components within a feature need shared logic/state and share a lifecycle boundary." },
                { q: "What’s the cleanest parent-child communication?", a: "Inputs for data down, Outputs for events up. Keep child components dumb/presentational when possible." },
            ] }
        },
        {
            day: 11,
            title: 'Directives & Pipes (Reusable View Logic)',
            intro: "Directives and pipes are Angular’s way to reuse UI behavior and transformations cleanly.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">Directive vs Pipe</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li><span class="text-yellow-400 font-bold">Directive</span>: changes DOM behavior/structure.</li>
  <li><span class="text-yellow-400 font-bold">Pipe</span>: transforms data for display.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) Directives: Behavior on Existing DOM</h3>
<p class="mb-4 text-light-300">
Directives shine when you want to attach behavior to existing HTML without creating new component wrappers:
autofocus, permissions, tooltips, input formatting.
</p>

<h3 class="text-xl font-bold text-white mb-4">2) Pipes: Keep Templates Declarative</h3>
<p class="mb-4 text-light-300">
Pipes transform display values (formatting, mapping). Keep them <span class="text-yellow-400 font-bold">pure</span> for performance.
</p>

<div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl mb-6">
  <p class="text-red-200 text-sm">
    <span class="text-yellow-400 font-bold">Avoid impure pipes</span> unless you fully understand the performance cost.
    Impure pipes run often and can become hidden hot spots.
  </p>
</div>
            `,
            code: `/**
 * Day 11: Custom directive + custom pipe (conceptual)
 */

// Directive idea: autofocus
// @Directive({ selector: '[appAutofocus]', standalone: true })
// export class AutofocusDirective {
//   constructor(private el: ElementRef<HTMLInputElement>) {}
//   ngAfterViewInit() { this.el.nativeElement.focus(); }
// }
//
// Pipe idea: initials
// @Pipe({ name: 'initials', standalone: true })
// export class InitialsPipe implements PipeTransform {
//   transform(value: string) {
//     return value
//       .split(' ')
//       .filter(Boolean)
//       .slice(0, 2)
//       .map(w => w[0].toUpperCase())
//       .join('');
//   }
// }`,
            comparison: { junior: `// ❌ formatting logic in templates`, senior: `// ✅ pipes + reusable directives` },
            interview: { questions: [
                { q: "Pure vs impure pipes?", a: "Pure pipes run only when inputs change by reference. Impure pipes run frequently and can hurt performance; use sparingly." },
                { q: "When write a directive instead of a component?", a: "When you need to attach behavior to existing elements without changing structure too much (e.g., tooltip, auto-focus)." },
                { q: "Why are pipes good for UI?", a: "They keep templates clean and centralize formatting/transformations." },
            ] }
        },
        {
            day: 12,
            title: 'Testing (Component Tests, Service Tests, Router Tests)',
            intro: "A senior Angular app is testable by design. Learn what to test and how to keep tests stable.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">Testing Strategy</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Services: unit tests (fast).</li>
  <li>Components: shallow tests for logic + template expectations.</li>
  <li>Critical flows: a small number of integration/E2E tests.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) What to Test</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li><span class="text-yellow-400 font-bold">Business logic</span> in services/stores (highest ROI).</li>
  <li><span class="text-yellow-400 font-bold">Guards</span> and route behavior (auth flows).</li>
  <li><span class="text-yellow-400 font-bold">HTTP services</span> with HttpTestingController.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">2) The #1 Flake Cause: Time and Async</h3>
<p class="mb-6 text-light-300">
Flaky tests come from timers, async scheduling, and shared state. Make tests deterministic: mock time, mock HTTP, isolate state.
</p>
            `,
            code: `/**
 * Day 12: HttpClient testing pattern (conceptual)
 */

// it('calls /users and returns typed data', () => {
//   TestBed.configureTestingModule({
//     providers: [UsersApi, provideHttpClient(), provideHttpClientTesting()],
//   });
//
//   const api = TestBed.inject(UsersApi);
//   const httpMock = TestBed.inject(HttpTestingController);
//
//   let result: User[] | undefined;
//   api.list().subscribe((x) => (result = x));
//
//   const req = httpMock.expectOne('https://api.example.com/users');
//   expect(req.request.method).toBe('GET');
//   req.flush([{ id: '1', name: 'Ada' }]);
//
//   httpMock.verify();
//   expect(result?.[0].name).toBe('Ada');
// });`,
            comparison: { junior: `// ❌ no tests`, senior: `// ✅ test pyramid + deterministic fixtures` },
            interview: { questions: [
                { q: "What do you mock in Angular tests?", a: "External dependencies: HTTP, timers, browser APIs. Keep business logic pure and test it directly." },
                { q: "What is HttpTestingController?", a: "A tool to mock and assert HttpClient requests deterministically." },
                { q: "How do you avoid flaky tests?", a: "Avoid real time/network, isolate state, and keep tests deterministic." },
            ] }
        },
        {
            day: 13,
            title: 'Performance (OnPush, trackBy, defer/lazy, profiling)',
            intro: "Performance is architecture. Today you’ll learn the repeatable checklist to keep Angular apps fast.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">Performance Checklist</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>OnPush by default for presentational components.</li>
  <li>trackBy for lists.</li>
  <li>Lazy load large routes/components.</li>
  <li>Measure: don’t guess.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) Performance is Usually One of These</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-purple-300 mb-6 overflow-x-auto">
<pre>
1) Too much JS shipped (bundle size)
2) Too much DOM work (big lists, re-renders)
3) Too many HTTP calls (waterfall)
4) Change detection hot spots
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) The “Big List” Strategy</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Use trackBy</li>
  <li>Paginate or virtualize</li>
  <li>Split row components + OnPush</li>
</ul>
            `,
            code: `// trackBy example:
// trackById = (_: number, item: { id: string }) => item.id;`,
            comparison: { junior: `// ❌ re-render everything`, senior: `// ✅ stable identity + smaller checks` },
            interview: { questions: [
                { q: "Why does trackBy help performance?", a: "It reduces DOM churn by keeping element identity stable across renders." },
                { q: "How do you find performance bottlenecks?", a: "Use profiling tools and measure change detection hot spots, large bundles, and expensive templates." },
                { q: "When would you use OnPush?", a: "For components whose inputs are immutable or driven by observables/signals; it makes CD predictable and faster." },
            ] }
        },
        {
            day: 14,
            title: 'SSR + Hydration (Angular Universal Modern Approach)',
            intro: "SSR improves initial load and SEO, but requires discipline. Learn hydration, caching, and server constraints.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">SSR Flow</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
Request → Server renders HTML → Browser hydrates → App becomes interactive
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">1) What SSR Solves (and What it Doesn’t)</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li><span class="text-yellow-400 font-bold">First paint</span> and perceived performance.</li>
  <li><span class="text-yellow-400 font-bold">SEO</span> for content-heavy pages.</li>
  <li>It does <span class="text-red-300 font-bold">not</span> remove JS cost; hydration still runs.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">2) SSR Safety Rules</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Never assume <code class="bg-dark-700 px-1 rounded">window</code>/<code class="bg-dark-700 px-1 rounded">document</code> exist.</li>
  <li>Prefer platform checks (<code class="bg-dark-700 px-1 rounded">isPlatformBrowser</code>).</li>
  <li>Keep server rendering deterministic (no random IDs without seeding).</li>
</ul>
            `,
            code: `// SSR tips:
// - avoid direct window/document usage (guard with isPlatformBrowser)
// - cache server responses where safe
// - keep initial payload small`,
            comparison: { junior: `// ❌ SSR breaks due to window usage`, senior: `// ✅ platform checks + hydration-safe code` },
            interview: { questions: [
                { q: "Why SSR?", a: "Faster first paint/SEO and better perceived performance. It can also improve performance on slow devices." },
                { q: "What breaks SSR most often?", a: "Direct browser API usage (window, document), non-deterministic rendering, and relying on client-only side effects." },
                { q: "What is hydration?", a: "Reusing server-rendered HTML and attaching event listeners/state on the client without rerendering the entire DOM." },
            ] }
        },
        {
            day: 15,
            title: 'Security (Sanitization, Trusted Types, CSP, Safe DOM)',
            intro: "Security is not optional. Learn Angular’s sanitization model and how to avoid XSS and unsafe DOM patterns.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">Golden Rule</h3>
<p class="mb-6 text-light-300">
Never trust user input. Prefer data binding. Avoid injecting raw HTML unless you fully control it.
</p>

<h3 class="text-xl font-bold text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>How Angular sanitization works (what it blocks and why).</li>
  <li>The difference between <span class="text-yellow-400 font-bold">XSS</span>, <span class="text-yellow-400 font-bold">CSRF</span>, and <span class="text-yellow-400 font-bold">CSP</span>.</li>
  <li>How to safely render rich content (allowlists).</li>
  <li>Why <code class="bg-dark-700 px-1 rounded">bypassSecurityTrust*</code> is almost always wrong.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) Angular’s Default is Safe</h3>
<p class="mb-4 text-light-300">
Angular escapes template bindings by default. The dangerous cases usually appear when you:
<span class="text-yellow-400 font-bold">inject HTML</span>, build URLs unsafely, or add inline scripts.
</p>

<h3 class="text-xl font-bold text-white mb-4">2) Common Unsafe Patterns</h3>
<div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl mb-6">
  <ul class="list-disc list-inside space-y-2 text-red-200 text-sm">
    <li>Rendering user HTML via <code class="bg-dark-900 px-1 rounded">[innerHTML]</code> without sanitizing/allowlisting</li>
    <li>Using <code class="bg-dark-900 px-1 rounded">bypassSecurityTrustHtml</code> on attacker-controlled content</li>
    <li>Building URLs from untrusted input and binding into <code class="bg-dark-900 px-1 rounded">href</code>/<code class="bg-dark-900 px-1 rounded">src</code></li>
  </ul>
</div>

<h3 class="text-xl font-bold text-white mb-4">3) CSP (Defense in Depth)</h3>
<p class="mb-6 text-light-300">
Content Security Policy reduces XSS impact by blocking inline scripts and restricting allowed sources.
Even with Angular, CSP is a strong extra safety belt.
</p>
            `,
            code: `// If you must render HTML:
// use Angular sanitization; never bypass unless you understand the risk.
// DomSanitizer.bypassSecurityTrustHtml(...) is a last resort.`,
            comparison: { junior: `// ❌ bypassSecurityTrustHtml everywhere`, senior: `// ✅ sanitize + allowlist` },
            interview: { questions: [
                { q: "What is XSS and how does Angular help?", a: "XSS is injecting malicious scripts into pages. Angular sanitizes dangerous bindings and escapes values by default in templates." },
                { q: "Why is bypassSecurityTrustHtml dangerous?", a: "It disables sanitization. If content is attacker-controlled, it can execute scripts and compromise users." },
                { q: "What is CSP?", a: "Content Security Policy limits what scripts/resources can load, reducing XSS impact. It’s a strong defense-in-depth layer." },
            ] }
        },
        // 16–31: enterprise topics + capstone style wrap-up.
        {
            day: 16,
            title: 'Angular CDK + Material (Design Systems Done Right)',
            intro: "Learn to build consistent UI at scale: CDK primitives and Material components (or your own design system).",
            content: `
<h3 class="text-xl font-bold text-white mb-4">Why CDK Matters</h3>
<p class="mb-6 text-light-300">
CDK provides primitives (overlay, a11y, drag-drop) so you can build reusable components without reinventing hard problems.
</p>

<h3 class="text-xl font-bold text-white mb-4">1) CDK vs Material</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6 text-sm">
  <div class="bg-dark-800 p-4 rounded-xl border border-dark-600 text-light-200">
    <p class="font-bold text-white mb-1">CDK</p>
    <p>Behavior primitives (no styling).</p>
    <p class="text-light-400">Overlay, portals, a11y, virtual scroll.</p>
  </div>
  <div class="bg-dark-800 p-4 rounded-xl border border-dark-600 text-light-200">
    <p class="font-bold text-white mb-1">Material</p>
    <p>Pre-built components + theming.</p>
    <p class="text-light-400">Buttons, dialogs, tables, menus.</p>
  </div>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) A Real Design System Strategy</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Use Material/CDK as foundation.</li>
  <li>Create a <span class="text-yellow-400 font-bold">thin wrapper</span> library (your own components) for consistent API.</li>
  <li>Enforce A11y and UX defaults once, reuse everywhere.</li>
</ul>
            `,
            code: `// Use CDK overlay for popovers, menus, tooltips (conceptual).`,
            comparison: { junior: `// ❌ copy-paste UI`, senior: `// ✅ design system + primitives` },
            interview: { questions: [
                { q: "What is the Angular CDK?", a: "A set of behavior primitives (not styled) to build components: overlays, portals, accessibility, drag-drop, virtual scrolling." },
                { q: "Why prefer a design system?", a: "Consistency, speed, accessibility, and reduced maintenance across teams." },
                { q: "What’s an overlay?", a: "A floating UI layer rendered above the app (menus/dialogs/tooltips) with proper positioning and focus management." },
            ] }
        },
        {
            day: 17,
            title: 'i18n (Internationalization) and Localization Strategy',
            intro: "Real products ship globally. Learn translation workflows, formatting, and runtime constraints.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">i18n Checklist</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Text extraction + translation pipeline.</li>
  <li>Date/number formatting by locale.</li>
  <li>RTL layout considerations.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) Don’t Concatenate Strings</h3>
<p class="mb-4 text-light-300">
Concatenation breaks grammar and word order in many languages. Use full sentences and ICU message formats.
</p>

<h3 class="text-xl font-bold text-white mb-4">2) Plurals & Gender (ICU Messages)</h3>
<div class="bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-light-200 overflow-x-auto">
<pre><code>
{count, plural,
  =0 {No messages}
  =1 {One message}
  other {{count} messages}
}
</code></pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">3) Localization Includes Formatting</h3>
<p class="mb-6 text-light-300">
Dates, numbers, currency, and even sort order differ by locale. Treat formatting as part of i18n.
</p>
            `,
            code: `// Use built-in i18n for templates or a runtime translation library depending on needs.`,
            comparison: { junior: `// ❌ hard-coded strings`, senior: `// ✅ translation pipeline + locale formatting` },
            interview: { questions: [
                { q: "Why is i18n more than translating strings?", a: "Locales affect dates, numbers, currency, pluralization, and layout (RTL). It impacts routing and SEO too." },
                { q: "Compile-time vs runtime translations?", a: "Compile-time is fast and optimized but rebuild per locale. Runtime is flexible but adds runtime cost and complexity." },
                { q: "What’s a common i18n bug?", a: "Concatenating strings in code (breaks translation/grammar). Use full sentences and ICU message formats." },
            ] }
        },
        {
            day: 18,
            title: 'Animations (UX Without Jank)',
            intro: "Use animations sparingly and correctly. Learn Angular animations and performance pitfalls.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">Animation Rule</h3>
<p class="mb-6 text-light-300">Prefer transform/opacity animations. Avoid layout thrashing (top/left/height) when possible.</p>

<h3 class="text-xl font-bold text-white mb-4">1) Micro-interactions & Perceived Quality</h3>
<p class="mb-4 text-light-300">
Great animations are small: hover feedback, expand/collapse, dialog open/close.
Avoid “busy” motion that distracts from content.
</p>

<h3 class="text-xl font-bold text-white mb-4">2) Performance Rules</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Prefer <span class="text-yellow-400 font-bold">transform</span> and <span class="text-yellow-400 font-bold">opacity</span>.</li>
  <li>Avoid animating layout properties that trigger reflow.</li>
  <li>Keep animations out of critical rendering paths.</li>
</ul>
            `,
            code: `// Trigger animations on state changes; keep animation logic out of business logic.`,
            comparison: { junior: `// ❌ animate layout-heavy properties`, senior: `// ✅ transform/opacity + micro-interactions` },
            interview: { questions: [
                { q: "Why prefer transform/opacity?", a: "They can be GPU-accelerated and avoid layout recalculation, producing smoother animations." },
                { q: "Where do animations go in Angular?", a: "In component metadata (animations array) and template triggers bound to state." },
                { q: "What makes animations feel slow?", a: "Excessive duration, easing mismatch, and triggering layout recalculations during animation." },
            ] }
        },
        {
            day: 19,
            title: 'Advanced RxJS (Subjects, Multicasting, Error Strategy)',
            intro: "Learn the parts of RxJS that separate juniors from seniors: subjects, sharing, and error boundaries.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">Key Concepts</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Subject vs BehaviorSubject vs ReplaySubject.</li>
  <li>Cold vs hot observables.</li>
  <li>Error handling: catchError boundaries and retry strategy.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) Cold vs Hot (The Interview Classic)</h3>
<p class="mb-4 text-light-300">
Cold observables start producing values per subscriber (like HTTP). Hot observables share a single producer (like events).
</p>

<h3 class="text-xl font-bold text-white mb-4">2) Subject Types (When to Use What)</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li><span class="text-yellow-400 font-bold">Subject</span>: no initial value, pure multicast.</li>
  <li><span class="text-yellow-400 font-bold">BehaviorSubject</span>: has a current value (state).</li>
  <li><span class="text-yellow-400 font-bold">ReplaySubject</span>: replays N previous values.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">3) Error Strategy: Boundaries</h3>
<p class="mb-6 text-light-300">
Don’t let one error kill a long-lived stream. Catch errors at boundaries and map to domain state.
</p>
            `,
            code: `// BehaviorSubject holds latest value; ReplaySubject can replay N values to new subscribers.`,
            comparison: { junior: `// ❌ subjects everywhere`, senior: `// ✅ prefer pure streams; subjects only at boundaries` },
            interview: { questions: [
                { q: "When should you use a Subject?", a: "At event boundaries (bridging non-Rx sources) or for imperative event emission. Prefer composing cold observables for data flows." },
                { q: "Why can shareReplay be risky?", a: "It can cache forever and leak memory or keep stale data if not configured/invalidated." },
                { q: "How do you handle errors in RxJS?", a: "Use catchError at boundaries, map to domain errors, and avoid killing long-lived streams unintentionally." },
            ] }
        },
        {
            day: 20,
            title: 'Monorepos & Nx (Scaling Teams and Apps)',
            intro: "Enterprise Angular commonly lives in monorepos. Learn boundaries, shared libs, and CI acceleration.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">Why Monorepos</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Shared libraries with explicit boundaries.</li>
  <li>Consistent tooling and lint rules.</li>
  <li>Faster CI via caching and affected builds.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) Library Taxonomy (So It Doesn’t Become Chaos)</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
libs/
  ui/            (pure UI components)
  data-access/   (API + data fetching)
  feature/       (route-level features)
  util/          (pure utilities)
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) Enforce Boundaries</h3>
<p class="mb-6 text-light-300">
Monorepos only work if dependencies are controlled. Enforce rules like:
feature → data-access → util, and ui should not import feature.
</p>
            `,
            code: `// Nx ideas: libs for ui/data-access/feature; enforce boundaries with lint rules.`,
            comparison: { junior: `// ❌ copy code between apps`, senior: `// ✅ shared libs + boundaries` },
            interview: { questions: [
                { q: "What problem does Nx solve?", a: "Scaling a codebase with multiple apps/libs using caching, dependency graphs, affected builds, and enforceable boundaries." },
                { q: "How do you prevent a monorepo from becoming a mess?", a: "Clear library taxonomy, strict dependency rules, and review discipline." },
                { q: "What’s an 'affected' build?", a: "A build/test run limited to only projects impacted by a change, speeding up CI." },
            ] }
        },
        {
            day: 21,
            title: 'Build System (esbuild/Vite-style speed, budgets, optimization)',
            intro: "Learn what makes builds fast and bundles small: budgets, code splitting, and dependency hygiene.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">Bundle Discipline</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Audit dependencies (biggest wins).</li>
  <li>Lazy load features.</li>
  <li>Track bundle budgets.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) What Actually Makes Bundles Big</h3>
<div class="bg-dark-800 p-4 rounded-xl border border-dark-600 text-light-300 mb-6">
  <ul class="list-disc list-inside space-y-1 text-sm">
    <li>Huge dependencies (chart libs, date libs, utility megabundles)</li>
    <li>Accidental eager imports (importing whole feature from root)</li>
    <li>Duplicate dependencies in monorepos</li>
    <li>Shipping large JSON/data in the bundle</li>
  </ul>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) Code Splitting Strategy</h3>
<p class="mb-4 text-light-300">
Split by user intent: pages/features. Example: Admin, Billing, Reports should not be in the initial bundle.
</p>

<h3 class="text-xl font-bold text-white mb-4">3) Build Budgets (Guardrails)</h3>
<p class="mb-6 text-light-300">
Budgets are how teams prevent slow regressions. If a PR adds 400KB, it should fail CI and force an explicit decision.
</p>
            `,
            code: `/**
 * Day 21: Practical build checklist (conceptual)
 */

// 1) Budget rule:
// - set bundle budgets in angular.json
// - fail CI if exceeded
//
// 2) Dependency rule:
// - audit dependencies quarterly
// - prefer smaller alternatives
//
// 3) Split rule:
// - lazy load feature routes
// - avoid importing feature modules/components in root`,
            comparison: { junior: `// ❌ ship massive bundles`, senior: `// ✅ budgets + audits + lazy loading` },
            interview: { questions: [
                { q: "What is tree-shaking?", a: "Removing unused code during bundling (works best with ESM and side-effect-free modules)." },
                { q: "How do you keep bundle size under control?", a: "Budgets, dependency audits, code splitting, and avoiding giant utility libraries when small alternatives exist." },
                { q: "Why are source maps sensitive?", a: "They can expose source code and internal structure. Serve them carefully (or restrict) in production." },
            ] }
        },
        {
            day: 22,
            title: 'PWA (Offline, Caching, Updates)',
            intro: "PWAs require careful caching strategy. Learn service workers, offline mode, and safe update flows.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">PWA Reality</h3>
<p class="mb-6 text-light-300">
Caching is power and risk. If you cache the wrong assets you can ship broken apps until caches expire.
</p>

<h3 class="text-xl font-bold text-white mb-4">1) What Should Be Cached</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li><span class="text-yellow-400 font-bold">App shell</span>: JS/CSS assets with hashed filenames.</li>
  <li><span class="text-yellow-400 font-bold">Static content</span>: icons, fonts (careful with cache headers).</li>
  <li><span class="text-yellow-400 font-bold">API responses</span>: only if you have a correctness strategy.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">2) Update Strategy (The Hard Part)</h3>
<p class="mb-6 text-light-300">
Users can stay on old versions. You need an update UX: detect new version, prompt reload, and avoid “half-updated” apps.
</p>
            `,
            code: `// PWA checklist:
// - cache immutable assets
// - handle update prompts
// - test offline flows explicitly`,
            comparison: { junior: `// ❌ enable SW and forget`, senior: `// ✅ caching strategy + update UX` },
            interview: { questions: [
                { q: "What’s the hardest part of PWAs?", a: "Update strategy and cache invalidation. Users can stay on old versions if you don’t manage updates." },
                { q: "When is PWA a bad idea?", a: "When data must always be real-time and offline caching would cause incorrect behavior, or when you can’t support update complexity." },
                { q: "What is a service worker?", a: "A background script that can intercept requests, cache assets, and enable offline behavior." },
            ] }
        },
        {
            day: 23,
            title: 'Accessibility (A11y) (Keyboard, Focus, ARIA)',
            intro: "A11y is not optional. Learn keyboard navigation, focus management, and ARIA the correct way.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">A11y Checklist</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Keyboard navigation always works.</li>
  <li>Focus is visible and correct.</li>
  <li>Semantic HTML first, ARIA second.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) Keyboard First</h3>
<p class="mb-4 text-light-300">
If your app can be used with only a keyboard, you’ve solved a large chunk of accessibility.
Tab order, Enter/Space activation, and visible focus are mandatory.
</p>

<h3 class="text-xl font-bold text-white mb-4">2) ARIA: Use Only When Needed</h3>
<p class="mb-4 text-light-300">
Prefer semantic elements (<code class="bg-dark-700 px-1 rounded">&lt;button&gt;</code>, <code class="bg-dark-700 px-1 rounded">&lt;label&gt;</code>).
ARIA is for filling gaps, not for replacing HTML.
</p>

<h3 class="text-xl font-bold text-white mb-4">3) Modals Need Focus Management</h3>
<p class="mb-6 text-light-300">
Trap focus inside dialogs and return focus to the trigger on close. CDK helps you do this correctly.
</p>
            `,
            code: `// Use CDK a11y utilities for focus trapping in dialogs/menus.`,
            comparison: { junior: `// ❌ div buttons`, senior: `// ✅ semantic elements + correct focus` },
            interview: { questions: [
                { q: "Why is semantic HTML important for accessibility?", a: "It provides built-in keyboard and screen reader behavior. ARIA cannot fully replace correct semantics." },
                { q: "What is focus trapping?", a: "Keeping keyboard focus inside a modal/dialog until it is closed, preventing users from tabbing behind it." },
                { q: "What’s a common a11y mistake?", a: "Clickable divs without role/keyboard handlers, missing labels, and poor focus states." },
            ] }
        },
        {
            day: 24,
            title: 'Real-time UI (WebSockets + RxJS + Backpressure)',
            intro: "Build real-time features without melting the UI: streams, throttling, and proper teardown.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">Real-time Rule</h3>
<p class="mb-6 text-light-300">Throttle UI updates. Aggregate events. Clean up subscriptions on destroy.</p>

<h3 class="text-xl font-bold text-white mb-4">1) Don’t Render Every Packet</h3>
<p class="mb-4 text-light-300">
If you render on every message, the UI will stutter. Batch or throttle updates and render at human-friendly intervals.
</p>

<h3 class="text-xl font-bold text-white mb-4">2) Teardown is Required</h3>
<p class="mb-6 text-light-300">
Real-time streams live forever. Use async pipe or explicit teardown so sockets and subscriptions don’t leak.
</p>
            `,
            code: `// Stream pattern:
// wsMessages$.pipe(throttleTime(100), scan(reducer, initialState))`,
            comparison: { junior: `// ❌ render every event`, senior: `// ✅ throttle + aggregate + teardown` },
            interview: { questions: [
                { q: "What is backpressure?", a: "A strategy to prevent producers from overwhelming consumers. In UI, it means throttling/buffering so rendering keeps up." },
                { q: "How do you avoid memory leaks with streams?", a: "Use async pipe, takeUntil(destroy$), or framework-integrated teardown patterns." },
                { q: "When to use WebSockets vs polling?", a: "WebSockets for frequent real-time updates; polling for low-frequency updates or simpler infra." },
            ] }
        },
        {
            day: 25,
            title: 'Advanced Forms (ControlValueAccessor, Dynamic Forms)',
            intro: "Build reusable form components and dynamic form builders that scale across teams.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">CVA Mental Model</h3>
<p class="mb-6 text-light-300">
ControlValueAccessor is the bridge between Angular forms and your custom input component.
</p>

<h3 class="text-xl font-bold text-white mb-4">1) Why CVA Exists</h3>
<p class="mb-4 text-light-300">
Without CVA, your custom inputs can’t participate in touched/dirty/disabled states and validators.
CVA makes custom components first-class form controls.
</p>

<h3 class="text-xl font-bold text-white mb-4">2) Dynamic Forms (Config-Driven)</h3>
<p class="mb-6 text-light-300">
Dynamic forms let you build admin panels and survey builders. The trick is: keep a strong schema for config
and map it to typed form controls.
</p>
            `,
            code: `// CVA essentials:
// writeValue(value), registerOnChange(fn), registerOnTouched(fn), setDisabledState(isDisabled)`,
            comparison: { junior: `// ❌ custom inputs that don't integrate`, senior: `// ✅ CVA + typed forms` },
            interview: { questions: [
                { q: "What does ControlValueAccessor enable?", a: "It allows custom components to participate in Angular forms, including validation, touched/dirty states, and disabled behavior." },
                { q: "Why dynamic forms?", a: "To build form UIs from configuration (admin panels, surveys) while keeping validation and types manageable." },
                { q: "How do you validate cross-field rules?", a: "Use a form-group validator that checks multiple controls (e.g., password + confirmPassword)." },
            ] }
        },
        {
            day: 26,
            title: 'Library Engineering (Packaging, Public API, Versioning)',
            intro: "Enterprise Angular means libraries. Learn packaging, semantic versioning, and backwards compatibility.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">Library Rules</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Expose a stable public API.</li>
  <li>Document inputs/outputs clearly.</li>
  <li>Version changes with SemVer.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) Public API is a Contract</h3>
<p class="mb-4 text-light-300">
Your library consumers should import from one place. Never force consumers to import deep paths (it breaks refactors).
</p>

<h3 class="text-xl font-bold text-white mb-4">2) Backwards Compatibility Strategy</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Add features in a backwards-compatible way (new inputs, optional behavior).</li>
  <li>Deprecate before remove (document timeline).</li>
  <li>Use SemVer and changelogs.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">3) Library Quality Checklist</h3>
<div class="bg-dark-800 p-4 rounded-xl border border-dark-600 text-light-300 mb-6">
  <ul class="list-disc list-inside space-y-1 text-sm">
    <li>A11y defaults</li>
    <li>Stable theming tokens</li>
    <li>Tests for critical behavior</li>
    <li>Clear examples in docs</li>
  </ul>
</div>
            `,
            code: `/**
 * Day 26: Public API pattern (conceptual)
 */

// projects/my-ui-lib/src/public-api.ts
// export * from './lib/button/button.component';
// export * from './lib/input/input.component';
// export * from './lib/dialog/dialog.service';
//
// Consumer:
// import { UiButtonComponent } from 'my-ui-lib';`,
            comparison: { junior: `// ❌ import deep paths`, senior: `// ✅ stable public API surface` },
            interview: { questions: [
                { q: "What is SemVer?", a: "Semantic versioning: MAJOR for breaking changes, MINOR for backwards-compatible features, PATCH for bug fixes." },
                { q: "Why avoid deep imports?", a: "They couple consumers to internal structure. A refactor breaks downstream apps." },
                { q: "What belongs in a UI library?", a: "Reusable components, design tokens, accessibility utilities, and documented patterns—kept stable and versioned." },
            ] }
        },
        {
            day: 27,
            title: 'Micro Frontends (Module Federation Concepts)',
            intro: "For very large orgs, micro frontends split ownership. Learn the tradeoffs and safe boundaries.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">Tradeoffs</h3>
<p class="mb-6 text-light-300">
Micro frontends add deployment independence but increase complexity (shared deps, UX consistency, runtime integration).
</p>

<h3 class="text-xl font-bold text-white mb-4">1) The Only Good Reason: Org Scale</h3>
<p class="mb-4 text-light-300">
If you can’t explain the team boundary, release independence, and integration strategy, you don’t need micro frontends.
</p>

<h3 class="text-xl font-bold text-white mb-4">2) The Hard Parts (Be Honest)</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Shared dependencies and version drift</li>
  <li>Consistent UX (design system governance)</li>
  <li>Runtime failures across remote apps</li>
  <li>Observability (who broke prod?)</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">3) Safe Boundaries</h3>
<p class="mb-6 text-light-300">
Micro frontend boundaries should match business domains, not technical layers. Don’t split by “header team” vs “footer team”.
</p>
            `,
            code: `// Rule: only adopt micro frontends with a real org/team boundary reason.`,
            comparison: { junior: `// ❌ micro frontends for fun`, senior: `// ✅ adopt only for org-scale needs` },
            interview: { questions: [
                { q: "When do micro frontends make sense?", a: "When multiple teams must deploy independently and the org structure demands separation." },
                { q: "What is the biggest risk?", a: "Inconsistent UX and dependency duplication leading to performance problems." },
                { q: "How do you share design system across micro frontends?", a: "Shared libraries, strict versioning, and governance for UI consistency." },
            ] }
        },
        {
            day: 28,
            title: 'CI/CD for Frontend (Build Once, Promote, Smoke Test)',
            intro: "Frontends need CI/CD just like backends. Learn artifact promotion, environment configs, and smoke tests.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">Pipeline Stages</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>lint + test</li>
  <li>build (artifact)</li>
  <li>deploy staging</li>
  <li>smoke tests</li>
  <li>promote to prod</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) Environment Config Strategy</h3>
<p class="mb-4 text-light-300">
Avoid baking secrets into builds. Prefer runtime config injection (or environment-specific deployment config) for API base URLs and feature flags.
</p>

<h3 class="text-xl font-bold text-white mb-4">2) Cache/CDN Correctness</h3>
<p class="mb-6 text-light-300">
The #1 frontend deployment failure is stale assets. Use content-hashed filenames and correct cache headers:
immutable assets can be cached long; HTML should be short-lived.
</p>
            `,
            code: `// Smoke test idea:
// - load homepage
// - verify API base URL is correct
// - verify auth redirect works`,
            comparison: { junior: `// ❌ deploy from laptop`, senior: `// ✅ CI artifact promotion + smoke tests` },
            interview: { questions: [
                { q: "Why 'build once, promote many' for frontend too?", a: "It ensures prod runs the exact build tested in staging; rebuilding can introduce differences (env, deps, flags)." },
                { q: "What are smoke tests?", a: "Small, fast checks that ensure the deployed app is alive and critical paths work." },
                { q: "What’s the biggest frontend deploy risk?", a: "Caching/CDN + stale assets. Use cache-busting filenames and correct cache headers." },
            ] }
        },
        {
            day: 29,
            title: 'Architecture Patterns (Core/Shared/Feature + Clean Boundaries)',
            intro: "Angular at scale requires boundaries. Learn folder structure patterns that keep teams productive.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">A Practical Pattern</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
/core        (singleton services, auth, config)
/shared      (reusable UI, pipes, directives)
/features    (vertical slices: routes + components + data-access)
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">1) Dependency Direction (Non‑Negotiable)</h3>
<p class="mb-4 text-light-300">
If everything imports everything, refactors become impossible. Enforce a single direction:
features → shared/core, never the reverse.
</p>

<h3 class="text-xl font-bold text-white mb-4">2) “Feature = Vertical Slice”</h3>
<p class="mb-6 text-light-300">
Put route + UI + state + data-access together. This keeps ownership clear and reduces cross-folder jumping.
</p>
            `,
            code: `// Rule: features should depend on shared/core; shared should not depend on features.`,
            comparison: { junior: `// ❌ spaghetti imports`, senior: `// ✅ strict dependency direction` },
            interview: { questions: [
                { q: "Why are boundaries important?", a: "They prevent accidental coupling, reduce refactor cost, and allow multiple teams to work without collisions." },
                { q: "What belongs in core?", a: "Singleton services (auth, config), interceptors, app shell pieces, and providers that should exist once." },
                { q: "What’s a feature slice?", a: "A vertical unit: route + UI + data access + state for a specific business domain." },
            ] }
        },
        {
            day: 30,
            title: 'Capstone Project (Build a Real App Step-by-Step)',
            intro: "We’ll design a production-style Angular app: auth, routing, API layer, state, forms, and performance.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">Project Blueprint</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-purple-300 mb-6 overflow-x-auto">
<pre>
App Shell
  ├─ Auth feature (login, refresh, guards)
  ├─ Dashboard feature (charts, tables)
  ├─ Settings feature (profile, password)
  └─ Shared UI library (buttons, inputs, dialogs)
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">Step-by-Step Build Plan</h3>
<ol class="list-decimal list-inside space-y-2 text-light-300 mb-6">
  <li><span class="text-yellow-400 font-bold">App shell</span>: layout, navigation, lazy routes.</li>
  <li><span class="text-yellow-400 font-bold">Auth</span>: login form + token storage strategy + guard.</li>
  <li><span class="text-yellow-400 font-bold">API layer</span>: typed services + interceptors + error mapping.</li>
  <li><span class="text-yellow-400 font-bold">State</span>: feature stores for dashboard/settings.</li>
  <li><span class="text-yellow-400 font-bold">Performance</span>: OnPush, trackBy, split big features.</li>
  <li><span class="text-yellow-400 font-bold">Testing</span>: service tests + a few integration flows.</li>
  <li><span class="text-yellow-400 font-bold">Deployment</span>: CI build + staging smoke test + promote.</li>
</ol>
            `,
            code: `// Deliverables checklist:
// - route lazy loading
// - typed HttpClient services + interceptors
// - reactive forms with validators
// - OnPush + trackBy performance`,
            comparison: { junior: `// ❌ build without architecture`, senior: `// ✅ build as slices + contracts` },
            interview: { questions: [
                { q: "How do you keep a large Angular app maintainable?", a: "Feature slices, strict boundaries, typed contracts, consistent state patterns, and performance discipline (OnPush, lazy loading)." },
                { q: "What do you prioritize first in a new app?", a: "Architecture boundaries, auth model, API contracts, and tooling (lint/test/build) so the app scales without rewrites." },
                { q: "Where do most Angular apps fail?", a: "Unbounded state, mixed responsibilities in components, and ignoring performance until it’s too late." },
            ] }
        },
        {
            day: 31,
            title: 'Interview Mastery (Angular + RxJS + Architecture)',
            intro: "We’ll cover the most common high-signal interview topics with senior-level answers and pitfalls.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">High-Signal Topics</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Change detection + OnPush + immutability</li>
  <li>RxJS flattening operators</li>
  <li>DI scopes + tokens</li>
  <li>Routing + lazy loading</li>
  <li>Performance troubleshooting</li>
</ul>
            `,
            code: `// Interview tip:
// Always explain tradeoffs and show you can debug production issues.`,
            comparison: { junior: `// ❌ memorize answers`, senior: `// ✅ explain tradeoffs + debugging approach` },
            interview: { questions: [
                { q: "How would you debug a slow Angular page?", a: "Measure first: bundle size, CD hot spots, list rendering, network waterfalls. Apply OnPush/trackBy, split bundles, cache data streams, and remove heavy dependencies." },
                { q: "How do you avoid memory leaks?", a: "Prefer async pipe, manage subscriptions with takeUntil, avoid long-lived subjects, and profile heap growth." },
                { q: "What makes a senior Angular engineer?", a: "Architecture boundaries, performance discipline, strong RxJS understanding, and production-grade debugging/observability habits." },
            ] }
        },
        {
            day: 32,
            title: 'Production Debugging Playbook (Angular in the Wild)',
            intro: "This day is about being effective under pressure: how to debug production issues fast, safely, and with confidence.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>A repeatable debugging workflow (measure → isolate → fix → verify).</li>
  <li>Common production failures: cache staleness, API mismatch, memory leaks, and slow change detection.</li>
  <li>How to think in <span class="text-yellow-400 font-bold">symptoms → root causes</span>.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) The Golden Signals (Frontend Edition)</h3>
<div class="bg-dark-800 p-4 rounded-xl border border-dark-600 text-light-300 mb-6">
  <ul class="list-disc list-inside space-y-1 text-sm">
    <li><span class="text-yellow-400 font-bold">Errors</span>: JS exceptions, failed requests, auth failures</li>
    <li><span class="text-yellow-400 font-bold">Latency</span>: route navigation time, API p95, rendering time</li>
    <li><span class="text-yellow-400 font-bold">Saturation</span>: long tasks, memory growth, event loop stalls (browser)</li>
  </ul>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) The 10-Minute Triage Checklist</h3>
<ol class="list-decimal list-inside space-y-2 text-light-300 mb-6">
  <li>Is it all users or a segment (browser/version/region)?</li>
  <li>Is it a deploy regression (new build) or external dependency?</li>
  <li>Any spike in 401/403 (auth cookie / token refresh)?</li>
  <li>Any CDN/cache staleness (index.html served old vs new assets)?</li>
  <li>Any route-specific slowdowns (bundle size / resolver / API waterfall)?</li>
  <li>Any memory growth (leak) or long tasks (render loop)?</li>
</ol>

<h3 class="text-xl font-bold text-white mb-4">3) The “Stale Assets” Incident Pattern</h3>
<p class="mb-6 text-light-300">
Most frontend outages are caching bugs: HTML cached too long while JS filenames changed.
Fix with <span class="text-yellow-400 font-bold">immutable hashed assets</span> and short-lived HTML.
</p>
            `,
            code: `/**
 * Day 32: Practical logging pattern (conceptual)
 * - attach requestId to outgoing requests
 * - log route + version + requestId to correlate issues
 */

// const APP_VERSION = '1.2.3'; // inject at build time
//
// export const requestIdInterceptor: HttpInterceptorFn = (req, next) => {
//   const requestId = crypto.randomUUID();
//   const r = req.clone({ setHeaders: { 'x-request-id': requestId, 'x-app-version': APP_VERSION } });
//   return next(r).pipe(
//     tap({
//       error: (err) => console.error('http_error', { requestId, url: req.url, status: err.status }),
//     }),
//   );
// };`,
            comparison: {
                junior: `// ❌ Debug by guessing
// - no metrics
// - no versioning
// - no correlation IDs`,
                senior: `// ✅ Debug by measurement
// - version stamped
// - correlation IDs
// - reproduce + isolate + verify fix`
            },
            interview: {
                questions: [
                    { q: "How do you debug a production issue you can’t reproduce locally?", a: "Start with logs/metrics by segment (browser/region), correlate with deploy versions, inspect network waterfall, and build a minimal reproduction by isolating the failing path. Add targeted logging if needed, then fix and validate with canary/staging." },
                    { q: "Why do frontend outages often come from caching?", a: "Because HTML can be cached while JS assets change; the browser loads mismatched bundles. Correct cache headers and hashed filenames prevent this." },
                    { q: "What’s a 'long task' and why do you care?", a: "A long task blocks the main thread, causing jank and slow UI. It indicates heavy JS execution or rendering work that needs optimization." }
                ]
            }
        },
        {
            day: 33,
            title: 'Enterprise Auth (OIDC, Silent Refresh, Route Protection)',
            intro: "Real enterprises use SSO. Learn OIDC concepts, secure storage, refresh strategies, and route protection patterns.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>OIDC concepts: ID token vs access token.</li>
  <li>Secure storage tradeoffs: cookies vs memory vs localStorage.</li>
  <li>Token refresh strategies (and why they fail in prod).</li>
  <li>Guards and UX: protect routes without broken navigation loops.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) The Safe Default</h3>
<p class="mb-4 text-light-300">
If you can: keep refresh in <span class="text-yellow-400 font-bold">HttpOnly cookies</span> and keep access tokens short-lived.
This reduces XSS blast radius.
</p>

<h3 class="text-xl font-bold text-white mb-4">2) Avoid the Auth Loop Bug</h3>
<p class="mb-6 text-light-300">
If a guard redirects to /login on a transient refresh failure, users can get stuck in loops.
Use backoff + a clear “session expired” state.
</p>
            `,
            code: `/**
 * Day 33: Auth guard shape (conceptual)
 */

// export const authGuard: CanActivateFn = () => {
//   const auth = inject(AuthStore);
//   const router = inject(Router);
//
//   if (auth.isAuthenticated()) return true;
//   router.navigate(['/login'], { queryParams: { returnUrl: router.url } });
//   return false;
// };`,
            comparison: {
                junior: `// ❌ Token in localStorage + long-lived access token`,
                senior: `// ✅ Short access token + refresh cookie + clear session state`
            },
            interview: {
                questions: [
                    { q: "Why is localStorage risky for tokens?", a: "XSS can read localStorage and steal tokens. HttpOnly cookies are not accessible to JS and reduce XSS impact." },
                    { q: "What is OIDC vs OAuth?", a: "OIDC adds authentication (identity) on top of OAuth authorization, standardizing ID tokens and user info." },
                    { q: "How do you prevent redirect loops in auth guards?", a: "Use clear auth state transitions, retry/backoff for refresh, and redirect only when you definitively know the session is invalid." }
                ]
            }
        },
        {
            day: 34,
            title: 'Enterprise Data Tables (Virtual Scroll, Sorting, Filtering, Performance)',
            intro: "Tables are where apps become slow. Learn virtualization, stable identity, and server-driven filtering the right way.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Why big tables melt the DOM and how to fix it.</li>
  <li>Virtualization (CDK virtual scroll) and trackBy discipline.</li>
  <li>Server-driven pagination/sorting to keep UI fast.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) The Big Table Problem</h3>
<p class="mb-4 text-light-300">
Rendering 10,000 rows is a performance disaster. You must paginate or virtualize.
</p>

<h3 class="text-xl font-bold text-white mb-4">2) Virtual Scroll Mental Model</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
Viewport shows 30 rows
DOM renders ~40-60 rows (buffer)
As you scroll, rows are recycled
</pre>
</div>
            `,
            code: `/**
 * Day 34: Virtual scroll idea (conceptual)
 */

// <cdk-virtual-scroll-viewport itemSize="48" class="viewport">
//   <div *cdkVirtualFor="let row of rows; trackBy: trackById">
//     {{ row.name }}
//   </div>
// </cdk-virtual-scroll-viewport>
//
// trackById = (_: number, r: { id: string }) => r.id;`,
            comparison: {
                junior: `// ❌ render everything
// *ngFor over 10k rows`,
                senior: `// ✅ virtualize + server-driven filtering
// stable identity + minimal DOM work`
            },
            interview: {
                questions: [
                    { q: "Why does virtualization help?", a: "It limits DOM size by rendering only what's visible, reducing layout/reflow costs and memory usage." },
                    { q: "Client vs server pagination — when to choose server?", a: "Server pagination for large datasets or when filtering/sorting must be authoritative and fast; client pagination only for small datasets." },
                    { q: "Why is stable identity important in lists?", a: "It prevents DOM recreation and preserves component state, improving performance and correctness." }
                ]
            }
        },
        {
            day: 35,
            title: 'Final Capstone: Architecture Review + Hardening Checklist',
            intro: "You now know Angular like a professional. Today we stitch it together into a production hardening checklist you can apply to any Angular app.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 Capstone Outcomes</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>A reusable <span class="text-yellow-400 font-bold">architecture checklist</span> for any Angular project.</li>
  <li>A performance hardening checklist.</li>
  <li>A security hardening checklist.</li>
  <li>A deploy readiness checklist.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) Architecture Checklist</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Feature slices with clear ownership</li>
  <li>Typed API layer + interceptors</li>
  <li>State boundaries (local → feature → global)</li>
  <li>OnPush + trackBy as defaults</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">2) Security Checklist</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>No token in localStorage (when avoidable)</li>
  <li>No unsafe bypass of sanitization</li>
  <li>CSP where possible</li>
  <li>Strict CORS and safe redirects</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">3) Performance Checklist</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Lazy load big routes</li>
  <li>Virtualize big lists</li>
  <li>Budgets for bundle size</li>
  <li>Measure p95 navigation + long tasks</li>
</ul>
            `,
            code: `/**
 * Day 35: PR review checklist (copy/paste)
 *
 * - Does this add bundle size? If yes, justify.
 * - Any new subscriptions? Ensure teardown/async pipe.
 * - Any list rendering changes? Ensure trackBy/virtualization.
 * - Any new HTML rendering? Ensure sanitization and no bypass.
 * - Any new routes? Ensure lazy loading and guards.
 */`,
            comparison: {
                junior: `// ❌ Ship features without guardrails`,
                senior: `// ✅ Ship features with checklists + budgets + tests`
            },
            interview: {
                questions: [
                    { q: "What would you look for in a PR for a large Angular codebase?", a: "Boundaries, typing, subscription teardown, performance impact (lists/bundle size), security (sanitization/auth), and test coverage for critical paths." },
                    { q: "How do you reduce risk in deployments?", a: "Build once/promote, staging validation, smoke tests, correct caching headers, and feature flags for risky changes." },
                    { q: "What’s your production readiness checklist?", a: "Observability, safe error handling, performance budgets, security basics, and a rollback plan." }
                ]
            }
        },
        {
            day: 36,
            title: 'Interview Package 1: Angular Core (Top Questions + Solved Answers)',
            intro: "This is the high-signal Angular interview pack: change detection, DI, template typing, routing, and common traps — with senior-grade answers.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">🎯 How to Use This Day</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Read the question, pause, answer out loud.</li>
  <li>Compare with the solution and improve your mental model.</li>
  <li>Repeat until you can explain tradeoffs clearly.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">1) Change Detection (The High-Signal Answer)</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
Question:
  "What triggers change detection, and why OnPush?"

Answer shape:
  - triggers (events/async/input changes)
  - problem (too much checking)
  - solution (OnPush + immutable refs + signals/async pipe)
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2) DI Scopes (Root vs Route vs Component)</h3>
<p class="mb-6 text-light-300">
Senior insight: DI scope is how you control <span class="text-yellow-400 font-bold">state lifecycle</span>.
Route-scoped stores reset on navigation; root stores persist.
</p>

<h3 class="text-xl font-bold text-white mb-4">3) Routing (Lazy Loading + Guards)</h3>
<p class="mb-6 text-light-300">
Interviewers love practical routing: lazy loading for bundle control, guards for UX, and backend auth for real security.
</p>
            `,
            code: `/**
 * Day 36: Common interview "trap" snippets (conceptual)
 */

// TRAP 1: Mutating arrays under OnPush
// items.push(x)    // reference unchanged → UI may not update
// items = [...items, x]  // reference changes → safe

// TRAP 2: Child injects parent services (hidden coupling)
// Better: @Input/@Output or feature store owned by container

// TRAP 3: Resolver blocks navigation
// Use resolvers only when necessary; prefer loading UI + fetch in component/store`,
            comparison: {
                junior: `// ❌ "Angular runs change detection all the time" (vague)
// ❌ "DI is magic" (no scoping understanding)`,
                senior: `// ✅ Clear and precise
// - list triggers
// - explain OnPush + immutability
// - explain DI scopes + lifecycle
// - routing: lazy + guards + backend auth`
            },
            interview: {
                questions: [
                    { q: "Explain OnPush in one minute.", a: "OnPush limits when Angular checks a component: primarily when input references change, events occur, or reactive sources emit. It reduces unnecessary checks and makes performance predictable, especially with immutable updates and signals/async pipe." },
                    { q: "Root vs component provider — when do you use component providers?", a: "When you need a fresh instance per component instance (e.g., local store/state per page widget) or to override behavior locally for tests/features." },
                    { q: "Guards vs backend authorization?", a: "Guards improve UX by preventing navigation, but they do not secure data. Real authorization must be enforced server-side for every protected resource." }
                ]
            }
        },
        {
            day: 37,
            title: 'Interview Package 2: RxJS Problem Set (Solved)',
            intro: "This day turns RxJS into a superpower: you’ll solve the most common interview problems with switchMap/mergeMap/concatMap, retry, and caching.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">Problem Set</h3>
<ol class="list-decimal list-inside space-y-2 text-light-300 mb-6">
  <li>Typeahead search with cancellation</li>
  <li>Queue requests (preserve order)</li>
  <li>Parallel requests with limited concurrency</li>
  <li>Cache HTTP results (shareReplay safely)</li>
  <li>Error strategy: keep stream alive</li>
</ol>

<h3 class="text-xl font-bold text-white mb-4">Key Operator Cheatsheet</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-purple-300 mb-6 overflow-x-auto">
<pre>
switchMap: cancel previous (search)
concatMap: queue (save actions)
mergeMap: parallel (fan-out), can add concurrency
shareReplay: cache last value (careful with invalidation)
</pre>
</div>
            `,
            code: `/**
 * Day 37: Solved RxJS problems (conceptual)
 */

// 1) Typeahead (cancel previous)
// query$.pipe(
//   debounceTime(250),
//   distinctUntilChanged(),
//   switchMap(q => api.search(q).pipe(catchError(() => of([])))),
// )

// 2) Queue writes (preserve order)
// saveClicks$.pipe(
//   concatMap(payload => api.save(payload).pipe(retry({ count: 2 }))),
// )

// 3) Parallel with concurrency limit
// ids$.pipe(
//   mergeMap(id => api.get(id), 5), // concurrency=5
// )

// 4) Cache results (request-level)
// users$ = api.listUsers().pipe(
//   shareReplay({ bufferSize: 1, refCount: true })
// )`,
            comparison: {
                junior: `// ❌ nested subscriptions
// subscribe inside subscribe`,
                senior: `// ✅ one pipeline
// flattening operators + error boundaries + controlled concurrency`
            },
            interview: {
                questions: [
                    { q: "Why switchMap for search?", a: "Search should show the latest query. switchMap cancels older requests so stale responses don’t overwrite newer results." },
                    { q: "How do you do retries safely?", a: "Retry idempotent operations (GET). For writes, use idempotency keys or queue with careful design; add exponential backoff and stop conditions." },
                    { q: "What’s the danger of shareReplay?", a: "It can cache forever (stale data) or leak memory. Use refCount where appropriate and implement invalidation (e.g., refresh trigger) when needed." }
                ]
            }
        },
        {
            day: 38,
            title: 'Interview Package 3: Performance Case Studies (Solved)',
            intro: "You’ll solve classic performance scenarios: slow list, slow navigation, and memory leak — with a senior debugging plan.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">Case Study 1: Slow List Page</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Symptoms: scroll jank, typing lag, CPU spikes.</li>
  <li>Fixes: OnPush, trackBy, virtualization, reduce template work.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">Case Study 2: Slow Navigation</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Symptoms: blank screen after route click.</li>
  <li>Fixes: lazy load, avoid heavy resolvers, split bundles.</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">Case Study 3: Memory Leak</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Symptoms: memory grows with navigation.</li>
  <li>Fixes: teardown subscriptions, avoid global maps, async pipe.</li>
</ul>
            `,
            code: `/**
 * Day 38: High-signal answers (checklists)
 */

// Slow list:
// - trackBy
// - OnPush row components
// - virtual scroll for big datasets
// - avoid pipes/formatting work inside hot loops
//
// Slow navigation:
// - lazy load routes
// - avoid blocking resolvers
// - reduce initial bundle
//
// Memory leak:
// - async pipe or takeUntil
// - remove event listeners
// - avoid shareReplay without refCount/invalidation`,
            comparison: {
                junior: `// ❌ "Angular is slow"
// no measurements, random fixes`,
                senior: `// ✅ measure → isolate → fix
// bundle size + CD hot spots + DOM churn + leaks`
            },
            interview: {
                questions: [
                    { q: "What is the first step in performance debugging?", a: "Measure and isolate: identify whether it’s bundle size, CD hot spots, DOM churn, network waterfall, or memory growth. Then fix the dominant bottleneck." },
                    { q: "Why do large lists slow UIs?", a: "Large DOM + frequent re-renders cause layout/reflow and main-thread work. Virtualization limits DOM and reduces work." },
                    { q: "How do you detect memory leaks?", a: "Observe heap growth across navigation, inspect retained objects, and find long-lived references (subscriptions, global caches, event listeners)." }
                ]
            }
        },
        {
            day: 39,
            title: 'Interview Package 4: Frontend System Design (Angular App Architecture)',
            intro: "You’ll answer the system design interview for frontend: requirements, routing, state, API layer, caching, and deployment strategy.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">Case: Design an Admin Dashboard</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li>Role-based access (admin/support)</li>
  <li>Large tables + filters</li>
  <li>Audit-friendly actions</li>
  <li>Fast initial load</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">Architecture Blueprint</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-cyan-300 mb-6 overflow-x-auto">
<pre>
Shell (layout)
  ├─ /auth (login)
  ├─ /admin (lazy)
  │    ├─ users (table + filters)
  │    └─ billing (forms)
  └─ shared (ui + util)

Data access:
  - typed services
  - interceptors (auth + requestId)
State:
  - feature stores per route
</pre>
</div>
            `,
            code: `/**
 * Day 39: System design answer skeleton
 */

// 1) Requirements
// 2) Route map + lazy loading
// 3) Auth model (guard + backend enforcement)
// 4) Data access layer (typed + interceptors)
// 5) State boundaries (feature stores)
// 6) Performance (OnPush, trackBy, virtual scroll)
// 7) Deploy + caching headers + rollback`,
            comparison: {
                junior: `// ❌ "Just build pages"
// no boundaries, no performance plan`,
                senior: `// ✅ architecture with constraints
// bundles, state, tables, caching, deploy strategy`
            },
            interview: {
                questions: [
                    { q: "How would you keep initial load fast in a big Angular app?", a: "Lazy load features, keep app shell small, enforce bundle budgets, reduce heavy dependencies, and avoid blocking resolvers. Use preloading strategically for next-likely routes." },
                    { q: "Where do you put state in a dashboard app?", a: "Local UI state in components; feature state in route-scoped stores; global state only for shared concerns like auth user and feature flags." },
                    { q: "How do you secure the admin dashboard?", a: "Guards for UX, but server-side authorization for all data/actions. Use least privilege, audit logs, and safe token storage." }
                ]
            }
        },
        {
            day: 40,
            title: 'Interview Package 5: Coding Round (Angular Tasks + Solutions)',
            intro: "Hands-on coding tasks interviewers use — with clean, production-style solutions.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">Task 1: Debounced Search Component</h3>
<p class="mb-4 text-light-300">Build a search box that queries API with cancellation and shows loading/error states.</p>

<h3 class="text-xl font-bold text-white mb-4">Task 2: Reusable Table Component</h3>
<p class="mb-4 text-light-300">Build a table that supports sort/filter with stable identity and minimal re-renders.</p>

<h3 class="text-xl font-bold text-white mb-4">Task 3: Typed Form With Validation</h3>
<p class="mb-6 text-light-300">Build a signup form with cross-field validator and clean UX (markAllAsTouched on submit).</p>
            `,
            code: `/**
 * Day 40: Debounced search solution (conceptual)
 */

// state signals:
// const loading = signal(false);
// const error = signal<string | null>(null);
// const results = signal<Item[]>([]);
//
// queryControl.valueChanges.pipe(
//   debounceTime(250),
//   distinctUntilChanged(),
//   tap(() => { loading.set(true); error.set(null); }),
//   switchMap(q => api.search(q).pipe(
//     catchError(() => { error.set('Search failed'); return of([]); }),
//   )),
// ).subscribe((items) => { results.set(items); loading.set(false); });`,
            comparison: {
                junior: `// ❌ no loading state, no cancellation
// results flicker and stale responses win`,
                senior: `// ✅ cancellation + explicit UI state
// switchMap + loading/error/results model`
            },
            interview: {
                questions: [
                    { q: "How do you prevent stale search results from winning?", a: "Use switchMap so previous request is canceled and only the latest response updates state." },
                    { q: "How do you model UI state cleanly?", a: "Use explicit state: loading/error/results (or a discriminated union). It prevents invalid UI states." },
                    { q: "How do you keep components testable?", a: "Push logic into services/stores, keep components thin, and mock boundaries (HTTP/time) in tests." }
                ]
            }
        },
        {
            day: 41,
            title: 'Interview Package 6: Take‑Home Assignment (Rubric + Perfect Submission)',
            intro: "A take-home is scored on architecture, correctness, and clarity. This day gives a complete rubric and a model submission checklist.",
            content: `
<h3 class="text-xl font-bold text-white mb-4">What Interviewers Grade</h3>
<ul class="list-disc list-inside space-y-2 text-light-300 mb-6">
  <li><span class="text-yellow-400 font-bold">Architecture</span>: clear boundaries, small components, typed API layer</li>
  <li><span class="text-yellow-400 font-bold">Correctness</span>: errors handled, edge cases, loading states</li>
  <li><span class="text-yellow-400 font-bold">Performance</span>: OnPush, trackBy, avoids unnecessary work</li>
  <li><span class="text-yellow-400 font-bold">Security</span>: safe rendering, safe token strategy</li>
  <li><span class="text-yellow-400 font-bold">DX</span>: README, scripts, clean commits</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">Model Submission Checklist</h3>
<ol class="list-decimal list-inside space-y-2 text-light-300 mb-6">
  <li>README with setup + assumptions + tradeoffs</li>
  <li>Feature slices + route lazy loading</li>
  <li>Typed HttpClient services + interceptor for requestId</li>
  <li>Explicit UI state (loading/error/data)</li>
  <li>Tests for key services + one integration flow</li>
  <li>Performance guardrails (trackBy, budgets)</li>
</ol>
            `,
            code: `/**
 * Day 41: README structure (copy/paste)
 *
 * ## Setup
 * - node version
 * - npm ci
 * - ng serve
 *
 * ## Architecture
 * - feature slices
 * - data access
 * - state boundaries
 *
 * ## Tradeoffs
 * - why OnPush
 * - why signals vs store
 *
 * ## Testing
 * - what is covered
 */`,
            comparison: {
                junior: `// ❌ "It works" submission
// no README, no boundaries, no error handling`,
                senior: `// ✅ professional submission
// clear architecture, tests, tradeoffs, and polish`
            },
            interview: {
                questions: [
                    { q: "What are the top 3 things you must show in a take-home?", a: "Architecture boundaries, correctness (loading/error/edge cases), and clarity (README + tradeoffs). Bonus: performance discipline." },
                    { q: "How do you communicate tradeoffs?", a: "Document them: what you chose, why, and what you’d improve with more time (auth, caching, tests, perf)." },
                    { q: "What is the fastest way to lose points?", a: "No error handling, no loading states, messy architecture, and unclear setup instructions." }
                ]
            }
        },
    ],
}
}


