export const day04 = {
  day: 4,
  title: "Signals Deep Dive (computed & effect)",
  intro: "Signals are not just variables. They are a reactive graph. Learn how to derive state instantly with `computed` and handle side effects with `effect`.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 4. You know `signal()`. Now let's master the **Dependency Graph**."
      },
      {
        type: "talk",
        message: "The most powerful feature of Signals is `computed()`. It's a read-only signal that updates AUTOMATICALLY when its dependencies change."
      },
      {
        type: "challenge",
        instruction: "Create a `computed` signal called `area` that multiplies `width` and `height`. It should update whenever width/height changes.",
        buggyCode: `width = signal(10);
height = signal(5);

// ❌ Manual updates? No thanks.
area = 50;

updateWidth(w) {
  this.width.set(w);
  this.area = w * this.height(); // 🤮
}`,
        solutionCode: `width = signal(10);
height = signal(5);

// ✅ Derived State (Memoized!)
area = computed(() => this.width() * this.height());`,
        verifyOutput: "computed",
        successMessage: "Correct. `area` is now a live signal. You never manually update it. Angular handles the dependency tracking.",
        hint: "Use `computed(() => this.width() * this.height())`."
      },
      {
        type: "ask",
        question: "When does a `computed()` signal re-calculate?",
        options: [
          "Every 100ms",
          "Every time you read it",
          "Only when its dependencies change (and it's read)",
          "Never"
        ],
        correctAnswer: "Only when its dependencies change (and it's read)",
        feedback: {
          success: "Yes! It is lazy and memoized. If dependencies haven't changed, it returns the cached value instantly.",
          error: "It's smarter than that. It uses 'memoization' (caching)."
        }
      }
    ]
  },
  content: `
<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🧠 Deep Dive: The Signal Graph</h3>

<div class="bg-gray-50 dark:bg-gray-900/30 p-6 rounded-xl border border-gray-200 dark:border-gray-800 mb-8">
  <h4 class="font-bold text-lg mb-4 text-gray-800 dark:text-gray-200">The "Glitch-Free" Guarantee</h4>
  <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
    One of the hardest things in reactive programming (like RxJS) is the "Diamond Problem" — where a value updates via two different paths, causing a temporary incorrect state (a "glitch").
  </p>
  <div class="grid grid-cols-2 gap-4 text-xs font-mono">
    <div class="bg-red-100 dark:bg-red-900/20 p-3 rounded">
        <strong>RxJS / Streams (Push)</strong><br>
        1. A changes<br>
        2. B updates from A<br>
        3. C updates from A (reads old B??)<br>
        4. C updates from B logic<br>
        <span class="text-red-600 dark:text-red-400 font-bold">⚠️ Possible Glitch</span>
    </div>
    <div class="bg-green-100 dark:bg-green-900/20 p-3 rounded">
        <strong>Signals (Push/Pull)</strong><br>
        1. A changes<br>
        2. Mark B & C as "Dirty"<br>
        3. Read C?<br>
        4. C pulls new A & B values lazily.<br>
        <span class="text-green-600 dark:text-green-400 font-bold">✅ Glitch Free</span>
    </div>
  </div>
</div>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">⚡ Advanced Patterns</h3>

<div class="space-y-6 mb-10">
    <!-- Pattern 1 -->
    <div class="flex gap-4">
        <div class="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center shrink-0">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
        </div>
        <div>
            <h5 class="font-bold text-gray-900 dark:text-white mb-1">Effect Cleanup</h5>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Effects can return a cleanup function. Useful for timers or subscriptions.
            </p>
            <div class="mt-2 bg-gray-100 dark:bg-black/40 p-2 rounded text-xs font-mono text-gray-700 dark:text-gray-300">
                effect((onCleanup) => {<br>
                &nbsp;&nbsp;const timer = setInterval(...)<br>
                &nbsp;&nbsp;onCleanup(() => clearInterval(timer));<br>
                });
            </div>
        </div>
    </div>

    <!-- Pattern 2 -->
    <div class="flex gap-4">
        <div class="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center shrink-0">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 12l-4-4-4 4"/><path d="M12 16V8"/></svg>
        </div>
        <div>
            <h5 class="font-bold text-gray-900 dark:text-white mb-1">Equality Functions</h5>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                By default, signals use <code>===</code>. If you mutate an array/object, it won't trigger updates. You can pass a custom equality check.
            </p>
            <div class="mt-2 bg-gray-100 dark:bg-black/40 p-2 rounded text-xs font-mono text-gray-700 dark:text-gray-300">
                signal({ id: 1 }, { equal: _.isEqual });
            </div>
        </div>
    </div>
</div>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">⚠️ When NOT to use Signals</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Signals are for <strong>synchronous UI state</strong>. They are NOT a replacement for RxJS when dealing with:
</p>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-8">
    <li>Race conditions (debounce, throttle, switchMap)</li>
    <li>Complex event streams (WebSocket messages, drag-and-drop coordination)</li>
</ul>
<p class="text-sm text-gray-500 italic bg-yellow-50 dark:bg-yellow-900/10 p-3 rounded-lg border border-yellow-200 dark:border-yellow-900/30">
    <strong>Best Practice:</strong> Use RxJS for Events, Use Signals for State.
</p>
`,
  code: `import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  template: \`
    <div class="max-w-md mx-auto p-6 bg-white dark:bg-gray-950 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">🛍️ Reactive Cart</h2>
        <span class="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs font-mono rounded text-gray-500">v1.0</span>
      </div>

      <!-- Product Row -->
      <div class="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl mb-6">
        <div class="flex justify-between items-start mb-4">
             <div>
                <h3 class="font-bold text-gray-900 dark:text-gray-200">Titanium Watch</h3>
                <p class="text-sm text-gray-500">Premium Series</p>
             </div>
             <p class="font-mono font-bold text-lg dark:text-white">\${{ price() }}</p>
        </div>

        <div class="flex items-center justify-between bg-white dark:bg-black rounded-lg p-2 border border-gray-200 dark:border-gray-800">
            <button (click)="updateQty(-1)" class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 font-bold transition-colors">-</button>
            <span class="font-mono font-bold w-8 text-center dark:text-white">{{ qty() }}</span>
            <button (click)="updateQty(1)" class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 font-bold transition-colors">+</button>
        </div>
      </div>

      <!-- Totals Section -->
      <div class="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-800">
        <div class="flex justify-between text-sm text-gray-500">
            <span>Subtotal</span>
            <span>\${{ subtotal() }}</span>
        </div>
        <div class="flex justify-between text-sm text-gray-500">
            <span>Tax (10%)</span>
            <span>\${{ tax() }}</span>
        </div>
         <div class="flex justify-between text-sm text-green-600 font-medium">
            <span>Discount (Qty > 5)</span>
            <span>-\${{ discount() }}</span>
        </div>
        
        <div class="flex justify-between items-center pt-3 mt-3 border-t border-dashed border-gray-200 dark:border-gray-800 text-xl font-bold text-gray-900 dark:text-white">
            <span>Total</span>
            <span>\${{ total() }}</span>
        </div>
      </div>
      
      <div class="mt-6 p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg border border-yellow-100 dark:border-yellow-900/30 text-xs text-yellow-700 dark:text-yellow-400 flex gap-2">
        <span>💡</span>
        <p>Open console! <code>effect()</code> is logging changes automatically.</p>
      </div>
      
      <div class="grid grid-cols-2 gap-3 mt-6">
         <button (click)="randomizePrice()" class="py-2 px-4 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">Random Price</button>
         <button (click)="reset()" class="py-2 px-4 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">Reset</button>
      </div>
    </div>
  \`
})
export class CartComponent {
  price = signal(150);
  qty = signal(1);

  // ⛓️ The Reactive Chain
  // Notice: We NEVER manually set these. They update simply because 'qty' or 'price' changed.
  subtotal = computed(() => this.price() * this.qty());
  tax = computed(() => this.subtotal() * 0.1);
  discount = computed(() => this.qty() > 5 ? this.subtotal() * 0.2 : 0);
  
  total = computed(() => this.subtotal() + this.tax() - this.discount());

  constructor() {
    // 🔥 Side Effect
    effect(() => {
      // Automatic Logging whenever TOTAL changes
      console.log(\`🧾 Cart Updated: Items: \${this.qty()} | Total: $\${this.total().toFixed(2)}\`);
      
      if (this.qty() > 5) {
          console.log("🎉 Bulk discount applied!");
      }
    });
  }

  updateQty(delta) {
    this.qty.update(q => Math.max(0, q + delta));
  }
  
  randomizePrice() {
     this.price.set(Math.floor(Math.random() * 200) + 50);
  }

  reset() {
      this.qty.set(1);
      this.price.set(150);
  }
}`,
  comparison: {
    junior: `// ❌ Manual syncing
updateQty(q) {
  this.qty = q;
  this.calculateTotal(); // Easy to forget call
}

calculateTotal() {
  this.total = this.price * this.qty;
}`,
    senior: `// ✅ Automatic & Reactive
total = computed(() => this.price() * this.qty());
// Angular guarantees this is always correct.`
  },
  interview: {
    questions: [
      {
        q: "What is the difference between computed() and effect()?",
        a: "computed() creates a new signal (derived state). effect() performs a side effect (like logging or DOM manipulation) and returns nothing."
      },
      {
        q: "Are computed signals writable?",
        a: "No. They are read-only. Their value is derived solely from other signals."
      }
    ]
  }
};
