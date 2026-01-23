export const day03 = {
  day: 3,
  title: "Modern Control Flow (@if, @for, @defer)",
  intro: "Say goodbye to *ngIf and *ngFor. Angular's new control flow syntax is cleaner, faster, and built-in. Plus: Lazy loading via @defer.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 3! We are updating the template engine. Old Angular used structual directives like `*ngIf`. New Angular uses **blocks**."
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
<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🚀 1. The Upgrade: @if & @for</h3>
<p class="mb-6 text-gray-600 dark:text-light-300 leading-relaxed">
Angular templates used to look like XML soup (<code>&lt;div *ngIf="..."&gt;</code>). The new "Block Syntax" is built directly into the template engine. It's not a directive. It's syntax.
</p>

<div class="grid md:grid-cols-2 gap-6 mb-10">
    <div class="p-5 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl">
        <h4 class="font-bold text-gray-900 dark:text-white mb-3">Legacy (Directives)</h4>
        <pre class="text-xs font-mono text-gray-600 dark:text-gray-400">
&lt;div *ngIf="isLoggedIn; else login"&gt;
  &lt;user-profile&gt;&lt;/user-profile&gt;
&lt;/div&gt;

&lt;ng-template #login&gt;
  &lt;login-form&gt;&lt;/login-form&gt;
&lt;/ng-template&gt;
        </pre>
        <p class="mt-3 text-sm text-red-600 dark:text-red-400 font-medium">❌ Hard to read "else" blocks</p>
    </div>

    <div class="p-5 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 rounded-xl">
        <h4 class="font-bold text-gray-900 dark:text-white mb-3">Modern (Blocks)</h4>
        <pre class="text-xs font-mono text-gray-600 dark:text-gray-400">
@if (isLoggedIn()) {
  &lt;user-profile /&gt;
} @else {
  &lt;login-form /&gt;
}
        </pre>
        <p class="mt-3 text-sm text-green-600 dark:text-green-400 font-medium">✅ Clean JavaScript-like syntax</p>
    </div>
</div>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">⚡ 2. Faster Lists with @for</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Rendering lists is the most expensive operation in a framework. Angular v17+ improves this by up to <strong>90%</strong> in benchmarks.
</p>
<ul class="list-disc list-inside space-y-4 text-gray-600 dark:text-light-300 mb-10 bg-gray-50 dark:bg-white/5 p-6 rounded-xl border border-gray-200 dark:border-white/10">
  <li><strong class="text-brand-primary">track is required:</strong> You MUST tell Angular how to identify functionality. usually <code>track item.id</code>. No more slow default tracking.</li>
  <li><strong class="text-brand-primary">@empty block:</strong> A built-in way to handle zero items. No more <code>*ngIf="items.length === 0"</code> wrappers.</li>
</ul>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🔮 3. The Killer Feature: @defer</h3>
<div class="bg-gradient-to-br from-purple-600 to-indigo-600 p-8 rounded-2xl text-white shadow-xl mb-8">
    <h4 class="text-2xl font-bold mb-4">Declarative Lazy Loading</h4>
    <p class="mb-6 opacity-90 leading-relaxed">
        This is magic. You can now lazy-load <strong>any component</strong> (chunking the JS bundle) just by wrapping it in a block. 
        You don't need the Router. You don't need complex imports.
    </p>
    <div class="bg-black/30 p-4 rounded-xl font-mono text-sm border border-white/20">
@defer (on viewport) {
  &lt;heavy-chart /&gt;
} @placeholder {
  &lt;div&gt;Scroll down to load chart...&lt;/div&gt;
} @loading {
  &lt;spinner /&gt;
}
    </div>
</div>
`,
  code: `import { Component, signal, delay } from '@angular/core';

@Component({
  selector: 'app-feed',
  standalone: true,
  template: \`
    <div class="max-w-md mx-auto bg-gray-950 min-h-[500px] border border-gray-800 rounded-2xl overflow-hidden flex flex-col">
      <!-- Header -->
      <div class="p-4 bg-gray-900 border-b border-gray-800 flex justify-between items-center sticky top-0 z-10">
        <h2 class="font-bold text-white text-lg">📱 Social Feed</h2>
        <div class="flex gap-2 text-xs">
             <span class="px-2 py-1 rounde bg-blue-500/20 text-blue-400 rounded">&#64;for</span>
             <span class="px-2 py-1 rounde bg-purple-500/20 text-purple-400 rounded">&#64;defer</span>
        </div>
      </div>
      
      <div class="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        @if (isLoading()) {
            <div class="space-y-4 animate-pulse">
                @for(i of [1,2,3]; track i) {
                    <div class="h-32 bg-gray-900 rounded-xl"></div>
                }
            </div>
        } @else {
            
            @for (post of posts(); track post.id) {
                <article class="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden shadow-sm">
                   <div class="p-4">
                        <div class="flex items-center gap-3 mb-3">
                            <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"></div>
                            <div>
                                <h3 class="text-sm font-bold text-gray-200">{{ post.user }}</h3>
                                <p class="text-[10px] text-gray-500">2 hours ago</p>
                            </div>
                        </div>
                        <p class="text-gray-300 text-sm leading-relaxed">{{ post.content }}</p>
                   </div>

                   <!-- ✨ PREVIEW THE MAGIC OF @DEFER ✨ -->
                   <div class="border-t border-gray-800 bg-black/20">
                        @defer (on interaction) {
                            <div class="p-4 space-y-3 bg-gray-800/50 animate-in fade-in slide-in-from-top-2">
                                <p class="text-xs font-bold text-gray-500 uppercase">Comments (Lazy Loaded)</p>
                                <div class="text-sm text-gray-400 italic">"Great post!" - <strong>Alice</strong></div>
                                <div class="text-sm text-gray-400 italic">"Can't wait to see more." - <strong>Bob</strong></div>
                            </div>
                        } @placeholder {
                            <button class="w-full py-3 text-xs font-bold text-gray-500 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                                <span>💬 Load Comments (Click Me)</span>
                            </button>
                        } @loading {
                             <div class="p-4 text-center text-xs text-gray-500">
                                Loading chunk...
                             </div>
                        }
                   </div>
                </article>
            } @empty {
                <div class="text-center py-20 text-gray-500">
                    <p>No posts found!</p>
                </div>
            }

        }
      </div>

      <div class="p-4 border-t border-gray-800 bg-gray-900">
        <button (click)="refresh()" class="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 active:scale-95 transition-all">
            Refresh Feed
        </button>
      </div>
    </div>
  \`
})
export class FeedComponent {
  isLoading = signal(false);
  posts = signal([
    { id: 1, user: 'Alex', content: 'Angular v18 is seriously fast. The new control flow makes templates so much cleaner.' },
    { id: 2, user: 'Sarah', content: 'Just tried @defer for my dashboard charts. Bundles size dropped by 40%! 📉' },
    { id: 3, user: 'Mike', content: 'Signals + @for loop logic inference is mind blowing.' }
  ]);

  constructor() {
    this.refresh();
  }

  refresh() {
    this.isLoading.set(true);
    // Simulate network request
    setTimeout(() => {
        this.isLoading.set(false);
        // Shuffle for fun
        this.posts.update(p => [...p].sort(() => Math.random() - 0.5));
    }, 1500);
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

