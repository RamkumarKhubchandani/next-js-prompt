export const day32 = {
  day: 32,
  title: "System Design for React: Interview Mastery",
  intro: "The ultimate interview prep. Design complex React applications like a senior architect.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 32. Congratulations! you made it to the end. The final boss is System Design."
      },
      {
        type: "challenge",
        instruction: "You are designing a Twitter feed. Storing 1 million tweets in a simple array will crash the browser. How should you structure the state?",
        buggyCode: `// ❌ Slow lookups, duplication
const state = {
  tweets: [
    { id: 1, author: { name: 'Dan', ... } },
    { id: 2, author: { name: 'Dan', ... } } 
  ]
};`,
        solutionCode: `// ✅ Normalized Data
const state = {
  tweetsById: {
    "1": { id: "1", authorId: "u1", ... },
    "2": { id: "2", authorId: "u1", ... }
  },
  authors: {
    "u1": { name: 'Dan', ... }
  },
  feedOrder: ["1", "2"]
};`,
        verifyOutput: "tweetsById",
        successMessage: "Correct! Normalizing data (like a database) prevents duplication and makes updates (e.g., changing a user's avatar) instant across all their tweets.",
        hint: "Use specific maps like `tweetsById` and list of IDs for order."
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You'll Master</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li>Frontend system design methodology</li>
<li>Designing Twitter/Feed, E-commerce, Real-time Chat</li>
<li>State management architecture decisions</li>
<li>Performance budgets & optimization strategies</li>
<li>Error boundaries & graceful degradation</li>
</ul>

<div class="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 p-4 rounded-xl mb-6">
<h4 class="text-yellow-600 dark:text-yellow-400 font-bold mb-2">🏆 The RADIO Framework</h4>
<p class="text-gray-600 dark:text-light-300 font-mono">
<strong>R</strong>equirements → <strong>A</strong>rchitecture → <strong>D</strong>ata Model → <strong>I</strong>nterface (API) → <strong>O</strong>ptimizations
</p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📋 Step 1: Requirements (2-3 min)</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li><strong>Functional:</strong> What can users do?</li>
<li><strong>Non-functional:</strong> Performance, accessibility, offline?</li>
<li><strong>Scale:</strong> How many users? Data volume?</li>
<li><strong>Scope:</strong> What's in/out for this interview?</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🏗️ Step 2: Architecture (5-7 min)</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li>Component hierarchy (draw boxes)</li>
<li>State management strategy</li>
<li>Data flow (props, context, global state)</li>
<li>Third-party integrations</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📊 Step 3: Data Model (3-5 min)</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li>What data entities exist?</li>
<li>Client state vs server state</li>
<li>Normalization strategy</li>
</ul>
            `,
  code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  🏗️ SYSTEM DESIGN: TWITTER-LIKE FEED                                ║
║  Comprehensive example using RADIO framework                         ║
╠══════════════════════════════════════════════════════════════════════╣
║  This is a simplified implementation showing key architecture        ║
║  decisions for a social media feed.                                  ║
╚══════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════
// 📋 REQUIREMENTS GATHERED:
// ═══════════════════════════════════════════════════════════════════
/*
FUNCTIONAL:
- View feed of tweets
- Like/unlike tweets
- Compose new tweet
- Infinite scroll
- Real-time updates for likes

NON-FUNCTIONAL:
- Initial load < 2s
- Smooth scrolling (60fps)
- Optimistic updates for likes
- Offline: show cached tweets
- Accessible

SCALE:
- 10K concurrent users
- 1M+ tweets in system
- 50 tweets per page
*/

// ═══════════════════════════════════════════════════════════════════
// 📊 DATA MODEL
// ═══════════════════════════════════════════════════════════════════
/*
Tweet {
id: string
content: string
author: { id, name, avatar }
createdAt: timestamp
likeCount: number
isLikedByMe: boolean
replyCount: number
}

FeedState {
tweets: Map<id, Tweet>  // Normalized!
feedOrder: string[]     // Just IDs for ordering
isLoading: boolean
hasMore: boolean
cursor: string | null
}
*/

// ═══════════════════════════════════════════════════════════════════
// 🏗️ ARCHITECTURE IMPLEMENTATION
// ═══════════════════════════════════════════════════════════════════

// Normalized store (like Redux/Zustand would have)
const useFeedStore = () => {
const [state, setState] = React.useState({
tweetsById: {},
feedOrder: [],
isLoading: false,
hasMore: true,
cursor: null
});

const loadMore = async () => {
if (state.isLoading || !state.hasMore) return;

setState(s => ({ ...s, isLoading: true }));

// Simulate API
await new Promise(r => setTimeout(r, 500));
const newTweets = generateMockTweets(state.cursor, 10);

setState(s => ({
  ...s,
  isLoading: false,
  cursor: newTweets.nextCursor,
  hasMore: newTweets.hasMore,
  // Normalize into map
  tweetsById: {
    ...s.tweetsById,
    ...Object.fromEntries(newTweets.items.map(t => [t.id, t]))
  },
  // Append IDs to order
  feedOrder: [...s.feedOrder, ...newTweets.items.map(t => t.id)]
}));
};

const toggleLike = (tweetId) => {
// Optimistic update!
setState(s => ({
  ...s,
  tweetsById: {
    ...s.tweetsById,
    [tweetId]: {
      ...s.tweetsById[tweetId],
      isLikedByMe: !s.tweetsById[tweetId].isLikedByMe,
      likeCount: s.tweetsById[tweetId].likeCount + 
        (s.tweetsById[tweetId].isLikedByMe ? -1 : 1)
    }
  }
}));

// Fire and forget API call (would handle errors in production)
// api.toggleLike(tweetId).catch(rollback);
};

return { ...state, loadMore, toggleLike };
};

// Mock data generator
const generateMockTweets = (cursor, count) => {
const start = cursor ? parseInt(cursor) : 0;
const items = Array.from({ length: count }, (_, i) => ({
id: String(start + i),
content: \`Tweet #\${start + i + 1}: This is some interesting content about React, JavaScript, and web development. #coding #react\`,
author: {
  id: \`user-\${(start + i) % 5}\`,
  name: ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'][(start + i) % 5],
  avatar: \`https://i.pravatar.cc/40?img=\${(start + i) % 70}\`
},
createdAt: Date.now() - (start + i) * 60000,
likeCount: Math.floor(Math.random() * 100),
isLikedByMe: Math.random() > 0.7,
replyCount: Math.floor(Math.random() * 20)
}));

return {
items,
nextCursor: String(start + count),
hasMore: start + count < 50 // Limit for demo
};
};

// ═══════════════════════════════════════════════════════════════════
// 🧩 COMPONENT: Tweet Card (Memoized for perf)
// ═══════════════════════════════════════════════════════════════════
const TweetCard = React.memo(function TweetCard({ tweet, onLike }) {
const timeAgo = React.useMemo(() => {
const mins = Math.floor((Date.now() - tweet.createdAt) / 60000);
if (mins < 60) return \`\${mins}m\`;
if (mins < 1440) return \`\${Math.floor(mins/60)}h\`;
return \`\${Math.floor(mins/1440)}d\`;
}, [tweet.createdAt]);

return (
<article style={{
  padding: '15px',
  borderBottom: '1px solid #e5e7eb',
  background: 'white'
}}>
  <div style={{ display: 'flex', gap: '12px' }}>
    <img 
      src={tweet.author.avatar} 
      alt=""
      style={{ width: 48, height: 48, borderRadius: '50%' }}
    />
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <strong>{tweet.author.name}</strong>
        <span style={{ color: '#6b7280', fontSize: '14px' }}>· {timeAgo}</span>
      </div>
      <p style={{ margin: '8px 0', lineHeight: 1.5 }}>{tweet.content}</p>
      <div style={{ display: 'flex', gap: '20px' }}>
        <button 
          onClick={() => onLike(tweet.id)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: tweet.isLikedByMe ? '#f43f5e' : '#6b7280',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          {tweet.isLikedByMe ? '❤️' : '🤍'} {tweet.likeCount}
        </button>
        <button style={{ background: 'none', border: 'none', color: '#6b7280' }}>
          💬 {tweet.replyCount}
        </button>
      </div>
    </div>
  </div>
</article>
);
});

// ═══════════════════════════════════════════════════════════════════
// 🔍 COMPONENT: Feed with Infinite Scroll
// ═══════════════════════════════════════════════════════════════════
function Feed() {
const { tweetsById, feedOrder, isLoading, hasMore, loadMore, toggleLike } = useFeedStore();
const loaderRef = React.useRef(null);

// Intersection Observer for infinite scroll
React.useEffect(() => {
const observer = new IntersectionObserver(
  ([entry]) => { if (entry.isIntersecting) loadMore(); },
  { threshold: 0.1 }
);
if (loaderRef.current) observer.observe(loaderRef.current);
return () => observer.disconnect();
}, [loadMore]);

// Load initial
React.useEffect(() => { loadMore(); }, []);

return (
<div style={{ 
  maxWidth: '600px', 
  margin: '0 auto',
  background: '#f3f4f6',
  minHeight: '100vh'
}}>
  <header style={{
    padding: '15px',
    background: 'white',
    borderBottom: '1px solid #e5e7eb',
    position: 'sticky',
    top: 0,
    zIndex: 10
  }}>
    <h1 style={{ margin: 0, fontSize: '20px' }}>Home</h1>
  </header>

  {feedOrder.map(id => (
    <TweetCard 
      key={id} 
      tweet={tweetsById[id]} 
      onLike={toggleLike}
    />
  ))}

  <div ref={loaderRef} style={{ padding: '20px', textAlign: 'center' }}>
    {isLoading && '⏳ Loading...'}
    {!hasMore && '✅ You\'ve seen all tweets'}
  </div>
</div>
);
}

// ═══════════════════════════════════════════════════════════════════
// 🎮 APP WITH ERROR BOUNDARY
// ═══════════════════════════════════════════════════════════════════
class ErrorBoundary extends React.Component {
state = { hasError: false };
static getDerivedStateFromError() { return { hasError: true }; }
render() {
if (this.state.hasError) {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Something went wrong 😢</h2>
      <button onClick={() => window.location.reload()}>Reload</button>
    </div>
  );
}
return this.props.children;
}
}

function App() {
return (
<ErrorBoundary>
  <Feed />
</ErrorBoundary>
);
}`,
  comparison: {
    junior: `// ❌ No structure, starts coding immediately
function App() {
const [tweets, setTweets] = useState([]);
useEffect(() => {
fetch('/tweets').then(r => r.json()).then(setTweets);
}, []);
return tweets.map(t => <div>{t.text}</div>);
}`,
    senior: `// ✅ RADIO Framework
// 1. Requirements: clarify scope, scale, constraints
// 2. Architecture: draw component hierarchy
// 3. Data Model: normalize entities, client/server split
// 4. Interface: API contract, optimistic updates
// 5. Optimizations: virtualization, caching, code split`
  },
  interview: {
    questions: [
      {
        q: "How would you handle real-time updates in a feed?",
        a: "WebSocket connection for live updates. When a new tweet arrives, prepend to feedOrder array. For likes, use WebSocket or polling for live count. Consider optimistic updates with rollback on failure."
      },
      {
        q: "How would you implement offline support?",
        a: "1) Service Worker to cache the app shell. 2) IndexedDB to cache tweets locally. 3) Background Sync API to queue actions (likes, posts) when offline. 4) Show cached content with 'offline' indicator."
      },
      {
        q: "How do you decide between Context, Redux, and React Query?",
        a: "Context: Simple shared state (theme, auth). Redux/Zustand: Complex client state with many updaters. React Query/TanStack: Server state (caching, refetching, sync). Often combine: Context for UI state, React Query for server data."
      }
    ]
  }
};
