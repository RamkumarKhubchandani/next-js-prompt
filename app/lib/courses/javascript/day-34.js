export const day34 = {
  day: 34,
  title: "⚡ Event Loop Deep Dive: Microtasks, Macrotasks, Starvation",
  intro: "You already know the basics. Today you build a rock-solid mental model of the event loop that explains 95% of async bugs: ordering, microtasks vs macrotasks, and starvation.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 34: Event Loop Deep Dive. You know the loop loops, but do you know what starves it?"
      },
      {
        type: "talk",
        message: "Microtasks (Promises) have priority. If you keep scheduling them, Macrotasks (UI updates, timers) will NEVER run. This is called 'Starvation'."
      },
      {
        type: "challenge",
        instruction: "Fix the Starvation. This recursive function uses `Promise.resolve().then()` to repeat itself. Because microtasks run until the queue is empty, the browser never gets a chance to breathe (update UI or run timers). Fix it by 'yielding' to the macrotask queue using `setTimeout`.",
        buggyCode: `let count = 0;
function run() {
  count++;
  if (count > 1000000) return; // Eventually stops, but freezes UI until then

  // ❌ Microtask Starvation
  Promise.resolve().then(() => run());
}

console.log("Start");
setTimeout(() => console.log("Timer fired (finally!)"), 0);
run();`,
        solutionCode: `let count = 0;
function run() {
  count++;
  if (count > 1000000) return;

  // ✅ Yield to Macrotask queue (Timer)
  // This allows the browser to paint and run other timers
  setTimeout(() => run(), 0);
}

console.log("Start");
setTimeout(() => console.log("Timer fired (interleaved!)"), 0);
run();`,
        verifyOutput: "Timer fired", // Ideally we'd check interleaved log
        verifyCode: "setTimeout",
        successMessage: "Correct. By using `setTimeout`, you schedule the next step as a Macrotask. This gives the Event Loop a chance to clear the microtask queue, update the UI, and handle user input.",
        hint: "Replace `Promise.resolve().then(() => run())` with `setTimeout(() => run(), 0)`."
      }
    ]
  },
  content: `
<div class="bg-gradient-to-r from-sky-500/20 to-indigo-500/20 border border-sky-500/30 p-4 rounded-xl mb-6">
  <h4 class="text-sky-300 font-bold mb-2">🎯 Outcome</h4>
  <p class="text-gray-600 dark:text-light-300">You will be able to <span class="text-yellow-700 dark:text-yellow-300 font-bold">predict</span> and <span class="text-yellow-700 dark:text-yellow-300 font-bold">explain</span> async ordering and prevent race-condition UI bugs.</p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🧠 The Rule (Say It Out Loud)</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-green-600 dark:text-green-400 font-bold">Sync code</span> runs first (current call stack).</li>
  <li><span class="text-blue-400 font-bold">Microtasks</span> run next (Promise.then, queueMicrotask) until the queue is empty.</li>
  <li><span class="text-purple-400 font-bold">Macrotasks</span> run after that (setTimeout, setInterval, I/O callbacks).</li>
</ul>

<div class="bg-gray-100 dark:bg-dark-900 border border-dark-700 p-4 rounded-xl text-gray-600 dark:text-light-300">
  <p class="mb-2"><span class="text-yellow-700 dark:text-yellow-300 font-bold">Beginner tip:</span> When you're confused, write the queue order down on paper.</p>
  <p><span class="text-yellow-700 dark:text-yellow-300 font-bold">Interview tip:</span> Always mention microtasks before timeouts.</p>
</div>
            `,
  masteryChecklist: [
    {
      id: "d34-c1",
      text: "I can predict output ordering for sync + Promise.then + setTimeout."
    },
    {
      id: "d34-c2",
      text: "I can explain microtasks vs macrotasks using one clear sentence."
    },
    {
      id: "d34-c3",
      text: "I can demonstrate starvation and explain why it happens."
    },
    {
      id: "d34-c4",
      text: "I can safely schedule 'run after current stack' using queueMicrotask (or Promise.then fallback)."
    },
    {
      id: "d34-c5",
      text: "I can explain how race conditions happen when async responses arrive out of order."
    }
  ],
  predictions: [
    {
      prompt: "What prints first: Promise.then or setTimeout(0)?",
      options: [
        "setTimeout(0)",
        "Promise.then",
        "Random",
        "Depends on browser only"
      ],
      correctIndex: 1,
      explanation: "Promise.then queues a microtask which runs before macrotasks like setTimeout."
    },
    {
      prompt: "If you schedule 1000 microtasks recursively, what might happen to timers?",
      options: [
        "Timers run immediately anyway",
        "Timers may be delayed (starvation)",
        "Timers are cancelled",
        "Microtasks become macrotasks"
      ],
      correctIndex: 1,
      explanation: "Microtasks run to completion before the event loop moves to timers."
    },
    {
      prompt: "queueMicrotask is closest to…",
      options: [
        "setTimeout(fn, 0)",
        "Promise.resolve().then(fn)",
        "requestAnimationFrame(fn)",
        "setInterval(fn, 0)"
      ],
      correctIndex: 1,
      explanation: "Both queue work into the microtask queue."
    }
  ],
  checkpoints: [
    {
      prompt: "Correct execution order is…",
      options: [
        "microtasks -> sync -> macrotasks",
        "sync -> microtasks -> macrotasks",
        "macrotasks -> microtasks -> sync",
        "sync -> macrotasks -> microtasks"
      ],
      correctIndex: 1,
      explanation: "Sync first, then microtasks, then macrotasks."
    },
    {
      prompt: "A classic async bug in UIs is…",
      options: [
        "Hoisting",
        "Out-of-order responses overwriting newer state",
        "Shadowing",
        "Call stack overflow from recursion only"
      ],
      correctIndex: 1,
      explanation: "If request A finishes after request B, stale A can overwrite B unless you guard/abort."
    },
    {
      prompt: "Microtasks run…",
      options: [
        "One per tick",
        "Until the microtask queue is empty",
        "Only on user input",
        "Only in Node.js"
      ],
      correctIndex: 1,
      explanation: "The runtime drains microtasks before moving to the next macrotask."
    }
  ],
  labSteps: [
    {
      id: "d34-step-1",
      title: "Predict the order (then confirm)",
      subtitle: "Sync vs microtask vs macrotask",
      teacherNote: "Do not run first. Predict first. Then run. Then explain.",
      bugCode: `console.clear();

console.log("A");
setTimeout(function () { console.log("D"); }, 0);
Promise.resolve().then(function () { console.log("C"); });
console.log("B");`,
      bugFocus: {
        fromLine: 2,
        toLine: 5
      },
      fixCode: `console.clear();

console.log("A");
setTimeout(function () { console.log("D (macrotask)"); }, 0);
Promise.resolve().then(function () { console.log("C (microtask)"); });
console.log("B");

// Expected: A, B, C, D`,
      fixFocus: {
        fromLine: 2,
        toLine: 9
      },
      whatToNotice: [
        "Promise.then runs before setTimeout.",
        "Labeling helps your brain build the model."
      ]
    },
    {
      id: "d34-step-2",
      title: "Build a microtask helper (queueMicrotask fallback)",
      subtitle: "Schedule work after the current stack, before timers",
      teacherNote: "We implement a tiny helper used in many libraries.",
      bugCode: `console.clear();

function enqueueMicrotaskBug(fn) {
  setTimeout(fn, 0); // ❌ wrong queue (macrotask)
}

console.log("sync-1");
enqueueMicrotaskBug(function () { console.log("micro?"); });
console.log("sync-2");`,
      bugFocus: {
        fromLine: 2,
        toLine: 10
      },
      fixCode: `console.clear();

function enqueueMicrotask(fn) {
  if (typeof queueMicrotask === "function") return queueMicrotask(fn);
  Promise.resolve().then(fn);
}

console.log("sync-1");
enqueueMicrotask(function () { console.log("micro"); });
console.log("sync-2");

// Expected: sync-1, sync-2, micro`,
      fixFocus: {
        fromLine: 2,
        toLine: 14
      },
      whatToNotice: [
        "Microtasks run after sync but before timeouts.",
        "This is the key to correct Promise-like behavior."
      ]
    },
    {
      id: "d34-step-3",
      title: "Starvation demo (and how to yield)",
      subtitle: "Stop microtasks from blocking timers forever",
      teacherNote: "This is a real production issue: microtasks can starve rendering/timers.",
      bugCode: `console.clear();

var count = 0;
setTimeout(function () { console.log("timer fired"); }, 0);

function loopMicrotasks() {
  Promise.resolve().then(function () {
    count++;
    if (count < 5000) loopMicrotasks();
  });
}

loopMicrotasks();
console.log("started");`,
      bugFocus: {
        fromLine: 2,
        toLine: 14
      },
      fixCode: `console.clear();

var count = 0;
setTimeout(function () { console.log("timer fired"); }, 0);

function loopWithYields() {
  Promise.resolve().then(function () {
    count++;
    if (count % 500 === 0) {
      // yield to macrotask queue so timers/rendering can proceed
      return setTimeout(loopWithYields, 0);
    }
    if (count < 5000) loopWithYields();
  });
}

loopWithYields();
console.log("started (with yields)");`,
      fixFocus: {
        fromLine: 2,
        toLine: 20
      },
      whatToNotice: [
        "Microtasks drain before timers, so endless microtasks can delay timers.",
        "Occasional yielding gives the event loop a chance to run other work."
      ]
    }
  ],
  code: `/*
Day 34: Event Loop Deep Dive
Run the labs in order. Keep notes:
1) predict output
2) run
3) explain the rule you used
*/`,
  recap: {
    takeaways: [
      "Sync -> microtasks -> macrotasks is the foundation.",
      "Microtasks can starve timers if you schedule too many without yielding.",
      "Race-condition bugs come from out-of-order async completions."
    ],
    commonMistakes: [
      "Assuming setTimeout(0) is immediate.",
      "Assuming Promise.then runs later than timers.",
      "Not guarding against out-of-order results."
    ],
    nextActions: [
      "Write 3 more ordering examples and test yourself.",
      "Use AbortController or request IDs to prevent stale UI updates.",
      "Practice explaining microtasks in 15 seconds."
    ]
  }
};
