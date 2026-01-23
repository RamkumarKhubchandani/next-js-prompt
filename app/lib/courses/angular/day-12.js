export const day12 = {
  day: 12,
  title: "Angular Testing Masterclass",
  intro: "Stop writing brittle tests. Learn to use <strong>Component Harnesses</strong> and test <strong>Behavior</strong> instead of implementation details.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 12. Most Angular tests break when you refactor the HTML. That's annoying. The solution? <strong>Component Harnesses</strong>."
      },
      {
        type: "talk",
        message: "A Harness is an API for your component's template. Your test interacts with the *Harness*, not the `querySelector`."
      },
      {
        type: "challenge",
        instruction: "This test relies on extensive CSS selectors. Refactor it to use a Component Harness pattern (simulated).",
        buggyCode: `// ❌ Brittle selector
it('should click button', () => {
  const btn = fixture.nativeElement.querySelector('.btn-primary.large');
  btn.click();
});`,
        solutionCode: `// ✅ Robust Harness
it('should click button', async () => {
  const btn = await loader.getHarness(ButtonHarness);
  await btn.click();
});`,
        verifyOutput: "getHarness",
        successMessage: "Cleaner! If you change the CSS class of the button, the Harness updates *once*, and all 100 tests keep working.",
        hint: "Use `loader.getHarness(MyHarness)`."
      }
    ]
  },
  content: `
<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🧪 1. Component Harnesses</h3>
<p class="mb-6 text-gray-600 dark:text-light-300 leading-relaxed">
Don't use <code>querySelector</code> in tests. It couples your test to your DOM structure. Use Harnesses (from Angular Material CDK).
</p>

<div class="grid md:grid-cols-2 gap-6 mb-10">
    <div class="bg-red-50 dark:bg-red-900/10 p-5 rounded-xl border border-red-200 dark:border-red-900/30">
        <h4 class="font-bold text-red-800 dark:text-red-300 mb-3">Without Harness</h4>
        <pre class="text-xs font-mono text-gray-600 dark:text-gray-400">
const el = fixture.nativeElement
  .querySelector('.user-card h3');
expect(el.innerText).toBe('John');
        </pre>
    </div>
    <div class="bg-green-50 dark:bg-green-900/10 p-5 rounded-xl border border-green-200 dark:border-green-900/30">
        <h4 class="font-bold text-green-800 dark:text-green-300 mb-3">With Harness</h4>
        <pre class="text-xs font-mono text-gray-600 dark:text-gray-400">
const card = await loader
  .getHarness(UserCardHarness);
expect(await card.getName()).toBe('John');
        </pre>
    </div>
</div>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">⚡ 2. Testing Signals</h3>
<p class="mb-4 text-gray-600 dark:text-light-300 leading-relaxed">
Testing components with Signals is easier. No <code>fixture.detectChanges()</code> needed for simple signal updates (mostly).
</p>

<div class="bg-gray-100 dark:bg-dark-800 p-6 rounded-xl border-l-4 border-purple-500 mb-10">
<pre class="text-sm font-mono text-gray-800 dark:text-gray-200">
it('should update count', () => {
  component.count.set(10);
  fixture.detectChanges(); // Sync with template
  expect(element.textContent).toContain('10');
});
</pre>
</div>
`,
  code: `import { Component, signal, Input, Injectable, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

// --- THE COMPONENT UNDER TEST ---
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div class="p-4 bg-gray-800 rounded-xl border border-gray-700" data-testid="profile-card">
        @if (loading()) {
            <div data-testid="loading-state" class="animate-pulse flex space-x-4">
                <div class="rounded-full bg-gray-700 h-10 w-10"></div>
                <div class="flex-1 space-y-2 py-1">
                    <div class="h-2 bg-gray-700 rounded"></div>
                    <div class="h-2 bg-gray-700 rounded w-3/4"></div>
                </div>
            </div>
        } @else {
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white">
                    {{ user().name.charAt(0) }}
                </div>
                <div>
                   <h3 class="font-bold text-white" data-testid="user-name">{{ user().name }}</h3>
                   <span class="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400" data-testid="user-role">{{ user().role }}</span>
                </div>
                <button (click)="onDelete()" data-testid="delete-btn" class="ml-auto text-red-400 hover:bg-red-900/30 p-2 rounded">
                    🗑️
                </button>
            </div>
        }
    </div>
  \`
})
class UserProfile {
    user = signal({ name: 'Alice', role: 'Admin' });
    loading = signal(false);
    deleted = signal(false);

    onDelete() {
        this.deleted.set(true);
    }
}

// --- THE TEST RUNNER (SIMULATION) ---
// In a real app, this would be a .spec.ts file running in Karma/Jest.
// Here, we simulate the test execution in the browser.

@Injectable()
class TestSuit {
    results = signal<{name: string, passed: boolean, msg: string}[]>([]);

    async runTests(fixture: HTMLElement, component: UserProfile) {
        this.results.set([]);
        
        await this.delay(500);
        this.test('should display user name', () => {
            const nameEl = fixture.querySelector('[data-testid="user-name"]');
            if (!nameEl) throw new Error('Element [data-testid="user-name"] not found');
            if (nameEl.textContent?.trim() !== 'Alice') throw new Error(\`Expected Alice, got \${nameEl.textContent}\`);
        });

        await this.delay(500);
        this.test('should show loading skeleton when loading is true', () => {
            component.loading.set(true);
            // In real tests: fixture.detectChanges();
            // In Sim: we wait for render
        });
        
        // Wait for render update
        await this.delay(100);
        this.test('verify loading state in DOM', () => {
             const loader = fixture.querySelector('[data-testid="loading-state"]');
             if (!loader) throw new Error('Loading skeleton not found');
        });

        await this.delay(500);
        component.loading.set(false);
         await this.delay(100);
        
        this.test('should handle delete action', () => {
             const btn = fixture.querySelector('[data-testid="delete-btn"]') as HTMLButtonElement;
             if (!btn) throw new Error('Delete button not found');
             btn.click();
             
             if (!component.deleted()) throw new Error('Component deleted signal not true');
        });
    }

    test(name: string, fn: () => void) {
        try {
            fn();
            this.results.update(r => [...r, { name, passed: true, msg: 'Passed' }]);
        } catch (e: any) {
            this.results.update(r => [...r, { name, passed: false, msg: e.message }]);
        }
    }
    
    delay(ms: number) { return new Promise(r => setTimeout(r, ms)); }
}

@Component({
  selector: 'app-test-runner',
  standalone: true,
  imports: [CommonModule, UserProfile],
  providers: [TestSuit],
  template: \`
    <div class="max-w-2xl mx-auto bg-gray-950 p-6 rounded-2xl border border-gray-800 shadow-2xl min-h-[500px]" style="background-color: #030712; color: white">
        <h2 class="text-2xl font-bold text-white mb-6">🧪 Interactive Test Runner</h2>

        <!-- Component Preview -->
        <div class="mb-8 p-4 bg-black rounded-xl border border-gray-800 relative">
            <div class="absolute top-2 right-2 text-[10px] text-gray-500 font-mono">DOM PREVIEW</div>
            <div #domRoot>
                <app-user-profile></app-user-profile>
            </div>
        </div>

        <!-- Controls -->
        <div class="flex gap-4 mb-8">
            <button (click)="run()" [disabled]="running()" class="px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed">
                {{ running() ? 'Running...' : '▶ Run Tests' }}
            </button>
        </div>

        <!-- Test Results -->
        <div class="space-y-2 font-mono text-sm">
            @for (res of runner.results(); track res.name) {
                <div class="flex items-center gap-3 p-3 rounded bg-gray-900 border"
                     [class.border-green-500_30]="res.passed"
                     [class.border-red-500_30]="!res.passed">
                    <span [class.text-green-400]="res.passed" [class.text-red-400]="!res.passed">
                        {{ res.passed ? '✓' : '✗' }}
                    </span>
                    <span class="text-gray-300">{{ res.name }}</span>
                    @if (!res.passed) {
                        <span class="text-xs text-red-500 ml-auto">{{ res.msg }}</span>
                    }
                </div>
            }
            @if (runner.results().length === 0 && !running()) {
                <div class="text-gray-600 text-center py-4">Ready to test.</div>
            }
        </div>
    </div>
  \`
})
export class TestRunner {
    runner = inject(TestSuit);
    running = signal(false);
    
    // We need access to the rendered component instance to verify state
    // In real tests, we use TestBed.createComponent()
    // Here we use ViewChild
    @ViewChild(UserProfile) userComponent!: UserProfile;
    @ViewChild('domRoot', { static: true }) domRoot!: any;

    async run() {
        this.running.set(true);
        // Reset component state
        this.userComponent.loading.set(false);
        this.userComponent.deleted.set(false);
        
        await this.runner.runTests(this.domRoot.nativeElement, this.userComponent);
        this.running.set(false);
    }
}
`,
  // Re-writing to import ViewChild properly
  code: `import { Component, signal, Input, Injectable, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

// --- THE COMPONENT UNDER TEST ---
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div class="p-4 bg-gray-800 rounded-xl border border-gray-700" data-testid="profile-card">
        @if (loading()) {
            <div data-testid="loading-state" class="animate-pulse flex space-x-4">
                <div class="rounded-full bg-gray-700 h-10 w-10"></div>
                <div class="flex-1 space-y-2 py-1">
                    <div class="h-2 bg-gray-700 rounded"></div>
                    <div class="h-2 bg-gray-700 rounded w-3/4"></div>
                </div>
            </div>
        } @else {
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white">
                    {{ user().name.charAt(0) }}
                </div>
                <div>
                   <h3 class="font-bold text-white" data-testid="user-name">{{ user().name }}</h3>
                   <span class="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400" data-testid="user-role">{{ user().role }}</span>
                </div>
                <button (click)="onDelete()" data-testid="delete-btn" class="ml-auto text-red-400 hover:bg-red-900/30 p-2 rounded">
                    🗑️
                </button>
            </div>
        }
    </div>
  \`
})
class UserProfile {
    user = signal({ name: 'Alice', role: 'Admin' });
    loading = signal(false);
    deleted = signal(false);

    onDelete() {
        this.deleted.set(true);
    }
}

// --- THE TEST RUNNER (SIMULATION) ---
@Injectable()
class TestSuit {
    results = signal<{name: string, passed: boolean, msg: string}[]>([]);

    async runTests(fixture: HTMLElement, component: UserProfile) {
        this.results.set([]);
        
        // TEST 1: Initial State
        await this.delay(400);
        this.test('should display user name "Alice"', () => {
            const nameEl = fixture.querySelector('[data-testid="user-name"]');
            if (!nameEl) throw new Error('Element [data-testid="user-name"] not found');
            if (nameEl.textContent?.trim() !== 'Alice') throw new Error(\`Expected "Alice", got "\${nameEl.textContent?.trim()}"\`);
        });

        // TEST 2: Loading State
        await this.delay(400);
        this.test('should show skeleton when loading is true', async () => {
            component.loading.set(true);
            await this.delay(50); // wait for render
            const loader = fixture.querySelector('[data-testid="loading-state"]');
            if (!loader) throw new Error('Loading skeleton not found in DOM');
        });
        
        // Reset
        component.loading.set(false);
        await this.delay(200);

        // TEST 3: User Interaction
        this.test('should mark deleted when button clicked', async () => {
             const btn = fixture.querySelector('[data-testid="delete-btn"]') as HTMLButtonElement;
             if (!btn) throw new Error('Delete button not found');
             btn.click();
             
             if (!component.deleted()) throw new Error('component.deleted() signal is false');
        });
    }

    test(name: string, fn: () => void | Promise<void>) {
        try {
            const res = fn();
            // Handle async tests if needed (simplified here)
            this.results.update(r => [...r, { name, passed: true, msg: 'Passed' }]);
        } catch (e: any) {
            this.results.update(r => [...r, { name, passed: false, msg: e.message }]);
        }
    }
    
    delay(ms: number) { return new Promise(r => setTimeout(r, ms)); }
}

@Component({
  selector: 'app-test-runner',
  standalone: true,
  imports: [CommonModule, UserProfile],
  providers: [TestSuit],
  template: \`
    <div class="max-w-2xl mx-auto bg-gray-950 p-6 rounded-2xl border border-gray-800 shadow-2xl min-h-[500px]" style="background-color: #030712; color: white">
        <h2 class="text-2xl font-bold text-white mb-6">🧪 Interactive Test Runner</h2>

        <!-- Component Preview -->
        <div class="mb-8 p-4 bg-black rounded-xl border border-gray-800 relative min-h-[100px] flex items-center justify-center">
            <div class="absolute top-2 right-2 text-[10px] text-gray-500 font-mono">DOM PREVIEW</div>
            <div #domRoot class="w-full">
                <app-user-profile></app-user-profile>
            </div>
        </div>

        <!-- Controls -->
        <div class="flex gap-4 mb-8">
            <button (click)="run()" [disabled]="running()" class="px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 shadow-lg shadow-green-900/20">
                {{ running() ? 'Running...' : '▶ Run Tests' }}
            </button>
        </div>

        <!-- Test Results -->
        <div class="space-y-2 font-mono text-sm">
            @for (res of runner.results(); track res.name) {
                <div class="flex items-center gap-3 p-3 rounded bg-gray-900 border animate-in slide-in-from-left duration-300"
                     [class.border-green-500]="res.passed"
                     [class.border-red-500]="!res.passed"
                     [class.bg-green-900_10]="res.passed"
                     [class.bg-red-900_10]="!res.passed">
                    <span [class.text-green-400]="res.passed" [class.text-red-400]="!res.passed" class="text-xl">
                        {{ res.passed ? '✓' : '✗' }}
                    </span>
                    <span class="text-gray-300">{{ res.name }}</span>
                    @if (!res.passed) {
                        <span class="text-xs text-red-500 ml-auto bg-red-900/20 px-2 py-1 rounded">{{ res.msg }}</span>
                    }
                </div>
            }
            @if (runner.results().length === 0 && !running()) {
                <div class="text-gray-600 text-center py-4 border border-dashed border-gray-800 rounded-lg">
                    Click "Run Tests" to simulate Jasmine/Karma execution.
                </div>
            }
        </div>
    </div>
  \`
})
export class TestRunner {
    runner = inject(TestSuit);
    running = signal(false);
    
    @ViewChild(UserProfile) userComponent!: UserProfile;
    @ViewChild('domRoot') domRoot!: ElementRef;

    async run() {
        this.running.set(true);
        // Reset component state
        this.userComponent.loading.set(false);
        this.userComponent.deleted.set(false);
        this.userComponent.user.set({ name: 'Alice', role: 'Admin' });
        
        await this.runner.runTests(this.domRoot.nativeElement, this.userComponent);
        this.running.set(false);
    }
}
`,
  comparison: {
    junior: `// ❌ Implementation Testing
it('should have h3 tag', () => {
  const h3 = fixture.nativeElement.querySelector('h3');
  expect(h3).toBeTruthy(); 
  // Fails if I change h3 to h2!
});`,
    senior: `// ✅ Behavior Testing (Harness)
it('should display user name', async () => {
  const profile = await loader.getHarness(ProfileHarness);
  expect(await profile.getName()).toBe('Alice');
  // Works regardless of HTML structure!
});`
  },
  interview: {
    questions: [
      {
        q: "What is a 'Test Bed'?",
        a: "TestBed is Angular's primary API for testing. It configures a testing module where you can declare components, provide mock services, and import modules for your test."
      },
      {
        q: "Why use 'waitForAsync' or 'fakeAsync'?",
        a: "To test asynchronous code. fakeAsync allows you to control time (tick) and flush timers synchronously, making tests fast and deterministic."
      }
    ]
  }
};
