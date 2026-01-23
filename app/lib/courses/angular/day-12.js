export const day12 = {
  day: 12,
  title: "Testing: Unit Tests for Components & Services",
  intro: "Untested code is broken code. Learn to write fast, reliable unit tests for Angular components and services.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 12. **Testing** isn't optional. It's how you ship with confidence. Angular uses Jasmine + Karma (or Jest)."
      },
      {
        type: "talk",
        message: "Test the contract, not the implementation. Test what the component DOES, not HOW it does it."
      },
      {
        type: "challenge",
        instruction: "Write a test that verifies the counter increments when the button is clicked.",
        buggyCode: `// ❌ Testing implementation details
it('should update the count variable', () => {
  component.count = 5;
  expect(component.count).toBe(5);
});`,
        solutionCode: `// ✅ Testing behavior
it('should increment count when button clicked', () => {
  const button = fixture.debugElement.query(By.css('button'));
  button.nativeElement.click();
  fixture.detectChanges();
  
  const display = fixture.debugElement.query(By.css('.count'));
  expect(display.nativeElement.textContent).toBe('1');
});`,
        verifyOutput: "click",
        successMessage: "Perfect! You're testing user behavior, not internal state. This test won't break if you refactor.",
        hint: "Simulate a button click and check the rendered output."
      },
      {
        type: "ask",
        question: "What's the difference between a unit test and an integration test?",
        options: [
          "Unit tests are faster",
          "Unit tests test a single unit in isolation (mocked dependencies). Integration tests test multiple units together.",
          "Integration tests are better",
          "They're the same thing"
        ],
        correctAnswer: "Unit tests test a single unit in isolation (mocked dependencies). Integration tests test multiple units together.",
        feedback: {
          success: "Exactly! Unit tests are fast and focused. Integration tests are slower but test real interactions.",
          error: "Think about scope. Unit = one thing. Integration = multiple things working together."
        }
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🧪 1. The Testing Pyramid</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Your test suite should look like a pyramid:
</p>

<div class="space-y-3 mb-8">
  <div class="p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-xl">
    <div class="flex items-center justify-between mb-2">
      <h4 class="font-bold text-green-700 dark:text-green-400">Unit Tests (70%)</h4>
      <span class="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">Fast</span>
    </div>
    <p class="text-sm text-gray-700 dark:text-gray-300">
      Test individual functions, components, services in isolation. Mock dependencies.
    </p>
  </div>

  <div class="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl">
    <div class="flex items-center justify-between mb-2">
      <h4 class="font-bold text-blue-700 dark:text-blue-400">Integration Tests (20%)</h4>
      <span class="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">Medium</span>
    </div>
    <p class="text-sm text-gray-700 dark:text-gray-300">
      Test multiple units together. Real services, real HTTP calls (to test server).
    </p>
  </div>

  <div class="p-4 bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800 rounded-xl">
    <div class="flex items-center justify-between mb-2">
      <h4 class="font-bold text-purple-700 dark:text-purple-400">E2E Tests (10%)</h4>
      <span class="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded">Slow</span>
    </div>
    <p class="text-sm text-gray-700 dark:text-gray-300">
      Test the entire app in a real browser. User flows, critical paths.
    </p>
  </div>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ 2. Testing Components</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Use <code>TestBed</code> to create a testing module and <code>ComponentFixture</code> to interact with the component.
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-blue-500">
<pre class="text-gray-800 dark:text-gray-100">
describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture&lt;CounterComponent&gt;;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CounterComponent] // Standalone component
    });
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial render
  });

  it('should increment count', () => {
    component.increment();
    expect(component.count()).toBe(1);
  });
});
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔥 3. Testing Services</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Services are easier to test - they're just classes. Mock HTTP calls with <code>HttpTestingController</code>.
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-green-500">
<pre class="text-gray-800 dark:text-gray-100">
describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch users', () => {
    service.getUsers().subscribe(users => {
      expect(users.length).toBe(2);
    });

    const req = httpMock.expectOne('/api/users');
    req.flush([{ id: 1 }, { id: 2 }]);
  });
});
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📋 4. Testing Checklist</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-8">
  <li>✅ Test user-facing behavior, not implementation</li>
  <li>✅ Mock external dependencies (HTTP, services)</li>
  <li>✅ Use <code>fixture.detectChanges()</code> after state changes</li>
  <li>✅ Test error cases, not just happy paths</li>
  <li>✅ Keep tests fast (no real HTTP, no real timers)</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚠️ Common Mistakes</h3>
<div class="grid md:grid-cols-2 gap-4 mb-8">
  <div class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl">
    <h4 class="font-bold text-red-700 dark:text-red-400 mb-2">Testing Implementation</h4>
    <p class="text-sm text-gray-700 dark:text-gray-300">Don't test private methods or internal state. Test public API only.</p>
  </div>
  <div class="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl">
    <h4 class="font-bold text-red-700 dark:text-red-400 mb-2">Brittle Selectors</h4>
    <p class="text-sm text-gray-700 dark:text-gray-300">Use data-testid attributes instead of CSS classes for queries.</p>
  </div>
</div>
`,
  code: `import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-demo',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div class="p-6 bg-gray-900 text-white rounded-xl">
      <h2 class="text-2xl font-bold mb-6">🧪 Testing Demo</h2>
      
      <div class="mb-6 p-4 bg-gray-800 rounded-xl border border-gray-700">
        <p class="text-sm text-gray-400 mb-2">Counter Value:</p>
        <p class="text-4xl font-bold text-green-400 count" data-testid="count-display">
          {{ count() }}
        </p>
        
        <div class="flex gap-3 mt-4">
          <button
            (click)="increment()"
            data-testid="increment-btn"
            class="px-4 py-2 bg-green-600 rounded hover:bg-green-500"
          >
            Increment
          </button>
          <button
            (click)="decrement()"
            data-testid="decrement-btn"
            class="px-4 py-2 bg-red-600 rounded hover:bg-red-500"
          >
            Decrement
          </button>
          <button
            (click)="reset()"
            data-testid="reset-btn"
            class="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
          >
            Reset
          </button>
        </div>
      </div>

      <div class="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
        <p class="text-xs text-blue-400 mb-2">💡 Testing Tips</p>
        <ul class="text-sm text-gray-300 space-y-1">
          <li>• Notice the <code class="text-yellow-400">data-testid</code> attributes</li>
          <li>• These make tests resilient to styling changes</li>
          <li>• Test behavior, not implementation</li>
        </ul>
      </div>

      <div class="mt-6 p-4 bg-gray-800 rounded-xl border border-gray-700">
        <p class="text-sm text-gray-400 mb-3">Example Test:</p>
        <pre class="text-xs text-green-400 font-mono overflow-x-auto">
it('should increment count', () => {
  const btn = fixture.debugElement
    .query(By.css('[data-testid="increment-btn"]'));
  btn.nativeElement.click();
  fixture.detectChanges();
  
  const display = fixture.debugElement
    .query(By.css('[data-testid="count-display"]'));
  expect(display.nativeElement.textContent.trim())
    .toBe('1');
});
        </pre>
      </div>
    </div>
  \`
})
export class TestDemoComponent {
  count = signal(0);

  constructor() {
    console.log('--- 🧪 Testing Demo Component ---');
    console.log('This component is designed to be easily testable');
    console.log('Notice the data-testid attributes for stable selectors');
    
    setTimeout(() => {
      console.log('▶️ Auto-incrementing for demo...');
      this.increment();
    }, 1000);
  }

  increment() {
    this.count.update(v => v + 1);
    console.log(\`✓ Count incremented to \${this.count()}\`);
  }

  decrement() {
    this.count.update(v => v - 1);
    console.log(\`✓ Count decremented to \${this.count()}\`);
  }

  reset() {
    this.count.set(0);
    console.log('✓ Count reset to 0');
  }
}

// Example test suite (for reference)
/*
describe('TestDemoComponent', () => {
  let component: TestDemoComponent;
  let fixture: ComponentFixture<TestDemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestDemoComponent]
    });
    fixture = TestBed.createComponent(TestDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with count of 0', () => {
    expect(component.count()).toBe(0);
  });

  it('should increment count when button clicked', () => {
    const button = fixture.debugElement.query(
      By.css('[data-testid="increment-btn"]')
    );
    button.nativeElement.click();
    fixture.detectChanges();
    
    expect(component.count()).toBe(1);
  });

  it('should display the count in the template', () => {
    component.count.set(5);
    fixture.detectChanges();
    
    const display = fixture.debugElement.query(
      By.css('[data-testid="count-display"]')
    );
    expect(display.nativeElement.textContent.trim()).toBe('5');
  });

  it('should reset count to 0', () => {
    component.count.set(10);
    component.reset();
    expect(component.count()).toBe(0);
  });
});
*/`,
  comparison: {
    junior: `// ❌ Testing implementation details
it('should set count property', () => {
  component.count = 5;
  expect(component.count).toBe(5); // Brittle!
});`,
    senior: `// ✅ Testing behavior
it('should display count after increment', () => {
  component.increment();
  fixture.detectChanges();
  
  const el = fixture.nativeElement.querySelector('[data-testid="count"]');
  expect(el.textContent).toBe('1');
});`
  },
  interview: {
    questions: [
      {
        q: "What's the purpose of fixture.detectChanges()?",
        a: "It triggers Angular's change detection manually in tests. Without it, the DOM won't update after you change component state."
      },
      {
        q: "How do you test asynchronous code in Angular?",
        a: "Use fakeAsync() and tick() for timers, or async() and whenStable() for Promises. For Observables, use marble testing or subscribe in the test."
      },
      {
        q: "Should you test private methods?",
        a: "No. Test the public API. If a private method is complex enough to need testing, it should probably be a separate service."
      }
    ]
  }
};
