export const day30 = {
  day: 30,
  title: "🔥 JavaScript Performance & Memory",
  intro: "Profile like a pro. Identify memory leaks, optimize render cycles, and write performant code.",
  content: `
<div class="bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 p-4 rounded-xl mb-6">
<h4 class="text-emerald-400 font-bold mb-2">🎯 Senior-Level Skill</h4>
<p class="text-gray-600 dark:text-light-300">Performance optimization separates mid from senior devs. Know these tools and techniques!</p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔧 Chrome DevTools Essentials</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">Performance Tab</code> - Record runtime, find bottlenecks</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">Memory Tab</code> - Heap snapshots, allocation timeline</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">Lighthouse</code> - Automated audits</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">Coverage Tab</code> - Find unused code</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚠️ Common Performance Killers</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
<div class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-500/30">
    <h4 class="font-bold text-red-600 dark:text-red-400 mb-2">Memory Leaks</h4>
    <ul class="list-disc list-inside text-sm space-y-1 text-gray-600 dark:text-light-300">
        <li>Dangling event listeners</li>
        <li>Forgotten timers/intervals</li>
        <li>Closure references</li>
        <li>Detached DOM nodes</li>
    </ul>
</div>
<div class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-500/30">
    <h4 class="font-bold text-red-600 dark:text-red-400 mb-2">CPU Bottlenecks</h4>
    <ul class="list-disc list-inside text-sm space-y-1 text-gray-600 dark:text-light-300">
        <li>Excessive DOM manipulation</li>
        <li>Synchronous operations</li>
        <li>Unnecessary re-renders</li>
        <li>Large bundle size</li>
    </ul>
</div>
</div>
            `,
  masteryChecklist: [
    {
      id: "d30-c1",
      text: "I can explain and measure micro-optimizations (and know when not to)."
    },
    {
      id: "d30-c2",
      text: "I can identify common memory leak sources (listeners, intervals, detached DOM, closures)."
    },
    {
      id: "d30-c3",
      text: "I can use Chrome DevTools Performance + Memory tabs to isolate a bottleneck."
    },
    {
      id: "d30-c4",
      text: "I can explain layout thrashing and how batching reads/writes avoids it."
    },
    {
      id: "d30-c5",
      text: "I can describe strategies for large lists (virtualization, pagination, memoization)."
    }
  ],
  predictions: [
    {
      prompt: "Which is usually faster for building a long string in a loop?",
      options: [
        "Repeated += concatenation",
        "Push to array then join",
        "They are always identical",
        "It depends only on CPU brand"
      ],
      correctIndex: 1,
      explanation: "Array + join often performs better for many concatenations, though engines vary."
    },
    {
      prompt: "What is the biggest risk of optimizing code without measuring first?",
      options: [
        "You might break TypeScript",
        "You might waste time and optimize the wrong thing",
        "You might reduce code coverage",
        "You might force garbage collection"
      ],
      correctIndex: 1,
      explanation: "Measure first to avoid premature optimization and misdiagnosis."
    },
    {
      prompt: "A typical sign of a memory leak in a SPA is…",
      options: [
        "CPU is high during idle",
        "Heap size grows after repeated navigation and never returns",
        "Network requests are slow",
        "CSS is unminified"
      ],
      correctIndex: 1,
      explanation: "Leaky references keep objects alive; the heap keeps growing across actions."
    }
  ],
  checkpoints: [
    {
      prompt: "Layout thrashing happens when you…",
      options: [
        "Use too many CSS classes",
        "Alternate reading layout and writing styles repeatedly in a loop",
        "Use async/await",
        "Call JSON.stringify"
      ],
      correctIndex: 1,
      explanation: "Mixing layout reads and writes forces repeated reflow."
    },
    {
      prompt: "The most common cause of memory leaks in frontends is…",
      options: [
        "Too many imports",
        "Dangling references (listeners/timers/caches) preventing GC",
        "Slow internet",
        "Large images"
      ],
      correctIndex: 1,
      explanation: "GC cannot free objects that are still referenced."
    },
    {
      prompt: "A reliable performance workflow is…",
      options: [
        "Optimize first, then measure",
        "Measure → hypothesize → change one thing → re-measure",
        "Only use Lighthouse",
        "Only use console.time"
      ],
      correctIndex: 1,
      explanation: "Change one variable at a time and validate impact."
    }
  ],
  labSteps: [
    {
      id: "d30-step-1",
      title: "Fix a memory leak: forgotten interval",
      subtitle: "Return a cleanup function and call it",
      teacherNote: "Leaks happen when something keeps running or keeps a reference after you think you're done.",
      bugCode: `console.clear();

function startPolling() {
  setInterval(function () {
    // Imagine: fetch('/api/data')
    console.log("poll");
  }, 1000);
}

startPolling();
// ❌ No way to stop it`,
      bugFocus: {
        fromLine: 2,
        toLine: 10
      },
      fixCode: `console.clear();

function startPolling() {
  var id = setInterval(function () {
    console.log("poll");
  }, 1000);

  return function stop() {
    clearInterval(id);
  };
}

var stop = startPolling();
setTimeout(function () {
  stop();
  console.log("stopped");
}, 2500);`,
      fixFocus: {
        fromLine: 2,
        toLine: 16
      },
      whatToNotice: [
        "If you cannot stop it, it will keep your app busy and can keep references alive.",
        "Returning cleanup mirrors React useEffect cleanup and many API designs."
      ]
    },
    {
      id: "d30-step-2",
      title: "Benchmark safely: avoid noisy results",
      subtitle: "Warm up + run multiple iterations",
      teacherNote: "One timing can lie. Run multiple times and compare medians.",
      bugCode: `console.clear();

function work() {
  var s = 0;
  for (var i = 0; i < 500000; i++) s += i;
  return s;
}

var start = performance.now();
work();
console.log("time:", performance.now() - start);`,
      bugFocus: {
        fromLine: 2,
        toLine: 12
      },
      fixCode: `console.clear();

function work() {
  var s = 0;
  for (var i = 0; i < 500000; i++) s += i;
  return s;
}

// warm up
for (var w = 0; w < 3; w++) work();

var times = [];
for (var t = 0; t < 10; t++) {
  var start = performance.now();
  work();
  times.push(performance.now() - start);
}
times.sort(function (a, b) { return a - b; });
console.log("median(ms):", times[Math.floor(times.length / 2)].toFixed(2));`,
      fixFocus: {
        fromLine: 2,
        toLine: 20
      },
      whatToNotice: [
        "Warm-up reduces JIT compilation noise.",
        "Median is more stable than a single run."
      ]
    }
  ],
  code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  ⚡ JAVASCRIPT PERFORMANCE & MEMORY OPTIMIZATION                     ║
║  Tools, techniques, and best practices                               ║
╠══════════════════════════════════════════════════════════════════════╣
║  Become a performance expert!                                        ║
╚══════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════
// 1️⃣ MEASURING PERFORMANCE
// ═══════════════════════════════════════════════════════════════════
function measurePerformance(fn, label = 'Operation') {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(label + ": " + (end - start).toFixed(2) + "ms");
  return result;
}

// Using Performance API
function detailedMeasure(fn, name) {
  performance.mark(name + "-start");
  const result = fn();
  performance.mark(name + "-end");
  performance.measure(name, name + "-start", name + "-end");
  
  const measure = performance.getEntriesByName(name)[0];
  console.log(name + ": " + measure.duration.toFixed(2) + "ms");
  return result;
}

// ═══════════════════════════════════════════════════════════════════
// 2️⃣ MEMORY LEAK PATTERNS & FIXES
// ═══════════════════════════════════════════════════════════════════

// ❌ LEAK: Event listener not cleaned up
class LeakyComponent {
  constructor() {
    window.addEventListener('resize', this.handleResize);
  }
  handleResize = () => { /* uses 'this' */ };
  // Missing: removeEventListener on cleanup!
}

// ✅ FIX: Proper cleanup
class SafeComponent {
  constructor() {
    this.handleResize = this.handleResize.bind(this);
    window.addEventListener('resize', this.handleResize);
  }
  handleResize() { /* ... */ }
  destroy() {
    window.removeEventListener('resize', this.handleResize);
  }
}

// ❌ LEAK: Forgotten timer
function startPolling() {
  setInterval(() => {
    fetch('/api/data'); // Runs forever!
  }, 1000);
}

// ✅ FIX: Store and clear interval
function startPolling() {
  const intervalId = setInterval(() => {
    fetch('/api/data');
  }, 1000);
  
  return () => clearInterval(intervalId);
}

// ═══════════════════════════════════════════════════════════════════
// 3️⃣ DOM OPTIMIZATION TECHNIQUES
// ═══════════════════════════════════════════════════════════════════

// ❌ SLOW: Multiple DOM updates
function addItemsSlow(items) {
  items.forEach(item => {
    const div = document.createElement('div');
    div.textContent = item;
    document.body.appendChild(div); // Triggers reflow each time!
  });
}

// ✅ FAST: Batch DOM updates
function addItemsFast(items) {
  const fragment = document.createDocumentFragment();
  items.forEach(item => {
    const div = document.createElement('div');
    div.textContent = item;
    fragment.appendChild(div);
  });
  document.body.appendChild(fragment); // Single reflow!
}

// ═══════════════════════════════════════════════════════════════════
// 4️⃣ ARRAY OPTIMIZATION
// ═══════════════════════════════════════════════════════════════════

// ❌ SLOW: Multiple iterations
const result1 = data
  .filter(x => x.active)
  .map(x => x.value)
  .reduce((sum, x) => sum + x, 0);

// ✅ FAST: Single iteration
const result2 = data.reduce((sum, x) => {
  return x.active ? sum + x.value : sum;
}, 0);

// ═══════════════════════════════════════════════════════════════════
// 🧪 CONSOLE BENCHMARK (no React)
// ═══════════════════════════════════════════════════════════════════
function runBenchmarks() {
  console.clear();
  console.log("=== Day 30: Performance Benchmarks (rough) ===");
  console.log("Tip: run multiple times; results vary across engines.");

  function time(label, fn) {
    var start = performance.now();
    fn();
    var end = performance.now();
    console.log(label + ": " + (end - start).toFixed(2) + "ms");
  }

  var iterations = 100000;

  time("Array push() x " + iterations, function () {
    var arr = [];
    for (var i = 0; i < iterations; i++) arr.push(i);
  });

  time("Pre-sized array write x " + iterations, function () {
    var arr = new Array(iterations);
    for (var i = 0; i < iterations; i++) arr[i] = i;
  });

  // Object vs Map lookup
  var obj = {};
  var map = new Map();
  for (var k = 0; k < 10000; k++) {
    obj["key" + k] = k;
    map.set("key" + k, k);
  }

  time("Object lookup x 10k", function () {
    for (var i = 0; i < 10000; i++) obj["key" + i];
  });

  time("Map lookup x 10k", function () {
    for (var i = 0; i < 10000; i++) map.get("key" + i);
  });

  // String concatenation strategies
  time("String += x 10k", function () {
    var s = "";
    for (var i = 0; i < 10000; i++) s += "a";
  });

  time("Array join x 10k", function () {
    var parts = [];
    for (var i = 0; i < 10000; i++) parts.push("a");
    parts.join("");
  });
}

runBenchmarks();`,
  recap: {
    takeaways: [
      "Measure first: the biggest wins come from algorithm/data flow changes, not micro-tweaks.",
      "Memory leaks are usually dangling references (listeners, timers, caches, detached DOM).",
      "Avoid layout thrashing by batching reads and writes."
    ],
    commonMistakes: [
      "Benchmarking once and trusting the number.",
      "Optimizing before understanding the bottleneck (CPU vs layout vs GC vs network).",
      "Leaking intervals/listeners on route changes."
    ],
    nextActions: [
      "Record a Performance trace around a slow interaction; find the longest task.",
      "Take two heap snapshots before/after a repeated action; compare retained objects.",
      "Apply one optimization and re-measure."
    ]
  },
  comparison: {
    junior: `// ❌ No performance awareness
data.filter(x => x.active)
    .map(x => transform(x))
    .filter(x => x.value > 0)
    .map(x => format(x));
// 4 iterations over data!`,
    senior: `// ✅ Single pass, early termination
data.reduce((acc, x) => {
  if (!x.active) return acc;
  const t = transform(x);
  if (t.value <= 0) return acc;
  acc.push(format(t));
  return acc;
}, []);
// 1 iteration, skips unnecessary work`
  },
  interview: {
    questions: [
      {
        q: "How do you identify memory leaks?",
        a: "Chrome DevTools Memory tab: Take heap snapshot before/after action, compare retained objects. Look for growing detached DOM trees, increasing object counts."
      },
      {
        q: "What causes layout thrashing?",
        a: "Reading layout property (offsetHeight) then writing (style.height) in a loop. Browser must recalculate layout each iteration. Batch reads, then batch writes."
      },
      {
        q: "When to use Web Workers?",
        a: "CPU-intensive tasks that would block main thread: image processing, data parsing, complex calculations. Keep UI responsive by offloading work."
      },
      {
        q: "How to optimize large lists?",
        a: "Virtualization/windowing - only render visible items. Libraries: react-window, react-virtuoso. Also pagination and infinite scroll."
      }
    ]
  }
};
