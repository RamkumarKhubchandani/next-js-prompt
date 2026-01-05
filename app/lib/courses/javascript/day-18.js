export const day18 = {
  day: 18,
  title: "Day 18: SOLID in JavaScript (Maintainable Architecture)",
  intro: "SOLID is about change: your code should be easy to extend without breaking. Today you’ll learn each principle with concrete JS examples and refactor a “god function” into maintainable pieces.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 18! SOLID. The most useful one for daily coding is 'D' - Dependency Injection."
      },
      {
        type: "talk",
        message: "It makes your code testable. Instead of `new Database()` inside your function, pass it in."
      },
      {
        type: "challenge",
        instruction: "Decouple this. The `processUser` function is hard to test because it creates its own `DB`. Refactor it to accept `db` as an argument.",
        buggyCode: `class DB { save(x) { console.log('Saved', x); } }

function processUser(user) {
  const db = new DB(); // ❌ Hard dependency
  db.save(user);
}

processUser('Alice');
// How do we test this without a real DB? We can't.`,
        solutionCode: `class DB { save(x) { console.log('Saved', x); } }

// ✅ Dependency Injection
function processUser(db, user) {
  db.save(user);
}

const db = new DB();
processUser(db, 'Alice');`,
        verifyOutput: "Saved Alice",
        verifyCode: "processUser(db",
        successMessage: "Boom. Now you can pass a FakeDB for testing and a RealDB for production. That is the power of Dependency Injection.",
        hint: "Change `processUser(user)` to `processUser(db, user)` and remove the `new DB()` line."
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">0) The Teaching Lens</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
SOLID is not about classes only. It’s about dependency boundaries and change management.
Ask: “If requirements change, where do I edit code?”
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) SRP — Single Responsibility</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
A function/module should have one reason to change. If one function validates, writes DB, sends email, and updates UI — it will break constantly.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) OCP — Open/Closed</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Design code so behavior can be extended via configuration/plugins without modifying core logic.
</p>

<div class="overflow-hidden rounded-xl border border-gray-200 dark:border-dark-600 mb-6">
<table class="w-full text-sm text-left">
    <thead class="bg-white dark:bg-dark-800 text-gray-600 dark:text-light-300">
        <tr>
            <th class="p-3">Principle</th>
            <th class="p-3">Meaning</th>
        </tr>
    </thead>
    <tbody class="divide-y divide-dark-700 bg-gray-100 dark:bg-dark-900">
        <tr><td class="p-3">S</td><td class="p-3">Single Responsibility</td></tr>
        <tr><td class="p-3">O</td><td class="p-3">Open/Closed</td></tr>
        <tr><td class="p-3">L</td><td class="p-3">Liskov Substitution</td></tr>
        <tr><td class="p-3">I</td><td class="p-3">Interface Segregation</td></tr>
        <tr><td class="p-3">D</td><td class="p-3">Dependency Inversion</td></tr>
    </tbody>
</table>
</div>
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) DIP — Dependency Inversion (Most Useful)</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
High-level logic should not depend on low-level details. Depend on abstractions (interfaces/contracts).
In JS, this often means passing dependencies as arguments instead of importing concrete implementations everywhere.
</p>
            `,
  predictions: [
    {
      prompt: "Which is a sign SRP is violated?",
      options: [
        "a function has one responsibility",
        "a function validates, saves, emails, and renders UI",
        "a function returns a value",
        "a function is pure"
      ],
      correctIndex: 1,
      explanation: "Multiple responsibilities create multiple reasons to change and increase breakage."
    },
    {
      prompt: "Dependency Inversion is mainly about…",
      options: [
        "writing more classes",
        "making high-level logic depend on contracts rather than concrete details",
        "using more globals",
        "avoiding tests"
      ],
      correctIndex: 1,
      explanation: "DIP decouples your domain logic from implementation details, improving testability and maintainability."
    }
  ],
  checkpoints: [
    {
      prompt: "OCP means…",
      options: [
        "open for extension, closed for modification",
        "open source only",
        "optimize CPU always",
        "only classes matter"
      ],
      correctIndex: 0,
      explanation: "You can extend behavior without editing stable core code."
    },
    {
      prompt: "A practical DIP technique in JS is…",
      options: [
        "importing database client everywhere",
        "passing dependencies (repo/logger/http) into functions",
        "mutating Object.prototype",
        "using eval"
      ],
      correctIndex: 1,
      explanation: "Injecting dependencies makes code testable and reduces coupling."
    }
  ],
  labSteps: [
    {
      id: "d18-step-1",
      title: "SRP refactor: god function",
      subtitle: "One function doing everything",
      teacherNote: "Identify responsibilities, then split into focused functions.",
      bugCode: `console.clear();

function registerUser(user) {
  if (!user.email) throw new Error("missing email"); // validate
  // save (simulated)
  console.log("saving to db:", user.email);
  // notify (simulated)
  console.log("sending welcome email:", user.email);
  // render (simulated)
  console.log("rendering UI");
}

registerUser({ email: "a@b.com" });`,
      bugFocus: {
        fromLine: 3,
        toLine: 10
      },
      fixCode: `console.clear();

function validateUser(user) {
  if (!user.email) throw new Error("missing email");
}
function saveUser(repo, user) { repo.save(user); }
function notify(notifier, user) { notifier.send(user.email); }

function registerUser({ repo, notifier }, user) {
  validateUser(user);
  saveUser(repo, user);
  notify(notifier, user);
}

const repo = { save: (u) => console.log("saving:", u.email) };
const notifier = { send: (email) => console.log("email:", email) };
registerUser({ repo, notifier }, { email: "a@b.com" });`,
      fixFocus: {
        fromLine: 3,
        toLine: 17
      },
      whatToNotice: [
        "Each function has one job.",
        "Dependencies are injected, making it easy to test."
      ]
    },
    {
      id: "d18-step-2",
      title: "OCP with rules/plugins",
      subtitle: "Extend without changing core",
      teacherNote: "Notice we add new rules without editing validate().",
      bugCode: `console.clear();

class Validator {
  constructor() { this.rules = []; }
  addRule(rule) { this.rules.push(rule); }
  validate(val) { return this.rules.every(r => r(val)); }
}

const v = new Validator();
v.addRule(x => x > 0);
console.log(v.validate(10));`,
      bugFocus: {
        fromLine: 3,
        toLine: 7
      },
      fixCode: `console.clear();

class Validator {
  constructor() { this.rules = []; }
  addRule(rule) { this.rules.push(rule); }
  validate(val) { return this.rules.every(r => r(val)); }
}

const v = new Validator();
v.addRule(x => x > 0);
v.addRule(x => x < 100); // extension
console.log("validate 10:", v.validate(10));
console.log("validate 1000:", v.validate(1000));`,
      fixFocus: {
        fromLine: 10,
        toLine: 14
      },
      whatToNotice: [
        "Extension happens by adding rules, not changing Validator internals.",
        "This prevents risky edits to stable code."
      ]
    }
  ],
  code: `// Example: OCP (Open/Closed)
class Validator {
constructor() {
    this.rules = [];
}
addRule(rule) { this.rules.push(rule); }
validate(val) { return this.rules.every(r => r(val)); }
}

// We extend functionality without changing the class
const v = new Validator();
v.addRule(x => x > 0);
v.addRule(x => x < 100);`,
  comparison: {
    junior: `// ❌ God Function (Violates SRP)
function registerUser(user) {
// 1. Validate
if (!user.email) throw Error();
// 2. Save DB
db.save(user);
// 3. Send Email
email.send(user.email);
// 4. Update UI
dom.render(user);
}`,
    senior: `// ✅ SRP
function registerUser(user) {
validate(user);
repo.save(user);
notifier.notify(user);
}
// Each function does ONE thing.`
  },
  interview: {
    questions: [
      {
        q: "Why is Dependency Inversion important?",
        a: "It decouples high-level logic from low-level details. Instead of 'App depends on SQL', 'App depends on Database Interface', and SQL implements that."
      },
      {
        q: "What is Liskov Substitution?",
        a: "Subclasses should be substitutable for their base classes without breaking the app."
      },
      {
        q: "How to apply SRP to React Components?",
        a: "Split components: One for Logic (Container/Hook) and one for UI (Presentational)."
      }
    ]
  },
  recap: {
    takeaways: [
      "SRP reduces breakage by limiting each module to one reason to change.",
      "OCP enables extending behavior without modifying stable core code.",
      "DIP improves testability by injecting dependencies rather than importing concrete details everywhere.",
      "SOLID is about managing change and boundaries, not just classes."
    ],
    commonMistakes: [
      "God functions that validate/save/notify/render in one place.",
      "Editing core logic for every new case instead of adding plugins/rules.",
      "Hard-coding dependencies (db/email/http) inside domain logic.",
      "Using SOLID as dogma instead of a tool for change management."
    ],
    nextActions: [
      "Pick one messy function and split it into validate/save/notify responsibilities.",
      "Refactor a module to accept dependencies as parameters (repo/logger)."
    ]
  }
};
