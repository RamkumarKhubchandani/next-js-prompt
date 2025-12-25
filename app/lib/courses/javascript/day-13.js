export const day13 = {
  day: 13,
  title: "Day 13: Proxy + Reflect (Powerful Meta‑Programming)",
  intro: "Proxies let you intercept reads/writes/calls like a runtime firewall. Today you’ll learn the traps, how Reflect forwards correctly, and how frameworks use Proxies for reactivity.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">0) The Mental Model</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
A Proxy is a programmable layer between you and a target object. It can validate, log, provide defaults, enforce invariants, and even virtualize properties.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The Middleman</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
A Proxy sits between you and the target. Every operation can be intercepted by a trap (get/set/has/ownKeys/apply/construct…).
</p>

<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-blue-300 mb-6 overflow-x-auto shadow-inner">
<pre>
   [ User ] ──▶ [ Proxy ] ──▶ [ Target Object ]
                   │
              [ Trap: get ]
              "You accessed property 'x'"
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Real Use Cases</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 bg-white dark:bg-dark-800 p-4 rounded-lg mb-6">
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Validation:</span> Reject invalid types on assignment.</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Data Binding:</span> Vue 3 uses Proxies for reactivity.</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Logging:</span> Debug property access.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Reflect (The Correct Way to Forward)</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Reflect provides functions that correspond to traps. Using Reflect keeps behavior consistent with default JS semantics.
Example: use <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">Reflect.get</code> and <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">Reflect.set</code> inside get/set traps.
</p>

<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl mb-6">
  <p class="text-red-800 dark:text-red-200">
    <span class="text-yellow-600 dark:text-yellow-400 font-bold">Teacher warning:</span> Many Proxy bugs come from forgetting to return true in set traps or breaking invariants (like non-configurable properties).
  </p>
</div>
            `,
  predictions: [
    {
      prompt: "In a Proxy set trap, what must you return to indicate success?",
      options: [
        "the value",
        "true",
        "false",
        "nothing (undefined)"
      ],
      correctIndex: 1,
      explanation: "The set trap should return true when the assignment succeeded. Returning false can throw in strict mode."
    },
    {
      prompt: "Why use Reflect inside traps?",
      options: [
        "It makes code shorter only",
        "It forwards operations with correct default semantics",
        "It disables traps",
        "It makes Promises faster"
      ],
      correctIndex: 1,
      explanation: "Reflect mirrors internal JS operations so your proxy stays consistent with standard behavior."
    }
  ],
  checkpoints: [
    {
      prompt: "A Proxy is best described as…",
      options: [
        "a copy of an object",
        "a wrapper that intercepts operations on a target",
        "a JSON parser",
        "a garbage collector tool"
      ],
      correctIndex: 1,
      explanation: "Proxy traps let you intercept fundamental operations like get/set/call."
    },
    {
      prompt: "Which is a common real-world Proxy use case?",
      options: [
        "GPU rendering",
        "reactivity/validation/logging",
        "database transactions",
        "CSS layout"
      ],
      correctIndex: 1,
      explanation: "Frameworks use proxies for reactivity; apps use them for validation and observability."
    }
  ],
  labSteps: [
    {
      id: "d13-step-1",
      title: "set trap bug: missing return true",
      subtitle: "Silent failure / strict-mode errors",
      teacherNote: "Predict what happens when you assign. Then fix by returning Reflect.set (boolean).",
      bugCode: `console.clear();

const target = {};
const p = new Proxy(target, {
  set(obj, prop, value) {
    obj[prop] = value;
    // BUG: forgot return true
  }
});

try {
  p.age = 10;
  console.log("age:", p.age);
} catch (e) {
  console.log("error:", e.message);
}`,
      bugFocus: {
        fromLine: 4,
        toLine: 8
      },
      fixCode: `console.clear();

const target = {};
const p = new Proxy(target, {
  set(obj, prop, value) {
    // FIX: forward with Reflect (returns boolean)
    return Reflect.set(obj, prop, value);
  }
});

p.age = 10;
console.log("age:", p.age);`,
      fixFocus: {
        fromLine: 4,
        toLine: 7
      },
      whatToNotice: [
        "set trap must return a boolean.",
        "Reflect.set preserves standard semantics."
      ]
    },
    {
      id: "d13-step-2",
      title: "Default values via get trap",
      subtitle: "Make missing keys predictable",
      teacherNote: "This pattern is powerful, but don’t hide real bugs—use it intentionally.",
      bugCode: `console.clear();

const config = new Proxy({}, {
  get(obj, prop) {
    return obj[prop]; // returns undefined often
  }
});

console.log("mode:", config.mode);
console.log("timeout:", config.timeout);`,
      bugFocus: {
        fromLine: 3,
        toLine: 6
      },
      fixCode: `console.clear();

const defaults = { mode: "prod", timeout: 5000 };
const config = new Proxy({}, {
  get(obj, prop) {
    if (prop in obj) return obj[prop];
    if (prop in defaults) return defaults[prop];
    return undefined;
  }
});

console.log("mode:", config.mode);
console.log("timeout:", config.timeout);`,
      fixFocus: {
        fromLine: 3,
        toLine: 10
      },
      whatToNotice: [
        "Proxies can provide defaults and enforce policy centrally.",
        "Use with care: defaulting can hide typos if you’re not strict."
      ]
    }
  ],
  code: `// Example 1: Validation Proxy
const validator = {
set: (obj, prop, value) => {
if (prop === 'age' && value < 0) {
  throw new Error("Age must be positive");
}
obj[prop] = value;
return true;
}
};

const person = new Proxy({}, validator);
person.age = 25; // OK
// person.age = -5; // Error`,
  comparison: {
    junior: `// ❌ Manual Getters/Setters everywhere
class User {
setAge(age) {
if (age < 0) throw new Error();
this.age = age;
}
setName(name) {
if (!name) throw new Error();
this.name = name;
}
}`,
    senior: `// ✅ Generic Proxy Validator
const safeObj = new Proxy({}, {
set(target, prop, val) {
if (prop === 'age' && val < 0) throw 'Invalid';
target[prop] = val;
return true;
}
});
// Works for any property dynamically`
  },
  interview: {
    questions: [
      {
        q: "What is the `Reflect` API?",
        a: "It provides methods corresponding to Proxy traps (e.g., `Reflect.set`). It allows you to forward operations to the original object cleanly."
      },
      {
        q: "Can you proxy a function?",
        a: "Yes. You can use the `apply` trap to intercept function calls."
      },
      {
        q: "Why use Proxy over `Object.defineProperty`?",
        a: "Proxy can intercept dynamic properties that don't exist yet. `defineProperty` only works on specific, known keys."
      }
    ]
  },
  recap: {
    takeaways: [
      "Proxy intercepts fundamental operations (get/set/call/etc.) using traps.",
      "Reflect forwards operations using standard JS semantics (recommended in traps).",
      "Proxies are powerful for validation, logging, defaults, and reactivity.",
      "Breaking Proxy invariants or returning wrong values creates hard-to-debug bugs."
    ],
    commonMistakes: [
      "Forgetting to return true/boolean from set traps.",
      "Implementing get/set without Reflect and accidentally changing semantics.",
      "Using proxies to hide typos (silent bugs).",
      "Violating invariants (e.g., non-configurable property rules)."
    ],
    nextActions: [
      "Build a validation proxy that enforces types for a config object.",
      "Create a logging proxy that records all get/set operations for debugging."
    ]
  }
};
