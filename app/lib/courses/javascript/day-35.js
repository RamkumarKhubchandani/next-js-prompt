export const day35 = {
  day: 35,
  title: "🧵 Concurrency Patterns: Limiters, Pools, Cancellation",
  intro: "Real apps must control concurrency. Today you build a limiter and a pool so you can safely run many async tasks without melting the network or UI.",
  content: `
<div class="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 p-4 rounded-xl mb-6">
  <h4 class="text-emerald-300 font-bold mb-2">🎯 Outcome</h4>
  <p class="text-gray-600 dark:text-light-300">You will build <span class="text-yellow-300 font-bold">pLimit</span> and <span class="text-yellow-300 font-bold">pMap</span> (concurrency-limited mapping), and add cancellation.</p>
</div>
            `,
  masteryChecklist: [
    {
      id: "d35-c1",
      text: "I can explain the difference between parallelism and controlled concurrency."
    },
    {
      id: "d35-c2",
      text: "I can implement a concurrency limiter (pLimit)."
    },
    {
      id: "d35-c3",
      text: "I can implement pMap(items, mapper, { concurrency })."
    },
    {
      id: "d35-c4",
      text: "I can cancel queued work with AbortSignal."
    },
    {
      id: "d35-c5",
      text: "I can explain why Promise.all is dangerous for large task arrays."
    }
  ],
  predictions: [
    {
      prompt: "If concurrency is 2 and you have 5 tasks, what is the max number running at once?",
      options: [
        "5",
        "3",
        "2",
        "1"
      ],
      correctIndex: 2,
      explanation: "Concurrency=2 means at most 2 active tasks."
    },
    {
      prompt: "Promise.all on 10k requests is risky because…",
      options: [
        "It turns async into sync",
        "It can overwhelm network/server and memory",
        "It disables caching",
        "It prevents retries"
      ],
      correctIndex: 1,
      explanation: "Unbounded concurrency can overload both client and server."
    },
    {
      prompt: "If AbortSignal is aborted, queued tasks should…",
      options: [
        "Still run",
        "Throw/cancel and never start",
        "Restart automatically",
        "Convert to microtasks"
      ],
      correctIndex: 1,
      explanation: "Cancellation should stop queued work and prevent new starts."
    }
  ],
  checkpoints: [
    {
      prompt: "A limiter usually tracks…",
      options: [
        "active count + queue",
        "only a Set of promises",
        "only timeouts",
        "only cache keys"
      ],
      correctIndex: 0,
      explanation: "You need to know how many are active and which are waiting."
    },
    {
      prompt: "The main value of cancellation is…",
      options: [
        "Speed",
        "Correctness + resource savings",
        "More console logs",
        "Better minification"
      ],
      correctIndex: 1,
      explanation: "It prevents wasted work and stale results."
    },
    {
      prompt: "pMap differs from Promise.all(mapper(items)) because…",
      options: [
        "pMap is synchronous",
        "pMap limits concurrency",
        "pMap cannot preserve order",
        "pMap only works in Node"
      ],
      correctIndex: 1,
      explanation: "pMap controls how many mapper calls run at once."
    }
  ],
  labSteps: [
    {
      id: "d35-step-1",
      title: "Problem: Unbounded concurrency",
      subtitle: "Too many tasks start at once",
      teacherNote: "We simulate tasks with timeouts so you can see active counts.",
      bugCode: `console.clear();

function task(id, ms) {
  return new Promise(function (resolve) {
    console.log("start", id);
    setTimeout(function () {
      console.log("done", id);
      resolve(id);
    }, ms);
  });
}

var tasks = [];
for (var i = 1; i <= 6; i++) tasks.push(function () { return task(i, 200); });

// ❌ Bug: starts everything immediately
Promise.all(tasks.map(function (fn) { return fn(); })).then(function (r) {
  console.log("all done", r);
});`,
      bugFocus: {
        fromLine: 2,
        toLine: 20
      },
      fixCode: `console.clear();

function createLimiter(concurrency) {
  var active = 0;
  var queue = [];

  function next() {
    if (active >= concurrency) return;
    var item = queue.shift();
    if (!item) return;
    active++;
    item()
      .then(function (v) { active--; next(); return v; })
      .catch(function (e) { active--; next(); throw e; });
  }

  return function limit(fn) {
    return new Promise(function (resolve, reject) {
      queue.push(function () {
        return fn().then(resolve, reject);
      });
      next();
    });
  };
}

function task(id, ms) {
  return new Promise(function (resolve) {
    console.log("start", id);
    setTimeout(function () { console.log("done", id); resolve(id); }, ms);
  });
}

var limit = createLimiter(2);
var fns = [];
for (var i = 1; i <= 6; i++) {
  (function (iCopy) {
    fns.push(function () { return limit(function () { return task(iCopy, 200); }); });
  })(i);
}

Promise.all(fns.map(function (run) { return run(); })).then(function (r) {
  console.log("all done", r);
});`,
      fixFocus: {
        fromLine: 2,
        toLine: 42
      },
      whatToNotice: [
        "Only 2 tasks run at a time.",
        "Queue + active count is the core pattern."
      ]
    },
    {
      id: "d35-step-2",
      title: "Build pMap with concurrency",
      subtitle: "Map items with a limiter and preserve output order",
      teacherNote: "This is one of the most useful utilities you can write.",
      bugCode: `console.clear();

function pMapBug(items, mapper) {
  return Promise.all(items.map(mapper)); // ❌ unbounded
}`,
      bugFocus: {
        fromLine: 2,
        toLine: 4
      },
      fixCode: `console.clear();

function createLimiter(concurrency) {
  var active = 0;
  var queue = [];
  function next() {
    if (active >= concurrency) return;
    var item = queue.shift();
    if (!item) return;
    active++;
    item().finally(function () { active--; next(); });
  }
  return function limit(fn) {
    return new Promise(function (resolve, reject) {
      queue.push(function () { return fn().then(resolve, reject); });
      next();
    });
  };
}

function pMap(items, mapper, opts) {
  var concurrency = (opts && opts.concurrency) || 2;
  var limit = createLimiter(concurrency);
  var results = new Array(items.length);
  var runs = items.map(function (item, idx) {
    return limit(function () {
      return Promise.resolve().then(function () { return mapper(item, idx); }).then(function (v) {
        results[idx] = v;
      });
    });
  });
  return Promise.all(runs).then(function () { return results; });
}

function task(id) {
  return new Promise(function (resolve) {
    var ms = 50 + Math.floor(Math.random() * 200);
    setTimeout(function () { resolve("done:" + id + ":" + ms); }, ms);
  });
}

pMap([1, 2, 3, 4, 5], task, { concurrency: 2 }).then(function (r) {
  console.log("results (ordered):", r);
});`,
      fixFocus: {
        fromLine: 2,
        toLine: 43
      },
      whatToNotice: [
        "Results stay in input order even though tasks finish randomly.",
        "Limiter protects your app from spikes."
      ]
    },
    {
      id: "d35-step-3",
      title: "Add cancellation for queued tasks",
      subtitle: "Stop starting new work after abort",
      teacherNote: "Cancellation is a correctness tool, not just a perf trick.",
      bugCode: `console.clear();

// ❌ Bug: ignores signal, queued work still starts
function pMapNoCancel(items, mapper, opts) {
  return Promise.all(items.map(mapper));
}`,
      bugFocus: {
        fromLine: 2,
        toLine: 6
      },
      fixCode: `console.clear();

function createLimiter(concurrency) {
  var active = 0;
  var queue = [];
  function next() {
    if (active >= concurrency) return;
    var item = queue.shift();
    if (!item) return;
    active++;
    item().finally(function () { active--; next(); });
  }
  return {
    schedule: function (fn) {
      return new Promise(function (resolve, reject) {
        queue.push(function () { return fn().then(resolve, reject); });
        next();
      });
    },
    clearQueue: function () { queue = []; }
  };
}

function pMap(items, mapper, opts) {
  var concurrency = (opts && opts.concurrency) || 2;
  var signal = opts && opts.signal;
  var lim = createLimiter(concurrency);
  var results = new Array(items.length);

  function guard() {
    if (signal && signal.aborted) throw new Error("aborted");
  }

  var runs = items.map(function (item, idx) {
    return lim.schedule(function () {
      guard();
      return Promise.resolve().then(function () { return mapper(item, idx); }).then(function (v) {
        results[idx] = v;
      });
    });
  });

  if (signal) {
    signal.addEventListener("abort", function () {
      lim.clearQueue();
    }, { once: true });
  }

  return Promise.all(runs).then(function () { return results; });
}

function slowTask(id) {
  return new Promise(function (resolve) {
    setTimeout(function () { resolve("ok:" + id); }, 200);
  });
}

var controller = new AbortController();
pMap([1, 2, 3, 4, 5], slowTask, { concurrency: 2, signal: controller.signal })
  .then(function (r) { console.log("done:", r); })
  .catch(function (e) { console.log("error:", e.message); });

setTimeout(function () { controller.abort(); }, 250);`,
      fixFocus: {
        fromLine: 2,
        toLine: 58
      },
      whatToNotice: [
        "Already-running tasks may finish; queued tasks should not start after abort.",
        "This matches real UX: user navigates away, work stops."
      ]
    }
  ],
  code: `/*
Day 35: Concurrency Patterns
Goal: build pLimit and pMap, then add cancellation.
Do the lab steps in order.
*/`,
  recap: {
    takeaways: [
      "Limiters control how many async tasks run at once.",
      "pMap is just mapping + limiter + ordered results.",
      "Cancellation prevents wasted work and stale state."
    ],
    commonMistakes: [
      "Starting too much work at once (Promise.all on huge arrays).",
      "Not preserving output order when needed.",
      "Ignoring AbortSignal and continuing to run queued work."
    ],
    nextActions: [
      "Use pMap for image uploads or API fan-out calls.",
      "Add timeouts to tasks and treat them as failures.",
      "Decide: should abort cancel running work or only queued work?"
    ]
  }
};
