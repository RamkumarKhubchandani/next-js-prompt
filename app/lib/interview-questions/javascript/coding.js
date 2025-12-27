export const codingQuestions = [
  {
    id: 'js-27',
    category: 'Outputs',
    difficulty: 'Tricky',
    question: 'What is 0.1 + 0.2 === 0.3?',
    answer: `**False.** The result is \`0.30000000000000004\`.

### Why?
Computers store numbers in binary (base-2).
In base-10, \`1/3\` is \`0.3333...\` (infinite recursion).
In base-2, \`0.1\` is also an infinite recurring fraction (\`0.000110011...\`).
Because memory is finite (64-bit doubles), it cuts off, leading to a tiny precision error.

### How to fix?
Use \`Number.EPSILON\` for comparison.
\`Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON\``,
    codeExample: null
  },
  {
    id: 'js-32',
    category: 'Outputs',
    difficulty: 'Tricky',
    question: 'Explain \`typeof NaN\`.',
    answer: `**"number"**

### Why?
NaN stands for "Not-a-Number", but fundamentally it is a numeric data type. It represents the result of an invalid mathematical operation (like \`Math.sqrt(-1)\` or \`"hello" * 2\`).

It is part of the IEEE 754 floating-point standard.`,
    codeExample: `// DEMO: NaN quirks
console.log('typeof NaN:', typeof NaN); // "number"
console.log('NaN === NaN?', NaN === NaN); // false (unique!)
console.log('How to check:', isNaN(NaN)); // true
console.log('Better check:', Number.isNaN(NaN)); // true (strict)`
  },
  {
    id: 'js-48',
    category: 'Outputs',
    difficulty: 'Tricky',
    question: 'What happens if you click a disabled button?',
    answer: `1. **Mouse Events:** The browser **blocks** \`click\`, \`mousedown\`, \`mouseup\`. The event does *not* fire.
2. **Bubbling:** Since the event doesn't fire, it doesn't bubble up to parents either.
3. **Exceptions:** If the element is technically focusable or wrapped in a \`div\`, the \`div\` might catch the click depending on exact DOM structure, but the button itself is inert.`,
    codeExample: null
  },
  {
    id: 'js-61',
    category: 'Coding',
    difficulty: 'Expert',
    question: 'Implement `Promise.all` from scratch.',
    answer: `This tests your understanding of Async synchronization.

### Requirements:
1. **Input:** An array (or iterable) of Promises.
2. **Output:** A single Promise that resolves to an array of results.
3. **Fail-Fast:** If *any* input promise rejects, the main promise must reject *immediately* with that error.
4. **Ordering:** The output array \`[res1, res2]\` must match the input order, even if \`p2\` finishes before \`p1\`.`,
    codeExample: `function myAll(promises) {
  return new Promise((resolve, reject) => {
    let results = [];
    let completed = 0;
    
    // Edge case: Empty array resolves immediately
    if (promises.length === 0) return resolve([]);

    promises.forEach((p, index) => {
      // Promise.resolve wraps non-promises (e.g., numbers)
      Promise.resolve(p)
        .then(val => {
          results[index] = val; // Preserve Order!
          completed++;
          if (completed === promises.length) resolve(results);
        })
        .catch(err => {
          reject(err); // Fail immediately
        });
    });
  });
}

// DEMO
const p1 = Promise.resolve(10);
const p2 = new Promise(resolve => setTimeout(() => resolve(20), 100));
const p3 = Promise.resolve(30);

myAll([p1, p2, p3]).then(results => {
  console.log('All resolved:', results); // [10, 20, 30]
});

// Test with rejection
const p4 = Promise.reject('Error!');
myAll([p1, p4, p3]).catch(err => {
  console.log('Rejected:', err); // "Error!"
});`
  },
  {
    id: 'js-62',
    category: 'Coding',
    difficulty: 'Hard',
    question: 'Implement Debounce vs Throttle.',
    answer: `Two ways to limit function execution rate.

### Debounce (Delay)
**"Wait until the user STOPS doing it."**
- **Use Case:** Search bar autocomplete. Wait for typing to finish.
- **Logic:** Each call clears the previous timer and sets a new one.

### Throttle (Limit)
**"Only do it once every X seconds."**
- **Use Case:** Scroll events, Window resizing, Button spam protection.
- **Logic:** If a call is effectively "cooling down", ignore new calls.`,
    codeExample: `// --- Debounce ---
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer); // Cancel previous
    timer = setTimeout(() => fn.apply(this, args), delay);
  }
}

// --- Throttle (Basic) ---
function throttle(fn, limit) {
  let inThrottle = false;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args); // Fire!
      inThrottle = true;    // Block future calls
      setTimeout(() => inThrottle = false, limit); // Unblock after delay
    }
  }
}

// DEMO: Debounce
let debounceCount = 0;
const logDebounce = () => console.log('Debounced call:', ++debounceCount);
const debouncedLog = debounce(logDebounce, 500);

// Simulate 5 rapid calls
console.log('Calling debounced function 5 times...');
for (let i = 0; i < 5; i++) debouncedLog();
console.log('Only 1 call will execute after 500ms delay');

// DEMO: Throttle  
let throttleCount = 0;
const logThrottle = () => console.log('Throttled call:', ++throttleCount);
const throttledLog = throttle(logThrottle, 500);

console.log('\\nCalling throttled function 5 times...');
for (let i = 0; i < 5; i++) throttledLog();
console.log('Only first call executes immediately');`
  },
  {
    id: 'js-67',
    category: 'Coding',
    difficulty: 'Tricky',
    question: 'How to flatten an array without `.flat()`?',
    answer: `You can solve this Recursively or Iteratively.

### 1. Recursive (Cleanest)
Check if item is array. If yes, recurse. If no, push to result.
**Cons:** Stack Overflow if array is too deep ($>10,000$ nested levels).

### 2. Iterative (Stack-Safe)
Use your own stack data structure. This is safer for massive depth.`,
    codeExample: `// Recursive
function flatten(arr) {
  return arr.reduce((acc, val) => 
    Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), 
  []);
}

// Iterative (DFS with Stack)
function flattenIterative(arr) {
  const stack = [...arr];
  const res = [];
  while(stack.length) {
    const next = stack.pop();
    if (Array.isArray(next)) {
      stack.push(...next); // Push items back to stack
    } else {
      res.push(next);
    }
  }
  return res.reverse(); // Stack reverses order
}

// DEMO
const nested = [1, [2, [3, [4, 5]]], 6];
console.log('Nested:', JSON.stringify(nested));
console.log('Flattened (Recursive):', flatten(nested));
console.log('Flattened (Iterative):', flattenIterative(nested));`
  },
  {
    id: 'js-75',
    category: 'Coding',
    difficulty: 'Expert',
    question: 'Implement a `memoize` function with cache expiry.',
    answer: `Memoization caches function results based on arguments.

### Key Considerations:
1. **Cache Key:** Objects cannot be Map keys (by value). You must serialize arguments (\`JSON.stringify\`).
2. **Context:** You must use \`fn.apply(this)\` to preserve the \`this\` context of the original function.
3. **Expiry:** Store a \`timestamp\` alongside the value.`,
    codeExample: `function memoize(fn, ttl = 2000) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      const entry = cache.get(key);
      if (Date.now() - entry.time < ttl) {
        return entry.value; // Hit!
      }
    }
    
    // Miss! Calculate and store.
    const result = fn.apply(this, args);
    cache.set(key, { value: result, time: Date.now() });
    return result;
  }
}

// DEMO
const slowFn = (n) => { 
  console.log('Computing for', n, '...'); 
  return n * 2; 
};
const fast = memoize(slowFn, 2000);

console.log('First call:', fast(5));  // Logs: "Computing..." then 10
console.log('Second call (cached):', fast(5)); // Just logs: 10
console.log('Different arg:', fast(10)); // Logs: "Computing..." then 20`
  },
  {
    id: 'js-76',
    category: 'Coding',
    difficulty: 'Tricky',
    question: 'Implement `Function.prototype.bind` polyfill.',
    answer: `**The "Bind" Contract:**
1. Return a *new* function.
2. When called, it executes the original function.
3. \`this\` is permanently locked to the provided context.
4. Arguments are "curried" (partial application).

### Tricky Part
The bound function needs to support \`new\` operator behaviors if used as a constructor (rare but strictly required for a perfect polyfill). This simple version covers 99% of use cases.`,
    codeExample: `Function.prototype.myBind = function(context, ...args1) {
  const fn = this; // The function being bound
  
  return function(...args2) {
    // Merge initial args (args1) with call-time args (args2)
    return fn.apply(context, [...args1, ...args2]);
  };
};

// DEMO
const person = { name: 'Alice' };
function greet(greeting, punctuation) {
  console.log(greeting + ', ' + this.name + punctuation);
}

const boundGreet = greet.myBind(person, 'Hello');
boundGreet('!'); // "Hello, Alice!"
boundGreet('!!!'); // "Hello, Alice!!!"`
  },
  {
    id: 'js-77',
    category: 'Coding',
    difficulty: 'Tricky',
    question: 'Flatten an object with nested keys.',
    answer: `Convert \`{ a: { b: 1 } }\` to \`{ "a.b": 1 }\`.
Common in logging, analytics, and form handling libraries.

### Logic
1. Iterate keys.
2. If value is object? Recurse with new prefix (\`"a." + "b"\`).
3. If value is primitive? Assign to result.`,
    codeExample: `function flattenObj(obj, prefix = '') {
  let acc = {};
  for (let k in obj) {
    const pre = prefix.length ? prefix + '.' : '';
    if (typeof obj[k] === 'object' && obj[k] !== null) {
      Object.assign(acc, flattenObj(obj[k], pre + k));
    } else {
      acc[pre + k] = obj[k];
    }
  }
  return acc;
}

// DEMO
const nested = { a: 1, b: { c: 2, d: { e: 3, f: 4 } }, g: 5 };
console.log('Original:', JSON.stringify(nested));
console.log('Flattened:', flattenObj(nested));
// { "a": 1, "b.c": 2, "b.d.e": 3, "b.d.f": 4, "g": 5 }`
  },
  {
    id: 'js-86',
    category: 'Outputs',
    difficulty: 'Tricky',
    question: 'Output: [1, 2, 10].sort()',
    answer: `**[1, 10, 2]**

### Why?
By default, \`.sort()\` converts elements to **strings** and compares their UTF-16 code units sequences.
"10" comes before "2" lexicographically.

### Fix
Pass a comparator: \`.sort((a,b) => a - b)\`.`,
    codeExample: null
  },
  {
    id: 'js-87',
    category: 'Outputs',
    difficulty: 'Tricky',
    question: 'Output: let x = [1, 2, 3]; x[10] = 11; console.log(x.length);',
    answer: `**11**

### Why?
Arrays in JS are not fixed lists. They are objects with a \`length\` property.
When you set index 10, the engine ensures length covers it.
Indices 3-9 are **Empty Slots** (holes). they are not \`undefined\`, they are missing entirely.`,
    codeExample: `const arr = [1];
arr[2] = 3;
console.log('Array:', arr); // [1, empty, 3]
console.log('arr[1]:', arr[1]); // undefined
console.log('Length:', arr.length); // 3

// Setting high index
arr[10] = 11;
console.log('New length:', arr.length); // 11`
  },
  {
    id: 'js-88',
    category: 'Outputs',
    difficulty: 'Tricky',
    question: 'What is an "Immediately Invoked Function Expression" (IIFE)?',
    answer: `A function that runs as soon as it is defined.

\`(function() { ... })()\`

### Use Case
1. **Scopes:** Before ES6 (let/const), this was the ONLY way to create a private scope to avoid polluting global window.
2. **Modules:** The Module Pattern relies entirely on IIFEs.`,
    codeExample: `const secret = (() => {
  const code = "123";
  return {
    guess: (c) => c === code
  };
})();`
  },
  {
    id: 'js-96',
    category: 'Coding',
    difficulty: 'Hard',
    question: 'Implement an LRU Cache.',
    answer: `**LRU (Least Recently Used)** discards the oldest items when the cache is full.

### Data Structure: Map
A JavaScript \`Map\` is perfect because:
1. It holds key-value pairs.
2. It remembers **Insertion Order**. Keys added last are at the end.

### The Algorithm
- **Get:** If exists, delete it and re-add it (moves it to the "Most Recent" position at the end).
- **Set:** If full, delete the *first* item in the Map (which is the oldest).`,
    codeExample: `class LRUCache {
  constructor(limit = 3) {
    this.limit = limit;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    
    const val = this.cache.get(key);
    // Refresh: Delete & Re-add calls it "new"
    this.cache.delete(key);
    this.cache.set(key, val);
    return val;
  }

  put(key, val) {
    if (this.cache.has(key)) this.cache.delete(key);
    
    // Evict Oldest if full
    if (this.cache.size >= this.limit) {
      // Map.keys().next().value gets the first key
      this.cache.delete(this.cache.keys().next().value);
    }
    
    this.cache.set(key, val);
  }
}

// DEMO
const cache = new LRUCache(2);
cache.put(1, 'A');
cache.put(2, 'B');
console.log('Get 1:', cache.get(1)); // 'A' (now most recent)
cache.put(3, 'C'); // Evicts key 2 (least recent)
console.log('Get 2:', cache.get(2)); // -1 (evicted)
console.log('Get 3:', cache.get(3)); // 'C'
cache.put(4, 'D'); // Evicts key 1
console.log('Get 1:', cache.get(1)); // -1 (evicted)`
  },
  {
    id: 'js-97',
    category: 'Coding',
    difficulty: 'Medium',
    question: 'Check if a string is a Palindrome.',
    answer: `"racecar" === "racecar"

### 1. The One-Liner (Slow)
\`str === str.split('').reverse().join('')\`
- Creates 3 new arrays/strings. O(3N).

### 2. Two Pointers (Fast)
- Pointer A at start, Pointer B at end.
- Compare and move inwards.
- **O(N/2)** time. **O(1)** space.`,
    codeExample: `function isPalindrome(str) {
  let l = 0, r = str.length - 1;
  while (l < r) {
    if (str[l] !== str[r]) return false;
    l++; r--;
  }
  return true;
}

// DEMO
console.log('racecar:', isPalindrome('racecar')); // true
console.log('hello:', isPalindrome('hello')); // false
console.log('A:', isPalindrome('A')); // true (single char)
console.log('ab:', isPalindrome('ab')); // false`
  },
  {
    id: 'js-98',
    category: 'Coding',
    difficulty: 'Hard',
    question: 'Find the first non-repeating character.',
    answer: `**Strategy: Frequency Map**
1. Pass 1: Count occurrences of every char.
2. Pass 2: Find the first char with count === 1.

**Time Complexity:** O(N) (Linear)
**Space Complexity:** O(1) (Fixed, max 26 or 256 unique chars).`,
    codeExample: `function firstUnique(str) {
  const map = {};
  
  // 1. Build Histogram
  for (let char of str) {
    map[char] = (map[char] || 0) + 1;
  }
  
  // 2. Scan for singleton
  for (let char of str) {
    if (map[char] === 1) return char;
  }
  
  return null;
}`
  },
];
