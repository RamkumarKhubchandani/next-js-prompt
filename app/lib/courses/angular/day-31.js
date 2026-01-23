export const day31 = {
  day: 31,
  title: "Service Workers & Caching Strategies",
  intro: "Master service workers for offline-first apps. Implement caching strategies for optimal performance.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚙️ Service Workers</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Service workers are scripts that run in the background, enabling offline functionality and caching.
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-green-500">
<pre class="text-gray-800 dark:text-gray-100">
// Caching strategies
{
  "dataGroups": [{
    "name": "api",
    "urls": ["/api/**"],
    "cacheConfig": {
      "strategy": "freshness", // or "performance"
      "maxAge": "1h",
      "timeout": "5s"
    }
  }]
}
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Caching Strategies</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-8">
  <li><strong class="text-brand-primary">Cache First:</strong> Serve from cache, fallback to network</li>
  <li><strong class="text-brand-primary">Network First:</strong> Try network, fallback to cache</li>
  <li><strong class="text-brand-primary">Stale While Revalidate:</strong> Serve cache, update in background</li>
</ul>
`,
  code: `// Service worker update check
import { SwUpdate } from '@angular/service-worker';

export class AppComponent {
  swUpdate = inject(SwUpdate);
  
  checkForUpdates() {
    this.swUpdate.checkForUpdate().then(hasUpdate => {
      if (hasUpdate) {
        window.location.reload();
      }
    });
  }
}`,
  comparison: {
    junior: `// ❌ No caching strategy`,
    senior: `// ✅ Smart caching with service worker`
  },
  interview: {
    questions: [
      {
        q: "What's the difference between Cache First and Network First?",
        a: "Cache First: Fast but potentially stale. Network First: Fresh but slower. Choose based on data freshness requirements."
      }
    ]
  }
};

export const day32 = {
  day: 32,
  title: "Security: XSS, CSRF, and Sanitization",
  intro: "Secure your Angular app against common vulnerabilities. Implement XSS protection, CSRF tokens, and proper sanitization.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔒 Security Fundamentals</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Angular has built-in security features, but you need to use them correctly.
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-red-500">
<pre class="text-gray-800 dark:text-gray-100">
// XSS Protection (Angular sanitizes by default)
<div>{{ userInput }}</div> // Safe!

// Bypass sanitization (DANGEROUS!)
<div [innerHTML]="dangerousHtml"></div> // Use DomSanitizer!

// Proper sanitization
import { DomSanitizer } from '@angular/platform-browser';

constructor(private sanitizer: DomSanitizer) {}

get safeHtml() {
  return this.sanitizer.sanitize(SecurityContext.HTML, this.html);
}
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Security Checklist</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-8">
  <li>✅ Never use innerHTML with user input</li>
  <li>✅ Use HTTPS everywhere</li>
  <li>✅ Implement CSRF tokens for state-changing requests</li>
  <li>✅ Validate all inputs on backend</li>
  <li>✅ Use Content Security Policy (CSP)</li>
</ul>
`,
  code: `// Safe HTML rendering
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export class SafeComponent {
  sanitizer = inject(DomSanitizer);
  
  getSafeHtml(html: string): SafeHtml {
    return this.sanitizer.sanitize(SecurityContext.HTML, html) || '';
  }
}`,
  comparison: {
    junior: `// ❌ Dangerous
<div [innerHTML]="userInput"></div>`,
    senior: `// ✅ Safe
<div [innerHTML]="sanitizer.sanitize(SecurityContext.HTML, userInput)"></div>`
  },
  interview: {
    questions: [
      {
        q: "How does Angular prevent XSS?",
        a: "Angular automatically sanitizes values in templates. For innerHTML, use DomSanitizer to explicitly mark content as safe."
      }
    ]
  }
};

export const day33 = {
  day: 33,
  title: "Authentication Patterns & JWT",
  intro: "Implement secure authentication with JWT tokens, refresh tokens, and proper token storage.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔐 Authentication</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Modern auth uses JWT tokens. Store securely, refresh automatically, and handle expiration gracefully.
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-blue-500">
<pre class="text-gray-800 dark:text-gray-100">
// Auth service
@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'auth_token';
  
  login(credentials: Credentials) {
    return this.http.post('/api/login', credentials).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.token);
      })
    );
  }
  
  getToken() {
    return localStorage.getItem(this.tokenKey);
  }
  
  logout() {
    localStorage.removeItem(this.tokenKey);
  }
}
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Best Practices</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-8">
  <li><strong class="text-brand-primary">HttpOnly Cookies:</strong> Most secure (not accessible via JS)</li>
  <li><strong class="text-brand-primary">Refresh Tokens:</strong> Short-lived access tokens + long-lived refresh</li>
  <li><strong class="text-brand-primary">Auto-Refresh:</strong> Refresh before expiration</li>
</ul>
`,
  code: `// JWT interceptor
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: \`Bearer \${token}\` }
    });
  }
  
  return next(req);
};`,
  comparison: {
    junior: `// ❌ Store token in component
this.token = response.token;`,
    senior: `// ✅ Centralized auth service
this.authService.setToken(response.token);`
  },
  interview: {
    questions: [
      {
        q: "Where should you store JWT tokens?",
        a: "HttpOnly cookies (most secure) or localStorage (easier but vulnerable to XSS). Never in regular cookies or sessionStorage for sensitive data."
      }
    ]
  }
};

export const day34 = {
  day: 34,
  title: "Authorization & Role-Based Access Control",
  intro: "Implement RBAC, permission systems, and fine-grained access control in Angular apps.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">👥 Authorization</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Authentication = Who you are. Authorization = What you can do.
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-purple-500">
<pre class="text-gray-800 dark:text-gray-100">
// Role-based guard
export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  
  if (authService.hasRole('admin')) {
    return true;
  }
  
  return inject(Router).createUrlTree(['/unauthorized']);
};

// Usage
{
  path: 'admin',
  canActivate: [authGuard, adminGuard],
  component: AdminComponent
}
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Permission Patterns</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-8">
  <li><strong class="text-brand-primary">Roles:</strong> User, Admin, Moderator</li>
  <li><strong class="text-brand-primary">Permissions:</strong> Fine-grained (can_edit_post, can_delete_user)</li>
  <li><strong class="text-brand-primary">Hybrid:</strong> Roles with permissions</li>
</ul>
`,
  code: `// Permission directive
@Directive({ selector: '[hasPermission]' })
export class HasPermissionDirective {
  @Input() hasPermission: string;
  authService = inject(AuthService);
  viewContainer = inject(ViewContainerRef);
  templateRef = inject(TemplateRef);
  
  ngOnInit() {
    if (this.authService.hasPermission(this.hasPermission)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}`,
  comparison: {
    junior: `// ❌ Check roles in every component
@if (user.role === 'admin') { }`,
    senior: `// ✅ Directive for reusability
<div *hasPermission="'admin'">Admin content</div>`
  },
  interview: {
    questions: [
      {
        q: "Roles vs Permissions?",
        a: "Roles group permissions (Admin has many permissions). Permissions are granular (can_edit_post). Use roles for simplicity, permissions for flexibility."
      }
    ]
  }
};

export const day35 = {
  day: 35,
  title: "Internationalization (i18n)",
  intro: "Build multilingual Angular apps. Handle translations, date formats, and locale-specific content.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🌍 Internationalization</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
i18n makes your app work in multiple languages. Angular has built-in support.
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-green-500">
<pre class="text-gray-800 dark:text-gray-100">
// Mark text for translation
<h1 i18n>Hello World</h1>

// With description and meaning
<h1 i18n="@@homeTitle">Welcome</h1>

// Pluralization
<span i18n>
  {count, plural, =0 {No items} =1 {One item} other {{{count}} items}}
</span>
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ i18n Features</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-8">
  <li><strong class="text-brand-primary">Translations:</strong> Text in multiple languages</li>
  <li><strong class="text-brand-primary">Pluralization:</strong> Handle singular/plural</li>
  <li><strong class="text-brand-primary">Date/Number Formatting:</strong> Locale-specific</li>
  <li><strong class="text-brand-primary">RTL Support:</strong> Right-to-left languages</li>
</ul>
`,
  code: `// Extract translations
ng extract-i18n

// Build for specific locale
ng build --localize

// Runtime locale switching (use library like @ngx-translate)
import { TranslateService } from '@ngx-translate/core';

export class AppComponent {
  translate = inject(TranslateService);
  
  switchLanguage(lang: string) {
    this.translate.use(lang);
  }
}`,
  comparison: {
    junior: `// ❌ Hardcoded text
<h1>Welcome</h1>`,
    senior: `// ✅ Translatable
<h1 i18n="@@welcome">Welcome</h1>`
  },
  interview: {
    questions: [
      {
        q: "Compile-time vs Runtime i18n?",
        a: "Compile-time: Separate builds per locale (Angular default). Runtime: Switch languages without rebuild (use @ngx-translate)."
      }
    ]
  }
};
