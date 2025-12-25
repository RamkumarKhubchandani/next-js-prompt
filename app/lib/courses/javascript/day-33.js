export const day33 = {
  day: 33,
  title: "🏁 Capstone: Build a Resilient Autocomplete (Debounce + Abort + Cache + Retry)",
  intro: "Today you build a mini system you will actually use in real apps: an autocomplete/search controller that stays fast, cancels stale requests, avoids duplicate calls, and retries safely. We build it step-by-step so even a beginner can follow.",
  content: `
<div class="bg-gradient-to-r from-fuchsia-500/20 to-pink-500/20 border border-fuchsia-500/30 p-4 rounded-xl mb-6">
  <h4 class="text-fuchsia-300 font-bold mb-2">🎯 Capstone Goal</h4>
  <p class="text-gray-600 dark:text-light-300">
    You will build an <span class="text-yellow-300 font-bold">Autocomplete Controller</span> that:
    debounces user input, aborts stale requests, caches results, and retries with backoff.
  </p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">✅ What You Are Building</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">createAutocompleteController</code> that exposes <span class="text-yellow-300 font-bold">search(query)</span></li>
  <li>Debounce to avoid calling the server on every keystroke</li>
  <li>Abort previous in-flight request when the user types again</li>
  <li>Cache (LRU) so repeated queries are instant</li>
  <li>Retry with exponential backoff for flaky networks</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🧠 Why This Matters</h3>
<div class="bg-gray-100 dark:bg-dark-900 border border-dark-700 p-4 rounded-xl mb-6 text-gray-600 dark:text-light-300">
  <p class="mb-2"><span class="text-green-600 dark:text-green-400 font-bold">Beginner win:</span> You stop guessing how "real apps" behave and you build a real one.</p>
  <p class="mb-2"><span class="text-blue-400 font-bold">Interview win:</span> You can explain debouncing, cancellation, caching, and backoff as a coherent system.</p>
  <p><span class="text-purple-400 font-bold">Senior win:</span> You can reason about tradeoffs: UX vs network cost vs consistency.</p>
</div>
            `,
  masteryChecklist: [
    {
      id: "d33-c1",
      text: "I can explain why debouncing is needed for autocomplete and choose a delay intentionally."
    },
    {
      id: "d33-c2",
      text: "I can cancel stale requests (AbortController) so older responses do not overwrite newer UI."
    },
    {
      id: "d33-c3",
      text: "I can add caching for repeated queries and explain cache invalidation basics."
    },
    {
      id: "d33-c4",
      text: "I can implement retry with exponential backoff (with a max) and explain when NOT to retry."
    },
    {
      id: "d33-c5",
      text: "I can describe the whole flow: input -> debounce -> request -> abort -> cache -> render."
    }
  ],
  predictions: [
    {
      prompt: "User types 'r', then 're', then 'rea' within 200ms. With a debounce of 300ms, how many network requests should happen?",
      options: [
        "3",
        "2",
        "1",
        "0"
      ],
      correctIndex: 2,
      explanation: "Debounce waits for a pause. Only the final value after the pause triggers the call."
    },
    {
      prompt: "Why abort an in-flight request during autocomplete?",
      options: [
        "Because it makes JavaScript faster",
        "To prevent stale results arriving later and replacing newer results",
        "To avoid having to use async/await",
        "Because fetch requires it"
      ],
      correctIndex: 1,
      explanation: "Without cancellation, slow older requests can arrive last and show the wrong results."
    },
    {
      prompt: "When should you NOT retry a request?",
      options: [
        "Network timeout",
        "HTTP 429 or 503 (sometimes)",
        "HTTP 400 (bad request)",
        "Temporary DNS failure"
      ],
      correctIndex: 2,
      explanation: "4xx client errors usually mean the request is invalid; retrying won't help."
    }
  ],
  checkpoints: [
    {
      prompt: "The main purpose of LRU in autocomplete caching is…",
      options: [
        "To store infinite results",
        "To keep memory bounded while caching the most useful recent queries",
        "To compress network payloads",
        "To make typing faster in the keyboard"
      ],
      correctIndex: 1,
      explanation: "LRU keeps cache size bounded and prioritizes recently-used queries."
    },
    {
      prompt: "If you do not abort and you accept responses in any order, the bug is called…",
      options: [
        "Hoisting",
        "Race condition",
        "Dead code elimination",
        "Lexical scoping"
      ],
      correctIndex: 1,
      explanation: "Two async operations can resolve out of order and corrupt state."
    },
    {
      prompt: "A safe retry strategy always includes…",
      options: [
        "Infinite retries",
        "No delays",
        "A maximum attempts cap and increasing delays",
        "Randomly throwing errors"
      ],
      correctIndex: 2,
      explanation: "Backoff + max attempts prevents hammering and infinite loops."
    }
  ],
  labSteps: [
    {
      id: "d33-step-1",
      title: "Step 1: Debounce user input (avoid 1 request per keystroke)",
      subtitle: "Build a tiny debouncer and watch the call count drop",
      teacherNote: "We start simple. First make the number of calls correct. Then we add cancellation.",
      bugCode: `console.clear();

// Fake API call (pretend network)
function apiSearch(query) {
  console.log("API CALL for:", query);
  return Promise.resolve(["result:" + query]);
}

// ❌ Bug: calling API on every keystroke
function onType(query) {
  apiSearch(query).then(function (r) { console.log("results:", r); });
}

onType("r");
onType("re");
onType("rea");`,
      bugFocus: {
        fromLine: 2,
        toLine: 15
      },
      fixCode: `console.clear();

function apiSearch(query) {
  console.log("API CALL for:", query);
  return Promise.resolve(["result:" + query]);
}

function debounce(fn, waitMs) {
  var t = null;
  return function () {
    var args = arguments;
    clearTimeout(t);
    t = setTimeout(function () { fn.apply(null, args); }, waitMs);
  };
}

var onType = debounce(function (query) {
  apiSearch(query).then(function (r) { console.log("results:", r); });
}, 300);

onType("r");
onType("re");
onType("rea");
// After ~300ms, only ONE API call should happen (for "rea")`,
      fixFocus: {
        fromLine: 2,
        toLine: 22
      },
      whatToNotice: [
        "Debounce waits for typing to pause before calling the API.",
        "This immediately reduces server load and improves UX."
      ]
    },
    {
      id: "d33-step-2",
      title: "Step 2: Abort stale requests (prevent race conditions)",
      subtitle: "Cancel the previous fetch when a new query starts",
      teacherNote: "Now we fix the classic bug: older slow responses overwriting newer results.",
      bugCode: `console.clear();

// Fake fetch: random delay simulates network unpredictability
function apiSearch(query, signal) {
  return new Promise(function (resolve, reject) {
    var delay = Math.floor(Math.random() * 500) + 50;
    var id = setTimeout(function () {
      resolve(["result:" + query, "delay:" + delay]);
    }, delay);

    // ❌ Bug: ignoring signal means stale requests keep running
  });
}

function run() {
  apiSearch("re").then(function (r) { console.log("render:", r); });
  apiSearch("rea").then(function (r) { console.log("render:", r); });
}

run();
// Sometimes "re" renders AFTER "rea" (wrong UI).`,
      bugFocus: {
        fromLine: 2,
        toLine: 22
      },
      fixCode: `console.clear();

function apiSearch(query, signal) {
  return new Promise(function (resolve, reject) {
    var delay = Math.floor(Math.random() * 500) + 50;
    var id = setTimeout(function () {
      resolve(["result:" + query, "delay:" + delay]);
    }, delay);

    if (signal) {
      if (signal.aborted) {
        clearTimeout(id);
        return reject(new Error("aborted"));
      }
      signal.addEventListener("abort", function () {
        clearTimeout(id);
        reject(new Error("aborted"));
      }, { once: true });
    }
  });
}

function createAbortableSearch() {
  var controller = null;
  return function search(query) {
    if (controller) controller.abort();
    controller = new AbortController();
    return apiSearch(query, controller.signal);
  };
}

var search = createAbortableSearch();
search("re").then(function (r) { console.log("render:", r); }).catch(function (e) { console.log("re:", e.message); });
search("rea").then(function (r) { console.log("render:", r); }).catch(function (e) { console.log("rea:", e.message); });`,
      fixFocus: {
        fromLine: 2,
        toLine: 34
      },
      whatToNotice: [
        "Aborting ensures only the newest query can render.",
        "This prevents race-condition UI bugs."
      ]
    },
    {
      id: "d33-step-3",
      title: "Step 3: Add cache + retry (finish the mini system)",
      subtitle: "Cache repeated queries and retry flaky requests with backoff",
      teacherNote: "We keep this step small: first cache, then retry. You now have a production-grade pattern.",
      bugCode: `console.clear();

// ❌ Bug: no cache and no retry strategy
function createController(apiSearch) {
  return {
    search: function (query) {
      return apiSearch(query);
    }
  };
}

function flakyApi(query) {
  return new Promise(function (resolve, reject) {
    if (Math.random() < 0.5) return reject(new Error("temporary network"));
    resolve(["result:" + query]);
  });
}

var c = createController(flakyApi);
c.search("react").then(console.log).catch(function (e) { console.log("fail:", e.message); });
c.search("react").then(console.log).catch(function (e) { console.log("fail:", e.message); });`,
      bugFocus: {
        fromLine: 2,
        toLine: 22
      },
      fixCode: `console.clear();

function sleep(ms) {
  return new Promise(function (r) { setTimeout(r, ms); });
}

function retry(fn, maxAttempts, baseDelayMs) {
  return fn().catch(function (err) {
    if (maxAttempts <= 1) throw err;
    var delay = baseDelayMs;
    return sleep(delay).then(function () {
      return retry(fn, maxAttempts - 1, Math.min(baseDelayMs * 2, 2000));
    });
  });
}

function createLRU(limit) {
  var map = new Map();
  return {
    get: function (k) {
      if (!map.has(k)) return undefined;
      var v = map.get(k);
      map.delete(k);
      map.set(k, v);
      return v;
    },
    set: function (k, v) {
      if (map.has(k)) map.delete(k);
      map.set(k, v);
      if (map.size > limit) {
        var firstKey = map.keys().next().value;
        map.delete(firstKey);
      }
    }
  };
}

function createController(apiSearch) {
  var cache = createLRU(20);
  return {
    search: function (query) {
      var cached = cache.get(query);
      if (cached) return Promise.resolve(cached);
      return retry(function () { return apiSearch(query); }, 3, 200).then(function (res) {
        cache.set(query, res);
        return res;
      });
    }
  };
}

function flakyApi(query) {
  return new Promise(function (resolve, reject) {
    if (Math.random() < 0.5) return reject(new Error("temporary network"));
    resolve(["result:" + query]);
  });
}

var c = createController(flakyApi);
c.search("react").then(function (r) { console.log("ok:", r); }).catch(function (e) { console.log("fail:", e.message); });
setTimeout(function () {
  c.search("react").then(function (r) { console.log("cached:", r); }).catch(function (e) { console.log("fail:", e.message); });
}, 500);`,
      fixFocus: {
        fromLine: 2,
        toLine: 63
      },
      whatToNotice: [
        "Cache makes repeated queries instant.",
        "Retry with backoff handles flaky networks without hammering the server."
      ]
    }
  ],
  code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  Day 33 Starter (Read this first)                                   ║
║  You will build the full controller step-by-step via the lab steps.  ║
╚══════════════════════════════════════════════════════════════════════╝
*/

console.clear();

console.log("Day 33: Capstone - Resilient Autocomplete");
console.log("Do the labs in order: Step 1 (debounce) -> Step 2 (abort) -> Step 3 (cache+retry).");

// Small mental model:
// input -> debounce -> start request -> abort previous -> retry (if needed) -> cache -> return -> render

// Tip: After you finish, combine the ideas into ONE createAutocompleteController:
// - debounce search()
// - abort previous in-flight request
// - cache results for repeated queries
// - retry only for temporary errors (with backoff)
`,
  recap: {
    takeaways: [
      "You built a real mini-system, not just isolated utilities.",
      "Correctness first (no stale results), then performance (debounce, cache), then reliability (retry).",
      "This pattern shows up everywhere: search, filters, autosave, typeahead, live validation."
    ],
    commonMistakes: [
      "Not aborting and letting older results overwrite newer UI.",
      "Caching without bounds (memory leak) or without considering invalidation.",
      "Retrying forever or retrying invalid requests (4xx)."
    ],
    nextActions: [
      "Implement createAutocompleteController in your own file using the three lab steps.",
      "Add a max cache size and log cache hits/misses to verify behavior.",
      "Try one more feature: ignore queries shorter than 2 chars."
    ]
  },
  comparison: {
    junior: `// ❌ Naive
function onType(q) {
  fetch("/api/search?q=" + q).then(r => r.json()).then(render);
}
// Calls server on every keypress, can show stale results`,
    senior: `// ✅ Resilient system
// 1) debounce input
// 2) abort stale requests
// 3) cache repeated queries (bounded)
// 4) retry temporary failures (backoff + max)
// Result: correct + fast + reliable`
  },
  interview: {
    questions: [
      {
        q: "Explain debouncing vs throttling in one sentence",
        a: "Debounce waits for inactivity then runs once; throttle runs at most once per interval while events continue."
      },
      {
        q: "What problem does AbortController solve?",
        a: "Cancels stale in-flight requests so older responses cannot overwrite newer UI (prevents race conditions) and saves resources."
      },
      {
        q: "Why use LRU for caching?",
        a: "To bound memory while keeping the most recently useful entries for fast repeated queries."
      },
      {
        q: "When should you not retry?",
        a: "On 4xx client errors, non-idempotent writes, or when the user cancelled the action."
      }
    ]
  }
};
