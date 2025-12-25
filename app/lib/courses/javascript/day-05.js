export const day05 = {
  day: 5,
  title: "Day 5: Prototypes (How JS “Inheritance” Actually Works)",
  intro: "JavaScript inheritance is delegation: objects link to objects. Today you’ll learn property lookup, prototype chains, classes as sugar, and the safe patterns pros use.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">0) The Mental Model</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
When you read <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">obj.prop</code>, JavaScript does <span class="text-yellow-600 dark:text-yellow-400 font-bold">property lookup</span>:
<span class="text-yellow-600 dark:text-yellow-400 font-bold">own properties</span> first, then climbs <span class="text-yellow-600 dark:text-yellow-400 font-bold">obj’s prototype chain</span> until it finds it or hits null.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Prototype Chain (Property Lookup)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
When you access <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">dog.eats</code>, JS walks up the chain until it finds it.
</p>

<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-pink-300 mb-6 overflow-x-auto shadow-inner">
<pre>
[ dog Object ]
│  name: "Rex"
│  __proto__ ──┐
           ▼
    [ animal Object ]
    │  eats: true
    │  __proto__ ──┐
                   ▼
            [ Object.prototype ]
            │  toString: fn
            │  __proto__: null
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">__proto__</code> vs <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">prototype</code> (Don’t Mix Them)</h3>
<ul class="list-disc list-inside space-y-3 text-gray-600 dark:text-light-300 bg-white dark:bg-dark-800 p-4 rounded-lg mb-8">
  <li><code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">__proto__</code> (aka <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">[[Prototype]]</code>): the actual link on an <span class="text-yellow-600 dark:text-yellow-400 font-bold">instance</span>.</li>
  <li><code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">prototype</code>: a property on a <span class="text-yellow-600 dark:text-yellow-400 font-bold">constructor function</span> used for instances created via <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">new</code>.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) “Classes” Are Sugar Over Prototypes</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
<code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">class</code> feels like classical OOP, but under the hood it still uses prototype chains.
Methods live on <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">Constructor.prototype</code>.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">4) Performance & Safety Notes (Real Engineering)</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-8 bg-white dark:bg-dark-800 p-4 rounded-lg">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Avoid</span> mutating <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">Object.prototype</code> or built-ins (prototype pollution + de-opts).</li>
  <li>Use <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">Object.create(null)</code> for “pure dictionaries” (no inherited keys).</li>
  <li>Prefer <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">Object.create</code> / classes over setting <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">__proto__</code> directly.</li>
</ul>

<details class="mb-6 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-xl p-4">
  <summary class="cursor-pointer font-bold text-gray-800 dark:text-light-100">Why is prototype pollution dangerous?</summary>
  <div class="mt-3 text-gray-600 dark:text-light-300 space-y-3">
    <p>
      If attacker-controlled input can set <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">__proto__</code> or <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">constructor.prototype</code>,
      they can inject properties into many objects. This can cause security issues and logic corruption.
    </p>
  </div>
</details>
            `,
  predictions: [
    {
      prompt: "Predict: If `dog` is created with `Object.create(animal)`, where does `dog.eats` come from?",
      options: [
        "dog own property",
        "animal prototype",
        "Object.prototype",
        "it’s undefined"
      ],
      correctIndex: 1,
      explanation: "`Object.create(animal)` sets animal as dog’s prototype. Missing lookups delegate to animal."
    },
    {
      prompt: "Predict: Methods defined in a JS `class` live on…",
      options: [
        "each instance",
        "the class constructor’s prototype",
        "window",
        "Object.prototype"
      ],
      correctIndex: 1,
      explanation: "Class methods are placed on `Constructor.prototype`, so instances share them."
    }
  ],
  checkpoints: [
    {
      prompt: "Property lookup order is…",
      options: [
        "prototype first, then own",
        "own first, then prototype chain",
        "random",
        "depends on TypeScript"
      ],
      correctIndex: 1,
      explanation: "JS checks own properties first, then walks the prototype chain."
    },
    {
      prompt: "What is `Object.create(null)` best for?",
      options: [
        "Creating arrays without prototypes",
        "Creating a dictionary object without inherited keys",
        "Creating classes",
        "Faster JSON parsing"
      ],
      correctIndex: 1,
      explanation: "It creates an object with no prototype—useful for clean maps where inherited keys would be a bug."
    }
  ],
  labSteps: [
    {
      id: "d5-step-1",
      title: "Property lookup: own vs prototype",
      subtitle: "Where does the value come from?",
      teacherNote: "Predict first: does it find the property on the object, or does it climb the chain?",
      bugCode: `console.clear();

const animal = { eats: true };
const dog = Object.create(animal);
dog.name = "Rex";

console.log("dog.eats:", dog.eats);
console.log("dog.hasOwnProperty('eats'):", dog.hasOwnProperty("eats"));`,
      bugFocus: {
        fromLine: 7,
        toLine: 8
      },
      fixCode: `console.clear();

const animal = { eats: true };
const dog = Object.create(animal);
dog.name = "Rex";

// FIX: if you want it as own prop, define it on the instance
dog.eats = false;

console.log("dog.eats:", dog.eats);
console.log("dog.hasOwnProperty('eats'):", dog.hasOwnProperty("eats"));`,
      fixFocus: {
        fromLine: 8,
        toLine: 10
      },
      whatToNotice: [
        "Before assignment, `eats` is found on the prototype (animal).",
        "After assignment, `eats` becomes an own property that shadows the prototype property."
      ]
    },
    {
      id: "d5-step-2",
      title: "Don’t mutate built-in prototypes",
      subtitle: "Why it’s dangerous",
      teacherNote: "This isn’t about style—this breaks other code and can create security issues.",
      bugCode: `console.clear();

// BUG: modifying built-ins is a global side-effect
Array.prototype.last = function () {
  return this[this.length - 1];
};

console.log([1, 2, 3].last());`,
      bugFocus: {
        fromLine: 3,
        toLine: 6
      },
      fixCode: `console.clear();

// FIX: write a utility instead (no global mutation)
function last(arr) {
  return arr[arr.length - 1];
}

console.log(last([1, 2, 3]));`,
      fixFocus: {
        fromLine: 3,
        toLine: 7
      },
      whatToNotice: [
        "Prototype mutation changes behavior for every array in the whole app.",
        "Utility functions keep behavior local and predictable."
      ]
    }
  ],
  code: `// Day 5 Live Lab: Prototypes (Predict first!)
console.clear();

const animal = { eats: true };
const dog = Object.create(animal);
dog.barks = true;

console.log("dog.eats:", dog.eats); // from prototype
console.log("dog.hasOwnProperty('eats'):", dog.hasOwnProperty("eats"));

dog.eats = false; // shadow prototype property
console.log("dog.eats after shadow:", dog.eats);

class Animal {
  constructor(name) { this.name = name; }
  describe() { return "Animal:" + this.name; }
}
class Cat extends Animal {
  meow() { return true; }
}
const c = new Cat("Milo");
console.log(c.describe(), c.meow());`,
  comparison: {
    junior: `// ❌ Direct Mutation (Slow & Dangerous)
const cat = {};
cat.__proto__ = { meow: true };

// Or worse, modifying built-ins
Array.prototype.last = function() {
return this[this.length - 1];
};`,
    senior: `// ✅ Proper Inheritance
class Animal {
constructor(name) { this.name = name; }
}

class Cat extends Animal {
meow() { return true; }
}

// Optimized by engine. Safer.`
  },
  interview: {
    questions: [
      {
        q: "What is the Prototype Chain?",
        a: "It is the mechanism of inheritance. Objects delegate failed property lookups to their prototype."
      },
      {
        q: "Why is modifying `Object.prototype` bad?",
        a: "It breaks encapsulation, can collide with future library updates, and de-optimizes the V8 engine's property access speed."
      },
      {
        q: "What is `Object.create(null)`?",
        a: "It creates a 'dictionary' object with NO prototype (no `toString`, no `hasOwnProperty`). Useful for clean maps."
      }
    ]
  },
  recap: {
    takeaways: [
      "Property lookup is: own properties first, then prototype chain.",
      "`__proto__` is the instance link; `prototype` is on constructor functions.",
      "Classes are syntax sugar over prototypes (methods live on Constructor.prototype).",
      "Avoid mutating built-in prototypes; prefer utilities or local extensions."
    ],
    commonMistakes: [
      "Confusing `__proto__` and `prototype`.",
      "Assuming inheritance copies properties (it delegates lookup).",
      "Mutating Object.prototype/Array.prototype (risk + deopts + security).",
      "Using objects as dictionaries without considering inherited keys."
    ],
    nextActions: [
      "Run the lookup lab and verify hasOwnProperty before/after shadowing.",
      "Create an Object.create(null) map and notice missing toString/hasOwnProperty."
    ]
  }
};
