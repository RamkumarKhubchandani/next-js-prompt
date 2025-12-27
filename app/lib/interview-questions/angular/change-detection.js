export const changeDetectionQuestions = [
    {
        id: 'angular-cd-1',
        category: 'Change Detection',
        difficulty: 'Hard',
        question: 'Zoneless Angular - provideExperimentalZonelessChangeDetection() (Angular 18+)',
        answer: `**Zoneless Angular** removes Zone.js dependency for better performance.

### What is Zone.js?
Monkey-patches async APIs to trigger change detection.

### Why Remove It?
- Better performance
- Smaller bundle size
- More predictable
- Works with signals

### How to Enable:
\`provideExperimentalZonelessChangeDetection()\`

### Requirements:
- Use signals or OnPush
- Manual change detection for observables
- No automatic CD`,
        codeExample: `// Zoneless Angular
console.log('=== Enabling Zoneless ===');
console.log('bootstrapApplication(AppComponent, {');
console.log('  providers: [');
console.log('    provideExperimentalZonelessChangeDetection()');
console.log('  ]');
console.log('});');

console.log('\\n=== With Zone.js (Traditional) ===');
console.log('class Component {');
console.log('  count = 0;');
console.log('  ');
console.log('  increment() {');
console.log('    setTimeout(() => {');
console.log('      this.count++; // Auto-detects change');
console.log('    }, 1000);');
console.log('  }');
console.log('}');

console.log('\\n=== Zoneless (Signals) ===');
console.log('class Component {');
console.log('  count = signal(0);');
console.log('  ');
console.log('  increment() {');
console.log('    setTimeout(() => {');
console.log('      this.count.update(n => n + 1); // Works!');
console.log('    }, 1000);');
console.log('  }');
console.log('}');

console.log('\\n=== Zoneless (Manual CD) ===');
console.log('class Component {');
console.log('  count = 0;');
console.log('  cdr = inject(ChangeDetectorRef);');
console.log('  ');
console.log('  increment() {');
console.log('    setTimeout(() => {');
console.log('      this.count++;');
console.log('      this.cdr.markForCheck(); // Manual!');
console.log('    }, 1000);');
console.log('  }');
console.log('}');

console.log('\\n✓ Zoneless: Better performance');
console.log('✓ Use signals for automatic CD');
console.log('✓ Future of Angular');`
    },
    {
        id: 'angular-cd-2',
        category: 'Change Detection',
        difficulty: 'Medium',
        question: 'OnPush Change Detection Strategy',
        answer: `**OnPush** optimizes change detection by checking only when inputs change.

### Default Strategy:
Checks entire component tree on every event.

### OnPush Strategy:
Only checks when:
- @Input reference changes
- Event in component/child
- Async pipe emits
- Manual markForCheck()

### Benefits:
- Better performance
- Predictable updates
- Fewer checks

### Best Practice:
Use OnPush + immutable data`,
        codeExample: `// OnPush Change Detection
console.log('=== Default Strategy ===');
console.log('@Component({');
console.log('  changeDetection: ChangeDetectionStrategy.Default');
console.log('})');
console.log('class DefaultComponent {');
console.log('  // Checks on EVERY event in app');
console.log('}');

console.log('\\n=== OnPush Strategy ===');
console.log('@Component({');
console.log('  changeDetection: ChangeDetectionStrategy.OnPush');
console.log('})');
console.log('class OnPushComponent {');
console.log('  @Input() user!: User;');
console.log('  // Only checks when user reference changes');
console.log('}');

console.log('\\n=== Triggering OnPush ===');
console.log('// 1. Input reference change');
console.log('this.user = { ...this.user, name: "New" }; // ✓ Triggers');
console.log('this.user.name = "New"; // ✗ Doesn\'t trigger');

console.log('\\n// 2. Event in component');
console.log('<button (click)="onClick()">Click</button> // ✓ Triggers');

console.log('\\n// 3. Async pipe');
console.log('users$ | async // ✓ Triggers on emit');

console.log('\\n// 4. Manual markForCheck()');
console.log('this.cdr.markForCheck(); // ✓ Triggers');

console.log('\\n=== Best Practice ===');
console.log('@Component({');
console.log('  changeDetection: ChangeDetectionStrategy.OnPush');
console.log('})');
console.log('class Component {');
console.log('  users$ = inject(UserService).users$;');
console.log('  // Template: users$ | async');
console.log('}');

console.log('\\n✓ OnPush: Better performance');
console.log('✓ Use with immutable data');`
    },
    {
        id: 'angular-cd-3',
        category: 'Change Detection',
        difficulty: 'Expert',
        question: 'ChangeDetectorRef - Manual Change Detection Control',
        answer: `**ChangeDetectorRef** provides manual control over change detection.

### Methods:
- **markForCheck()** - Mark for check
- **detectChanges()** - Run immediately
- **detach()** - Disable auto CD
- **reattach()** - Enable auto CD

### Use Cases:
- OnPush components
- Performance optimization
- Custom update logic`,
        codeExample: `// ChangeDetectorRef
console.log('=== markForCheck() ===');
console.log('class Component {');
console.log('  cdr = inject(ChangeDetectorRef);');
console.log('  ');
console.log('  updateFromObservable() {');
console.log('    this.service.data$.subscribe(data => {');
console.log('      this.data = data;');
console.log('      this.cdr.markForCheck(); // Schedule check');
console.log('    });');
console.log('  }');
console.log('}');

console.log('\\n=== detectChanges() ===');
console.log('updateImmediately() {');
console.log('  this.data = newData;');
console.log('  this.cdr.detectChanges(); // Run now!');
console.log('}');

console.log('\\n=== detach() / reattach() ===');
console.log('ngOnInit() {');
console.log('  this.cdr.detach(); // Disable auto CD');
console.log('  ');
console.log('  setInterval(() => {');
console.log('    this.count++;');
console.log('    this.cdr.detectChanges(); // Manual update');
console.log('  }, 1000);');
console.log('}');

console.log('\\n=== Real-world: Heavy Computation ===');
console.log('class Component {');
console.log('  ngOnInit() {');
console.log('    this.cdr.detach();');
console.log('    ');
console.log('    this.data$.subscribe(data => {');
console.log('      this.processData(data);');
console.log('      this.cdr.detectChanges(); // Update once');
console.log('    });');
console.log('  }');
console.log('}');

console.log('\\n✓ markForCheck(): Schedule check');
console.log('✓ detectChanges(): Run immediately');
console.log('✓ detach(): Disable auto CD');`
    },
    {
        id: 'angular-cd-4',
        category: 'Change Detection',
        difficulty: 'Medium',
        question: 'Zone.js Internals - How Angular Detects Changes',
        answer: `**Zone.js** monkey-patches async APIs to trigger change detection.

### What It Patches:
- setTimeout/setInterval
- Promise
- XMLHttpRequest
- addEventListener

### How It Works:
1. Async operation starts
2. Zone.js intercepts
3. Operation completes
4. Zone.js triggers CD

### Performance Impact:
- Checks entire tree
- Can be slow for large apps
- Zoneless is better`,
        codeExample: `// Zone.js Internals
console.log('=== What Zone.js Patches ===');
console.log('setTimeout(() => {}, 1000);');
console.log('// Zone.js intercepts, triggers CD after');

console.log('\\nPromise.resolve().then(() => {});');
console.log('// Zone.js intercepts, triggers CD after');

console.log('\\nbutton.addEventListener("click", () => {});');
console.log('// Zone.js intercepts, triggers CD after');

console.log('\\n=== How It Works ===');
console.log('1. User clicks button');
console.log('2. Zone.js intercepts click handler');
console.log('3. Runs click handler');
console.log('4. Triggers change detection');
console.log('5. Updates view');

console.log('\\n=== Running Outside Zone ===');
console.log('class Component {');
console.log('  ngZone = inject(NgZone);');
console.log('  ');
console.log('  heavyWork() {');
console.log('    this.ngZone.runOutsideAngular(() => {');
console.log('      setInterval(() => {');
console.log('        // Doesn\'t trigger CD!');
console.log('        this.doWork();');
console.log('      }, 100);');
console.log('    });');
console.log('  }');
console.log('}');

console.log('\\n=== Performance Tip ===');
console.log('Use runOutsideAngular for:');
console.log('- Frequent timers');
console.log('- Scroll handlers');
console.log('- Mouse move handlers');

console.log('\\n✓ Zone.js: Automatic CD');
console.log('✓ runOutsideAngular: Skip CD');`
    },
    {
        id: 'angular-cd-5',
        category: 'Change Detection',
        difficulty: 'Hard',
        question: 'Signals + OnPush - Optimal Performance Pattern',
        answer: `**Signals + OnPush** provides optimal change detection performance.

### Why Combine?
- Signals track dependencies
- OnPush skips unnecessary checks
- Fine-grained updates
- Best performance

### Pattern:
Use signal inputs + computed + OnPush

### Benefits:
- Automatic optimization
- No manual CD
- Works with zoneless`,
        codeExample: `// Signals + OnPush
console.log('=== Optimal Pattern ===');
console.log('@Component({');
console.log('  changeDetection: ChangeDetectionStrategy.OnPush');
console.log('})');
console.log('class OptimalComponent {');
console.log('  // Signal inputs');
console.log('  user = input.required<User>();');
console.log('  settings = input<Settings>();');
console.log('  ');
console.log('  // Computed values');
console.log('  displayName = computed(() => {');
console.log('    const user = this.user();');
console.log('    return user.firstName + " " + user.lastName;');
console.log('  });');
console.log('  ');
console.log('  // Local state');
console.log('  count = signal(0);');
console.log('}');

console.log('\\n=== Why It Works ===');
console.log('1. Signal inputs trigger OnPush');
console.log('2. Computed auto-updates');
console.log('3. Local signals trigger updates');
console.log('4. No manual CD needed');

console.log('\\n=== Performance Comparison ===');
console.log('Traditional:');
console.log('  - Checks entire tree');
console.log('  - Manual OnPush management');
console.log('  - Zone.js overhead');
console.log('');
console.log('Signals + OnPush:');
console.log('  - Only updates what changed');
console.log('  - Automatic optimization');
console.log('  - Works with zoneless');

console.log('\\n=== Migration Path ===');
console.log('1. Add OnPush to component');
console.log('2. Convert @Input to input()');
console.log('3. Use computed() for derived values');
console.log('4. Convert local state to signals');

console.log('\\n✓ Signals + OnPush: Best performance');
console.log('✓ Automatic, no manual CD');`
    },
    {
        id: 'angular-cd-6',
        category: 'Change Detection',
        difficulty: 'Expert',
        question: 'Change Detection Performance Optimization Strategies',
        answer: `**Performance optimization** strategies for change detection.

### Strategies:
1. **OnPush** - Skip unnecessary checks
2. **TrackBy** - Optimize *ngFor
3. **Pure pipes** - Cache results
4. **Detach CD** - Manual control
5. **Signals** - Fine-grained reactivity

### Profiling:
Use Angular DevTools to identify bottlenecks.

### Best Practices:
- Use OnPush everywhere
- Immutable data
- Signals for state`,
        codeExample: `// CD Performance Optimization
console.log('=== 1. OnPush Everywhere ===');
console.log('@Component({');
console.log('  changeDetection: ChangeDetectionStrategy.OnPush');
console.log('})');

console.log('\\n=== 2. TrackBy for Lists ===');
console.log('// Template');
console.log('@for (item of items; track item.id) {');
console.log('  <div>{{ item.name }}</div>');
console.log('}');
console.log('// Reuses DOM nodes');

console.log('\\n=== 3. Pure Pipes ===');
console.log('@Pipe({ name: "expensive", pure: true })');
console.log('class ExpensivePipe {');
console.log('  transform(value: any) {');
console.log('    // Only runs when input changes');
console.log('    return expensiveCalculation(value);');
console.log('  }');
console.log('}');

console.log('\\n=== 4. Detach for Heavy Work ===');
console.log('class Component {');
console.log('  ngOnInit() {');
console.log('    this.cdr.detach();');
console.log('    ');
console.log('    this.data$.subscribe(data => {');
console.log('      this.process(data);');
console.log('      this.cdr.detectChanges();');
console.log('    });');
console.log('  }');
console.log('}');

console.log('\\n=== 5. Signals for State ===');
console.log('class Component {');
console.log('  items = signal<Item[]>([]);');
console.log('  filtered = computed(() => ');
console.log('    this.items().filter(i => i.active)');
console.log('  );');
console.log('}');

console.log('\\n=== Profiling ===');
console.log('1. Open Angular DevTools');
console.log('2. Enable "Record change detection"');
console.log('3. Interact with app');
console.log('4. Identify slow components');

console.log('\\n✓ OnPush + Signals: Best performance');
console.log('✓ TrackBy: Optimize lists');
console.log('✓ Profile to find bottlenecks');`
    },
    {
        id: 'angular-cd-7',
        category: 'Change Detection',
        difficulty: 'Hard',
        question: 'Immutability and Change Detection',
        answer: `**Immutability** is crucial for OnPush change detection.

### Why Immutability?
OnPush checks reference equality, not deep equality.

### Patterns:
- Spread operator
- Object.assign()
- Immutable libraries (Immer)

### Benefits:
- Predictable updates
- Better performance
- Easier debugging

### Anti-patterns:
- Mutating arrays/objects
- Modifying @Input directly`,
        codeExample: `// Immutability
console.log('=== Problem: Mutation ===');
console.log('this.user.name = "New Name"; // ✗ Doesn\'t trigger OnPush');
console.log('this.items.push(newItem); // ✗ Doesn\'t trigger OnPush');

console.log('\\n=== Solution: Immutable Updates ===');
console.log('// Objects');
console.log('this.user = { ...this.user, name: "New Name" }; // ✓');
console.log('this.user = Object.assign({}, this.user, { name: "New" }); // ✓');

console.log('\\n// Arrays');
console.log('this.items = [...this.items, newItem]; // ✓');
console.log('this.items = this.items.concat(newItem); // ✓');

console.log('\\n// Remove item');
console.log('this.items = this.items.filter(i => i.id !== id); // ✓');

console.log('\\n// Update item');
console.log('this.items = this.items.map(i => ');
console.log('  i.id === id ? { ...i, name: "New" } : i');
console.log('); // ✓');

console.log('\\n=== With Signals (Easier) ===');
console.log('items = signal<Item[]>([]);');
console.log('');
console.log('// Add');
console.log('this.items.update(items => [...items, newItem]);');
console.log('');
console.log('// Remove');
console.log('this.items.update(items => items.filter(i => i.id !== id));');

console.log('\\n=== Immer Library ===');
console.log('import { produce } from "immer";');
console.log('');
console.log('this.state = produce(this.state, draft => {');
console.log('  draft.user.name = "New"; // Looks like mutation!');
console.log('  draft.items.push(newItem);');
console.log('});');
console.log('// Creates new immutable state');

console.log('\\n✓ Immutability: Required for OnPush');
console.log('✓ Spread operator: Simple solution');
console.log('✓ Signals: Built-in immutability');`
    }
];
