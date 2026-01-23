export const day10 = {
  day: 10,
  title: "State Management: Signals vs Services vs Stores",
  intro: "State is the hardest part of any app. Learn when to use Signals, when to use Services, and when you need a full store.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 10. **State Management** is about answering: Where does this data live? Who can change it? How do components sync?"
      },
      {
        type: "talk",
        message: "Modern Angular has 3 levels: **Local state** (Signals), **Feature state** (Services), **Global state** (Stores like NgRx/SignalStore)."
      },
      {
        type: "challenge",
        instruction: "This component stores cart state locally. Refactor it to use a shared CartService so multiple components can access the same cart.",
        buggyCode: `// ❌ Local state (lost when component destroys)
@Component({ ... })
export class ProductList {
  cart = signal<Product[]>([]);
  
  addToCart(product: Product) {
    this.cart.update(items => [...items, product]);
  }
}`,
        solutionCode: `// ✅ Shared service (persists across components)
@Injectable({ providedIn: 'root' })
export class CartService {
  cart = signal<Product[]>([]);
  
  addToCart(product: Product) {
    this.cart.update(items => [...items, product]);
  }
}

@Component({ ... })
export class ProductList {
  cartService = inject(CartService);
  
  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}`,
        verifyOutput: "CartService",
        successMessage: "Perfect! Now the cart state is shared across all components. Add from ProductList, display in CartWidget.",
        hint: "Create a service with providedIn: 'root' and move the signal there."
      },
      {
        type: "ask",
        question: "When should you use a global store (NgRx/SignalStore) instead of services?",
        options: [
          "Always, stores are always better",
          "When you need time-travel debugging, complex state logic, or strict state immutability",
          "Never, services are enough",
          "Only for authentication"
        ],
        correctAnswer: "When you need time-travel debugging, complex state logic, or strict state immutability",
        feedback: {
          success: "Exactly! Stores add complexity. Use them when you need their features: devtools, middleware, strict patterns.",
          error: "Think about trade-offs. Stores are powerful but add boilerplate. Start simple with services."
        }
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 1. The State Hierarchy</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Choose the right level for your state:
</p>

<div class="space-y-4 mb-8">
  <div class="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl">
    <h4 class="font-bold text-blue-700 dark:text-blue-400 mb-2">🔹 Local State (Component Signals)</h4>
    <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">
      <strong>When:</strong> UI state that only this component cares about (toggle, form input, loading)
    </p>
    <code class="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">isOpen = signal(false);</code>
  </div>

  <div class="p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-xl">
    <h4 class="font-bold text-green-700 dark:text-green-400 mb-2">🔸 Feature State (Services)</h4>
    <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">
      <strong>When:</strong> State shared across multiple components in a feature (cart, user profile)
    </p>
    <code class="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">@Injectable({ providedIn: 'root' })</code>
  </div>

  <div class="p-4 bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800 rounded-xl">
    <h4 class="font-bold text-purple-700 dark:text-purple-400 mb-2">🔶 Global State (Stores)</h4>
    <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">
      <strong>When:</strong> Complex state logic, time-travel debugging, or strict immutability needed
    </p>
    <code class="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">NgRx, SignalStore, Akita</code>
  </div>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ 2. Service-Based State Pattern</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
The sweet spot for most apps: Services with Signals.
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-green-500">
<pre class="text-gray-800 dark:text-gray-100">
@Injectable({ providedIn: 'root' })
export class TodoService {
  // Private state
  private _todos = signal&lt;Todo[]&gt;([]);
  
  // Public read-only
  todos = this._todos.asReadonly();
  
  // Computed
  completed = computed(() => 
    this._todos().filter(t => t.done).length
  );
  
  // Actions
  add(todo: Todo) {
    this._todos.update(list => [...list, todo]);
  }
}
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔥 3. The Container/Presentational Pattern</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Separate smart (container) components from dumb (presentational) components.
</p>

<div class="grid md:grid-cols-2 gap-4 mb-8">
  <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl border-l-4 border-blue-500">
    <h4 class="font-bold text-gray-900 dark:text-white mb-2">Container (Smart)</h4>
    <ul class="text-sm space-y-1 text-gray-700 dark:text-gray-300">
      <li>✅ Injects services</li>
      <li>✅ Manages state</li>
      <li>✅ Handles business logic</li>
      <li>✅ Passes data via @Input</li>
    </ul>
  </div>
  <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl border-l-4 border-green-500">
    <h4 class="font-bold text-gray-900 dark:text-white mb-2">Presentational (Dumb)</h4>
    <ul class="text-sm space-y-1 text-gray-700 dark:text-gray-300">
      <li>✅ Receives data via @Input</li>
      <li>✅ Emits events via @Output</li>
      <li>❌ No service injection</li>
      <li>❌ No HTTP calls</li>
    </ul>
  </div>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚠️ Common Mistakes</h3>
<div class="grid md:grid-cols-2 gap-4 mb-8">
  <div class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl">
    <h4 class="font-bold text-red-700 dark:text-red-400 mb-2">Prop Drilling Hell</h4>
    <p class="text-sm text-gray-700 dark:text-gray-300">Passing data through 5 levels of components. Use a service instead.</p>
  </div>
  <div class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl">
    <h4 class="font-bold text-red-700 dark:text-red-400 mb-2">Premature Store Adoption</h4>
    <p class="text-sm text-gray-700 dark:text-gray-300">Adding NgRx on day 1. Start with services, upgrade when needed.</p>
  </div>
</div>
`,
  code: `import { Component, Injectable, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CartItem {
  id: number;
  name: string;
  price: number;
}

// Service-based state management
@Injectable({ providedIn: 'root' })
export class CartService {
  private _items = signal<CartItem[]>([]);
  
  // Public read-only
  items = this._items.asReadonly();
  
  // Computed values
  total = computed(() => 
    this._items().reduce((sum, item) => sum + item.price, 0)
  );
  
  count = computed(() => this._items().length);
  
  // Actions
  addItem(item: CartItem) {
    this._items.update(items => [...items, item]);
    console.log(\`🛒 Added to cart: \${item.name} ($\${item.price})\`);
  }
  
  clear() {
    this._items.set([]);
    console.log('🗑️ Cart cleared');
  }
}

@Component({
  selector: 'app-store-demo',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div class="p-6 bg-gray-900 text-white rounded-xl">
      <h2 class="text-2xl font-bold mb-6">🛒 State Management Demo</h2>
      
      <!-- Cart Summary -->
      <div class="mb-6 p-4 bg-gray-800 rounded-xl border border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold">Shopping Cart</h3>
          <span class="px-3 py-1 bg-blue-600 rounded-full text-sm">
            {{ cart.count() }} items
          </span>
        </div>
        
        @if (cart.items().length > 0) {
          <div class="space-y-2 mb-4">
            @for (item of cart.items(); track item.id) {
              <div class="flex justify-between text-sm p-2 bg-gray-700 rounded">
                <span>{{ item.name }}</span>
                <span class="text-green-400">\${{ item.price }}</span>
              </div>
            }
          </div>
          
          <div class="flex items-center justify-between pt-4 border-t border-gray-700">
            <span class="font-bold">Total:</span>
            <span class="text-2xl font-bold text-green-400">\${{ cart.total() }}</span>
          </div>
          
          <button
            (click)="cart.clear()"
            class="mt-4 w-full px-4 py-2 bg-red-600 rounded hover:bg-red-500"
          >
            Clear Cart
          </button>
        } @else {
          <p class="text-gray-500 text-center py-4">Cart is empty</p>
        }
      </div>

      <!-- Product List -->
      <div class="space-y-3">
        <h3 class="text-lg font-bold mb-3">Available Products</h3>
        @for (product of products; track product.id) {
          <button
            (click)="cart.addItem(product)"
            class="w-full text-left p-4 bg-gray-800 rounded-xl border border-gray-700 hover:border-blue-500 transition"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="font-bold">{{ product.name }}</p>
                <p class="text-sm text-gray-400">\${{ product.price }}</p>
              </div>
              <span class="text-2xl">➕</span>
            </div>
          </button>
        }
      </div>

      <div class="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
        <p class="text-xs text-blue-400 mb-2">💡 State Management Pattern</p>
        <p class="text-sm text-gray-300">
          Cart state lives in <code class="text-yellow-400">CartService</code> (singleton).
          Multiple components can inject and share the same state.
        </p>
      </div>
    </div>
  \`
})
export class StoreDemoComponent {
  cart = inject(CartService);
  
  products: CartItem[] = [
    { id: 1, name: 'Angular Course', price: 99 },
    { id: 2, name: 'RxJS Mastery', price: 79 },
    { id: 3, name: 'TypeScript Pro', price: 59 }
  ];

  constructor() {
    console.log('--- 🛒 State Management Demo ---');
    console.log('Cart is managed by a singleton service');
    
    setTimeout(() => {
      console.log('▶️ Auto-adding first product...');
      this.cart.addItem(this.products[0]);
    }, 1000);
    
    setTimeout(() => {
      console.log('▶️ Adding second product...');
      this.cart.addItem(this.products[1]);
    }, 2000);
  }
}`,
  comparison: {
    junior: `// ❌ Component state (lost on destroy)
export class ProductList {
  cart = signal<Product[]>([]);
}

export class CartWidget {
  cart = signal<Product[]>([]); // Different instance!
}`,
    senior: `// ✅ Service state (shared singleton)
@Injectable({ providedIn: 'root' })
export class CartService {
  cart = signal<Product[]>([]);
}

// Both components inject the same instance
export class ProductList {
  cart = inject(CartService);
}`
  },
  interview: {
    questions: [
      {
        q: "What's the difference between a service and a store (NgRx)?",
        a: "Services are simple classes with methods. Stores add patterns: actions, reducers, effects, time-travel debugging. Use services first, stores when complexity demands it."
      },
      {
        q: "How do you prevent direct state mutation in a service?",
        a: "Use signal.asReadonly() for public exposure. Keep the writable signal private. Only expose actions (methods) to modify state."
      },
      {
        q: "When should state be in a component vs a service?",
        a: "Component: UI-only state (modal open, form dirty). Service: Shared state (user profile, cart, feature data)."
      }
    ]
  }
};
