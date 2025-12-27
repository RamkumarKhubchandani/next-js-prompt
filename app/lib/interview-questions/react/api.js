export const apiQuestions = [
    {
        id: 'react-api-1',
        category: 'API Integration',
        difficulty: 'Hard',
        question: 'Data Fetching Patterns - useEffect vs Libraries',
        answer: `Critical for **any data-driven application**.

### Manual Fetching (useEffect):
**Pros:**
- Full control
- No dependencies
- Simple for basic cases

**Cons:**
- Boilerplate code
- Manual caching
- Race conditions
- Loading/error states

### Library Approach (TanStack Query/SWR):
**Pros:**
- Automatic caching
- Deduplication
- Background refetch
- Optimistic updates
- Pagination/infinite scroll

**Cons:**
- Learning curve
- Extra dependency

### When to Use Each:
- **useEffect:** Simple, one-time fetch
- **Library:** Complex data needs, caching required`,
        codeExample: `// Data Fetching Patterns
console.log('=== Manual Fetching with useEffect ===');

function useManualFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let isMounted = true;
    
    console.log('[Fetch] Starting:', url);
    setLoading(true);
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (isMounted) {
          console.log('[Fetch] Success:', JSON.stringify(data).slice(0, 50));
          setData(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          console.log('[Fetch] Error:', err.message);
          setError(err);
          setLoading(false);
        }
      });
    
    return () => {
      isMounted = false;
      console.log('[Fetch] Cleanup');
    };
  }, [url]);
  
  return { data, loading, error };
}

console.log('\\nUsing manual fetch:');
const result = useManualFetch('/api/users');
console.log('State:', { loading: result.loading, hasData: !!result.data });

console.log('\\n❌ Problems with manual approach:');
console.log('  • No caching (refetch on every mount)');
console.log('  • Race conditions if URL changes fast');
console.log('  • No deduplication');
console.log('  • Manual loading/error handling');

console.log('\\n=== TanStack Query Pattern ===');

// Simulating TanStack Query
function useQuery(key, fetchFn, options = {}) {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    error: null,
    isFetching: false
  });
  
  const cache = useRef({});
  
  useEffect(() => {
    const cacheKey = JSON.stringify(key);
    
    // Check cache first
    if (cache.current[cacheKey]) {
      console.log('[Query] Cache hit for:', cacheKey);
      setState(prev => ({
        ...prev,
        data: cache.current[cacheKey],
        isLoading: false,
        isFetching: true
      }));
      
      // Background refetch
      console.log('[Query] Background refetch...');
    } else {
      console.log('[Query] Cache miss, fetching:', cacheKey);
    }
    
    // Fetch (always, for freshness)
    fetchFn()
      .then(data => {
        cache.current[cacheKey] = data;
        console.log('[Query] Data cached');
        setState({
          data,
          isLoading: false,
          error: null,
          isFetching: false
        });
      })
      .catch(error => {
        setState(prev => ({
          ...prev,
          error,
          isLoading: false,
          isFetching: false
        }));
      });
  }, [JSON.stringify(key)]);
  
  return state;
}

console.log('\\nUsing TanStack Query:');
console.log('const { data, isLoading, error } = useQuery(');
console.log('  ["users", userId],');
console.log('  () => fetchUser(userId)');
console.log(');');

console.log('\\n✓ Benefits:');
console.log('  • Automatic caching');
console.log('  • Stale-while-revalidate');
console.log('  • Deduplication');
console.log('  • Background refetch');

console.log('\\n=== Mutation Pattern ===');

console.log('\\nconst mutation = useMutation({');
console.log('  mutationFn: (newUser) => createUser(newUser),');
console.log('  onSuccess: () => {');
console.log('    // Invalidate and refetch');
console.log('    queryClient.invalidateQueries(["users"]);');
console.log('  }');
console.log('});');
console.log('');
console.log('// Usage');
console.log('mutation.mutate({ name: "John" });');

console.log('\\n=== When to Use Each ===');

console.log('\\nuseEffect + fetch:');
console.log('  ✓ One-time data load');
console.log('  ✓ Simple requirements');
console.log('  ✓ No caching needed');

console.log('\\nTanStack Query / SWR:');
console.log('  ✓ Complex data needs');
console.log('  ✓ Caching required');
console.log('  ✓ Real-time updates');
console.log('  ✓ Pagination/infinite scroll');

console.log('\\n✓ Use libraries for complex data needs');`
    },
    {
        id: 'react-api-2',
        category: 'API Integration',
        difficulty: 'Expert',
        question: 'Optimistic Updates and Error Recovery',
        answer: `Advanced pattern asked at **product companies**.

### Optimistic Update Flow:
1. Update UI immediately (optimistic)
2. Send request to server
3. On success: Keep optimistic update
4. On error: Rollback to previous state

### Benefits:
- Instant feedback
- Better UX
- Feels faster

### Challenges:
- Error handling complexity
- Rollback logic
- Conflict resolution

### Best Practices:
- Always have rollback
- Show pending state
- Handle conflicts
- Toast on error`,
        codeExample: `// Optimistic Updates
console.log('=== Optimistic Update Pattern ===');

function useTodoMutation() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', done: false },
    { id: 2, text: 'Build App', done: false }
  ]);
  
  const toggleTodo = async (id) => {
    console.log('\\n--- Optimistic Toggle ---');
    
    // 1. Save previous state for rollback
    const previousTodos = [...todos];
    console.log('[1] Saved previous state');
    
    // 2. Update UI immediately (optimistic)
    const optimisticTodos = todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    setTodos(optimisticTodos);
    console.log('[2] Updated UI optimistically');
    console.log('    User sees instant feedback!');
    
    try {
      // 3. Send request to server
      console.log('[3] Sending request to server...');
      // await api.toggleTodo(id);
      
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 100));
      
      console.log('[4] Server confirmed ✓');
      console.log('    Keep optimistic update');
      
    } catch (error) {
      // 4. Rollback on error
      console.log('[4] Server error! ✗');
      console.log('[5] Rolling back to previous state');
      setTodos(previousTodos);
      console.log('[6] Show error toast to user');
    }
  };
  
  return { todos, toggleTodo };
}

const { todos, toggleTodo } = useTodoMutation();
console.log('Initial todos:', todos.length);
toggleTodo(1);

console.log('\\n=== TanStack Query Optimistic Update ===');

console.log('const mutation = useMutation({');
console.log('  mutationFn: updateTodo,');
console.log('  onMutate: async (newTodo) => {');
console.log('    // Cancel outgoing refetches');
console.log('    await queryClient.cancelQueries(["todos"]);');
console.log('    ');
console.log('    // Snapshot previous value');
console.log('    const previousTodos = queryClient.getQueryData(["todos"]);');
console.log('    ');
console.log('    // Optimistically update');
console.log('    queryClient.setQueryData(["todos"], (old) => [...old, newTodo]);');
console.log('    ');
console.log('    // Return context for rollback');
console.log('    return { previousTodos };');
console.log('  },');
console.log('  onError: (err, newTodo, context) => {');
console.log('    // Rollback on error');
console.log('    queryClient.setQueryData(["todos"], context.previousTodos);');
console.log('  },');
console.log('  onSettled: () => {');
console.log('    // Refetch to ensure sync');
console.log('    queryClient.invalidateQueries(["todos"]);');
console.log('  }');
console.log('});');

console.log('\\n=== Like Button Example ===');

function useLikeMutation(postId) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(42);
  
  const toggleLike = async () => {
    // Save previous
    const prevLiked = liked;
    const prevCount = count;
    
    // Optimistic update
    setLiked(!liked);
    setCount(liked ? count - 1 : count + 1);
    console.log('[Optimistic] Liked:', !liked, 'Count:', liked ? count - 1 : count + 1);
    
    try {
      // API call
      await new Promise(resolve => setTimeout(resolve, 50));
      console.log('[Server] Confirmed');
    } catch (error) {
      // Rollback
      setLiked(prevLiked);
      setCount(prevCount);
      console.log('[Rollback] Reverted to:', prevLiked, prevCount);
    }
  };
  
  return { liked, count, toggleLike };
}

const like = useLikeMutation(123);
console.log('\\nLike button:');
console.log('Initial:', like.liked, like.count);
like.toggleLike();

console.log('\\n=== Best Practices ===');
console.log('✓ Always save previous state');
console.log('✓ Update UI immediately');
console.log('✓ Rollback on error');
console.log('✓ Show error message');
console.log('✓ Refetch to ensure sync');`
    },
    {
        id: 'react-api-3',
        category: 'API Integration',
        difficulty: 'Hard',
        question: 'Pagination and Infinite Scroll Patterns',
        answer: `Common feature at **content-heavy applications**.

### Pagination Approaches:
1. **Page-based** - Page 1, 2, 3...
2. **Cursor-based** - Next/prev cursors
3. **Infinite scroll** - Load more on scroll

### Page-based Pagination:
**Pros:** Simple, can jump to page
**Cons:** Inconsistent with new data

### Cursor-based:
**Pros:** Consistent, handles new data
**Cons:** Can't jump to arbitrary page

### Infinite Scroll:
**Pros:** Better mobile UX
**Cons:** No footer, harder to find items

### Implementation:
- useInfiniteQuery (TanStack Query)
- Intersection Observer
- Virtual scrolling for performance`,
        codeExample: `// Pagination Patterns
console.log('=== Page-Based Pagination ===');

function usePagePagination(fetchFn) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  
  useEffect(() => {
    console.log('[Pagination] Fetching page:', page);
    
    fetchFn(page).then(result => {
      setData(result.items);
      setHasMore(result.hasMore);
      console.log('[Pagination] Loaded', result.items.length, 'items');
      console.log('[Pagination] Has more:', result.hasMore);
    });
  }, [page]);
  
  return {
    data,
    page,
    hasMore,
    nextPage: () => setPage(p => p + 1),
    prevPage: () => setPage(p => Math.max(1, p - 1)),
    goToPage: setPage
  };
}

console.log('\\nUsage:');
console.log('const { data, page, hasMore, nextPage, prevPage } = usePagePagination(fetchPosts);');
console.log('');
console.log('<div>');
console.log('  {data.map(item => <Item key={item.id} {...item} />)}');
console.log('  <button onClick={prevPage} disabled={page === 1}>Prev</button>');
console.log('  <span>Page {page}</span>');
console.log('  <button onClick={nextPage} disabled={!hasMore}>Next</button>');
console.log('</div>');

console.log('\\n=== Cursor-Based Pagination ===');

function useCursorPagination(fetchFn) {
  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  
  const loadMore = async () => {
    console.log('[Cursor] Fetching with cursor:', cursor || 'initial');
    
    const result = await fetchFn(cursor);
    setItems(prev => [...prev, ...result.items]);
    setCursor(result.nextCursor);
    setHasMore(!!result.nextCursor);
    
    console.log('[Cursor] Loaded', result.items.length, 'items');
    console.log('[Cursor] Next cursor:', result.nextCursor || 'none');
  };
  
  return { items, hasMore, loadMore };
}

console.log('\\nAPI Response:');
console.log('{');
console.log('  items: [...],');
console.log('  nextCursor: "eyJpZCI6MTAwfQ==" // Base64 encoded');
console.log('}');

console.log('\\n=== Infinite Scroll ===');

console.log('\\nIntersection Observer pattern:');
console.log('function InfiniteList({ fetchMore, hasMore }) {');
console.log('  const observerRef = useRef();');
console.log('  ');
console.log('  useEffect(() => {');
console.log('    const observer = new IntersectionObserver(');
console.log('      (entries) => {');
console.log('        if (entries[0].isIntersecting && hasMore) {');
console.log('          fetchMore();');
console.log('        }');
console.log('      },');
console.log('      { threshold: 1.0 }');
console.log('    );');
console.log('    ');
console.log('    if (observerRef.current) {');
console.log('      observer.observe(observerRef.current);');
console.log('    }');
console.log('    ');
console.log('    return () => observer.disconnect();');
console.log('  }, [hasMore, fetchMore]);');
console.log('  ');
console.log('  return (');
console.log('    <div>');
console.log('      {items.map(item => <Item key={item.id} {...item} />)}');
console.log('      <div ref={observerRef}>Loading...</div>');
console.log('    </div>');
console.log('  );');
console.log('}');

console.log('\\n=== TanStack Query useInfiniteQuery ===');

console.log('\\nconst {');
console.log('  data,');
console.log('  fetchNextPage,');
console.log('  hasNextPage,');
console.log('  isFetchingNextPage');
console.log('} = useInfiniteQuery({');
console.log('  queryKey: ["posts"],');
console.log('  queryFn: ({ pageParam = 0 }) => fetchPosts(pageParam),');
console.log('  getNextPageParam: (lastPage) => lastPage.nextCursor');
console.log('});');
console.log('');
console.log('// All pages in data.pages array');
console.log('const allItems = data?.pages.flatMap(page => page.items);');

console.log('\\n=== Comparison ===');

const comparison = {
  'Page-based': {
    pros: 'Simple, can jump pages',
    cons: 'Inconsistent with new data',
    use: 'Admin tables, search results'
  },
  'Cursor-based': {
    pros: 'Consistent, handles new data',
    cons: 'Cannot jump to page',
    use: 'Social feeds, timelines'
  },
  'Infinite': {
    pros: 'Great mobile UX',
    cons: 'No footer, hard to find items',
    use: 'Mobile apps, feeds'
  }
};

Object.entries(comparison).forEach(([type, info]) => {
  console.log('\\n' + type + ':');
  console.log('  Pros:', info.pros);
  console.log('  Cons:', info.cons);
  console.log('  Use:', info.use);
});

console.log('\\n✓ Choose based on use case');`
    },
    {
        id: 'react-api-4',
        category: 'API Integration',
        difficulty: 'Expert',
        question: 'Real-time Data - WebSockets, SSE, and Polling',
        answer: `Critical for **collaborative and real-time apps**.

### Polling:
**How:** Fetch data at intervals
**Pros:** Simple, works everywhere
**Cons:** Wasteful, delayed updates

### Server-Sent Events (SSE):
**How:** Server pushes updates
**Pros:** Simple, HTTP-based
**Cons:** One-way only

### WebSockets:
**How:** Bidirectional connection
**Pros:** Real-time, bidirectional
**Cons:** Complex, connection management

### When to Use:
- **Polling:** Simple, infrequent updates
- **SSE:** Server → Client only (notifications)
- **WebSocket:** Bidirectional (chat, collaboration)`,
        codeExample: `// Real-time Data Patterns
console.log('=== Polling Pattern ===');

function usePolling(fetchFn, interval = 5000) {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    console.log('[Polling] Starting with interval:', interval + 'ms');
    
    const poll = async () => {
      console.log('[Polling] Fetching...');
      const result = await fetchFn();
      setData(result);
    };
    
    // Initial fetch
    poll();
    
    // Set up interval
    const intervalId = setInterval(poll, interval);
    
    return () => {
      console.log('[Polling] Stopped');
      clearInterval(intervalId);
    };
  }, [interval]);
  
  return data;
}

console.log('\\nUsage:');
console.log('const notifications = usePolling(fetchNotifications, 10000);');
console.log('// Fetches every 10 seconds');

console.log('\\n❌ Problems:');
console.log('  • Wasteful (fetches even when no changes)');
console.log('  • Delayed (up to interval delay)');
console.log('  • Server load');

console.log('\\n=== Server-Sent Events (SSE) ===');

function useSSE(url) {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    console.log('[SSE] Connecting to:', url);
    
    // const eventSource = new EventSource(url);
    
    console.log('[SSE] Listening for messages...');
    
    // eventSource.onmessage = (event) => {
    //   const data = JSON.parse(event.data);
    //   setMessages(prev => [...prev, data]);
    // };
    
    // eventSource.onerror = () => {
    //   console.log('[SSE] Connection error, reconnecting...');
    // };
    
    return () => {
      console.log('[SSE] Closing connection');
      // eventSource.close();
    };
  }, [url]);
  
  return messages;
}

console.log('\\nServer code (Node.js):');
console.log('res.writeHead(200, {');
console.log('  "Content-Type": "text/event-stream",');
console.log('  "Cache-Control": "no-cache",');
console.log('  "Connection": "keep-alive"');
console.log('});');
console.log('');
console.log('// Send updates');
console.log('res.write(\`data: \${JSON.stringify(data)}\\n\\n\`);');

console.log('\\n=== WebSocket Pattern ===');

function useWebSocket(url) {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef(null);
  
  useEffect(() => {
    console.log('[WebSocket] Connecting to:', url);
    
    // ws.current = new WebSocket(url);
    
    // ws.current.onopen = () => {
    //   console.log('[WebSocket] Connected');
    //   setIsConnected(true);
    // };
    
    // ws.current.onmessage = (event) => {
    //   const data = JSON.parse(event.data);
    //   console.log('[WebSocket] Received:', data);
    //   setMessages(prev => [...prev, data]);
    // };
    
    // ws.current.onclose = () => {
    //   console.log('[WebSocket] Disconnected');
    //   setIsConnected(false);
    // };
    
    return () => {
      console.log('[WebSocket] Closing connection');
      // ws.current?.close();
    };
  }, [url]);
  
  const send = (data) => {
    if (ws.current?.readyState === 1) {
      console.log('[WebSocket] Sending:', data);
      // ws.current.send(JSON.stringify(data));
    }
  };
  
  return { messages, isConnected, send };
}

console.log('\\nUsage:');
console.log('const { messages, isConnected, send } = useWebSocket("ws://...");');
console.log('');
console.log('// Send message');
console.log('send({ type: "chat", text: "Hello!" });');

console.log('\\n=== Comparison ===');

const methods = {
  Polling: {
    latency: '1-30s',
    overhead: 'High',
    complexity: 'Low',
    use: 'Dashboard metrics'
  },
  SSE: {
    latency: '<1s',
    overhead: 'Low',
    complexity: 'Medium',
    use: 'Notifications, feeds'
  },
  WebSocket: {
    latency: '<100ms',
    overhead: 'Low',
    complexity: 'High',
    use: 'Chat, collaboration'
  }
};

Object.entries(methods).forEach(([method, info]) => {
  console.log('\\n' + method + ':');
  console.log('  Latency:', info.latency);
  console.log('  Overhead:', info.overhead);
  console.log('  Complexity:', info.complexity);
  console.log('  Use case:', info.use);
});

console.log('\\n✓ Choose based on requirements');
console.log('✓ WebSocket for real-time bidirectional');
console.log('✓ SSE for server → client updates');
console.log('✓ Polling for simple cases');`
    }
];
