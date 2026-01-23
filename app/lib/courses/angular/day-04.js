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
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🧠 1. Computed: The "Smart" Value</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
In the past, we manually updated state. 
</p>
<div class="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl mb-4 text-xs font-mono">
// ❌ Imperative (The Old Way)
updateUser(name) {
  this.user.name = name;
  this.fullName = name + ' ' + this.user.lastName; // Easy to forget!
}
</div>
<p class="mb-6 text-gray-600 dark:text-light-300">
With <code>computed()</code>, state is <strong>Declarative</strong>. You define <i>what</i> it is, not <i>when</i> to change it.
</p>
<div class="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl mb-8 text-xs font-mono">
// ✅ Declarative (The New Way)
fullName = computed(() => this.firstName() + ' ' + this.lastName());
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ 2. Effect: The "Escape Hatch"</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Sometimes you need to do something <strong>outside</strong> the signal graph. Like logging to console, saving to localStorage, or manipulating the DOM manually.
</p>
<p class="mb-4 text-gray-600 dark:text-light-300">
Use <code>effect()</code> for this. It runs automatically whenever any signal it reads changes.
</p>
<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-purple-500">
<pre class="text-gray-800 dark:text-gray-100">
constructor() {
  effect(() => {
    // Runs whenever count() changes
    console.log('Count changed to:', this.count());
    localStorage.setItem('count', this.count());
  });
}
</pre>
</div>
`,
  code: `import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  template: \`
    <div class="p-6 bg-gray-900 text-white rounded-xl">
      <h2 class="text-2xl font-bold mb-6">🛒 Reactive Cart</h2>

      <div class="flex gap-4 mb-6">
        <div class="p-4 bg-gray-800 rounded-lg">
          <p class="text-gray-400 text-xs uppercase">Price</p>
          <p class="text-2xl font-mono">\${{ price() }}</p>
          <button (click)="changePrice()" class="text-xs text-blue-400 mt-2">Change Price</button>
        </div>
        <div class="p-4 bg-gray-800 rounded-lg">
          <p class="text-gray-400 text-xs uppercase">Quantity</p>
          <div class="flex items-center gap-2">
            <button (click)="updateQty(-1)" class="px-2 bg-gray-700 rounded">-</button>
            <span class="text-2xl font-mono">{{ qty() }}</span>
            <button (click)="updateQty(1)" class="px-2 bg-gray-700 rounded">+</button>
          </div>
        </div>
      </div>

      <div class="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
        <p class="text-green-400 text-xs uppercase font-bold">Total (Computed)</p>
        <p class="text-4xl font-bold text-green-400">\${{ total() }}</p>
      </div>
      
      <p class="mt-4 text-xs text-gray-500">
        Check console! <code>effect()</code> is logging changes.
      </p>
    </div>
  \`
})
export class CartComponent {
  price = signal(100);
  qty = signal(1);

  // Computed: Derived state
  total = computed(() => this.price() * this.qty());

  constructor() {
    // Effect: Side effects (Logging)
    effect(() => {
      console.log('Cart Update: ' + this.qty() + ' items @ $' + this.price() + ' = $' + this.total());
    });

    console.log("--- 🛒 Auto-Shopping Spree ---");
    setTimeout(() => {
        console.log("▶️ Adding item...");
        this.updateQty(1);
    }, 1000);

    setTimeout(() => {
        console.log("▶️ Price hike!");
        this.changePrice();
    }, 2000);
  }

  updateQty(delta) {
    this.qty.update(q => Math.max(0, q + delta));
  }
  
  changePrice() {
    this.price.set(Math.floor(Math.random() * 100) + 50);
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
