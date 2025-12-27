export const securityQuestions = [
    {
        id: 'angular-security-1',
        category: 'Security',
        difficulty: 'Hard',
        question: 'XSS Protection - DomSanitizer and Safe Values',
        answer: `**XSS protection** prevents cross-site scripting attacks.

### Angular's Protection:
- Automatic sanitization
- DomSanitizer for trusted content

### Contexts:
- HTML
- Style
- Script
- URL`,
        codeExample: `// XSS Protection
console.log('=== Automatic Sanitization ===');
console.log('<div [innerHTML]="userContent"></div>');
console.log('// Angular automatically sanitizes');

console.log('\\n=== Bypassing Sanitization (Careful!) ===');
console.log('class Component {');
console.log('  sanitizer = inject(DomSanitizer);');
console.log('  ');
console.log('  trustedHtml = this.sanitizer.bypassSecurityTrustHtml(');
console.log('    "<b>Trusted HTML</b>"');
console.log('  );');
console.log('}');

console.log('\\n=== Security Contexts ===');
console.log('bypassSecurityTrustHtml() // HTML');
console.log('bypassSecurityTrustStyle() // CSS');
console.log('bypassSecurityTrustScript() // JS');
console.log('bypassSecurityTrustUrl() // URL');

console.log('\\n✓ Angular: Built-in XSS protection');
console.log('⚠️ Only bypass for trusted content');`
    },
    {
        id: 'angular-security-2',
        category: 'Security',
        difficulty: 'Medium',
        question: 'CSRF Protection - HTTP Interceptors',
        answer: `**CSRF protection** prevents cross-site request forgery.

### Implementation:
- CSRF token in headers
- HTTP interceptor

### Best Practice:
Use HttpClient's built-in CSRF support`,
        codeExample: `// CSRF Protection
console.log('=== CSRF Interceptor ===');
console.log('export const csrfInterceptor: HttpInterceptorFn = (req, next) => {');
console.log('  const csrfToken = getCsrfToken();');
console.log('  ');
console.log('  if (req.method !== "GET") {');
console.log('    req = req.clone({');
console.log('      headers: req.headers.set("X-CSRF-TOKEN", csrfToken)');
console.log('    });');
console.log('  }');
console.log('  ');
console.log('  return next(req);');
console.log('};');

console.log('\\n=== Getting CSRF Token ===');
console.log('function getCsrfToken() {');
console.log('  return document.cookie');
console.log('    .split("; ")');
console.log('    .find(row => row.startsWith("XSRF-TOKEN="))');
console.log('    ?.split("=")[1] || "";');
console.log('}');

console.log('\\n✓ CSRF: Protect state-changing requests');`
    },
    {
        id: 'angular-security-3',
        category: 'Security',
        difficulty: 'Hard',
        question: 'Authentication and Authorization - JWT and Route Guards',
        answer: `**Auth** secures application access.

### JWT Flow:
1. Login → Get token
2. Store token
3. Send in requests
4. Validate on server

### Route Guards:
Protect routes with canActivate`,
        codeExample: `// Authentication
console.log('=== Auth Service ===');
console.log('class AuthService {');
console.log('  login(credentials) {');
console.log('    return this.http.post("/api/login", credentials)');
console.log('      .pipe(');
console.log('        tap(response => {');
console.log('          localStorage.setItem("token", response.token);');
console.log('        })');
console.log('      );');
console.log('  }');
console.log('  ');
console.log('  getToken() {');
console.log('    return localStorage.getItem("token");');
console.log('  }');
console.log('}');

console.log('\\n=== Auth Guard ===');
console.log('export const authGuard: CanActivateFn = () => {');
console.log('  const authService = inject(AuthService);');
console.log('  const router = inject(Router);');
console.log('  ');
console.log('  if (authService.getToken()) {');
console.log('    return true;');
console.log('  }');
console.log('  return router.createUrlTree(["/login"]);');
console.log('};');

console.log('\\n✓ JWT: Stateless authentication');
console.log('✓ Guards: Protect routes');`
    },
    {
        id: 'angular-security-4',
        category: 'Security',
        difficulty: 'Expert',
        question: 'Content Security Policy (CSP) and Trusted Types',
        answer: `**CSP** prevents injection attacks.

### CSP Headers:
- Restrict script sources
- Prevent inline scripts
- Control resource loading

### Trusted Types:
- Type-safe DOM manipulation
- Prevent DOM XSS`,
        codeExample: `// Content Security Policy
console.log('=== CSP Header ===');
console.log('Content-Security-Policy:');
console.log('  default-src self;');
console.log('  script-src self https://trusted-cdn.com;');
console.log('  style-src self unsafe-inline;');
console.log('  img-src self data:;');

console.log('\\n=== Trusted Types ===');
console.log('// Enable in index.html');
console.log('<meta http-equiv="Content-Security-Policy"');
console.log('  content="require-trusted-types-for \'script\'">');

console.log('\\n=== Safe DOM Manipulation ===');
console.log('// Use Renderer2, not direct DOM');
console.log('this.renderer.setProperty(el, "innerHTML", safeHtml);');
console.log('// NOT: el.innerHTML = userInput;');

console.log('\\n✓ CSP: Restrict resource loading');
console.log('✓ Trusted Types: Prevent DOM XSS');`
    }
];
