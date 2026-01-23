export const day20 = {
  day: 20,
  title: "Dependency Injection: Advanced Patterns",
  intro: "Unlock the full power of DI. Use <strong>InjectionTokens</strong>, <strong>Factories</strong>, and <strong>Tree-shakable Providers</strong> to build flexible architectures.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 20. DI isn't just about services. It's about **configuration** and **abstraction**."
      },
      {
        type: "talk",
        message: "You can inject *values* (like API URLs) using `InjectionToken`, or swap implementations based on environment."
      },
      {
        type: "challenge",
        instruction: "Create an InjectionToken for an API URL and provide it.",
        buggyCode: `// ❌ Hardcoded string
@Injectable()
export class ApiService {
  url = 'https://api.example.com';
}`,
        solutionCode: `// ✅ Flexible Token
export const API_URL = new InjectionToken<string>('API_URL');

// In app.config.ts:
{ provide: API_URL, useValue: 'https://api.example.com' }

// In Service:
url = inject(API_URL);`,
        verifyOutput: "InjectionToken",
        successMessage: "Now your Service doesn't care where the URL comes from. It just asks for the token.",
        hint: "Use `new InjectionToken<Type>('desc')`."
      }
    ]
  },
  content: `
<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🔑 1. Injection Tokens</h3>
<p class="mb-6 text-gray-600 dark:text-light-300 leading-relaxed">
Classes are tokens, but sometimes you need to inject non-class things like configuration objects, strings, or functions. Use <code>InjectionToken</code>.
</p>

<div class="bg-gray-100 dark:bg-dark-800 p-6 rounded-xl border-l-4 border-purple-500 mb-10">
<pre class="text-sm font-mono text-gray-800 dark:text-gray-200">
export const APP_CONFIG = new InjectionToken&lt;AppConfig&gt;('APP_CONFIG');

// Usage
constructor(@Inject(APP_CONFIG) config: AppConfig) {}
// Or better:
config = inject(APP_CONFIG);
</pre>
</div>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🏭 2. Factory Providers</h3>
<p class="mb-4 text-gray-600 dark:text-light-300 leading-relaxed">
Need dynamic logic to decide WHAT to provide? Use <code>useFactory</code>.
</p>

<div class="bg-gray-100 dark:bg-dark-800 p-6 rounded-xl border-l-4 border-blue-500 mb-10">
<pre class="text-sm font-mono text-gray-800 dark:text-gray-200">
{
  provide: LoggerService,
  useFactory: (config: AppConfig) => {
    return config.isProd ? new CloudLogger() : new ConsoleLogger();
  },
  deps: [APP_CONFIG]
}
</pre>
</div>
`,
  code: `import { Component, InjectionToken, Injectable, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// --- DI TOKENS & INTERFACES ---
interface Logger {
    log(msg: string): void;
    type: 'CONSOLE' | 'FILE' | 'CLOUD';
}

const LOGGER = new InjectionToken<Logger>('LOGGER');

// --- IMPLEMENTATIONS ---
class ConsoleLogger implements Logger {
    type = 'CONSOLE' as const;
    log(msg: string) { console.log(\`[Console] \${msg}\`); }
}

class FileLogger implements Logger {
    type = 'FILE' as const;
    log(msg: string) { console.log(\`[File System] Writing: "\${msg}"\`); }
}

class CloudLogger implements Logger {
    type = 'CLOUD' as const;
    log(msg: string) { console.log(\`[AWS CloudWatch] Sending: "\${msg}"\`); }
}

// --- FACTORY FUNCTION ---
// We simulate a factory that chooses implementation based on a signal configuration
// Note: In real Angular, providers are static. To swap runtime, we usually use a Strategy pattern service
// or conditional logic inside a wrapper service.
// FOR DEMO: We will manually instantiation to show the concept of "Swappable Implementations"

@Component({
  selector: 'app-di-lab',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div class="max-w-xl mx-auto bg-gray-950 p-6 rounded-2xl border border-gray-800 shadow-2xl min-h-[500px]" style="background-color: #030712; color: white">
        <h2 class="text-2xl font-bold text-white mb-6">💉 DI Configurator</h2>

        <!-- Configuration Panel -->
        <div class="mb-8 p-6 bg-gray-900 rounded-xl border border-gray-800">
             <h3 class="text-xs text-gray-500 uppercase tracking-widest mb-4 font-bold">Environment Configuration</h3>
             
             <div class="flex gap-2">
                 @for (env of ['dev', 'staging', 'prod']; track env) {
                     <button (click)="changeEnv(env)" 
                             [class.bg-purple-600]="environment() === env"
                             [class.bg-gray-800]="environment() !== env"
                             class="flex-1 py-3 rounded-lg text-sm font-mono uppercase transition-all border border-gray-700 hover:border-purple-500">
                         {{ env }}
                     </button>
                 }
             </div>
             
             <div class="mt-6 pt-4 border-t border-gray-800 flex justify-between items-center">
                 <span class="text-sm text-gray-400">Active Logger:</span>
                 <span class="font-mono text-sm font-bold" 
                       [class.text-green-400]="currentLogger.type === 'CONSOLE'"
                       [class.text-yellow-400]="currentLogger.type === 'FILE'"
                       [class.text-blue-400]="currentLogger.type === 'CLOUD'">
                     {{ currentLogger.type }} LOGGER
                 </span>
             </div>
        </div>

        <!-- App Simulation -->
        <div class="p-6 bg-black rounded-xl border border-dashed border-gray-700 relative">
             <div class="absolute top-2 right-2 text-[10px] text-gray-500 font-mono">APP RUNTIME</div>
             
             <button (click)="doWork()" class="w-full py-4 bg-gray-800 hover:bg-gray-700 rounded-xl font-bold border border-gray-600 transition-transform active:scale-95">
                 Perform Action
             </button>
             
             <!-- Logs Output -->
             <div class="mt-6 space-y-2 font-mono text-xs">
                 @for (log of logs(); track $index) {
                     <div class="text-gray-400 animate-in slide-in-from-left">
                         > {{ log }}
                     </div>
                 }
             </div>
        </div>
        
        <p class="mt-6 text-xs text-gray-600 text-center mx-auto max-w-sm">
            Dependency Injection allows us to swap the <code>Logger</code> implementation without changing the component's code.
        </p>

    </div>
  \`
})
export class DiLab {
    environment = signal('dev');
    logs = signal<string[]>([]);
    
    // In a real app, this is resolved by DI container.
    // Here we manage it manually to simulate re-providing.
    currentLogger: Logger = new ConsoleLogger();

    changeEnv(env: string) {
        this.environment.set(env);
        this.logs.set([]);
        
        // SIMULATE FACTORY PROVIDER LOGIC
        switch (env) {
            case 'dev': 
                this.currentLogger = new ConsoleLogger();
                break;
            case 'staging':
                this.currentLogger = new FileLogger();
                break;
            case 'prod':
                this.currentLogger = new CloudLogger();
                break;
        }
    }

    doWork() {
        // The component just calls log(). It doesn't know WHICH logger it is.
        const msg = \`User clicked button at \${new Date().toLocaleTimeString()}\`;
        this.currentLogger.log(msg);
        
        // visual logs for demo
        this.logs.update(l => [...l, \`[\${this.currentLogger.type}] \${msg}\`]);
    }
}`,
  comparison: {
    junior: `// ❌ Hard dependency
const logger = new ConsoleLogger();`,
    senior: `// ✅ Abstraction (DI)
// Component asks for "Logger" interface
// DI provides specific implementation based on config.
logger = inject(LOGGER);`
  },
  interview: {
    questions: [
      {
        q: "What is tree-shaking in Angular DI?",
        a: "When you use `providedIn: 'root'`, services are only included in the final bundle if they are actually injected somewhere. If unused, they are removed."
      },
      {
        q: "When would you use `useExisting`?",
        a: "When you want to alias one token to another. For example, aliasing a deprecated service to a new one, or exposing a specific interface of a service."
      }
    ]
  }
};
