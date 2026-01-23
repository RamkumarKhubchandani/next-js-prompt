export const day19 = {
  day: 19,
  title: "Day 19: Testing Strategy (Unit, Integration) + Writing Great Tests",
  intro: "Tests are how you ship changes without fear. Today you’ll learn the testing pyramid, how to write good unit tests, and how to design code that is naturally testable.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 19: Testing. You can't trust code you haven't tested. But we don't want to hit real APIs in tests."
      },
      {
        type: "talk",
        message: "We use 'Mocks' to fake expensive things. Let's practice mocking manually."
      },
      {
        type: "challenge",
        instruction: "Mocking 101. The `getUser` function takes a `fetcher` reference. Create a `mockFetcher` that returns `{ name: 'Test User' }` immediately (synchronously or as a promise), so we can test `getUser` without a network.",
        buggyCode: `async function getUser(fetcher) {
  const data = await fetcher('/api/user');
  return data.name;
}

// ❌ Real network? No.
// We need a mock here.
const mockFetcher = null; 

// Test Code (Don't touch)
try {
  const name = await getUser(mockFetcher);
  console.log("Mock returned:", name);
} catch (e) {
  console.log("Failed:", e.message);
}`,
        solutionCode: `async function getUser(fetcher) {
  const data = await fetcher('/api/user');
  return data.name;
}

// ✅ Mock Function
const mockFetcher = async (url) => {
  return { name: 'Test User' };
};

// Test Code
const name = await getUser(mockFetcher);
console.log("Mock returned:", name);`,
        verifyOutput: "Mock returned: Test User",
        verifyCode: "const mockFetcher",
        successMessage: "Nice. You just wrote a Mock. In Jest/Vitest, `vi.fn()` does this for you, but understanding it's just a function is key.",
        hint: "Define `mockFetcher` as an async function that returns an object `{ name: 'Test User' }`."
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">0) The Goal</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
The goal is not “100% coverage”. The goal is confidence. A good test suite catches regressions and helps you refactor safely.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The Testing Pyramid</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 bg-white dark:bg-dark-800 p-4 rounded-lg mb-6">
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">E2E (Top 10%):</span> Click buttons in browser (Cypress). Slow.</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Integration (Middle 30%):</span> Test module interactions.</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Unit (Bottom 60%):</span> Test single functions (Jest/Vitest). Fast.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) What Makes a Test “Good”?</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6 bg-white dark:bg-dark-800 p-4 rounded-lg">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Deterministic</span>: same result every run</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Small</span>: tests one behavior</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Readable</span>: intention is obvious</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Fast</span>: runs in milliseconds for unit tests</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) AAA Pattern</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Arrange → Act → Assert. This keeps tests structured and readable.
</p>
            `,
  predictions: [
    {
      prompt: "Which layer should you have the most of in the testing pyramid?",
      options: [
        "E2E",
        "Integration",
        "Unit",
        "None"
      ],
      correctIndex: 2,
      explanation: "Unit tests are fast and stable, so you can have many. E2E are slow and flaky, so keep fewer."
    },
    {
      prompt: "A good unit test should be…",
      options: [
        "slow but thorough",
        "randomized to find surprises",
        "deterministic and fast",
        "dependent on network"
      ],
      correctIndex: 2,
      explanation: "Deterministic + fast is the foundation. You can add deeper tests separately."
    }
  ],
  checkpoints: [
    {
      prompt: "Mock vs stub: which verifies behavior (calls) rather than only providing canned values?",
      options: [
        "stub",
        "mock",
        "promise",
        "proxy"
      ],
      correctIndex: 1,
      explanation: "Mocks verify interactions; stubs provide predetermined responses."
    },
    {
      prompt: "Best practice for testing a pure function is…",
      options: [
        "log output manually",
        "assert output for inputs, include edge cases",
        "only snapshot test",
        "skip tests"
      ],
      correctIndex: 1,
      explanation: "Pure functions are easy: assert expected outputs for representative and edge inputs."
    }
  ],
  labSteps: [
    {
      id: "d19-step-1",
      title: "Write a tiny test harness (no Jest needed)",
      subtitle: "Arrange → Act → Assert",
      teacherNote: "We’ll simulate unit testing in plain JS so the habit transfers to Jest/Vitest.",
      bugCode: `console.clear();

function add(a, b) { return a + b; }

// BUG: manual testing is unreliable
console.log(add(1, 2));
console.log(add(-1, 5));`,
      bugFocus: {
        fromLine: 3,
        toLine: 7
      },
      fixCode: `console.clear();

function assertEqual(name, actual, expected) {
  const ok = Object.is(actual, expected);
  console.log(ok ? "PASS" : "FAIL", "-", name, "=>", actual);
  if (!ok) throw new Error("Expected " + expected + " but got " + actual);
}

function add(a, b) { return a + b; }

// Arrange/Act/Assert
assertEqual("1+2", add(1, 2), 3);
assertEqual("-1+5", add(-1, 5), 4);`,
      fixFocus: {
        fromLine: 3,
        toLine: 14
      },
      whatToNotice: [
        "Automated assertions replace guessing.",
        "Small tests become a safety net for refactors."
      ]
    },
    {
      id: "d19-step-2",
      title: "Make code testable via dependency injection",
      subtitle: "No network in unit tests",
      teacherNote: "We simulate an API dependency by injecting a fetch function.",
      bugCode: `console.clear();

async function loadUser() {
  // BUG: hard dependency (would hit network in real life)
  return { id: 1, name: "Asha" };
}

loadUser().then(console.log);`,
      bugFocus: {
        fromLine: 3,
        toLine: 6
      },
      fixCode: `console.clear();

async function loadUser({ fetchUser }) {
  return fetchUser();
}

// Unit test: inject fake dependency
const fakeFetch = async () => ({ id: 1, name: "Asha" });
loadUser({ fetchUser: fakeFetch }).then(console.log);`,
      fixFocus: {
        fromLine: 3,
        toLine: 9
      },
      whatToNotice: [
        "Injecting dependencies makes units testable without the network.",
        "Your architecture becomes cleaner and more maintainable."
      ]
    }
  ],
  code: `// Example: Jest Unit Test
// math.js
export const add = (a, b) => a + b;

// math.test.js
test('adds 1 + 2 to equal 3', () => {
expect(add(1, 2)).toBe(3);
});`,
  comparison: {
    junior: `// ❌ Console Log Testing
function add(a, b) { return a + b; }

console.log(add(1, 2)); // Look at terminal
console.log(add(-1, 5)); // Hope it's right`,
    senior: `// ✅ Automated Tests
describe('add', () => {
it('handles negative numbers', () => {
expect(add(-1, 5)).toBe(4);
});

it('throws on string input', () => {
expect(() => add("1", 2)).toThrow();
});
});`
  },
  interview: {
    questions: [
      {
        q: "What is TDD?",
        a: "Test Driven Development. 1. Write fail test. 2. Write code to pass. 3. Refactor."
      },
      {
        q: "Mock vs Stub?",
        a: "Stub provides canned answers. Mock verifies behavior (was this function called?)."
      },
      {
        q: "What is Code Coverage?",
        a: "The percentage of lines of code executed during tests."
      }
    ]
  },
  recap: {
    takeaways: [
      "Most tests should be unit tests (fast, stable); fewer integration; fewest E2E.",
      "Good tests are deterministic, readable, and focused.",
      "AAA pattern (Arrange, Act, Assert) keeps tests clean.",
      "Dependency injection makes code testable without real networks/DBs."
    ],
    commonMistakes: [
      "Relying on manual console logging as 'testing'.",
      "Writing flaky tests that depend on time/network/randomness.",
      "Testing implementation details instead of behavior.",
      "Overusing E2E tests and making the suite slow and unreliable."
    ],
    nextActions: [
      "Write 5 unit tests for a pure function with edge cases.",
      "Refactor one module to accept dependencies as arguments and test with fakes."
    ]
  }
};
