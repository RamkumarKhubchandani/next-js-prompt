export const signalStoreMastery = {
  title: "Signal-Store Mastery: Is NgRx Dead in the Age of Signals?",
  description: "NgRx was the king of Angular state management. But Signals and the new Signal Store offer a lighter, less boilerplate-heavy alternative. A controversial look at the future of state.",
  slug: "signal-store-mastery",
  publishedAt: "2025-12-30T19:12:27+05:30",
  category: "Angular",
  type: "static",
  author: "Angular GDE",
  createdAt: new Date().toISOString(),
  readTime: "45 min read",
  difficulty: "Advanced",
  image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
  tags: ["Angular", "Signals", "NgRx", "State Management", "Signal Store"],
  keywords: ["NgRx Signal Store", "ngrx vs signals", "Angular State Management", "Redux Pattern", "Boilerplate"],
  toc: [
    { id: "evolution", label: "01. The Evolution of State" },
    { id: "why-signals", label: "02. Why Signals?" },
    { id: "boilerplate", label: "03. The Boilerplate Problem" },
    { id: "signal-store", label: "04. The Signal Store" },
    { id: "comparison", label: "05. Code Comparison" },
    { id: "real-world", label: "06. Real-World Examples" },
    { id: "advanced-patterns", label: "07. Advanced Patterns" },
    { id: "architecture", label: "08. When to use what?" },
    { id: "senior-verdict", label: "09. Senior Engineer's Verdict" }
  ],
  content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. Evolution -->
        <section id="evolution" class="scroll-mt-32">
             <div class="border-l-8 border-pink-600 bg-pink-50 dark:bg-pink-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    From Services to Signals:<br/>
                    <span class="text-pink-600">The State Management Journey</span>
                </h1>
                <p class="text-xl md:text-2xl text-pink-800 dark:text-pink-200 font-light leading-relaxed">
                    Angular's state management has evolved through three distinct eras. Understanding this evolution is key to knowing why Signals are revolutionary.
                </p>
             </div>

             <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <h3 class="font-bold text-2xl text-gray-900 dark:text-white mt-8 mb-4">Era 1: Services with BehaviorSubject (2016-2020)</h3>
                <p>
                    The original pattern. Simple, but required manual subscription management and led to memory leaks if you forgot to unsubscribe.
                </p>
             </div>

             <div class="bg-gray-900 p-6 rounded-xl mb-8">
                <div class="text-gray-400 mb-2 text-xs uppercase font-bold">The Old Way: BehaviorSubject</div>
                <pre class="text-sm text-gray-300 overflow-x-auto"><code>// user.service.ts
@Injectable({ providedIn: 'root' })
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  setUser(user: User) {
    this.userSubject.next(user);
  }
}

// component.ts
export class ProfileComponent implements OnInit, OnDestroy {
  user: User | null = null;
  private destroy$ = new Subject<void>();

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => this.user = user);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}</code></pre>
             </div>

             <div class="bg-red-50 dark:bg-red-900/10 p-6 rounded-xl border border-red-200 dark:border-red-900/30 mb-8">
                 <h4 class="font-bold text-red-900 dark:text-red-100 mb-2">Problems with BehaviorSubject</h4>
                 <ul class="text-sm text-red-800 dark:text-red-200 space-y-2">
                    <li>✖ Manual subscription management</li>
                    <li>✖ Easy to create memory leaks</li>
                    <li>✖ Boilerplate for every subscription</li>
                    <li>✖ No type safety on updates</li>
                    <li>✖ Difficult to compose derived state</li>
                 </ul>
            </div>

             <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <h3 class="font-bold text-2xl text-gray-900 dark:text-white mt-8 mb-4">Era 2: NgRx Store (2017-2024)</h3>
                <p>
                    Redux pattern brought predictability and time-travel debugging. But at what cost? Actions, Reducers, Effects, Selectors—a simple counter required 5 files.
                </p>
             </div>

             <div class="bg-gray-900 p-6 rounded-xl mb-8">
                <div class="text-gray-400 mb-2 text-xs uppercase font-bold">NgRx: The Ceremony</div>
                <pre class="text-sm text-gray-300 overflow-x-auto"><code>// 1. actions.ts
export const loadUser = createAction('[User] Load User');
export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ user: User }>()
);

// 2. reducer.ts
export const userReducer = createReducer(
  initialState,
  on(loadUserSuccess, (state, { user }) => ({ ...state, user }))
);

// 3. effects.ts
@Injectable()
export class UserEffects {
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      switchMap(() => this.userService.getUser()),
      map(user => loadUserSuccess({ user }))
    )
  );
}

// 4. selectors.ts
export const selectUser = createSelector(
  selectUserState,
  (state) => state.user
);

// 5. component.ts
export class ProfileComponent {
  user$ = this.store.select(selectUser);
  
  constructor(private store: Store) {}
  
  loadUser() {
    this.store.dispatch(loadUser());
  }
}</code></pre>
             </div>
        </section>

        <!-- 02. Why Signals -->
        <section id="why-signals" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-pink-600 dark:text-pink-500">02.</span>
                Why Signals? The Reactive Revolution
            </h2>

            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <p>
                    Signals solve the fundamental problems of both approaches:
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-200 dark:border-blue-900/30">
                    <h4 class="font-bold text-blue-900 dark:text-blue-100 mb-3">🎯 No Subscriptions</h4>
                    <p class="text-sm text-gray-700 dark:text-gray-300">
                        Signals are synchronous. No <code>subscribe()</code>, no <code>async pipe</code>, no memory leaks. Just read the value.
                    </p>
                </div>
                <div class="bg-purple-50 dark:bg-purple-900/10 p-6 rounded-xl border border-purple-200 dark:border-purple-900/30">
                    <h4 class="font-bold text-purple-900 dark:text-purple-100 mb-3">⚡ Fine-Grained Updates</h4>
                    <p class="text-sm text-gray-700 dark:text-gray-300">
                        Only components reading a changed signal re-render. No Zone.js walking the entire tree.
                    </p>
                </div>
                <div class="bg-green-50 dark:bg-green-900/10 p-6 rounded-xl border border-green-200 dark:border-green-900/30">
                    <h4 class="font-bold text-green-900 dark:text-green-100 mb-3">🔒 Type Safe</h4>
                    <p class="text-sm text-gray-700 dark:text-gray-300">
                        TypeScript infers types automatically. No manual type guards or casting needed.
                    </p>
                </div>
            </div>

            <div class="bg-gray-900 p-6 rounded-xl mb-8">
                <div class="text-gray-400 mb-2 text-xs uppercase font-bold">Signals: The Modern Way</div>
                <pre class="text-sm text-gray-300 overflow-x-auto"><code>// user.service.ts
@Injectable({ providedIn: 'root' })
export class UserService {
  // ✅ Signal instead of BehaviorSubject
  private _user = signal<User | null>(null);
  user = this._user.asReadonly();

  setUser(user: User) {
    this._user.set(user);
  }
}

// component.ts
export class ProfileComponent {
  // ✅ No subscription needed!
  user = inject(UserService).user;

  // ✅ Computed values are automatic
  displayName = computed(() => {
    const user = this.user();
    return user ? \\\`\${user.firstName} \${user.lastName}\\\` : 'Guest';
  });
}

// template
<div>
  <h1>Welcome, {{ displayName() }}</h1>
  <p>Email: {{ user()?.email }}</p>
</div></code></pre>
             </div>

             <div class="bg-green-50 dark:bg-green-900/10 p-6 rounded-xl border border-green-200 dark:border-green-900/30">
                 <h4 class="font-bold text-green-900 dark:text-green-100 mb-2">What Changed?</h4>
                 <ul class="text-sm text-green-800 dark:text-green-200 space-y-2">
                    <li>✔ No <code>ngOnInit</code> or <code>ngOnDestroy</code></li>
                    <li>✔ No <code>takeUntil</code> or <code>async pipe</code></li>
                    <li>✔ No manual subscription tracking</li>
                    <li>✔ Computed values update automatically</li>
                    <li>✔ Type-safe by default</li>
                 </ul>
            </div>
        </section>

        <!-- 03. The Boilerplate -->
        <section id="boilerplate" class="scroll-mt-32">
             <div class="border-l-8 border-pink-600 bg-pink-50 dark:bg-pink-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    Actions. Reducers. Selectors. Effects. <br/>
                    <span class="text-pink-600">Enough.</span>
                </h1>
                <p class="text-xl md:text-2xl text-pink-800 dark:text-pink-200 font-light leading-relaxed">
                    NgRx implemented the Redux pattern perfectly. Too perfectly. For 90% of apps, the indirection was overkill.
                    <br/><br/>
                    The <strong>Signal Store</strong> (@ngrx/signals) is the answer. It combines the structure of NgRx with the simplicity of Signals, stripping away the ritualistic boilerplate.
                </p>
             </div>
        </section>

        <!-- 04. The Signal Store -->
        <section id="signal-store" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-pink-600 dark:text-pink-500">04.</span>
                The Signal Store: Functional Composition
            </h2>
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <p>
                    The Signal Store is defined functionally. You compose features together. Need entities? Add <code>withEntities</code>. Need a computed value? Add <code>withComputed</code>.
                </p>
            </div>

             <div class="bg-gray-900 p-6 rounded-xl mb-8">
                <div class="text-gray-400 mb-2 text-xs uppercase font-bold">Basic Signal Store</div>
                <pre class="text-sm text-gray-300 overflow-x-auto"><code>import { signalStore, withState, withMethods, withComputed } from '@ngrx/signals';
import { computed } from '@angular/core';

export const CounterStore = signalStore(
  { providedIn: 'root' },
  
  // 1. Define state
  withState({ count: 0 }),
  
  // 2. Add computed values
  withComputed(({ count }) => ({
    doubleCount: computed(() => count() * 2),
    isEven: computed(() => count() % 2 === 0)
  })),
  
  // 3. Add methods
  withMethods((store) => ({
    increment() {
      patchState(store, { count: store.count() + 1 });
    },
    decrement() {
      patchState(store, { count: store.count() - 1 });
    },
    reset() {
      patchState(store, { count: 0 });
    }
  }))
);

// Usage in component
@Component({
  selector: 'app-counter',
  standalone: true,
  template: \\\`
    <div>
      <p>Count: {{ store.count() }}</p>
      <p>Double: {{ store.doubleCount() }}</p>
      <p>Is Even: {{ store.isEven() }}</p>
      
      <button (click)="store.increment()">+</button>
      <button (click)="store.decrement()">-</button>
      <button (click)="store.reset()">Reset</button>
    </div>
  \\\`
})
export class CounterComponent {
  store = inject(CounterStore);
}</code></pre>
             </div>

             <div class="bg-gray-900 p-6 rounded-xl mb-8">
                <div class="text-gray-400 mb-2 text-xs uppercase font-bold">Entity Management with withEntities</div>
                <pre class="text-sm text-gray-300 overflow-x-auto"><code>import { signalStore, withState, withEntities, withMethods } from '@ngrx/signals';
import { setAllEntities, addEntity, updateEntity, removeEntity } from '@ngrx/signals/entities';

interface Book {
  id: string;
  title: string;
  author: string;
}

export const BooksStore = signalStore(
  { providedIn: 'root' },
  
  withState({ loading: false, query: '' }),
  
  // ✅ Entities feature adds: entities, ids, entityMap
  withEntities<Book>(),
  
  withMethods((store, bookService = inject(BookService)) => ({
    async loadByQuery(query: string) {
      patchState(store, { loading: true, query });
      
      const books = await bookService.search(query);
      
      patchState(
        store, 
        setAllEntities(books),
        { loading: false }
      );
    },
    
    addBook(book: Book) {
      patchState(store, addEntity(book));
    },
    
    updateBook(id: string, changes: Partial<Book>) {
      patchState(store, updateEntity({ id, changes }));
    },
    
    removeBook(id: string) {
      patchState(store, removeEntity(id));
    }
  }))
);

// Usage
@Component({
  selector: 'app-books',
  standalone: true,
  template: \\\`
    <input 
      [value]="store.query()" 
      (input)="store.loadByQuery($any($event.target).value)"
    />
    
    @if (store.loading()) {
      <p>Loading...</p>
    }
    
    @for (book of store.entities(); track book.id) {
      <div>
        <h3>{{ book.title }}</h3>
        <p>by {{ book.author }}</p>
        <button (click)="store.removeBook(book.id)">Delete</button>
      </div>
    }
  \\\`
})
export class BooksComponent {
  store = inject(BooksStore);
}</code></pre>
             </div>
        </section>

        <!-- 05. Comparison -->
        <section id="comparison" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-pink-600 dark:text-pink-500">05.</span>
                NgRx Classic vs Signal Store: Side by Side
            </h2>

            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <p>
                    Let's implement the same feature (a shopping cart) in both approaches:
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div class="p-6 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                     <h3 class="text-xl font-bold text-gray-600 dark:text-gray-400 mb-4">Classic NgRx (5 files)</h3>
                     <div class="space-y-4 text-xs">
                        <div class="bg-white dark:bg-black p-3 rounded">
                            <div class="font-bold mb-1">cart.actions.ts (40 lines)</div>
                            <code class="text-gray-500">addToCart, removeFromCart, clearCart...</code>
                        </div>
                        <div class="bg-white dark:bg-black p-3 rounded">
                            <div class="font-bold mb-1">cart.reducer.ts (60 lines)</div>
                            <code class="text-gray-500">on(addToCart, (state, { item }) => ...)</code>
                        </div>
                        <div class="bg-white dark:bg-black p-3 rounded">
                            <div class="font-bold mb-1">cart.selectors.ts (30 lines)</div>
                            <code class="text-gray-500">selectCartItems, selectTotal...</code>
                        </div>
                        <div class="bg-white dark:bg-black p-3 rounded">
                            <div class="font-bold mb-1">cart.effects.ts (50 lines)</div>
                            <code class="text-gray-500">saveToLocalStorage$, loadFromStorage$...</code>
                        </div>
                        <div class="bg-white dark:bg-black p-3 rounded">
                            <div class="font-bold mb-1">cart.component.ts (40 lines)</div>
                            <code class="text-gray-500">dispatch, select, async pipe...</code>
                        </div>
                     </div>
                     <div class="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded text-red-700 dark:text-red-300 font-bold text-sm">
                        Total: ~220 lines across 5 files
                     </div>
                </div>
                <div class="p-6 rounded-xl bg-pink-50 dark:bg-pink-900/10 border border-pink-200 dark:border-pink-900/30">
                     <h3 class="text-xl font-bold text-pink-600 dark:text-pink-400 mb-4">Signal Store (1 file)</h3>
                     <div class="bg-gray-900 p-3 rounded text-xs overflow-x-auto">
                        <pre class="text-gray-300"><code>export const CartStore = signalStore(
  { providedIn: 'root' },
  withEntities<CartItem>(),
  
  withComputed(({ entities }) => ({
    total: computed(() => 
      entities().reduce((sum, item) => 
        sum + item.price * item.quantity, 0
      )
    ),
    itemCount: computed(() => 
      entities().reduce((sum, item) => 
        sum + item.quantity, 0
      )
    )
  })),
  
  withMethods((store) => ({
    addItem(item: CartItem) {
      patchState(store, addEntity(item));
      localStorage.setItem('cart', 
        JSON.stringify(store.entities())
      );
    },
    removeItem(id: string) {
      patchState(store, removeEntity(id));
    },
    clear() {
      patchState(store, setAllEntities([]));
    }
  }))
);</code></pre>
                     </div>
                     <div class="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded text-green-700 dark:text-green-300 font-bold text-sm">
                        Total: ~35 lines in 1 file
                     </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div class="p-6 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                     <h3 class="text-xl font-bold text-gray-600 dark:text-gray-400 mb-4">Classic NgRx</h3>
                     <ul class="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                        <li class="flex items-center gap-2"><span class="text-red-500">✖</span> 4-5 files per feature</li>
                        <li class="flex items-center gap-2"><span class="text-red-500">✖</span> String-based Action Types</li>
                        <li class="flex items-center gap-2"><span class="text-red-500">✖</span> Effects allow hidden logic</li>
                        <li class="flex items-center gap-2"><span class="text-red-500">✖</span> High learning curve</li>
                        <li class="flex items-center gap-2"><span class="text-red-500">✖</span> Async pipe everywhere</li>
                     </ul>
                </div>
                <div class="p-6 rounded-xl bg-pink-50 dark:bg-pink-900/10 border border-pink-200 dark:border-pink-900/30">
                     <h3 class="text-xl font-bold text-pink-600 dark:text-pink-400 mb-4">Signal Store</h3>
                     <ul class="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                        <li class="flex items-center gap-2"><span class="text-green-500">✔</span> Single file definition</li>
                        <li class="flex items-center gap-2"><span class="text-green-500">✔</span> Direct method calls</li>
                        <li class="flex items-center gap-2"><span class="text-green-500">✔</span> Extensible via custom features</li>
                        <li class="flex items-center gap-2"><span class="text-green-500">✔</span> Type-safe by default</li>
                        <li class="flex items-center gap-2"><span class="text-green-500">✔</span> No subscriptions needed</li>
                     </ul>
                </div>
            </div>
        </section>

        <!-- 06. Real-World Examples -->
        <section id="real-world" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-pink-600 dark:text-pink-500">06.</span>
                Real-World Examples
            </h2>

            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <h3 class="font-bold text-2xl text-gray-900 dark:text-white mt-8 mb-4">Example 1: Todo App with Filtering</h3>
            </div>

            <div class="bg-gray-900 p-6 rounded-xl mb-8">
                <pre class="text-sm text-gray-300 overflow-x-auto"><code>import { signalStore, withState, withComputed, withMethods } from '@ngrx/signals';
import { withEntities, addEntity, updateEntity, removeEntity } from '@ngrx/signals/entities';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

type Filter = 'all' | 'active' | 'completed';

export const TodoStore = signalStore(
  { providedIn: 'root' },
  
  withState({ filter: 'all' as Filter }),
  withEntities<Todo>(),
  
  withComputed(({ entities, filter }) => ({
    // Filtered list based on current filter
    filteredTodos: computed(() => {
      const todos = entities();
      const currentFilter = filter();
      
      switch (currentFilter) {
        case 'active':
          return todos.filter(t => !t.completed);
        case 'completed':
          return todos.filter(t => t.completed);
        default:
          return todos;
      }
    }),
    
    // Statistics
    activeCount: computed(() => 
      entities().filter(t => !t.completed).length
    ),
    completedCount: computed(() => 
      entities().filter(t => t.completed).length
    )
  })),
  
  withMethods((store) => ({
    addTodo(title: string) {
      const todo: Todo = {
        id: crypto.randomUUID(),
        title,
        completed: false
      };
      patchState(store, addEntity(todo));
    },
    
    toggleTodo(id: string) {
      const todo = store.entityMap()[id];
      if (todo) {
        patchState(store, updateEntity({
          id,
          changes: { completed: !todo.completed }
        }));
      }
    },
    
    deleteTodo(id: string) {
      patchState(store, removeEntity(id));
    },
    
    setFilter(filter: Filter) {
      patchState(store, { filter });
    },
    
    clearCompleted() {
      const completedIds = store.entities()
        .filter(t => t.completed)
        .map(t => t.id);
      
      patchState(store, removeEntity(completedIds));
    }
  }))
);

// Component
@Component({
  selector: 'app-todos',
  standalone: true,
  template: \\\`
    <div class="todo-app">
      <input 
        #newTodo
        (keyup.enter)="store.addTodo(newTodo.value); newTodo.value = ''"
        placeholder="What needs to be done?"
      />
      
      <div class="filters">
        <button 
          [class.active]="store.filter() === 'all'"
          (click)="store.setFilter('all')">
          All
        </button>
        <button 
          [class.active]="store.filter() === 'active'"
          (click)="store.setFilter('active')">
          Active ({{ store.activeCount() }})
        </button>
        <button 
          [class.active]="store.filter() === 'completed'"
          (click)="store.setFilter('completed')">
          Completed ({{ store.completedCount() }})
        </button>
      </div>
      
      @for (todo of store.filteredTodos(); track todo.id) {
        <div class="todo-item">
          <input 
            type="checkbox"
            [checked]="todo.completed"
            (change)="store.toggleTodo(todo.id)"
          />
          <span [class.completed]="todo.completed">
            {{ todo.title }}
          </span>
          <button (click)="store.deleteTodo(todo.id)">×</button>
        </div>
      }
      
      @if (store.completedCount() > 0) {
        <button (click)="store.clearCompleted()">
          Clear Completed
        </button>
      }
    </div>
  \\\`
})
export class TodosComponent {
  store = inject(TodoStore);
}</code></pre>
            </div>

            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <h3 class="font-bold text-2xl text-gray-900 dark:text-white mt-8 mb-4">Example 2: User Authentication Store</h3>
            </div>

            <div class="bg-gray-900 p-6 rounded-xl mb-8">
                <pre class="text-sm text-gray-300 overflow-x-auto"><code>interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export const AuthStore = signalStore(
  { providedIn: 'root' },
  
  withState<AuthState>({
    user: null,
    token: null,
    loading: false,
    error: null
  }),
  
  withComputed(({ user }) => ({
    isAuthenticated: computed(() => user() !== null),
    isAdmin: computed(() => user()?.role === 'admin'),
    userName: computed(() => user()?.name ?? 'Guest')
  })),
  
  withMethods((store, authService = inject(AuthService)) => ({
    async login(email: string, password: string) {
      patchState(store, { loading: true, error: null });
      
      try {
        const { user, token } = await authService.login(email, password);
        
        patchState(store, { 
          user, 
          token, 
          loading: false 
        });
        
        // Save to localStorage
        localStorage.setItem('auth_token', token);
      } catch (error) {
        patchState(store, { 
          error: error.message, 
          loading: false 
        });
      }
    },
    
    async register(email: string, password: string, name: string) {
      patchState(store, { loading: true, error: null });
      
      try {
        const { user, token } = await authService.register(
          email, 
          password, 
          name
        );
        
        patchState(store, { 
          user, 
          token, 
          loading: false 
        });
        
        localStorage.setItem('auth_token', token);
      } catch (error) {
        patchState(store, { 
          error: error.message, 
          loading: false 
        });
      }
    },
    
    logout() {
      patchState(store, { 
        user: null, 
        token: null, 
        error: null 
      });
      localStorage.removeItem('auth_token');
    },
    
    async loadFromToken() {
      const token = localStorage.getItem('auth_token');
      if (!token) return;
      
      patchState(store, { loading: true });
      
      try {
        const user = await authService.verifyToken(token);
        patchState(store, { user, token, loading: false });
      } catch {
        localStorage.removeItem('auth_token');
        patchState(store, { loading: false });
      }
    }
  }))
);

// Usage in component
@Component({
  selector: 'app-header',
  standalone: true,
  template: \\\`
    <header>
      @if (auth.isAuthenticated()) {
        <span>Welcome, {{ auth.userName() }}</span>
        
        @if (auth.isAdmin()) {
          <a routerLink="/admin">Admin Panel</a>
        }
        
        <button (click)="auth.logout()">Logout</button>
      } @else {
        <a routerLink="/login">Login</a>
      }
    </header>
  \\\`
})
export class HeaderComponent {
  auth = inject(AuthStore);
}</code></pre>
            </div>
        </section>

        <!-- 07. Advanced Patterns -->
        <section id="advanced-patterns" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-pink-600 dark:text-pink-500">07.</span>
                Advanced Patterns
            </h2>

            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <h3 class="font-bold text-2xl text-gray-900 dark:text-white mt-8 mb-4">Custom Features</h3>
                <p>
                    You can create reusable features that can be composed into any store:
                </p>
            </div>

            <div class="bg-gray-900 p-6 rounded-xl mb-8">
                <div class="text-gray-400 mb-2 text-xs uppercase font-bold">Custom withLoading Feature</div>
                <pre class="text-sm text-gray-300 overflow-x-auto"><code>// Create a reusable loading feature
export function withLoading() {
  return signalStoreFeature(
    withState({ loading: false }),
    withMethods((store) => ({
      setLoading(loading: boolean) {
        patchState(store, { loading });
      }
    }))
  );
}

// Create a reusable error handling feature
export function withErrorHandling() {
  return signalStoreFeature(
    withState({ error: null as string | null }),
    withMethods((store) => ({
      setError(error: string | null) {
        patchState(store, { error });
      },
      clearError() {
        patchState(store, { error: null });
      }
    }))
  );
}

// Compose them into a store
export const ProductStore = signalStore(
  { providedIn: 'root' },
  withEntities<Product>(),
  withLoading(),           // ✅ Reusable feature
  withErrorHandling(),     // ✅ Reusable feature
  
  withMethods((store, productService = inject(ProductService)) => ({
    async loadProducts() {
      store.setLoading(true);
      store.clearError();
      
      try {
        const products = await productService.getAll();
        patchState(store, setAllEntities(products));
      } catch (error) {
        store.setError(error.message);
      } finally {
        store.setLoading(false);
      }
    }
  }))
);</code></pre>
            </div>

            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <h3 class="font-bold text-2xl text-gray-900 dark:text-white mt-8 mb-4">Optimistic Updates</h3>
            </div>

            <div class="bg-gray-900 p-6 rounded-xl mb-8">
                <pre class="text-sm text-gray-300 overflow-x-auto"><code>export const PostStore = signalStore(
  { providedIn: 'root' },
  withEntities<Post>(),
  
  withMethods((store, postService = inject(PostService)) => ({
    async likePost(postId: string) {
      // 1. Optimistic update
      const post = store.entityMap()[postId];
      if (!post) return;
      
      patchState(store, updateEntity({
        id: postId,
        changes: { 
          likes: post.likes + 1,
          isLiked: true 
        }
      }));
      
      // 2. Make API call
      try {
        await postService.like(postId);
      } catch (error) {
        // 3. Rollback on error
        patchState(store, updateEntity({
          id: postId,
          changes: { 
            likes: post.likes,
            isLiked: false 
          }
        }));
        
        console.error('Failed to like post:', error);
      }
    }
  }))
);</code></pre>
            </div>
        </section>

        <!-- 08. Architecture -->
        <section id="architecture" class="scroll-mt-32">
            <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-pink-600 dark:text-pink-500">08.</span>
                When to Use What?
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-200 dark:border-blue-900/30">
                    <h4 class="font-bold text-blue-900 dark:text-blue-100 mb-3">Component State</h4>
                    <p class="text-sm text-gray-700 dark:text-gray-300 mb-3">
                        Use plain signals in the component
                    </p>
                    <div class="text-xs bg-white dark:bg-black p-2 rounded font-mono">
                        count = signal(0)
                    </div>
                </div>
                <div class="bg-purple-50 dark:bg-purple-900/10 p-6 rounded-xl border border-purple-200 dark:border-purple-900/30">
                    <h4 class="font-bold text-purple-900 dark:text-purple-100 mb-3">Feature State</h4>
                    <p class="text-sm text-gray-700 dark:text-gray-300 mb-3">
                        Use Signal Store
                    </p>
                    <div class="text-xs bg-white dark:bg-black p-2 rounded font-mono">
                        CartStore, AuthStore
                    </div>
                </div>
                <div class="bg-green-50 dark:bg-green-900/10 p-6 rounded-xl border border-green-200 dark:border-green-900/30">
                    <h4 class="font-bold text-green-900 dark:text-green-100 mb-3">Global State</h4>
                    <p class="text-sm text-gray-700 dark:text-gray-300 mb-3">
                        Use Classic NgRx (rare)
                    </p>
                    <div class="text-xs bg-white dark:bg-black p-2 rounded font-mono">
                        Time-travel debugging
                    </div>
                </div>
            </div>

            <div class="bg-yellow-50 dark:bg-yellow-900/10 p-6 rounded-xl border border-yellow-200 dark:border-yellow-900/30">
                <h4 class="font-bold text-yellow-900 dark:text-yellow-100 mb-3">Decision Tree</h4>
                <ul class="text-sm text-yellow-800 dark:text-yellow-200 space-y-2">
                    <li>• State only used in one component? → <strong>Component signal</strong></li>
                    <li>• State shared across multiple components? → <strong>Signal Store</strong></li>
                    <li>• Need time-travel debugging or action logs? → <strong>Classic NgRx</strong></li>
                    <li>• Building a new app in 2026? → <strong>Signal Store</strong></li>
                </ul>
            </div>
        </section>

        <!-- 09. Senior Verdict -->
        <section id="senior-verdict" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-pink-600 dark:text-pink-500">09.</span>
                The Senior Engineer's Verdict
            </h2>
            <div class="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl border-l-4 border-pink-500">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Is Classic NgRx Dead?</h3>
                <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    <strong>For new projects: Yes.</strong> The Signal Store covers 95% of use cases with 20% of the code.
                    <br/><br/>
                    However, the global <code>Store</code> (Redux style) still has a place in massive enterprise apps where complete state serialization, time-travel debugging, and distinct action logs are non-negotiable requirements purely for audit trails. But for managing component or feature state? Use Signal Store.
                    <br/><br/>
                    <strong>The Future:</strong> Angular is doubling down on Signals. The framework is being rewritten to use Signals internally. Learning Signal Store now is an investment in the future of Angular.
                </p>
            </div>
        </section>

        <!-- Conclusion -->
        <section id="conclusion" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-pink-600 dark:text-pink-500">🎯</span>
                Conclusion
            </h2>
            <div class="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/10 dark:to-purple-900/10 p-8 rounded-2xl border border-pink-200 dark:border-pink-900/30">
                <p class="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    The Angular Signal Store represents a paradigm shift in how we think about state management. By combining the best aspects of NgRx's structure with the simplicity and performance of Signals, it offers a compelling alternative that reduces boilerplate while maintaining type safety and predictability.
                </p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div class="bg-white dark:bg-slate-800 p-6 rounded-xl">
                        <h4 class="font-bold text-pink-600 dark:text-pink-400 mb-3">Key Takeaways</h4>
                        <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                            <li>✓ Signal Store reduces code by 75% compared to classic NgRx</li>
                            <li>✓ No subscriptions needed - Signals handle reactivity automatically</li>
                            <li>✓ Type-safe by default with full TypeScript inference</li>
                            <li>✓ Composable features make stores infinitely scalable</li>
                            <li>✓ Perfect for feature-level state management</li>
                        </ul>
                    </div>
                    <div class="bg-white dark:bg-slate-800 p-6 rounded-xl">
                        <h4 class="font-bold text-purple-600 dark:text-purple-400 mb-3">When to Use</h4>
                        <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                            <li>• New Angular projects (2024+)</li>
                            <li>• Feature-level state management</li>
                            <li>• Apps prioritizing developer experience</li>
                            <li>• Teams wanting less boilerplate</li>
                            <li>• Projects using Angular Signals</li>
                        </ul>
                    </div>
                </div>
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                    As Angular continues to evolve with Signals at its core, the Signal Store positions itself as the future-proof choice for state management. Whether you're building a new application or gradually migrating from NgRx, the patterns and principles covered in this guide will serve you well in the modern Angular ecosystem.
                </p>
            </div>
        </section>
    </div>
    `,
  code: undefined
};
