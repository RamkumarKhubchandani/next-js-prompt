export const eliteQuestions = [
  {
    id: 'js-101',
    category: 'Internals',
    difficulty: 'Elite',
    question: 'Explain V8 Array Elements: Holey vs Packed.',
    answer: `This distinguishes a Junior from a Principal Engineer who cares about performance.

### The Concept
V8 stores arrays differently based on their contents to optimize memory.
1.  **Packed (Fast):** \`[1, 2, 3]\` - Contiguous memory. No holes.
2.  **Holey (Slow):** \`[1, , 3]\` - Has "holes" (a missing index 1). Arrays are effectively Hash Maps here.
3.  **Smi (Small Integer):** \`[1, 2, 3]\` - Pure integers, highly optimized.
4.  **Double:** \`[1.1, 2.2]\` - Floating points. Requires unboxing.

### Performance Killer
Once an array becomes "Holey", it **can never become Packed again**.
- Accessing \`arr[i]\` in a Holey array can be **4x-10x slower** because V8 must traverse the Prototype chain to ensure the index doesn't exist on prototypes.

### Best Practice
- **Don't:** \`const arr = new Array(3)\` (Creates 3 holes).
- **Do:** \`const arr = [undefined, undefined, undefined]\` (Packed).`,
    codeExample: `// 1. Packed Smi (Fastest)
const arr = [1, 2, 3];

// 2. Packed Double (Fast)
arr.push(4.5); 

// 3. Packed Elements (Fast - Generic)
arr.push('x');

// 4. Holey Elements (SLOW - De-optimized forever)
arr[100] = 5; 
// Indices 6-99 are now holes. Access becomes slower.`
  },
  {
    id: 'js-102',
    category: 'Concurrency',
    difficulty: 'Elite',
    question: 'How to implement true parallelism in JS? (SharedArrayBuffer + Atomics)',
    answer: `JS is single-threaded, but **Workers** allow multithreading.
However, passing data between workers (\`postMessage\`) is slow because it clones the data (Structured Clone).

### The Solution: Shared Memory
1.  **SharedArrayBuffer (SAB):** A chunk of raw binary memory shared exactly between the Main Thread and Worker threads. No copying.
2.  **Atomics:** Since two threads can write to the same memory address simultaneously (Race Condition), \`Atomics\` provides thread-safe operations (\`load\`, \`store\`, \`add\`, \`wait\`).

### Use Case
High-performance games, image processing, or physics engines running in the browser.`,
    codeExample: `// Main Thread
const sab = new SharedArrayBuffer(1024);
const int32 = new Int32Array(sab);
const worker = new Worker('worker.js');
worker.postMessage(sab);

// Worker Thread
self.onmessage = (e) => {
    const int32 = new Int32Array(e.data);
    // Thread-safe increment
    Atomics.add(int32, 0, 1);
    // Notify waiting thread
    Atomics.notify(int32, 0, 1);
};`
  },
  {
    id: 'js-103',
    category: 'Design Pattern',
    difficulty: 'Elite',
    question: 'Implement a "Circuit Breaker" pattern.',
    answer: `A resiliency pattern for microservices/APIs.

### The Problem
If Service A calls Service B and B is down, A keeps waiting for timeouts, consuming resources. Eventually, A crashes too (Cascading Failure).

### The Solution: Circuit Breaker
1.  **Closed (Normal):** Requests pass through.
2.  **Open (Tripped):** If failures exceed threshold (e.g., 5 errors in 10s), "Trip" the breaker. **Fail immediately** without calling B.
3.  **Half-Open (Recovery):** After a timeout, let **one** request through. If it succeeds, Close; otherwise, Open again.`,
    codeExample: `const circuitBreaker = (fn, threshold = 3, timeout = 3000) => {
  let failures = 0;
  let lastFail = 0;
  let isOpen = false;

  return async function(...args) {
    if (isOpen) {
      if (Date.now() - lastFail > timeout) {
        isOpen = false; // Half-Open: Try once
      } else {
        throw new Error("Circuit Open");
      }
    }

    try {
      const res = await fn(...args);
      failures = 0; // Success resets count
      return res;
    } catch (e) {
      failures++;
      lastFail = Date.now();
      if (failures >= threshold) isOpen = true; // Trip!
      throw e;
    }
  }
}

// DEMO: Simulate an unreliable API
let callCount = 0;
const unreliableAPI = async () => {
  callCount++;
  if (callCount <= 3) {
    throw new Error("Service Down");
  }
  return "Success!";
};

const protectedAPI = circuitBreaker(unreliableAPI, 3, 2000);

// Test it
(async () => {
  for (let i = 1; i <= 5; i++) {
    try {
      const result = await protectedAPI();
      console.log(\`Call \${i}: \${result}\`);
    } catch (e) {
      console.log(\`Call \${i}: ❌ \${e.message}\`);
    }
  }
})();`
  },
  {
    id: 'js-104',
    category: 'System Design',
    difficulty: 'Elite',
    question: 'Design a reactive "Signal" system (like SolidJS/Preact) using Proxy.',
    answer: `Signals are the modern alternative to React's Virtual DOM diffing.
Instead of checking "What changed?", components "subscribe" to exact values.

### Core Components
1.  **Signal:** A value wrapper.
2.  **Effect:** A function that tracks which signals it accesses.
3.  **Dependency Graph:** Who depends on what.

### Implementation Guide
- Global \`context\` variable tracks the *current running effect*.
- **Get:** If \`context\` exists, add it to subscribers.
- **Set:** Notify all subscribers to re-run.`,
    codeExample: `let context = null;

function createSignal(value) {
    const subscribers = new Set();
    
    const read = () => {
        if (context) subscribers.add(context);
        return value;
    };
    
    const write = (newValue) => {
        value = newValue;
        subscribers.forEach(fn => fn());
    };
    
    return [read, write];
}

function createEffect(fn) {
    context = fn;
    fn(); // Run once to detect dependencies
    context = null;
}

// DEMO: Reactive counter
const [count, setCount] = createSignal(0);
const [name, setName] = createSignal("Alice");

createEffect(() => {
    console.log(\`Count is: \${count()}\`);
});

createEffect(() => {
    console.log(\`Hello, \${name()}!\`);
});

// Trigger updates
setCount(5);  // Logs: "Count is: 5"
setName("Bob"); // Logs: "Hello, Bob!"
setCount(10); // Logs: "Count is: 10"`
  },
  {
    id: 'js-105',
    category: 'Performance',
    difficulty: 'Elite',
    question: 'Scheduler.postTask vs requestIdleCallback.',
    answer: `Browsers have evolved from "one main thread" to "prioritized scheduling".

### requestIdleCallback (Legacy)
- **Goal:** "Run this when the browser is doing NOTHING."
- **Problem:** "Idle" is unpredictable. It might never run if the user is scrolling continuously.
- **Use:** Analytics, non-critical cleanup.

### Scheduler.postTask (Modern)
- **Goal:** Precise control over priority.
- **Priorities:**
  1.  \`user-blocking\`: e.g., Dropdown click (High).
  2.  \`user-visible\`: e.g., Rendering a list (Medium).
  3.  \`background\`: e.g., Log upload (Low).
- **Aborting:** Can cancel tasks in the queue!`,
    codeExample: `// Modern Task Scheduling
if ('scheduler' in window) {
  scheduler.postTask(() => {
    console.log("High Priority: User clicked");
  }, { priority: 'user-blocking' });

  scheduler.postTask(() => {
    console.log("Low: Sync data");
  }, { priority: 'background' });
}`
  },
  {
    id: 'js-106',
    category: 'Security',
    difficulty: 'Elite',
    question: 'Explain Prototype Pollution and how to fix it.',
    answer: `A vulnerability where an attacker injects properties into \`Object.prototype\`.

### The Attack
Because almost all objects in JS inherit from \`Object.prototype\`, modifying it affects **every object in the app**.
- **Vector:** Merging JSON payloads (e.g., config objects) recursively.
- **Payload:** \`{ "__proto__": { "isAdmin": true } }\`.

### The Fix
1.  **Map:** Use \`new Map()\` instead of objects for key-value storage.
2.  **Null Prototype:** \`Object.create(null)\` creates objects with NO prototype chain.
3.  **Freeze:** \`Object.freeze(Object.prototype)\` (Drastic).`,
    codeExample: `// VULNERABLE Merge
function merge(target, source) {
  for (let key in source) {
    if (typeof source[key] === 'object') {
      merge(target[key], source[key]); // __proto__ accesses prototype!
    } else {
      target[key] = source[key];
    }
  }
}

// SAFE Fix
if (key === '__proto__' || key === 'constructor') return;`
  },
  {
    id: 'js-107',
    category: 'Design Pattern',
    difficulty: 'Elite',
    question: 'Implement a "Trie" (Prefix Tree) for Autocomplete.',
    answer: `The most efficient data structure for string search/autocomplete.

### Why not an Array?
Scanning an array of 1M words is O(N).
A Trie search is O(L) where L is the word length (avg 5-10). It's lightning fast.

### Structure
- Root Node
- Children: Map<'a', Node>
- IsEndOfWord: boolean

### Use Case
Google Search bar, Spell checkers, IP routing.`,
    codeExample: `class TrieNode {
  constructor() {
    this.children = {};
    this.isWord = false;
  }
}

class Trie {
  constructor() { this.root = new TrieNode(); }

  insert(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) node.children[char] = new TrieNode();
      node = node.children[char];
    }
    node.isWord = true;
  }

  // O(Length of word) - Extremely fast
  search(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return node.isWord;
  }
  
  startsWith(prefix) {
    let node = this.root;
    for (let char of prefix) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return true;
  }
}

// DEMO: Autocomplete system
const trie = new Trie();
const words = ["apple", "app", "application", "apply", "banana"];

words.forEach(w => trie.insert(w));

console.log("Search 'app':", trie.search("app")); // true
console.log("Search 'appl':", trie.search("appl")); // false  
console.log("StartsWith 'app':", trie.startsWith("app")); // true
console.log("StartsWith 'ban':", trie.startsWith("ban")); // true`
  }
];
