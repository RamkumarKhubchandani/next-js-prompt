export const day26 = {
  day: 26,
  title: "🔥 LRU Cache Implementation",
  intro: "A classic data structures interview question. Used in browser caching, memoization, and database query caching.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 26: LRU Cache. This is a favorite at Google/Meta. The concept is simple: keep the most recently used items, delete the old ones."
      },
      {
        type: "talk",
        message: "The trick in JavaScript? You can use a `Map` because it preserves insertion order. But you must manually update that order."
      },
      {
        type: "challenge",
        instruction: "Fix the Recency Logic. This `get` method retrieves the value but forgets to update the item's position. This means 'recently used' items might still get evicted. Fix it by deleting and re-setting the key.",
        buggyCode: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    // ❌ BUG: Returns value but doesn't update position!
    return this.cache.get(key);
  }

  put(key, value) {
    if (this.cache.has(key)) this.cache.delete(key);
    this.cache.set(key, value);
    if (this.cache.size > this.capacity) {
      // Evict oldest (first inserted)
      this.cache.delete(this.cache.keys().next().value);
    }
  }
}

const lru = new LRUCache(2);
lru.put("A", 1);
lru.put("B", 2);
lru.get("A"); // Access A
lru.put("C", 3); // Should evict B (LRU), keep A (MRU)

// Check if A is still there
console.log("Has A?", lru.cache.has("A")); 
// Output: false (Wrong! A was evicted)`,
        solutionCode: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    const val = this.cache.get(key);
    
    // ✅ Refresh position (delete + set = move to end)
    this.cache.delete(key);
    this.cache.set(key, val);
    
    return val;
  }

  put(key, value) {
    if (this.cache.has(key)) this.cache.delete(key);
    this.cache.set(key, value);
    if (this.cache.size > this.capacity) {
      this.cache.delete(this.cache.keys().next().value);
    }
  }
}

const lru = new LRUCache(2);
lru.put("A", 1);
lru.put("B", 2);
lru.get("A");
lru.put("C", 3);

console.log("Has A?", lru.cache.has("A")); 
// Output: true`,
        verifyOutput: "Has A? true",
        verifyCode: "this.cache.delete(key)",
        successMessage: "Smart. In a JS Map, re-inserting a key moves it to the end of the iteration order. This is a clever O(1) cheat code for LRU implementations in interviews.",
        hint: "Inside `get`, do `this.cache.delete(key)` and then `this.cache.set(key, val)` to move it to the end (most recent)."
      }
    ]
  },
  content: `
<div class="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 p-4 rounded-xl mb-6">
<h4 class="text-indigo-400 font-bold mb-2">🎯 LeetCode #146 - Medium</h4>
<p class="text-gray-600 dark:text-light-300">LRU Cache is asked at Google, Amazon, Facebook, and Microsoft. Master it!</p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📐 LRU Cache Concept</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-cyan-700 dark:text-cyan-300">
<pre>
┌─────────────────────────────────────────────────────────────────┐
│                    LRU CACHE (capacity: 3)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   Most Recent ◄────────────────────────────► Least Recent       │
│                                                                 │
│   ┌───────┐     ┌───────┐     ┌───────┐                         │
│   │ Key:C │ ←→  │ Key:A │ ←→  │ Key:B │                         │
│   │ Val:3 │     │ Val:1 │     │ Val:2 │                         │
│   └───────┘     └───────┘     └───────┘                         │
│       ▲                           ▲                             │
│       │                           │                             │
│   HEAD (MRU)                  TAIL (LRU)                        │
│                                                                 │
│   On get(A): Move A to HEAD                                     │
│   On put(D): Remove TAIL (B), add D at HEAD                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔑 Requirements</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">get(key)</code> - O(1) lookup, moves to front</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">put(key, value)</code> - O(1) insert/update</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">capacity</code> - Max items, evict LRU when full</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Data Structure Choice</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
<div class="bg-white dark:bg-dark-800 p-4 rounded-lg border border-gray-200 dark:border-dark-600">
    <h4 class="font-bold text-green-600 dark:text-green-400 mb-2">Hash Map</h4>
    <p class="text-sm text-gray-600 dark:text-light-300">O(1) key lookup to find node</p>
</div>
<div class="bg-white dark:bg-dark-800 p-4 rounded-lg border border-gray-200 dark:border-dark-600">
    <h4 class="font-bold text-green-600 dark:text-green-400 mb-2">Doubly Linked List</h4>
    <p class="text-sm text-gray-600 dark:text-light-300">O(1) move to front, O(1) remove from end</p>
</div>
</div>
            `,
  masteryChecklist: [
    {
      id: "d26-c1",
      text: "I can explain why Map alone is not a full LRU (you need recency ordering operations)."
    },
    {
      id: "d26-c2",
      text: "I can implement get/put in O(1) using Map + doubly linked list."
    },
    {
      id: "d26-c3",
      text: "I can explain dummy head/tail nodes and how they simplify edge cases."
    },
    {
      id: "d26-c4",
      text: "I can walk through an example sequence and show which key gets evicted."
    },
    {
      id: "d26-c5",
      text: "I can reason about memory usage and what happens with large values."
    }
  ],
  predictions: [
    {
      prompt: "Which combination gives O(1) get and O(1) eviction reorder for an LRU cache?",
      options: [
        "Array + for-loop search",
        "Object only",
        "Map/HashMap + Doubly Linked List",
        "Set only"
      ],
      correctIndex: 2,
      explanation: "Map gives O(1) lookup to find node; doubly linked list gives O(1) move-to-front and remove-from-tail."
    },
    {
      prompt: "In an LRU cache, calling get(key) should…",
      options: [
        "Not change recency",
        "Delete the key",
        "Mark the key as most recently used",
        "Evict the key immediately"
      ],
      correctIndex: 2,
      explanation: "Reads update recency: recently accessed entries should stay longer."
    },
    {
      prompt: "Why use dummy head/tail nodes?",
      options: [
        "They make it faster than O(1)",
        "They remove special-case logic for empty/single-node lists",
        "They store all data",
        "They prevent memory leaks automatically"
      ],
      correctIndex: 1,
      explanation: "Sentinels simplify pointer updates: head.next and tail.prev always exist."
    }
  ],
  checkpoints: [
    {
      prompt: "When capacity is exceeded, which item is evicted?",
      options: [
        "Most recently used",
        "Least recently used",
        "Random",
        "Smallest value"
      ],
      correctIndex: 1,
      explanation: "LRU evicts the least recently used item (tail of the recency list)."
    },
    {
      prompt: "Time complexity of get and put in a correct LRU implementation is…",
      options: [
        "O(n)",
        "O(log n)",
        "O(1)",
        "O(n log n)"
      ],
      correctIndex: 2,
      explanation: "Map lookup is O(1) average; list updates are constant pointer changes."
    },
    {
      prompt: "Why is a singly linked list insufficient for O(1) removal of an arbitrary node?",
      options: [
        "Because JS forbids it",
        "You cannot find the previous node without traversal",
        "It uses too much memory",
        "It doesn’t support keys"
      ],
      correctIndex: 1,
      explanation: "To remove a node in O(1), you need its prev pointer; otherwise you must scan to find prev."
    }
  ],
  labSteps: [
    {
      id: "d26-step-1",
      title: "Bug: get() doesn't update recency",
      subtitle: "Fix by moving the node to the front on every get",
      teacherNote: "If get() doesn't update order, your cache isn't LRU—it's just a bounded map.",
      bugCode: `console.clear();

class LRUCache {
  constructor(capacity) { this.capacity = capacity; this.map = new Map(); }
  get(k) { return this.map.has(k) ? this.map.get(k) : -1; } // BUG: no recency update
  put(k, v) {
    if (this.map.has(k)) this.map.delete(k);
    this.map.set(k, v);
    if (this.map.size > this.capacity) {
      const firstKey = this.map.keys().next().value; // oldest insertion
      this.map.delete(firstKey);
    }
  }
}

const c = new LRUCache(2);
c.put("A", 1); c.put("B", 2);
c.get("A");         // should make A most recent
c.put("C", 3);      // should evict B if LRU is correct
console.log("A:", c.get("A"), "B:", c.get("B"), "C:", c.get("C"));`,
      bugFocus: {
        fromLine: 4,
        toLine: 4
      },
      fixCode: `console.clear();

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }
  get(k) {
    if (!this.map.has(k)) return -1;
    const v = this.map.get(k);
    // Fix: refresh recency by reinserting
    this.map.delete(k);
    this.map.set(k, v);
    return v;
  }
  put(k, v) {
    if (this.map.has(k)) this.map.delete(k);
    this.map.set(k, v);
    if (this.map.size > this.capacity) {
      const lruKey = this.map.keys().next().value;
      this.map.delete(lruKey);
    }
  }
}

const c = new LRUCache(2);
c.put("A", 1); c.put("B", 2);
c.get("A");
c.put("C", 3);
console.log("A:", c.get("A"), "B:", c.get("B"), "C:", c.get("C"));`,
      fixFocus: {
        fromLine: 6,
        toLine: 12
      },
      whatToNotice: [
        "This Map-only approach works in JS because Map preserves insertion order.",
        "Interview implementations often require explicit doubly linked list (language-agnostic)."
      ]
    },
    {
      id: "d26-step-2",
      title: "Doubly linked list: remove LRU in O(1)",
      subtitle: "Understand the pointer operations",
      teacherNote: "The key is constant pointer changes—no scanning.",
      bugCode: `console.clear();

// BUG: forgetting to update both pointers breaks the list
const head = { next: null };
const a = { key: "A" };
const b = { key: "B" };
head.next = a;
a.next = b;

// remove a (incorrect)
head.next = a.next; // missing: a.next.prev update (in a real DLL)
console.log("head.next.key should be B:", head.next.key);`,
      bugFocus: {
        fromLine: 10,
        toLine: 10
      },
      fixCode: `console.clear();

// Minimal doubly-linked remove (concept demo)
const head = { next: null };
const a = { key: "A", prev: head, next: null };
const b = { key: "B", prev: a, next: null };
head.next = a;
a.next = b;

// remove a (correct)
a.prev.next = a.next;
a.next.prev = a.prev;

console.log("head.next.key:", head.next.key, "(should be B)");
console.log("b.prev === head:", b.prev === head);`,
      fixFocus: {
        fromLine: 10,
        toLine: 13
      },
      whatToNotice: [
        "Removal in a DLL updates prev.next and next.prev.",
        "Dummy nodes guarantee prev/next exist, simplifying edge cases."
      ]
    }
  ],
  code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  📦 LRU CACHE - O(1) GET AND PUT                                     ║
║  LeetCode #146 - Asked at FAANG                                      ║
╠══════════════════════════════════════════════════════════════════════╣
║  Uses: HashMap + Doubly Linked List                                  ║
╚══════════════════════════════════════════════════════════════════════╝
*/

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // key -> node
    
    // Dummy head and tail for easier edge case handling
    this.head = { key: null, value: null, prev: null, next: null };
    this.tail = { key: null, value: null, prev: null, next: null };
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
  
  // Add node right after head (most recently used)
  _addToFront(node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }
  
  // Remove node from its current position
  _removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }
  
  // Move existing node to front
  _moveToFront(node) {
    this._removeNode(node);
    this._addToFront(node);
  }
  
  // Remove and return the least recently used (before tail)
  _removeLRU() {
    const lru = this.tail.prev;
    this._removeNode(lru);
    return lru;
  }
  
  get(key) {
    if (!this.cache.has(key)) return -1;
    
    const node = this.cache.get(key);
    this._moveToFront(node); // Mark as recently used
    return node.value;
  }
  
  put(key, value) {
    if (this.cache.has(key)) {
      // Update existing
      const node = this.cache.get(key);
      node.value = value;
      this._moveToFront(node);
    } else {
      // Add new
      const newNode = { key, value, prev: null, next: null };
      this.cache.set(key, newNode);
      this._addToFront(newNode);
      
      // Evict if over capacity
      if (this.cache.size > this.capacity) {
        const lru = this._removeLRU();
        this.cache.delete(lru.key);
      }
    }
  }
  
  // Helper: Get current cache state for visualization
  getState() {
    const items = [];
    let current = this.head.next;
    while (current !== this.tail) {
      items.push({ key: current.key, value: current.value });
      current = current.next;
    }
    return items;
  }
}

// ═══════════════════════════════════════════════════════════════════
// ✅ CONSOLE TESTS (iframe-friendly: no React/JSX)
// ═══════════════════════════════════════════════════════════════════
console.clear();

const cache = new LRUCache(3);
cache.put("A", 1);
cache.put("B", 2);
cache.put("C", 3);
console.log("state after A,B,C (MRU first):", cache.getState());

console.log("get(A):", cache.get("A"));
console.log("state after get(A):", cache.getState());

cache.put("D", 4); // should evict B
console.log("state after put(D):", cache.getState());
console.log("get(B) should be -1:", cache.get("B"));
console.log("get(C) should be 3:", cache.get("C"));`,
  recap: {
    takeaways: [
      "LRU = 'evict the least recently used' which requires tracking recency on reads and writes.",
      "Map gives O(1) lookup; a doubly linked list gives O(1) move-to-front and remove-from-tail.",
      "Dummy head/tail nodes simplify edge cases and keep pointer ops constant."
    ],
    commonMistakes: [
      "Not updating recency on get().",
      "Using an array/list causing O(n) updates.",
      "Forgetting to delete the evicted key from the map."
    ],
    nextActions: [
      "Add a peek(key) that does not update recency (useful in some caches).",
      "Add a size() and keys() for debugging/telemetry."
    ]
  },
  comparison: {
    junior: `// ❌ O(n) implementation
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = [];
  }
  
  get(key) {
    const idx = this.cache.findIndex(x => x.key === key); // O(n)
    if (idx === -1) return -1;
    const item = this.cache.splice(idx, 1)[0]; // O(n)
    this.cache.unshift(item); // O(n)
    return item.value;
  }
}`,
    senior: `// ✅ O(1) with HashMap + Doubly Linked List
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // O(1) lookup
    // Doubly linked list for O(1) reorder
    this.head = {};
    this.tail = {};
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
  
  get(key) {
    if (!this.cache.has(key)) return -1;
    const node = this.cache.get(key);
    this._moveToFront(node); // O(1)
    return node.value;
  }
}`
  },
  interview: {
    questions: [
      {
        q: "Why use dummy head and tail nodes?",
        a: "Simplifies edge cases. Without them, you'd need special handling for empty list, single item, adding to empty, etc. Dummy nodes mean head.next is always the real first item."
      },
      {
        q: "Time complexity of all operations?",
        a: "Both get() and put() are O(1). HashMap gives O(1) lookup. Doubly linked list gives O(1) insert/remove since we have direct node reference."
      },
      {
        q: "Why not use a singly linked list?",
        a: "To remove a node in O(1), we need access to its previous node. With singly linked, we'd need O(n) traversal. Doubly linked stores prev pointer for O(1) removal."
      },
      {
        q: "Real-world uses of LRU Cache?",
        a: "Browser cache, Redis, database query caching, React.memo-like memoization, CDN edge caching, DNS lookup caching."
      }
    ]
  }
};
