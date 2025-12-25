export const day14 = {
  day: 14,
  title: "Day 14: Iterators & Generators (Lazy Sequences)",
  intro: "Iterators power for...of, spread, and many built-ins. Generators make iterators readable and enable lazy sequences that don’t allocate big arrays.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">0) The Big Idea</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
An iterator is an object with a <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">next()</code> method that returns
<code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">{ value, done }</code>.
If an object has <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">Symbol.iterator</code>, it can be used by for...of and spread.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Symbol.iterator</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">Any object that implements this symbol can be iterated.</p>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-gray-700 dark:text-light-200 overflow-x-auto">
<pre>
const range = {
from: 1,
to: 5,
[Symbol.iterator]() { ... }
};

for(let num of range) { ... }
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Generators (Readable Iterators)</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Generators (<code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">function*</code>) let you write iterators using <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">yield</code>.
Each yield produces the next value lazily.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Why This Matters</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6 bg-white dark:bg-dark-800 p-4 rounded-lg">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Lazy</span>: don’t allocate big arrays; generate values on demand.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Composable</span>: you can build pipelines (filter/map) over generators.</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Protocol</span>: works with for...of, spread, destructuring patterns.</li>
</ul>
            `,
  predictions: [
    {
      prompt: "What must an iterator return from next()?",
      options: [
        "{ val, end }",
        "{ value, done }",
        "an array of values",
        "a Promise"
      ],
      correctIndex: 1,
      explanation: "Iterator protocol requires next() to return an object with {value, done}."
    },
    {
      prompt: "Generators are useful because they…",
      options: [
        "make code multithreaded",
        "create lazy sequences with yield",
        "remove the need for functions",
        "replace promises"
      ],
      correctIndex: 1,
      explanation: "Generators let you yield values lazily, producing sequences on demand."
    }
  ],
  checkpoints: [
    {
      prompt: "for...of iterates over…",
      options: [
        "object keys only",
        "values produced by Symbol.iterator",
        "only arrays",
        "only strings"
      ],
      correctIndex: 1,
      explanation: "for...of uses the iterator protocol (Symbol.iterator) to get values."
    },
    {
      prompt: "Spread operator on an object works when…",
      options: [
        "object has Symbol.iterator",
        "object is frozen",
        "object has toString",
        "object is a Proxy"
      ],
      correctIndex: 0,
      explanation: "Spread for iteration (`[...obj]`) requires an iterator via Symbol.iterator."
    }
  ],
  labSteps: [
    {
      id: "d14-step-1",
      title: "Broken iterator (done never becomes true)",
      subtitle: "Infinite loop hazard",
      teacherNote: "Predict what happens. Then fix by setting done true at the end.",
      bugCode: `console.clear();

const badRange = {
  from: 1,
  to: 3,
  [Symbol.iterator]() {
    let cur = this.from;
    return {
      next() {
        return { value: cur++, done: false }; // BUG: never done
      }
    };
  }
};

// Don't actually spread this (would be infinite)
let count = 0;
for (const x of badRange) {
  console.log(x);
  count++;
  if (count >= 5) break; // safety
}`,
      bugFocus: {
        fromLine: 9,
        toLine: 10
      },
      fixCode: `console.clear();

const range = {
  from: 1,
  to: 3,
  [Symbol.iterator]() {
    let cur = this.from;
    const to = this.to;
    return {
      next() {
        if (cur <= to) return { value: cur++, done: false };
        return { value: undefined, done: true };
      }
    };
  }
};

console.log([...range]);`,
      fixFocus: {
        fromLine: 10,
        toLine: 14
      },
      whatToNotice: [
        "done must become true to end iteration.",
        "Iterators control flow; mistakes can create infinite loops."
      ]
    },
    {
      id: "d14-step-2",
      title: "Generator range (clean iterator)",
      subtitle: "yield makes it readable",
      teacherNote: "Same behavior, far less code. This is why generators exist.",
      bugCode: `console.clear();

function* range(from, to) {
  // TODO: implement
}

console.log([...range(1, 5)]);`,
      bugFocus: {
        fromLine: 3,
        toLine: 4
      },
      fixCode: `console.clear();

function* range(from, to) {
  for (let x = from; x <= to; x++) {
    yield x;
  }
}

console.log([...range(1, 5)]);`,
      fixFocus: {
        fromLine: 3,
        toLine: 7
      },
      whatToNotice: [
        "yield produces values lazily.",
        "Generators implement the iterator protocol automatically."
      ]
    }
  ],
  code: `// Example 1: Custom Iterator
const myCollection = {
items: [10, 20, 30],
*[Symbol.iterator]() {
for (let item of this.items) {
  yield item;
}
}
};

console.log([...myCollection]); // [10, 20, 30]`,
  comparison: {
    junior: `// ❌ Exposed Internal Array
class Deck {
constructor() { this.cards = [/*...*/]; }
}

const deck = new Deck();
// Client has to know 'cards' exists
for(let card of deck.cards) {}`,
    senior: `// ✅ Iterator Protocol
class Deck {
constructor() { this.cards = [/*...*/]; }

// Make the Deck itself iterable
*[Symbol.iterator]() {
 for(let c of this.cards) yield c;
}
}

// Cleaner API
for(let card of new Deck()) {}`
  },
  interview: {
    questions: [
      {
        q: "What is a Generator function?",
        a: "A function declared with `function*` that returns a Generator object. It can pause execution with `yield`."
      },
      {
        q: "Difference between `for...in` and `for...of`?",
        a: "`for...in` iterates keys (enumerable properties). `for...of` iterates values (using the iterator protocol)."
      },
      {
        q: "How does `async` await relate to generators?",
        a: "Async/await is syntactic sugar for a Generator that yields Promises, driven by a runner function."
      }
    ]
  },
  recap: {
    takeaways: [
      "Iterator protocol is next() returning {value, done}.",
      "Symbol.iterator makes an object usable by for...of and spread.",
      "Generators provide a readable way to create iterators using yield.",
      "Lazy sequences reduce memory usage and enable clean pipelines."
    ],
    commonMistakes: [
      "Never returning done: true (infinite iteration).",
      "Confusing for...in (keys) with for...of (values).",
      "Returning wrong shape from next() (missing value/done).",
      "Trying to iterate non-iterables with spread."
    ],
    nextActions: [
      "Implement a custom iterable range and spread it.",
      "Write a generator that yields filtered values from another iterable."
    ]
  }
};
