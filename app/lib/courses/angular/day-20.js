export const day20 = {
  day: 20,
  title: "Error Handling: Global & Component-Level Strategies",
  intro: "Handle errors gracefully with global error handlers, HTTP interceptors, and component-level error boundaries.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 20. **Error Handling** is not optional. Apps crash. Networks fail. Users make mistakes. Handle it gracefully."
      },
      {
        type: "challenge",
        instruction: "Add proper error handling to this HTTP call.",
        buggyCode: `// ❌ No error handling
this.http.get('/api/users').subscribe(data => {
  this.users = data; // What if it fails?
});`,
        solutionCode: `// ✅ Proper error handling
this.http.get('/api/users').pipe(
  catchError(err => {
    console.error('Failed to load users:', err);
    this.showError('Could not load users');
    return of([]); // Fallback to empty array
  })
).subscribe(users => {
  this.users = users;
});`,
        verifyOutput: "catchError",
        successMessage: "Perfect! Always handle errors and provide fallback values.",
        hint: "Use catchError operator and return a fallback Observable."
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚠️ Error Handling Strategies</h3>

<div class="space-y-4 mb-8">
  <div class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl">
    <h4 class="font-bold text-red-700 dark:text-red-400 mb-2">1. Global Error Handler</h4>
    <p class="text-sm text-gray-700 dark:text-gray-300">Catches all unhandled errors app-wide</p>
  </div>
  <div class="p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-xl">
    <h4 class="font-bold text-yellow-700 dark:text-yellow-400 mb-2">2. HTTP Interceptors</h4>
    <p class="text-sm text-gray-700 dark:text-gray-300">Handle HTTP errors globally (401, 500, etc.)</p>
  </div>
  <div class="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl">
    <h4 class="font-bold text-blue-700 dark:text-blue-400 mb-2">3. Component-Level</h4>
    <p class="text-sm text-gray-700 dark:text-gray-300">Handle specific errors with catchError</p>
  </div>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔥 Global Error Handler</h3>
<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-red-500">
<pre class="text-gray-800 dark:text-gray-100">
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: Error) {
    console.error('Global error:', error);
    // Send to error tracking service (Sentry, etc.)
  }
}

// Provide in app config
providers: [
  { provide: ErrorHandler, useClass: GlobalErrorHandler }
]
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ HTTP Error Handling</h3>
<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-yellow-500">
<pre class="text-gray-800 dark:text-gray-100">
this.http.get('/api/users').pipe(
  catchError(error => {
    if (error.status === 401) {
      this.router.navigate(['/login']);
    } else if (error.status === 500) {
      this.showError('Server error. Please try again.');
    }
    return of([]); // Fallback value
  })
).subscribe(users => this.users = users);
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📋 Error Handling Checklist</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-8">
  <li>✅ Always use catchError for HTTP calls</li>
  <li>✅ Provide user-friendly error messages</li>
  <li>✅ Log errors for debugging</li>
  <li>✅ Provide fallback values (empty arrays, default objects)</li>
  <li>✅ Send critical errors to monitoring service</li>
</ul>
`,
  code: `import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, of, throwError, delay } from 'rxjs';

@Component({
  selector: 'app-error-demo',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div class="p-6 bg-gray-900 text-white rounded-xl">
      <h2 class="text-2xl font-bold mb-6">⚠️ Error Handling Demo</h2>
      
      <div class="space-y-4">
        <button
          (click)="simulateSuccess()"
          class="w-full px-4 py-2 bg-green-600 rounded hover:bg-green-500"
        >
          Simulate Successful Request
        </button>

        <button
          (click)="simulateError()"
          class="w-full px-4 py-2 bg-red-600 rounded hover:bg-red-500"
        >
          Simulate Failed Request
        </button>

        @if (loading()) {
          <div class="p-4 bg-blue-500/20 border border-blue-500 rounded-xl">
            <p class="text-blue-400">Loading...</p>
          </div>
        }

        @if (error()) {
          <div class="p-4 bg-red-500/20 border border-red-500 rounded-xl">
            <p class="text-red-400 font-bold">Error!</p>
            <p class="text-sm text-gray-300 mt-2">{{ error() }}</p>
          </div>
        }

        @if (data()) {
          <div class="p-4 bg-green-500/20 border border-green-500 rounded-xl">
            <p class="text-green-400 font-bold">Success!</p>
            <p class="text-sm text-gray-300 mt-2">{{ data() }}</p>
          </div>
        }
      </div>

      <div class="mt-6 p-4 bg-gray-800 rounded-xl border border-gray-700">
        <p class="text-sm text-gray-400 mb-2">Error Handling Pattern:</p>
        <pre class="text-xs text-green-400 font-mono overflow-x-auto">
this.http.get('/api/data').pipe(
  catchError(err => {
    this.error.set(err.message);
    return of(null); // Fallback
  })
).subscribe(data => this.data.set(data));
        </pre>
      </div>
    </div>
  \`
})
export class ErrorDemoComponent {
  loading = signal(false);
  error = signal<string | null>(null);
  data = signal<string | null>(null);

  constructor() {
    console.log('--- ⚠️ Error Handling Demo ---');
  }

  simulateSuccess() {
    this.reset();
    this.loading.set(true);
    console.log('📡 Simulating successful request...');

    of('Data loaded successfully!').pipe(
      delay(1000)
    ).subscribe({
      next: (result) => {
        console.log('✅ Success:', result);
        this.data.set(result);
        this.loading.set(false);
      }
    });
  }

  simulateError() {
    this.reset();
    this.loading.set(true);
    console.log('📡 Simulating failed request...');

    throwError(() => new Error('Network error: Failed to fetch data')).pipe(
      delay(1000),
      catchError(err => {
        console.error('❌ Error caught:', err.message);
        this.error.set(err.message);
        this.loading.set(false);
        return of(null); // Fallback value
      })
    ).subscribe();
  }

  private reset() {
    this.loading.set(false);
    this.error.set(null);
    this.data.set(null);
  }
}`,
  comparison: {
    junior: `// ❌ No error handling
this.http.get('/api/users').subscribe(data => {
  this.users = data; // What if it fails?
});`,
    senior: `// ✅ Proper error handling
this.http.get('/api/users').pipe(
  catchError(err => {
    this.showError(err);
    return of([]);
  })
).subscribe(users => this.users = users);`
  },
  interview: {
    questions: [
      {
        q: "What's the difference between catchError and a global error handler?",
        a: "catchError handles specific Observable errors. Global ErrorHandler catches all unhandled errors app-wide."
      },
      {
        q: "Should you always return a value from catchError?",
        a: "Yes, either return a fallback Observable (of([])) or rethrow with throwError() to propagate the error."
      },
      {
        q: "How do you handle errors in Signals?",
        a: "Signals don't throw. For async operations, use toSignal() with error handling in the Observable, or use try/catch in effect()."
      }
    ]
  }
};
