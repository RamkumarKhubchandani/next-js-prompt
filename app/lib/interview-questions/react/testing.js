export const testingQuestions = [
    {
        id: 'react-test-1',
        category: 'Testing',
        difficulty: 'Hard',
        question: 'React Testing Library - Best Practices',
        answer: `Asked at **every company** for frontend roles.

### Philosophy:
"The more your tests resemble the way your software is used, the more confidence they can give you."

### Key Principles:
1. **Query by accessibility** - getByRole, getByLabelText
2. **Avoid implementation details** - No testing internal state
3. **User behavior focus** - Click, type, see results
4. **Async handling** - waitFor, findBy queries

### Query Priority (Best to Worst):
1. getByRole - Accessible to everyone
2. getByLabelText - Form fields
3. getByPlaceholderText - Input hints
4. getByText - Non-interactive text
5. getByTestId - Last resort only

### Anti-Patterns:
- Testing implementation (useState value)
- Shallow rendering
- Snapshot overuse`,
        codeExample: `// React Testing Library Best Practices
console.log('=== Query Priority ===');

// Simulating RTL queries
const queries = {
  getByRole: (role, options) => {
    console.log('✓ BEST: getByRole("' + role + '", { name: "' + (options?.name || '') + '" })');
    return { found: true };
  },
  getByLabelText: (text) => {
    console.log('✓ GOOD: getByLabelText("' + text + '")');
    return { found: true };
  },
  getByText: (text) => {
    console.log('○ OK: getByText("' + text + '")');
    return { found: true };
  },
  getByTestId: (id) => {
    console.log('⚠ AVOID: getByTestId("' + id + '")');
    return { found: true };
  }
};

console.log('Query Priority (best to worst):');
queries.getByRole('button', { name: 'Submit' });
queries.getByLabelText('Email Address');
queries.getByText('Welcome back!');
queries.getByTestId('submit-button');

console.log('\\n=== User Event Testing ===');

// Simulating userEvent
const userEvent = {
  click: (element) => console.log('[User] Clicked:', element),
  type: (element, text) => console.log('[User] Typed "' + text + '" in:', element),
  selectOptions: (element, option) => console.log('[User] Selected:', option),
  clear: (element) => console.log('[User] Cleared:', element)
};

console.log('Testing form submission:');
userEvent.type('email input', 'john@example.com');
userEvent.type('password input', 'password123');
userEvent.click('submit button');

console.log('\\n=== Async Testing ===');

async function waitFor(callback, options = {}) {
  console.log('[waitFor] Waiting for condition...');
  // In real RTL, this polls until condition is met
  callback();
  console.log('[waitFor] Condition met!');
}

async function testAsyncComponent() {
  console.log('1. Render component');
  console.log('2. Check loading state');
  
  await waitFor(() => {
    console.log('3. Data loaded');
  });
  
  console.log('4. Assert result');
}

testAsyncComponent();

console.log('\\n=== Good vs Bad Tests ===');

console.log('\\n❌ BAD: Testing Implementation');
console.log('test("increments count state", () => {');
console.log('  const { result } = renderHook(() => useCounter());');
console.log('  expect(result.current.count).toBe(0);');
console.log('  // Tests internal state, not user behavior');
console.log('});');

console.log('\\n✓ GOOD: Testing User Behavior');
console.log('test("increments counter on click", () => {');
console.log('  render(<Counter />);');
console.log('  const button = screen.getByRole("button", { name: /increment/i });');
console.log('  fireEvent.click(button);');
console.log('  expect(screen.getByText("Count: 1")).toBeInTheDocument();');
console.log('});');

console.log('\\n✓ Test what users see and do');
console.log('✓ Use accessible queries');`
    },
    {
        id: 'react-test-2',
        category: 'Testing',
        difficulty: 'Hard',
        question: 'Testing Custom Hooks',
        answer: `Important for **senior roles** at any company.

### Why Hooks Need Special Testing:
- Hooks can't be called outside components
- Need to test state changes and effects
- Must handle async operations

### @testing-library/react-hooks
- renderHook() - Renders hook in isolation
- act() - Wraps state updates
- waitFor() - Handles async

### What to Test:
1. Initial return values
2. State changes after actions
3. Effect cleanup
4. Error handling
5. Edge cases`,
        codeExample: `// Testing Custom Hooks
console.log('=== Hook Testing with renderHook ===');

// The hook we're testing
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}

// Simulating renderHook
function renderHook(hookFn) {
  let result = {};
  
  function TestComponent() {
    result.current = hookFn();
    return null;
  }
  
  // Initial render
  TestComponent();
  console.log('[renderHook] Hook mounted');
  
  return {
    result,
    rerender: () => {
      TestComponent();
      console.log('[renderHook] Hook re-rendered');
    }
  };
}

console.log('\\nTest: useCounter');

// Test 1: Initial value
console.log('\\n1. Test initial value:');
const { result } = renderHook(() => useCounter(5));
console.log('   Initial count:', result.current.count);
console.log('   Expected: 5 ✓');

// Test 2: Increment
console.log('\\n2. Test increment:');
console.log('   Before:', result.current.count);
// In real tests, wrap in act()
result.current.increment();
console.log('   After: (would be 6)');

console.log('\\n=== Testing Async Hooks ===');

function useAsync(asyncFn) {
  const [state, setState] = useState({
    loading: true,
    data: null,
    error: null
  });
  
  useEffect(() => {
    console.log('[useAsync] Starting fetch...');
    asyncFn()
      .then(data => {
        console.log('[useAsync] Success:', data);
        setState({ loading: false, data, error: null });
      })
      .catch(error => {
        console.log('[useAsync] Error:', error.message);
        setState({ loading: false, data: null, error });
      });
  }, []);
  
  return state;
}

console.log('\\nTest: useAsync');
console.log('1. Initial state: loading=true');
console.log('2. After resolve: loading=false, data=result');
console.log('3. On error: loading=false, error=error');

console.log('\\n=== Testing with act() ===');

console.log('test("increments count", async () => {');
console.log('  const { result } = renderHook(() => useCounter());');
console.log('  ');
console.log('  act(() => {');
console.log('    result.current.increment();');
console.log('  });');
console.log('  ');
console.log('  expect(result.current.count).toBe(1);');
console.log('});');

console.log('\\n✓ Use renderHook for isolated hook testing');
console.log('✓ Wrap state updates in act()');
console.log('✓ Use waitFor for async operations');`
    },
    {
        id: 'react-test-3',
        category: 'Testing',
        difficulty: 'Hard',
        question: 'Mocking in Jest - APIs, Modules, and Timers',
        answer: `Essential for **any testing scenario** in interviews.

### Types of Mocking:
1. **Function mocks** - jest.fn()
2. **Module mocks** - jest.mock()
3. **Timer mocks** - jest.useFakeTimers()
4. **API mocks** - MSW or jest mocks

### When to Mock:
- External APIs (network calls)
- Browser APIs (localStorage, fetch)
- Third-party libraries
- Timers (setTimeout, setInterval)
- Random values (Math.random, Date)

### Mock Best Practices:
- Mock at the network boundary (MSW)
- Avoid over-mocking
- Reset mocks between tests
- Use realistic mock data`,
        codeExample: `// Mocking in Jest
console.log('=== Function Mocking ===');

// Simulating jest.fn()
function createMockFn() {
  const calls = [];
  const fn = (...args) => {
    calls.push(args);
    console.log('[Mock] Called with:', args);
    return fn.returnValue;
  };
  fn.calls = calls;
  fn.mockReturnValue = (value) => { fn.returnValue = value; };
  fn.mockClear = () => { calls.length = 0; };
  return fn;
}

const mockCallback = createMockFn();
mockCallback.mockReturnValue('mocked!');

console.log('Result:', mockCallback('arg1', 'arg2'));
console.log('Call count:', mockCallback.calls.length);

console.log('\\n=== Module Mocking ===');

// jest.mock('axios')
console.log('jest.mock("axios");');
console.log('');
console.log('axios.get.mockResolvedValue({');
console.log('  data: { id: 1, name: "John" }');
console.log('});');
console.log('');
console.log('// Now all axios.get calls return mocked data');

const mockAxios = {
  get: createMockFn()
};
mockAxios.get.mockReturnValue({ data: { id: 1, name: 'John' } });
console.log('\\naxios.get("/api/user"):', mockAxios.get('/api/user'));

console.log('\\n=== Timer Mocking ===');

console.log('jest.useFakeTimers();');
console.log('');
console.log('test("debounce", () => {');
console.log('  const callback = jest.fn();');
console.log('  const debounced = debounce(callback, 500);');
console.log('  ');
console.log('  debounced();');
console.log('  expect(callback).not.toHaveBeenCalled();');
console.log('  ');
console.log('  jest.advanceTimersByTime(500);');
console.log('  expect(callback).toHaveBeenCalledTimes(1);');
console.log('});');

console.log('\\n=== API Mocking with MSW ===');

console.log('// Mock Service Worker - Network level mocking');
console.log('');
console.log('const handlers = [');
console.log('  rest.get("/api/users", (req, res, ctx) => {');
console.log('    return res(ctx.json([');
console.log('      { id: 1, name: "Alice" },');
console.log('      { id: 2, name: "Bob" }');
console.log('    ]));');
console.log('  }),');
console.log('  rest.post("/api/login", async (req, res, ctx) => {');
console.log('    const { email } = await req.json();');
console.log('    return res(ctx.json({ token: "abc123" }));');
console.log('  })');
console.log('];');

console.log('\\n=== Mocking Best Practices ===');
console.log('✓ Mock at network boundary (MSW > jest.mock)');
console.log('✓ Use realistic mock data');
console.log('✓ Reset mocks in beforeEach/afterEach');
console.log('✓ Don\\'t mock what you\\'re testing');`
    },
    {
        id: 'react-test-4',
        category: 'Testing',
        difficulty: 'Expert',
        question: 'Integration vs Unit Testing in React',
        answer: `Strategic question at **senior interviews**.

### Unit Tests:
- Test single component in isolation
- Mock all dependencies
- Fast, focused

### Integration Tests:
- Test multiple components together
- Minimal mocking (only external APIs)
- More confidence, slower

### Kent C. Dodds' Testing Trophy:
From bottom to top (inverse pyramid):
1. Static (TypeScript, ESLint)
2. Unit (hooks, utils)
3. Integration (pages, features) ← MOST VALUE
4. E2E (critical paths only)

### Integration Test Focus:
- User flows (login, checkout)
- Form submissions
- Navigation
- Data fetching & display`,
        codeExample: `// Integration vs Unit Testing
console.log('=== Unit Test: Isolated Component ===');

console.log('// Testing Button in complete isolation');
console.log('test("button calls onClick", () => {');
console.log('  const handleClick = jest.fn();');
console.log('  render(<Button onClick={handleClick}>Click</Button>);');
console.log('  ');
console.log('  fireEvent.click(screen.getByRole("button"));');
console.log('  expect(handleClick).toHaveBeenCalledTimes(1);');
console.log('});');

console.log('\\n=== Integration Test: Real User Flow ===');

console.log('// Testing actual user journey');
console.log('test("user can complete checkout", async () => {');
console.log('  // Render entire app or page');
console.log('  render(<CheckoutPage />);');
console.log('  ');
console.log('  // Add item');
console.log('  await userEvent.click(screen.getByRole("button", { name: /add/i }));');
console.log('  ');
console.log('  // Fill shipping');
console.log('  await userEvent.type(screen.getByLabelText(/address/i), "123 Main St");');
console.log('  ');
console.log('  // Submit payment');
console.log('  await userEvent.click(screen.getByRole("button", { name: /pay/i }));');
console.log('  ');
console.log('  // Verify success');
console.log('  await waitFor(() => {');
console.log('    expect(screen.getByText(/thank you/i)).toBeInTheDocument();');
console.log('  });');
console.log('});');

console.log('\\n=== Testing Trophy Strategy ===');
console.log('');
console.log('             /\\\\');
console.log('            /E2E\\\\     ← Few, critical paths');
console.log('           /──────\\\\');
console.log('          / Integr-\\\\   ← MOST tests here');
console.log('         /   ation  \\\\');
console.log('        /────────────\\\\');
console.log('       /    Unit      \\\\  ← Utils, hooks');
console.log('      /────────────────\\\\');
console.log('     /     Static       \\\\ ← TypeScript, ESLint');
console.log('    ──────────────────────');

console.log('\\n=== What to Test Where ===');
console.log('');
console.log('Unit Tests:');
console.log('  • Pure utility functions');
console.log('  • Custom hooks');
console.log('  • Reducers');
console.log('');
console.log('Integration Tests:');
console.log('  • Page components');
console.log('  • Form submissions');
console.log('  • Data fetching');
console.log('  • User journeys');
console.log('');
console.log('E2E Tests:');
console.log('  • Login flow');
console.log('  • Checkout');
console.log('  • Critical business paths');

console.log('\\n✓ Write more integration tests');
console.log('✓ Integration gives most confidence per test');`
    },
    {
        id: 'react-test-5',
        category: 'Testing',
        difficulty: 'Hard',
        question: 'Testing Async Components and Error Boundaries',
        answer: `Real-world testing asked at **every company**.

### Async Component Testing:
1. Use findBy* queries (built-in waitFor)
2. await async operations
3. Test loading, success, AND error states

### Error Boundary Testing:
- Suppress console.error for expected errors
- Test error UI renders
- Test recovery behavior
- Mock component that throws

### Common Async Patterns:
- Data fetching on mount
- Form submission
- Optimistic updates`,
        codeExample: `// Testing Async Components
console.log('=== Async Component Test Pattern ===');

console.log('// Component that fetches on mount');
console.log('function UserProfile({ userId }) {');
console.log('  const [user, setUser] = useState(null);');
console.log('  const [loading, setLoading] = useState(true);');
console.log('  const [error, setError] = useState(null);');
console.log('  ');
console.log('  useEffect(() => {');
console.log('    fetchUser(userId).then(setUser).catch(setError);');
console.log('  }, [userId]);');
console.log('}');

console.log('\\n=== Testing All States ===');

console.log('\\n1. Test Loading State:');
console.log('test("shows loading initially", () => {');
console.log('  render(<UserProfile userId={1} />);');
console.log('  expect(screen.getByText(/loading/i)).toBeInTheDocument();');
console.log('});');

console.log('\\n2. Test Success State:');
console.log('test("shows user data after fetch", async () => {');
console.log('  // Mock successful response');
console.log('  server.use(');
console.log('    rest.get("/api/users/1", (req, res, ctx) =>');
console.log('      res(ctx.json({ name: "John" }))');
console.log('    )');
console.log('  );');
console.log('  ');
console.log('  render(<UserProfile userId={1} />);');
console.log('  ');
console.log('  // findBy* waits for element');
console.log('  expect(await screen.findByText("John")).toBeInTheDocument();');
console.log('});');

console.log('\\n3. Test Error State:');
console.log('test("shows error message on failure", async () => {');
console.log('  // Mock error response');
console.log('  server.use(');
console.log('    rest.get("/api/users/1", (req, res, ctx) =>');
console.log('      res(ctx.status(500))');
console.log('    )');
console.log('  );');
console.log('  ');
console.log('  render(<UserProfile userId={1} />);');
console.log('  ');
console.log('  expect(await screen.findByText(/error/i)).toBeInTheDocument();');
console.log('});');

console.log('\\n=== Testing Error Boundaries ===');

console.log('\\ntest("error boundary catches errors", () => {');
console.log('  // Suppress expected errors');
console.log('  const spy = jest.spyOn(console, "error");');
console.log('  spy.mockImplementation(() => {});');
console.log('  ');
console.log('  // Component that throws');
console.log('  function Bomb() {');
console.log('    throw new Error("💥");');
console.log('  }');
console.log('  ');
console.log('  render(');
console.log('    <ErrorBoundary fallback={<p>Something went wrong</p>}>');
console.log('      <Bomb />');
console.log('    </ErrorBoundary>');
console.log('  );');
console.log('  ');
console.log('  expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();');
console.log('  spy.mockRestore();');
console.log('});');

console.log('\\n=== Key Patterns ===');
console.log('✓ findBy* = getBy* + waitFor (async)');
console.log('✓ Test loading, success, AND error states');
console.log('✓ Mock API at network level (MSW)');
console.log('✓ Silence expected console.error in tests');`
    }
];
