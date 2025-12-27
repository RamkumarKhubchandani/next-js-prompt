export const day38 = {
  day: 38,
  title: "🧠 Data Fetching Layer: Cache, Deduping, Stale-While-Revalidate",
  intro: "Now you build a tiny data fetching layer like React Query/SWR at a beginner-friendly scale: cache + in-flight dedupe + SWR. Step-by-step.",
  content: `
<div class="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 p-4 rounded-xl mb-6">
  <h4 class="text-amber-300 font-bold mb-2">🎯 Outcome</h4>
  <p class="text-gray-600 dark:text-light-300">You will build <span class="text-yellow-700 dark:text-yellow-300 font-bold">createQueryClient</span> with TTL cache, in-flight dedupe, and SWR-style refresh.</p>
</div>
            `,
  masteryChecklist: [
    {
      id: "d38-c1",
      text: "I can explain why caching improves UX (speed) and cost (fewer requests)."
    },
    {
      id: "d38-c2",
      text: "I can implement a TTL cache for query results."
    },
    {
      id: "d38-c3",
      text: "I can dedupe in-flight requests so only one network call happens per key."
    },
    {
      id: "d38-c4",
      text: "I can implement stale-while-revalidate: serve cached then refresh in background."
    },
    {
      id: "d38-c5",
      text: "I can explain the tradeoff between freshness and speed."
    }
  ],
  predictions: [
    {
      prompt: "In-flight deduping means…",
      options: [
        "Never fetch again",
        "Multiple callers share the same promise for the same key",
        "Requests become synchronous",
        "Requests are cancelled"
      ],
      correctIndex: 1,
      explanation: "If two callers ask for the same key, they should share a single in-flight request."
    },
    {
      prompt: "SWR returns cached data immediately and then…",
      options: [
        "Stops",
        "Revalidates in the background",
        "Deletes the cache",
        "Blocks UI until server returns"
      ],
      correctIndex: 1,
      explanation: "It refreshes data in the background."
    },
    {
      prompt: "TTL cache entry expires when…",
      options: [
        "User refreshes",
        "The time since write exceeds TTL",
        "Server changes",
        "Promise resolves"
      ],
      correctIndex: 1,
      explanation: "TTL is a time-based expiry policy."
    }
  ],
  checkpoints: [
    {
      prompt: "The main benefit of deduping is…",
      options: [
        "Better CSS",
        "Less duplicated network work and consistent results",
        "Faster garbage collection",
        "More CPU usage"
      ],
      correctIndex: 1,
      explanation: "One request instead of many reduces load and avoids inconsistent data races."
    },
    {
      prompt: "SWR is best when…",
      options: [
        "You need perfect freshness always",
        "You want fast UI but can tolerate slightly stale data briefly",
        "You never cache anything",
        "You only do writes"
      ],
      correctIndex: 1,
      explanation: "SWR is a speed-first strategy with background freshness."
    },
    {
      prompt: "A query key should be…",
      options: [
        "Random",
        "Stable and deterministic for the request",
        "A DOM node",
        "A function"
      ],
      correctIndex: 1,
      explanation: "Cache correctness depends on stable keys."
    }
  ],
  labSteps: [
    {
      id: "d38-step-1",
      title: "TTL cache (the simplest useful cache)",
      subtitle: "Store value + timestamp; return if fresh",
      teacherNote: "We start small: cache.get(key) returns data if not expired.",
      bugCode: `console.clear();

// ❌ Bug: no cache, always calls API
function fakeApi(key) {
  return new Promise(function (resolve) {
    setTimeout(function () { resolve("data:" + key + ":" + Date.now()); }, 50);
  });
}

fakeApi("user:1").then(console.log);
setTimeout(function () { fakeApi("user:1").then(console.log); }, 80);`,
      bugFocus: {
        fromLine: 2,
        toLine: 12
      },
      fixCode: `console.clear();

function fakeApi(key) {
  return new Promise(function (resolve) {
    setTimeout(function () { resolve("data:" + key + ":" + Date.now()); }, 50);
  });
}

function createTTLCache(ttlMs) {
  var map = new Map();
  return {
    get: function (key) {
      var entry = map.get(key);
      if (!entry) return undefined;
      if (Date.now() - entry.t > ttlMs) { map.delete(key); return undefined; }
      return entry.v;
    },
    set: function (key, value) { map.set(key, { v: value, t: Date.now() }); }
  };
}

var cache = createTTLCache(200);
function query(key) {
  var cached = cache.get(key);
  if (cached) return Promise.resolve(cached);
  return fakeApi(key).then(function (v) { cache.set(key, v); return v; });
}

query("user:1").then(function (v) { console.log("first", v); });
setTimeout(function () { query("user:1").then(function (v) { console.log("cached", v); }); }, 80);`,
      fixFocus: {
        fromLine: 2,
        toLine: 33
      },
      whatToNotice: [
        "Second call returns cached value quickly.",
        "TTL bounds staleness."
      ]
    },
    {
      id: "d38-step-2",
      title: "Deduplicate in-flight requests",
      subtitle: "Two callers should share the same promise",
      teacherNote: "This prevents request storms when multiple components mount.",
      bugCode: `console.clear();

function fakeApi(key) {
  return new Promise(function (resolve) {
    console.log("NETWORK for", key);
    setTimeout(function () { resolve("data:" + key); }, 80);
  });
}

// ❌ Bug: two calls trigger two networks
fakeApi("user:1").then(console.log);
fakeApi("user:1").then(console.log);`,
      bugFocus: {
        fromLine: 2,
        toLine: 12
      },
      fixCode: `console.clear();

function fakeApi(key) {
  return new Promise(function (resolve) {
    console.log("NETWORK for", key);
    setTimeout(function () { resolve("data:" + key); }, 80);
  });
}

function createClient() {
  var inflight = new Map();
  return {
    fetch: function (key, fn) {
      if (inflight.has(key)) return inflight.get(key);
      var p = fn().finally(function () { inflight.delete(key); });
      inflight.set(key, p);
      return p;
    }
  };
}

var client = createClient();
client.fetch("user:1", function () { return fakeApi("user:1"); }).then(function (v) { console.log("a", v); });
client.fetch("user:1", function () { return fakeApi("user:1"); }).then(function (v) { console.log("b", v); });`,
      fixFocus: {
        fromLine: 2,
        toLine: 26
      },
      whatToNotice: [
        "Only one NETWORK log happens.",
        "Both callers get the same resolved value."
      ]
    },
    {
      id: "d38-step-3",
      title: "Stale-while-revalidate (SWR) mini-version",
      subtitle: "Serve cache now, refresh in background",
      teacherNote: "This is the core UX trick behind many modern apps.",
      bugCode: `console.clear();

// ❌ Bug: always blocks on network
function fakeApi(key) {
  return new Promise(function (resolve) {
    setTimeout(function () { resolve("fresh:" + key + ":" + Date.now()); }, 120);
  });
}`,
      bugFocus: {
        fromLine: 2,
        toLine: 7
      },
      fixCode: `console.clear();

function fakeApi(key) {
  return new Promise(function (resolve) {
    setTimeout(function () { resolve("fresh:" + key + ":" + Date.now()); }, 120);
  });
}

function createQueryClient(ttlMs) {
  var cache = new Map();
  var inflight = new Map();

  function getCached(key) {
    var e = cache.get(key);
    if (!e) return undefined;
    if (Date.now() - e.t > ttlMs) return undefined;
    return e.v;
  }

  function setCached(key, v) { cache.set(key, { v: v, t: Date.now() }); }

  function deduped(key, fn) {
    if (inflight.has(key)) return inflight.get(key);
    var p = fn().then(function (v) { setCached(key, v); return v; }).finally(function () { inflight.delete(key); });
    inflight.set(key, p);
    return p;
  }

  return {
    querySWR: function (key, fn, onUpdate) {
      var cached = getCached(key);
      if (cached !== undefined) {
        // fire and forget refresh
        deduped(key, fn).then(function (fresh) { onUpdate && onUpdate(fresh); });
        return Promise.resolve({ data: cached, fromCache: true });
      }
      return deduped(key, fn).then(function (fresh) { return { data: fresh, fromCache: false }; });
    }
  };
}

var qc = createQueryClient(5000);
qc.querySWR("k1", function () { return fakeApi("k1"); }, function (fresh) {
  console.log("updated in background:", fresh);
}).then(function (res) { console.log("first:", res); });

setTimeout(function () {
  qc.querySWR("k1", function () { return fakeApi("k1"); }, function (fresh) {
    console.log("updated in background:", fresh);
  }).then(function (res) { console.log("second:", res); });
}, 300);`,
      fixFocus: {
        fromLine: 2,
        toLine: 62
      },
      whatToNotice: [
        "Second call returns cached data immediately.",
        "Then you get a background update."
      ]
    }
  ],
  code: `/*
Day 38: Data Fetching Layer
Do labs in order: TTL cache -> inflight dedupe -> SWR.
*/`,
  recap: {
    takeaways: [
      "TTL cache improves speed and reduces cost.",
      "In-flight dedupe prevents request storms.",
      "SWR makes UIs feel instant while staying fresh."
    ],
    commonMistakes: [
      "Using unstable keys (cache misses or wrong hits).",
      "Not clearing inflight map on errors (stuck promises).",
      "Serving stale forever without revalidation."
    ],
    nextActions: [
      "Add retry with backoff to deduped().",
      "Add an invalidate(key) method.",
      "Add a max cache size (LRU) like Day 26."
    ]
  }
};
