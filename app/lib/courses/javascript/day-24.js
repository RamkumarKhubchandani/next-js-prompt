export const day24 = {
  day: 24,
  title: "🔥 Debounce & Throttle with Cancel",
  intro: "The most asked utility functions. Build production-grade versions with cancel, immediate, and trailing options.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 24: Debounce & Throttle. These limit how often expensive code runs."
      },
      {
        type: "talk",
        message: "The tricky part isn't the timer, it's preserving the context (`this`) and arguments."
      },
      {
        type: "challenge",
        instruction: "Fix the Lost Arguments. This debounce implementation waits correctly, but it forgets to pass the arguments to the final function call. It also ignores `this` context.",
        buggyCode: `function debounce(fn, wait) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    // ❌ BUG: Original args are lost!
    timer = setTimeout(() => {
      fn(); 
    }, wait);
  };
}

const log = debounce((msg) => console.log("Msg:", msg), 100);
log("Hello!"); 
// Output: "Msg: undefined"`,
        solutionCode: `function debounce(fn, wait) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    // ✅ Apply context and args
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}

const log = debounce((msg) => console.log("Msg:", msg), 100);
log("Hello!"); 
// Output: "Msg: Hello!"`,
        verifyOutput: "Msg: Hello!",
        verifyCode: "fn.apply",
        successMessage: "Correct. A robust debounce must use `.apply(this, args)` (or `fn(...args)` if context doesn't matter) to ensure the original function receives the data it expects.",
        hint: "Inside `setTimeout`, call `fn.apply(this, args)` or `fn(...args)` to pass the captured arguments."
      }
    ]
  },
  content: `
<div class="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-200 dark:border-green-500/30 p-4 rounded-xl mb-6">
<h4 class="text-green-600 dark:text-green-400 font-bold mb-2">🎯 Interview Frequency: VERY HIGH</h4>
<p class="text-gray-600 dark:text-light-300">Asked at almost every frontend interview. You need to know the difference, implementation, AND use cases.</p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Debounce vs Throttle</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-cyan-700 dark:text-cyan-300">
<pre>
┌─────────────────────────────────────────────────────────────────┐
│  User Actions:  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│                 ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲ ▲                 ▲ ▲ ▲ ▲ ▲    │
│                 (rapid clicks/keystrokes)                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  DEBOUNCE:      ─────────────────────────────────▶ ● (ONE call) │
│                 "Wait until user STOPS, then fire"              │
│                 Use: Search input, resize, auto-save            │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  THROTTLE:      ───●───────●───────●───────●───────●────        │
│                 "Fire at most once per X ms"                    │
│                 Use: Scroll, mouse move, game loops             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔑 Production Features</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">cancel()</code> - Cancel pending execution</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">flush()</code> - Execute immediately</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">leading</code> - Fire on first call</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">trailing</code> - Fire after delay</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">maxWait</code> - Max time to wait (throttle hybrid)</li>
</ul>
            `,
  masteryChecklist: [
    {
      id: "d24-c1",
      text: "I can explain debounce vs throttle in one sentence each, with a real use case."
    },
    {
      id: "d24-c2",
      text: "I can implement debounce with correct args + this binding, plus cancel() and flush()."
    },
    {
      id: "d24-c3",
      text: "I can implement throttle with leading/trailing options (or as debounce + maxWait)."
    },
    {
      id: "d24-c4",
      text: "I can explain why cancel() matters for UI cleanup (avoid running after unmount)."
    },
    {
      id: "d24-c5",
      text: "I can test timing behavior using deterministic logs (counts + timestamps)."
    }
  ],
  predictions: [
    {
      prompt: "Debounce is best for…",
      options: [
        "Scroll handlers (continuous stream)",
        "Search input (wait until user stops typing)",
        "Animation loops",
        "A function that must run exactly 60 times/sec"
      ],
      correctIndex: 1,
      explanation: "Debounce waits for inactivity, so it’s ideal for expensive work triggered by bursts (typing, resize)."
    },
    {
      prompt: "Throttle guarantees…",
      options: [
        "The function runs only once total",
        "The function runs at most once per interval (plus optional trailing)",
        "The function runs exactly every interval",
        "The function runs after the user stops"
      ],
      correctIndex: 1,
      explanation: "Throttle limits rate. It does not guarantee exact periodic execution; it guarantees a maximum frequency."
    },
    {
      prompt: "Why is cancel() important for debounce/throttle in UI components?",
      options: [
        "To make the function faster",
        "To avoid a pending timer firing after the component unmounts",
        "To prevent Promises from resolving",
        "To improve CSS rendering"
      ],
      correctIndex: 1,
      explanation: "If a timer fires after unmount, it can update stale state or leak memory. cancel() is cleanup."
    }
  ],
  checkpoints: [
    {
      prompt: "Debounce means…",
      options: [
        "Run immediately, then ignore calls for N ms",
        "Run after N ms of no calls",
        "Run on every call but slower",
        "Run only on the server"
      ],
      correctIndex: 1,
      explanation: "Debounce delays execution until the burst stops (inactivity window)."
    },
    {
      prompt: "In a correct debounce implementation, which must be preserved?",
      options: [
        "Only the last timestamp",
        "The last args and this value",
        "Only the first args",
        "Nothing"
      ],
      correctIndex: 1,
      explanation: "When the delayed call finally runs, it should run with the last arguments and the right this context."
    },
    {
      prompt: "A common way lodash implements throttle is…",
      options: [
        "Using recursion",
        "Using debounce with maxWait equal to wait",
        "Using eval",
        "Using requestIdleCallback only"
      ],
      correctIndex: 1,
      explanation: "Throttle can be expressed as debounce with a maximum wait so it must fire at least once per interval."
    }
  ],
  labSteps: [
    {
      id: "d24-step-1",
      title: "Bug: debounce loses arguments and this",
      subtitle: "Fix by capturing lastArgs/lastThis",
      teacherNote: "Predict: should the final log print 'TYPING: 4' or something else?",
      bugCode: `console.clear();

function debounce(fn, wait) {
  let t = null;
  return function() {
    clearTimeout(t);
    // BUG: ignores args + this
    t = setTimeout(fn, wait);
  };
}

const tracker = {
  prefix: "TYPING",
  log(n) { console.log(this.prefix + ":", n); }
};

const d = debounce(tracker.log, 80);

for (let i = 0; i < 5; i++) {
  d.call(tracker, i);
}`,
      bugFocus: {
        fromLine: 3,
        toLine: 8
      },
      fixCode: `console.clear();

function debounce(fn, wait) {
  let t = null;
  let lastArgs = null;
  let lastThis = null;

  function debounced(...args) {
    lastArgs = args;
    lastThis = this;
    clearTimeout(t);
    t = setTimeout(() => {
      t = null;
      fn.apply(lastThis, lastArgs);
    }, wait);
  }

  debounced.cancel = () => { if (t) clearTimeout(t); t = null; };
  debounced.flush = () => {
    if (!t) return;
    clearTimeout(t);
    t = null;
    fn.apply(lastThis, lastArgs);
  };

  return debounced;
}

const tracker = {
  prefix: "TYPING",
  log(n) { console.log(this.prefix + ":", n); }
};

const d = debounce(tracker.log, 80);
for (let i = 0; i < 5; i++) d.call(tracker, i);`,
      fixFocus: {
        fromLine: 3,
        toLine: 25
      },
      whatToNotice: [
        "The final call should use the last args (4) and correct this (tracker).",
        "cancel() and flush() are part of production-grade APIs."
      ]
    },
    {
      id: "d24-step-2",
      title: "Throttle: limit rate while keeping trailing call",
      subtitle: "Fix a naive throttle that drops the last call",
      teacherNote: "A good throttle usually runs at most once per interval, but still runs the final call (trailing) if there was activity.",
      bugCode: `console.clear();

function throttle(fn, wait) {
  let inFlight = false;
  return function(...args) {
    if (inFlight) return; // BUG: drops trailing call completely
    inFlight = true;
    fn.apply(this, args);
    setTimeout(() => { inFlight = false; }, wait);
  };
}

const t = throttle((x) => console.log("throttled:", x), 60);
let i = 0;
const timer = setInterval(() => {
  t(i++);
  if (i > 8) clearInterval(timer);
}, 10);`,
      bugFocus: {
        fromLine: 3,
        toLine: 10
      },
      fixCode: `console.clear();

function throttle(fn, wait, options = {}) {
  const leading = options.leading !== false;
  const trailing = options.trailing !== false;

  let lastCallTime = 0;
  let t = null;
  let lastArgs = null;
  let lastThis = null;

  function invoke(time) {
    lastCallTime = time;
    const args = lastArgs;
    const ctx = lastThis;
    lastArgs = lastThis = null;
    fn.apply(ctx, args);
  }

  function throttled(...args) {
    const now = Date.now();
    if (!lastCallTime && !leading) lastCallTime = now;

    const remaining = wait - (now - lastCallTime);
    lastArgs = args;
    lastThis = this;

    if (remaining <= 0) {
      if (t) { clearTimeout(t); t = null; }
      invoke(now);
    } else if (trailing && !t) {
      t = setTimeout(() => {
        t = null;
        invoke(Date.now());
      }, remaining);
    }
  }

  throttled.cancel = () => { if (t) clearTimeout(t); t = null; lastArgs = lastThis = null; lastCallTime = 0; };
  throttled.flush = () => { if (t) { clearTimeout(t); t = null; invoke(Date.now()); } };
  return throttled;
}

const t = throttle((x) => console.log("throttled:", x), 60, { leading: true, trailing: true });
let i = 0;
const timer = setInterval(() => {
  t(i++);
  if (i > 8) clearInterval(timer);
}, 10);`,
      fixFocus: {
        fromLine: 3,
        toLine: 44
      },
      whatToNotice: [
        "Naive throttle drops the final intent (last call).",
        "Trailing behavior preserves the most recent args to run after the wait."
      ]
    }
  ],
  code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  Day 24 Live Lab: Debounce vs Throttle (console simulation)          ║
║  Watch call counts + timestamps                                      ║
╚══════════════════════════════════════════════════════════════════════╝
*/

console.clear();

function debounce(fn, wait) {
  let t = null;
  let lastArgs = null;
  let lastThis = null;

  function debounced(...args) {
    lastArgs = args;
    lastThis = this;
    if (t) clearTimeout(t);
    t = setTimeout(() => {
      t = null;
      fn.apply(lastThis, lastArgs);
    }, wait);
  }

  debounced.cancel = () => { if (t) clearTimeout(t); t = null; lastArgs = lastThis = null; };
  debounced.flush = () => { if (!t) return; clearTimeout(t); t = null; fn.apply(lastThis, lastArgs); };
  return debounced;
}

function throttle(fn, wait, options = {}) {
  const leading = options.leading !== false;
  const trailing = options.trailing !== false;

  let lastCallTime = 0;
  let t = null;
  let lastArgs = null;
  let lastThis = null;

  function invoke(time) {
    lastCallTime = time;
    const args = lastArgs;
    const ctx = lastThis;
    lastArgs = lastThis = null;
    fn.apply(ctx, args);
  }

  function throttled(...args) {
    const now = Date.now();
    if (!lastCallTime && !leading) lastCallTime = now;

    const remaining = wait - (now - lastCallTime);
    lastArgs = args;
    lastThis = this;

    if (remaining <= 0) {
      if (t) { clearTimeout(t); t = null; }
      invoke(now);
    } else if (trailing && !t) {
      t = setTimeout(() => {
        t = null;
        invoke(Date.now());
      }, remaining);
    }
  }

  throttled.cancel = () => { if (t) clearTimeout(t); t = null; lastArgs = lastThis = null; lastCallTime = 0; };
  throttled.flush = () => { if (t) { clearTimeout(t); t = null; invoke(Date.now()); } };
  return throttled;
}

let debouncedCount = 0;
let throttledCount = 0;

const debounced = debounce((x) => {
  debouncedCount++;
  console.log("DEBOUNCED:", x, "count:", debouncedCount, "t:", Date.now() % 100000);
}, 80);

const throttled = throttle((x) => {
  throttledCount++;
  console.log("THROTTLED:", x, "count:", throttledCount, "t:", Date.now() % 100000);
}, 80, { leading: true, trailing: true });

console.log("Simulating 12 rapid calls (every 10ms)...");
let i = 0;
const timer = setInterval(() => {
  debounced(i);
  throttled(i);
  i++;
  if (i >= 12) {
    clearInterval(timer);
    setTimeout(() => {
      console.log("Final counts -> debounced:", debouncedCount, "throttled:", throttledCount);
    }, 140);
  }
}, 10);`,
  recap: {
    takeaways: [
      "Debounce waits for silence; throttle limits rate.",
      "Correct implementations preserve args + this, and expose cancel/flush for cleanup and control.",
      "Trailing calls often matter because they preserve the user's final intent."
    ],
    commonMistakes: [
      "Dropping the last call unintentionally (throttle without trailing).",
      "Losing this/args in debounce (calling fn without apply).",
      "Forgetting cancel() on cleanup (timers firing after unmount)."
    ],
    nextActions: [
      "Try throttle with trailing:false and see how it changes behavior.",
      "Add maxWait to debounce to build a lodash-style throttle."
    ]
  },
  comparison: {
    junior: `// ❌ Basic debounce without cancel
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
// Missing: cancel, flush, leading option, 'this' context`,
    senior: `// ✅ Production debounce
function debounce(fn, delay, { leading, trailing } = {}) {
  let timer, lastArgs;
  
  const debounced = function(...args) {
    lastArgs = args;
    
    if (leading && !timer) {
      fn.apply(this, args);
    }
    
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (trailing) fn.apply(this, lastArgs);
      timer = null;
    }, delay);
  };
  
  debounced.cancel = () => clearTimeout(timer);
  debounced.flush = () => timer && fn(...lastArgs);
  return debounced;
}`
  },
  interview: {
    questions: [
      {
        q: "When to use debounce vs throttle?",
        a: "Debounce: search input, resize, auto-save (wait for user to stop). Throttle: scroll handler, mouse move, game loop (limit rate of execution)."
      },
      {
        q: "What is the 'leading' option?",
        a: "Fire immediately on first call, then wait. Useful for button clicks where you want instant feedback but prevent double-click."
      },
      {
        q: "Why is cancel() important?",
        a: "Memory leak prevention. If component unmounts while timer pending, callback might fire on unmounted component. Always cancel in cleanup."
      },
      {
        q: "How does lodash throttle work internally?",
        a: "It's actually debounce with maxWait equal to wait time! maxWait ensures function fires at least once per interval even if continuously called."
      }
    ]
  }
};
