export const rxjsQuestions = [
    {
        id: 'angular-rxjs-1',
        category: 'RxJS',
        difficulty: 'Medium',
        question: 'Essential RxJS Operators - map, switchMap, combineLatest',
        answer: `**RxJS operators** transform and combine observables.

### Essential Operators:
- **map** - Transform values
- **switchMap** - Switch to new observable
- **combineLatest** - Combine multiple observables
- **filter** - Filter values
- **tap** - Side effects

### Use Cases:
- **map**: Transform data
- **switchMap**: HTTP requests, search
- **combineLatest**: Multiple data sources`,
        codeExample: `// Essential RxJS Operators
console.log('=== map - Transform Values ===');
console.log('of(1, 2, 3).pipe(');
console.log('  map(x => x * 2)');
console.log(').subscribe(console.log);');
console.log('// Output: 2, 4, 6');

console.log('\\n=== switchMap - Switch Observable ===');
console.log('searchQuery$.pipe(');
console.log('  debounceTime(300),');
console.log('  switchMap(query => this.http.get("/search?q=" + query))');
console.log(').subscribe(results => console.log(results));');
console.log('// Cancels previous request, uses latest');

console.log('\\n=== combineLatest - Multiple Sources ===');
console.log('combineLatest([users$, settings$]).pipe(');
console.log('  map(([users, settings]) => ({ users, settings }))');
console.log(').subscribe(console.log);');
console.log('// Emits when ANY source emits');

console.log('\\n=== filter - Filter Values ===');
console.log('numbers$.pipe(');
console.log('  filter(x => x > 5)');
console.log(').subscribe(console.log);');

console.log('\\n=== tap - Side Effects ===');
console.log('users$.pipe(');
console.log('  tap(users => console.log("Fetched:", users.length)),');
console.log('  map(users => users.filter(u => u.active))');
console.log(').subscribe();');

console.log('\\n✓ map: Transform');
console.log('✓ switchMap: Switch to new observable');
console.log('✓ combineLatest: Combine sources');`
    },
    {
        id: 'angular-rxjs-2',
        category: 'RxJS',
        difficulty: 'Hard',
        question: 'Subject Types - Subject, BehaviorSubject, ReplaySubject',
        answer: `**Subjects** are both Observable and Observer.

### Types:
- **Subject** - No initial value, no replay
- **BehaviorSubject** - Has initial value, replays last
- **ReplaySubject** - Replays N values
- **AsyncSubject** - Emits last value on complete

### Use Cases:
- **Subject**: Events
- **BehaviorSubject**: State
- **ReplaySubject**: Cache`,
        codeExample: `// Subject Types
console.log('=== Subject - No Initial Value ===');
console.log('const subject = new Subject<number>();');
console.log('subject.subscribe(x => console.log("A:", x));');
console.log('subject.next(1);');
console.log('subject.subscribe(x => console.log("B:", x));');
console.log('subject.next(2);');
console.log('// A: 1');
console.log('// A: 2, B: 2');

console.log('\\n=== BehaviorSubject - Has Initial Value ===');
console.log('const behavior = new BehaviorSubject(0);');
console.log('behavior.subscribe(x => console.log("A:", x));');
console.log('// A: 0 (immediately!)');
console.log('behavior.next(1);');
console.log('behavior.subscribe(x => console.log("B:", x));');
console.log('// B: 1 (gets last value)');

console.log('\\n=== ReplaySubject - Replays N Values ===');
console.log('const replay = new ReplaySubject(2); // Replay last 2');
console.log('replay.next(1);');
console.log('replay.next(2);');
console.log('replay.next(3);');
console.log('replay.subscribe(x => console.log(x));');
console.log('// 2, 3 (last 2 values)');

console.log('\\n=== Real-world Usage ===');
console.log('class UserService {');
console.log('  private userSubject = new BehaviorSubject<User | null>(null);');
console.log('  user$ = this.userSubject.asObservable();');
console.log('  ');
console.log('  setUser(user: User) {');
console.log('    this.userSubject.next(user);');
console.log('  }');
console.log('}');

console.log('\\n✓ Subject: Events');
console.log('✓ BehaviorSubject: State with initial value');
console.log('✓ ReplaySubject: Cache multiple values');`
    },
    {
        id: 'angular-rxjs-3',
        category: 'RxJS',
        difficulty: 'Expert',
        question: 'Memory Leaks - Unsubscribe Patterns and takeUntilDestroyed()',
        answer: `**Memory leaks** occur when subscriptions aren't cleaned up.

### Solutions:
1. **AsyncPipe** - Auto unsubscribes
2. **takeUntilDestroyed()** - Modern cleanup (Angular 16+)
3. **takeUntil(destroy$)** - Manual cleanup
4. **Subscription.unsubscribe()** - Direct cleanup

### Best Practice:
Use AsyncPipe or takeUntilDestroyed()`,
        codeExample: `// Memory Leak Prevention
console.log('=== Problem: Memory Leak ===');
console.log('class BadComponent {');
console.log('  ngOnInit() {');
console.log('    this.userService.users$.subscribe(users => {');
console.log('      this.users = users;');
console.log('    });');
console.log('    // Never unsubscribes! Memory leak!');
console.log('  }');
console.log('}');

console.log('\\n=== Solution 1: AsyncPipe (Best) ===');
console.log('class GoodComponent {');
console.log('  users$ = inject(UserService).users$;');
console.log('}');
console.log('// Template: @for (user of users$ | async; track user.id)');
console.log('// Auto unsubscribes!');

console.log('\\n=== Solution 2: takeUntilDestroyed() (Modern) ===');
console.log('class ModernComponent {');
console.log('  ngOnInit() {');
console.log('    this.userService.users$');
console.log('      .pipe(takeUntilDestroyed())');
console.log('      .subscribe(users => this.users = users);');
console.log('  }');
console.log('}');
console.log('// Auto unsubscribes on destroy!');

console.log('\\n=== Solution 3: takeUntil (Traditional) ===');
console.log('class TraditionalComponent {');
console.log('  private destroy$ = new Subject<void>();');
console.log('  ');
console.log('  ngOnInit() {');
console.log('    this.userService.users$');
console.log('      .pipe(takeUntil(this.destroy$))');
console.log('      .subscribe();');
console.log('  }');
console.log('  ');
console.log('  ngOnDestroy() {');
console.log('    this.destroy$.next();');
console.log('    this.destroy$.complete();');
console.log('  }');
console.log('}');

console.log('\\n✓ AsyncPipe: Best solution');
console.log('✓ takeUntilDestroyed(): Modern cleanup');
console.log('✓ Always unsubscribe!');`
    },
    {
        id: 'angular-rxjs-4',
        category: 'RxJS',
        difficulty: 'Medium',
        question: 'Error Handling - catchError and retry',
        answer: `**Error handling** in RxJS prevents stream termination.

### Operators:
- **catchError** - Handle errors
- **retry** - Retry on error
- **retryWhen** - Custom retry logic

### Strategies:
- Return fallback value
- Return new observable
- Rethrow error

### Best Practice:
Always handle errors in HTTP calls`,
        codeExample: `// Error Handling
console.log('=== catchError - Handle Errors ===');
console.log('this.http.get("/api/users").pipe(');
console.log('  catchError(error => {');
console.log('    console.error("Error:", error);');
console.log('    return of([]); // Return fallback');
console.log('  })');
console.log(').subscribe(users => console.log(users));');

console.log('\\n=== retry - Retry on Error ===');
console.log('this.http.get("/api/users").pipe(');
console.log('  retry(3), // Retry 3 times');
console.log('  catchError(error => of([]))');
console.log(').subscribe();');

console.log('\\n=== retryWhen - Custom Retry ===');
console.log('this.http.get("/api/users").pipe(');
console.log('  retryWhen(errors => errors.pipe(');
console.log('    delay(1000), // Wait 1s between retries');
console.log('    take(3) // Max 3 retries');
console.log('  ))');
console.log(').subscribe();');

console.log('\\n=== Real-world Pattern ===');
console.log('getUsers() {');
console.log('  return this.http.get<User[]>("/api/users").pipe(');
console.log('    retry(2),');
console.log('    catchError(error => {');
console.log('      this.errorService.log(error);');
console.log('      return throwError(() => error);');
console.log('    })');
console.log('  );');
console.log('}');

console.log('\\n✓ catchError: Handle errors gracefully');
console.log('✓ retry: Automatic retries');
console.log('✓ Always handle HTTP errors');`
    },
    {
        id: 'angular-rxjs-5',
        category: 'RxJS',
        difficulty: 'Hard',
        question: 'Higher-order Operators - mergeMap, switchMap, concatMap, exhaustMap',
        answer: `**Higher-order operators** flatten nested observables.

### Operators:
- **mergeMap** - Concurrent, all complete
- **switchMap** - Cancel previous
- **concatMap** - Sequential
- **exhaustMap** - Ignore while active

### Use Cases:
- **mergeMap**: Parallel requests
- **switchMap**: Search, latest only
- **concatMap**: Order matters
- **exhaustMap**: Prevent duplicates`,
        codeExample: `// Higher-order Operators
console.log('=== mergeMap - Concurrent ===');
console.log('users$.pipe(');
console.log('  mergeMap(user => this.http.get("/api/user/" + user.id))');
console.log(').subscribe();');
console.log('// All requests run concurrently');

console.log('\\n=== switchMap - Cancel Previous ===');
console.log('searchQuery$.pipe(');
console.log('  switchMap(query => this.http.get("/search?q=" + query))');
console.log(').subscribe();');
console.log('// Cancels previous request, uses latest');

console.log('\\n=== concatMap - Sequential ===');
console.log('actions$.pipe(');
console.log('  concatMap(action => this.http.post("/api/action", action))');
console.log(').subscribe();');
console.log('// Waits for each to complete before next');

console.log('\\n=== exhaustMap - Ignore While Active ===');
console.log('saveButton$.pipe(');
console.log('  exhaustMap(() => this.http.post("/api/save", data))');
console.log(').subscribe();');
console.log('// Ignores clicks while saving');

console.log('\\n=== Decision Tree ===');
console.log('Need latest only? → switchMap');
console.log('Order matters? → concatMap');
console.log('Prevent duplicates? → exhaustMap');
console.log('Run all? → mergeMap');

console.log('\\n✓ switchMap: Most common (search, latest)');
console.log('✓ concatMap: Sequential operations');
console.log('✓ exhaustMap: Prevent duplicate requests');`
    },
    {
        id: 'angular-rxjs-6',
        category: 'RxJS',
        difficulty: 'Medium',
        question: 'Multicasting - share, shareReplay, publish',
        answer: `**Multicasting** shares a single subscription among multiple subscribers.

### Operators:
- **share()** - Share subscription
- **shareReplay()** - Share + replay
- **publish()** - Manual control

### Problem:
Cold observables create new execution per subscriber.

### Solution:
Use multicasting to share execution.`,
        codeExample: `// Multicasting
console.log('=== Problem: Cold Observable ===');
console.log('const data$ = this.http.get("/api/data");');
console.log('data$.subscribe(); // Request 1');
console.log('data$.subscribe(); // Request 2');
console.log('// Two HTTP requests!');

console.log('\\n=== Solution: share() ===');
console.log('const data$ = this.http.get("/api/data").pipe(');
console.log('  share()');
console.log(');');
console.log('data$.subscribe(); // Request 1');
console.log('data$.subscribe(); // Uses same request');
console.log('// One HTTP request!');

console.log('\\n=== shareReplay() - Cache Results ===');
console.log('const users$ = this.http.get("/api/users").pipe(');
console.log('  shareReplay(1) // Cache last value');
console.log(');');
console.log('');
console.log('// First subscriber triggers request');
console.log('users$.subscribe();');
console.log('');
console.log('// Later subscribers get cached value');
console.log('setTimeout(() => users$.subscribe(), 5000);');
console.log('// No new request!');

console.log('\\n=== Real-world Pattern ===');
console.log('class UserService {');
console.log('  users$ = this.http.get<User[]>("/api/users").pipe(');
console.log('    shareReplay({ bufferSize: 1, refCount: true })');
console.log('  );');
console.log('}');
console.log('// Cached, shared, auto-cleanup');

console.log('\\n✓ share(): Share subscription');
console.log('✓ shareReplay(): Share + cache');
console.log('✓ Prevents duplicate HTTP requests');`
    },
    {
        id: 'angular-rxjs-7',
        category: 'RxJS',
        difficulty: 'Expert',
        question: 'Custom Operators - Creating Reusable RxJS Logic',
        answer: `**Custom operators** encapsulate reusable RxJS logic.

### How to Create:
Use \`pipe()\` and return function

### Use Cases:
- Common transformations
- Error handling patterns
- Retry logic
- Logging

### Best Practice:
Extract repeated pipe logic into custom operators`,
        codeExample: `// Custom Operators
console.log('=== Creating Custom Operator ===');
console.log('function retryWithDelay<T>(');
console.log('  retries: number,');
console.log('  delayMs: number');
console.log(') {');
console.log('  return (source: Observable<T>) => source.pipe(');
console.log('    retryWhen(errors => errors.pipe(');
console.log('      delay(delayMs),');
console.log('      take(retries)');
console.log('    ))');
console.log('  );');
console.log('}');

console.log('\\n=== Using Custom Operator ===');
console.log('this.http.get("/api/users").pipe(');
console.log('  retryWithDelay(3, 1000)');
console.log(').subscribe();');

console.log('\\n=== Another Example: tapLog ===');
console.log('function tapLog<T>(message: string) {');
console.log('  return (source: Observable<T>) => source.pipe(');
console.log('    tap(value => console.log(message, value))');
console.log('  );');
console.log('}');
console.log('');
console.log('// Usage');
console.log('users$.pipe(');
console.log('  tapLog("Users fetched:"),');
console.log('  map(users => users.filter(u => u.active)),');
console.log('  tapLog("Active users:")');
console.log(').subscribe();');

console.log('\\n=== filterNil - Remove null/undefined ===');
console.log('function filterNil<T>() {');
console.log('  return (source: Observable<T | null | undefined>) =>');
console.log('    source.pipe(');
console.log('      filter((value): value is T => value != null)');
console.log('    );');
console.log('}');

console.log('\\n✓ Custom operators: Reusable logic');
console.log('✓ Cleaner, more maintainable code');`
    }
];
