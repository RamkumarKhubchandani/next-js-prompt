export const day23 = {
  day: 23,
  title: "🔥 Event Emitter & Pub-Sub Pattern",
  intro: "Build Node.js EventEmitter from scratch. Used in React, Redux, Socket.io, and every event-driven system.",
  content: `
<div class="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-200 dark:border-blue-500/30 p-4 rounded-xl mb-6">
<h4 class="text-blue-400 font-bold mb-2">🎯 Where It's Used</h4>
<p class="text-gray-600 dark:text-light-300">Redux (subscribe), React (synthetic events), Node.js (EventEmitter), DOM (addEventListener), Socket.io, RxJS - they all use this pattern!</p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📐 The Pub-Sub Architecture</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-cyan-700 dark:text-cyan-300">
<pre>
┌─────────────────────────────────────────────────────────┐
│                 EVENT EMITTER PATTERN                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   Publisher ──emit('event', data)──▶ Event Emitter      │
│                                          │              │
│                                          ▼              │
│   ┌──────────────────────────────────────────────────┐  │
│   │  events = {                                      │  │
│   │    'click': [handler1, handler2],                │  │
│   │    'submit': [handler3],                         │  │
│   │    'error': [handler4, handler5, handler6]       │  │
│   │  }                                               │  │
│   └──────────────────────────────────────────────────┘  │
│                          │                              │
│          ┌───────────────┼───────────────┐              │
│          ▼               ▼               ▼              │
│     Subscriber1     Subscriber2     Subscriber3         │
│                                                         │
└─────────────────────────────────────────────────────────┘
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔑 Methods to Implement</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">on(event, handler)</code> - Subscribe to event</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">off(event, handler)</code> - Unsubscribe</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">emit(event, ...args)</code> - Trigger event</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">once(event, handler)</code> - Subscribe once</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">removeAllListeners(event)</code> - Clear all</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Advanced Features</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
<div class="bg-white dark:bg-dark-800 p-4 rounded-lg border border-gray-200 dark:border-dark-600">
    <h4 class="font-bold text-yellow-600 dark:text-yellow-400 mb-2">Wildcard Events</h4>
    <p class="text-sm text-gray-600 dark:text-light-300">Subscribe to '*' to receive ALL events</p>
</div>
<div class="bg-white dark:bg-dark-800 p-4 rounded-lg border border-gray-200 dark:border-dark-600">
    <h4 class="font-bold text-yellow-600 dark:text-yellow-400 mb-2">Max Listeners</h4>
    <p class="text-sm text-gray-600 dark:text-light-300">Warn if too many listeners (memory leak detection)</p>
</div>
</div>
            `,
  masteryChecklist: [
    {
      id: "d23-c1",
      text: "I can explain pub-sub vs direct callbacks and why decoupling helps."
    },
    {
      id: "d23-c2",
      text: "I can implement on, off, emit, and once correctly (including correct removal)."
    },
    {
      id: "d23-c3",
      text: "I can prevent emit() iteration bugs by snapshotting listeners."
    },
    {
      id: "d23-c4",
      text: "I can explain how event listeners can cause memory leaks and how to clean up."
    },
    {
      id: "d23-c5",
      text: "I can design an async emit that awaits all listeners if needed."
    }
  ],
  predictions: [
    {
      prompt: "If a listener removes itself during emit, a robust emitter should…",
      options: [
        "Crash (modifying arrays is illegal)",
        "Skip some listeners unpredictably (normal behavior)",
        "Still call all listeners that existed at emit start (by cloning/snapshotting)",
        "Restart emit from the beginning"
      ],
      correctIndex: 2,
      explanation: "Snapshotting the listener list at emit time avoids mid-iteration mutation bugs."
    },
    {
      prompt: "What is the core purpose of an EventEmitter?",
      options: [
        "Make code shorter",
        "Decouple producer from consumers (one-to-many notifications)",
        "Replace async/await",
        "Avoid using objects"
      ],
      correctIndex: 1,
      explanation: "Producers emit events without knowing who listens; subscribers can come and go independently."
    },
    {
      prompt: "once(event, handler) is best implemented by…",
      options: [
        "Setting a global flag",
        "Calling handler twice to confirm it runs",
        "Wrapping handler and removing wrapper after first call",
        "Throwing after first call"
      ],
      correctIndex: 2,
      explanation: "A wrapper calls the handler and immediately unsubscribes itself."
    }
  ],
  checkpoints: [
    {
      prompt: "Why clone/snapshot listeners inside emit()?",
      options: [
        "It makes emit faster",
        "It prevents bugs when listeners add/remove listeners during emit",
        "It allows wildcard events",
        "It prevents exceptions"
      ],
      correctIndex: 1,
      explanation: "Iterating a live array that changes can skip or duplicate calls."
    },
    {
      prompt: "A classic EventEmitter memory leak happens when…",
      options: [
        "You use too many console.logs",
        "You keep adding listeners but never remove them",
        "You emit too often",
        "You use arrow functions"
      ],
      correctIndex: 1,
      explanation: "The emitter retains references to listeners, so forgotten cleanups grow memory usage over time."
    },
    {
      prompt: "Which method is most useful when you only need the first event occurrence?",
      options: [
        "emit",
        "on",
        "once",
        "eventNames"
      ],
      correctIndex: 2,
      explanation: "once auto-unsubscribes after the first emit."
    }
  ],
  labSteps: [
    {
      id: "d23-step-1",
      title: "Bug: once() fires forever",
      subtitle: "Fix by removing the wrapper after first call",
      teacherNote: "Predict: After two emits, how many times should the once handler run?",
      bugCode: `console.clear();

class Emitter {
  constructor() { this.events = Object.create(null); }
  on(evt, fn) { (this.events[evt] ||= []).push(fn); return () => this.off(evt, fn); }
  off(evt, fn) { this.events[evt] = (this.events[evt] || []).filter(f => f !== fn); }
  once(evt, fn) {
    // BUG: doesn't remove, so it behaves like on()
    this.on(evt, fn);
  }
  emit(evt, ...args) { (this.events[evt] || []).forEach(f => f(...args)); }
}

const e = new Emitter();
e.once("ready", (x) => console.log("once ready:", x));
e.emit("ready", 1);
e.emit("ready", 2);`,
      bugFocus: {
        fromLine: 6,
        toLine: 9
      },
      fixCode: `console.clear();

class Emitter {
  constructor() { this.events = Object.create(null); }
  on(evt, fn) { (this.events[evt] ||= []).push(fn); return () => this.off(evt, fn); }
  off(evt, fn) { this.events[evt] = (this.events[evt] || []).filter(f => f !== fn); }
  once(evt, fn) {
    const off = this.on(evt, (...args) => {
      off(); // remove wrapper immediately
      fn(...args);
    });
    return off;
  }
  emit(evt, ...args) { (this.events[evt] || []).forEach(f => f(...args)); }
}

const e = new Emitter();
e.once("ready", (x) => console.log("once ready:", x));
e.emit("ready", 1);
e.emit("ready", 2);`,
      fixFocus: {
        fromLine: 6,
        toLine: 14
      },
      whatToNotice: [
        "once is just on + self-removal.",
        "Returning an unsubscribe function makes cleanup easy."
      ]
    },
    {
      id: "d23-step-2",
      title: "Bug: emit can be non-deterministic",
      subtitle: "Fix by snapshotting listeners before iterating",
      teacherNote: "If listeners add/remove listeners while emitting, you can skip or double-call without a snapshot.",
      bugCode: `console.clear();

class Emitter {
  constructor() { this.events = Object.create(null); }
  on(evt, fn) { (this.events[evt] ||= []).push(fn); return () => this.off(evt, fn); }
  off(evt, fn) { this.events[evt] = (this.events[evt] || []).filter(f => f !== fn); }
  emit(evt, ...args) {
    // BUG: iterating over live array that can change during emit
    (this.events[evt] || []).forEach(f => f(...args));
  }
}

const e = new Emitter();
const offA = e.on("tick", () => { console.log("A"); offA(); });
e.on("tick", () => console.log("B"));
e.on("tick", () => console.log("C"));
e.emit("tick");`,
      bugFocus: {
        fromLine: 6,
        toLine: 9
      },
      fixCode: `console.clear();

class Emitter {
  constructor() { this.events = Object.create(null); }
  on(evt, fn) { (this.events[evt] ||= []).push(fn); return () => this.off(evt, fn); }
  off(evt, fn) { this.events[evt] = (this.events[evt] || []).filter(f => f !== fn); }
  emit(evt, ...args) {
    const snapshot = (this.events[evt] || []).slice();
    snapshot.forEach(f => f(...args));
  }
}

const e = new Emitter();
const offA = e.on("tick", () => { console.log("A"); offA(); });
e.on("tick", () => console.log("B"));
e.on("tick", () => console.log("C"));
e.emit("tick");`,
      fixFocus: {
        fromLine: 6,
        toLine: 10
      },
      whatToNotice: [
        "Snapshotting makes emit deterministic.",
        "This is how mature emitters avoid mid-emit mutation bugs."
      ]
    }
  ],
  code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  Day 23 Live Lab: Build an EventEmitter you can trust                ║
║  Focus: on/off/once + deterministic emit                             ║
╚══════════════════════════════════════════════════════════════════════╝
*/

console.clear();

class EventEmitter {
  constructor() {
    this.events = Object.create(null);
  }

  on(event, listener) {
    if (typeof listener !== "function") throw new TypeError("listener must be a function");
    (this.events[event] ||= []).push(listener);
    return () => this.off(event, listener);
  }

  off(event, listener) {
    const list = this.events[event];
    if (!list) return;
    this.events[event] = list.filter((fn) => fn !== listener && fn._original !== listener);
  }

  once(event, listener) {
    const wrapper = (...args) => {
      this.off(event, wrapper);
      listener(...args);
    };
    wrapper._original = listener;
    return this.on(event, wrapper);
  }

  emit(event, ...args) {
    const list = this.events[event];
    if (!list || list.length === 0) return false;
    const snapshot = list.slice();
    snapshot.forEach((fn) => fn(...args));
    return true;
  }
}

const bus = new EventEmitter();
bus.on("message", (txt) => console.log("message:", txt));
bus.once("ready", () => console.log("ready (once)"));

console.log("Emit ready twice:");
bus.emit("ready");
bus.emit("ready");

console.log("Emit message twice:");
bus.emit("message", "Hello");
bus.emit("message", "World");

console.log("Test: mutation during emit does not skip listeners");
const unsubA = bus.on("tick", () => { console.log("A"); unsubA(); });
bus.on("tick", () => console.log("B"));
bus.on("tick", () => console.log("C"));
bus.emit("tick");`,
  recap: {
    takeaways: [
      "EventEmitter is pub-sub: producers emit events without knowing consumers.",
      "once is implemented by wrapping the handler and removing it after first run.",
      "emit must be deterministic; snapshot listeners to avoid mid-emit mutation bugs.",
      "Always unsubscribe in cleanup to avoid memory leaks (emitters keep references)."
    ],
    commonMistakes: [
      "Implementing once without removal (it becomes on).",
      "Iterating a live listeners array during emit (can skip/double-call).",
      "Forgetting cleanup in long-lived apps."
    ],
    nextActions: [
      "Add emitAsync(event, ...args) that awaits Promise.all of listener results.",
      "Add wildcard or namespaced events if your product needs them."
    ]
  },
  comparison: {
    junior: `// ❌ Basic callback pattern
function onMessage(callback) {
  // Direct callback - no flexibility
  someSource.ondata = callback;
}

// Can't: multiple listeners, remove, once`,
    senior: `// ✅ Full EventEmitter pattern
class EventEmitter {
  on(event, fn) {
    (this.events[event] ??= []).push(fn);
    return this;
  }
  
  emit(event, ...args) {
    this.events[event]?.forEach(fn => fn(...args));
  }
  
  off(event, fn) {
    this.events[event] = 
      this.events[event]?.filter(f => f !== fn);
  }
}`
  },
  interview: {
    questions: [
      {
        q: "How do you implement once()?",
        a: "Create a wrapper function that calls the original listener, then immediately calls off() to remove itself. Store reference to original for off() matching."
      },
      {
        q: "Why clone the listeners array before emitting?",
        a: "A listener might call off() or on() during execution, modifying the array while iterating. Cloning prevents bugs from mid-iteration mutation."
      },
      {
        q: "How would you implement async emit?",
        a: "Return a Promise that resolves when all listeners complete. Use Promise.all() with listeners that may return promises. Useful for middleware patterns."
      },
      {
        q: "What's a memory leak concern with EventEmitter?",
        a: "Forgetting to call off() for listeners, especially in React useEffect without cleanup. Node.js warns at 10+ listeners. Always unsubscribe in cleanup."
      }
    ]
  }
};
