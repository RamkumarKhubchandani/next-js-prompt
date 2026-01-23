export const day37 = {
  day: 37,
  title: "⏱️ Cooperative Scheduler: Priority Queue + Time Slicing",
  intro: "Big tasks can freeze UIs. Today you build a tiny scheduler: tasks have priorities, can be cancelled, and yield so the app stays responsive.",
  content: `
<div class="bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30 p-4 rounded-xl mb-6">
  <h4 class="text-violet-300 font-bold mb-2">🎯 Outcome</h4>
  <p class="text-gray-600 dark:text-light-300">You will build a <span class="text-yellow-700 dark:text-yellow-300 font-bold">priority queue</span> and a <span class="text-yellow-700 dark:text-yellow-300 font-bold">scheduler</span> that runs work in small chunks.</p>
</div>
            `,
  aiSession: {
    start: {
      title: "Fix the blocking scheduler",
      subTitle: "The current implementation runs all tasks synchronously, freezing the UI. Fix it to yield between tasks.",
      intro: "Blocking the main thread is a cardinal sin in browser JS. Our scheduler currently runs everything in one go. We need to implement 'time slicing' to yield control back to the browser.",
      buggyCode: `
function runTasks(tasks) {
  // ❌ All tasks run in a single synchronous block
  while (tasks.length > 0) {
    const task = tasks.shift();
    task();
  }
}

// Simulation
const tasks = [
  () => console.log("Task 1"),
  () => console.log("Task 2"),
  () => console.log("Task 3")
];
runTasks(tasks);
`,
      solutionCode: `
function runTasks(tasks) {
  function step() {
    if (tasks.length === 0) return;

    // Run one task
    const task = tasks.shift();
    task();

    // Yield to the event loop
    setTimeout(step, 0);
  }
  
  // Start the loop
  step();
}

// Simulation
const tasks = [
  () => console.log("Task 1"),
  () => console.log("Task 2"),
  () => console.log("Task 3")
];
runTasks(tasks);
`,
      verifyOutput: (output) => {
        return output.join("").includes("Task 1Task 2Task 3");
      },
      verifyCode: (code) => {
        return code.includes("setTimeout") || code.includes("requestIdleCallback") || code.includes("Promise.resolve().then");
      },
      successMessage: "Nice! By yielding with setTimeout, you let the browser handle user input and rendering between tasks.",
      hint: "Use a recursive function that runs one task, then schedules itself again using setTimeout(..., 0)."
    }
  },
  masteryChecklist: [
    {
      id: "d37-c1",
      text: "I can explain why long tasks freeze the UI (main thread blocking)."
    },
    {
      id: "d37-c2",
      text: "I can implement a simple priority queue (min-heap)."
    },
    {
      id: "d37-c3",
      text: "I can schedule work with priorities (higher priority runs first)."
    },
    {
      id: "d37-c4",
      text: "I can time-slice work and yield with setTimeout to avoid blocking."
    },
    {
      id: "d37-c5",
      text: "I can cancel scheduled tasks."
    }
  ],
  predictions: [
    {
      prompt: "If a task runs 200ms on the main thread, what happens to clicks/scroll during that time?",
      options: [
        "They run normally",
        "They are delayed until the task finishes",
        "They run in parallel",
        "They are cancelled"
      ],
      correctIndex: 1,
      explanation: "The main thread is blocked; input and rendering wait."
    },
    {
      prompt: "A priority queue helps by…",
      options: [
        "Making code synchronous",
        "Choosing which task runs next efficiently",
        "Eliminating bugs",
        "Avoiding garbage collection"
      ],
      correctIndex: 1,
      explanation: "A heap gives fast insert + pop of highest/lowest priority."
    },
    {
      prompt: "Time slicing is…",
      options: [
        "Running all tasks at once",
        "Breaking work into chunks and yielding between them",
        "A CSS technique",
        "A Node-only concept"
      ],
      correctIndex: 1,
      explanation: "Chunking prevents long blocks and keeps UI responsive."
    }
  ],
  checkpoints: [
    {
      prompt: "A min-heap pop returns…",
      options: [
        "largest priority",
        "smallest priority",
        "random element",
        "last inserted element"
      ],
      correctIndex: 1,
      explanation: "Min-heap returns smallest key first."
    },
    {
      prompt: "Yielding with setTimeout(0) does what?",
      options: [
        "Queues a microtask",
        "Queues a macrotask, letting other work run",
        "Blocks the thread",
        "Cancels tasks"
      ],
      correctIndex: 1,
      explanation: "It schedules work later as a macrotask."
    },
    {
      prompt: "Cancellation should…",
      options: [
        "Only log",
        "Prevent execution of a task if it hasn't run yet",
        "Restart tasks",
        "Increase priority"
      ],
      correctIndex: 1,
      explanation: "A cancelled task should not run."
    }
  ],
  labSteps: [
    {
      id: "d37-step-1",
      title: "Build a tiny min-heap",
      subtitle: "push + pop",
      teacherNote: "We keep it minimal: only what the scheduler needs.",
      bugCode: `console.clear();

// ❌ Bug: using array sort every time is slow for many tasks
var q = [];
function pushBug(item) { q.push(item); q.sort(function (a, b) { return a.p - b.p; }); }
function popBug() { return q.shift(); }`,
      bugFocus: {
        fromLine: 2,
        toLine: 6
      },
      fixCode: `console.clear();

function MinHeap() { this.a = []; }
MinHeap.prototype.push = function (x) {
  var a = this.a;
  a.push(x);
  var i = a.length - 1;
  while (i > 0) {
    var p = Math.floor((i - 1) / 2);
    if (a[p].p <= a[i].p) break;
    var tmp = a[p]; a[p] = a[i]; a[i] = tmp;
    i = p;
  }
};
MinHeap.prototype.pop = function () {
  var a = this.a;
  if (a.length === 0) return null;
  var root = a[0];
  var last = a.pop();
  if (a.length > 0) {
    a[0] = last;
    var i = 0;
    while (true) {
      var l = i * 2 + 1, r = i * 2 + 2, s = i;
      if (l < a.length && a[l].p < a[s].p) s = l;
      if (r < a.length && a[r].p < a[s].p) s = r;
      if (s === i) break;
      var tmp = a[s]; a[s] = a[i]; a[i] = tmp;
      i = s;
    }
  }
  return root;
};

var h = new MinHeap();
h.push({ p: 3, name: "low" });
h.push({ p: 1, name: "high" });
h.push({ p: 2, name: "mid" });
console.log(h.pop().name, h.pop().name, h.pop().name);`,
      fixFocus: {
        fromLine: 2,
        toLine: 44
      },
      whatToNotice: [
        "Heap gives fast push/pop without sorting the whole list each time.",
        "We use p as the priority key (smaller = higher priority)."
      ]
    },
    {
      id: "d37-step-2",
      title: "Build a cooperative scheduler",
      subtitle: "Run tasks in slices and yield",
      teacherNote: "We simulate heavy work with loops, and yield to keep the event loop alive.",
      bugCode: `console.clear();

// ❌ Bug: one long task blocks everything
function heavy(ms) {
  var end = performance.now() + ms;
  while (performance.now() < end) {}
}

console.log("start");
heavy(150);
setTimeout(function () { console.log("timer"); }, 0);
console.log("end");`,
      bugFocus: {
        fromLine: 2,
        toLine: 11
      },
      fixCode: `console.clear();

function heavyChunk(ms) {
  var end = performance.now() + ms;
  while (performance.now() < end) {}
}

function runInChunks(totalMs, chunkMs, done) {
  var remaining = totalMs;
  function step() {
    var ms = Math.min(chunkMs, remaining);
    heavyChunk(ms);
    remaining -= ms;
    if (remaining <= 0) return done();
    setTimeout(step, 0); // yield
  }
  step();
}

console.log("start");
setTimeout(function () { console.log("timer"); }, 0);
runInChunks(150, 15, function () { console.log("end"); });`,
      fixFocus: {
        fromLine: 2,
        toLine: 26
      },
      whatToNotice: [
        "Yielding lets timers/input run between chunks.",
        "This is the simplest form of cooperative scheduling."
      ]
    },
    {
      id: "d37-step-3",
      title: "Add priorities + cancellation",
      subtitle: "Schedule tasks, cancel by id",
      teacherNote: "Now we combine heap + cooperative chunks into a mini scheduler.",
      bugCode: `console.clear();

// ❌ Bug: no priorities, no cancellation
function scheduleBug(fn) { setTimeout(fn, 0); }`,
      bugFocus: {
        fromLine: 2,
        toLine: 4
      },
      fixCode: `console.clear();

function MinHeap() { this.a = []; }
MinHeap.prototype.push = function (x) {
  var a = this.a; a.push(x);
  var i = a.length - 1;
  while (i > 0) {
    var p = Math.floor((i - 1) / 2);
    if (a[p].p <= a[i].p) break;
    var t = a[p]; a[p] = a[i]; a[i] = t; i = p;
  }
};
MinHeap.prototype.pop = function () {
  var a = this.a; if (!a.length) return null;
  var root = a[0]; var last = a.pop();
  if (a.length) {
    a[0] = last; var i = 0;
    while (true) {
      var l = i * 2 + 1, r = i * 2 + 2, s = i;
      if (l < a.length && a[l].p < a[s].p) s = l;
      if (r < a.length && a[r].p < a[s].p) s = r;
      if (s === i) break;
      var t = a[s]; a[s] = a[i]; a[i] = t; i = s;
    }
  }
  return root;
};

function createScheduler() {
  var heap = new MinHeap();
  var cancelled = new Set();
  var running = false;
  var idSeq = 1;

  function pump() {
    if (running) return;
    running = true;
    (function loop() {
      var job = heap.pop();
      if (!job) { running = false; return; }
      if (cancelled.has(job.id)) return setTimeout(loop, 0);
      job.fn();
      setTimeout(loop, 0); // yield between tasks
    })();
  }

  return {
    schedule: function (fn, priority) {
      var id = idSeq++;
      heap.push({ id: id, fn: fn, p: priority || 10 });
      pump();
      return id;
    },
    cancel: function (id) { cancelled.add(id); }
  };
}

var s = createScheduler();
s.schedule(function () { console.log("low"); }, 5);
var id = s.schedule(function () { console.log("cancel-me"); }, 1);
s.cancel(id);
s.schedule(function () { console.log("high"); }, 0);`,
      fixFocus: {
        fromLine: 2,
        toLine: 62
      },
      whatToNotice: [
        "Priorities decide what runs next.",
        "Cancellation prevents execution of a queued task."
      ]
    }
  ],
  code: `/*
Day 37: Cooperative Scheduler
Do labs in order: heap -> chunking -> priorities+cancellation.
*/`,
  recap: {
    takeaways: [
      "Heaps are a practical tool for prioritization.",
      "Chunking + yielding prevents UI freezes.",
      "Schedulers are mini systems: queue, policy, cancellation, yielding."
    ],
    commonMistakes: [
      "Running long loops without yielding.",
      "Using array sort in hot paths.",
      "Forgetting to handle cancellation."
    ],
    nextActions: [
      "Add a max tasks per tick to pump().",
      "Add a deadline/timeSliceMs parameter.",
      "Try integrating scheduler with a fake render loop."
    ]
  }
};
