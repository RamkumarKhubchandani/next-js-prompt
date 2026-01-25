export const day06 = {
  day: 6,
  title: "Advanced HTTP & RxJS Patterns",
  intro: "Fetching data is easy. Handling race conditions, error retries, and auth tokens globally is hard. Today we master `Interceptors` and `switchMap`.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 6. Time to graduate from `http.get()`. Real apps need robust data layers."
      },
      {
        type: "talk",
        message: "We need to talk about **Race Conditions**. What happens if you search for 'A', then 'AB', but 'A' returns AFTER 'AB'?"
      },
      {
        type: "challenge",
        instruction: "This search feature has a bug. If you type fast, previous requests might overwrite newer ones. Fix it using `switchMap` instead of nested subscriptions.",
        buggyCode: `search(term: string) {
  // ❌ Race Condition City!
  this.http.get('/api/search?q=' + term).subscribe(res => {
    this.results = res;
  });
}`,
        solutionCode: `searchControl.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  // ✅ Cancels previous pending request!
  switchMap(term => this.http.get('/api/search?q=' + term))
).subscribe(results => this.results = results);`,
        verifyOutput: "switchMap",
        successMessage: "Boom. `switchMap` is the unsubscribe-killer. It ensures only the LATEST request matters.",
        hint: "Use `switchMap` to project the search term into the HTTP observable."
      }
    ]
  },
  content: `
<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🛡️ 1. The Interceptor Pattern</h3>
<p class="mb-6 text-gray-600 dark:text-light-300 leading-relaxed">
Don't add Auth headers or error logging to every single <code>http.get()</code> call. Use <strong>HttpInterceptors</strong> to handle this globally. They sit between your app and the backend.
</p>

<div class="grid md:grid-cols-2 gap-6 mb-10">
    <div class="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-xl border border-blue-200 dark:border-blue-900/30 relative">
        <div class="absolute -top-3 left-4 px-3 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">Request Phase</div>
        <h4 class="font-bold text-gray-900 dark:text-white mt-2 mb-2">Auth Injection</h4>
        <pre class="text-xs font-mono text-blue-800 dark:text-blue-300">
intercept(req, next) {
  const token = localStorage.getItem('jwt');
  const cloned = req.clone({
    headers: req.headers.set('Authorization', token)
  });
  return next(cloned);
}
        </pre>
    </div>

    <div class="bg-red-50 dark:bg-red-900/10 p-5 rounded-xl border border-red-200 dark:border-red-900/30 relative">
        <div class="absolute -top-3 left-4 px-3 py-1 bg-red-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">Response Phase</div>
        <h4 class="font-bold text-gray-900 dark:text-white mt-2 mb-2">Global Error Handling</h4>
        <pre class="text-xs font-mono text-red-800 dark:text-red-300">
return next(req).pipe(
  catchError(err => {
    this.toast.error('Something went wrong!');
    return throwError(() => err);
  })
);
        </pre>
    </div>
</div>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🔀 2. Flattening Strategies (The Maps)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
When you have an Observable OF Observables (e.g. User Type Event -> triggers HTTP Call), you need to "flatten" it. Choosing the right operator is critical.
</p>

<div class="space-y-4 mb-10">
    <!-- switchMap -->
    <div class="flex items-start gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-900/40">
        <div class="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded font-mono text-xs font-bold">switchMap</div>
        <div>
            <h5 class="font-bold text-gray-900 dark:text-white text-sm">The "Latest & Greatest"</h5>
            <p class="text-xs text-gray-500 mt-1">Cancels the previous pending request. Perfect for <strong>Search</strong>.</p>
        </div>
    </div>

    <!-- concatMap -->
    <div class="flex items-start gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-900/40">
        <div class="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded font-mono text-xs font-bold">concatMap</div>
        <div>
            <h5 class="font-bold text-gray-900 dark:text-white text-sm">The "Orderly Queue"</h5>
            <p class="text-xs text-gray-500 mt-1">Waits for previous to complete. Perfect for <strong>Save/Update</strong> operations where order matters.</p>
        </div>
    </div>

    <!-- mergeMap -->
    <div class="flex items-start gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-900/40">
        <div class="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded font-mono text-xs font-bold">mergeMap</div>
        <div>
            <h5 class="font-bold text-gray-900 dark:text-white text-sm">The "Chaos Mode" (Parallel)</h5>
            <p class="text-xs text-gray-500 mt-1">Runs everything in parallel. Good for deleting multiple items at once.</p>
        </div>
    </div>
</div>
`,
  code: `import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { of, timer } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, map, catchError } from 'rxjs';

// Mock API Data
const PRODUCTS = [
    { id: 1, name: 'MacBook Pro M3', price: 1999, category: 'Laptop' },
    { id: 2, name: 'iPhone 15 Pro', price: 999, category: 'Phone' },
    { id: 3, name: 'Sony WH-1000XM5', price: 348, category: 'Audio' },
    { id: 4, name: 'Dell XPS 15', price: 1499, category: 'Laptop' },
    { id: 5, name: 'iPad Air', price: 599, category: 'Tablet' },
    { id: 6, name: 'AirPods Max', price: 549, category: 'Audio' },
];

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: \`
    <div class="max-w-md mx-auto bg-gray-950 p-6 rounded-2xl border border-gray-800 shadow-2xl min-h-[500px]">
        <div class="mb-6">
            <h2 class="text-2xl font-bold text-white mb-2">🔎 Live Search</h2>
            <p class="text-xs text-gray-400">Powered by <code>switchMap</code> & <code>debounceTime</code></p>
        </div>

        <!-- Search Input -->
        <div class="relative mb-6 group">
            <input 
                [formControl]="searchControl"
                type="text" 
                class="block w-full px-4 py-3 border border-gray-700 rounded-xl bg-gray-900 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" 
                placeholder="Search products..."
            >
            <!-- Loading Spinner -->
            @if (loading) {
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <span class="text-blue-500 text-xs font-bold animate-pulse">Loading...</span>
                </div>
            }
        </div>

        <!-- System Logs -->
        <div class="mb-4 p-3 bg-black/40 rounded-lg border border-gray-800 font-mono text-[10px] space-y-1">
            <div class="text-gray-500 uppercase tracking-widest font-bold mb-1">Stream Monitor</div>
            @for (log of logs; track log.id) {
                <div [class]="log.color">> {{ log.msg }}</div>
            }
        </div>
        
        <!-- Results List -->
        <div class="space-y-3">
             @if (results$ | async; as results) {
                @for (product of results; track product.id) {
                    <div class="flex items-center justify-between p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-gray-600 transition-colors">
                        <div>
                            <h3 class="font-bold text-white">{{ product.name }}</h3>
                            <span class="text-[10px] uppercase font-bold tracking-wider text-gray-500 bg-gray-800 px-2 py-0.5 rounded">{{ product.category }}</span>
                        </div>
                        <div class="text-blue-400 font-mono font-bold">\${{ product.price }}</div>
                    </div>
                } @empty {
                    @if (!loading) {
                        <div class="text-center py-10 text-gray-600">
                            <p>No products found.</p>
                        </div>
                    }
                }
             }
        </div>
    </div>
  \`
})
export class SearchComponent {
  searchControl = new FormControl('');
  loading = false;
  logs = [];
  logId = 0;

  results$ = this.searchControl.valueChanges.pipe(
    // 1. Wait 300ms (Debounce)
    tap(val => this.addLog(\`Typing: "\${val}"\`, 'text-gray-500')),
    debounceTime(300),
    
    // 2. Distinct
    distinctUntilChanged(),
    
    // 3. SwitchMap
    switchMap(term => {
        if (!term || typeof term !== 'string' || !term.trim()) return of([]);
        
        this.addLog(\`🚀 Request: "\${term}"\`, 'text-blue-400');
        this.loading = true;

        return this.mockHttpCall(term).pipe(
            tap(() => {
                this.loading = false;
                this.addLog(\`✅ Response: "\${term}"\`, 'text-green-400');
            }),
            catchError(() => {
                this.loading = false;
                return of([]);
            })
        );
    })
  );

  mockHttpCall(term) {
      const delayMs = 500 + Math.random() * 1000;
      return timer(delayMs).pipe(
          map(() => {
              const lower = term.toLowerCase();
              return PRODUCTS.filter(p => 
                  p.name.toLowerCase().includes(lower) || 
                  p.category.toLowerCase().includes(lower)
              );
          })
      );
  }

  addLog(msg, color) {
      this.logs = [{id: this.logId++, msg, color}, ...this.logs].slice(0, 4);
  }
}`,
  comparison: {
    junior: `// ❌ The Junior Way
onType(e) {
  // Spamming the API on every keypress!
  // No cancellation = Race conditions 🏎️
  this.http.get('/search?q=' + e.target.value)
    .subscribe(res => this.results = res);
}`,
    senior: `// ✅ The Senior Way
term$.pipe(
  debounceTime(300), // Calm down
  distinctUntilChanged(), // Don't repeat
  switchMap(q => get(q)) // Kill stale requests
).subscribe();`
  },
  interview: {
    questions: [
      {
        q: "Why use switchMap for search?",
        a: "It cancels the previous inner subscription (HTTP request) if a new value arrives. This prevents 'race conditions' where an old request overwrites the newest one."
      },
      {
        q: "What is an Interceptor?",
        a: "A middleware for HttpClient. It can inspect/modify requests (adding Auth headers) and responses (global error handling) for the entire app."
      }
    ]
  }
};
