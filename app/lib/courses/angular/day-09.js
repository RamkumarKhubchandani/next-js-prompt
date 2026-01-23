export const day09 = {
  day: 9,
  title: "RxJS Essentials: Observables You'll Actually Use",
  intro: "RxJS powers Angular's async layer. Master the operators you'll use daily: map, filter, switchMap, and combineLatest.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 9. **RxJS** is Angular's async toolkit. You don't need to know all 100+ operators. Just the essential 10."
      },
      {
        type: "talk",
        message: "Think of Observables as arrays over time. Operators like `map` and `filter` work the same way, but for async streams."
      },
      {
        type: "challenge",
        instruction: "This code makes a new HTTP call for every keystroke. Use `switchMap` to cancel previous requests and only use the latest.",
        buggyCode: `searchTerm$.subscribe(term => {
  // ❌ Race condition! Multiple requests in flight
  this.http.get(\`/api/search?q=\${term}\`).subscribe(results => {
    this.results = results;
  });
});`,
        solutionCode: `// ✅ switchMap cancels previous requests
searchTerm$.pipe(
  debounceTime(300), // Wait for user to stop typing
  switchMap(term => this.http.get(\`/api/search?q=\${term}\`))
).subscribe(results => {
  this.results = results;
});`,
        verifyOutput: "switchMap",
        successMessage: "Perfect! switchMap cancels the previous request when a new one starts. No race conditions.",
        hint: "Use `switchMap` to flatten the inner Observable and cancel previous emissions."
      },
      {
        type: "ask",
        question: "What's the difference between switchMap, mergeMap, and concatMap?",
        options: [
          "They're all the same",
          "switchMap cancels previous, mergeMap runs all concurrently, concatMap queues them",
          "switchMap is faster",
          "mergeMap is deprecated"
        ],
        correctAnswer: "switchMap cancels previous, mergeMap runs all concurrently, concatMap queues them",
        feedback: {
          success: "Exactly! switchMap = cancel previous, mergeMap = run all, concatMap = queue in order.",
          error: "Think about timing. switchMap cancels, mergeMap allows concurrent, concatMap waits for each to finish."
        }
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🌊 1. The Essential Operators</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
You don't need to memorize all RxJS operators. Here are the 10 you'll use 90% of the time:
</p>

<div class="grid md:grid-cols-2 gap-4 mb-8">
  <div class="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl">
    <h4 class="font-bold text-blue-700 dark:text-blue-400 mb-2">Transformation</h4>
    <ul class="text-sm space-y-1 text-gray-700 dark:text-gray-300">
      <li><code>map</code> - Transform each value</li>
      <li><code>switchMap</code> - Flatten + cancel previous</li>
      <li><code>mergeMap</code> - Flatten + run concurrent</li>
    </ul>
  </div>
  <div class="p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-xl">
    <h4 class="font-bold text-green-700 dark:text-green-400 mb-2">Filtering</h4>
    <ul class="text-sm space-y-1 text-gray-700 dark:text-gray-300">
      <li><code>filter</code> - Only emit if condition is true</li>
      <li><code>debounceTime</code> - Wait for pause</li>
      <li><code>distinctUntilChanged</code> - Skip duplicates</li>
    </ul>
  </div>
  <div class="p-4 bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800 rounded-xl">
    <h4 class="font-bold text-purple-700 dark:text-purple-400 mb-2">Combination</h4>
    <ul class="text-sm space-y-1 text-gray-700 dark:text-gray-300">
      <li><code>combineLatest</code> - Wait for all, emit on any change</li>
      <li><code>forkJoin</code> - Wait for all to complete</li>
    </ul>
  </div>
  <div class="p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-xl">
    <h4 class="font-bold text-yellow-700 dark:text-yellow-400 mb-2">Error Handling</h4>
    <ul class="text-sm space-y-1 text-gray-700 dark:text-gray-300">
      <li><code>catchError</code> - Handle errors gracefully</li>
      <li><code>retry</code> - Retry failed requests</li>
    </ul>
  </div>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ 2. The Search Bar Pattern</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
The most common RxJS pattern: debounced search with auto-cancel.
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-green-500">
<pre class="text-gray-800 dark:text-gray-100">
searchControl.valueChanges.pipe(
  debounceTime(300),           // Wait 300ms after typing stops
  distinctUntilChanged(),      // Skip if same as previous
  switchMap(term =>            // Cancel previous search
    this.http.get(\`/api/search?q=\${term}\`)
  ),
  catchError(err => {          // Handle errors
    console.error(err);
    return of([]);
  })
).subscribe(results => {
  this.results = results;
});
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔥 3. Combining Multiple Streams</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Use <code>combineLatest</code> when you need multiple values to compute a result.
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-purple-500">
<pre class="text-gray-800 dark:text-gray-100">
// Wait for both user and settings, emit on any change
combineLatest([
  this.http.get('/api/user'),
  this.http.get('/api/settings')
]).pipe(
  map(([user, settings]) => ({ user, settings }))
).subscribe(data => {
  console.log(data.user, data.settings);
});
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚠️ Common Mistakes</h3>
<div class="grid md:grid-cols-2 gap-4 mb-8">
  <div class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl">
    <h4 class="font-bold text-red-700 dark:text-red-400 mb-2">Nested Subscriptions</h4>
    <p class="text-sm text-gray-700 dark:text-gray-300">Never subscribe inside subscribe. Use switchMap/mergeMap instead.</p>
  </div>
  <div class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl">
    <h4 class="font-bold text-red-700 dark:text-red-400 mb-2">Not Unsubscribing</h4>
    <p class="text-sm text-gray-700 dark:text-gray-300">Manual subscriptions leak memory. Use async pipe or takeUntilDestroyed().</p>
  </div>
</div>
`,
  code: `import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: \`
    <div class="p-6 bg-gray-900 text-white rounded-xl">
      <h2 class="text-2xl font-bold mb-6">🔍 RxJS Search Demo</h2>
      
      <input
        [(ngModel)]="searchTerm"
        (input)="onSearch(searchTerm)"
        placeholder="Type to search..."
        class="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 outline-none"
      />

      <div class="mt-4 p-4 bg-gray-800 rounded-xl border border-gray-700">
        <p class="text-sm text-gray-400 mb-2">Search Results:</p>
        @if (results().length > 0) {
          <ul class="space-y-2">
            @for (result of results(); track result) {
              <li class="p-2 bg-gray-700 rounded">{{ result }}</li>
            }
          </ul>
        } @else {
          <p class="text-gray-500 text-sm">Type something to search...</p>
        }
      </div>

      <div class="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
        <p class="text-xs text-blue-400 mb-2">💡 RxJS Magic</p>
        <p class="text-sm text-gray-300">
          Using <code class="text-yellow-400">debounceTime(300)</code> + 
          <code class="text-yellow-400">distinctUntilChanged()</code>
        </p>
        <p class="text-xs text-gray-400 mt-2">
          Searches only happen 300ms after you stop typing, and only if the value changed.
        </p>
      </div>
    </div>
  \`
})
export class SearchComponent {
  searchTerm = '';
  results = signal<string[]>([]);
  
  private searchSubject = new Subject<string>();

  constructor() {
    console.log('--- 🔍 RxJS Search Demo ---');
    
    // Set up the search stream
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map(term => this.mockSearch(term))
    ).subscribe(results => {
      console.log(\`📊 Search results for "\${this.searchTerm}": \`, results);
      this.results.set(results);
    });

    // Auto-demo
    setTimeout(() => {
      console.log('▶️ Auto-typing "angular"...');
      this.simulateTyping('angular');
    }, 1000);
  }

  onSearch(term: string) {
    this.searchSubject.next(term);
  }

  private mockSearch(term: string): string[] {
    if (!term) return [];
    
    const allItems = [
      'Angular Signals',
      'Angular Router',
      'Angular Forms',
      'RxJS Operators',
      'Angular HttpClient',
      'Angular Directives'
    ];
    
    return allItems.filter(item => 
      item.toLowerCase().includes(term.toLowerCase())
    );
  }

  private simulateTyping(text: string) {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        this.searchTerm += text[i];
        this.onSearch(this.searchTerm);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 150);
  }
}`,
  comparison: {
    junior: `// ❌ No debounce, searches on every keystroke
input.addEventListener('input', (e) => {
  fetch(\`/api/search?q=\${e.target.value}\`); // Spam!
});`,
    senior: `// ✅ Debounced, cancellable, clean
searchControl.valueChanges.pipe(
  debounceTime(300),
  switchMap(term => this.http.get(\`/api/search?q=\${term}\`))
).subscribe(results => this.results = results);`
  },
  interview: {
    questions: [
      {
        q: "When would you use mergeMap instead of switchMap?",
        a: "Use mergeMap when you want all requests to complete (e.g., uploading multiple files). Use switchMap when only the latest matters (e.g., search)."
      },
      {
        q: "How do you handle errors in an Observable chain?",
        a: "Use catchError operator. Return a fallback Observable (e.g., of([])) to continue the stream, or rethrow to propagate the error."
      },
      {
        q: "What's the difference between combineLatest and forkJoin?",
        a: "combineLatest emits whenever ANY source emits (after all have emitted once). forkJoin waits for ALL to complete, then emits once."
      }
    ]
  }
};
