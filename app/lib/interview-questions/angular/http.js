export const httpQuestions = [
    {
        id: 'angular-http-1',
        category: 'HTTP & APIs',
        difficulty: 'Medium',
        question: 'HTTP Client - Modern HTTP Requests with provideHttpClient()',
        answer: `**HttpClient** handles HTTP requests.

### Setup (Angular 18+):
\`provideHttpClient()\` in providers

### Methods:
- get, post, put, delete
- All return Observables

### Features:
- Type-safe
- Interceptors
- Error handling`,
        codeExample: `// HTTP Client
console.log('=== Setup ===');
console.log('bootstrapApplication(App, {');
console.log('  providers: [provideHttpClient()]');
console.log('});');

console.log('\\n=== Using HttpClient ===');
console.log('class UserService {');
console.log('  http = inject(HttpClient);');
console.log('  ');
console.log('  getUsers() {');
console.log('    return this.http.get<User[]>("/api/users");');
console.log('  }');
console.log('  ');
console.log('  createUser(user: User) {');
console.log('    return this.http.post("/api/users", user);');
console.log('  }');
console.log('}');

console.log('\\n✓ HttpClient: Type-safe HTTP requests');`
    },
    {
        id: 'angular-http-2',
        category: 'HTTP & APIs',
        difficulty: 'Hard',
        question: 'HTTP Interceptors - Functional Interceptors (Angular 15+)',
        answer: `**Interceptors** intercept HTTP requests/responses.

### Use Cases:
- Add auth headers
- Log requests
- Handle errors globally
- Transform responses

### Modern Approach:
Functional interceptors`,
        codeExample: `// HTTP Interceptors
console.log('=== Functional Interceptor ===');
console.log('export const authInterceptor: HttpInterceptorFn = (req, next) => {');
console.log('  const authToken = inject(AuthService).getToken();');
console.log('  ');
console.log('  const authReq = req.clone({');
console.log('    headers: req.headers.set("Authorization", authToken)');
console.log('  });');
console.log('  ');
console.log('  return next(authReq);');
console.log('};');

console.log('\\n=== Providing Interceptor ===');
console.log('provideHttpClient(');
console.log('  withInterceptors([authInterceptor])');
console.log(');');

console.log('\\n✓ Interceptors: Global HTTP handling');`
    },
    {
        id: 'angular-http-3',
        category: 'HTTP & APIs',
        difficulty: 'Medium',
        question: 'HTTP Request Options - Headers, Params, Response Type',
        answer: `**Request options** customize HTTP requests.

### Options:
- headers
- params
- responseType
- observe

### Use Cases:
- Custom headers
- Query parameters
- Blob responses`,
        codeExample: `// HTTP Request Options
console.log('=== Headers ===');
console.log('this.http.get("/api/users", {');
console.log('  headers: { "Custom-Header": "value" }');
console.log('});');

console.log('\\n=== Query Params ===');
console.log('this.http.get("/api/users", {');
console.log('  params: { page: "1", limit: "10" }');
console.log('});');
console.log('// GET /api/users?page=1&limit=10');

console.log('\\n=== Response Type ===');
console.log('this.http.get("/api/file", {');
console.log('  responseType: "blob"');
console.log('});');

console.log('\\n✓ Request options: Customize requests');`
    },
    {
        id: 'angular-http-4',
        category: 'HTTP & APIs',
        difficulty: 'Hard',
        question: 'HTTP Error Handling - Global and Local Strategies',
        answer: `**Error handling** manages HTTP failures.

### Strategies:
- catchError operator
- Error interceptor
- Retry logic

### Best Practice:
Handle errors at service level`,
        codeExample: `// HTTP Error Handling
console.log('=== Service-level Error Handling ===');
console.log('getUsers() {');
console.log('  return this.http.get<User[]>("/api/users").pipe(');
console.log('    retry(2),');
console.log('    catchError(error => {');
console.log('      console.error("Error:", error);');
console.log('      return of([]);');
console.log('    })');
console.log('  );');
console.log('}');

console.log('\\n=== Error Interceptor ===');
console.log('export const errorInterceptor: HttpInterceptorFn = (req, next) => {');
console.log('  return next(req).pipe(');
console.log('    catchError(error => {');
console.log('      if (error.status === 401) {');
console.log('        // Redirect to login');
console.log('      }');
console.log('      return throwError(() => error);');
console.log('    })');
console.log('  );');
console.log('};');

console.log('\\n✓ Error handling: Graceful failures');`
    },
    {
        id: 'angular-http-5',
        category: 'HTTP & APIs',
        difficulty: 'Expert',
        question: 'HTTP Caching Strategies - In-memory and HTTP Cache',
        answer: `**Caching** improves performance by storing responses.

### Strategies:
- In-memory cache (service)
- HTTP cache headers
- shareReplay operator

### Use Cases:
- Static data
- User profiles
- Configuration`,
        codeExample: `// HTTP Caching
console.log('=== In-memory Cache ===');
console.log('class UserService {');
console.log('  private cache = new Map<string, Observable<any>>();');
console.log('  ');
console.log('  getUser(id: string) {');
console.log('    if (!this.cache.has(id)) {');
console.log('      this.cache.set(id,');
console.log('        this.http.get("/api/user/" + id).pipe(');
console.log('          shareReplay(1)');
console.log('        )');
console.log('      );');
console.log('    }');
console.log('    return this.cache.get(id)!;');
console.log('  }');
console.log('}');

console.log('\\n=== shareReplay Caching ===');
console.log('users$ = this.http.get("/api/users").pipe(');
console.log('  shareReplay({ bufferSize: 1, refCount: true })');
console.log(');');

console.log('\\n✓ Caching: Reduce redundant requests');`
    }
];
