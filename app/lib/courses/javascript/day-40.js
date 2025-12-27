export const day40 = {
  day: 40,
  title: "🏆 Patterns Toolkit: Middleware Pipeline + Plugins (Final Boss, Step-by-Step)",
  intro: "You now have the building blocks. Today you combine patterns into a tiny framework: middleware pipeline + plugin hooks + safe error handling. This is both interview-worthy and production-relevant.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">0) The "Assembly Line" Mental Model</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Imagine a car factory assembly line.
</p>
<div class="grid md:grid-cols-2 gap-6 mb-8">
  <div class="bg-white dark:bg-dark-800 p-5 rounded-xl border border-gray-200 dark:border-dark-600">
    <h4 class="font-bold text-brand-primary mb-2">Middleware (The Stations)</h4>
    <p class="text-sm text-gray-600 dark:text-light-300">
      The car (request) moves down the line. Station 1 adds wheels (auth). Station 2 paints it (logging). Station 3 installs the engine (database).
      If Station 1 sees a defect (invalid token), it pulls the cord and stops the line.
    </p>
  </div>
  <div class="bg-white dark:bg-dark-800 p-5 rounded-xl border border-gray-200 dark:border-dark-600">
    <h4 class="font-bold text-purple-500 mb-2">Plugins (The Custom Options)</h4>
    <p class="text-sm text-gray-600 dark:text-light-300">
      Plugins are like "optional packages". You can hook into the process: "When the car is painted (event), also add racing stripes (plugin action)."
    </p>
  </div>
</div>

<div class="bg-gradient-to-r from-rose-500/20 to-red-500/20 border border-rose-500/30 p-4 rounded-xl mb-6">
  <h4 class="text-rose-700 dark:text-rose-300 font-bold mb-2">🎯 Outcome</h4>
  <p class="text-gray-600 dark:text-light-300">You will build a <span class="text-yellow-700 dark:text-yellow-300 font-bold">middleware pipeline</span> (like Koa/Express style) and a <span class="text-yellow-700 dark:text-yellow-300 font-bold">plugin system</span> (hooks).</p>
</div>

<div class="mb-8 p-5 rounded-xl border border-blue-500/30 bg-blue-500/5">
  <h4 class="font-bold text-blue-700 dark:text-blue-300 mb-3 flex items-center gap-2">
    <span class="text-xl">🏛️</span> Architect's Note: The "Gateway" Pattern
  </h4>
  <p class="text-sm text-gray-700 dark:text-light-200 mb-4">
    This isn't just for small apps. This is exactly how <strong>API Gateways</strong> (like Kong or Zuul) work in microservices.
  </p>
  <div class="bg-white dark:bg-dark-900 p-4 rounded-lg border border-gray-200 dark:border-dark-600 font-mono text-xs text-blue-700 dark:text-blue-300">
    Request ──▶ [ Auth Middleware ] ──▶ [ Rate Limit Middleware ] ──▶ [ Service A / Service B ]
  </div>
  <p class="mt-4 text-xs text-blue-800 dark:text-blue-200 font-bold">
    Why? Because you can update the "Auth" logic in one place (the gateway) without redeploying 50 different microservices.
  </p>
</div>
            `,
  masteryChecklist: [
    {
      id: "d40-c1",
      text: "I can explain middleware as 'a chain where each step can run before/after next()'."
    },
    {
      id: "d40-c2",
      text: "I can build compose(middlewares) to run them in order."
    },
    {
      id: "d40-c3",
      text: "I can implement a plugin hook system (on(event), emit(event))."
    },
    {
      id: "d40-c4",
      text: "I can handle errors in the pipeline and still produce a safe result."
    },
    {
      id: "d40-c5",
      text: "I can describe how these patterns power routers, loggers, auth, metrics, and caching."
    }
  ],
  predictions: [
    {
      prompt: "In middleware, if a middleware calls next() twice, what should happen?",
      options: [
        "It should work fine",
        "It should throw an error",
        "It should run faster",
        "It should skip other middleware"
      ],
      correctIndex: 1,
      explanation: "Calling next twice usually indicates a bug; good compose() guards against it."
    },
    {
      prompt: "A plugin system is basically…",
      options: [
        "A database",
        "Pub-sub with named hooks/events",
        "A CSS framework",
        "A garbage collector"
      ],
      correctIndex: 1,
      explanation: "Plugins attach to hooks/events and run when triggered."
    },
    {
      prompt: "A good error strategy in pipelines is…",
      options: [
        "Ignore errors",
        "Catch at the top and return a safe error response/object",
        "Always crash",
        "Convert errors to strings everywhere"
      ],
      correctIndex: 1,
      explanation: "Centralized error handling is predictable and safe."
    }
  ],
  checkpoints: [
    {
      prompt: "compose(middlewares) returns…",
      options: [
        "A number",
        "A function that runs the chain",
        "An array",
        "A Map"
      ],
      correctIndex: 1,
      explanation: "compose returns a runner function."
    },
    {
      prompt: "Plugins help by…",
      options: [
        "Reducing modularity",
        "Extending behavior without editing core logic",
        "Preventing async",
        "Removing tests"
      ],
      correctIndex: 1,
      explanation: "Hooks let you add features without modifying core."
    },
    {
      prompt: "The most common middleware use-cases are…",
      options: [
        "Sorting arrays",
        "Logging/auth/metrics/caching",
        "DOM painting",
        "Binary encoding"
      ],
      correctIndex: 1,
      explanation: "Middleware is ideal for cross-cutting concerns."
    }
  ],
  labSteps: [
    {
      id: "d40-step-1",
      title: "Compose middleware (with next() guard)",
      subtitle: "Build the runner correctly",
      teacherNote: "We implement compose in a small, readable way.",
      bugCode: `console.clear();

// ❌ Bug: no guard, next can be called multiple times
function composeBug(middlewares) {
  return function (ctx) {
    var i = 0;
    function next() {
      var fn = middlewares[i++];
      if (!fn) return Promise.resolve();
      return Promise.resolve(fn(ctx, next));
    }
    return next();
  };
}`,
      bugFocus: {
        fromLine: 2,
        toLine: 13
      },
      fixCode: `console.clear();

function compose(middlewares) {
  return function (ctx) {
    var index = -1;
    function dispatch(i) {
      if (i <= index) return Promise.reject(new Error("next called multiple times"));
      index = i;
      var fn = middlewares[i];
      if (!fn) return Promise.resolve();
      return Promise.resolve(fn(ctx, function next() { return dispatch(i + 1); }));
    }
    return dispatch(0);
  };
}

var logMw = function (ctx, next) {
  ctx.logs.push("before");
  return next().then(function () { ctx.logs.push("after"); });
};
var addMw = function (ctx, next) {
  ctx.value += 1;
  return next();
};

var run = compose([logMw, addMw]);
var ctx = { value: 0, logs: [] };
run(ctx).then(function () { console.log(ctx); });`,
      fixFocus: {
        fromLine: 2,
        toLine: 34
      },
      whatToNotice: [
        "Middleware can do work before and after next().",
        "The guard prevents subtle double-next bugs."
      ]
    },
    {
      id: "d40-step-2",
      title: "Add plugins (hook system)",
      subtitle: "on(event) and emit(event)",
      teacherNote: "Plugins let you extend behavior without modifying core.",
      bugCode: `console.clear();

// ❌ Bug: only supports one listener per event
function createHooksBug() {
  var map = {};
  return {
    on: function (name, fn) { map[name] = fn; },
    emit: function (name, payload) { if (map[name]) map[name](payload); }
  };
}`,
      bugFocus: {
        fromLine: 2,
        toLine: 10
      },
      fixCode: `console.clear();

function createHooks() {
  var map = new Map();
  return {
    on: function (name, fn) {
      var arr = map.get(name) || [];
      arr.push(fn);
      map.set(name, arr);
      return function () {
        var cur = map.get(name) || [];
        map.set(name, cur.filter(function (x) { return x !== fn; }));
      };
    },
    emit: function (name, payload) {
      var arr = map.get(name) || [];
      var snap = arr.slice();
      for (var i = 0; i < snap.length; i++) snap[i](payload);
    }
  };
}

var hooks = createHooks();
hooks.on("request:start", function (p) { console.log("start", p); });
hooks.on("request:start", function (p) { console.log("metrics", p.id); });
hooks.emit("request:start", { id: 1 });`,
      fixFocus: {
        fromLine: 2,
        toLine: 31
      },
      whatToNotice: [
        "Multiple listeners per hook are supported.",
        "Snapshot keeps emit deterministic."
      ]
    },
    {
      id: "d40-step-3",
      title: "Combine: app runner with middleware + hooks + error handling",
      subtitle: "A tiny framework",
      teacherNote: "This is the final integration: modular, testable, extensible.",
      bugCode: `console.clear();

// ❌ Bug: no error handling and no extension points
function createAppBug() {
  return { run: function () { throw new Error("boom"); } };
}`,
      bugFocus: {
        fromLine: 2,
        toLine: 6
      },
      fixCode: `console.clear();

function createHooks() {
  var map = new Map();
  return {
    on: function (name, fn) {
      var arr = map.get(name) || [];
      arr.push(fn);
      map.set(name, arr);
      return function () { map.set(name, (map.get(name) || []).filter(function (x) { return x !== fn; })); };
    },
    emit: function (name, payload) {
      var arr = map.get(name) || [];
      var snap = arr.slice();
      for (var i = 0; i < snap.length; i++) snap[i](payload);
    }
  };
}

function compose(middlewares) {
  return function (ctx) {
    var index = -1;
    function dispatch(i) {
      if (i <= index) return Promise.reject(new Error("next called multiple times"));
      index = i;
      var fn = middlewares[i];
      if (!fn) return Promise.resolve();
      return Promise.resolve(fn(ctx, function () { return dispatch(i + 1); }));
    }
    return dispatch(0);
  };
}

function createApp() {
  var hooks = createHooks();
  var mws = [];
  return {
    use: function (mw) { mws.push(mw); },
    on: hooks.on,
    run: function (ctx) {
      var runner = compose(mws);
      hooks.emit("run:start", ctx);
      return runner(ctx)
        .then(function () { hooks.emit("run:success", ctx); return ctx; })
        .catch(function (err) {
          hooks.emit("run:error", { err: err, ctx: ctx });
          return { ok: false, error: err.message };
        });
    }
  };
}

var app = createApp();
app.on("run:start", function (ctx) { console.log("start", ctx.id); });
app.on("run:error", function (p) { console.log("error", p.err.message); });

app.use(function (ctx, next) {
  ctx.logs.push("mw1");
  return next();
});
app.use(function () { throw new Error("boom"); });

app.run({ id: 1, logs: [] }).then(function (res) { console.log("result:", res); });`,
      fixFocus: {
        fromLine: 2,
        toLine: 74
      },
      whatToNotice: [
        "Errors are caught and returned as a safe result.",
        "Hooks allow logging/metrics without editing core runner."
      ]
    }
  ],
  code: `/*
Day 40: Patterns Toolkit
Do labs in order: compose -> hooks -> combine into createApp().
*/`,
  recap: {
    takeaways: [
      "Middleware pipelines model cross-cutting concerns cleanly.",
      "Plugins/hooks enable extension without modifying core code.",
      "Guardrails (next guard, error boundary) turn patterns into reliable systems."
    ],
    commonMistakes: [
      "Calling next multiple times.",
      "Mutating listeners while emitting (no snapshot).",
      "Letting errors crash without a top-level boundary."
    ],
    nextActions: [
      "Add a timing middleware and emit duration metrics via hooks.",
      "Add a caching middleware in front of a fake handler.",
      "Write one unit test for compose() next-guard behavior."
    ]
  }
};
