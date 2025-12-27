export const advancedHooksQuestions = [
  {
    id: 'react-adv-h1',
    category: 'Advanced Hooks',
    difficulty: 'Hard',
    question: 'useReducer vs useState - When to use each?',
    answer: `This is asked at **Google, Meta, and Airbnb** for senior roles.

### useState - Simple State
Best for:
- Independent pieces of state
- Simple values (string, number, boolean)
- State that doesn't depend on previous state

### useReducer - Complex State
Best for:
- Multiple related values that change together
- State with complex update logic
- State transitions that depend on previous state
- State where you need to pass dispatch to children

### Decision Matrix:
| Scenario | Winner |
|----------|--------|
| Simple toggle | useState |
| Form with 5+ fields | useReducer |
| Shopping cart | useReducer |
| Modal open/close | useState |
| Multi-step wizard | useReducer |
| Counter | useState |
| Undo/redo feature | useReducer |`,
    codeExample: `// useState vs useReducer - Complete Comparison
console.log('=== Simple State: useState Wins ===');

function ToggleExample() {
  const [isOpen, setIsOpen] = useState(false);
  
  console.log('useState for toggle - simple & clean');
  console.log('isOpen:', isOpen);
  setIsOpen(true);
  
  return isOpen;
}

ToggleExample();

console.log('\\n=== Complex State: useReducer Wins ===');

// Reducer for complex state management
function formReducer(state, action) {
  console.log('Action:', action.type);
  
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_ERROR':
      return { ...state, errors: { ...state.errors, [action.field]: action.error } };
    case 'RESET':
      return { name: '', email: '', errors: {} };
    case 'SUBMIT':
      return { ...state, isSubmitting: true };
    default:
      return state;
  }
}

function FormWithReducer() {
  const initialState = {
    name: '',
    email: '',
    errors: {},
    isSubmitting: false
  };
  
  // useReducer for complex form state
  let state = initialState;
  
  const dispatch = (action) => {
    state = formReducer(state, action);
    console.log('New state:', JSON.stringify(state));
  };
  
  // Simulate form interactions
  dispatch({ type: 'SET_FIELD', field: 'name', value: 'John' });
  dispatch({ type: 'SET_FIELD', field: 'email', value: 'john@example.com' });
  dispatch({ type: 'SET_ERROR', field: 'email', error: null });
  dispatch({ type: 'SUBMIT' });
  
  return state;
}

FormWithReducer();

console.log('\\n=== Shopping Cart: useReducer is Essential ===');

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const existing = state.items.find(i => i.id === action.item.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i => 
            i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i
          )
        };
      }
      return { ...state, items: [...state.items, { ...action.item, qty: 1 }] };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.id) };
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
}

let cart = { items: [] };
const cartDispatch = (action) => {
  cart = cartReducer(cart, action);
  console.log('Cart:', cart.items.length, 'items');
};

console.log('\\nBuilding cart:');
cartDispatch({ type: 'ADD_ITEM', item: { id: 1, name: 'React Book', price: 29 } });
cartDispatch({ type: 'ADD_ITEM', item: { id: 1, name: 'React Book', price: 29 } }); // Increment qty
cartDispatch({ type: 'ADD_ITEM', item: { id: 2, name: 'TypeScript Guide', price: 35 } });

console.log('Final cart:', JSON.stringify(cart.items));

console.log('\\n✓ useState: simple, independent state');
console.log('✓ useReducer: complex, related state with logic');`
  },
  {
    id: 'react-adv-h2',
    category: 'Advanced Hooks',
    difficulty: 'Expert',
    question: 'useImperativeHandle - Exposing Component APIs',
    answer: `Asked at **Stripe, Google, and Netflix** for component library work.

### What is useImperativeHandle?
Customizes the instance value exposed when using \`ref\` on a component.

### Use Cases:
1. **Custom focus management** - Expose focus() method
2. **Animation control** - play(), pause(), reset()
3. **Form methods** - validate(), submit(), reset()
4. **Third-party library wrappers** - Expose library methods

### Key Rules:
- Must be used with \`forwardRef\`
- Only expose what's necessary (minimal API)
- Prefer props over imperative methods when possible

### When to Use:
- Building reusable component libraries
- Integrating third-party libraries
- Complex focus/scroll management`,
    codeExample: `// useImperativeHandle - Custom Component APIs
console.log('=== Custom Input with Focus API ===');

// forwardRef + useImperativeHandle pattern
function createCustomInput() {
  const inputRef = useRef(null);
  
  // The imperative handle we're exposing
  const imperativeApi = {
    focus: () => {
      console.log('[CustomInput] focus() called');
      // inputRef.current?.focus();
    },
    blur: () => {
      console.log('[CustomInput] blur() called');
      // inputRef.current?.blur();
    },
    clear: () => {
      console.log('[CustomInput] clear() called');
      // inputRef.current.value = '';
    },
    getValue: () => {
      console.log('[CustomInput] getValue() called');
      return 'current value';
    }
  };
  
  console.log('Component exposes:', Object.keys(imperativeApi));
  
  return imperativeApi;
}

const inputApi = createCustomInput();
console.log('\\nUsing the imperative API:');
inputApi.focus();
inputApi.clear();
console.log('Value:', inputApi.getValue());

console.log('\\n=== Video Player with Controls ===');

function createVideoPlayer() {
  let currentTime = 0;
  let isPlaying = false;
  
  const playerApi = {
    play: () => {
      isPlaying = true;
      console.log('[VideoPlayer] ▶️ Playing');
    },
    pause: () => {
      isPlaying = false;
      console.log('[VideoPlayer] ⏸️ Paused');
    },
    seek: (time) => {
      currentTime = time;
      console.log('[VideoPlayer] ⏩ Seeking to', time + 's');
    },
    getStatus: () => ({ isPlaying, currentTime })
  };
  
  return playerApi;
}

const player = createVideoPlayer();
console.log('\\nVideo player controls:');
player.play();
player.seek(30);
player.pause();
console.log('Status:', player.getStatus());

console.log('\\n=== Form Controller API ===');

function createFormController() {
  const fields = { name: '', email: '' };
  const errors = {};
  
  return {
    setFieldValue: (field, value) => {
      fields[field] = value;
      console.log('[Form] Set', field, '=', value);
    },
    validate: () => {
      const isValid = fields.name && fields.email.includes('@');
      console.log('[Form] Validate:', isValid ? '✓ Valid' : '✗ Invalid');
      return isValid;
    },
    submit: () => {
      console.log('[Form] Submit:', JSON.stringify(fields));
    },
    reset: () => {
      Object.keys(fields).forEach(k => fields[k] = '');
      console.log('[Form] Reset');
    },
    getValues: () => fields
  };
}

const form = createFormController();
console.log('\\nForm controller:');
form.setFieldValue('name', 'John');
form.setFieldValue('email', 'john@example.com');
form.validate();
form.submit();
form.reset();

console.log('\\n✓ useImperativeHandle: expose minimal, focused APIs');
console.log('✓ Always prefer props/callbacks when possible');`
  },
  {
    id: 'react-adv-h3',
    category: 'Advanced Hooks',
    difficulty: 'Elite',
    question: 'useSyncExternalStore - Subscribe to External State',
    answer: `New React 18 hook, asked at **Meta and Vercel** for library authors.

### What is useSyncExternalStore?
A hook to subscribe to external data sources in a way that's compatible with Concurrent React.

### Why It Exists:
- **Tearing prevention** - Ensures consistent UI during concurrent renders
- **External stores** - Redux, Zustand, RxJS observables
- **Browser APIs** - localStorage, online status, media queries

### Key Parameters:
1. \`subscribe\` - Function to subscribe to the store
2. \`getSnapshot\` - Function to get current value
3. \`getServerSnapshot\` - Optional, for SSR

### Use Cases:
- Building state management libraries
- Subscribing to browser APIs
- Integrating with non-React state`,
    codeExample: `// useSyncExternalStore - External State Subscription
console.log('=== Building a Custom Store ===');

// Create a simple external store (like Redux)
function createStore(initialState) {
  let state = initialState;
  const listeners = new Set();
  
  return {
    getState: () => state,
    setState: (newState) => {
      state = typeof newState === 'function' ? newState(state) : newState;
      console.log('[Store] State updated:', JSON.stringify(state));
      listeners.forEach(listener => listener());
    },
    subscribe: (listener) => {
      listeners.add(listener);
      console.log('[Store] Subscriber added, total:', listeners.size);
      return () => {
        listeners.delete(listener);
        console.log('[Store] Subscriber removed');
      };
    }
  };
}

const counterStore = createStore({ count: 0 });

console.log('\\n--- Simulating useSyncExternalStore ---');

// This is what useSyncExternalStore does internally
function useExternalStore(store) {
  // 1. Subscribe to changes
  const unsubscribe = store.subscribe(() => {
    console.log('[Component] Store changed, re-rendering...');
  });
  
  // 2. Get current snapshot
  const snapshot = store.getState();
  console.log('[Component] Current snapshot:', JSON.stringify(snapshot));
  
  return snapshot;
}

// Component using the store
function Counter() {
  const state = useExternalStore(counterStore);
  console.log('Counter value:', state.count);
  return state.count;
}

Counter();

console.log('\\n--- Updating external store ---');
counterStore.setState({ count: 1 });
counterStore.setState(prev => ({ count: prev.count + 1 }));
counterStore.setState(prev => ({ count: prev.count + 1 }));

console.log('\\n=== Browser API: Online Status ===');

function createOnlineStore() {
  let isOnline = true; // navigator.onLine
  const listeners = new Set();
  
  return {
    getSnapshot: () => isOnline,
    subscribe: (callback) => {
      listeners.add(callback);
      console.log('[Online] Subscribed to online status');
      return () => listeners.delete(callback);
    },
    // Simulate going offline
    setOffline: () => {
      isOnline = false;
      console.log('[Browser] Went offline');
      listeners.forEach(l => l());
    },
    setOnline: () => {
      isOnline = true;
      console.log('[Browser] Back online');
      listeners.forEach(l => l());
    }
  };
}

const onlineStore = createOnlineStore();
onlineStore.subscribe(() => {
  console.log('[App] Online status:', onlineStore.getSnapshot());
});

onlineStore.setOffline();
onlineStore.setOnline();

console.log('\\n✓ useSyncExternalStore: safe subscription to external state');
console.log('✓ Prevents tearing in Concurrent React');
console.log('✓ Essential for library authors');`
  },
  {
    id: 'react-adv-h4',
    category: 'Advanced Hooks',
    difficulty: 'Hard',
    question: 'useLayoutEffect vs useEffect - Critical Differences',
    answer: `Asked at **every FAANG company** - getting this wrong causes visual bugs!

### The Key Difference:
- **useEffect:** Runs AFTER paint (asynchronous)
- **useLayoutEffect:** Runs BEFORE paint (synchronous)

### useEffect (99% of cases):
- Data fetching
- Subscriptions
- Event listeners
- Logging/analytics

### useLayoutEffect (rare):
- DOM measurements (getBoundingClientRect)
- DOM mutations that must be visible immediately
- Scroll position sync
- Tooltips positioning
- Animation setup

### Warning:
useLayoutEffect blocks painting! Use sparingly or you'll cause jank.`,
    codeExample: `// useLayoutEffect vs useEffect - Timing Demo
console.log('=== Execution Order Demo ===');

function LayoutEffectDemo() {
  console.log('1. Component function runs');
  
  // useLayoutEffect - runs BEFORE paint
  useEffect(() => {
    console.log('3. useLayoutEffect - BEFORE browser paint');
    console.log('   Good for: DOM measurements, mutations');
    
    return () => console.log('   Cleanup: useLayoutEffect');
  }, []);
  
  // useEffect - runs AFTER paint
  useEffect(() => {
    console.log('4. useEffect - AFTER browser paint');
    console.log('   Good for: data fetching, subscriptions');
    
    return () => console.log('   Cleanup: useEffect');
  }, []);
  
  console.log('2. Component returns JSX');
  return 'Component';
}

LayoutEffectDemo();

console.log('\\n=== When useLayoutEffect is Essential ===');

function TooltipPositioning() {
  const buttonRef = useRef(null);
  const tooltipRef = useRef(null);
  
  // Simulated button position
  const buttonRect = { top: 100, left: 200, width: 80, height: 30 };
  
  // useLayoutEffect for positioning BEFORE paint
  useEffect(() => {
    // Without useLayoutEffect, tooltip would flash in wrong position
    const tooltipPos = {
      top: buttonRect.top - 40,
      left: buttonRect.left + buttonRect.width / 2
    };
    console.log('[Tooltip] Positioned at:', tooltipPos);
    console.log('[Tooltip] User never sees wrong position!');
  }, []);
  
  return 'Tooltip';
}

TooltipPositioning();

console.log('\\n=== Scroll Restoration Example ===');

function ScrollRestoration() {
  const scrollPosition = 500; // From router state
  
  // Must happen BEFORE paint to avoid flash
  useEffect(() => {
    console.log('[Scroll] Restoring to:', scrollPosition + 'px');
    // window.scrollTo(0, scrollPosition);
    console.log('[Scroll] Happened before user saw page at top!');
  }, []);
  
  return 'Page';
}

ScrollRestoration();

console.log('\\n=== Animation Measurements ===');

function AnimatedBox() {
  useEffect(() => {
    console.log('[Animation] Measuring element dimensions...');
    const dimensions = { width: 200, height: 150 };
    console.log('[Animation] Setting up animation with:', dimensions);
    console.log('[Animation] FLIP technique requires useLayoutEffect');
  }, []);
  
  return 'AnimatedBox';
}

AnimatedBox();

console.log('\\n✓ useEffect: 99% of cases (async, after paint)');
console.log('✓ useLayoutEffect: DOM measurements & mutations');
console.log('⚠️ useLayoutEffect blocks paint - use sparingly!');`
  },
  {
    id: 'react-adv-h5',
    category: 'Advanced Hooks',
    difficulty: 'Hard',
    question: 'Building Production-Ready Custom Hooks',
    answer: `Tested at **all senior+ interviews** - shows deep React understanding.

### Production Hook Requirements:
1. **Error handling** - Graceful failures
2. **Loading states** - Proper UX
3. **Cleanup** - No memory leaks
4. **Memoization** - Stable references
5. **Type safety** - TypeScript ready
6. **Testing** - Isolated and testable

### Common Production Hooks:
- useFetch - API calls with caching
- useLocalStorage - Persistent state
- useMediaQuery - Responsive design
- useDebounce - Input optimization
- useOnClickOutside - Modal/dropdown dismissal`,
    codeExample: `// Production-Ready Custom Hooks
console.log('=== useFetch - Production API Hook ===');

function useFetch(url) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null
  });
  
  const cache = useRef({});
  
  useEffect(() => {
    // Check cache first
    if (cache.current[url]) {
      console.log('[useFetch] Cache hit for:', url);
      setState({ data: cache.current[url], loading: false, error: null });
      return;
    }
    
    console.log('[useFetch] Fetching:', url);
    
    // Abort controller for cleanup
    const abortController = { aborted: false };
    
    // Simulate fetch
    setTimeout(() => {
      if (abortController.aborted) {
        console.log('[useFetch] Request aborted');
        return;
      }
      
      const data = { users: ['Alice', 'Bob'] };
      cache.current[url] = data;
      console.log('[useFetch] Success:', JSON.stringify(data));
    }, 100);
    
    // Cleanup
    return () => {
      abortController.aborted = true;
      console.log('[useFetch] Cleanup: aborting request');
    };
  }, [url]);
  
  return state;
}

useFetch('/api/users');

console.log('\\n=== useLocalStorage - Persistent State ===');

function useLocalStorage(key, initialValue) {
  // Get from localStorage or use initial
  const stored = null; // localStorage.getItem(key)
  const initial = stored ? JSON.parse(stored) : initialValue;
  
  const [value, setValue] = useState(initial);
  
  // Sync to localStorage
  useEffect(() => {
    console.log('[useLocalStorage] Syncing to storage:', key, '=', value);
    // localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  
  // Listen for changes from other tabs
  useEffect(() => {
    console.log('[useLocalStorage] Listening for cross-tab changes');
    return () => console.log('[useLocalStorage] Cleanup listener');
  }, [key]);
  
  return [value, setValue];
}

const [theme, setTheme] = useLocalStorage('theme', 'dark');
console.log('Theme:', theme);

console.log('\\n=== useDebounce - Input Optimization ===');

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    console.log('[useDebounce] Timer set for:', value, '(' + delay + 'ms)');
    
    const timer = setTimeout(() => {
      console.log('[useDebounce] Debounced value:', value);
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      console.log('[useDebounce] Timer cleared');
      // clearTimeout(timer);
    };
  }, [value, delay]);
  
  return debouncedValue;
}

const debouncedSearch = useDebounce('react', 300);

console.log('\\n=== useOnClickOutside - Dismissal ===');

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    console.log('[useOnClickOutside] Attaching listener');
    
    const listener = (event) => {
      // Check if click was outside ref
      console.log('[useOnClickOutside] Click detected');
      handler(event);
    };
    
    // document.addEventListener('mousedown', listener);
    // document.addEventListener('touchstart', listener);
    
    return () => {
      console.log('[useOnClickOutside] Removing listeners');
    };
  }, [ref, handler]);
}

const modalRef = useRef(null);
useOnClickOutside(modalRef, () => console.log('Close modal'));

console.log('\\n✓ Production hooks: error handling, cleanup, caching');
console.log('✓ Always include abort/cleanup logic');`
  },
  {
    id: 'react-adv-h6',
    category: 'Advanced Hooks',
    difficulty: 'Expert',
    question: 'Rules of Hooks - Why They Exist and Edge Cases',
    answer: `Deep understanding asked at **Meta and Google L5+** interviews.

### The Two Rules:
1. **Only call at top level** - Never in conditions, loops, nested functions
2. **Only call from React functions** - Components or custom hooks

### Why Rules Exist:
React relies on **call order** to track hook state. Hooks are stored in a linked list, matched by position.

### What Happens on Violation:
- Hooks get matched with wrong state
- Stale/incorrect values
- Mysterious bugs that are hard to debug

### Edge Cases to Know:
- OK in early returns IF before all hooks
- NOT OK in callbacks or event handlers
- OK to call hooks conditionally inside custom hooks (if parent always calls)`,
    codeExample: `// Rules of Hooks - Deep Dive
console.log('=== Why Hooks Have Rules ===');

// Simulating React's hook tracking
let hookIndex = 0;
const hooks = [];

function useState_sim(initial) {
  const currentIndex = hookIndex;
  
  if (hooks[currentIndex] === undefined) {
    hooks[currentIndex] = initial;
    console.log('[Render 1] Hook', currentIndex, 'initialized:', initial);
  } else {
    console.log('[Render 2] Hook', currentIndex, 'retrieved:', hooks[currentIndex]);
  }
  
  const setState = (newValue) => {
    hooks[currentIndex] = newValue;
  };
  
  hookIndex++;
  return [hooks[currentIndex], setState];
}

console.log('\\n--- Correct Usage ---');
function GoodComponent(showExtra) {
  hookIndex = 0; // Reset for new render
  
  // These are ALWAYS called in the same order
  const [name, setName] = useState_sim('John');
  const [age, setAge] = useState_sim(25);
  const [email, setEmail] = useState_sim('john@example.com');
  
  console.log('Values: name=' + name + ', age=' + age + ', email=' + email);
}

console.log('First render:');
GoodComponent(true);

console.log('\\nSecond render:');
GoodComponent(true);

console.log('\\n--- BAD: Conditional Hook Call ---');
function BadComponent(showExtra) {
  hookIndex = 0;
  
  const [name] = useState_sim('John');
  
  // ❌ WRONG: Conditional hook!
  if (showExtra) {
    console.log('⚠️ Conditional hook called!');
    const [extra] = useState_sim('extra data');
  }
  
  const [age] = useState_sim(25);
  
  console.log('What React sees:');
  console.log('  Render 1: [name, extra, age] - 3 hooks');
  console.log('  Render 2: [name, age] - 2 hooks');
  console.log('  ❌ Hook order changed! age gets extra\\'s value!');
}

console.log('\\n--- How React Tracks Hooks ---');
console.log('React uses a LINKED LIST:');
console.log('  Fiber -> Hook1 -> Hook2 -> Hook3');
console.log('  Each hook has: { memoizedState, next }');
console.log('  Matched by POSITION, not name!');

console.log('\\n--- Valid Patterns ---');
console.log('✓ Early return BEFORE hooks:');
console.log('  if (!isReady) return null;');
console.log('  const [state] = useState(0);');

console.log('\\n✓ Conditional INSIDE custom hook:');
console.log('  function useOptionalFeature(enabled) {');
console.log('    // Parent always calls useOptionalFeature');
console.log('    const value = enabled ? computeValue() : null;');
console.log('    return value;');
console.log('  }');

console.log('\\n❌ Invalid: Hook in event handler');
console.log('  onClick={() => {');
console.log('    useState(0); // WRONG!');
console.log('  });');

console.log('\\n✓ Rules ensure consistent hook state across renders');`
  },
  {
    id: 'react-adv-h7',
    category: 'Advanced Hooks',
    difficulty: 'Medium',
    question: 'useDebugValue - Custom Hook Debugging',
    answer: `Useful for **library authors** and complex custom hooks.

### What is useDebugValue?
Displays a label in React DevTools for custom hooks.

### When to Use:
- Building reusable hook libraries
- Complex custom hooks
- Debugging hook behavior

### Features:
- Only shows in DevTools
- Can format value with function
- Zero production overhead

### Best Practice:
Use for hooks that will be used by other developers.`,
    codeExample: `// useDebugValue
console.log('=== useDebugValue for Custom Hooks ===');

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);
  
  // Shows in DevTools as "OnlineStatus: Online"
  useDebugValue(isOnline ? 'Online' : 'Offline');
  
  console.log('[useOnlineStatus] Current status:', isOnline ? 'Online' : 'Offline');
  
  return isOnline;
}

useOnlineStatus();

console.log('\\n=== Formatted Debug Value ===');

function useUserData(userId) {
  const [user, setUser] = useState({ id: userId, name: 'John', role: 'admin' });
  
  // Format function only called when DevTools is open
  useDebugValue(user, u => \`User: \${u.name} (\${u.role})\`);
  
  console.log('[useUserData] Debug label: User: John (admin)');
  
  return user;
}

useUserData(1);

console.log('\\n=== When to Use ===');
console.log('✓ Custom hooks in libraries');
console.log('✓ Complex hook behavior');
console.log('✓ Debugging state machines');
console.log('');
console.log('✗ Simple hooks (unnecessary)');
console.log('✗ Private hooks (not exposed)');

console.log('\\n✓ useDebugValue: better DevTools experience');`
  },
  {
    id: 'react-adv-h8',
    category: 'Advanced Hooks',
    difficulty: 'Expert',
    question: 'useInsertionEffect - CSS-in-JS Performance',
    answer: `React 18 hook for **CSS-in-JS libraries**.

### What is useInsertionEffect?
Fires before DOM mutations, perfect for injecting styles.

### Timing:
1. useInsertionEffect (inject styles)
2. useLayoutEffect (read layout)
3. Browser paint
4. useEffect (side effects)

### Use Cases:
- CSS-in-JS libraries (styled-components, emotion)
- Dynamic style injection
- Critical CSS insertion

### Library Authors Only:
Regular apps should NOT use this - it's for library internals.`,
    codeExample: `// useInsertionEffect
console.log('=== useInsertionEffect for CSS-in-JS ===');

function useInsertionEffect(effect, deps) {
  console.log('[useInsertionEffect] Injecting styles BEFORE layout');
  effect();
}

function useCSS(css) {
  useInsertionEffect(() => {
    const styleId = 'dynamic-style-' + Math.random();
    console.log('[CSS] Injecting:', styleId);
    console.log('[CSS] Styles:', css);
    
    // In real implementation:
    // const style = document.createElement('style');
    // style.textContent = css;
    // document.head.appendChild(style);
    
    return () => {
      console.log('[CSS] Cleanup:', styleId);
    };
  }, [css]);
}

console.log('\\nComponent using dynamic CSS:');
useCSS('.button { color: blue; }');

console.log('\\n=== Execution Order ===');
console.log('1. useInsertionEffect → Inject CSS');
console.log('2. useLayoutEffect → Read layout');
console.log('3. Browser paint');
console.log('4. useEffect → Side effects');

console.log('\\n=== Why It Exists ===');
console.log('Problem: CSS injected in useLayoutEffect causes:');
console.log('  • Flash of unstyled content');
console.log('  • Layout thrashing');
console.log('');
console.log('Solution: useInsertionEffect injects BEFORE layout read');

console.log('\\n✓ useInsertionEffect: for CSS-in-JS libraries only');
console.log('✓ Regular apps: use useLayoutEffect or useEffect');`
  }
];
