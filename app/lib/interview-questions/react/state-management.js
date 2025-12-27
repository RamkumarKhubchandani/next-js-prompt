export const stateManagementQuestions = [
  {
    id: 'react-state-1',
    category: 'State Management',
    difficulty: 'Hard',
    question: 'Context API Optimization - Avoiding Re-renders',
    answer: `Critical for **Meta, Netflix, and Shopify** interviews.

### The Problem:
Context causes ALL consumers to re-render when value changes, even if they only use part of the value.

### Solutions:
1. **Split contexts** - Separate frequently changing state
2. **Memoize value** - useMemo to prevent reference changes
3. **Memoize consumers** - React.memo on consuming components
4. **State selectors** - Use libraries like use-context-selector

### Best Practices:
- Keep context values small and focused
- Separate state and dispatch contexts
- Use context for truly global state only
- Prefer props for 1-2 levels of passing`,
    codeExample: `// Context Optimization Patterns
console.log('=== Problem: Context Re-renders ===');

// BAD: Everything in one context
function BadContextDemo() {
  const [user, setUser] = useState({ name: 'John' });
  const [theme, setTheme] = useState('dark');
  const [notifications, setNotifications] = useState([]);
  
  // ALL consumers re-render when ANY value changes!
  const value = { user, theme, notifications, setUser, setTheme, setNotifications };
  
  console.log('❌ Every consumer re-renders on any change');
  console.log('   Even if they only use "theme"');
  
  return value;
}

BadContextDemo();

console.log('\\n=== Solution 1: Split Contexts ===');

// GOOD: Separate contexts for different concerns
function SplitContextDemo() {
  console.log('✓ UserContext - only user consumers re-render');
  console.log('✓ ThemeContext - only theme consumers re-render');
  console.log('✓ NotificationContext - separate updates');
}

SplitContextDemo();

console.log('\\n=== Solution 2: Separate State & Dispatch ===');

function StateDispatchSplit() {
  const state = { user: 'John', count: 0 };
  const dispatch = (action) => console.log('Dispatch:', action);
  
  console.log('StateContext: { user, count }');
  console.log('DispatchContext: { dispatch }');
  console.log('');
  console.log('✓ Components that only dispatch never re-render');
  console.log('✓ Buttons just need dispatch, not state!');
}

StateDispatchSplit();

console.log('\\n=== Solution 3: Memoize Value ===');

function MemoizedValueDemo() {
  const user = { name: 'John' };
  const theme = 'dark';
  
  // Without useMemo: new object every render
  const badValue = { user, theme };
  console.log('❌ New object reference every render');
  
  // With useMemo: stable reference
  const goodValue = useMemo(() => ({ user, theme }), [user, theme]);
  console.log('✓ Same reference if values unchanged');
}

MemoizedValueDemo();

console.log('\\n=== Solution 4: Memoize Consumers ===');

function MemoizedConsumer() {
  const ThemeButton = memo(({ theme }) => {
    console.log('ThemeButton rendered');
    return 'Button: ' + theme;
  });
  
  console.log('✓ React.memo prevents re-render if props unchanged');
  console.log('✓ Combine with context splitting for best results');
}

MemoizedConsumer();

console.log('\\n=== Context Best Practices ===');
console.log('1. Split contexts by domain (auth, theme, features)');
console.log('2. Keep values small and focused');
console.log('3. Memoize context value with useMemo');
console.log('4. Consider state management libs for complex state');`
  },
  {
    id: 'react-state-2',
    category: 'State Management',
    difficulty: 'Expert',
    question: 'Server State vs Client State - TanStack Query Patterns',
    answer: `Asked at **Airbnb, Netflix, and Meta** for frontend-heavy roles.

### Two Types of State:

**Client State:**
- UI state (modals, tabs, form inputs)
- Derived from user interaction
- Owned by the browser

**Server State:**
- Remote data (users, products, orders)
- Owned by the server
- Has cache invalidation, loading, error states

### Why Separate Matters:
- Server state needs caching, background refresh, optimistic updates
- Client state doesn't need these features
- Mixing them creates complexity

### TanStack Query Patterns:
- Automatic caching & background refresh
- Deduplication of requests
- Optimistic updates
- Infinite scrolling
- Prefetching`,
    codeExample: `// Server State vs Client State
console.log('=== The Two Types of State ===');

// Client State - Use useState/useReducer
function ClientStateExample() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [formData, setFormData] = useState({});
  
  console.log('Client State (useState/useReducer):');
  console.log('  • isModalOpen:', isModalOpen);
  console.log('  • activeTab:', activeTab);
  console.log('  • formData: user input');
  console.log('  → No caching needed, no API calls');
}

ClientStateExample();

console.log('\\n=== Server State (TanStack Query) ===');

// Simulating TanStack Query patterns
function useQuery(key, fetchFn) {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    error: null,
    isFetching: false
  });
  
  const cache = useRef({});
  
  useEffect(() => {
    console.log('[Query] Key:', key);
    
    // Check cache first
    if (cache.current[key]) {
      console.log('[Query] Cache hit! Background refresh...');
      setState(prev => ({ ...prev, isFetching: true }));
    } else {
      console.log('[Query] Cache miss, fetching...');
    }
    
    // Simulate fetch
    setTimeout(() => {
      const data = { id: 1, name: 'Product' };
      cache.current[key] = data;
      console.log('[Query] Data received, cached');
      setState({ data, isLoading: false, error: null, isFetching: false });
    }, 100);
  }, [key]);
  
  return state;
}

// Usage pattern
function ProductPage() {
  const { data, isLoading, isFetching } = useQuery('product-1', () => {});
  
  console.log('\\nServer State (useQuery):');
  console.log('  • data:', data);
  console.log('  • isLoading:', isLoading);
  console.log('  • isFetching:', isFetching, '(background refresh)');
  console.log('  → Automatic caching, refetching, dedup');
}

ProductPage();

console.log('\\n=== Key Patterns ===');

console.log('\\n1. Stale-While-Revalidate:');
console.log('   Show cached data immediately');
console.log('   Refresh in background');
console.log('   Update when fresh data arrives');

console.log('\\n2. Optimistic Updates:');
console.log('   Update UI immediately on mutation');
console.log('   Rollback if server rejects');

console.log('\\n3. Prefetching:');
console.log('   Fetch on hover before user clicks');
console.log('   Instant navigation experience');

console.log('\\n✓ Client state: useState/useReducer');
console.log('✓ Server state: TanStack Query/SWR/RTK Query');`
  },
  {
    id: 'react-state-3',
    category: 'State Management',
    difficulty: 'Hard',
    question: 'Zustand vs Jotai vs Recoil - Modern State Libraries',
    answer: `Top question at **startups and modern tech companies**.

### Zustand (Most Popular)
- **Philosophy:** Simple, minimal API
- **Best for:** Medium complexity, replaces Context
- **Features:** Outside React access, devtools, middleware

### Jotai (Atomic)
- **Philosophy:** Bottom-up, atom-based
- **Best for:** Fine-grained reactivity
- **Features:** Derived atoms, async atoms, minimal boilerplate

### Recoil (Meta)
- **Philosophy:** Graph-based state
- **Best for:** Complex interdependent state
- **Features:** Selectors, atom families, React concurrent mode

### Decision Guide:
| Need | Winner |
|------|--------|
| Simple global state | Zustand |
| Fine-grained updates | Jotai |
| Complex derived state | Recoil |
| Outside React access | Zustand |`,
    codeExample: `// Modern State Libraries Comparison
console.log('=== Zustand - Simple & Powerful ===');

// Zustand store pattern
function createStore(initialState) {
  let state = initialState;
  const listeners = new Set();
  
  return {
    getState: () => state,
    setState: (partial) => {
      state = { ...state, ...(typeof partial === 'function' ? partial(state) : partial) };
      listeners.forEach(l => l(state));
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  };
}

const useStore = createStore({
  count: 0,
  user: null
});

console.log('Zustand API:');
console.log('const useStore = create((set) => ({');
console.log('  count: 0,');
console.log('  increment: () => set(s => ({ count: s.count + 1 }))');
console.log('}));');
console.log('');
console.log('Usage: const count = useStore(s => s.count);');

console.log('\\n=== Jotai - Atomic State ===');

// Jotai atom pattern
function atom(initialValue) {
  let value = initialValue;
  const listeners = new Set();
  
  return {
    get: () => value,
    set: (newValue) => {
      value = typeof newValue === 'function' ? newValue(value) : newValue;
      console.log('[Atom] Updated to:', value);
      listeners.forEach(l => l(value));
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  };
}

const countAtom = atom(0);
const doubledAtom = () => countAtom.get() * 2; // Derived atom

console.log('Jotai API:');
console.log('const countAtom = atom(0);');
console.log('const doubledAtom = atom(get => get(countAtom) * 2);');
console.log('');
console.log('Usage: const [count, setCount] = useAtom(countAtom);');

countAtom.set(5);
console.log('Doubled:', doubledAtom());

console.log('\\n=== Recoil - Graph-Based ===');

console.log('Recoil API:');
console.log('const userState = atom({ key: "user", default: null });');
console.log('const userNameSelector = selector({');
console.log('  key: "userName",');
console.log('  get: ({ get }) => get(userState)?.name');
console.log('});');
console.log('');
console.log('Usage: const user = useRecoilValue(userState);');

console.log('\\n=== When to Use Each ===');
console.log('');
console.log('Zustand:');
console.log('  ✓ Replace Redux/Context');
console.log('  ✓ Simple API, small bundle');
console.log('  ✓ Access outside React');
console.log('');
console.log('Jotai:');
console.log('  ✓ Fine-grained updates');
console.log('  ✓ Compose atoms');
console.log('  ✓ Async atoms built-in');
console.log('');
console.log('Recoil:');
console.log('  ✓ Complex derived state');
console.log('  ✓ Atom families (dynamic atoms)');
console.log('  ✓ Built by Meta');

console.log('\\n✓ All are modern, performant alternatives to Redux');`
  },
  {
    id: 'react-state-4',
    category: 'State Management',
    difficulty: 'Expert',
    question: 'State Normalization - Scaling Data Management',
    answer: `Critical for **large applications** at any FAANG company.

### What is Normalization?
Structuring state like a database: entities stored by ID, relationships stored as references.

### Why Normalize?
1. **No duplicate data** - Update in one place
2. **O(1) lookups** - Access by ID instantly
3. **Consistent updates** - No stale copies
4. **Better performance** - Smaller state updates

### When to Use:
- Lists with relationships (users, posts, comments)
- Data that can be updated from multiple sources
- Caching API responses

### Libraries:
- normalizr (shapes API data)
- Redux Toolkit (createEntityAdapter)
- Immer (immutable updates)`,
    codeExample: `// State Normalization Patterns
console.log('=== The Problem: Denormalized State ===');

// BAD: Denormalized (nested, duplicated)
const denormalizedState = {
  posts: [
    {
      id: 1,
      title: 'React Tips',
      author: { id: 1, name: 'Alice', avatar: 'alice.jpg' },
      comments: [
        { id: 1, text: 'Great!', author: { id: 2, name: 'Bob', avatar: 'bob.jpg' } }
      ]
    },
    {
      id: 2,
      title: 'State Management',
      author: { id: 1, name: 'Alice', avatar: 'alice.jpg' }, // Duplicated!
      comments: []
    }
  ]
};

console.log('❌ Denormalized Problems:');
console.log('   • Alice\\'s data duplicated in each post');
console.log('   • Update Alice\\'s avatar = update everywhere');
console.log('   • O(n) to find a specific post');

console.log('\\n=== Solution: Normalized State ===');

// GOOD: Normalized (flat, referenced by ID)
const normalizedState = {
  entities: {
    users: {
      1: { id: 1, name: 'Alice', avatar: 'alice.jpg' },
      2: { id: 2, name: 'Bob', avatar: 'bob.jpg' }
    },
    posts: {
      1: { id: 1, title: 'React Tips', authorId: 1, commentIds: [1] },
      2: { id: 2, title: 'State Management', authorId: 1, commentIds: [] }
    },
    comments: {
      1: { id: 1, text: 'Great!', authorId: 2, postId: 1 }
    }
  },
  ids: {
    posts: [1, 2],
    users: [1, 2]
  }
};

console.log('✓ Normalized State:');
console.log(JSON.stringify(normalizedState.entities, null, 2));

console.log('\\n=== Benefits ===');
console.log('1. Update user once, reflected everywhere');
console.log('2. O(1) lookup: state.entities.users[1]');
console.log('3. No duplicated data');

console.log('\\n=== Normalized Operations ===');

// Get post with author
function getPostWithAuthor(state, postId) {
  const post = state.entities.posts[postId];
  const author = state.entities.users[post.authorId];
  console.log('Post:', post.title, 'by', author.name);
  return { ...post, author };
}

getPostWithAuthor(normalizedState, 1);

// Update user (single update, everywhere sees it)
function updateUser(state, userId, updates) {
  const newState = {
    ...state,
    entities: {
      ...state.entities,
      users: {
        ...state.entities.users,
        [userId]: { ...state.entities.users[userId], ...updates }
      }
    }
  };
  console.log('User updated:', JSON.stringify(newState.entities.users[userId]));
  return newState;
}

updateUser(normalizedState, 1, { name: 'Alice Smith' });

console.log('\\n=== createEntityAdapter (Redux Toolkit) ===');
console.log('const usersAdapter = createEntityAdapter();');
console.log('const initialState = usersAdapter.getInitialState();');
console.log('');
console.log('usersAdapter.addOne(state, user)');
console.log('usersAdapter.updateOne(state, { id, changes })');
console.log('usersAdapter.removeOne(state, id)');

console.log('\\n✓ Normalize when you have relational data');
console.log('✓ Use createEntityAdapter for best DX');`
  },
  {
    id: 'react-state-5',
    category: 'State Management',
    difficulty: 'Hard',
    question: 'Redux Toolkit - Modern Redux Patterns',
    answer: `Still asked at **enterprises and large applications**.

### Why Redux Toolkit?
- **Less boilerplate** - createSlice handles action types
- **Immer built-in** - Write "mutating" logic safely
- **RTK Query** - Server state management
- **DevTools** - Time travel debugging

### Key APIs:
1. **configureStore** - Setup with good defaults
2. **createSlice** - Reducer + actions in one
3. **createAsyncThunk** - Async action handling
4. **createEntityAdapter** - Normalized state
5. **RTK Query** - Data fetching & caching

### When Redux Still Makes Sense:
- Large teams (predictable patterns)
- Complex state logic
- Strong DevTools need
- Server-side state (RTK Query)`,
    codeExample: `// Redux Toolkit Patterns
console.log('=== createSlice - Modern Redux ===');

// Simulating createSlice
function createSlice({ name, initialState, reducers }) {
  const actions = {};
  const reducer = (state = initialState, action) => {
    const handler = reducers[action.type.replace(name + '/', '')];
    if (handler) {
      // Immer allows "mutating" syntax
      const newState = { ...state };
      handler(newState, action);
      return newState;
    }
    return state;
  };
  
  Object.keys(reducers).forEach(key => {
    const actionType = name + '/' + key;
    actions[key] = (payload) => ({ type: actionType, payload });
    console.log('Action created:', actionType);
  });
  
  return { actions, reducer };
}

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
    incrementByAmount: (state, action) => { state.value += action.payload; }
  }
});

console.log('\\nSlice created with actions:', Object.keys(counterSlice.actions));

console.log('\\n=== Dispatch Actions ===');
let state = { value: 0 };
const dispatch = (action) => {
  state = counterSlice.reducer(state, action);
  console.log('After', action.type + ':', state.value);
};

dispatch(counterSlice.actions.increment());
dispatch(counterSlice.actions.increment());
dispatch(counterSlice.actions.incrementByAmount(10));
dispatch(counterSlice.actions.decrement());

console.log('\\n=== createAsyncThunk Pattern ===');

function createAsyncThunk(typePrefix, asyncFn) {
  const pending = typePrefix + '/pending';
  const fulfilled = typePrefix + '/fulfilled';
  const rejected = typePrefix + '/rejected';
  
  console.log('Async thunk created:');
  console.log('  • ' + pending);
  console.log('  • ' + fulfilled);
  console.log('  • ' + rejected);
  
  return async (arg) => {
    console.log('\\nDispatching:', pending);
    try {
      const result = await asyncFn(arg);
      console.log('Dispatching:', fulfilled, result);
      return result;
    } catch (error) {
      console.log('Dispatching:', rejected, error.message);
      throw error;
    }
  };
}

const fetchUser = createAsyncThunk('user/fetch', async (userId) => {
  // Simulate API call
  return { id: userId, name: 'John' };
});

console.log('\\n=== extraReducers for Async ===');
console.log('extraReducers: (builder) => {');
console.log('  builder');
console.log('    .addCase(fetchUser.pending, (state) => {');
console.log('      state.loading = true;');
console.log('    })');
console.log('    .addCase(fetchUser.fulfilled, (state, action) => {');
console.log('      state.loading = false;');
console.log('      state.user = action.payload;');
console.log('    });');
console.log('}');

console.log('\\n✓ Redux Toolkit: Modern, less boilerplate');
console.log('✓ Immer: \"Mutate\" state safely');
console.log('✓ RTK Query: Server state caching');`
  },
  {
    id: 'react-state-6',
    category: 'State Management',
    difficulty: 'Hard',
    question: 'Immer - Immutable Updates Made Easy',
    answer: `Popular at **modern companies** using complex state.

### What is Immer?
Library that lets you write "mutating" code that produces immutable updates.

### How It Works:
1. Creates a draft copy of state
2. You "mutate" the draft
3. Produces new immutable state

### Benefits:
- Simpler update logic
- No spread operators everywhere
- Better readability
- Built into Redux Toolkit

### Use Cases:
- Deep nested updates
- Complex state transformations
- Array manipulations`,
    codeExample: `// Immer - Immutable Updates
console.log('=== Without Immer (Verbose) ===');

const state = {
  user: {
    profile: {
      settings: {
        notifications: { email: true, sms: false }
      }
    }
  }
};

console.log('❌ Deep update without Immer:');
console.log('const newState = {');
console.log('  ...state,');
console.log('  user: {');
console.log('    ...state.user,');
console.log('    profile: {');
console.log('      ...state.user.profile,');
console.log('      settings: {');
console.log('        ...state.user.profile.settings,');
console.log('        notifications: {');
console.log('          ...state.user.profile.settings.notifications,');
console.log('          email: false');
console.log('        }');
console.log('      }');
console.log('    }');
console.log('  }');
console.log('};');
console.log('');
console.log('So verbose! Easy to make mistakes!');

console.log('\\n=== With Immer (Simple) ===');

console.log('\\n✓ Same update with Immer:');
console.log('const newState = produce(state, draft => {');
console.log('  draft.user.profile.settings.notifications.email = false;');
console.log('});');
console.log('');
console.log('Clean, readable, looks like mutation!');

console.log('\\n=== Array Operations ===');

console.log('\\n// Without Immer');
console.log('const todos = [{ id: 1, done: false }, { id: 2, done: false }];');
console.log('const newTodos = todos.map(t =>');
console.log('  t.id === 1 ? { ...t, done: true } : t');
console.log(');');

console.log('\\n// With Immer');
console.log('const newTodos = produce(todos, draft => {');
console.log('  const todo = draft.find(t => t.id === 1);');
console.log('  todo.done = true;');
console.log('});');

console.log('\\n=== How Immer Works ===');

function produce(baseState, recipe) {
  // Create draft (Proxy)
  const draft = JSON.parse(JSON.stringify(baseState));
  console.log('[Immer] Created draft copy');
  
  // Apply mutations
  recipe(draft);
  console.log('[Immer] Applied mutations to draft');
  
  // Return new immutable state
  console.log('[Immer] Produced new immutable state');
  return draft;
}

const result = produce(state, draft => {
  draft.user.profile.settings.notifications.sms = true;
});

console.log('\\n✓ Immer: write mutable code, get immutable results');
console.log('✓ Built into Redux Toolkit');`
  },
  {
    id: 'react-state-7',
    category: 'State Management',
    difficulty: 'Expert',
    question: 'State Machines - XState for Complex UI Logic',
    answer: `Asked at **product companies** with complex workflows.

### What are State Machines?
Formal way to model state transitions - only valid transitions allowed.

### Benefits:
- **Impossible states impossible** - Can't be in loading + error
- **Clear transitions** - Explicit state changes
- **Visualizable** - Generate diagrams
- **Testable** - Deterministic behavior

### When to Use:
- Multi-step forms/wizards
- Complex authentication flows
- Feature flags with dependencies
- Game state management

### XState Features:
- Hierarchical states
- Parallel states
- Guards (conditional transitions)
- Actions (side effects)`,
    codeExample: `// State Machines with XState
console.log('=== The Problem: Boolean Soup ===');

console.log('❌ Boolean flags (error-prone):');
console.log('const [isLoading, setLoading] = useState(false);');
console.log('const [isError, setError] = useState(false);');
console.log('const [isSuccess, setSuccess] = useState(false);');
console.log('');
console.log('Problem: Can be loading AND error (invalid!)');

console.log('\\n=== Solution: State Machine ===');

// Simple state machine
function createMachine(config) {
  let currentState = config.initial;
  
  return {
    state: currentState,
    send: (event) => {
      const transitions = config.states[currentState].on;
      const nextState = transitions?.[event];
      
      if (nextState) {
        console.log('[Machine]', currentState, '→', nextState, '(on', event + ')');
        currentState = nextState;
      } else {
        console.log('[Machine] Invalid transition:', event, 'from', currentState);
      }
    },
    getState: () => currentState
  };
}

const fetchMachine = createMachine({
  initial: 'idle',
  states: {
    idle: {
      on: { FETCH: 'loading' }
    },
    loading: {
      on: {
        SUCCESS: 'success',
        ERROR: 'error'
      }
    },
    success: {
      on: { FETCH: 'loading' }
    },
    error: {
      on: { RETRY: 'loading' }
    }
  }
});

console.log('\\nState machine transitions:');
console.log('Initial:', fetchMachine.getState());
fetchMachine.send('FETCH');
console.log('After FETCH:', fetchMachine.getState());
fetchMachine.send('SUCCESS');
console.log('After SUCCESS:', fetchMachine.getState());

console.log('\\n=== Multi-Step Form Machine ===');

const formMachine = createMachine({
  initial: 'personal',
  states: {
    personal: {
      on: { NEXT: 'address' }
    },
    address: {
      on: {
        NEXT: 'payment',
        BACK: 'personal'
      }
    },
    payment: {
      on: {
        SUBMIT: 'submitting',
        BACK: 'address'
      }
    },
    submitting: {
      on: {
        SUCCESS: 'complete',
        ERROR: 'payment'
      }
    },
    complete: {}
  }
});

console.log('\\nForm wizard:');
console.log('Step 1:', formMachine.getState());
formMachine.send('NEXT');
console.log('Step 2:', formMachine.getState());
formMachine.send('NEXT');
console.log('Step 3:', formMachine.getState());
formMachine.send('SUBMIT');
console.log('Submitting:', formMachine.getState());

console.log('\\n=== Benefits ===');
console.log('✓ Impossible states are impossible');
console.log('✓ All transitions explicit');
console.log('✓ Easy to visualize and test');
console.log('✓ Self-documenting code');

console.log('\\n=== XState Features ===');
console.log('• Hierarchical states (nested)');
console.log('• Parallel states (multiple active)');
console.log('• Guards (conditional transitions)');
console.log('• Actions (side effects on transitions)');
console.log('• Services (async operations)');

console.log('\\n✓ State machines: complex UI logic made simple');`
  }
];
