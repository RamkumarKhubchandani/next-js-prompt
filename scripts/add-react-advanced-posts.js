require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Post = require('../app/models/Post').default;
const User = require('../app/models/User').default;

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = 'ramkumarkhub@gmail.com';

const advancedPosts = [
    {
        title: "Build Production Autocomplete from Scratch in React",
        slug: "react-autocomplete-typeahead-tutorial",
        description: "The #1 frontend interview problem. Build a production-grade typeahead with debouncing, keyboard navigation, caching, and accessibility.",
        content: {
            type: 'doc',
            content: [
                { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The #1 Frontend Interview Question" }] },
                { type: 'paragraph', content: [{ type: 'text', text: "Building an autocomplete component is one of the most common frontend interview challenges at companies like Google, Meta, Amazon, and top startups. In this guide, we'll build a production-ready implementation from scratch." }] },
                { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Key Features We'll Implement" }] },
                { type: 'bulletList', content: [
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Debounced API calls (300ms delay)" }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Keyboard navigation (↑↓ + Enter + Escape)" }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Click outside to close" }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Results caching for performance" }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Highlight matching text" }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Full accessibility with ARIA" }] }] }
                ]},
                { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "The useDebounce Hook" }] },
                { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer); // Cleanup on change
  }, [value, delay]);

  return debouncedValue;
}` }] },
                { type: 'paragraph', content: [{ type: 'text', text: "This hook waits until the user stops typing for the specified delay before updating the value. This prevents API spam during fast typing." }] },
                { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Interview Questions" }] },
                { type: 'bulletList', content: [
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{ type: 'bold' }], text: "Why debounce instead of throttle?" }, { type: 'text', text: " Debounce waits until typing STOPS, then fires once. For search, we want the final query, not intermediate ones." }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{ type: 'bold' }], text: "How to handle race conditions?" }, { type: 'text', text: " Use AbortController to cancel previous requests, or track request IDs." }] }] }
                ]}
            ]
        },
        isPro: true,
        category: 'react'
    },
    {
        title: "Infinite Scroll & Virtualization in React",
        slug: "react-infinite-scroll-virtualization",
        description: "Render 10,000 items without killing the browser. Master Intersection Observer, windowing, and virtual lists.",
        content: {
            type: 'doc',
            content: [
                { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The Problem with Large Lists" }] },
                { type: 'paragraph', content: [{ type: 'text', text: "Rendering 10,000 DOM nodes = Laggy scrolling, high memory, crashed tabs. The solution? Only render what's visible." }] },
                { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Intersection Observer vs Scroll Events" }] },
                { type: 'paragraph', content: [{ type: 'text', text: "Scroll events fire 60+ times per second and block the main thread. Intersection Observer is browser-optimized and only fires when visibility changes." }] },
                { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `function useIntersectionObserver(callback, options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) callback();
    }, { threshold: 0.1, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [callback, options]);

  return ref;
}` }] },
                { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Virtualization Libraries" }] },
                { type: 'bulletList', content: [
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{ type: 'code' }], text: "@tanstack/react-virtual" }, { type: 'text', text: " - Modern, lightweight" }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{ type: 'code' }], text: "react-window" }, { type: 'text', text: " - Popular, battle-tested" }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{ type: 'code' }], text: "react-virtuoso" }, { type: 'text', text: " - Best for dynamic heights" }] }] }
                ]}
            ]
        },
        isPro: true,
        category: 'react'
    },
    {
        title: "Build Drag & Drop Kanban Board in React",
        slug: "react-drag-drop-kanban-tutorial",
        description: "Build a Trello-style Kanban board using native HTML5 Drag & Drop APIs. No libraries required.",
        content: {
            type: 'doc',
            content: [
                { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "HTML5 Drag & Drop API" }] },
                { type: 'paragraph', content: [{ type: 'text', text: "Companies like Trello, Notion, Asana, and Jira all need drag-and-drop. This is a HIGH-VALUE skill for interviews." }] },
                { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Critical: e.preventDefault()" }] },
                { type: 'paragraph', content: [{ type: 'text', text: "The browser's default behavior is to reject all drops. You MUST call e.preventDefault() in onDragOver to allow dropping. This is the #1 mistake developers make." }] },
                { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// ⚠️ CRITICAL: Must preventDefault to allow drop!
const handleDragOver = (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  setIsOver(true);
};

const handleDrop = (e) => {
  e.preventDefault();
  const data = JSON.parse(e.dataTransfer.getData('application/json'));
  onDrop(data.itemId, data.sourceColumnId, targetColumnId);
};` }] }
            ]
        },
        isPro: true,
        category: 'react'
    },
    {
        title: "10 Custom React Hooks Every Senior Dev Should Know",
        slug: "react-custom-hooks-library",
        description: "Build your own hook library: useDebounce, useThrottle, useLocalStorage, usePrevious, useClickOutside, and more.",
        content: {
            type: 'doc',
            content: [
                { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Why Build Custom Hooks?" }] },
                { type: 'paragraph', content: [{ type: 'text', text: "Custom hooks show senior-level React understanding. They demonstrate ability to abstract complexity, follow DRY principles, and create reusable code." }] },
                { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "1. useDebounce" }] },
                { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}` }] },
                { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "2. useLocalStorage" }] },
                { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue];
}` }] },
                { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "3. useClickOutside" }] },
                { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler]);
}` }] }
            ]
        },
        isPro: true,
        category: 'react'
    },
    {
        title: "React Testing Library: The Complete Guide",
        slug: "react-testing-library-guide",
        description: "Write tests that give confidence without testing implementation details. RTL philosophy and best practices.",
        content: {
            type: 'doc',
            content: [
                { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Testing Library Philosophy" }] },
                { type: 'paragraph', content: [{ type: 'text', text: "\"The more your tests resemble the way your software is used, the more confidence they can give you.\" - Kent C. Dodds" }] },
                { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Query Priority (Use in Order)" }] },
                { type: 'orderedList', content: [
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{ type: 'code' }], text: "getByRole" }, { type: 'text', text: " - Accessible (best!)" }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{ type: 'code' }], text: "getByLabelText" }, { type: 'text', text: " - Form fields" }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{ type: 'code' }], text: "getByPlaceholderText" }, { type: 'text', text: " - Inputs" }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{ type: 'code' }], text: "getByText" }, { type: 'text', text: " - Non-interactive content" }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{ type: 'code' }], text: "getByTestId" }, { type: 'text', text: " - Last resort" }] }] }
                ]},
                { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "getBy vs findBy vs queryBy" }] },
                { type: 'bulletList', content: [
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{ type: 'bold' }], text: "getBy" }, { type: 'text', text: " - throws if not found (element should exist)" }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{ type: 'bold' }], text: "queryBy" }, { type: 'text', text: " - returns null if not found (assert absence)" }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{ type: 'bold' }], text: "findBy" }, { type: 'text', text: " - async, waits (for elements after async ops)" }] }] }
                ]}
            ]
        },
        isPro: true,
        category: 'react'
    },
    {
        title: "React Performance Profiling & DevTools Mastery",
        slug: "react-performance-profiling-devtools",
        description: "Find and fix performance bottlenecks using React DevTools Profiler, Chrome DevTools, and why-did-you-render.",
        content: {
            type: 'doc',
            content: [
                { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Profile First, Optimize Second" }] },
                { type: 'paragraph', content: [{ type: 'text', text: "\"Don't optimize what you haven't measured.\" Always profile FIRST, then optimize. Most apps don't need memo() everywhere." }] },
                { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "React DevTools Profiler" }] },
                { type: 'orderedList', content: [
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Open DevTools → Profiler tab" }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Click Record → Interact with app → Stop" }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Read the flame graph: wider bars = slower" }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Gray bars = didn't re-render (good!)" }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Click component → See \"Why did this render?\"" }] }] }
                ]},
                { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Common Anti-Patterns" }] },
                { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `// ❌ New object on every render!
<Component style={{ color: 'red' }} />
<Component onClick={() => console.log('click')} />

// ✅ Stable references
const style = useMemo(() => ({ color: 'red' }), []);
const onClick = useCallback(() => console.log('click'), []);
<Component style={style} onClick={onClick} />` }] }
            ]
        },
        isPro: true,
        category: 'react'
    },
    {
        title: "useDeferredValue & useTransition Deep Dive",
        slug: "react-use-deferred-value-use-transition",
        description: "Master React's concurrent features. Keep UI responsive during heavy computations.",
        content: {
            type: 'doc',
            content: [
                { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "Concurrent React Features" }] },
                { type: 'paragraph', content: [{ type: 'text', text: "React's concurrent features let you mark updates as non-urgent, keeping typing and clicks responsive even during heavy renders." }] },
                { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "useTransition" }] },
                { type: 'paragraph', content: [{ type: 'text', text: "Wrap setState calls to mark them as low priority." }] },
                { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `const [isPending, startTransition] = useTransition();

// Urgent: Update input immediately
setQuery(input);

// Non-urgent: Expensive filter can lag
startTransition(() => {
  setFilteredResults(expensiveFilter(input));
});` }] },
                { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "useDeferredValue" }] },
                { type: 'paragraph', content: [{ type: 'text', text: "Create a deferred copy of a value that \"lags behind\"." }] },
                { type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: `const deferredQuery = useDeferredValue(query);
// query updates immediately (typing stays responsive)
// deferredQuery lags behind (expensive render can wait)` }] }
            ]
        },
        isPro: true,
        category: 'react'
    },
    {
        title: "System Design for React: Interview Mastery",
        slug: "react-system-design-interview",
        description: "The ultimate interview prep. Design complex React applications like a senior architect using the RADIO framework.",
        content: {
            type: 'doc',
            content: [
                { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: "The RADIO Framework" }] },
                { type: 'paragraph', content: [{ type: 'text', text: "Requirements → Architecture → Data Model → Interface (API) → Optimizations" }] },
                { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 1: Requirements (2-3 min)" }] },
                { type: 'bulletList', content: [
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{ type: 'bold' }], text: "Functional:" }, { type: 'text', text: " What can users do?" }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{ type: 'bold' }], text: "Non-functional:" }, { type: 'text', text: " Performance, accessibility, offline?" }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{ type: 'bold' }], text: "Scale:" }, { type: 'text', text: " How many users? Data volume?" }] }] }
                ]},
                { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Step 2: Architecture (5-7 min)" }] },
                { type: 'bulletList', content: [
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Component hierarchy (draw boxes)" }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "State management strategy" }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: "Data flow (props, context, global state)" }] }] }
                ]},
                { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: "Common Interview Questions" }] },
                { type: 'bulletList', content: [
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{ type: 'bold' }], text: "How to handle real-time updates?" }, { type: 'text', text: " WebSocket + optimistic updates" }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{ type: 'bold' }], text: "How to implement offline?" }, { type: 'text', text: " Service Worker + IndexedDB + Background Sync" }] }] },
                    { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', marks: [{ type: 'bold' }], text: "Context vs Redux vs React Query?" }, { type: 'text', text: " Context for UI, Redux for complex client state, React Query for server state" }] }] }
                ]}
            ]
        },
        isPro: true,
        category: 'react'
    }
];

async function addAdvancedPosts() {
    if (!MONGODB_URI) {
        console.error('Error: MONGODB_URI is not defined in .env.local');
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB.');

        const admin = await User.findOne({ email: ADMIN_EMAIL });
        if (!admin) {
            console.error('Error: Admin user not found.');
            process.exit(1);
        }
        console.log(`Found admin user: ${admin.name}`);

        let created = 0;
        let skipped = 0;

        for (const postData of advancedPosts) {
            const existing = await Post.findOne({ slug: postData.slug });
            if (existing) {
                console.log(`⏭️  Skipping "${postData.title}" (already exists)`);
                skipped++;
                continue;
            }

            const post = new Post({
                ...postData,
                postID: `post-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                author: admin._id,
                isPremium: postData.isPro || false,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            await post.save();
            console.log(`✅ Created: "${postData.title}"`);
            created++;
        }

        console.log(`\n📊 Summary: ${created} created, ${skipped} skipped`);

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB.');
    }
}

addAdvancedPosts();

