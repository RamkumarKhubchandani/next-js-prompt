export const day39 = {
  day: 39,
  title: "📦 State Store + Pub-Sub: Redux-lite with Selectors",
  intro: "You will build a tiny state store: subscribe, setState, and selectors. This teaches the core patterns behind Redux, Zustand, and many pub-sub architectures.",
  content: `
<div class="bg-gradient-to-r from-lime-500/20 to-emerald-500/20 border border-lime-500/30 p-4 rounded-xl mb-6">
  <h4 class="text-lime-300 font-bold mb-2">🎯 Outcome</h4>
  <p class="text-gray-600 dark:text-light-300">You will build <span class="text-yellow-700 dark:text-yellow-300 font-bold">createStore</span> with subscribe/unsubscribe and selector subscriptions (only re-run when selected state changes).</p>
</div>
            `,
  aiSession: {
    start: {
      title: "Fix the Over-Notification Bug",
      subTitle: "Subscribers are getting notified even when their data hasn't changed. Implement a selector-based subscription.",
      intro: "In high-performance apps, re-rendering entirely on every state change is too slow. We need 'selectors' that check if the specific slice of state data has actually changed.",
      buggyCode: `
function createStore(initialState) {
  let state = initialState;
  const listeners = new Set();

  return {
    getState: () => state,
    setState: (update) => {
      state = { ...state, ...update };
      listeners.forEach(l => l(state));
    },
    // ❌ Bug: No way to check if specific data changed
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  };
}

const store = createStore({ user: "Alice", count: 0 });

// Listener for COUNT only
store.subscribe((state) => {
  console.log("Count listener ran (should not run if only user changes)");
});

store.setState({ user: "Bob" }); // Changing USER triggers COUNT listener?
`,
      solutionCode: `
function createStore(initialState) {
  let state = initialState;
  const listeners = new Set();

  return {
    getState: () => state,
    setState: (update) => {
      state = { ...state, ...update };
      listeners.forEach(l => l()); // Notify plain listeners
    },
    subscribeSelector: (selector, callback) => {
      let prevValue = selector(state);
      const listener = () => {
        const nextValue = selector(state);
        // Only fire if value CHANGED
        if (nextValue !== prevValue) {
          prevValue = nextValue;
          callback(nextValue);
        }
      };
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  };
}

const store = createStore({ user: "Alice", count: 0 });

store.subscribeSelector(
  s => s.count, 
  val => console.log("Count listener ran:", val)
);

console.log("Updating user...");
store.setState({ user: "Bob" }); // Should NOT log
console.log("Updating count...");
store.setState({ count: 1 });    // SHOULD log
`,
      verifyOutput: (output) => {
        const logs = output.join("\n");
        return logs.includes("Updating user...") &&
          !logs.includes("Count listener ran (should not run") &&
          logs.includes("Updating count...") &&
          logs.includes("Count listener ran:");
      },
      verifyCode: (code) => {
        return (code.includes("!==") || code.includes("Object.is")) && code.includes("selector(state)");
      },
      successMessage: "Perfect! You've implemented the core optimization of Redux/Zustand: checking for equality before notifying.",
      hint: "Store the `prevValue` in a closure. inside the listener, calculate `nextValue = selector(state)`. Compare them."
    }
  },
  masteryChecklist: [
    {
      id: "d39-c1",
      text: "I can explain pub-sub in plain language."
    },
    {
      id: "d39-c2",
      text: "I can implement subscribe/unsubscribe safely."
    },
    {
      id: "d39-c3",
      text: "I can build createStore(getState, setState, subscribe)."
    },
    {
      id: "d39-c4",
      text: "I can add selectors with shallow equality to prevent unnecessary updates."
    },
    {
      id: "d39-c5",
      text: "I can explain why state normalization and immutability help."
    }
  ],
  predictions: [
    {
      prompt: "In pub-sub, emit/notify should usually…",
      options: [
        "Iterate the live listeners array directly",
        "Snapshot listeners before iterating",
        "Delete listeners while iterating",
        "Require React"
      ],
      correctIndex: 1,
      explanation: "Snapshot avoids issues when listeners unsubscribe during emit."
    },
    {
      prompt: "A selector subscription helps by…",
      options: [
        "Making state mutable",
        "Notifying only when the selected slice changes",
        "Making all updates global",
        "Disabling renders"
      ],
      correctIndex: 1,
      explanation: "It reduces unnecessary work."
    },
    {
      prompt: "Immutable updates are helpful because…",
      options: [
        "They are always faster",
        "They make change detection simple (reference equality)",
        "They prevent network requests",
        "They remove async bugs"
      ],
      correctIndex: 1,
      explanation: "If references change only when data changes, comparing is easy."
    }
  ],
  checkpoints: [
    {
      prompt: "The minimal store API is…",
      options: [
        "dispatch only",
        "getState + setState + subscribe",
        "render + useEffect",
        "HTTP + WebSocket"
      ],
      correctIndex: 1,
      explanation: "Those three form the core."
    },
    {
      prompt: "Why snapshot listeners?",
      options: [
        "For aesthetics",
        "So subscribe/unsubscribe during emit does not break iteration",
        "To reduce memory",
        "To improve CSS"
      ],
      correctIndex: 1,
      explanation: "It makes emit deterministic."
    },
    {
      prompt: "shallowEqual compares…",
      options: [
        "Nested deep structures",
        "Top-level keys/values only",
        "Only arrays",
        "Only functions"
      ],
      correctIndex: 1,
      explanation: "Shallow equality is cheap and often good enough for selectors."
    }
  ],
  labSteps: [
    {
      id: "d39-step-1",
      title: "Build a safe pub-sub (snapshot listeners)",
      subtitle: "on/off/emit minimal",
      teacherNote: "We keep it tiny and correct before adding the store.",
      bugCode: `console.clear();

function createEmitterBug() {
  var listeners = [];
  return {
    on: function (fn) { listeners.push(fn); },
    off: function (fn) { listeners = listeners.filter(function (x) { return x !== fn; }); },
    emit: function (v) { listeners.forEach(function (fn) { fn(v); }); } // ❌ iterating live array
  };
}`,
      bugFocus: {
        fromLine: 2,
        toLine: 9
      },
      fixCode: `console.clear();

function createEmitter() {
  var listeners = [];
  return {
    on: function (fn) { listeners.push(fn); return function () { this.off(fn); }.bind(this); },
    off: function (fn) { listeners = listeners.filter(function (x) { return x !== fn; }); },
    emit: function (v) {
      var snap = listeners.slice();
      for (var i = 0; i < snap.length; i++) snap[i](v);
    }
  };
}

var e = createEmitter();
var unsub = e.on(function (v) { console.log("a", v); unsub(); });
e.on(function (v) { console.log("b", v); });
e.emit(1);
e.emit(2);`,
      fixFocus: {
        fromLine: 2,
        toLine: 22
      },
      whatToNotice: [
        "Unsubscribing during emit does not break other listeners.",
        "Returning unsubscribe is convenient."
      ]
    },
    {
      id: "d39-step-2",
      title: "Create a store on top of pub-sub",
      subtitle: "getState / setState / subscribe",
      teacherNote: "This is the core architecture used by many state libraries.",
      bugCode: `console.clear();

// ❌ Bug: updates do not notify subscribers
function createStoreBug(initial) {
  var state = initial;
  return {
    getState: function () { return state; },
    setState: function (patch) { state = Object.assign({}, state, patch); },
    subscribe: function () { return function () {}; }
  };
}`,
      bugFocus: {
        fromLine: 2,
        toLine: 10
      },
      fixCode: `console.clear();

function createEmitter() {
  var listeners = [];
  return {
    on: function (fn) { listeners.push(fn); return function () { this.off(fn); }.bind(this); },
    off: function (fn) { listeners = listeners.filter(function (x) { return x !== fn; }); },
    emit: function () { var snap = listeners.slice(); for (var i = 0; i < snap.length; i++) snap[i](); }
  };
}

function createStore(initial) {
  var state = initial;
  var e = createEmitter();
  return {
    getState: function () { return state; },
    setState: function (patch) {
      state = Object.assign({}, state, patch);
      e.emit();
    },
    subscribe: function (fn) { return e.on(fn); }
  };
}

var store = createStore({ count: 0, name: "Asha" });
store.subscribe(function () { console.log("changed:", store.getState()); });
store.setState({ count: 1 });
store.setState({ name: "Ravi" });`,
      fixFocus: {
        fromLine: 2,
        toLine: 32
      },
      whatToNotice: [
        "setState emits after updating state.",
        "Subscribers can read the new state via getState."
      ]
    },
    {
      id: "d39-step-3",
      title: "Selectors: subscribe only to what you need",
      subtitle: "Avoid unnecessary updates",
      teacherNote: "This pattern is how you keep apps fast at scale.",
      bugCode: `console.clear();

// ❌ Bug: every subscriber runs on every change
// We'll fix by adding subscribeSelector.`,
      bugFocus: {
        fromLine: 1,
        toLine: 3
      },
      fixCode: `console.clear();

function shallowEqual(a, b) {
  if (Object.is(a, b)) return true;
  if (!a || !b) return false;
  var aKeys = Object.keys(a), bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;
  for (var i = 0; i < aKeys.length; i++) {
    var k = aKeys[i];
    if (!Object.prototype.hasOwnProperty.call(b, k) || !Object.is(a[k], b[k])) return false;
  }
  return true;
}

function createEmitter() {
  var listeners = [];
  return {
    on: function (fn) { listeners.push(fn); return function () { this.off(fn); }.bind(this); },
    off: function (fn) { listeners = listeners.filter(function (x) { return x !== fn; }); },
    emit: function () { var snap = listeners.slice(); for (var i = 0; i < snap.length; i++) snap[i](); }
  };
}

function createStore(initial) {
  var state = initial;
  var e = createEmitter();
  return {
    getState: function () { return state; },
    setState: function (patch) { state = Object.assign({}, state, patch); e.emit(); },
    subscribe: function (fn) { return e.on(fn); },
    subscribeSelector: function (selector, onChange, eq) {
      var equal = eq || Object.is;
      var prev = selector(state);
      return e.on(function () {
        var next = selector(state);
        if (!equal(prev, next)) { prev = next; onChange(next); }
      });
    }
  };
}

var store = createStore({ user: { name: "Asha", role: "dev" }, count: 0 });
store.subscribeSelector(function (s) { return s.count; }, function (v) { console.log("count changed:", v); });
store.subscribeSelector(function (s) { return s.user; }, function (u) { console.log("user changed:", u); }, shallowEqual);

store.setState({ count: 1 });
store.setState({ user: { name: "Asha", role: "dev" } }); // shallowEqual prevents log
store.setState({ user: { name: "Asha", role: "lead" } });`,
      fixFocus: {
        fromLine: 2,
        toLine: 55
      },
      whatToNotice: [
        "Selector subscriptions reduce unnecessary updates.",
        "Equality choice matters (Object.is vs shallowEqual)."
      ]
    }
  ],
  code: `/*
Day 39: State Store + Pub-Sub
Do labs in order: emitter -> store -> selectors.
*/`,
  recap: {
    takeaways: [
      "Pub-sub is the backbone of many architectures.",
      "A store is state + pub-sub + update API.",
      "Selectors prevent unnecessary work and keep apps responsive."
    ],
    commonMistakes: [
      "Iterating live listener arrays during emit.",
      "Mutating nested state and making change detection hard.",
      "Subscribing to the entire state when you only need a slice."
    ],
    nextActions: [
      "Add batching: group multiple setState calls into one emit.",
      "Add middleware: log changes or validate updates.",
      "Add immutable helpers for nested updates."
    ]
  }
};
