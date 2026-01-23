export const day06 = {
  day: 6,
  title: "HTTP Client & Async Pipes: The Data Layer",
  intro: "Every app talks to servers. Angular's HttpClient is typed, interceptable, and RxJS-powered. The async pipe makes subscriptions automatic.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 6. Time to fetch real data. Angular's **HttpClient** is your gateway to APIs. It returns Observables, not Promises."
      },
      {
        type: "talk",
        message: "Observables are lazy streams. They don't execute until you `.subscribe()`. But there's a better way: the **async pipe**."
      },
      {
        type: "challenge",
        instruction: "This component manually subscribes to an HTTP call. Refactor it to use the `async` pipe in the template instead.",
        buggyCode: `import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({ ... })
export class UserList {
  users: any[] = [];

  constructor(private http: HttpClient) {
    // ❌ Manual subscription (memory leak risk!)
    this.http.get('/api/users').subscribe(data => {
      this.users = data;
    });
  }
}`,
        solutionCode: `import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({ 
  imports: [CommonModule],
  template: \`
    @for (user of users$ | async; track user.id) {
      <div>{{ user.name }}</div>
    }
  \`
})
export class UserList {
  // ✅ Observable exposed directly
  users$ = this.http.get<User[]>('/api/users');

  constructor(private http: HttpClient) {}
}`,
        verifyOutput: "async",
        successMessage: "Perfect! The async pipe subscribes AND unsubscribes automatically. No memory leaks.",
        hint: "Expose the Observable directly as `users$` and use `| async` in the template."
      },
      {
        type: "ask",
        question: "Why is the async pipe better than manual `.subscribe()`?",
        options: [
          "It makes the code shorter",
          "It automatically unsubscribes when the component is destroyed, preventing memory leaks",
          "It converts Observables to Promises",
          "It caches the HTTP response"
        ],
        correctAnswer: "It automatically unsubscribes when the component is destroyed, preventing memory leaks",
        feedback: {
          success: "Exactly. The async pipe handles the subscription lifecycle for you. Clean and safe.",
          error: "Think about component lifecycle. What happens when a component is destroyed while an HTTP call is pending?"
        }
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🌐 1. HttpClient: Typed & Interceptable</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Angular's HttpClient is not just a fetch wrapper. It's a full HTTP layer with:
</p>
<ul class="list-disc list-inside space-y-3 text-gray-600 dark:text-gray-300 mb-8">
  <li><strong class="text-brand-primary">Type Safety:</strong> <code>http.get&lt;User[]&gt;('/api/users')</code> gives you typed responses.</li>
  <li><strong class="text-brand-primary">Interceptors:</strong> Add auth tokens, log requests, handle errors globally.</li>
  <li><strong class="text-brand-primary">RxJS Integration:</strong> Chain operators like <code>map</code>, <code>catchError</code>, <code>retry</code>.</li>
</ul>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-blue-500">
<pre class="text-gray-800 dark:text-gray-100">
// Basic GET request
users$ = this.http.get&lt;User[]&gt;('/api/users');

// With error handling
users$ = this.http.get&lt;User[]&gt;('/api/users').pipe(
  catchError(err => {
    console.error('Failed to load users', err);
    return of([]); // Return empty array as fallback
  })
);
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ 2. The Async Pipe: Automatic Subscriptions</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
The async pipe is Angular's secret weapon. It subscribes to an Observable, extracts the value, and unsubscribes when the component is destroyed.
</p>
<p class="mb-6 text-gray-600 dark:text-gray-300">
<strong>Convention:</strong> Observables are suffixed with <code>$</code> (e.g., <code>users$</code>, <code>loading$</code>).
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-green-500">
<pre class="text-gray-800 dark:text-gray-100">
// In template
@if (users$ | async; as users) {
  @for (user of users; track user.id) {
    &lt;div&gt;{{ user.name }}&lt;/div&gt;
  }
} @else {
  &lt;p&gt;Loading...&lt;/p&gt;
}
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔥 3. Combining Signals + Observables</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Modern Angular uses Signals for local state and Observables for async streams (HTTP, WebSockets, etc.).
</p>
<p class="mb-6 text-gray-600 dark:text-gray-300">
Use <code>toSignal()</code> to convert an Observable to a Signal for easier template usage.
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm">
<pre class="text-gray-800 dark:text-gray-100">
import { toSignal } from '@angular/core/rxjs-interop';

users = toSignal(this.http.get&lt;User[]&gt;('/api/users'), { 
  initialValue: [] 
});

// In template: {{ users().length }} users
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚠️ Common Mistakes</h3>
<div class="grid md:grid-cols-2 gap-4 mb-8">
  <div class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl">
    <h4 class="font-bold text-red-700 dark:text-red-400 mb-2">Forgetting to Subscribe</h4>
    <p class="text-sm text-gray-700 dark:text-gray-300">Observables are lazy. If you don't subscribe (or use async pipe), nothing happens.</p>
  </div>
  <div class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl">
    <h4 class="font-bold text-red-700 dark:text-red-400 mb-2">Memory Leaks</h4>
    <p class="text-sm text-gray-700 dark:text-gray-300">Manual subscriptions must be unsubscribed in <code>ngOnDestroy</code>. Use async pipe instead.</p>
  </div>
</div>
`,
  code: `import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { of, delay } from 'rxjs';

interface Post {
  id: number;
  title: string;
  author: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div class="p-6 bg-gray-900 text-white rounded-xl">
      <h2 class="text-2xl font-bold mb-6">📰 Blog Posts (Async Pipe Demo)</h2>
      
      <button 
        (click)="loadPosts()" 
        class="mb-6 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
      >
        Load Posts
      </button>

      @if (posts$ | async; as posts) {
        <div class="space-y-4">
          @for (post of posts; track post.id) {
            <article class="p-4 bg-gray-800 rounded-xl border border-gray-700">
              <h3 class="font-bold text-lg">{{ post.title }}</h3>
              <p class="text-gray-400 text-sm mt-2">by {{ post.author }}</p>
            </article>
          } @empty {
            <p class="text-gray-500">No posts yet. Click "Load Posts"!</p>
          }
        </div>
      } @else {
        <div class="flex items-center gap-3 text-gray-400">
          <div class="animate-spin rounded-full h-5 w-5 border-2 border-gray-400 border-t-transparent"></div>
          <p>Loading posts...</p>
        </div>
      }
    </div>
  \`
})
export class BlogComponent {
  posts$ = of<Post[] | null>(null); // Start with null to show loading state

  constructor() {
    console.log('--- 📡 HTTP Client Demo ---');
    console.log('Click "Load Posts" to simulate an API call');
    
    // Auto-load after 1 second for demo
    setTimeout(() => {
      console.log('▶️ Auto-loading posts...');
      this.loadPosts();
    }, 1000);
  }

  loadPosts() {
    console.log('🌐 Fetching posts from API...');
    
    // Simulate HTTP call with delay
    this.posts$ = of([
      { id: 1, title: 'Understanding Signals', author: 'Angular Team' },
      { id: 2, title: 'Async Pipe Mastery', author: 'RxJS Expert' },
      { id: 3, title: 'Modern Angular Patterns', author: 'Senior Dev' }
    ]).pipe(delay(1500));

    console.log('✅ Observable created (lazy - waits for subscription)');
  }
}`,
  comparison: {
    junior: `// ❌ Manual subscription hell
ngOnInit() {
  this.http.get('/api/users').subscribe(data => {
    this.users = data;
  }); // Forgot to unsubscribe! 💣
}`,
    senior: `// ✅ Async pipe handles everything
users$ = this.http.get<User[]>('/api/users');
// Template: @for (user of users$ | async; track user.id)`
  },
  interview: {
    questions: [
      {
        q: "What is the difference between an Observable and a Promise?",
        a: "Observables are lazy, cancellable, and can emit multiple values over time. Promises are eager, not cancellable, and emit a single value."
      },
      {
        q: "How do you handle HTTP errors in Angular?",
        a: "Use the `catchError` operator from RxJS in the pipe chain. Return a fallback Observable (e.g., `of([])`) or rethrow the error."
      },
      {
        q: "When should you use toSignal() vs async pipe?",
        a: "Use `toSignal()` when you need to derive computed values from the Observable. Use async pipe for simple template display."
      }
    ]
  }
};
