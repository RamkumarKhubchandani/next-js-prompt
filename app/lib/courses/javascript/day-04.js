export const day04 = {
  day: 4,
  title: "Day 4: `this` Mastery + call/apply/bind (No More Guessing)",
  intro: "If `this` feels random, you’re missing one skill: reading the call-site. Today you’ll build the “call-site scanner” that makes `this` predictable.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">0) The One Sentence Truth</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
<code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">this</code> is not about where a function is defined.
It is about <span class="text-yellow-600 dark:text-yellow-400 font-bold">how the function is called</span>.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The 4 Call-Site Rules (Priority Order)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
When multiple rules could apply, higher priority wins.
</p>

<div class="overflow-hidden rounded-xl border border-gray-200 dark:border-dark-600 mb-8">
<table class="w-full text-sm text-left">
  <thead class="bg-white dark:bg-dark-800 text-gray-600 dark:text-light-300">
    <tr>
      <th class="p-3">Priority</th>
      <th class="p-3">Rule</th>
      <th class="p-3">Meaning</th>
      <th class="p-3">Example</th>
    </tr>
  </thead>
  <tbody class="divide-y divide-dark-700 bg-gray-100 dark:bg-dark-900">
    <tr>
      <td class="p-3 text-brand-primary font-bold">1</td>
      <td class="p-3"><span class="text-yellow-600 dark:text-yellow-400 font-bold">new binding</span></td>
      <td class="p-3 text-gray-600 dark:text-light-300">Constructor call creates a fresh object and binds this to it</td>
      <td class="p-3 font-mono text-xs">new Person()</td>
    </tr>
    <tr>
      <td class="p-3 font-bold">2</td>
      <td class="p-3"><span class="text-yellow-600 dark:text-yellow-400 font-bold">explicit binding</span></td>
      <td class="p-3 text-gray-600 dark:text-light-300">You force this via call/apply/bind</td>
      <td class="p-3 font-mono text-xs">fn.call(obj)</td>
    </tr>
    <tr>
      <td class="p-3 font-bold">3</td>
      <td class="p-3"><span class="text-yellow-600 dark:text-yellow-400 font-bold">implicit binding</span></td>
      <td class="p-3 text-gray-600 dark:text-light-300">Method call binds this to the object left of the dot</td>
      <td class="p-3 font-mono text-xs">obj.fn()</td>
    </tr>
    <tr>
      <td class="p-3 text-light-500 font-bold">4</td>
      <td class="p-3"><span class="text-yellow-600 dark:text-yellow-400 font-bold">default binding</span></td>
      <td class="p-3 text-gray-600 dark:text-light-300">Plain function call: this is global (sloppy) or undefined (strict)</td>
      <td class="p-3 font-mono text-xs">fn()</td>
    </tr>
  </tbody>
</table>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) The Most Common Bug: Method Extraction</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
When you do <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">const f = obj.method</code>, you lost the call-site.
Calling <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">f()</code> is now a plain function call, so default binding applies.
</p>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-sm text-gray-700 dark:text-light-200 overflow-x-auto mb-8">
<pre><code>
const user = {
  name: "Asha",
  say() { console.log(this.name); }
};

user.say(); // ok
const f = user.say;
f(); // default binding (often undefined)
</code></pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) call vs apply vs bind</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-8 bg-white dark:bg-dark-800 p-4 rounded-lg">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">call</span>: invoke immediately, args listed</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">apply</span>: invoke immediately, args array</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">bind</span>: returns a new function with this locked</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">4) Arrow Functions: “this” from the Parent</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Arrow functions don’t have their own this. They capture this from the surrounding lexical scope.
This makes them perfect for callbacks where you want to “keep the this”.
</p>

<div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30 p-4 rounded-xl mb-8">
  <p class="text-blue-800 dark:text-blue-200">
    <span class="text-yellow-600 dark:text-yellow-400 font-bold">Teacher trick:</span> If you see an arrow, stop applying the 4 rules to that arrow.
    The arrow inherits this from where it was created.
  </p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">5) Strict Mode Note</h3>
<p class="text-gray-600 dark:text-light-300">
In strict mode, default binding sets <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">this</code> to <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">undefined</code>, which is safer than silently using the global object.
</p>
            `,
  predictions: [
    {
      prompt: "Predict: What does `f()` print after `const f = user.say`?",
      options: [
        "Asha",
        "undefined",
        "ReferenceError",
        "It depends but usually undefined / error"
      ],
      correctIndex: 3,
      explanation: "The method lost its call-site. Default binding applies. In strict contexts it’s undefined; in sloppy it can be global. In our lab, you’ll observe what happens."
    },
    {
      prompt: "Which has the highest priority in `this` binding?",
      options: [
        "implicit binding",
        "explicit binding",
        "new binding",
        "default binding"
      ],
      correctIndex: 2,
      explanation: "`new` binding wins. If you call a bound function with `new`, the `new` binding takes priority."
    },
    {
      prompt: "Arrow functions decide `this` based on…",
      options: [
        "call-site",
        "where they are defined (lexical)",
        "the object left of the dot",
        "bind() arguments"
      ],
      correctIndex: 1,
      explanation: "Arrows capture `this` lexically (from the parent scope). call/apply/bind don’t change arrow `this`."
    }
  ],
  checkpoints: [
    {
      prompt: "What does `bind` return?",
      options: [
        "The result of the function",
        "A new function with this fixed",
        "A Promise",
        "A copy of the object"
      ],
      correctIndex: 1,
      explanation: "`bind` returns a new function. It doesn’t execute immediately."
    },
    {
      prompt: "The easiest way to predict `this` is to…",
      options: [
        "look at the function definition",
        "look at the call-site",
        "search the file for 'this'",
        "avoid this entirely"
      ],
      correctIndex: 1,
      explanation: "`this` is call-site driven. Scan the line where the function is called."
    }
  ],
  labSteps: [
    {
      id: "d4-step-1",
      title: "Method extraction bug",
      subtitle: "You lost the call-site",
      teacherNote: "Predict what `f()` prints. Then fix it with bind or by calling with the object.",
      bugCode: `console.clear();

const user = {
  name: "Asha",
  say() { console.log("say:", this.name); }
};

const f = user.say;
f();`,
      bugFocus: {
        fromLine: 8,
        toLine: 9
      },
      fixCode: `console.clear();

const user = {
  name: "Asha",
  say() { console.log("say:", this.name); }
};

// FIX A: keep call-site
user.say();

// FIX B: bind the function
const f = user.say.bind(user);
f();`,
      fixFocus: {
        fromLine: 9,
        toLine: 13
      },
      whatToNotice: [
        "Without the object left of the dot, default binding applies.",
        "bind creates a new function with `this` locked to user."
      ]
    },
    {
      id: "d4-step-2",
      title: "setTimeout + this (classic pitfall)",
      subtitle: "Callback loses implicit binding",
      teacherNote: "Predict: will it print seconds or NaN? Then fix with arrow or bind.",
      bugCode: `console.clear();

function Timer() {
  this.seconds = 0;
  setInterval(function () {
    this.seconds++;
    console.log("seconds:", this.seconds);
  }, 200);
}

new Timer();`,
      bugFocus: {
        fromLine: 5,
        toLine: 8
      },
      fixCode: `console.clear();

function Timer() {
  this.seconds = 0;

  // FIX: arrow inherits 'this' from Timer()
  setInterval(() => {
    this.seconds++;
    console.log("seconds:", this.seconds);
  }, 200);
}

new Timer();`,
      fixFocus: {
        fromLine: 6,
        toLine: 10
      },
      whatToNotice: [
        "The callback is a plain function call (default binding).",
        "Arrows capture lexical this, which is the Timer instance here."
      ]
    }
  ],
  code: `// Day 4 Live Lab: \`this\` (Predict first!)
console.clear();

const person = {
  name: "Alice",
  say() { console.log("implicit:", this.name); }
};
const other = { name: "Bob" };

person.say();               // Alice
person.say.call(other);     // Bob

const f = person.say;
try { f(); } catch (e) { console.log("extracted call error:", e.message); }

const bound = person.say.bind(person);
bound();`,
  comparison: {
    junior: `// ❌ The "Self" Hack
function Timer() {
this.seconds = 0;
var self = this; // Caching 'this' manually

setInterval(function() {
self.seconds++; // Uses closure
console.log(self.seconds);
}, 1000);
}`,
    senior: `// ✅ Arrow Functions
function Timer() {
this.seconds = 0;

// Arrow function inherits 'this' from Timer
setInterval(() => {
this.seconds++;
console.log(this.seconds);
}, 1000);
}`
  },
  interview: {
    questions: [
      {
        q: "What is the difference between `call` and `apply`?",
        a: "`call` takes arguments separately (`fn.call(ctx, 1, 2)`). `apply` takes arguments as an array (`fn.apply(ctx, [1, 2])`)."
      },
      {
        q: "What does `bind` return?",
        a: "`bind` returns a **new function** with `this` permanently locked to the first argument. It does not execute the function immediately."
      },
      {
        q: "Can you override the `this` of an Arrow Function?",
        a: "No. `call`, `apply`, and `bind` have no effect on arrow functions. Their `this` is hardcoded to the lexical scope."
      }
    ]
  },
  recap: {
    takeaways: [
      "`this` is determined by the call-site, not the definition.",
      "Priority: new binding → explicit (call/apply/bind) → implicit (obj.fn) → default.",
      "Method extraction loses implicit binding and often breaks `this`.",
      "Arrow functions capture `this` lexically (call/apply/bind don’t change it)."
    ],
    commonMistakes: [
      "Reading `this` like a normal variable (it’s call-site driven).",
      "Passing methods as callbacks without binding.",
      "Assuming arrow functions have their own `this` (they don’t).",
      "Using 'self = this' everywhere instead of understanding binding rules."
    ],
    nextActions: [
      "Do the method extraction lab and fix using bind.",
      "Rewrite a setInterval callback with an arrow to keep lexical `this`."
    ]
  }
};
