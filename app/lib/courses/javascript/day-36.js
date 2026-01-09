export const day36 = {
  day: 36,
  title: "🌊 Async Iterators & Streams: for-await, async generators, pipelines",
  intro: "Async iterators let you consume data over time (pages, events, streams) with clean code. Today you build small async generators and utilities to process them.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 36: Async Iterators. These are like Arrays, but the items arrive over time (like a stream)."
      },
      {
        type: "talk",
        message: "You can't loop over them with a normal `for..of` because the values are Promises."
      },
      {
        type: "challenge",
        instruction: "Fix the Loop. This code fails because `for..of` expects synchronous values, but the generator yields Promises (it's async). Change the loop to `for await..of` to properly consume the stream.",
        buggyCode: `async function* numberStream() {
  yield 1;
  yield 2;
  yield 3;
}

async function consume() {
  // ❌ Start of error: numberStream() is async!
  for (const num of numberStream()) {
    console.log(num);
  }
}

consume();`,
        solutionCode: `async function* numberStream() {
  yield 1;
  yield 2;
  yield 3;
}

async function consume() {
  // ✅ Async Iteration
  for await (const num of numberStream()) {
    console.log(num);
  }
}

consume();`,
        verifyOutput: "1\n2\n3", // or just "1" check
        verifyCode: "for await",
        successMessage: "Correct. `for await...of` is the special syntax designed to consume Async Iterables. It waits for each Promise to resolve before entering the loop body.",
        hint: "Add `await` after `for`: `for await (const num of numberStream())`."
      }
    ]
  },
  content: `
<div class="bg-gradient-to-r from-cyan-500/20 to-sky-500/20 border border-cyan-500/30 p-4 rounded-xl mb-6">
  <h4 class="text-cyan-700 dark:text-cyan-300 font-bold mb-2">🎯 Outcome</h4>
  <p class="text-gray-600 dark:text-light-300">You will write an <span class="text-yellow-700 dark:text-yellow-300 font-bold">async generator</span>, process it with <span class="text-yellow-700 dark:text-yellow-300 font-bold">for-await</span>, and build an <span class="text-yellow-700 dark:text-yellow-300 font-bold">asyncMap</span> pipeline.</p>
</div>
            `,
  masteryChecklist: [
    {
      id: "d36-c1",
      text: "I can explain what an async iterator produces over time (values + promises)."
    },
    {
      id: "d36-c2",
      text: "I can write an async generator that yields values with delays."
    },
    {
      id: "d36-c3",
      text: "I can consume an async iterator using for-await."
    },
    {
      id: "d36-c4",
      text: "I can build asyncMap(asyncIterable, mapper)."
    },
    {
      id: "d36-c5",
      text: "I can use async generators for pagination (yield pages)."
    }
  ],
  predictions: [
    {
      prompt: "for-await-of is used for…",
      options: [
        "Arrays only",
        "Async iterables that yield values over time",
        "Objects only",
        "Promises only"
      ],
      correctIndex: 1,
      explanation: "It consumes async iterables (including async generators)."
    },
    {
      prompt: "An async generator function is declared with…",
      options: [
        "function*()",
        "async function()",
        "async function*()",
        "function async*()"
      ],
      correctIndex: 2,
      explanation: "async function* creates an async generator."
    },
    {
      prompt: "Why are async iterators useful for pagination?",
      options: [
        "They remove the need for HTTP",
        "They let you model pages as a stream you consume sequentially",
        "They make queries synchronous",
        "They replace caching"
      ],
      correctIndex: 1,
      explanation: "You can yield each page and process it as it arrives."
    }
  ],
  checkpoints: [
    {
      prompt: "An async iterator must implement…",
      options: [
        "toString",
        "Symbol.asyncIterator",
        "Symbol.iterator only",
        "valueOf"
      ],
      correctIndex: 1,
      explanation: "Async iterables expose Symbol.asyncIterator."
    },
    {
      prompt: "A generator yields values via…",
      options: [
        "return",
        "yield",
        "await",
        "throw"
      ],
      correctIndex: 1,
      explanation: "yield produces values one at a time."
    },
    {
      prompt: "In a streaming pipeline, you often prefer…",
      options: [
        "Loading everything then processing",
        "Processing items as they arrive",
        "Blocking the main thread",
        "Infinite recursion"
      ],
      correctIndex: 1,
      explanation: "Streaming reduces memory and improves responsiveness."
    }
  ],
  labSteps: [
    {
      id: "d36-step-1",
      title: "Write your first async generator",
      subtitle: "Yield values over time",
      teacherNote: "We start tiny: yield 3 values with delays.",
      bugCode: `console.clear();

// ❌ Bug: this returns once, it does not stream values
async function numbersBug() {
  return [1, 2, 3];
}

(async function () {
  var out = await numbersBug();
  console.log("got:", out);
})();`,
      bugFocus: {
        fromLine: 2,
        toLine: 12
      },
      fixCode: `console.clear();

function sleep(ms) {
  return new Promise(function (r) { setTimeout(r, ms); });
}

async function* numbers() {
  yield 1;
  await sleep(100);
  yield 2;
  await sleep(100);
  yield 3;
}

(async function () {
  for await (var n of numbers()) {
    console.log("stream:", n);
  }
})();`,
      fixFocus: {
        fromLine: 2,
        toLine: 22
      },
      whatToNotice: [
        "You can produce values over time with yield + await.",
        "for-await consumes the stream sequentially."
      ]
    },
    {
      id: "d36-step-2",
      title: "Build asyncMap for async iterables",
      subtitle: "Transform stream items one by one",
      teacherNote: "This is the async version of Array.map, but streaming.",
      bugCode: `console.clear();

// ❌ Bug: map expects arrays; async iterables are different
function asyncMapBug(iterable, mapper) {
  return iterable.map(mapper);
}`,
      bugFocus: {
        fromLine: 2,
        toLine: 6
      },
      fixCode: `console.clear();

async function* asyncMap(iterable, mapper) {
  var idx = 0;
  for await (var item of iterable) {
    yield mapper(item, idx++);
  }
}

async function* numbers() {
  yield 1; yield 2; yield 3;
}

(async function () {
  for await (var x of asyncMap(numbers(), function (n) { return n * 10; })) {
    console.log("mapped:", x);
  }
})();`,
      fixFocus: {
        fromLine: 2,
        toLine: 20
      },
      whatToNotice: [
        "asyncMap yields transformed values as they come.",
        "No need to buffer the whole list."
      ]
    },
    {
      id: "d36-step-3",
      title: "Pagination as a stream",
      subtitle: "Yield pages, then yield items",
      teacherNote: "This is a powerful pattern for data fetching layers.",
      bugCode: `console.clear();

// ❌ Bug: loads all pages first, then processes
function fetchAllPagesBug() {
  return Promise.resolve([[1, 2], [3, 4]]);
}`,
      bugFocus: {
        fromLine: 2,
        toLine: 6
      },
      fixCode: `console.clear();

function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

async function* pages() {
  // fake pages arriving over time
  await sleep(50);
  yield [1, 2];
  await sleep(50);
  yield [3, 4];
}

async function* itemsFromPages(pageStream) {
  for await (var page of pageStream) {
    for (var i = 0; i < page.length; i++) yield page[i];
  }
}

(async function () {
  for await (var x of itemsFromPages(pages())) {
    console.log("item:", x);
  }
})();`,
      fixFocus: {
        fromLine: 2,
        toLine: 28
      },
      whatToNotice: [
        "You can process as data arrives (lower memory, better responsiveness).",
        "This is a clean mental model for pagination and streams."
      ]
    }
  ],
  code: `/*
Day 36: Async Iterators & Streams
Do labs in order. Focus on the mental model: values over time.
*/`,
  recap: {
    takeaways: [
      "Async generators let you produce values over time.",
      "for-await makes consuming streams readable.",
      "Streaming pipelines avoid buffering everything."
    ],
    commonMistakes: [
      "Treating async iterables like arrays.",
      "Forgetting to wrap for-await in an async function.",
      "Buffering everything when streaming would be simpler."
    ],
    nextActions: [
      "Build asyncFilter similar to asyncMap.",
      "Stream paginated results into a UI list.",
      "Combine pMap (Day 35) with streams carefully (backpressure)."
    ]
  }
};
