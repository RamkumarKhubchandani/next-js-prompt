export const day26 = {
  day: 26,
  title: "Custom Hooks Mastery: 10 Production Hooks",
  intro: "Build your own hook library. useDebounce, useThrottle, useLocalStorage, usePrevious, and more.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 26. Custom Hooks separate logic from UI. Let's fix a common bug in `useDebounce`."
      },
      {
        type: "challenge",
        instruction: "This debounce hook is buggy. It sets multiple timers if the value changes fast. Fix it by cleaning up.",
        buggyCode: `// ❌ Memory Leak / Race Condition
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  
  useEffect(() => {
    setTimeout(() => {
      setDebounced(value);
    }, delay);
  }, [value, delay]);
  
  return debounced;
}`,
        solutionCode: `// ✅ Cleaned up
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return debounced;
}`,
        verifyOutput: "clearTimeout",
        successMessage: "Correct! Always return a cleanup function from `useEffect` when using timers or subscriptions.",
        hint: "Store the timer ID and clear it in the return function: `return () => clearTimeout(timer)`."
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 Hooks You'll Build</h3>
<ol class="list-decimal list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">useDebounce</code> - Delay value updates</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">useThrottle</code> - Limit update frequency</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">useLocalStorage</code> - Persist state to localStorage</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">usePrevious</code> - Access previous render's value</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">useToggle</code> - Boolean state with toggle function</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">useClickOutside</code> - Detect clicks outside element</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">useWindowSize</code> - Track window dimensions</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">useMediaQuery</code> - CSS media query as state</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">useFetch</code> - Data fetching with loading/error</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">useKeyPress</code> - Detect keyboard shortcuts</li>
</ol>

<div class="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-200 dark:border-green-500/30 p-4 rounded-xl mb-6">
<h4 class="text-green-600 dark:text-green-400 font-bold mb-2">🏆 Why Build Custom Hooks?</h4>
<p class="text-gray-600 dark:text-light-300">Custom hooks show senior-level React understanding. They demonstrate ability to abstract complexity, follow DRY principles, and create reusable code.</p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Hook Rules Reminder</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li>Only call hooks at the top level (no conditions/loops)</li>
<li>Only call hooks from React functions</li>
<li>Name must start with <code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">use</code></li>
</ul>
            `,
  code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  🪝 CUSTOM HOOKS LIBRARY                                              ║
║  10 Production-Ready Hooks Every Senior Dev Should Know              ║
╠══════════════════════════════════════════════════════════════════════╣
║  1. useDebounce      6. useClickOutside                              ║
║  2. useThrottle      7. useWindowSize                                ║
║  3. useLocalStorage  8. useMediaQuery                                ║
║  4. usePrevious      9. useFetch                                     ║
║  5. useToggle       10. useKeyPress                                  ║
╚══════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════
// 1️⃣ useDebounce - Delay value updates
// ═══════════════════════════════════════════════════════════════════
function useDebounce(value, delay = 300) {
const [debouncedValue, setDebouncedValue] = React.useState(value);

React.useEffect(() => {
const timer = setTimeout(() => setDebouncedValue(value), delay);
return () => clearTimeout(timer);
}, [value, delay]);

return debouncedValue;
}

// ═══════════════════════════════════════════════════════════════════
// 2️⃣ useThrottle - Limit update frequency
// ═══════════════════════════════════════════════════════════════════
function useThrottle(value, limit = 300) {
const [throttledValue, setThrottledValue] = React.useState(value);
const lastRan = React.useRef(Date.now());

React.useEffect(() => {
const handler = setTimeout(() => {
  if (Date.now() - lastRan.current >= limit) {
    setThrottledValue(value);
    lastRan.current = Date.now();
  }
}, limit - (Date.now() - lastRan.current));

return () => clearTimeout(handler);
}, [value, limit]);

return throttledValue;
}

// ═══════════════════════════════════════════════════════════════════
// 3️⃣ useLocalStorage - Persist state
// ═══════════════════════════════════════════════════════════════════
function useLocalStorage(key, initialValue) {
const [storedValue, setStoredValue] = React.useState(() => {
try {
  const item = window.localStorage.getItem(key);
  return item ? JSON.parse(item) : initialValue;
} catch (error) {
  return initialValue;
}
});

const setValue = (value) => {
try {
  const valueToStore = value instanceof Function ? value(storedValue) : value;
  setStoredValue(valueToStore);
  window.localStorage.setItem(key, JSON.stringify(valueToStore));
} catch (error) {
  console.error(error);
}
};

return [storedValue, setValue];
}

// ═══════════════════════════════════════════════════════════════════
// 4️⃣ usePrevious - Access previous value
// ═══════════════════════════════════════════════════════════════════
function usePrevious(value) {
const ref = React.useRef();
React.useEffect(() => {
ref.current = value;
}, [value]);
return ref.current;
}

// ═══════════════════════════════════════════════════════════════════
// 5️⃣ useToggle - Boolean with toggle
// ═══════════════════════════════════════════════════════════════════
function useToggle(initialValue = false) {
const [value, setValue] = React.useState(initialValue);
const toggle = React.useCallback(() => setValue(v => !v), []);
return [value, toggle];
}

// ═══════════════════════════════════════════════════════════════════
// 6️⃣ useClickOutside - Detect outside clicks
// ═══════════════════════════════════════════════════════════════════
function useClickOutside(ref, handler) {
React.useEffect(() => {
const listener = (event) => {
  if (!ref.current || ref.current.contains(event.target)) return;
  handler(event);
};
document.addEventListener('mousedown', listener);
document.addEventListener('touchstart', listener);
return () => {
  document.removeEventListener('mousedown', listener);
  document.removeEventListener('touchstart', listener);
};
}, [ref, handler]);
}

// ═══════════════════════════════════════════════════════════════════
// 7️⃣ useWindowSize - Track dimensions
// ═══════════════════════════════════════════════════════════════════
function useWindowSize() {
const [size, setSize] = React.useState({
width: window.innerWidth,
height: window.innerHeight
});

React.useEffect(() => {
const handleResize = () => {
  setSize({ width: window.innerWidth, height: window.innerHeight });
};
window.addEventListener('resize', handleResize);
return () => window.removeEventListener('resize', handleResize);
}, []);

return size;
}

// ═══════════════════════════════════════════════════════════════════
// 8️⃣ useMediaQuery - CSS media query as state
// ═══════════════════════════════════════════════════════════════════
function useMediaQuery(query) {
const [matches, setMatches] = React.useState(
() => window.matchMedia(query).matches
);

React.useEffect(() => {
const mediaQuery = window.matchMedia(query);
const handler = (e) => setMatches(e.matches);
mediaQuery.addEventListener('change', handler);
return () => mediaQuery.removeEventListener('change', handler);
}, [query]);

return matches;
}

// ═══════════════════════════════════════════════════════════════════
// 9️⃣ useFetch - Data fetching
// ═══════════════════════════════════════════════════════════════════
function useFetch(url) {
const [state, setState] = React.useState({
data: null,
isLoading: true,
error: null
});

React.useEffect(() => {
const controller = new AbortController();

setState({ data: null, isLoading: true, error: null });

fetch(url, { signal: controller.signal })
  .then(res => res.json())
  .then(data => setState({ data, isLoading: false, error: null }))
  .catch(error => {
    if (error.name !== 'AbortError') {
      setState({ data: null, isLoading: false, error });
    }
  });

return () => controller.abort();
}, [url]);

return state;
}

// ═══════════════════════════════════════════════════════════════════
// 🔟 useKeyPress - Detect key press
// ═══════════════════════════════════════════════════════════════════
function useKeyPress(targetKey) {
const [keyPressed, setKeyPressed] = React.useState(false);

React.useEffect(() => {
const downHandler = ({ key }) => {
  if (key === targetKey) setKeyPressed(true);
};
const upHandler = ({ key }) => {
  if (key === targetKey) setKeyPressed(false);
};

window.addEventListener('keydown', downHandler);
window.addEventListener('keyup', upHandler);

return () => {
  window.removeEventListener('keydown', downHandler);
  window.removeEventListener('keyup', upHandler);
};
}, [targetKey]);

return keyPressed;
}

// ═══════════════════════════════════════════════════════════════════
// 🎮 DEMO APP
// ═══════════════════════════════════════════════════════════════════
function App() {
// Demo: useDebounce
const [searchTerm, setSearchTerm] = React.useState('');
const debouncedSearch = useDebounce(searchTerm, 500);

// Demo: useLocalStorage
const [name, setName] = useLocalStorage('user-name', 'Guest');

// Demo: useToggle
const [isDark, toggleDark] = useToggle(false);

// Demo: usePrevious
const [count, setCount] = React.useState(0);
const prevCount = usePrevious(count);

// Demo: useWindowSize
const { width, height } = useWindowSize();

// Demo: useMediaQuery
const isMobile = useMediaQuery('(max-width: 768px)');

// Demo: useKeyPress
const escPressed = useKeyPress('Escape');

return (
<div style={{ 
  fontFamily: 'system-ui', 
  padding: '20px',
  background: isDark ? '#1e293b' : 'white',
  color: isDark ? 'white' : '#1e293b',
  minHeight: '100vh',
  transition: 'all 0.3s'
}}>
  <h2>🪝 Custom Hooks Demo</h2>
  
  <div style={{ display: 'grid', gap: '20px', maxWidth: '600px' }}>
    {/* useDebounce */}
    <section style={{ padding: '15px', background: isDark ? '#334155' : '#f1f5f9', borderRadius: '8px' }}>
      <h4>1. useDebounce</h4>
      <input 
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Type to search..."
        style={{ padding: '8px', width: '100%', boxSizing: 'border-box' }}
      />
      <p style={{ fontSize: '14px', margin: '8px 0 0' }}>
        Typed: "{searchTerm}" | Debounced (500ms): "{debouncedSearch}"
      </p>
    </section>

    {/* useLocalStorage */}
    <section style={{ padding: '15px', background: isDark ? '#334155' : '#f1f5f9', borderRadius: '8px' }}>
      <h4>3. useLocalStorage</h4>
      <input 
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Your name..."
        style={{ padding: '8px', width: '100%', boxSizing: 'border-box' }}
      />
      <p style={{ fontSize: '14px', margin: '8px 0 0' }}>
        Refresh the page - your name persists! 💾
      </p>
    </section>

    {/* useToggle */}
    <section style={{ padding: '15px', background: isDark ? '#334155' : '#f1f5f9', borderRadius: '8px' }}>
      <h4>5. useToggle</h4>
      <button onClick={toggleDark} style={{ padding: '8px 16px' }}>
        {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
    </section>

    {/* usePrevious */}
    <section style={{ padding: '15px', background: isDark ? '#334155' : '#f1f5f9', borderRadius: '8px' }}>
      <h4>4. usePrevious</h4>
      <button onClick={() => setCount(c => c + 1)} style={{ padding: '8px 16px' }}>
        Increment ({count})
      </button>
      <p style={{ fontSize: '14px', margin: '8px 0 0' }}>
        Current: {count} | Previous: {prevCount ?? 'N/A'}
      </p>
    </section>

    {/* useWindowSize & useMediaQuery */}
    <section style={{ padding: '15px', background: isDark ? '#334155' : '#f1f5f9', borderRadius: '8px' }}>
      <h4>7 & 8. useWindowSize + useMediaQuery</h4>
      <p style={{ fontSize: '14px', margin: 0 }}>
        Window: {width} x {height} | 
        Device: {isMobile ? '📱 Mobile' : '💻 Desktop'}
      </p>
    </section>

    {/* useKeyPress */}
    <section style={{ padding: '15px', background: isDark ? '#334155' : '#f1f5f9', borderRadius: '8px' }}>
      <h4>10. useKeyPress</h4>
      <p style={{ fontSize: '14px', margin: 0 }}>
        Press <kbd style={{ background: '#ddd', padding: '2px 6px', borderRadius: '4px' }}>Escape</kbd>: 
        {escPressed ? ' ✅ Pressed!' : ' ⏳ Not pressed'}
      </p>
    </section>
  </div>
</div>
);
}`,
  comparison: {
    junior: `// ❌ Inline debounce (broken)
useEffect(() => {
setTimeout(() => {
fetchResults(query); // No cleanup! Multiple timers!
}, 300);
}, [query]);`,
    senior: `// ✅ Proper debounce hook
function useDebounce(value, delay) {
const [debounced, setDebounced] = useState(value);
useEffect(() => {
const timer = setTimeout(() => setDebounced(value), delay);
return () => clearTimeout(timer); // Cleanup!
}, [value, delay]);
return debounced;
}`
  },
  interview: {
    questions: [
      {
        q: "What's the difference between debounce and throttle?",
        a: "Debounce waits until input STOPS for X ms, then fires once (good for search). Throttle fires at most once every X ms while input is active (good for scroll/resize). Debounce = final value, Throttle = regular updates."
      },
      {
        q: "Why use useCallback in useToggle?",
        a: "The toggle function's identity never needs to change. useCallback with empty deps ensures the same function reference across renders, preventing unnecessary re-renders of children that receive toggle as a prop."
      },
      {
        q: "How does useFetch handle race conditions?",
        a: "Using AbortController. When the URL changes, the cleanup function aborts the previous request before starting a new one. We also check for AbortError in the catch block to avoid setting error state for intentional aborts."
      }
    ]
  }
};
