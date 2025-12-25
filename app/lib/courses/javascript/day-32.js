export const day32 = {
  day: 32,
  title: "🔥 System Design for Frontend",
  intro: "The final boss. Design scalable frontend architectures like a senior engineer.",
  content: `
<div class="bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30 p-4 rounded-xl mb-6">
<h4 class="text-violet-400 font-bold mb-2">🎯 Staff/Principal Level</h4>
<p class="text-gray-600 dark:text-light-300">Frontend system design is now asked at senior+ levels. Master these concepts to land top roles!</p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📋 Common Interview Topics</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">Design Twitter Feed</code></li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">Design Google Docs</code></li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">Design Autocomplete</code></li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">Design Image Gallery</code></li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">Design Chat Application</code></li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🏗️ The Framework (RADIO)</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-cyan-700 dark:text-cyan-300">
<pre>
┌─────────────────────────────────────────────────────────────────┐
│                     RADIO FRAMEWORK                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  R - Requirements    What exactly are we building?              │
│  A - Architecture    Component hierarchy, data flow             │
│  D - Data Model      State shape, API contracts                 │
│  I - Interface       API design, component props                │
│  O - Optimizations   Performance, caching, edge cases           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Key Considerations</h3>
<div class="grid md:grid-cols-3 gap-4 mb-6">
<div class="bg-white dark:bg-dark-800 p-4 rounded-lg border border-gray-200 dark:border-dark-600">
    <h4 class="font-bold text-blue-400 mb-2">State Management</h4>
    <p class="text-sm text-gray-600 dark:text-light-300">Local vs global, server state, cache invalidation</p>
</div>
<div class="bg-white dark:bg-dark-800 p-4 rounded-lg border border-gray-200 dark:border-dark-600">
    <h4 class="font-bold text-green-600 dark:text-green-400 mb-2">Performance</h4>
    <p class="text-sm text-gray-600 dark:text-light-300">Virtualization, lazy loading, code splitting</p>
</div>
<div class="bg-white dark:bg-dark-800 p-4 rounded-lg border border-gray-200 dark:border-dark-600">
    <h4 class="font-bold text-purple-400 mb-2">Real-time</h4>
    <p class="text-sm text-gray-600 dark:text-light-300">WebSocket vs polling, optimistic updates</p>
</div>
</div>
            `,
  masteryChecklist: [
    {
      id: "d32-c1",
      text: "I can use RADIO (Requirements, Architecture, Data, Interface, Optimizations) to structure answers."
    },
    {
      id: "d32-c2",
      text: "I can ask clarifying questions and separate functional vs non-functional requirements."
    },
    {
      id: "d32-c3",
      text: "I can propose a state model and API contract (pagination, normalization, caching)."
    },
    {
      id: "d32-c4",
      text: "I can discuss performance strategies (virtualization, code-splitting, caching, memoization)."
    },
    {
      id: "d32-c5",
      text: "I can explain real-time and offline tradeoffs (WS/SSE/polling, service worker, IndexedDB)."
    }
  ],
  predictions: [
    {
      prompt: "For infinite scroll feeds, which pagination is usually best at scale?",
      options: [
        "Offset-based pagination",
        "Cursor-based pagination",
        "No pagination",
        "Random sampling"
      ],
      correctIndex: 1,
      explanation: "Cursor-based avoids duplicates/holes when data changes and performs better at scale."
    },
    {
      prompt: "To render 100k feed items efficiently in the UI, the key technique is…",
      options: [
        "Bigger server",
        "Virtualization/windowing",
        "More CSS",
        "Avoid JSON"
      ],
      correctIndex: 1,
      explanation: "Virtualization renders only what is visible."
    },
    {
      prompt: "For real-time new items, a common UX pattern is…",
      options: [
        "Always prepend immediately",
        "Show a 'new items' toast and merge on click",
        "Disable real-time",
        "Reload page every 2s"
      ],
      correctIndex: 1,
      explanation: "Prepending can jump the scroll; batching improves UX."
    }
  ],
  checkpoints: [
    {
      prompt: "RADIO 'D' stands for…",
      options: [
        "Deployment",
        "Data model",
        "Design tokens",
        "Debugging"
      ],
      correctIndex: 1,
      explanation: "Data model includes state shape, normalization, and API contracts."
    },
    {
      prompt: "Why is cursor pagination preferred over offset for feeds?",
      options: [
        "It is required by React",
        "Offsets break when inserts/deletes happen; cursors are stable",
        "Offsets are slower in JavaScript",
        "Offsets cannot be cached"
      ],
      correctIndex: 1,
      explanation: "Offsets can skip/duplicate items when the dataset changes."
    },
    {
      prompt: "A normalized state shape for items usually means…",
      options: [
        "Storing only arrays",
        "Storing byId map + allIds array",
        "Storing everything in localStorage",
        "Storing raw HTML"
      ],
      correctIndex: 1,
      explanation: "Normalization makes updates and lookups predictable and efficient."
    }
  ],
  labSteps: [
    {
      id: "d32-step-1",
      title: "Requirements drill: clarify before designing",
      subtitle: "Split functional and non-functional requirements",
      teacherNote: "Senior signal: you ask the right questions before drawing boxes.",
      bugCode: `console.clear();

// ❌ Vague requirement statement:
// "Design a Twitter feed"`,
      bugFocus: {
        fromLine: 2,
        toLine: 4
      },
      fixCode: `console.clear();

// ✅ Clarify:
var requirements = {
  functional: [
    "View feed items (text, media)",
    "Infinite scroll",
    "Like/retweet/reply",
    "Compose new item",
    "Real-time new items"
  ],
  nonFunctional: [
    "Handles large lists (virtualization)",
    "Fast cold start (code-splitting, caching)",
    "Accessible + mobile responsive",
    "Offline read support (optional)"
  ]
};

console.log(requirements);`,
      fixFocus: {
        fromLine: 2,
        toLine: 22
      },
      whatToNotice: [
        "Non-functional requirements drive architecture choices.",
        "You can now reason about tradeoffs (WS vs polling, cache, offline)."
      ]
    },
    {
      id: "d32-step-2",
      title: "Data model + pagination plan",
      subtitle: "Design the state shape and API contract",
      teacherNote: "If you can define the data model, the UI becomes straightforward.",
      bugCode: `console.clear();

// ❌ Fragile: offset pagination and denormalized arrays
var state = { tweets: [] };`,
      bugFocus: {
        fromLine: 2,
        toLine: 4
      },
      fixCode: `console.clear();

// ✅ Normalized + cursor pagination
var state = {
  tweets: {
    byId: {},
    allIds: [],
    loading: false,
    error: null,
    cursor: null,
    hasMore: true
  }
};

var api = {
  getFeed: "GET /api/feed?cursor=CURSOR&limit=20",
  postTweet: "POST /api/tweets { content, media }",
  likeTweet: "POST /api/tweets/:id/like"
};

console.log(state);
console.log(api);`,
      fixFocus: {
        fromLine: 2,
        toLine: 26
      },
      whatToNotice: [
        "byId allows O(1) updates (likes, edits).",
        "cursor avoids duplicates/holes when new items arrive."
      ]
    }
  ],
  code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  🏗️ FRONTEND SYSTEM DESIGN                                          ║
║  Example: Design a Twitter-like Feed                                 ║
╠══════════════════════════════════════════════════════════════════════╣
║  This shows the thinking process for system design interviews        ║
╚══════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════
// 📋 REQUIREMENTS (Always clarify first!)
// ═══════════════════════════════════════════════════════════════════
/*
Functional:
- Display feed of tweets (text, images)
- Infinite scroll
- Like/retweet/reply
- Real-time updates for new tweets
- Compose new tweet

Non-functional:
- Handle 100k+ tweets (virtualization needed)
- Works offline (service worker)
- Mobile responsive
- Accessible
*/

// ═══════════════════════════════════════════════════════════════════
// 🏗️ ARCHITECTURE
// ═══════════════════════════════════════════════════════════════════
/*
┌─────────────────────────────────────────────────────────┐
│                         App                             │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │
│  │   Header    │  │  Compose    │  │  Sidebar    │      │
│  └─────────────┘  └─────────────┘  └─────────────┘      │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │                  FeedContainer                   │    │
│  │  ┌────────────────────────────────────────────┐ │    │
│  │  │            VirtualizedList                 │ │    │
│  │  │  ┌──────────┐ ┌──────────┐ ┌──────────┐    │ │    │
│  │  │  │ TweetCard│ │ TweetCard│ │ TweetCard│    │ │    │
│  │  │  └──────────┘ └──────────┘ └──────────┘    │ │    │
│  │  └────────────────────────────────────────────┘ │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
*/

// ═══════════════════════════════════════════════════════════════════
// 📊 DATA MODEL
// ═══════════════════════════════════════════════════════════════════
/*
// State shape
{
  tweets: {
    byId: { [id]: Tweet },
    allIds: string[],
    loading: boolean,
    error: string | null,
    hasMore: boolean,
    cursor: string | null
  },
  user: {
    current: User | null,
    loading: boolean
  },
  ui: {
    composerOpen: boolean,
    theme: 'light' | 'dark'
  }
}

// API Contract
GET /api/feed?cursor=xxx&limit=20
POST /api/tweets { content, media }
POST /api/tweets/:id/like
WS /realtime { type: 'NEW_TWEET' | 'LIKE' | 'RETWEET' }
*/

// ═══════════════════════════════════════════════════════════════════
// 🔧 KEY IMPLEMENTATIONS (console walkthrough; no React/JSX)
// ═══════════════════════════════════════════════════════════════════

function radioTemplate() {
  return {
    requirements: {
      functional: [
        "View feed items (text/media)",
        "Infinite scroll",
        "Like/retweet/reply",
        "Compose new item",
        "Real-time new items"
      ],
      nonFunctional: [
        "Large list performance (virtualization/windowing)",
        "Fast startup (code-splitting, caching)",
        "Accessible + mobile responsive",
        "Offline read support (optional)"
      ]
    },
    architecture: {
      components: ["FeedPage", "FeedContainer", "VirtualizedList", "ItemCard", "Composer", "NewItemsToast"],
      dataFlow: ["Server state cache (React Query/SWR)", "Local UI state (composer, filters)", "WebSocket/SSE stream for realtime"]
    },
    dataModel: {
      stateShape: {
        items: { byId: {}, allIds: [], cursor: null, hasMore: true, loading: false, error: null },
        user: { current: null },
        ui: { composerOpen: false, theme: "dark" }
      },
      api: {
        list: "GET /api/feed?cursor=CURSOR&limit=20",
        create: "POST /api/items { content, media }",
        like: "POST /api/items/:id/like",
        realtime: "WS /realtime (NEW_ITEM, LIKE, RETWEET)"
      }
    },
    interface: {
      componentProps: ["items: Item[]", "onLike(id)", "onLoadMore(cursor)", "newItemsCount"],
      errorStates: ["loading skeleton", "empty state", "offline banner", "retry button"]
    },
    optimizations: {
      perf: ["virtualize list", "memoize item rows", "lazy load images", "avoid layout thrash"],
      caching: ["stale-while-revalidate", "prefetch next page", "dedupe requests"],
      reliability: ["retry with backoff", "optimistic updates with rollback", "idempotency for writes"]
    }
  };
}

function printRadio(plan) {
  console.clear();
  console.log("=== Day 32: Frontend System Design (RADIO) ===");
  console.log("R:", plan.requirements);
  console.log("A:", plan.architecture);
  console.log("D:", plan.dataModel);
  console.log("I:", plan.interface);
  console.log("O:", plan.optimizations);
}

var plan = radioTemplate();
printRadio(plan);`,
  recap: {
    takeaways: [
      "Lead with clarification: requirements drive architecture.",
      "RADIO keeps answers structured and complete under time pressure.",
      "State + API design (pagination, normalization, caching) is the backbone of the UI."
    ],
    commonMistakes: [
      "Jumping into components before clarifying requirements and scale.",
      "Using offset pagination for feeds where items are constantly inserted.",
      "Ignoring performance (virtualization) and reliability (retry, rollback)."
    ],
    nextActions: [
      "Practice 2 prompts: autocomplete and chat. Use RADIO headings out loud.",
      "Write a normalized state shape + API contract for each prompt.",
      "List 5 optimizations and when you'd apply them."
    ]
  },
  comparison: {
    junior: `// ❌ No architecture thinking
function Feed() {
  const [tweets, setTweets] = useState([]);
  
  useEffect(() => {
    fetch('/api/tweets').then(r => r.json())
      .then(setTweets);
  }, []);
  
  return tweets.map(t => <div>{t.text}</div>);
}
// No pagination, no optimization, no real-time`,
    senior: `// ✅ Architectural thinking
/*
1. Requirements: Scale, real-time, offline?
2. Architecture: Container/Presentational split
3. Data: Normalized state, cursor pagination
4. Interface: Props, API contracts
5. Optimizations: Virtualization, code-split
*/

// Uses: React Query (caching), WebSocket 
// (real-time), react-window (virtualization),
// service worker (offline), optimistic updates`
  },
  interview: {
    questions: [
      {
        q: "How would you handle real-time updates for 1M users?",
        a: "WebSocket with room-based subscriptions. Only subscribe to visible/relevant data. Use a message queue (Redis) to fan out. Consider Server-Sent Events for simpler one-way updates."
      },
      {
        q: "How do you design for offline-first?",
        a: "Service Worker to cache app shell and API responses. IndexedDB for local data storage. Background Sync API to queue writes. Show stale data with freshness indicator."
      },
      {
        q: "How would you implement infinite scroll efficiently?",
        a: "Cursor-based pagination (not offset). Virtualization to render only visible items. Intersection Observer for scroll detection. Debounce scroll events."
      },
      {
        q: "How do you handle optimistic updates with rollback?",
        a: "Update UI immediately with temporary ID. Track pending operations. On success, replace temp ID with real. On failure, remove from state and show error. Consider using React Query's optimistic update helpers."
      }
    ]
  }
};
