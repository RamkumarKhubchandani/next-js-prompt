export const day18 = {
  day: 18,
  title: "Routing Security: Functional Guards",
  intro: "Protect your routes with <strong>Functional Guards</strong>. Learn to inspect User Roles and prevent unauthorized access with simple functions.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 18. Class-based guards (`CanActivate` interface) are deprecated. We now use simple functions."
      },
      {
        type: "talk",
        message: "Functional guards are easier to test and can directly inject services using `inject()`."
      },
      {
        type: "challenge",
        instruction: "Convert this class-based guard to a functional guard.",
        buggyCode: `// ❌ Deprecated Class Guard
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  
  canActivate(): boolean {
    if (this.auth.isLoggedIn()) return true;
    this.router.navigate(['/login']);
    return false;
  }
}`,
        solutionCode: `// ✅ Modern Functional Guard
export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  
  if (auth.isLoggedIn()) return true;
  return router.createUrlTree(['/login']);
};`,
        verifyOutput: "CanActivateFn",
        successMessage: "Concise and powerful! No decorators needed.",
        hint: "Use type `CanActivateFn = (route, state) => ...` and `inject()`."
      }
    ]
  },
  content: `
<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🛡️ 1. CanActivateFn</h3>
<p class="mb-6 text-gray-600 dark:text-light-300 leading-relaxed">
This function returns <code>true</code>, <code>false</code>, or a <code>UrlTree</code> (redirect). It can also return an Observable or Promise for async checks.
</p>

<div class="bg-gray-100 dark:bg-dark-800 p-6 rounded-xl border-l-4 border-purple-500 mb-10">
<pre class="text-sm font-mono text-gray-800 dark:text-gray-200">
// app.routes.ts
export const routes: Routes = [
  { 
    path: 'admin', 
    component: AdminPage,
    canActivate: [authGuard] // Just pass the function!
  }
];
</pre>
</div>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🔒 2. CanMatchFn</h3>
<p class="mb-4 text-gray-600 dark:text-light-300 leading-relaxed">
<code>CanMatchFn</code> runs *before* the route is even loaded. Use this to hide entire feature modules (lazy loaded chunks) from unauthorized users, saving bandwidth.
</p>
`,
  code: `import { Component, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

// --- MOCK SERVICES ---
class AuthService {
    userRole = signal<'guest' | 'user' | 'admin'>('guest');
    isLoggedIn = computed(() => this.userRole() !== 'guest');
}

class RouterMock {
    currentUrl = signal('/');
    logs = signal<string[]>([]);

    navigate(url: string) {
        this.logs.update(l => [...l, \`Navigating to \${url}...\`]);
        
        // SIMULATE GUARD CHECK
        // In real app, Angular does this.
        let canGo = true;
        
        if (url.startsWith('/admin')) {
             canGo = adminGuard({}, {}) as boolean;
        } else if (url.startsWith('/dashboard')) {
             canGo = authGuard({}, {}) as boolean;
        }

        if (canGo) {
            this.currentUrl.set(url);
            this.logs.update(l => [...l, \`✅ Navigation Success: \${url}\`]);
        } else {
            this.logs.update(l => [...l, \`🛑 Navigation Blocked via Guard\`]);
        }
    }
}

// --- FUNCTIONAL GUARDS ---
// In a real file, these would be exported consts

const authGuard = (route: any, state: any) => {
    // In strict mode, we inject services
    // Since we are simulating in one file, we'll access the static instance (hack for demo)
    // BUT we simulate the logic perfectly.
    const auth = inject(AuthService); // Works because we provide it in component!
    
    if (auth.isLoggedIn()) return true;
    
    console.log('Redirecting to login...');
    return false;
};

const adminGuard = (route: any, state: any) => {
    const auth = inject(AuthService);
    if (auth.userRole() === 'admin') return true;
    return false;
};

@Component({
  selector: 'app-guard-lab',
  standalone: true,
  imports: [CommonModule],
  providers: [AuthService, RouterMock], // Provide locally for demo
  template: \`
    <div class="max-w-xl mx-auto bg-gray-950 p-6 rounded-2xl border border-gray-800 shadow-2xl min-h-[500px]" style="background-color: #030712; color: white">
        <h2 class="text-2xl font-bold text-white mb-6">🛡️ Security Gate (Guards)</h2>

        <!-- User Role Switcher -->
        <div class="mb-8 p-4 bg-gray-900 rounded-xl border border-gray-800">
             <h3 class="text-xs text-gray-500 uppercase tracking-widest mb-4 font-bold">Current User Role</h3>
             <div class="flex gap-2">
                 @for (role of ['guest', 'user', 'admin']; track role) {
                     <button (click)="auth.userRole.set(role)" 
                             [class.bg-blue-600]="auth.userRole() === role"
                             [class.bg-gray-800]="auth.userRole() !== role"
                             class="flex-1 py-2 rounded-lg text-sm font-mono capitalize transition-all border border-gray-700">
                         {{ role }}
                     </button>
                 }
             </div>
        </div>

        <!-- Navigation Links -->
        <div class="grid grid-cols-3 gap-4 mb-8">
            <button (click)="router.navigate('/')" class="p-3 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700">
                🏠 Home
                <span class="block text-[10px] text-green-500 mt-1">Public</span>
            </button>
             <button (click)="router.navigate('/dashboard')" class="p-3 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700">
                📊 Dashboard
                <span class="block text-[10px] text-yellow-500 mt-1">Auth Guard</span>
            </button>
             <button (click)="router.navigate('/admin')" class="p-3 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700">
                ⚙️ Admin
                <span class="block text-[10px] text-red-500 mt-1">Admin Guard</span>
            </button>
        </div>

        <!-- Router Outlet Simulation -->
        <div class="p-6 bg-black rounded-xl border border-dashed border-gray-700 relative min-h-[120px] mb-4">
             <div class="absolute top-2 right-2 text-[10px] text-gray-500 font-mono">ROUTER OUTLET</div>
             
             @switch (router.currentUrl()) {
                 @case ('/') {
                     <div class="text-center text-gray-400">Welcome to the Public Home Page</div>
                 }
                 @case ('/dashboard') {
                      <div class="text-center text-yellow-400 font-bold">SECRET DASHBOARD DATA 💰</div>
                 }
                 @case ('/admin') {
                      <div class="text-center text-red-500 font-bold font-mono">⚠️ ADMIN CONTROL PANEL ⚠️</div>
                 }
             }
        </div>
        
        <!-- Logs -->
        <div class="font-mono text-[10px] text-gray-500 space-y-1">
            @for (log of router.logs().slice(-3); track $index) {
                <div>{{ log }}</div>
            }
        </div>
    </div>
  \`
})
export class GuardLab {
    auth = inject(AuthService);
    router = inject(RouterMock);
}`,
  comparison: {
    junior: `// ❌ Logic in Component
ngOnInit() {
  if (!this.auth.loggedIn) {
    this.router.navigate(['/login']);
  }
} // User sees the page flash before redirecting!`,
    senior: `// ✅ Logic in Guard
// User NEVER sees the page. 
// Navigation is cancelled before component generic creation.`
  },
  interview: {
    questions: [
      {
        q: "What is the difference between CanActivate and CanMatch?",
        a: "CanActivate prevents navigation to a route. CanMatch prevents the route configuration *itself* from being matched (meaning the router looks for another route or 404s, and lazy bundles are not downloaded)."
      },
      {
        q: "Can a guard return an Observable?",
        a: "Yes! Use `Observable<boolean | UrlTree>`. The router will wait for the first emission and then complete."
      }
    ]
  }
};
