export const dependencyInjectionQuestions = [
    {
        id: 'angular-di-1',
        category: 'Dependency Injection',
        difficulty: 'Medium',
        question: 'inject() Function - Modern Dependency Injection (Angular 14+)',
        answer: `The **inject()** function is the modern way to inject dependencies in Angular.

### Benefits over Constructor Injection:
- Use anywhere in injection context
- Cleaner syntax
- Better for functional programming
- Works in factory functions

### Injection Context:
- Constructor
- Field initializers
- Factory functions
- \`runInInjectionContext()\`

### Use Cases:
- Functional guards/interceptors
- Factory functions
- Class field initializers`,
        codeExample: `// inject() Function
console.log('=== OLD: Constructor Injection ===');
console.log('class UserService {');
console.log('  constructor(private http: HttpClient) {}');
console.log('}');

console.log('\\n=== NEW: inject() Function ===');
console.log('class UserService {');
console.log('  private http = inject(HttpClient);');
console.log('}');

console.log('\\n=== Functional Guard ===');
console.log('export const authGuard = () => {');
console.log('  const authService = inject(AuthService);');
console.log('  return authService.isAuthenticated();');
console.log('};');

console.log('\\n=== Factory Function ===');
console.log('export function createUserService() {');
console.log('  const http = inject(HttpClient);');
console.log('  return new UserService(http);');
console.log('}');

console.log('\\n✓ inject(): Modern, flexible DI');
console.log('✓ Works in injection context');`
    },
    {
        id: 'angular-di-2',
        category: 'Dependency Injection',
        difficulty: 'Hard',
        question: 'Hierarchical Injectors - Understanding the Injector Tree',
        answer: `Angular has a **hierarchical injector system** with multiple levels.

### Injector Hierarchy:
1. **Platform Injector** - Shared across all apps
2. **Root Injector** - Application-wide (providedIn: 'root')
3. **Module Injector** - NgModule level
4. **Element Injector** - Component/Directive level

### Resolution Strategy:
Angular searches up the tree from component to root.

### providedIn Strategies:
- **'root'** - Application singleton
- **'platform'** - Platform singleton
- **'any'** - One instance per injector
- **null** - Must be provided explicitly`,
        codeExample: `// Hierarchical Injectors
console.log('=== Injector Hierarchy ===');
console.log('Platform Injector (top)');
console.log('  └─ Root Injector');
console.log('      └─ Module Injector');
console.log('          └─ Component Injector');
console.log('              └─ Child Component Injector');

console.log('\\n=== providedIn Strategies ===');
console.log('@Injectable({ providedIn: "root" })');
console.log('class AppService {} // Application singleton');

console.log('\\n@Injectable({ providedIn: "any" })');
console.log('class FeatureService {} // One per injector');

console.log('\\n=== Component-level Provider ===');
console.log('@Component({');
console.log('  providers: [UserService] // New instance per component');
console.log('})');

console.log('\\n=== Resolution Example ===');
console.log('1. Child component requests UserService');
console.log('2. Check child component injector');
console.log('3. Check parent component injector');
console.log('4. Check module injector');
console.log('5. Check root injector');
console.log('6. Throw error if not found');

console.log('\\n✓ Hierarchical: Multiple injector levels');
console.log('✓ Resolution: Bottom-up search');`
    },
    {
        id: 'angular-di-3',
        category: 'Dependency Injection',
        difficulty: 'Medium',
        question: 'InjectionToken - Type-safe Non-class Dependencies',
        answer: `**InjectionToken** provides type-safe tokens for non-class dependencies.

### When to Use:
- Configuration objects
- String/number values
- Functions
- Interfaces (can't be used as tokens)

### Benefits:
- Type safety
- Prevents naming collisions
- Better than string tokens

### Use Cases:
- API URLs
- Feature flags
- Configuration objects`,
        codeExample: `// InjectionToken
console.log('=== Creating InjectionToken ===');
console.log('export const API_URL = new InjectionToken<string>(');
console.log('  "API_URL",');
console.log('  { providedIn: "root", factory: () => "/api" }');
console.log(');');

console.log('\\n=== Providing Value ===');
console.log('bootstrapApplication(AppComponent, {');
console.log('  providers: [');
console.log('    { provide: API_URL, useValue: "https://api.example.com" }');
console.log('  ]');
console.log('});');

console.log('\\n=== Injecting Value ===');
console.log('class ApiService {');
console.log('  private apiUrl = inject(API_URL);');
console.log('  ');
console.log('  getUsers() {');
console.log('    return this.http.get(this.apiUrl + "/users");');
console.log('  }');
console.log('}');

console.log('\\n=== Config Object Example ===');
console.log('interface AppConfig {');
console.log('  apiUrl: string;');
console.log('  timeout: number;');
console.log('}');
console.log('');
console.log('const APP_CONFIG = new InjectionToken<AppConfig>("APP_CONFIG");');

console.log('\\n✓ InjectionToken: Type-safe non-class dependencies');
console.log('✓ Better than string tokens');`
    },
    {
        id: 'angular-di-4',
        category: 'Dependency Injection',
        difficulty: 'Expert',
        question: 'Multi-providers - Multiple Values for Same Token',
        answer: `**Multi-providers** allow multiple values for the same injection token.

### Use Cases:
- HTTP interceptors
- Route guards
- Validators
- Plugin systems

### How It Works:
- Set \`multi: true\`
- All providers collected into array
- Injected as array

### Common Examples:
- HTTP_INTERCEPTORS
- APP_INITIALIZER
- NG_VALIDATORS`,
        codeExample: `// Multi-providers
console.log('=== Single Provider (Normal) ===');
console.log('{ provide: UserService, useClass: UserService }');
console.log('// Injects: UserService instance');

console.log('\\n=== Multi-provider ===');
console.log('{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }');
console.log('{ provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }');
console.log('// Injects: [AuthInterceptor, LoggingInterceptor]');

console.log('\\n=== Custom Multi-provider ===');
console.log('const VALIDATORS = new InjectionToken<Validator[]>("VALIDATORS");');
console.log('');
console.log('providers: [');
console.log('  { provide: VALIDATORS, useClass: EmailValidator, multi: true },');
console.log('  { provide: VALIDATORS, useClass: PhoneValidator, multi: true }');
console.log(']');

console.log('\\n=== Using Multi-provider ===');
console.log('class FormService {');
console.log('  validators = inject(VALIDATORS); // Array of validators');
console.log('  ');
console.log('  validate(value: string) {');
console.log('    return this.validators.every(v => v.validate(value));');
console.log('  }');
console.log('}');

console.log('\\n✓ Multi-providers: Multiple values for same token');
console.log('✓ Common in HTTP interceptors, validators');`
    },
    {
        id: 'angular-di-5',
        category: 'Dependency Injection',
        difficulty: 'Hard',
        question: 'DestroyRef - Modern Cleanup (Angular 16+)',
        answer: `**DestroyRef** provides a modern way to handle component cleanup.

### Benefits over ngOnDestroy:
- Functional approach
- Works anywhere in injection context
- Composable
- Better for functional programming

### Use Cases:
- Cleanup subscriptions
- Clear timers
- Remove event listeners
- Cancel pending requests

### Integration:
- Works with \`takeUntilDestroyed()\`
- Replaces manual Subject cleanup`,
        codeExample: `// DestroyRef
console.log('=== OLD: ngOnDestroy ===');
console.log('class OldComponent implements OnDestroy {');
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

console.log('\\n=== NEW: DestroyRef ===');
console.log('class NewComponent {');
console.log('  private destroyRef = inject(DestroyRef);');
console.log('  ');
console.log('  ngOnInit() {');
console.log('    const sub = this.userService.users$.subscribe();');
console.log('    this.destroyRef.onDestroy(() => sub.unsubscribe());');
console.log('  }');
console.log('}');

console.log('\\n=== With takeUntilDestroyed() ===');
console.log('class ModernComponent {');
console.log('  users$ = inject(UserService).users$');
console.log('    .pipe(takeUntilDestroyed());');
console.log('}');
console.log('// Automatically unsubscribes on destroy!');

console.log('\\n✓ DestroyRef: Modern cleanup');
console.log('✓ Works with takeUntilDestroyed()');`
    },
    {
        id: 'angular-di-6',
        category: 'Dependency Injection',
        difficulty: 'Medium',
        question: 'Provider Types - useClass, useValue, useFactory, useExisting',
        answer: `Angular supports **four provider types** for flexible dependency configuration.

### Provider Types:
1. **useClass** - Provide a class
2. **useValue** - Provide a value
3. **useFactory** - Provide via factory function
4. **useExisting** - Alias to existing provider

### When to Use:
- **useClass**: Different implementation
- **useValue**: Configuration, constants
- **useFactory**: Complex creation logic
- **useExisting**: Multiple tokens, same instance`,
        codeExample: `// Provider Types
console.log('=== 1. useClass ===');
console.log('{ provide: UserService, useClass: MockUserService }');
console.log('// Use MockUserService instead of UserService');

console.log('\\n=== 2. useValue ===');
console.log('{ provide: API_URL, useValue: "https://api.example.com" }');
console.log('// Provide constant value');

console.log('\\n=== 3. useFactory ===');
console.log('{ ');
console.log('  provide: UserService,');
console.log('  useFactory: (http: HttpClient) => {');
console.log('    return new UserService(http, "/api/v2");');
console.log('  },');
console.log('  deps: [HttpClient]');
console.log('}');
console.log('// Complex creation logic');

console.log('\\n=== 4. useExisting ===');
console.log('{ provide: Logger, useClass: ConsoleLogger }');
console.log('{ provide: "LOGGER", useExisting: Logger }');
console.log('// Both tokens point to same instance');

console.log('\\n=== Real-world Example ===');
console.log('providers: [');
console.log('  { provide: API_URL, useValue: environment.apiUrl },');
console.log('  { ');
console.log('    provide: HttpClient,');
console.log('    useFactory: (apiUrl) => new HttpClient(apiUrl),');
console.log('    deps: [API_URL]');
console.log('  }');
console.log(']');

console.log('\\n✓ Four provider types for flexibility');`
    },
    {
        id: 'angular-di-7',
        category: 'Dependency Injection',
        difficulty: 'Hard',
        question: 'Optional Dependencies - @Optional and @SkipSelf',
        answer: `Angular provides **decorators** to modify dependency resolution.

### Decorators:
- **@Optional()** - Don't throw if not found
- **@SkipSelf()** - Skip current injector
- **@Self()** - Only check current injector
- **@Host()** - Stop at host component

### Use Cases:
- **@Optional**: Optional features
- **@SkipSelf**: Avoid circular dependencies
- **@Self**: Component-specific services
- **@Host**: Content projection scenarios`,
        codeExample: `// Optional Dependencies
console.log('=== @Optional ===');
console.log('class Component {');
console.log('  constructor(@Optional() private logger?: Logger) {');
console.log('    if (this.logger) {');
console.log('      this.logger.log("Component created");');
console.log('    }');
console.log('  }');
console.log('}');
console.log('// No error if Logger not provided');

console.log('\\n=== @SkipSelf ===');
console.log('class ChildComponent {');
console.log('  constructor(@SkipSelf() private parentService: ParentService) {}');
console.log('}');
console.log('// Get service from parent, not self');

console.log('\\n=== @Self ===');
console.log('class Component {');
console.log('  constructor(@Self() private service: LocalService) {}');
console.log('}');
console.log('// Only check component injector');

console.log('\\n=== @Host ===');
console.log('class Directive {');
console.log('  constructor(@Host() private component: HostComponent) {}');
console.log('}');
console.log('// Stop search at host component');

console.log('\\n=== Combining Decorators ===');
console.log('constructor(');
console.log('  @Optional() @SkipSelf() private parent?: ParentService');
console.log(') {}');

console.log('\\n✓ Decorators modify DI resolution');`
    },
    {
        id: 'angular-di-8',
        category: 'Dependency Injection',
        difficulty: 'Expert',
        question: 'Circular Dependencies - Detection and Solutions',
        answer: `**Circular dependencies** occur when services depend on each other.

### Detection:
Angular throws error: "Circular dependency detected"

### Solutions:
1. **Refactor** - Extract shared logic
2. **forwardRef()** - Defer resolution
3. **@SkipSelf()** - Skip current injector
4. **Injection token** - Indirect reference

### Best Practice:
Refactor to avoid circular dependencies.

### Common Causes:
- Service A needs Service B
- Service B needs Service A
- Poor architecture`,
        codeExample: `// Circular Dependencies
console.log('=== Problem: Circular Dependency ===');
console.log('class ServiceA {');
console.log('  constructor(private serviceB: ServiceB) {}');
console.log('}');
console.log('');
console.log('class ServiceB {');
console.log('  constructor(private serviceA: ServiceA) {}');
console.log('}');
console.log('// Error: Circular dependency!');

console.log('\\n=== Solution 1: Refactor (Best) ===');
console.log('class SharedService {');
console.log('  sharedLogic() {}');
console.log('}');
console.log('');
console.log('class ServiceA {');
console.log('  constructor(private shared: SharedService) {}');
console.log('}');
console.log('');
console.log('class ServiceB {');
console.log('  constructor(private shared: SharedService) {}');
console.log('}');

console.log('\\n=== Solution 2: forwardRef() ===');
console.log('class ServiceA {');
console.log('  constructor(@Inject(forwardRef(() => ServiceB))');
console.log('    private serviceB: ServiceB) {}');
console.log('}');

console.log('\\n=== Solution 3: Injection Token ===');
console.log('const SERVICE_A = new InjectionToken<ServiceA>("SERVICE_A");');
console.log('');
console.log('class ServiceB {');
console.log('  private serviceA = inject(SERVICE_A);');
console.log('}');

console.log('\\n✓ Best solution: Refactor architecture');
console.log('✓ forwardRef() is workaround, not solution');`
    }
];
