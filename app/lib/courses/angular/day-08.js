export const day08 = {
  day: 8,
  title: "Dependency Injection Masterclass",
  intro: "DI is more than just services. Master <strong>InjectionTokens</strong>, <strong>Resolution Modifiers</strong>, and <strong>Factories</strong> to build truly modular apps.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 8. You know `inject()`. But do you know how to inject *data*, *configurations*, or *interfaces*? That's where **InjectionTokens** come in."
      },
      {
        type: "talk",
        message: "Also, what if you want to skip the current component and find a service in the parent? **Resolution Modifiers** give you control."
      },
      {
        type: "challenge",
        instruction: "This component hardcodes the API URL. Refactor it to use an `InjectionToken` so we can swap it for testing.",
        buggyCode: `export class UserList {
  // ❌ Hardcoded Dependency
  apiUrl = 'https://api.myapp.com';
  
  http = inject(HttpClient);
}`,
        solutionCode: `export const API_URL = new InjectionToken<string>('API_URL');

export class UserList {
  // ✅ Injected Configuration
  apiUrl = inject(API_URL);
  http = inject(HttpClient);
}`,
        verifyOutput: "InjectionToken",
        successMessage: "Nice! Now you can provide `{ provide: API_URL, useValue: 'mock-api' }` in your tests.",
        hint: "Create `const API_URL = new InjectionToken<string>('API_URL')` and inject it."
      }
    ]
  },
  content: `
<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🔑 1. Injection Tokens</h3>
<p class="mb-6 text-gray-600 dark:text-light-300 leading-relaxed">
Classes are valid tokens, but interfaces and primitives (strings, objects) are not. Use <code>InjectionToken</code> to make them injectable.
</p>

<div class="grid md:grid-cols-2 gap-6 mb-10">
    <div class="bg-gray-50 dark:bg-dark-900/40 p-5 rounded-xl border border-gray-200 dark:border-dark-700">
        <h4 class="font-bold text-gray-800 dark:text-white mb-3">Define Token</h4>
        <pre class="text-xs font-mono text-gray-600 dark:text-gray-400">
interface AppConfig {
  title: string;
  version: number;
}

export const APP_CONFIG = 
  new InjectionToken&lt;AppConfig&gt;('APP_CONFIG');
        </pre>
    </div>
    <div class="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-xl border border-blue-200 dark:border-blue-900/30">
        <h4 class="font-bold text-blue-800 dark:text-blue-300 mb-3">Provide & Inject</h4>
        <pre class="text-xs font-mono text-blue-900 dark:text-blue-200">
// In providers array:
{ 
  provide: APP_CONFIG, 
  useValue: { title: 'My App', version: 1 } 
}

// In Component:
config = inject(APP_CONFIG);
        </pre>
    </div>
</div>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🕵️ 2. Resolution Modifiers</h3>
<p class="mb-4 text-gray-600 dark:text-light-300 leading-relaxed">
Control <i>how</i> Angular searches for dependencies in the injector tree. Use these flags in <code>inject()</code>.
</p>

<div class="grid grid-cols-1 gap-4 mb-10 text-sm">
    <div class="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-900/40">
        <div class="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded font-mono text-xs font-bold">@Optional()</div>
        <p class="text-gray-600 dark:text-gray-300">Don't crash if not found. Return <code>null</code>.</p>
    </div>
    <div class="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-900/40">
        <div class="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded font-mono text-xs font-bold">@SkipSelf()</div>
        <p class="text-gray-600 dark:text-gray-300">Start searching in the <strong>parent</strong> injector. Useful for recursive components.</p>
    </div>
    <div class="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-900/40">
        <div class="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded font-mono text-xs font-bold">@Host()</div>
        <p class="text-gray-600 dark:text-gray-300">Stop searching at the host component's view boundary.</p>
    </div>
</div>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🏭 3. Factory Providers</h3>
<p class="mb-4 text-gray-600 dark:text-light-300 leading-relaxed">
Sometimes a service needs to be created dynamically based on other services.
</p>
<div class="bg-gray-100 dark:bg-dark-800 p-4 rounded-xl mb-8 font-mono text-sm">
<code>{ provide: LOG_LEVEL, useFactory: (config) => config.isDev ? 'DEBUG' : 'INFO', deps: [APP_CONFIG] }</code>
</div>
`,

  // Re-writing code for correctness. Dynamic provider from Input is hard in AOT.
  // Using 3 simpler wrapper components.
  code: `import { Component, InjectionToken, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

// 1. Token & Intefaces
interface Theme {
    bg: string;
    text: string;
    border: string;
    name: string;
}

const THEME = new InjectionToken<Theme>('THEME');

const DARK: Theme = { bg: '#1f2937', text: '#f9fafb', border: '#374151', name: 'Dark' };
const LIGHT: Theme = { bg: '#ffffff', text: '#111827', border: '#e5e7eb', name: 'Light' };
const CYBER: Theme = { bg: '#09090b', text: '#22d3ee', border: '#f472b6', name: 'Cyberpunk' };

// 2. The Consumer Component
// It blindly asks for "THEME". It doesn't know which one.
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div class="p-5 rounded-xl border-2 transition-all shadow-lg"
         [style.backgroundColor]="theme.bg"
         [style.color]="theme.text"
         [style.borderColor]="theme.border">
        <h3 class="font-bold text-lg mb-1">I am a Card</h3>
        <p class="text-sm opacity-80">I consume <code>inject(THEME)</code></p>
        <div class="mt-3 inline-block px-2 py-12 rounded text-[10px] font-mono border border-current opacity-60">
            Active Theme: {{ theme.name }}
        </div>
    </div>
  \`
})
class CardComponent {
  theme = inject(THEME);
}

// 3. Scope Providers
// These components create a new "Branch" in the DI tree
@Component({
  selector: 'scope-dark',
  standalone: true,
  imports: [CardComponent],
  providers: [{ provide: THEME, useValue: DARK }],
  template: '<app-card></app-card>'
})
class ScopeDark {}

@Component({
  selector: 'scope-light',
  standalone: true,
  imports: [CardComponent],
  providers: [{ provide: THEME, useValue: LIGHT }],
  template: '<app-card></app-card>'
})
class ScopeLight {}

@Component({
  selector: 'scope-cyber',
  standalone: true,
  imports: [CardComponent],
  providers: [{ provide: THEME, useValue: CYBER }],
  template: '<app-card></app-card>'
})
class ScopeCyber {}


@Component({
  selector: 'app-di-demo',
  standalone: true,
  imports: [CommonModule, ScopeDark, ScopeLight, ScopeCyber],
  template: \`
    <div class="max-w-2xl mx-auto bg-gray-950 p-8 rounded-2xl border border-gray-800 shadow-2xl min-h-[500px]" style="background-color: #030712; color: white">
        <h2 class="text-2xl font-bold text-white mb-2">💉 The DI Hierachy</h2>
        <p class="text-gray-400 mb-8 text-sm">
            The <code>AppCard</code> component is defined ONCE. But it behaves differently depending on where it sits in the injector tree.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Scope 1 -->
            <div class="flex flex-col gap-2">
                <div class="text-xs font-mono text-gray-500 text-center">provider: DARK</div>
                <scope-dark></scope-dark>
            </div>

            <!-- Scope 2 -->
            <div class="flex flex-col gap-2">
                <div class="text-xs font-mono text-gray-500 text-center">provider: LIGHT</div>
                <scope-light></scope-light>
            </div>

            <!-- Scope 3 -->
            <div class="flex flex-col gap-2">
                <div class="text-xs font-mono text-gray-500 text-center">provider: CYBER</div>
                <scope-cyber></scope-cyber>
            </div>
        </div>

        <div class="mt-8 p-4 bg-blue-900/20 border border-blue-500/30 rounded-xl">
            <h4 class="text-blue-400 font-bold text-sm mb-2">Why this matters?</h4>
            <p class="text-gray-400 text-xs leading-relaxed">
                This is how libraries like Material or PrimeNG work. You set a global config, but can override it for specific sections (like a dark sidebar in a light app) just by re-providing the token!
            </p>
        </div>
    </div>
  \`
})
export class DIPlayground {}
`,
  comparison: {
    junior: `// ❌ Hard dependency
export class UserList {
  // Hard to test, hard to configure
  config = { api: 'https://...' }; 
}`,
    senior: `// ✅ Injected Dependency
export class UserList {
  // Easy to swap (mock vs real)
  config = inject(APP_CONFIG);
}`
  },
  interview: {
    questions: [
      {
        q: "What is the 'Resolution Modifier' @Self()?",
        a: "It tells Angular to ONLY look in the current component's injector. It won't walk up the tree. If the service isn't found right here, it throws an error."
      },
      {
        q: "What is a 'Tree-shakable Provider'?",
        a: "A service provided with { providedIn: 'root' }. If no component injects it, the build tool removes it from the final bundle entirely."
      }
    ]
  }
};
