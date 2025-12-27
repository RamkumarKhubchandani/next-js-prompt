export const realInterviewQuestions = [
  {
    id: 'angular-real-1',
    category: 'Real Interview Questions',
    difficulty: 'Medium',
    question: 'Did you work on Angular 17? What features do you know?',
    answer: `**Yes, I've worked extensively with Angular 17 and 18.**

### Key Features I've Used:

**1. New Control Flow (@if, @for, @switch)**
- Replaced *ngIf, *ngFor, *ngSwitch
- Better performance and type safety
- Cleaner syntax

**2. Deferrable Views (@defer)**
- Lazy load components on-demand
- Multiple triggers (viewport, interaction, idle)
- Significantly reduced initial bundle size

**3. Standalone Components (Default)**
- No more NgModules required
- Simpler architecture
- Better tree-shaking

**4. Signals (from Angular 16, enhanced in 17)**
- Fine-grained reactivity
- signal(), computed(), effect()
- Signal inputs and outputs

**5. Built-in Control Flow**
- No CommonModule import needed
- Compiler-optimized
- Automatic track optimization`,
    codeExample: `// Angular 17+ Features Demo
@Component({
  selector: 'app-user',
  standalone: true,
  template: \`
    @if (user()) {
      <h2>{{ displayName() }}</h2>
    } @else {
      <p>Loading...</p>
    }
  \`
})
class UserComponent {
  // 1. Signal Inputs
  user = input.required<{firstName: string, lastName: string}>();

  // 2. Computed Signals
  displayName = computed(() => {
    const u = this.user();
    return \`\${u.firstName} \${u.lastName} (Verify)\`;
  });

  constructor() {
    // 3. Effects
    effect(() => {
      console.log('User changed to:', this.user());
    });
  }
}

// --- Execution Demo ---
console.log('Initializing Standalone Component...');
const cmp = new UserComponent();

// Simulate Input Change
console.log('Setting Input Signal...');
cmp.user = signal({ firstName: 'John', lastName: 'Doe' });

console.log('Computed Name:', cmp.displayName());`
  },
  {
    id: 'angular-real-2',
    category: 'Real Interview Questions',
    difficulty: 'Easy',
    question: 'Which forms have you used?',
    answer: `**I've worked extensively with both Reactive Forms and Template-driven Forms.**

### Reactive Forms (Primary Choice)
**When:** 95% of projects  
**Why:** Better control, type-safe, testable

**Use Cases:**
- Complex forms with validation
- Dynamic form fields
- Multi-step wizards
- Forms with conditional logic

### Template-driven Forms
**When:** Simple forms only  
**Why:** Quick to implement

**Use Cases:**
- Simple login forms
- Basic contact forms
- Prototypes

### My Preference: Reactive Forms
- Type-safe with TypeScript
- Easier to test
- Better for complex scenarios
- More control over validation`,
    codeExample: `// Reactive Forms & Validation Demo
// Mocking FormGroup for execution
class FormGroup {
  constructor(controls) { this.controls = controls; }
  get value() { return Object.fromEntries(Object.entries(this.controls).map(([k,v]) => [k, v.value])); }
  get valid() { return Object.values(this.controls).every(c => c.valid); }
}
class FormControl {
  constructor(val, validators = []) { this.val = val; this.validators = validators; }
  get value() { return this.val; }
  setValue(v) { this.val = v; }
  get valid() { return this.validators.every(fn => fn(this.val)); }
}
const Validators = {
  required: (v) => v !== '' && v !== null,
  minLength: (len) => (v) => v.length >= len
};

// --- Real Component Code ---
@Component({ selector: 'app-register' })
class RegistrationComponent {
  form = new FormGroup({
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)])
  });

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted!', this.form.value);
    } else {
      console.error('Form Invalid!');
    }
  }
}

// --- Execution Demo ---
const cmp = new RegistrationComponent();
console.log('Initial Form Valid?', cmp.form.valid);

console.log('Typing password (too short)...');
cmp.form.controls.password.setValue('123');
cmp.onSubmit();

console.log('Typing valid data...');
cmp.form.controls.email.setValue('user@example.com');
cmp.form.controls.password.setValue('password123');
cmp.onSubmit();`
  },
  {
    id: 'angular-real-3',
    category: 'Real Interview Questions',
    difficulty: 'Hard',
    question: 'Have you migrated any Angular projects?',
    answer: `**Yes, I've migrated multiple projects:**

### Migration Experience:

**1. Angular 12 → 15** (E-commerce Platform)
- Updated dependencies
- Migrated to standalone components
- Replaced deprecated APIs
- **Result:** 25% faster build time

**2. Angular 15 → 17** (Dashboard Application)
- Adopted new control flow
- Implemented deferrable views
- Migrated to signal inputs
- **Result:** 40% smaller bundle

**3. AngularJS → Angular 14** (Legacy App)
- Complete rewrite
- Hybrid mode during transition
- Gradual component migration
- **Result:** Modern, maintainable codebase

### Migration Process:
1. Update Angular CLI
2. Run \`ng update\`
3. Fix breaking changes
4. Update dependencies
5. Test thoroughly
6. Deploy incrementally`,
    codeExample: `// Angular Migration Strategy Demo

// 1. Defining Routes for Lazy Loading (Modern Standalone)
const routes = [
  {
    path: 'dashboard',
    // NEW: loadComponent (Standalone)
    loadComponent: () => import('./dashboard').then(m => m.DashboardComponent)
  },
  {
    path: 'settings',
    // OLD: loadChildren (NgModule) - Migrated away from this
    loadChildren: () => import('./settings').then(m => m.SettingsModule)
  }
];

// 2. Component Migration
@Component({
  selector: 'app-legacy',
  // REMOVED: module-based logic
  standalone: true, 
  imports: [/* CommonModule no longer needed for @if */],
  template: \`
    @if (isMigrated()) {
      <modern-view />
    } @else {
      <legacy-view />
    }
  \`
})
class MigratedComponent {
  isMigrated = signal(true);
}

// --- Execution & Verification ---
console.log('Checking Route Configuration...');
console.log('Dashboard uses loadComponent?', !!routes[0].loadComponent);

const cmp = new MigratedComponent();
console.log('Component is Standalone?', cmp.constructor.__config__.standalone);
console.log('Migration Status:', cmp.isMigrated());`
  },
  {
    id: 'angular-real-4',
    category: 'Real Interview Questions',
    difficulty: 'Medium',
    question: 'How did you implement lazy loading?',
    answer: `**I implement lazy loading for all feature modules to optimize performance.**

### Implementation Approach:

**1. Route-based Lazy Loading**
- Load modules on route navigation
- Reduces initial bundle size
- Faster initial load

**2. Component-level Lazy Loading (Angular 17+)**
- Use loadComponent for standalone
- Even more granular control

**3. Deferrable Views (@defer)**
- Lazy load based on triggers
- Viewport, interaction, idle

### Real-world Impact:
- Initial bundle: 500KB → 180KB (64% reduction)
- Time to Interactive: 3.2s → 1.1s (66% faster)
- Lighthouse score: 65 → 92`,
    codeExample: `// Lazy Loading Route Configuration
const DASHBOARD_ROUTES = [{ path: '', component: class DashboardComponent {} }];

// Mocking Angular APIs for demo
const inject = (token) => {
  if (token.name === 'AuthService') return new AuthService();
  return {};
};
class AuthService { isLoggedIn() { return true; } }

// 1. Defining Routes
const routes = [
  {
    path: 'dashboard',
    // lazy load child routes
    loadChildren: () => Promise.resolve(DASHBOARD_ROUTES)
  },
  {
    path: 'admin',
    // lazy load single component (Angular 15+)
    loadComponent: () => imports['./admin'].then(m => m.AdminComponent),
    canActivate: [() => inject(AuthService).isLoggedIn()]
  }
];

// Mocking Imports for Demo
const imports = {
  './admin': Promise.resolve({ AdminComponent: class AdminComponent {} })
};

// --- Execution Check ---
console.log('Routes Configured:', routes.length);
console.log('Dashboard is Lazy?', typeof routes[0].loadChildren === 'function');

// Simulate Navigation
console.log('Navigating to Dashboard...');
routes[0].loadChildren().then(r => {
  console.log('Loaded Dashboard Routes:', r.length);
});`
  },
  {
    id: 'angular-real-5',
    category: 'Real Interview Questions',
    difficulty: 'Hard',
    question: 'Which authentication method/framework did you use? What was the mechanism (refresh tokens, expiry handling)?',
    answer: `**I've implemented JWT-based authentication with refresh token mechanism.**

### Authentication Framework:
- **JWT (JSON Web Tokens)**
- **OAuth 2.0** for social login
- **Auth0** for enterprise projects

### Token Mechanism:

**1. Access Token**
- Short-lived (15 minutes)
- Sent with every API request
- Stored in memory (not localStorage)

**2. Refresh Token**
- Long-lived (7 days)
- Stored in httpOnly cookie
- Used to get new access token

**3. Expiry Handling**
- Automatic token refresh
- HTTP interceptor checks expiry
- Silent refresh before expiration

### Security Measures:
- httpOnly cookies for refresh tokens
- CSRF protection
- Token rotation
- Secure storage`,
    codeExample: `// JWT Authentication Service
// Mocking Angular APIs for demo
const Injectable = () => {};
const signal = (initialValue) => {
  let value = initialValue;
  const subscribers = [];
  const s = (newValue) => {
    if (arguments.length) {
      value = newValue;
      subscribers.forEach(sub => sub(value));
    }
    return value;
  };
  s.set = (newValue) => s(newValue);
  s.subscribe = (cb) => {
    subscribers.push(cb);
    cb(value); // Immediate call for initial value
  };
  return s;
};
const effect = (fn) => {
  // Simple mock: just run the effect once
  fn();
};

@Injectable({ providedIn: 'root' })
class AuthService {
  accessToken = signal(null);
  
  constructor() {
    // Simulate auto-refresh timer
    effect(() => {
      if (this.accessToken()) {
        console.log('Token active. Scheduling refresh in 14m...');
      }
    });
  }

  login(credentials) {
    console.log('Logging in with:', credentials);
    // Mock API Call
    setTimeout(() => {
      this.accessToken.set('header.payload.signature');
      console.log('Login Success! Access Token Set.');
      this.scheduleRefresh();
    }, 500);
  }

  scheduleRefresh() {
    setTimeout(() => {
      console.log('Auto-refreshing token via httpOnly cookie...');
      this.accessToken.set('new_token_' + Date.now());
    }, 2000); // 2 seconds for demo
  }
}

// --- Execution Demo ---
const auth = new AuthService();
auth.login({ user: 'admin', pass: '***' });`
  },
  {
    id: 'angular-real-6',
    category: 'Real Interview Questions',
    difficulty: 'Hard',
    question: 'Any state management implemented (NgRx/Nx)?',
    answer: `**Yes, I've implemented state management with NgRx and NgRx SignalStore.**

### Projects:

**1. E-commerce Platform - NgRx Store**
- Complex state (cart, user, products)
- Actions, reducers, effects, selectors
- DevTools integration

**2. Dashboard App - NgRx SignalStore**
- Modern signal-based approach
- Less boilerplate
- Better performance

**3. Small Apps - Service-based State**
- BehaviorSubject pattern
- No library needed
- Simple and effective

### When to Use:
- **NgRx Store:** Large apps, complex state
- **SignalStore:** Modern apps, less boilerplate
- **Services:** Small apps, simple state`,
    codeExample: `// Modern State Management Styles

// Mocking Angular APIs for demo
const Injectable = () => {};
const signal = (initialValue) => {
  let value = initialValue;
  const subscribers = [];
  const s = (newValue) => {
    if (arguments.length) {
      value = newValue;
      subscribers.forEach(sub => sub(value));
    }
    return value;
  };
  s.set = (newValue) => s(newValue);
  s.subscribe = (cb) => {
    subscribers.push(cb);
    cb(value); // Immediate call for initial value
  };
  return s;
};
const computed = (fn) => {
  // Simple mock: just run the function once
  let value = fn();
  const c = () => value;
  // In a real signal system, this would re-evaluate when dependencies change
  return c;
};
const effect = (fn) => {
  // Simple mock: just run the effect once
  fn();
};

// Mocking RxJS BehaviorSubject
class BehaviorSubject {
  constructor(initialValue) {
    this.value = initialValue;
    this.subscribers = [];
  }
  next(newValue) {
    this.value = newValue;
    this.subscribers.forEach(sub => sub(newValue));
  }
  asObservable() {
    return {
      subscribe: (cb) => {
        this.subscribers.push(cb);
        cb(this.value); // Emit current value immediately
      }
    };
  }
}

// 1. Service-based (Simple)
@Injectable()
class CartService {
  // BehaviorSubject holds current value
  private _cart = new BehaviorSubject([]);
  cart$ = this._cart.asObservable(); // Public read-only stream

  addToCart(item) {
    const current = this._cart.value; // Access current value
    this._cart.next([...current, item]);
  }
}

// 2. SignalStore Pattern (Modern)
@Injectable()
class UserStore {
  // State
  users = signal([]);
  loading = signal(false);

  // Computed
  activeUsers = computed(() => this.users().filter(u => u.isActive));

  // Methods
  async loadUsers() {
    this.loading.set(true);
    console.log('Loading users...');
    // Mock API
    setTimeout(() => {
      this.users.set([
        { id: 1, name: 'Alice', isActive: true },
        { id: 2, name: 'Bob', isActive: false }
      ]);
      this.loading.set(false);
    }, 1000);
  }
}

// --- Execution Demo ---
console.log('--- Service Pattern ---');
const cart = new CartService();
cart.cart$.subscribe(items => console.log('Cart Items:', items));
cart.addToCart({ id: 1, name: 'Laptop' });

console.log('\\n--- Signal Store Pattern ---');
const store = new UserStore();
effect(() => console.log('Store Loading:', store.loading()));
effect(() => console.log('Active Users:', store.activeUsers()));
store.loadUsers();`
  },
  {
    id: 'angular-real-7',
    category: 'Real Interview Questions',
    difficulty: 'Medium',
    question: 'Do you use Observables or Promises? Where did you use Promises?',
    answer: `**I primarily use Observables, but use Promises in specific scenarios.**

### Observables (Primary - 90%)
**When:** Most async operations  
**Why:** Cancellable, composable, powerful operators

**Use Cases:**
- HTTP requests
- Event streams
- Real-time data
- Complex async flows

### Promises (10%)
**When:** Simple one-time operations  
**Why:** Simpler API, async/await support

**Use Cases:**
- Third-party libraries (non-RxJS)
- Simple async/await flows
- Converting to Observable
- IndexedDB operations

### Conversion:
- Observable → Promise: \`firstValueFrom()\``,
    codeExample: `// Promises vs Observables Demo
console.log('searchControl.valueChanges.pipe(');
console.log('  debounceTime(300),');
console.log('  distinctUntilChanged(),');
console.log('  switchMap(query => this.search(query))');
console.log(').subscribe(results => {');
console.log('  this.results = results;');
console.log('});');

console.log('\\n=== Promises (Specific Cases) ===');
console.log('// 1. Third-party libraries');
console.log('async uploadToS3(file: File) {');
console.log('  const s3 = new AWS.S3();');
console.log('  const result = await s3.upload({');
console.log('    Bucket: "my-bucket",');
console.log('    Key: file.name,');
console.log('    Body: file');
console.log('  }).promise();');
console.log('  return result.Location;');
console.log('}');

console.log('\\n// 2. IndexedDB operations');
console.log('async saveToIndexedDB(data: any) {');
console.log('  const db = await this.openDB();');
console.log('  const tx = db.transaction("store", "readwrite");');
console.log('  await tx.objectStore("store").add(data);');
console.log('  await tx.done;');
console.log('}');

console.log('\\n// 3. Simple async/await flows');
console.log('async loadUserData(userId: string) {');
console.log('  try {');
console.log('    const user = await firstValueFrom(');
console.log('      this.userService.getUser(userId)');
console.log('    );');
console.log('    const settings = await firstValueFrom(');
console.log('      this.settingsService.getSettings(userId)');
console.log('    );');
console.log('    return { user, settings };');
console.log('  } catch (error) {');
console.log('    console.error(error);');
console.log('  }');
console.log('}');

console.log('\\n=== Converting Between Them ===');
console.log('// Observable to Promise');
console.log('import { firstValueFrom } from "rxjs";');
console.log('const user = await firstValueFrom(this.http.get("/api/user"));');

console.log('\\n// Promise to Observable');
console.log('import { from } from "rxjs";');
console.log('const user$ = from(fetch("/api/user").then(r => r.json()));');

console.log('\\n=== When to Use What ===');
console.log('Observables:');
console.log('  ✓ HTTP requests (cancellable)');
console.log('  ✓ Event streams');
console.log('  ✓ Real-time data');
console.log('  ✓ Complex operators needed');
console.log('');
console.log('Promises:');
console.log('  ✓ Third-party libraries');
console.log('  ✓ Simple one-time operations');
console.log('  ✓ async/await preferred');
console.log('  ✓ IndexedDB, File API');`
  },
  {
    id: 'angular-real-8',
    category: 'Real Interview Questions',
    difficulty: 'Easy',
    question: 'Which TypeScript version did you use?',
    answer: `**I've worked with TypeScript 4.8 through 5.4.**

### Current Projects:
- **TypeScript 5.2-5.4** (Angular 17-18)
- **TypeScript 4.9-5.1** (Angular 15-16)
- **TypeScript 4.8** (Angular 14)

### Key Features I Use:

**TypeScript 5.x:**
- Decorators (stable)
- const type parameters
- Better type inference
- Faster compilation

**TypeScript 4.9:**
- satisfies operator
- Auto-accessors
- Better narrowing

### Version Compatibility:
- Angular 18: TypeScript 5.2-5.4
- Angular 17: TypeScript 5.2-5.3
- Angular 16: TypeScript 4.9-5.1
- Angular 15: TypeScript 4.8-4.9`,
    codeExample: `// TypeScript 5.x & Angular Features
// Mocking Decorator for execution
function Component(config) {
  return function(target) { target.selector = config.selector; return target; }
}

console.log('=== TypeScript 5.x Features ===');
// 1. Decorators (Stable)
@Component({ selector: "app-user" })
class UserComponent {}

console.log('Component Selector:', UserComponent.selector);

// 2. const type parameters
function createArray(items) {
  return items;
}
const arr = createArray(["a", "b"]); 
console.log('Const Generic Array:', arr);

// 3. Satisfies Operator Pattern (Simulated)
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000
};
// satisfies Config
console.log('Config satisfies contract:', typeof config.apiUrl === 'string');

// 4. Strict Mode Type Safety Mock
class FormGroup {
  value = { name: "John", age: 30 };
}
const form = new FormGroup();
console.log('Typed Form Value:', form.value);`
  },
  {
    id: 'angular-real-9',
    category: 'Real Interview Questions',
    difficulty: 'Medium',
    question: 'What ES6 features did you apply in Angular apps?',
    answer: `**I use modern ES6+ features extensively for cleaner, more readable code.**

### Key Features I Use Daily:

**1. Arrow Functions**
- Concise syntax
- Preserves \`this\` context
- Used in RxJS pipelines, callbacks

**2. Destructuring**
- Extracting values from objects/arrays
- Used in inputs, route params, RxJS results

**3. Spread/Rest Operators**
- Immutable state updates (NgRx)
- Merging objects/arrays
- Function arguments

**4. Async/Await**
- Promise handling
- Clarity in async logic (where Observables aren't needed)

**5. Template Literals**
- Dynamic strings
- Multi-line strings`,
    codeExample: `// ES6+ Features Execution Only
// 1. Destructuring & Rest
const user = { id: 1, name: "John", role: "Admin", active: true };
const { name, ...details } = user;
console.log('Destructured Name:', name);
console.log('Rest Details:', details);

// 2. Spread Operator (Immutable)
const state = { users: ['A'], loading: false };
const newState = { ...state, loading: true, users: [...state.users, 'B'] };
console.log('New State:', newState);
console.log('Original State Preserved:', state.loading === false);

// 3. Arrow Functions & Template Literals
const greet = (u) => \`User \${ u.name } is \${ u.active ? 'Active' : 'Inactive' }\`;
console.log(greet(user));

// 4. Async/Await
async function mockFetch() {
  return new Promise(r => setTimeout(() => r({ status: 200 }), 100));
}
(async () => {
  console.log('Fetching...');
  const res = await mockFetch();
  console.log('Async Fetch Result:', res.status);
})();`
  },
  {
    id: 'angular-real-10',
    category: 'Real Interview Questions',
    difficulty: 'Medium',
    question: 'How did you share data between components?',
    answer: `**I choose the sharing strategy based on component relationship and complexity.**

### Strategies I Use:

**1. Input/Output (Parent ↔ Child)**
- **Props down, events up**
- Simple, direct connection
- Now using **Signal Inputs** and **Outputs**

**2. Services (Sibling / Unrelated)**
- **BehaviorSubject** / **Signals** in a shared service
- State singleton
- Decoupled communication

**3. State Management (Global)**
- **NgRx** / **SignalStore**
- App-wide state (User, Cart, Theme)
- Predictable data flow

**4. Route Parameters**
- Passing ID via URL
- Using \`withComponentInputBinding\``,
    codeExample: `// Data Sharing Demo

// Mocking Angular decorators and functions for execution
const Injectable = () => { };
const Component = (config) => (target) => { target.selector = config.selector; };
const signal = (initialValue) => {
  let value = initialValue;
  const subscribers = [];
  const s = (newValue) => {
    if (arguments.length === 0) return value;
    value = newValue;
    subscribers.forEach(sub => sub(value));
  };
  s.set = (newValue) => s(newValue);
  s.update = (updater) => s(updater(value));
  s.asReadonly = () => s; // Simplified
  s.subscribe = (cb) => { subscribers.push(cb); cb(value); }; // For effect
  return s;
};
const input = {
  required: () => {
    let val;
    const s = (newValue) => {
      if (arguments.length === 0) return val;
      val = newValue;
    };
    s.set = (newValue) => s(newValue);
    return s;
  }
};
const output = () => ({ emit: (val) => console.log('Output emitted:', val) });


// 1. Signal Inputs (Parent-Child)
@Component({ selector: 'child' })
class ChildComponent {
  data = input.required(); // Signal Input

  logData() {
    console.log('Child Received via Signal:', this.data());
  }
}

// 2. Shared Service (Siblings)
@Injectable()
class SharedService {
  count = signal(0);
  increment() { this.count.update(c => c + 1); }
}

// --- Execution ---
// Parent-Child Sim
console.log('--- Signal Inputs ---');
const child = new ChildComponent();
child.data.set('Parent Message'); // Simulate parent setting input
child.logData();

// Service Sim
console.log('\\n--- Shared Service ---');
const service = new SharedService();
effect(() => console.log('Service State:', service.count()));
service.increment();`
  },
  {
    id: 'angular-real-11',
    category: 'Real Interview Questions',
    difficulty: 'Hard',
    question: 'When did you use forkJoin?',
    answer: `**I use forkJoin heavily for parallel API requests.**

### Use Case: Initial Data Loading
When a page needs data from multiple independent endpoints before rendering.

**Example:**
- Dashboard needs: User Profile + Recent Orders + Notifications
- Run all 3 requests in parallel
- Wait for ALL to complete
- Render page once

### Characteristics:
- Parallel execution
- One emission with all results array/object
- Completes only when ALL observables complete
- Fails if ANY observable fails

### vs combineLatest:
- **forkJoin:** One final value (like Promise.all)
- **combineLatest:** Continues emitting updates`,
    codeExample: `// forkJoin Demo (Parallel Requests)

// Mocking RxJS Objects for Demo
const forkJoin = (sources) => {
  return {
    subscribe: (observer) => {
      const keys = Object.keys(sources);
      const results = {};
      let completed = 0;
      keys.forEach(key => {
        // Simulate immediate resolution for demo
        sources[key].subscribe(val => {
          results[key] = val;
          completed++;
        });
      });
      // Emit once all complete
      if (completed === keys.length) {
        observer(results);
      }
    }
  };
};

const mockGet = (data, delay) => ({
  subscribe: (cb) => setTimeout(() => cb(data), delay)
});

// --- Execution ---
console.log('Starting Parallel Requests...');
const loader$ = forkJoin({
  user: mockGet({ name: 'Alice' }, 500),
  orders: mockGet([101, 102], 800),
  settings: mockGet({ theme: 'dark' }, 300)
});

loader$.subscribe(data => {
  console.log('All Data Received (forkJoin):');
  console.log(JSON.stringify(data, null, 2));
});`
  },
  {
    id: 'angular-real-12',
    category: 'Real Interview Questions',
    difficulty: 'Expert',
    question: 'Did you use CI/CD? Deployment across Dev/Stage/Prod & URL Config?',
    answer: `**Yes, I've set up and used CI/CD pipelines (GitHub Actions / GitLab CI).**

### Workflow:
1. **Push to Feature Branch:** unit tests run
2. **PR to Develop:** build check, lint, sonarQube
3. **Merge to Develop:** Deploy to **DEV**
4. **Release Tag:** Deploy to **STAGE** (manual approval)
5. **Merge to Main:** Deploy to **PROD**

### URL Configuration (Environment Variables):
I use **Angular Environments** combined with **Runtime Configuration**.

**Approach:**
- \`environment.ts\` for defaults
- \`assets/config.json\` for runtime values (fetched at startup)
- Allows **Build Once, Deploy Anywhere** (Docker friendly)

### Environment Files:
- \`environment.prod.ts\`
- \`environment.stage.ts\`
- \`environment.dev.ts\``,
    codeExample: `// Runtime Configuration Validator
const runtimeConfig = {
  apiUrl: "https://api.prod.com",
  production: true
};

function validateConfig(config) {
  const issues = [];
  if (!config.apiUrl || !config.apiUrl.startsWith('https')) issues.push('API must be HTTPS');
  if (config.production && config.apiUrl.includes('localhost')) issues.push('Prod cannot use localhost');
  return issues;
}

// --- Execution ---
console.log('Loading Runtime Config...');
console.log('Config:', runtimeConfig);

const errors = validateConfig(runtimeConfig);
if (errors.length === 0) {
  console.log('✓ Configuration Valid for Production');
} else {
  console.error('Configuration Errors:', errors);
}

console.log('\\n--- CI/CD Pipeline Steps ---');
console.log([
  'npm ci',
  'npm run test:headless', 
  'npm run build -- --configuration production',
  'docker build -t app:latest'
].join(' -> '));`
  },
  {
    id: 'angular-real-13',
    category: 'Real Interview Questions',
    difficulty: 'Hard',
    question: 'Did you use shared components/modules or shared repositories?',
    answer: `**I have used both, depending on the project scale.**

### 1. Shared Module (Monolith)
**Structure:**
- \`shared/components\` (Buttons, Inputs)
- \`shared/pipes\` (Formatters)
- \`shared/directives\`
**Usage:** Imported in Feature Modules (or Standalone imports)

### 2. Nx Monorepo (Enterprise)
**Structure:**
- \`libs/ui-kit\`
- \`libs/auth-lib\`
- \`apps/admin\`, \`apps/customer\`
**Benefits:**
- Code sharing across apps
- Independent versioning
- Incremental builds with Nx cache

### 3. NPM Library (Multi-Repo)
**When:** Sharing across DIFFERENT organizations/repos
**Tooling:** Angular Library (\`ng generate library\`)
**Workflow:** Build → Publish to Private Registry → npm install`,
    codeExample: `// Sharing Code Strategies
// 1. Shared Import Simulation
console.log('=== 1. Shared Import (Simple App) ===');
const ButtonComponent = { selector: 'app-btn' };
console.log('Imported Button:', ButtonComponent);

// 2. Nx Monorepo Structure Simulation
console.log('\\n=== 2. Nx Monorepo Structure ===');
const workspace = {
  version: 2,
  projects: {
    'admin-app': { items: ['src', 'e2e'] },
    'customer-app': { items: ['src'] },
    'ui-kit': { items: ['lib', 'test'] },
    'auth-lib': { items: ['lib'] }
  }
};
console.log('Workspace Projects:', Object.keys(workspace.projects));

// 3. Library Import
console.log('\\n=== 3. Library Usage ===');
console.log('import { UiButtonComponent } from "@myorg/ui";');
console.log('// Nx enforces boundaries automatically');`
  },
  {
    id: 'angular-real-14',
    category: 'Real Interview Questions',
    difficulty: 'Expert',
    question: 'Have you worked with module federation for micro-frontends?',
    answer: `**Yes, I have implemented Module Federation to split a large monolith.**

### Architecture:
- **Shell Application (Host):** Layout, Auth, Navigation
- **Remote Applications:**
  - \`mfe-dashboard\`
  - \`mfe-orders\`
  - \`mfe-settings\`

### Implementation Details:
- **Webpack Module Federation Plugin:** Configuration in \`webpack.config.js\`
- **Dynamic Loading:** Loading remotes via routing
- **Shared Dependencies:** Sharing \`@angular/core\` singleton to avoid version conflicts

### Key Challenges Solved:
- **Versioning:** Ensuring compatible Angular versions
- **Communication:** Using Custom Events / Window Object / Query Params
- **Styles:** CSS isolation using Shadow DOM or ViewEncapsulation`,
    codeExample: `// Module Federation Setup
const hostConfig = {
  remotes: {
    dashboard: "dashboard@http://localhost:4201/remoteEntry.js",
    orders: "orders@http://localhost:4202/remoteEntry.js"
  },
  shared: ["@angular/core", "@angular/common"]
};

// --- Execution ---
console.log('=== Host Config (Shell) ===');
console.log('Remotes:', Object.keys(hostConfig.remotes));
console.log('Shared Libs:', hostConfig.shared);

const remoteConfig = {
  name: "dashboard",
  filename: "remoteEntry.js",
  exposes: {
    "./Module": "./src/app/dashboard/dashboard.module.ts"
  }
};

console.log('\\n=== Remote Config (Dashboard) ===');
console.log('Exposed Modules:', remoteConfig.exposes);

console.log('\\n=== Routing to MFE ===');
console.log('loadChildren: () => import("dashboard/Module")');`
  },
  {
    id: 'angular-real-15',
    category: 'Real Interview Questions',
    difficulty: 'Hard',
    question: 'What optimization techniques do you use for large lists?',
    answer: `**I focus on DOM virtualization and change detection strategies.**

### Key Techniques:
1. **Virtual Scrolling (CDK):** Only render items in the viewport.
   - \`ScrollingModule\` from \`@angular/cdk/scrolling\`.
2. **@for track (New Control Flow):**
   - Replaces \`trackBy\`.
   - Prevents DOM thrashing by uniquely identifying items.
3. **OnPush Change Detection:**
   - Prevents unnecessary checks in list items.
4. **Pure Pipes:**
   - Calculate derived values only when inputs change.

### Example Performance Gap:
- **Without trackBy:** Re-renders ALL 1000 items on 1 change.
- **With trackBy/@for:** Updates ONLY the changed node.`,
    codeExample: `// Optimization: @for track vs Regular Loop
console.log('=== Modern List Optimization (@for) ===');

const items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
];

// 1. Simulating the Template Syntax
console.log('Template:');
console.log('@for (item of items; track item.id) {');
console.log('  <app-item [item]="item" />');
console.log('}');

// 2. Simulating Change Detection Benefit
console.log('\\n=== Scenario: Update Item 2 ===');
const newItems = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2 UPDATED' }
];

function detectChanges(oldList, newList) {
  console.log('Diffing lists...');
  const changes = [];
  newList.forEach(newItem => {
    const oldItem = oldList.find(o => o.id === newItem.id);
    if (!oldItem) changes.push('Added ' + newItem.id);
    else if (JSON.stringify(oldItem) !== JSON.stringify(newItem)) changes.push('Updated ' + newItem.id);
  });
  return changes;
}

const domUpdates = detectChanges(items, newItems);
console.log('DOM Updates Required:', domUpdates);
console.log('✓ "Item 1" was skipped (Optimization Work!)');`
  },
  {
    id: 'angular-real-16',
    category: 'Real Interview Questions',
    difficulty: 'Easy',
    question: 'Did you use Angular CLI for component generation?',
    answer: `**Yes, I use Angular CLI daily. It ensures consistency and best practices.**

### Commands I Use:
- \`ng g c name\`: Generate component
- \`ng g s name\`: Generate service
- \`ng g d name\`: Generate directive
- \`ng g pipe name\`: Generate pipe
- \`ng g m name --route dashboard --module app.module\`: Lazy Loaded Module (Legacy)
- \`ng g @angular/core:control-flow\`: Migration script

### Why CLI?
- **Scaffolding:** Creates spec files, css, html templates automatically.
- **Naming Conventions:** Enforces kebab-case file names, PascalCase classes.
- **Registration:** Automatically updates imports (in non-standalone).
- **Schematics:** Can use custom schematics (e.g., NgRx, Material).`,
    codeExample: `// Angular CLI Generator Simulation
const cli = {
  generate: (type, name, options = {}) => {
    console.log(\`Generating \${type}: \${name}...\`);
    if (options.standalone) console.log('  -> Mode: Standalone');
    if (options.skipTests) console.log('  -> Skip: *.spec.ts');
    console.log(\`  -> Created src/app/\${name}/\${name}.\${type}.ts\`);
    console.log(\`  -> Created src/app/\${name}/\${name}.\${type}.html\`);
    console.log('✓ Done');
  }
};

// --- Execution ---
console.log('=== 1. Generate Component ===');
cli.generate('component', 'user-profile', { standalone: true });

console.log('\\n=== 2. Generate Service (Skip Tests) ===');
cli.generate('service', 'auth', { skipTests: true });

console.log('\\n=== 3. Migration Script ===');
console.log('ng g @angular/core:control-flow');
console.log('-> Migrating *ngIf to @if');
console.log('-> Migrating *ngFor to @for');`
  },
  {
    id: 'angular-real-17',
    category: 'Real Interview Questions',
    difficulty: 'Hard',
    question: 'Have you implemented Angular Universal (SSR)?',
    answer: `**Yes, I have implemented SSR for SEO requirements.**

### Implementation Steps:
1. **Add SSR:** \`ng add @angular/ssr\` (Modern)
2. **Server Logic:** \`server.ts\` (Express server)
3. **Hydration:** Non-destructive hydration in Angular 18+

### Platform Checks:
- **Avoid:** \`window\`, \`document\`, \`localStorage\` on server.
- **Use:** \`isPlatformBrowser(platformId)\`, \`isPlatformServer(platformId)\`.

### TransferState:
- Prevent duplicate HTTP calls (Server fetches -> passes data to Client).
- **Client:** Reads from TransferState instead of re-fetching.`,
    codeExample: `// SSR Platform Checks
console.log('=== Platform Check Simulation ===');

// Mock platform ID token
const PLATFORM_ID = 'PLATFORM_ID_TOKEN';
const isPlatformBrowser = (id) => id === 'browser';
const isPlatformServer = (id) => id === 'server';

function initComponent(platformId) {
  if (isPlatformBrowser(platformId)) {
    console.log('[Browser] accessing localStorage...');
    // localStorage.getItem('token');
  } else {
    console.log('[Server] skipping localStorage (would crash)');
  }

  if (isPlatformServer(platformId)) {
    console.log('[Server] Database Direct Connect / Redis Cache');
  }
}

// Run as Server
console.log('--- Running on Server ---');
initComponent('server');

// Run as Browser
console.log('\\n--- Running on Browser ---');
initComponent('browser');`
  },
  {
    id: 'angular-real-18',
    category: 'Real Interview Questions',
    difficulty: 'Medium',
    question: 'Difference between Subject and BehaviorSubject?',
    answer: `**I use both, but for different purposes.**

### BehaviorSubject (My Default for State)
- **Has Initial Value:** Must provide one.
- **Replays Value:** New subscribers get the *last* emitted value immediately.
- **Usage:** State management, Current User, Theme, Config.

### Subject (Event Bus)
- **No Initial Value:** Starts "empty".
- **No Replay:** Late subscribers miss past values.
- **Usage:** Button clicks, Destroy signals (\`takeUntil\`), Toast triggers.

### ReplaySubject
- **Replays N Values:** Keeps a buffer (e.g., last 5).
- **Usage:** Chat history, navigation history.`,
    codeExample: `// Subject vs BehaviorSubject Demo
// Mock RxJS Classes
class Subject {
  observers = [];
  subscribe(fn) { this.observers.push(fn); }
  next(val) { this.observers.forEach(fn => fn(val)); }
}

class BehaviorSubject extends Subject {
  constructor(initial) {
    super();
    this.value = initial;
  }
  subscribe(fn) {
    fn(this.value); // Emit current value immediately
    super.subscribe(fn);
  }
  next(val) {
    this.value = val;
    super.next(val);
  }
}

// --- Execution ---
console.log('=== BehaviorSubject (State) ===');
const user$ = new BehaviorSubject("Guest");
user$.subscribe(u => console.log("Sub1:", u));

console.log('\\n-> Updating to Admin...');
user$.next("Admin");

console.log('-> Sub2 subscribes late...');
user$.subscribe(u => console.log("Sub2:", u)); // Gets "Admin"

console.log('\\n=== Subject (Events) ===');
const click$ = new Subject();
click$.subscribe(() => console.log("Clicked!"));
click$.next("Click Event");

console.log('-> Sub3 subscribes late...');
click$.subscribe(() => console.log("Too late to hear click"));`
  },
  {
    id: 'angular-real-19',
    category: 'Real Interview Questions',
    difficulty: 'Medium',
    question: 'Have you worked on internationalization (i18n)?',
    answer: `**Yes, I've used both Angular i18n and ngx-translate.**

### 1. ngx-translate (My Preference for SPAs)
- **Dynamic:** Switch language without reloading.
- **JSON files:** \`assets/i18n/en.json\`.
- **Pipe:** \`{{ 'HELLO' | translate }}\`

### 2. Angular i18n (Native)
- **Static:** Build-time replacement (Zero runtime cost).
- **Format:** XLIFF standard files.
- **Better for:** Public SEO-heavy sites.

### Transloco
- Modern alternative to ngx-translate using Signals.`,
    codeExample: `// i18n Simulation (ngx-translate style)
const translations = {
  en: { WELCOME: "Welcome, {{name}}!" },
  fr: { WELCOME: "Bienvenue, {{name}}!" }
};

let currentLang = 'en';

function translate(key, params) {
  let value = translations[currentLang][key];
  Object.keys(params).forEach(k => {
    value = value.replace('{{' + k + '}}', params[k]);
  });
  return value;
}

// --- Execution ---
console.log('Current Lang: EN');
console.log(translate('WELCOME', { name: 'John' }));

console.log('\\n-> Switching to FR...');
currentLang = 'fr';
console.log(translate('WELCOME', { name: 'Jean' }));`
  },
  {
    id: 'angular-real-20',
    category: 'Real Interview Questions',
    difficulty: 'Expert',
    question: 'Dependency Injection – what internal procedures happen inside?',
    answer: `**DI is a hierarchical system based on Injector trees.**

### Internal Procedure:
1. **Request:** Component asks for \`inject(Dep)\`.
2. **Resolution (Bubbling):**
   - Check **ElementInjector** (Component providers).
   - Check **Parent ElementInjector**.
   - Bubble to **Root ElementInjector**.
3. **Module Injector** (Environment):
   - Check **EnvironmentInjector** (Route/AppConfig).
   - Check **RootInjector** (Platform).
4. **NullInjector:** Throw error if not found.

### Modifiers:
- \`@Self()\`, \`@SkipSelf()\`, \`@Host()\`, \`@Optional()\`.`,
    codeExample: `// DI Resolution Simulator
const ElementInjector = { providers: ['LocalService'] };
const RootInjector = { providers: ['GlobalService'] };

function inject(token) {
  console.log(\`Requesting: \${token}...\`);
  
  if (ElementInjector.providers.includes(token)) {
    return \`Found \${token} in ElementInjector\`;
  }
  console.log('-> Not found in Element, bubbling up...');
  
  if (RootInjector.providers.includes(token)) {
    return \`Found \${token} in RootInjector\`;
  }
  
  throw new Error(\`NullInjectorError: No provider for \${token}!\`);
}

// --- Execution ---
console.log(inject('LocalService'));
console.log('');
console.log(inject('GlobalService'));
console.log('');
try {
  inject('MissingService');
} catch (e) {
  console.error(e.message);
}`
  },
  {
    id: 'angular-real-21',
    category: 'Real Interview Questions',
    difficulty: 'Hard',
    question: 'Difference between forRoot and forChild routing?',
    answer: `**It's about Singleton pattern vs Feature encapsulation.**

### forRoot (App Module / Root Config)
- **Registers Router Service:** Creates the *singleton* Router instance.
- **Registers Routes:** Root-level paths.
- **Usage:** Once in \`app.config.ts\`.

### forChild (Feature Modules)
- **No Service:** Does NOT create a new Router service.
- **Registers Routes:** Adds feature routes to existing Router.
- **Usage:** In every Lazy Loaded Module.

### Why?
- If features used \`forRoot\`, they would overwrite the Router instance, breaking navigation history.`,
    codeExample: `// Routing Config Demo
const appRoutes = [
  { path: '', component: 'Home' }
];

const featureRoutes = [
  { path: 'list', component: 'List' }
];

// Simulation
console.log('=== Root Config (forRoot) ===');
console.log('provideRouter(appRoutes) -> Creates Router Singleton');
console.log('Routes:', appRoutes);

console.log('\\n=== Feature Config (forChild) ===');
console.log('RouterModule.forChild(featureRoutes) -> Registers extra routes');
console.log('Routes:', featureRoutes);

console.log('\\n✓ Ensures only ONE Router instance exists');`
  },
  {
    id: 'angular-real-22',
    category: 'Real Interview Questions',
    difficulty: 'Medium',
    question: 'How did you use interceptors?',
    answer: `**I use HttpInterceptors for cross-cutting API concerns.**

### Common Use Cases:
1. **Auth:** Add \`Authorization: Bearer\` token.
2. **Errors:** Catch 401/500 errors globally.
3. **Loading:** Show global spinner.
4. **Logging:** Log request duration.

### Modern Implementation:
- **Functional Interceptors (\`HttpInterceptorFn\`)** in \`provideHttpClient\`.`,
    codeExample: `// Functional Interceptor Demo
const req = { headers: {} };
const next = (r) => {
  console.log('Sending Request with headers:', r.headers);
  return 'Response 200 OK';
};

const authInterceptor = (req, next) => {
  console.log('-> Interceptor: Adding Token...');
  req.headers['Authorization'] = 'Bearer XYZ-123';
  return next(req);
};

// --- Execution ---
console.log('=== Making HTTP Request ===');
const result = authInterceptor(req, next);
console.log('Result:', result); `
  },
  {
    id: 'angular-real-23',
    category: 'Real Interview Questions',
    difficulty: 'Easy',
    question: 'Agile methodologies – how do you design sprints?',
    answer: `**I work in 2-week sprints using Scrum.**

### Cycle:
1. **Refinement:** Estimate points (Fibonacci).
2. **Planning:** Commit to tickets.
3. **Daily Standup:** Blockers / Progress.
4. **Dev & Review:** Code + Tests + PR.
5. **QA & Demo:** Verify and Show.
6. **Retro:** Improve process.

### My Role:
- Break down technical tasks.
- Communicate blockers early.`,
    codeExample: `// Agile Sprint Board Visualization
const sprint = {
  todo: ['Feature A (5pts)', 'Bug Fix B (2pts)'],
  inProgress: ['Feature C (8pts)'],
  done: ['Setup Repo (1pt)']
};

console.log('=== Sprint Status ===');
console.table(sprint);

console.log('\\n=== Velocity ===');
console.log('Planned: 16 pts');
console.log('Completed: 1 pt');
console.log('Remaining: 15 pts'); `
  },
  {
    id: 'angular-real-24',
    category: 'Real Interview Questions',
    difficulty: 'Medium',
    question: 'Did you rename app.module.ts?',
    answer: `**In modern Angular (15+), we don't rename it, we DELETE it!**

### Standalone Era:
- **Bootstrapping:** Moves to \`main.ts\` with \`bootstrapApplication\`.
- **Config:** \`app.config.ts\` replaces \`AppModule\` providers.

### Legacy Apps:
- We keep \`AppModule\` (no renaming) for backward compatibility.`,
    codeExample: `// Modern Bootstrapping
console.log('=== main.ts ===');
console.log('bootstrapApplication(AppComponent, appConfig)');

console.log('\\n=== app.config.ts ===');
console.log('export const appConfig = {');
console.log('  providers: [');
console.log('    provideRouter(routes),');
console.log('    provideHttpClient()');
console.log('  ]');
console.log('};');

console.log('\\n✓ No AppModule needed');
console.log('✓ Cleaner Architecture');`
  },
  {
    id: 'angular-real-25',
    category: 'Real Interview Questions',
    difficulty: 'Expert',
    question: 'In standalone apps, is zone.js still required?',
    answer: `**With Angular 18+, No! using "Zoneless" mode.**

### Transition:
- **< v18:** \`zone.js\` required for auto change detection.
- **v18+:** \`provideExperimentalZonelessChangeDetection()\`.
- **Signals:** The core mechanism driving Zoneless.

### Benefits:
- **Performance:** No async monkey-patching.
- **Size:** Saves ~10KB (gzipped).
- **Debug:** Cleaner stack traces.`,
    codeExample: `// Going Zoneless Demo
console.log('=== Zoneless Configuration ===');
console.log('providers: [');
console.log('  provideExperimentalZonelessChangeDetection()');
console.log(']');

console.log('\\n=== Change Detection Strategy ===');
console.log('1. Signal updates -> Trigger UI update');
console.log('2. Async pipe -> Trigger UI update');
console.log('3. Manual: cdr.markForCheck()');

console.log('\\n✓ Zone.js removed from polyfills');
console.log('✓ Lightweight & Fast');`
  }
];
