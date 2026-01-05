export const day09 = {
  day: 9,
  title: "Day 9: Memory Leaks + Garbage Collection (Debug Like a Pro)",
  intro: "Most performance problems are memory problems. Today you’ll learn how GC thinks (reachability), the most common leak patterns, and how to prevent them with clean lifecycles.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 9! Memory Leaks. The silent killer of long-running apps. If you allocate but never free, your app gets slower and slower."
      },
      {
        type: "code",
        code: `function start() {
  setInterval(() => {
     // I run forever, even if you don't need me!
     console.log("Leak..."); 
  }, 1000);
}`,
        caption: "The Dangling Interval.",
        speed: "fast"
      },
      {
        type: "talk",
        message: "When you start a timer or listener, you MUST hold a reference to stop it. Otherwise, it leaks."
      },
      {
        type: "challenge",
        instruction: "This code starts a clock but has no way to stop it. Fix it by capturing the `intervalId` and adding a `stop()` function that clears it.",
        buggyCode: `let intervalId;

function startClock() {
  // BUG: repeated calls lose the reference
  intervalId = setInterval(() => console.log("Tick"), 1000);
}

function stopClock() {
  // TODO: Stop the clock
  intervalId = null;
}`,
        solutionCode: `let intervalId;

function startClock() {
  // Prevent multiple intervals
  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(() => console.log("Tick"), 1000);
}

function stopClock() {
  clearInterval(intervalId); // ✅ Cleanup
  intervalId = null;
}`,
        verifyCode: "clearInterval",
        verifyOutput: "",
        successMessage: "Leak plugged! Always pair `setInterval` with `clearInterval`.",
        hint: "Use `clearInterval(intervalId)` inside the `stopClock` function."
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">0) The GC Mental Model (Reachability)</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Garbage collection is not “freeing what you don’t use”. It’s freeing what is <span class="text-yellow-600 dark:text-yellow-400 font-bold">unreachable</span>.
If something is reachable from a root (global objects, active stack frames), it stays alive.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Mark and Sweep</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">GC starts at roots and marks everything reachable.</p>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 bg-white dark:bg-dark-800 p-4 rounded-lg mb-6">
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Mark:</span> "I can reach this object!" (Paint it white).</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Sweep:</span> "I cannot reach that object!" (Delete it).</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Common Leak Patterns (Real World)</h3>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
<div class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-500/30">
    <span class="text-red-600 dark:text-red-400 font-bold block mb-2">Global Variables</span>
    Accidental <code class="bg-gray-100 dark:bg-dark-700 text-gray-800 dark:text-brand-primary px-1 rounded">window.x = largeData</code> stays forever.
</div>
<div class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-500/30">
    <span class="text-red-600 dark:text-red-400 font-bold block mb-2">Detached DOM</span>
    Removing an element from DOM but keeping a JS reference to it.
</div>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
  <div class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-500/30">
      <span class="text-red-600 dark:text-red-400 font-bold block mb-2">Dangling listeners / intervals</span>
      Event listeners and setInterval callbacks can keep closures alive forever if not cleaned up.
  </div>
  <div class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-500/30">
      <span class="text-red-600 dark:text-red-400 font-bold block mb-2">Caches that never evict</span>
      Maps used as caches can grow without bound if you never delete old keys.
  </div>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) WeakMap / WeakSet (Cache Without Keeping Things Alive)</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
WeakMap keys are weakly held: if the key object becomes unreachable elsewhere, GC can collect it and remove the entry.
This is great for associating metadata with objects without leaks.
</p>
            `,
  predictions: [
    {
      prompt: "GC frees an object when…",
      options: [
        "it hasn’t been used in 5 seconds",
        "it is unreachable from roots",
        "you call delete(obj)",
        "you call console.clear()"
      ],
      correctIndex: 1,
      explanation: "GC is based on reachability. Unreachable objects are collected."
    },
    {
      prompt: "Which data structure is best for attaching metadata to objects without preventing GC?",
      options: [
        "Map",
        "WeakMap",
        "Array",
        "Set"
      ],
      correctIndex: 1,
      explanation: "WeakMap keys do not prevent garbage collection of the key objects."
    }
  ],
  checkpoints: [
    {
      prompt: "A common leak in UI apps is…",
      options: [
        "too many console.log calls",
        "event listeners / intervals that aren’t cleaned up",
        "using const instead of let",
        "using async/await"
      ],
      correctIndex: 1,
      explanation: "Dangling listeners/intervals keep closures and referenced objects alive."
    },
    {
      prompt: "Why can a normal Map-based cache leak memory?",
      options: [
        "Maps are slow",
        "Map keys are always strings",
        "Entries stay until you delete them; caches can grow forever",
        "GC can’t see Maps"
      ],
      correctIndex: 2,
      explanation: "A Map strongly references keys/values. If you never evict, memory grows unbounded."
    }
  ],
  labSteps: [
    {
      id: "d9-step-1",
      title: "Event listener leak pattern",
      subtitle: "Closure keeps big data alive",
      teacherNote: "You can’t see GC here, but you can learn the pattern: what keeps what alive?",
      bugCode: `console.clear();

function setup() {
  const huge = new Array(200000).fill("x").join("");
  document.body.addEventListener("click", () => {
    console.log("huge length:", huge.length);
  });
  console.log("listener added");
}
setup();`,
      bugFocus: {
        fromLine: 3,
        toLine: 8
      },
      fixCode: `console.clear();

function setup() {
  const huge = new Array(200000).fill("x").join("");
  const handler = () => console.log("huge length:", huge.length);

  document.body.addEventListener("click", handler);
  console.log("listener added");

  // FIX: cleanup when done
  return () => document.body.removeEventListener("click", handler);
}

const cleanup = setup();
// cleanup(); // call this when feature/component unmounts`,
      fixFocus: {
        fromLine: 5,
        toLine: 15
      },
      whatToNotice: [
        "The handler closes over huge, keeping it reachable while the listener exists.",
        "Cleanup breaks reachability so GC can collect later."
      ]
    },
    {
      id: "d9-step-2",
      title: "Cache that grows forever",
      subtitle: "Map without eviction",
      teacherNote: "Caches need eviction. This demo shows unbounded growth.",
      bugCode: `console.clear();

const cache = new Map();
for (let i = 0; i < 5000; i++) {
  cache.set({ id: i }, new Array(200).fill(i));
}
console.log("cache size:", cache.size);`,
      bugFocus: {
        fromLine: 3,
        toLine: 6
      },
      fixCode: `console.clear();

// FIX: if you only need metadata keyed by object, prefer WeakMap
const cache = new WeakMap();
let lastKey = null;

for (let i = 0; i < 5000; i++) {
  const key = { id: i };
  cache.set(key, { payload: i });
  lastKey = key; // keep only one key strongly referenced
}
console.log("weakmap set done (cannot read size)");`,
      fixFocus: {
        fromLine: 3,
        toLine: 12
      },
      whatToNotice: [
        "Map keeps strong references; WeakMap does not prevent GC of keys.",
        "WeakMap is not iterable and has no size—by design."
      ]
    }
  ],
  code: `// Example 1: Event Listener Leak
function setup() {
const hugeString = new Array(1000000).join('x');

// This handler keeps 'hugeString' alive forever!
document.body.addEventListener('click', () => {
    console.log(hugeString.length);
});
}`,
  comparison: {
    junior: `// ❌ Dangling Listeners
useEffect(() => {
// Attaches a NEW listener every render
window.addEventListener('resize', handleResize);
// Forget to clean up! Leak!
});`,
    senior: `// ✅ Cleanup Function
useEffect(() => {
window.addEventListener('resize', handleResize);

// React runs this when component unmounts
return () => {
window.removeEventListener('resize', handleResize);
};
}, []);`
  },
  interview: {
    questions: [
      {
        q: "How does Garbage Collection work in JS?",
        a: "Mark and Sweep algorithm. It starts from roots (Global/Stack) and marks all reachable objects. Anything not marked is swept (deleted)."
      },
      {
        q: "Why use a WeakMap?",
        a: "To associate data with an object without preventing that object from being garbage collected (e.g., private data in libraries)."
      },
      {
        q: "How to detect memory leaks?",
        a: "Chrome DevTools -> Memory Tab -> Heap Snapshot. Compare snapshots before/after an action."
      }
    ]
  },
  recap: {
    takeaways: [
      "GC is about reachability: unreachable objects get collected.",
      "Closures + listeners/intervals often keep data alive unintentionally.",
      "Map caches can leak if they never evict; WeakMap avoids keeping keys alive.",
      "Debug leaks using heap snapshots and comparing before/after."
    ],
    commonMistakes: [
      "Attaching large objects to globals (roots).",
      "Adding listeners/intervals without cleanup.",
      "Building caches without eviction strategy.",
      "Assuming WeakMap behaves like Map (it’s not iterable, no size)."
    ],
    nextActions: [
      "Scan your own app for addEventListener/setInterval and confirm every one has a cleanup path.",
      "In DevTools Memory tab, take two heap snapshots around a repeated action and compare."
    ]
  }
};
