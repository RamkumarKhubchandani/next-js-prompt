export const day03 = {
  day: 3,
  title: "Modern Control Flow (@if, @for, @defer)",
  intro: "Say goodbye to *ngIf and *ngFor. Angular's new control flow syntax is cleaner, faster, and builtin. Plus: Lazy loading with @defer.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 3! We are updating the template engine. Old Angular used 'Directives' like `*ngIf`. New Angular uses **blocks**."
      },
      {
        type: "talk",
        message: "The new syntax is built into the compiler. It supports things like `@else` and `@empty` automatically."
      },
      {
        type: "challenge",
        instruction: "Refactor this legacy `*ngFor` loop to use the new `@for` block. Don't forget `track`!",
        buggyCode: `<ul>
  <!-- ❌ Old Template Syntax -->
  <li *ngFor="let user of users; index as i">
    {{ i }} - {{ user.name }}
  </li>
</ul>`,
        solutionCode: `<ul>
  <!-- ✅ Modern Control Flow -->
  @for (user of users; track user.id; let i = $index) {
    <li>{{ i }} - {{ user.name }}</li>
  } @empty {
    <li>No users found.</li>
  }
</ul>`,
        verifyOutput: "@for",
        successMessage: "Detailed and performant! The `track` expression is mandatory now, which forces you to write high-performance lists.",
        hint: "Use `@for (user of users; track user.id) { ... }`."
      },
      {
        type: "ask",
        question: "What does the `@defer` block do?",
        options: [
          "It defers the execution of the component's constructor",
          "It lazy-loads the content (chunks of JS/CSS) only when a condition is met (like waiting for viewport)",
          "It makes the app run slower",
          "It cancels the current request"
        ],
        correctAnswer: "It lazy-loads the content (chunks of JS/CSS) only when a condition is met (like waiting for viewport)",
        feedback: {
          success: "Yes! Use `@defer (on viewport)` to lazy load heavy components without routing.",
          error: "It's about lazy loading. Imagine loading a heavy dashboard widget ONLY when the user scrolls to it."
        }
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🚀 1. Better Conditions (@if)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
The new syntax looks like JavaScript. It supports <code>else if</code> and <code>else</code> naturally.
</p>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-blue-500">
<pre class="text-gray-800 dark:text-gray-100">
@if (access === 'admin') {
  &lt;admin-panel /&gt;
} @else if (access === 'user') {
  &lt;user-dash /&gt;
} @else {
  &lt;login-form /&gt;
}
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ 2. Faster Lists (@for)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
The <code>@for</code> block forces you to assume a <code>track</code> logic. This makes DOM diffing significantly faster because Angular knows exactly which items moved.
</p>
<ul class="list-disc list-inside space-y-3 text-gray-600 dark:text-light-300 mb-8">
  <li><strong class="text-brand-primary">track id:</strong> Always track by a unique ID, not index.</li>
  <li><strong class="text-brand-primary">@empty:</strong> Built-in block for when the list is empty. No more wrapping <code>div</code>s with <code>*ngIf</code>.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔮 3. Magic Lazy Loading (@defer)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
This is the killer feature. You can lazy-load a component <strong>without</strong> the Router.
</p>
<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-8 font-mono text-sm">
<pre class="text-gray-800 dark:text-gray-100">
@defer (on viewport) {
  &lt;heavy-chart /&gt;
} @placeholder {
  &lt;div&gt;Loading chart...&lt;/div&gt;
}
</pre>
</div>
`,
  code: `import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-feed',
  standalone: true,
  template: \`
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">📰 News Feed</h2>
      
      @if (isLoading()) {
        <p class="animate-pulse">Fetching latest news...</p>
      } @else {
        
        <div class="grid gap-4">
          @for (item of items(); track item.id) {
            <article class="p-4 bg-gray-800 rounded-xl border border-gray-700">
              <h3 class="font-bold text-lg">{{ item.title }}</h3>
              
              <!-- Lazy load comments only when visible! -->
              @defer (on interaction) {
                <div class="mt-4 p-4 bg-black/20 rounded">
                  <p class="text-sm text-gray-400">Comments loaded!</p>
                </div>
              } @placeholder {
                <button class="mt-2 text-blue-400 text-sm">Click to load comments</button>
              }

            </article>
          } @empty {
            <p>No news today. Go outside! 🌲</p>
          }
        </div>

      }

      <button (click)="load()" class="mt-6 px-4 py-2 bg-purple-600 rounded">
        Refetch
      </button>
    </div>
  \`
})
export class FeedComponent {
  isLoading = signal(false);
  items = signal([
    { id: 1, title: 'Angular 18 Released' },
    { id: 2, title: 'Signals are cool' }
  ]);

  constructor() {
    effect(() => {
        console.log('[UI update] Items count: ' + this.items().length + ' | Loading: ' + this.isLoading());
    });

    console.log("--- 🔄 Simulating User Interaction ---");
    setTimeout(() => {
        console.log("▶️ User clicked Refetch...");
        this.load();
    }, 1500);
  }

  load() {
    this.isLoading.set(true);
    setTimeout(() => {
        this.items.update(list => [...list, { id: Date.now(), title: 'New Post!' }]);
        this.isLoading.set(false);
    }, 1000);
  }
}`,
  comparison: {
    junior: `// ❌ Syntax Soup
<div *ngIf="users.length > 0; else noUsers">
  <div *ngFor="let user of users">
    {{user.name}}
  </div>
</div>
<ng-template #noUsers>No users</ng-template>`,
    senior: `// ✅ Clean & Readable
@for (user of users; track user.id) {
  <div>{{ user.name }}</div>
} @empty {
  <div>No users</div>
}`
  },
  interview: {
    questions: [
      {
        q: "Why is 'track' required in @for loops?",
        a: "Performance. Angular needs to know how to identify items across updates to minimize DOM operations (reordering vs recreating)."
      }
    ]
  }
};
