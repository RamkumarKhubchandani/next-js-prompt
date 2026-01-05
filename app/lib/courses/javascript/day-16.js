export const day16 = {
  day: 16,
  title: "Day 16: Sets & Maps (Choose the Right Data Structure)",
  intro: "Stop using objects for everything. Today you’ll learn when to use Set, Map, Object, and Array — with real bug patterns and performance intuition.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 16! Data Structures. Objects are great, but they are terrible maps because keys are always strings."
      },
      {
        type: "talk",
        message: "If you do `obj[1] = 'A'` and `obj['1'] = 'B'`, you just overwrote 'A'. Let's see this in action."
      },
      {
        type: "challenge",
        instruction: "Fix the collision. This cache overwrites numeric keys with string keys. Convert the `cache` to a `Map` so that `1` (number) and `'1'` (string) are treated as different keys.",
        buggyCode: `const cache = {};

function addToCache(key, value) {
  cache[key] = value;
}

addToCache(1, "Number");
addToCache("1", "String");

console.log(cache[1]); // ❌ Output: "String" (Collision!)`,
        solutionCode: `const cache = new Map();

function addToCache(key, value) {
  cache.set(key, value);
}

addToCache(1, "Number");
addToCache("1", "String");

console.log(cache.get(1)); // ✅ Output: "Number"`,
        verifyOutput: "Number",
        verifyCode: "new Map",
        successMessage: "Perfect. Map keeps keys as-is. Object always stringifies them. Use Map when keys aren't known static strings.",
        hint: "Use `new Map()`, `cache.set(key, value)`, and `cache.get(key)`."
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1. Map vs Object</h3>
<div class="overflow-hidden rounded-xl border border-gray-200 dark:border-dark-600 mb-6">
<table class="w-full text-sm text-left">
    <thead class="bg-white dark:bg-dark-800 text-gray-600 dark:text-light-300">
        <tr>
            <th class="p-3">Feature</th>
            <th class="p-3">Object</th>
            <th class="p-3">Map</th>
        </tr>
    </thead>
    <tbody class="divide-y divide-dark-700 bg-gray-100 dark:bg-dark-900">
        <tr>
            <td class="p-3">Key Types</td>
            <td class="p-3">Strings/Symbols</td>
            <td class="p-3">Any (Objects, Funcs)</td>
        </tr>
        <tr>
            <td class="p-3">Order</td>
            <td class="p-3">Unreliable</td>
            <td class="p-3">Insertion Order</td>
        </tr>
         <tr>
            <td class="p-3">Size</td>
            <td class="p-3">Manual Count</td>
            <td class="p-3">.size</td>
        </tr>
    </tbody>
</table>
</div>
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Set vs Array</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Use a Set when you need uniqueness or fast membership checks. Array includes is linear; Set has is constant-time on average.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) WeakMap / WeakSet (When You Don’t Want to Prevent GC)</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
WeakMap is for metadata keyed by objects without preventing garbage collection. Perfect for caches tied to object lifetimes.
</p>
            `,
  predictions: [
    {
      prompt: "In an Object used as a map, what happens to numeric keys like 1 and string keys like '1'?",
      options: [
        "They stay separate keys",
        "They collide because keys are coerced to strings",
        "Objects convert them to Symbols",
        "It throws an error"
      ],
      correctIndex: 1,
      explanation: "Object keys are strings/symbols; 1 becomes '1', which can collide with an existing string key."
    },
    {
      prompt: "Fast membership check for many lookups is best with…",
      options: [
        "Array.includes",
        "Set.has",
        "Object.toString",
        "JSON.stringify"
      ],
      correctIndex: 1,
      explanation: "Set.has is O(1) average and is designed for membership checks."
    }
  ],
  checkpoints: [
    {
      prompt: "When should you prefer Map over Object?",
      options: [
        "When keys must be objects or you need insertion-order iteration reliably",
        "When you only have 2 keys",
        "When you need JSON serialization automatically",
        "Never"
      ],
      correctIndex: 0,
      explanation: "Map supports any key type and has predictable iteration order with useful APIs like size."
    },
    {
      prompt: "WeakMap differs from Map because…",
      options: [
        "it is faster always",
        "its keys are weakly held and it is not iterable",
        "it supports string keys only",
        "it replaces arrays"
      ],
      correctIndex: 1,
      explanation: "WeakMap does not prevent GC of keys and intentionally has no iteration/size."
    }
  ],
  labSteps: [
    {
      id: "d16-step-1",
      title: "Object key collision bug",
      subtitle: "1 and '1' collide",
      teacherNote: "Predict what cache[1] becomes after setting cache['1']. Then fix using Map.",
      bugCode: `console.clear();

const cache = {};
cache[1] = "A";
cache["1"] = "B";
console.log("cache[1]:", cache[1]);
console.log("keys:", Object.keys(cache));`,
      bugFocus: {
        fromLine: 3,
        toLine: 6
      },
      fixCode: `console.clear();

const cache = new Map();
cache.set(1, "A");
cache.set("1", "B");
console.log("get 1:", cache.get(1));
console.log("get '1':", cache.get("1"));
console.log("size:", cache.size);`,
      fixFocus: {
        fromLine: 3,
        toLine: 8
      },
      whatToNotice: [
        "Map preserves key types; Object coerces keys to strings.",
        "Map gives correct size and predictable iteration."
      ]
    },
    {
      id: "d16-step-2",
      title: "Deduplicate with Set",
      subtitle: "Unique values cleanly",
      teacherNote: "This is a classic high-signal use of Set.",
      bugCode: `console.clear();

const arr = [1, 2, 2, 3, 3, 3];
// BUG: dedupe by hand is noisy
const unique = arr.filter((x, i) => arr.indexOf(x) === i);
console.log(unique);`,
      bugFocus: {
        fromLine: 4,
        toLine: 5
      },
      fixCode: `console.clear();

const arr = [1, 2, 2, 3, 3, 3];
const unique = [...new Set(arr)];
console.log(unique);`,
      fixFocus: {
        fromLine: 3,
        toLine: 4
      },
      whatToNotice: [
        "Set naturally enforces uniqueness.",
        "The code becomes more readable and typically more efficient."
      ]
    }
  ],
  code: `// Example 1: Set (Unique Values)
const arr = [1, 2, 2, 3, 3, 3];
const unique = [...new Set(arr)]; // [1, 2, 3]

// Example 2: Map (Object Keys)
const userMap = new Map();
const user1 = { id: 1 };
userMap.set(user1, "Metadata"); // Key is object reference`,
  comparison: {
    junior: `// ❌ Object as Map
const cache = {};
// Keys are converted to strings!
cache[1] = "A"; 
cache["1"] = "B"; 
// cache[1] is now "B" (Collision)`,
    senior: `// ✅ Real Map
const cache = new Map();
cache.set(1, "A");
cache.set("1", "B");
// cache.get(1) is "A" (Preserves Type)`
  },
  interview: {
    questions: [
      {
        q: "When to use Set?",
        a: "When you need a list of unique values or need fast lookup `has()` (O(1)) compared to Array `includes()` (O(n))."
      },
      {
        q: "Are Map keys garbage collected?",
        a: "Standard Maps hold strong references. Use `WeakMap` if you want keys to be garbage collected when no longer used elsewhere."
      },
      {
        q: "How to iterate a Map?",
        a: "`for (let [key, val] of map) { ... }`"
      }
    ]
  },
  recap: {
    takeaways: [
      "Use Set for uniqueness and fast membership checks.",
      "Use Map when keys aren’t just strings/symbols or you need reliable iteration order/size.",
      "Objects coerce keys to strings — this causes collisions and subtle bugs.",
      "WeakMap is for object-key metadata without preventing GC."
    ],
    commonMistakes: [
      "Using plain objects as maps with mixed key types (collisions).",
      "Using arrays for membership checks at scale (O(n) includes).",
      "Expecting WeakMap to be iterable or to have size.",
      "Storing unbounded data in Maps without eviction strategy."
    ],
    nextActions: [
      "Replace one object-cache in your code with Map and verify key collisions disappear.",
      "Use Set for dedupe/unique logic instead of manual filtering."
    ]
  }
};
