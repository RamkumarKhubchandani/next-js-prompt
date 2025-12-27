export const signalsQuestions = [
    {
        id: 'angular-signals-1',
        category: 'Signals',
        difficulty: 'Medium',
        question: 'Signals Basics - signal(), computed(), effect() (Angular 16+)',
        answer: `**Signals** are Angular's new reactive primitive for fine-grained reactivity.

### Core APIs:
- **signal()** - Create writable signal
- **computed()** - Derived signal
- **effect()** - Side effects

### Benefits:
- Fine-grained reactivity
- Better performance
- Simpler than RxJS for state
- Automatic dependency tracking

### When to Use:
- Component state
- Derived values
- Simple reactivity`,
        codeExample: `// Signals Basics
console.log('=== signal() - Writable Signal ===');
console.log('const count = signal(0);');
console.log('console.log(count()); // 0');
console.log('count.set(5); // Set value');
console.log('count.update(n => n + 1); // Update based on current');

console.log('\\n=== computed() - Derived Signal ===');
console.log('const count = signal(0);');
console.log('const double = computed(() => count() * 2);');
console.log('console.log(double()); // 0');
console.log('count.set(5);');
console.log('console.log(double()); // 10');
console.log('// Automatically updates!');

console.log('\\n=== effect() - Side Effects ===');
console.log('const count = signal(0);');
console.log('effect(() => {');
console.log('  console.log("Count is:", count());');
console.log('});');
console.log('// Runs immediately and on every change');

console.log('\\n=== Real Example ===');
console.log('class CartComponent {');
console.log('  items = signal<Item[]>([]);');
console.log('  total = computed(() => ');
console.log('    this.items().reduce((sum, item) => sum + item.price, 0)');
console.log('  );');
console.log('  ');
console.log('  addItem(item: Item) {');
console.log('    this.items.update(items => [...items, item]);');
console.log('  }');
console.log('}');

console.log('\\n✓ Signals: Fine-grained reactivity');
console.log('✓ Automatic dependency tracking');`
    },
    {
        id: 'angular-signals-2',
        category: 'Signals',
        difficulty: 'Hard',
        question: 'Signal Inputs - input() and input.required() (Angular 17.1+)',
        answer: `**Signal inputs** are the modern way to define component inputs.

### APIs:
- **input()** - Optional signal input
- **input.required()** - Required signal input
- **input.transform()** - Transform input value

### Benefits:
- Type-safe
- Reactive by default
- Better change detection
- Composable with computed()

### Migration:
Old @Input() → New input()`,
        codeExample: `// Signal Inputs
console.log('=== OLD: @Input ===');
console.log('@Component({})');
console.log('class OldComponent {');
console.log('  @Input() user?: User;');
console.log('  @Input({ required: true }) id!: string;');
console.log('}');

console.log('\\n=== NEW: Signal Inputs ===');
console.log('@Component({})');
console.log('class NewComponent {');
console.log('  user = input<User>(); // Optional');
console.log('  id = input.required<string>(); // Required');
console.log('  ');
console.log('  // Use in template or computed');
console.log('  userName = computed(() => this.user()?.name ?? "Guest");');
console.log('}');

console.log('\\n=== input.transform() ===');
console.log('class Component {');
console.log('  count = input(0, {');
console.log('    transform: (value: string | number) => Number(value)');
console.log('  });');
console.log('}');
console.log('// <app-component count="5" />');
console.log('// Automatically converts "5" to 5');

console.log('\\n=== Computed from Inputs ===');
console.log('class UserCard {');
console.log('  firstName = input.required<string>();');
console.log('  lastName = input.required<string>();');
console.log('  ');
console.log('  fullName = computed(() => ');
console.log('    this.firstName() + " " + this.lastName()');
console.log('  );');
console.log('}');

console.log('\\n✓ Signal inputs: Modern, reactive @Input');
console.log('✓ Works with computed() seamlessly');`
    },
    {
        id: 'angular-signals-3',
        category: 'Signals',
        difficulty: 'Hard',
        question: 'Signal Outputs - output() and outputFromObservable() (Angular 17.3+)',
        answer: `**Signal outputs** are the modern way to define component outputs.

### APIs:
- **output()** - Create output
- **outputFromObservable()** - From Observable

### Benefits:
- Type-safe
- Simpler than EventEmitter
- Better tree-shaking
- Consistent with signals

### Migration:
Old @Output() → New output()`,
        codeExample: `// Signal Outputs
console.log('=== OLD: @Output ===');
console.log('class OldComponent {');
console.log('  @Output() userClicked = new EventEmitter<User>();');
console.log('  ');
console.log('  onClick(user: User) {');
console.log('    this.userClicked.emit(user);');
console.log('  }');
console.log('}');

console.log('\\n=== NEW: output() ===');
console.log('class NewComponent {');
console.log('  userClicked = output<User>();');
console.log('  ');
console.log('  onClick(user: User) {');
console.log('    this.userClicked.emit(user);');
console.log('  }');
console.log('}');

console.log('\\n=== outputFromObservable() ===');
console.log('class Component {');
console.log('  private clicks$ = new Subject<void>();');
console.log('  clicked = outputFromObservable(this.clicks$);');
console.log('  ');
console.log('  onClick() {');
console.log('    this.clicks$.next();');
console.log('  }');
console.log('}');

console.log('\\n=== Usage in Parent ===');
console.log('<app-component');
console.log('  (userClicked)="onUserClick($event)"');
console.log('/>');

console.log('\\n✓ output(): Modern @Output');
console.log('✓ Type-safe, simpler API');`
    },
    {
        id: 'angular-signals-4',
        category: 'Signals',
        difficulty: 'Expert',
        question: 'Model Inputs - model() for Two-way Binding (Angular 17.2+)',
        answer: `**model()** creates a two-way bindable signal input.

### What is model()?
Combines input + output for two-way binding.

### Benefits:
- Simpler two-way binding
- Type-safe
- Works with [(ngModel)] syntax
- Reactive by default

### Use Cases:
- Form controls
- Toggle states
- Any two-way data flow`,
        codeExample: `// Model Inputs
console.log('=== OLD: Two-way Binding ===');
console.log('class OldComponent {');
console.log('  @Input() value!: string;');
console.log('  @Output() valueChange = new EventEmitter<string>();');
console.log('  ');
console.log('  onChange(newValue: string) {');
console.log('    this.valueChange.emit(newValue);');
console.log('  }');
console.log('}');

console.log('\\n=== NEW: model() ===');
console.log('class NewComponent {');
console.log('  value = model<string>("");');
console.log('  ');
console.log('  onChange(newValue: string) {');
console.log('    this.value.set(newValue);');
console.log('  }');
console.log('}');

console.log('\\n=== Usage ===');
console.log('// Parent component');
console.log('searchQuery = signal("");');
console.log('');
console.log('// Template');
console.log('<search-input [(value)]="searchQuery" />');
console.log('');
console.log('// Changes in child update parent signal!');

console.log('\\n=== Custom Control Example ===');
console.log('class ToggleComponent {');
console.log('  checked = model(false);');
console.log('  ');
console.log('  toggle() {');
console.log('    this.checked.update(v => !v);');
console.log('  }');
console.log('}');
console.log('');
console.log('// Usage: <app-toggle [(checked)]="isEnabled" />');

console.log('\\n✓ model(): Simplified two-way binding');
console.log('✓ Combines input + output');`
    },
    {
        id: 'angular-signals-5',
        category: 'Signals',
        difficulty: 'Medium',
        question: 'toSignal() and toObservable() - Interop with RxJS',
        answer: `Angular provides **interop functions** between Signals and RxJS.

### APIs:
- **toSignal()** - Observable → Signal
- **toObservable()** - Signal → Observable

### Use Cases:
- **toSignal()**: Use Observable data in signal-based components
- **toObservable()**: Use signals with RxJS operators

### Benefits:
- Gradual migration
- Best of both worlds
- Flexible architecture`,
        codeExample: `// Signal-RxJS Interop
console.log('=== toSignal() - Observable to Signal ===');
console.log('class Component {');
console.log('  private userService = inject(UserService);');
console.log('  ');
console.log('  // Convert Observable to Signal');
console.log('  users = toSignal(this.userService.users$, {');
console.log('    initialValue: []');
console.log('  });');
console.log('  ');
console.log('  // Use in computed');
console.log('  userCount = computed(() => this.users().length);');
console.log('}');

console.log('\\n=== toObservable() - Signal to Observable ===');
console.log('class Component {');
console.log('  searchQuery = signal("");');
console.log('  ');
console.log('  // Convert Signal to Observable');
console.log('  searchQuery$ = toObservable(this.searchQuery);');
console.log('  ');
console.log('  results$ = this.searchQuery$.pipe(');
console.log('    debounceTime(300),');
console.log('    switchMap(query => this.search(query))');
console.log('  );');
console.log('}');

console.log('\\n=== Migration Pattern ===');
console.log('// Step 1: Keep Observable service');
console.log('class UserService {');
console.log('  users$ = this.http.get<User[]>("/api/users");');
console.log('}');
console.log('');
console.log('// Step 2: Convert to Signal in component');
console.log('class Component {');
console.log('  users = toSignal(inject(UserService).users$);');
console.log('}');

console.log('\\n✓ toSignal(): Observable → Signal');
console.log('✓ toObservable(): Signal → Observable');
console.log('✓ Gradual migration path');`
    },
    {
        id: 'angular-signals-6',
        category: 'Signals',
        difficulty: 'Hard',
        question: 'Signals vs RxJS - When to Use Each',
        answer: `**Signals** and **RxJS** serve different purposes in Angular.

### Use Signals For:
- Component state
- Derived values
- Simple reactivity
- Template bindings

### Use RxJS For:
- Async operations
- Complex event streams
- Time-based operations
- HTTP requests

### Best Practice:
- Signals for state
- RxJS for streams
- Use both together`,
        codeExample: `// Signals vs RxJS
console.log('=== Use Signals For State ===');
console.log('class Component {');
console.log('  // Simple state');
console.log('  count = signal(0);');
console.log('  isLoading = signal(false);');
console.log('  ');
console.log('  // Derived state');
console.log('  double = computed(() => this.count() * 2);');
console.log('}');

console.log('\\n=== Use RxJS For Streams ===');
console.log('class Component {');
console.log('  // HTTP requests');
console.log('  users$ = this.http.get<User[]>("/api/users");');
console.log('  ');
console.log('  // Event streams');
console.log('  clicks$ = fromEvent(button, "click");');
console.log('  ');
console.log('  // Time-based');
console.log('  timer$ = interval(1000);');
console.log('}');

console.log('\\n=== Combine Both ===');
console.log('class SearchComponent {');
console.log('  // Signal for input');
console.log('  searchQuery = signal("");');
console.log('  ');
console.log('  // Observable for async search');
console.log('  results$ = toObservable(this.searchQuery).pipe(');
console.log('    debounceTime(300),');
console.log('    switchMap(query => this.search(query))');
console.log('  );');
console.log('  ');
console.log('  // Signal for results');
console.log('  results = toSignal(this.results$, { initialValue: [] });');
console.log('}');

console.log('\\n=== Decision Tree ===');
console.log('Need async/time-based? → RxJS');
console.log('Need complex operators? → RxJS');
console.log('Simple state/derived? → Signals');
console.log('Template binding? → Signals');

console.log('\\n✓ Signals: State & derived values');
console.log('✓ RxJS: Async & complex streams');`
    },
    {
        id: 'angular-signals-7',
        category: 'Signals',
        difficulty: 'Expert',
        question: 'Signal-based Components - OnPush by Default',
        answer: `**Signal-based components** get automatic OnPush-like behavior.

### How It Works:
- Signals track dependencies
- Only re-render when signals change
- No manual OnPush needed
- Better performance

### Benefits:
- Automatic optimization
- Fine-grained updates
- Simpler code
- Better performance

### Future:
Zoneless Angular uses signals for change detection.`,
        codeExample: `// Signal-based Components
console.log('=== Traditional Component ===');
console.log('@Component({');
console.log('  changeDetection: ChangeDetectionStrategy.OnPush');
console.log('})');
console.log('class TraditionalComponent {');
console.log('  @Input() user?: User;');
console.log('  ');
console.log('  // Manual change detection needed');
console.log('  updateUser() {');
console.log('    this.user = { ...this.user, name: "New" };');
console.log('    this.cdr.markForCheck();');
console.log('  }');
console.log('}');

console.log('\\n=== Signal-based Component ===');
console.log('@Component({})');
console.log('class SignalComponent {');
console.log('  user = input.required<User>();');
console.log('  ');
console.log('  // Automatic change detection!');
console.log('  userName = computed(() => this.user().name);');
console.log('}');
console.log('// No OnPush needed, no manual CD');

console.log('\\n=== Performance Comparison ===');
console.log('Traditional:');
console.log('  - Checks entire component tree');
console.log('  - Manual OnPush optimization');
console.log('  - Zone.js overhead');
console.log('');
console.log('Signal-based:');
console.log('  - Only updates what changed');
console.log('  - Automatic optimization');
console.log('  - Works with zoneless');

console.log('\\n=== Zoneless Angular ===');
console.log('bootstrapApplication(App, {');
console.log('  providers: [');
console.log('    provideExperimentalZonelessChangeDetection()');
console.log('  ]');
console.log('});');
console.log('// Signals enable zoneless!');

console.log('\\n✓ Signals: Automatic OnPush behavior');
console.log('✓ Fine-grained reactivity');`
    },
    {
        id: 'angular-signals-8',
        category: 'Signals',
        difficulty: 'Hard',
        question: 'Signal Effects - effect() and Advanced Patterns',
        answer: `**effect()** runs side effects when signals change.

### Use Cases:
- Logging
- Analytics
- LocalStorage sync
- DOM manipulation

### Important Rules:
- Don't set signals in effects (creates loops)
- Use for side effects only
- Runs in injection context

### Advanced:
- untracked() - Read without tracking
- allowSignalWrites() - Allow writes (rare)`,
        codeExample: `// Signal Effects
console.log('=== Basic effect() ===');
console.log('class Component {');
console.log('  count = signal(0);');
console.log('  ');
console.log('  constructor() {');
console.log('    effect(() => {');
console.log('      console.log("Count changed:", this.count());');
console.log('    });');
console.log('  }');
console.log('}');
console.log('// Runs on every count change');

console.log('\\n=== LocalStorage Sync ===');
console.log('class Component {');
console.log('  theme = signal("light");');
console.log('  ');
console.log('  constructor() {');
console.log('    effect(() => {');
console.log('      localStorage.setItem("theme", this.theme());');
console.log('    });');
console.log('  }');
console.log('}');

console.log('\\n=== untracked() - Read Without Tracking ===');
console.log('effect(() => {');
console.log('  const count = this.count(); // Tracked');
console.log('  const user = untracked(() => this.user()); // Not tracked');
console.log('  console.log(count, user);');
console.log('});');
console.log('// Only re-runs when count changes, not user');

console.log('\\n=== Cleanup ===');
console.log('effect((onCleanup) => {');
console.log('  const timer = setInterval(() => {}, 1000);');
console.log('  ');
console.log('  onCleanup(() => {');
console.log('    clearInterval(timer);');
console.log('  });');
console.log('});');

console.log('\\n=== Anti-pattern: Setting Signals ===');
console.log('// DON\'T DO THIS:');
console.log('effect(() => {');
console.log('  this.double.set(this.count() * 2); // Creates loop!');
console.log('});');
console.log('');
console.log('// DO THIS INSTEAD:');
console.log('double = computed(() => this.count() * 2);');

console.log('\\n✓ effect(): Side effects only');
console.log('✓ Use computed() for derived values');`
    }
];
