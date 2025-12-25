export const day17 = {
  day: 17,
  title: "Day 17: Design Patterns (Singleton, Factory, Observer) — Practical Use",
  intro: "Patterns are tools, not trophies. Today you’ll learn when to use them, how to implement them safely in JS, and how to avoid the common anti-patterns.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">0) The Rule for Patterns</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Use patterns to reduce coupling and clarify responsibility. If a pattern makes code harder to read, you applied it too early.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Singleton (One Instance, Controlled Access)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Singleton is useful for truly global resources (config, logger, DB client), but it’s often abused.
In JS, module scope already behaves like a singleton.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Factory (Create Objects Without new)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Factories centralize creation logic. This is useful when object creation depends on config, environment, or feature flags.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Observer / Pub-Sub (Decoupling)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Observers subscribe to events instead of tightly coupling modules. This powers UI event systems and state libraries.
</p>

<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-yellow-300 mb-6 overflow-x-auto shadow-inner">
<pre>
[ Subject ] 
   │
Notify() ──┬──▶ [ Observer A ]
           ├──▶ [ Observer B ]
           └──▶ [ Observer C ]
</pre>
</div>
            `,
  predictions: [
    {
      prompt: "In JavaScript, what already behaves like a singleton by default?",
      options: [
        "a class",
        "a module",
        "an array",
        "a promise"
      ],
      correctIndex: 1,
      explanation: "Module scope is evaluated once and cached. Imports reuse the same module instance."
    },
    {
      prompt: "Observer pattern reduces…",
      options: [
        "coupling",
        "typing speed",
        "garbage collection",
        "network latency"
      ],
      correctIndex: 0,
      explanation: "Observer decouples publishers from subscribers."
    }
  ],
  checkpoints: [
    {
      prompt: "Factory pattern is best when…",
      options: [
        "you want to avoid all functions",
        "creation logic is complex or depends on configuration",
        "you need faster loops",
        "you want global variables"
      ],
      correctIndex: 1,
      explanation: "Factories centralize object creation and hide conditional complexity."
    },
    {
      prompt: "A common bug with Observer systems is…",
      options: [
        "missing semicolons",
        "memory leaks from never unsubscribing",
        "slow JSON",
        "CSS specificity"
      ],
      correctIndex: 1,
      explanation: "If you subscribe and never unsubscribe, listeners accumulate and leak memory."
    }
  ],
  labSteps: [
    {
      id: "d17-step-1",
      title: "Singleton anti-pattern: hidden global state",
      subtitle: "Hard to test, hard to reset",
      teacherNote: "Observe how state sticks around. Then refactor to explicit dependency injection.",
      bugCode: `console.clear();

// BUG: hidden global singleton state
const Settings = (() => {
  let value = { theme: "dark" };
  return {
    get: () => value,
    set: (v) => (value = v)
  };
})();

Settings.set({ theme: "light" });
console.log(Settings.get());`,
      bugFocus: {
        fromLine: 3,
        toLine: 11
      },
      fixCode: `console.clear();

// FIX: inject dependencies instead of hiding them
function createSettings(initial) {
  let value = initial;
  return {
    get: () => value,
    set: (v) => (value = v)
  };
}

const settings = createSettings({ theme: "dark" });
settings.set({ theme: "light" });
console.log(settings.get());`,
      fixFocus: {
        fromLine: 3,
        toLine: 14
      },
      whatToNotice: [
        "Singletons hide dependencies; tests become harder.",
        "Factories create explicit instances you can control/reset."
      ]
    },
    {
      id: "d17-step-2",
      title: "Observer leak: never unsubscribing",
      subtitle: "Listeners accumulate",
      teacherNote: "Watch subscriber count grow. Then fix by returning an unsubscribe function.",
      bugCode: `console.clear();

class Bus {
  constructor() { this.subs = []; }
  on(fn) { this.subs.push(fn); } // BUG: no unsubscribe
  emit(x) { this.subs.forEach(fn => fn(x)); }
}

const bus = new Bus();
for (let i = 0; i < 5; i++) bus.on(() => {});
console.log("subs:", bus.subs.length);`,
      bugFocus: {
        fromLine: 4,
        toLine: 6
      },
      fixCode: `console.clear();

class Bus {
  constructor() { this.subs = new Set(); }
  on(fn) {
    this.subs.add(fn);
    return () => this.subs.delete(fn); // FIX: unsubscribe
  }
  emit(x) { this.subs.forEach(fn => fn(x)); }
}

const bus = new Bus();
const off = bus.on(() => console.log("hi"));
console.log("subs:", bus.subs.size);
off();
console.log("subs after off:", bus.subs.size);`,
      fixFocus: {
        fromLine: 4,
        toLine: 10
      },
      whatToNotice: [
        "Always provide unsubscribe in observer systems.",
        "Set makes add/remove easier and prevents duplicates."
      ]
    }
  ],
  code: `// Example: Singleton
class Database {
constructor() {
if (Database.instance) return Database.instance;
Database.instance = this;
this.conn = "Connected";
}
}
const db1 = new Database();
const db2 = new Database();
console.log(db1 === db2); // true`,
  comparison: {
    junior: `// ❌ Tight Coupling
class Button {
click() {
// Button knows too much about other classes
header.update();
analytics.track();
sound.play();
}
}`,
    senior: `// ✅ Observer Pattern
class Button {
constructor() { this.observers = []; }
subscribe(fn) { this.observers.push(fn); }
click() {
this.observers.forEach(fn => fn());
}
}
// Decoupled
btn.subscribe(header.update);
btn.subscribe(analytics.track);`
  },
  interview: {
    questions: [
      {
        q: "What is the Module Pattern?",
        a: "Using Closures/IIFE to create private scope and return a public API."
      },
      {
        q: "Explain the Factory Pattern.",
        a: "A function that creates objects without calling `new`. Useful for complex creation logic."
      },
      {
        q: "What pattern does React use?",
        a: "Observer (State changes -> UI updates) and Composition (Components)."
      }
    ]
  },
  recap: {
    takeaways: [
      "Patterns should reduce coupling and clarify intent, not add ceremony.",
      "JS module scope already behaves like a singleton.",
      "Factories centralize creation logic and improve testability.",
      "Observer/pub-sub decouples modules but requires unsubscribe to avoid leaks."
    ],
    commonMistakes: [
      "Using Singleton everywhere (hidden globals, hard tests).",
      "Observer systems without unsubscribe (memory leaks).",
      "Factories that just wrap new (no real benefit).",
      "Applying patterns before the problem exists (over-engineering)."
    ],
    nextActions: [
      "Refactor one hidden global into an injected dependency.",
      "Add unsubscribe support to any pub-sub/event-bus code you have."
    ]
  }
};
