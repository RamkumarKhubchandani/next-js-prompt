export const day17 = {
  day: 17,
  title: "Advanced HTTP: Functional Interceptors & Caching",
  intro: "Class-based interceptors are dead. Long live <strong>Functional Interceptors</strong>. We'll build a modern HTTP pipeline with caching, auth, and logging handled by simple functions.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 17. Class-based interceptors are deprecated. Long live **Functional Interceptors**."
      },
      {
        type: "talk",
        message: "We'll build a smart caching interceptor that only caches specific requests using `HttpContext`."
      },
      {
        type: "challenge",
        instruction: "Refactor this class interceptor to a functional interceptor.",
        buggyCode: `// ❌ Old Class Style
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler) {
    const cloned = req.clone({ headers: req.headers.set('Authorization', 'Bearer token') });
    return next.handle(cloned);
  }
}`,
        solutionCode: `// ✅ Modern Functional Style
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cloned = req.clone({ 
    setHeaders: { Authorization: 'Bearer token' } 
  });
  return next(cloned);
};`,
        verifyOutput: "HttpInterceptorFn",
        successMessage: "Clean and simple! No more DI boilerplate. Just a function.",
        hint: "Use type `HttpInterceptorFn = (req, next) => ...`."
      }
    ]
  },
  content: `
<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🛑 1. The Old Way vs New Way</h3>
<p class="mb-6 text-gray-600 dark:text-light-300 leading-relaxed">
We used to implement <code>HttpInterceptor</code> interface and provide it in a confusing array. Now, an interceptor is just a function: <code>(req, next) => next(req)</code>.
</p>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🧠 2. Smart Caching with HttpContext</h3>
<p class="mb-4 text-gray-600 dark:text-light-300 leading-relaxed">
If you put your caching logic in the Service, you are doing it wrong. Put it in an Interceptor so it works for ALL requests.
</p>
<p class="mb-6 text-gray-600 dark:text-light-300 leading-relaxed">
But wait! You don't want to cache *everything*. Use <code>HttpContext</code> to pass "metadata" from your component/service to the interceptor perfectly safely.
</p>

<div class="bg-gray-100 dark:bg-dark-800 p-6 rounded-xl border-l-4 border-purple-500 mb-10">
<pre class="text-sm font-mono text-gray-800 dark:text-gray-200">
// In your component
http.get('/api/users', { 
  context: new HttpContext().set(CACHE_TOKEN, true) 
})

// In your interceptor
if (req.context.get(CACHE_TOKEN)) {
  // Check cache...
}
</pre>
</div>
`,
  code: `import { Component, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { of, delay, tap, map, Observable } from 'rxjs';

// --- MOCK HTTP CLIENT & ARCHITECTURE ---

interface Request {
    url: string;
    method: 'GET' | 'POST';
    headers: Record<string, string>;
    context: { cache?: boolean; auth?: boolean };
    status: 'pending' | 'success' | 'cached' | 'error';
    logs: string[];
}

type HttpHandlerFn = (req: Request) => Observable<any>;
type HttpInterceptorFn = (req: Request, next: HttpHandlerFn) => Observable<any>;

// 1. AUTH INTERCEPTOR
const authInterceptor: HttpInterceptorFn = (req, next) => {
    req.logs.push('🔒 [Auth] Adding Token...');
    req.headers['Authorization'] = 'Bearer xyz-123';
    return next(req);
};

// 2. CACHE INTERCEPTOR
const cacheStore = new Map<string, any>();
const cacheInterceptor: HttpInterceptorFn = (req, next) => {
    if (req.context.cache && cacheStore.has(req.url)) {
        req.logs.push('💾 [Cache] HIT! Serving from memory.');
        req.status = 'cached';
        return of(cacheStore.get(req.url)).pipe(delay(500)); // Simulate fast cache
    }
    
    if (req.context.cache) {
         req.logs.push('💾 [Cache] MISS. Forwarding...');
    }
    
    return next(req).pipe(
        tap(response => {
             if (req.context.cache) {
                 req.logs.push('💾 [Cache] Saving response.');
                 cacheStore.set(req.url, response);
             }
        })
    );
};

// 3. BACKEND HANDLER (Simulated)
const backendHandler: HttpHandlerFn = (req) => {
    req.logs.push('🌐 [Network] Sending to Server...');
    return of({ data: 'Secret Data ' + Math.random().toFixed(2) }).pipe(
        delay(1500), // Network delay
        tap(() => {
            req.status = 'success';
            req.logs.push('✅ [Network] Response received.');
        })
    );
};

@Component({
  selector: 'app-http-lab',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div class="max-w-xl mx-auto bg-gray-950 p-6 rounded-2xl border border-gray-800 shadow-2xl min-h-[500px]" style="background-color: #030712; color: white">
        <h2 class="text-2xl font-bold text-white mb-6">📡 Interceptor Pipeline</h2>

        <!-- Controls -->
        <div class="flex gap-4 mb-8">
            <button (click)="makeRequest(false)" [disabled]="loading()" class="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-colors">
                Fetch Data
            </button>
            <button (click)="makeRequest(true)" [disabled]="loading()" class="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-bold transition-colors">
                Fetch with Cache
            </button>
             <button (click)="clearCache()" class="px-4 py-2 text-red-400 hover:bg-red-900/20 rounded-lg ml-auto text-sm">
                Clear Cache
            </button>
        </div>

        <!-- Request Viz -->
        @if (currentRequest(); as req) {
            <div class="space-y-4">
                <!-- Status Badge -->
                <div class="flex items-center justify-between mb-4">
                     <span class="font-mono text-xs text-gray-500">{{ req.method }} {{ req.url }}</span>
                     <span class="px-2 py-1 rounded text-xs font-bold uppercase"
                           [class.bg-blue-500]="req.status === 'pending'"
                           [class.bg-green-500]="req.status === 'success'"
                           [class.bg-purple-500]="req.status === 'cached'">
                        {{ req.status }}
                     </span>
                </div>

                <!-- Pipeline Visualization -->
                <div class="space-y-4 font-mono text-xs relative">
                     <!-- Line -->
                     <div class="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-800"></div>

                     @for (log of req.logs; track $index) {
                         <div class="flex items-center gap-4 relative animate-in slide-in-from-left duration-300">
                             <div class="w-2 h-2 rounded-full bg-blue-500 ml-2 z-10 box-content border-2 border-gray-950"></div>
                             <span class="text-gray-300">{{ log }}</span>
                         </div>
                     }
                     
                     @if (req.status === 'pending') {
                          <div class="flex items-center gap-4 relative animate-pulse">
                             <div class="w-2 h-2 rounded-full bg-gray-700 ml-2 z-10 box-content border-2 border-gray-950"></div>
                             <span class="text-gray-600 italic">Processing...</span>
                         </div>
                     }
                </div>
                
                <!-- Result Headers -->
                @if (req.headers['Authorization']) {
                     <div class="mt-4 p-3 bg-gray-900 rounded border border-gray-800 font-mono text-[10px] text-gray-400">
                        Header Added: Authorization: {{ req.headers['Authorization'] }}
                     </div>
                }
            </div>
        } @else {
             <div class="text-gray-600 text-center py-12 italic">
                 No active request. Click a button to simulate the HTTP pipeline.
             </div>
        }
    </div>
  \`
})
export class HttpLab {
    currentRequest = signal<Request | null>(null);
    loading = computed(() => this.currentRequest()?.status === 'pending');

    makeRequest(useCache: boolean) {
        const req: Request = {
            url: '/api/secrets',
            method: 'GET',
            headers: {},
            context: { cache: useCache },
            status: 'pending',
            logs: []
        };
        
        this.currentRequest.set(req);

        // --- THE PIPELINE ---
        // We compose the functions manually to simulate how Angular does it
        // chain = Auth -> Cache -> Backend
        
        const chainFn = (initialReq: Request) => 
            authInterceptor(initialReq, (authReq) => 
                cacheInterceptor(authReq, (cacheReq) => 
                    backendHandler(cacheReq)
                )
            );
            
        // Execute
        chainFn(req).subscribe();
    }
    
    clearCache() {
        cacheStore.clear();
    }
}`,
  comparison: {
    junior: `// ❌ Class-based (Old)
@Injectable()
export class TokenInterceptor implements HttpInterceptor { ... }
providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }]`,
    senior: `// ✅ Functional (New)
export const tokenInterceptor: HttpInterceptorFn = (req, next) => { ... }
provideHttpClient(withInterceptors([tokenInterceptor]))`
  },
  interview: {
    questions: [
      {
        q: "How do you pass data to an interceptor?",
        a: "Use \`HttpContext\`. It's a type-safe map attached to the request that isn't sent to the backend but is readable by interceptors."
      },
      {
        q: "Why are functional interceptors better?",
        a: "They are simpler (just functions), easier to test, don't require \`Injectable\` boilerplate, and make the interceptor chain composition explicit in \`app.config.ts\`."
      }
    ]
  }
};
