export const day19 = {
  day: 19,
  title: "HTTP Interceptors: Global Request/Response Handling",
  intro: "Intercept HTTP requests and responses to add auth tokens, handle errors globally, and log requests.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 19. **Interceptors** are middleware for HTTP. They intercept every request/response, perfect for auth tokens and error handling."
      },
      {
        type: "challenge",
        instruction: "Create an interceptor that adds an auth token to all requests.",
        buggyCode: `// ❌ Adding token manually to every request
this.http.get('/api/users', {
  headers: { Authorization: 'Bearer ' + this.token }
}).subscribe(...);

this.http.post('/api/users', data, {
  headers: { Authorization: 'Bearer ' + this.token }
}).subscribe(...);`,
        solutionCode: `// ✅ Interceptor adds token automatically
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).getToken();
  
  const authReq = req.clone({
    setHeaders: { Authorization: \`Bearer \${token}\` }
  });
  
  return next(authReq);
};

// Now all requests have the token!
this.http.get('/api/users').subscribe(...);`,
        verifyOutput: "HttpInterceptorFn",
        successMessage: "Perfect! Interceptors centralize cross-cutting concerns like auth.",
        hint: "Use HttpInterceptorFn and req.clone() to modify requests."
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔐 HTTP Interceptors</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Interceptors let you modify requests/responses globally. Perfect for auth tokens, error handling, and logging.
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-green-500">
<pre class="text-gray-800 dark:text-gray-100">
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).getToken();
  
  const authReq = req.clone({
    setHeaders: { Authorization: \`Bearer \${token}\` }
  });
  
  return next(authReq);
};

// Provide in app config
provideHttpClient(
  withInterceptors([authInterceptor])
)
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Common Use Cases</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-8">
  <li><strong class="text-brand-primary">Authentication:</strong> Add auth tokens to all requests</li>
  <li><strong class="text-brand-primary">Error Handling:</strong> Catch 401/403 and redirect to login</li>
  <li><strong class="text-brand-primary">Logging:</strong> Log all requests/responses for debugging</li>
  <li><strong class="text-brand-primary">Loading Indicators:</strong> Show/hide global spinner</li>
  <li><strong class="text-brand-primary">Retry Logic:</strong> Automatically retry failed requests</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔥 Error Handling Interceptor</h3>
<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-red-500">
<pre class="text-gray-800 dark:text-gray-100">
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        inject(Router).navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
</pre>
</div>
`,
  code: `import { HttpInterceptorFn, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs';

// Logging interceptor example
export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const startTime = Date.now();
  console.log(\`📡 Request: \${req.method} \${req.url}\`);
  
  return next(req).pipe(
    tap(event => {
      if (event.type === HttpEventType.Response) {
        const duration = Date.now() - startTime;
        console.log(\`✅ Response: \${event.status} (\${duration}ms)\`);
      }
    })
  );
};

// Auth interceptor example
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // In a real app, get token from AuthService
  const token = 'mock-jwt-token';
  
  const authReq = req.clone({
    setHeaders: {
      Authorization: \`Bearer \${token}\`
    }
  });
  
  console.log('🔐 Added auth token to request');
  return next(authReq);
};

// Error handling interceptor
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    tap({
      error: (error) => {
        console.error('❌ HTTP Error:', error.status, error.message);
        // In real app: redirect to login, show toast, etc.
      }
    })
  );
};`,
  comparison: {
    junior: `// ❌ Adding token to every request manually
this.http.get('/api/users', {
  headers: { Authorization: 'Bearer ' + token }
})`,
    senior: `// ✅ Interceptor adds token automatically
this.http.get('/api/users') // Token added by interceptor`
  },
  interview: {
    questions: [
      {
        q: "What are common use cases for interceptors?",
        a: "Auth tokens, error handling, loading indicators, request/response logging, caching, retry logic."
      },
      {
        q: "Can you have multiple interceptors?",
        a: "Yes! They run in the order you provide them. Request: top to bottom. Response: bottom to top."
      },
      {
        q: "How do you skip an interceptor for specific requests?",
        a: "Use HttpContext to pass metadata. Check context in interceptor and skip if needed."
      }
    ]
  }
};
