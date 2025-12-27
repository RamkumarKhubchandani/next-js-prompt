export const day25 = {
  day: 25,
  title: "🔥 Deep Clone, Deep Equal & Flatten",
  intro: "Core utility functions every senior dev must master. Handle circular refs, symbols, and edge cases.",
  content: `
<div class="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 p-4 rounded-xl mb-6">
<h4 class="text-amber-400 font-bold mb-2">🎯 Why These Matter</h4>
<p class="text-gray-600 dark:text-light-300">JSON.parse(JSON.stringify()) fails for: functions, undefined, symbols, dates, circular refs, maps, sets. Real apps need proper solutions.</p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📋 Three Must-Know Utilities</h3>
<ol class="list-decimal list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">deepClone</code> - Copy object with all nested values</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">deepEqual</code> - Compare objects deeply</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">flatten</code> - Flatten nested object/array</li>
</ol>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚠️ Edge Cases to Handle</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
<div class="bg-white dark:bg-dark-800 p-4 rounded-lg border border-gray-200 dark:border-dark-600">
    <h4 class="font-bold text-red-600 dark:text-red-400 mb-2">Deep Clone Edge Cases</h4>
    <ul class="list-disc list-inside text-sm space-y-1 text-gray-600 dark:text-light-300">
        <li>Circular references</li>
        <li>Date, RegExp, Map, Set</li>
        <li>Functions (can't clone)</li>
        <li>Symbols as keys</li>
        <li>Prototype chain</li>
    </ul>
</div>
<div class="bg-white dark:bg-dark-800 p-4 rounded-lg border border-gray-200 dark:border-dark-600">
    <h4 class="font-bold text-red-600 dark:text-red-400 mb-2">Deep Equal Edge Cases</h4>
    <ul class="list-disc list-inside text-sm space-y-1 text-gray-600 dark:text-light-300">
        <li>NaN === NaN should be true</li>
        <li>+0 vs -0 difference</li>
        <li>Object vs Array distinction</li>
        <li>Null vs undefined</li>
        <li>Property order matters?</li>
    </ul>
</div>
</div>
            `,
  masteryChecklist: [
    {
      id: "d25-c1",
      text: "I can explain why JSON.parse(JSON.stringify(x)) is not a real deep clone."
    },
    {
      id: "d25-c2",
      text: "I can deep-clone objects with circular references using WeakMap."
    },
    {
      id: "d25-c3",
      text: "I can write a deepEqual that handles NaN and distinguishes +0 vs -0 (Object.is)."
    },
    {
      id: "d25-c4",
      text: "I can flatten and unflatten objects without losing keys and understand dot-notation tradeoffs."
    },
    {
      id: "d25-c5",
      text: "I can explain what cannot/should not be cloned (functions, DOM nodes, class instances) without a policy."
    }
  ],
  predictions: [
    {
      prompt: "What happens if you run JSON.stringify on a circular object?",
      options: [
        "It returns null",
        "It silently drops the circular reference",
        "It throws 'Converting circular structure to JSON'",
        "It converts it into [Circular]"
      ],
      correctIndex: 2,
      explanation: "JSON.stringify cannot represent cycles. It throws to prevent infinite recursion."
    },
    {
      prompt: "Which comparison treats NaN as equal to NaN?",
      options: [
        "NaN === NaN",
        "Object.is(NaN, NaN)",
        "NaN == NaN",
        "Number(NaN) === Number(NaN)"
      ],
      correctIndex: 1,
      explanation: "Object.is handles NaN correctly. In JS, NaN is not equal to itself with == or ===."
    },
    {
      prompt: "Which statement about +0 and -0 is true?",
      options: [
        "+0 === -0 is false",
        "+0 === -0 is true but Object.is(+0, -0) is false",
        "+0 === -0 is false but Object.is(+0, -0) is true",
        "They are always different in all comparisons"
      ],
      correctIndex: 1,
      explanation: "+0 and -0 compare equal with ===, but Object.is distinguishes them."
    }
  ],
  checkpoints: [
    {
      prompt: "Why use WeakMap for deepClone cycle tracking?",
      options: [
        "WeakMap is faster than Map in all cases",
        "WeakMap keys must be strings",
        "WeakMap does not prevent garbage collection of keys",
        "WeakMap automatically serializes objects"
      ],
      correctIndex: 2,
      explanation: "WeakMap avoids memory leaks because it doesn’t keep objects alive just because you used them as keys."
    },
    {
      prompt: "A good deepEqual should…",
      options: [
        "Compare only JSON strings",
        "Treat arrays and objects the same",
        "Handle special cases like Date/RegExp/Map/Set (or define a policy)",
        "Ignore symbol keys"
      ],
      correctIndex: 2,
      explanation: "Real-world structures include more than plain objects. Either handle them or clearly define what you support."
    },
    {
      prompt: "When flattening objects into 'a.b.c' keys, the biggest risk is…",
      options: [
        "It becomes too fast",
        "Key collisions and ambiguity when keys themselves contain dots",
        "It stops working in Node.js",
        "It breaks numbers"
      ],
      correctIndex: 1,
      explanation: "Dot-notation is a convention; if original keys contain dots, you need an escaping scheme or a different encoding."
    }
  ],
  labSteps: [
    {
      id: "d25-step-1",
      title: "Bug: 'deep clone' via JSON breaks Date + cycles",
      subtitle: "Fix with WeakMap + type handling",
      teacherNote: "Predict: does it clone the Date? And what happens with the circular ref?",
      bugCode: `console.clear();

const original = { createdAt: new Date("2025-01-01"), nested: { x: 1 } };
original.self = original; // circular

// BUG: JSON deep clone
const clone = JSON.parse(JSON.stringify(original));
console.log("clone:", clone);
console.log("clone.createdAt instanceof Date:", clone.createdAt instanceof Date);`,
      bugFocus: {
        fromLine: 6,
        toLine: 6
      },
      fixCode: `console.clear();

function deepClone(value, seen = new WeakMap()) {
  if (value === null || typeof value !== "object") return value;
  if (seen.has(value)) return seen.get(value);

  if (value instanceof Date) return new Date(value.getTime());
  if (value instanceof RegExp) return new RegExp(value.source, value.flags);
  if (value instanceof Map) {
    const m = new Map();
    seen.set(value, m);
    value.forEach((v, k) => m.set(deepClone(k, seen), deepClone(v, seen)));
    return m;
  }
  if (value instanceof Set) {
    const s = new Set();
    seen.set(value, s);
    value.forEach((v) => s.add(deepClone(v, seen)));
    return s;
  }
  if (Array.isArray(value)) {
    const arr = [];
    seen.set(value, arr);
    for (let i = 0; i < value.length; i++) arr[i] = deepClone(value[i], seen);
    return arr;
  }

  const out = Object.create(Object.getPrototypeOf(value));
  seen.set(value, out);
  Reflect.ownKeys(value).forEach((k) => { out[k] = deepClone(value[k], seen); });
  return out;
}

const original = { createdAt: new Date("2025-01-01"), nested: { x: 1 } };
original.self = original;
const clone = deepClone(original);
console.log("clone.createdAt instanceof Date:", clone.createdAt instanceof Date);
console.log("cycle preserved:", clone.self === clone);`,
      fixFocus: {
        fromLine: 3,
        toLine: 28
      },
      whatToNotice: [
        "WeakMap breaks cycles safely.",
        "Type-specific cloning preserves Date/RegExp/Map/Set semantics."
      ]
    },
    {
      id: "d25-step-2",
      title: "Bug: deepEqual via JSON misses NaN and special cases",
      subtitle: "Fix with recursion + Object.is",
      teacherNote: "Predict: should these be equal?",
      bugCode: `console.clear();

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

console.log("NaN equal?", deepEqual({ x: NaN }, { x: NaN }));
console.log("Dates equal?", deepEqual({ d: new Date(0) }, { d: new Date(0) }));`,
      bugFocus: {
        fromLine: 3,
        toLine: 4
      },
      fixCode: `console.clear();

function deepEqual(a, b, seen = new WeakMap()) {
  if (Object.is(a, b)) return true; // handles NaN and +/-0
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) return false;
  if (seen.has(a)) return seen.get(a) === b;
  seen.set(a, b);

  if (a.constructor !== b.constructor) return false;
  if (a instanceof Date) return a.getTime() === b.getTime();
  if (a instanceof RegExp) return a.source === b.source && a.flags === b.flags;

  if (a instanceof Map) {
    if (a.size !== b.size) return false;
    for (const [k, v] of a) {
      if (!b.has(k) || !deepEqual(v, b.get(k), seen)) return false;
    }
    return true;
  }

  if (a instanceof Set) {
    if (a.size !== b.size) return false;
    for (const v of a) if (!b.has(v)) return false;
    return true;
  }

  const keysA = Reflect.ownKeys(a);
  const keysB = Reflect.ownKeys(b);
  if (keysA.length !== keysB.length) return false;
  for (const k of keysA) {
    if (!keysB.includes(k)) return false;
    if (!deepEqual(a[k], b[k], seen)) return false;
  }
  return true;
}

console.log("NaN equal?", deepEqual({ x: NaN }, { x: NaN }));
console.log("Dates equal?", deepEqual({ d: new Date(0) }, { d: new Date(0) }));`,
      fixFocus: {
        fromLine: 3,
        toLine: 35
      },
      whatToNotice: [
        "Object.is is the right primitive equality for deepEqual.",
        "You either support special objects or define strict limits."
      ]
    }
  ],
  code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  🔧 DEEP CLONE, DEEP EQUAL & FLATTEN                                 ║
║  Production-grade utility functions                                  ║
╠══════════════════════════════════════════════════════════════════════╣
║  Handle: circular refs, Date, RegExp, Map, Set, Symbols              ║
╚══════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════
// 1️⃣ DEEP CLONE - Handle all edge cases
// ═══════════════════════════════════════════════════════════════════
function deepClone(obj, hash = new WeakMap()) {
  // Handle primitives and null
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  // Handle circular references
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  
  // Handle Date
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  
  // Handle RegExp
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags);
  }
  
  // Handle Map
  if (obj instanceof Map) {
    const clonedMap = new Map();
    hash.set(obj, clonedMap);
    obj.forEach((value, key) => {
      clonedMap.set(deepClone(key, hash), deepClone(value, hash));
    });
    return clonedMap;
  }
  
  // Handle Set
  if (obj instanceof Set) {
    const clonedSet = new Set();
    hash.set(obj, clonedSet);
    obj.forEach(value => {
      clonedSet.add(deepClone(value, hash));
    });
    return clonedSet;
  }
  
  // Handle Array
  if (Array.isArray(obj)) {
    const clonedArr = [];
    hash.set(obj, clonedArr);
    obj.forEach((item, index) => {
      clonedArr[index] = deepClone(item, hash);
    });
    return clonedArr;
  }
  
  // Handle Object
  const clonedObj = Object.create(Object.getPrototypeOf(obj));
  hash.set(obj, clonedObj);
  
  // Clone all properties including symbols
  Reflect.ownKeys(obj).forEach(key => {
    clonedObj[key] = deepClone(obj[key], hash);
  });
  
  return clonedObj;
}

// ═══════════════════════════════════════════════════════════════════
// 2️⃣ DEEP EQUAL - Compare objects deeply
// ═══════════════════════════════════════════════════════════════════
function deepEqual(a, b, seen = new WeakMap()) {
  // Identical references
  if (a === b) return true;
  
  // Handle NaN (NaN !== NaN, but we want true)
  if (Number.isNaN(a) && Number.isNaN(b)) return true;
  
  // If not both objects, they're not equal
  if (typeof a !== 'object' || typeof b !== 'object') return false;
  if (a === null || b === null) return false;
  
  // Handle circular references
  if (seen.has(a)) return seen.get(a) === b;
  seen.set(a, b);
  
  // Different constructors = not equal
  if (a.constructor !== b.constructor) return false;
  
  // Handle Date
  if (a instanceof Date) {
    return a.getTime() === b.getTime();
  }
  
  // Handle RegExp
  if (a instanceof RegExp) {
    return a.source === b.source && a.flags === b.flags;
  }
  
  // Handle Map
  if (a instanceof Map) {
    if (a.size !== b.size) return false;
    for (const [key, val] of a) {
      if (!b.has(key) || !deepEqual(val, b.get(key), seen)) return false;
    }
    return true;
  }
  
  // Handle Set
  if (a instanceof Set) {
    if (a.size !== b.size) return false;
    for (const val of a) {
      if (!b.has(val)) return false;
    }
    return true;
  }
  
  // Handle Arrays and Objects
  const keysA = Reflect.ownKeys(a);
  const keysB = Reflect.ownKeys(b);
  
  if (keysA.length !== keysB.length) return false;
  
  return keysA.every(key => 
    keysB.includes(key) && deepEqual(a[key], b[key], seen)
  );
}

// ═══════════════════════════════════════════════════════════════════
// 3️⃣ FLATTEN OBJECT - Nested to dot notation
// ═══════════════════════════════════════════════════════════════════
function flattenObject(obj, prefix = '', result = {}) {
  for (const key of Object.keys(obj)) {
    const newKey = prefix ? \`\${prefix}.\${key}\` : key;
    
    if (
      typeof obj[key] === 'object' && 
      obj[key] !== null && 
      !Array.isArray(obj[key])
    ) {
      flattenObject(obj[key], newKey, result);
    } else {
      result[newKey] = obj[key];
    }
  }
  return result;
}

// Unflatten back to nested
function unflattenObject(obj) {
  const result = {};
  
  for (const key of Object.keys(obj)) {
    const keys = key.split('.');
    let current = result;
    
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      if (i === keys.length - 1) {
        current[k] = obj[key];
      } else {
        current[k] = current[k] || {};
        current = current[k];
      }
    }
  }
  
  return result;
}

// ═══════════════════════════════════════════════════════════════════
// 4️⃣ FLATTEN ARRAY - Any depth
// ═══════════════════════════════════════════════════════════════════
function flattenArray(arr, depth = Infinity) {
  if (depth < 1) return arr.slice();
  
  return arr.reduce((acc, val) => {
    if (Array.isArray(val)) {
      acc.push(...flattenArray(val, depth - 1));
    } else {
      acc.push(val);
    }
    return acc;
  }, []);
}

// ═══════════════════════════════════════════════════════════════════
// ✅ CONSOLE TESTS (iframe-friendly: no React/JSX)
// ═══════════════════════════════════════════════════════════════════
console.clear();

// Deep clone test (circular + Date + Map)
const original = {
  name: "John",
  date: new Date("2025-01-01"),
  nested: { deep: { value: 42 } },
  arr: [1, [2, 3]],
  map: new Map([["key", "value"]])
};
original.circular = original;

const cloned = deepClone(original);
console.log("deepClone: date ok?", cloned.date instanceof Date);
console.log("deepClone: map ok?", cloned.map instanceof Map);
console.log("deepClone: circular ok?", cloned.circular === cloned);

// Deep equal tests
const a = { x: 1, y: { z: [1, 2, 3] } };
const b = { x: 1, y: { z: [1, 2, 3] } };
const c = { x: 1, y: { z: [1, 2, 4] } };
console.log("deepEqual(a,b) should be true:", deepEqual(a, b));
console.log("deepEqual(a,c) should be false:", deepEqual(a, c));
console.log("deepEqual(NaN,NaN) should be true:", deepEqual(NaN, NaN));

// Flatten/unflatten tests
const nested = { a: { b: { c: 1 } }, d: 2 };
const flat = flattenObject(nested);
console.log("flattenObject:", flat);
console.log("unflattenObject:", unflattenObject(flat));

// Flatten array tests
const deepArr = [1, [2, [3, [4, [5]]]]];
console.log("flattenArray Infinity:", flattenArray(deepArr));
console.log("flattenArray depth 2:", flattenArray(deepArr, 2));`,
  recap: {
    takeaways: [
      "JSON cloning is not a deep clone: it breaks Dates, Maps/Sets, undefined, symbols, and cycles.",
      "WeakMap is the standard tool to preserve cycles safely without memory leaks.",
      "Object.is is the best primitive comparator inside deepEqual (handles NaN and +/-0).",
      "Flattening is an encoding choice: define how you handle dots/arrays/collisions."
    ],
    commonMistakes: [
      "Using JSON for cloning production data structures.",
      "Forgetting symbol keys (use Reflect.ownKeys).",
      "Not defining a cloning policy for functions/class instances/DOM nodes."
    ],
    nextActions: [
      "Add an option to deepClone to 'keep prototypes' vs 'plain object only'.",
      "Add a flatten escape scheme for keys that contain dots."
    ]
  },
  comparison: {
    junior: `// ❌ Using JSON for deep clone
const clone = JSON.parse(JSON.stringify(obj));
// Fails for: Date, RegExp, Map, Set, 
// undefined, functions, circular refs, symbols`,
    senior: `// ✅ Proper deep clone with WeakMap
function deepClone(obj, seen = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (seen.has(obj)) return seen.get(obj); // Circular!
  
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Map) {
    const clone = new Map();
    seen.set(obj, clone);
    obj.forEach((v, k) => clone.set(k, deepClone(v, seen)));
    return clone;
  }
  // ... handle all types
}`
  },
  interview: {
    questions: [
      {
        q: "Why use WeakMap for circular reference tracking?",
        a: "WeakMap allows garbage collection of objects when no longer referenced elsewhere. Regular Map would prevent GC and cause memory leaks in long-running operations."
      },
      {
        q: "Why does JSON.stringify fail for circular refs?",
        a: "JSON.stringify traverses the object tree recursively. With circular refs, it enters infinite recursion and throws 'Converting circular structure to JSON'."
      },
      {
        q: "How do you handle NaN in deepEqual?",
        a: "NaN !== NaN in JavaScript. Use Number.isNaN() to detect NaN values and return true when comparing two NaNs for deep equality."
      },
      {
        q: "What's Reflect.ownKeys() vs Object.keys()?",
        a: "Object.keys() returns only enumerable string keys. Reflect.ownKeys() returns ALL own keys including symbols and non-enumerable properties."
      }
    ]
  }
};
