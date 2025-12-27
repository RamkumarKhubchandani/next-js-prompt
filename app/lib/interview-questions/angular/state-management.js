export const stateManagementQuestions = [
    {
        id: 'angular-state-1',
        category: 'State Management',
        difficulty: 'Hard',
        question: 'NgRx SignalStore - Modern State Management (Angular 17+)',
        answer: `**SignalStore** is the modern NgRx state management solution.

### Benefits:
- Signal-based
- Less boilerplate
- Better performance
- Type-safe

### Use Cases:
- Feature state
- Component state
- Shared state`,
        codeExample: `// NgRx SignalStore
console.log('=== Creating SignalStore ===');
console.log('export const UserStore = signalStore(');
console.log('  withState({ users: [], loading: false }),');
console.log('  withMethods((store) => ({');
console.log('    async loadUsers() {');
console.log('      patchState(store, { loading: true });');
console.log('      const users = await fetchUsers();');
console.log('      patchState(store, { users, loading: false });');
console.log('    }');
console.log('  }))');
console.log(');');

console.log('\\n=== Using Store ===');
console.log('class Component {');
console.log('  store = inject(UserStore);');
console.log('  users = this.store.users;');
console.log('  loading = this.store.loading;');
console.log('}');

console.log('\\n✓ SignalStore: Modern NgRx');`
    },
    {
        id: 'angular-state-2',
        category: 'State Management',
        difficulty: 'Medium',
        question: 'Service-based State Management - BehaviorSubject Pattern',
        answer: `**Service-based state** uses services with BehaviorSubject.

### Pattern:
- Private BehaviorSubject
- Public Observable
- Methods to update state

### Benefits:
- Simple
- No library needed
- Good for small apps`,
        codeExample: `// Service-based State
console.log('=== State Service ===');
console.log('@Injectable({ providedIn: "root" })');
console.log('class UserService {');
console.log('  private userSubject = new BehaviorSubject<User | null>(null);');
console.log('  user$ = this.userSubject.asObservable();');
console.log('  ');
console.log('  setUser(user: User) {');
console.log('    this.userSubject.next(user);');
console.log('  }');
console.log('  ');
console.log('  clearUser() {');
console.log('    this.userSubject.next(null);');
console.log('  }');
console.log('}');

console.log('\\n✓ Service state: Simple, effective');`
    },
    {
        id: 'angular-state-3',
        category: 'State Management',
        difficulty: 'Expert',
        question: 'NgRx Store - Actions, Reducers, Selectors',
        answer: `**NgRx Store** provides Redux-like state management.

### Core Concepts:
- **Actions** - Events
- **Reducers** - State updates
- **Selectors** - Derived state
- **Effects** - Side effects

### When to Use:
Large apps with complex state`,
        codeExample: `// NgRx Store
console.log('=== Actions ===');
console.log('export const loadUsers = createAction("[Users] Load");');
console.log('export const loadUsersSuccess = createAction(');
console.log('  "[Users] Load Success",');
console.log('  props<{ users: User[] }>()');
console.log(');');

console.log('\\n=== Reducer ===');
console.log('const reducer = createReducer(');
console.log('  initialState,');
console.log('  on(loadUsers, state => ({ ...state, loading: true })),');
console.log('  on(loadUsersSuccess, (state, { users }) => ({');
console.log('    ...state, users, loading: false');
console.log('  }))');
console.log(');');

console.log('\\n=== Selector ===');
console.log('const selectUsers = createSelector(');
console.log('  selectUserState,');
console.log('  state => state.users');
console.log(');');

console.log('\\n✓ NgRx: Enterprise state management');`
    },
    {
        id: 'angular-state-4',
        category: 'State Management',
        difficulty: 'Medium',
        question: 'Component Store - Local State Management',
        answer: `**ComponentStore** manages component-level state.

### Benefits:
- Scoped to component
- Reactive
- Less boilerplate than NgRx
- Good for feature state`,
        codeExample: `// Component Store
console.log('=== Creating ComponentStore ===');
console.log('interface UserState {');
console.log('  users: User[];');
console.log('  loading: boolean;');
console.log('}');
console.log('');
console.log('@Injectable()');
console.log('class UserStore extends ComponentStore<UserState> {');
console.log('  constructor() {');
console.log('    super({ users: [], loading: false });');
console.log('  }');
console.log('  ');
console.log('  readonly users$ = this.select(state => state.users);');
console.log('  ');
console.log('  readonly loadUsers = this.effect((trigger$) =>');
console.log('    trigger$.pipe(');
console.log('      tap(() => this.patchState({ loading: true })),');
console.log('      switchMap(() => this.userService.getUsers()),');
console.log('      tap(users => this.patchState({ users, loading: false }))');
console.log('    )');
console.log('  );');
console.log('}');

console.log('\\n✓ ComponentStore: Feature-level state');`
    },
    {
        id: 'angular-state-5',
        category: 'State Management',
        difficulty: 'Hard',
        question: 'State Synchronization - Local Storage and Session Storage',
        answer: `**State persistence** saves state to storage.

### Strategies:
- LocalStorage - Persistent
- SessionStorage - Session only
- IndexedDB - Large data

### Implementation:
Use effects to sync state`,
        codeExample: `// State Persistence
console.log('=== LocalStorage Sync ===');
console.log('class StateService {');
console.log('  private stateSubject = new BehaviorSubject(');
console.log('    this.loadFromStorage()');
console.log('  );');
console.log('  ');
console.log('  constructor() {');
console.log('    this.stateSubject.subscribe(state => {');
console.log('      localStorage.setItem("state", JSON.stringify(state));');
console.log('    });');
console.log('  }');
console.log('  ');
console.log('  private loadFromStorage() {');
console.log('    const saved = localStorage.getItem("state");');
console.log('    return saved ? JSON.parse(saved) : initialState;');
console.log('  }');
console.log('}');

console.log('\\n✓ Persistence: Save state across sessions');`
    },
    {
        id: 'angular-state-6',
        category: 'State Management',
        difficulty: 'Expert',
        question: 'State Management Best Practices and Patterns',
        answer: `**Best practices** for state management.

### Principles:
- Single source of truth
- Immutable updates
- Derived state with selectors
- Side effects in effects

### Patterns:
- Facade pattern
- Entity adapter
- Normalized state`,
        codeExample: `// State Best Practices
console.log('=== Facade Pattern ===');
console.log('@Injectable()');
console.log('class UserFacade {');
console.log('  users$ = this.store.select(selectUsers);');
console.log('  loading$ = this.store.select(selectLoading);');
console.log('  ');
console.log('  loadUsers() {');
console.log('    this.store.dispatch(loadUsers());');
console.log('  }');
console.log('}');
console.log('// Component only uses facade, not store directly');

console.log('\\n=== Entity Adapter ===');
console.log('const adapter = createEntityAdapter<User>();');
console.log('const initialState = adapter.getInitialState();');
console.log('// Provides: addOne, addMany, updateOne, removeOne, etc.');

console.log('\\n✓ Facade: Simplify component usage');
console.log('✓ Entity adapter: Normalized state');`
    }
];
