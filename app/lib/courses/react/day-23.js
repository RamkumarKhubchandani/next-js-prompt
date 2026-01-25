export const day23 = {
  day: 23,
  title: "Machine Coding: Build Autocomplete from Scratch",
  intro: "The #1 frontend interview problem. Build a production-grade typeahead with debouncing, keyboard navigation, and caching.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 23. You have 45 minutes to build an Autocomplete. If you fetch on every keystroke, you fail."
      },
      {
        type: "challenge",
        instruction: "This search function fires on every keystroke. Optimise it with a 'debounce' strategy.",
        buggyCode: `// ❌ API Spam
function Search({ onSearch }) {
  const handleChange = (e) => {
    fetch('/api?q=' + e.target.value);
  };
  return <input onChange={handleChange} />;
}`,
        solutionCode: `// ✅ Debounced
function Search({ onSearch }) {
  const handleChange = (e) => {
    const value = e.target.value;
    // Clear previous timer
    if (timer) clearTimeout(timer);
    
    // Set new timer
    timer = setTimeout(() => {
      fetch('/api?q=' + value);
    }, 300);
  };
  return <input onChange={handleChange} />;
}`,
        verifyOutput: "setTimeout",
        successMessage: "Correct! Debouncing waits for the user to pause typing before making a request, saving API quota and reducing lag.",
        hint: "Use `setTimeout` to delay the fetch, and `clearTimeout` to cancel previous ones."
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You'll Build</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li>Full autocomplete/typeahead component</li>
<li>Debounced API calls (no API spam)</li>
<li>Keyboard navigation (Arrow keys + Enter)</li>
<li>Click-outside-to-close behavior</li>
<li>Results caching for performance</li>
<li>Loading and error states</li>
</ul>

<div class="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 p-4 rounded-xl mb-6">
<h4 class="text-yellow-600 dark:text-yellow-400 font-bold mb-2">⚠️ Interview Reality Check</h4>
<p class="text-gray-600 dark:text-light-300">This exact problem is asked at Google, Meta, Amazon, and every top startup. You MUST be able to build this in 45 minutes.</p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Key Concepts</h3>

<h4 class="text-lg font-semibold text-cyan-400 mb-2">1. Debouncing: Don't Spam the API</h4>
<p class="mb-4 text-gray-600 dark:text-light-300">Wait for the user to stop typing before making a request.</p>
<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-gray-800 dark:text-cyan-300">function useDebounce(value, delay) {
const [debouncedValue, setDebouncedValue] = useState(value);

useEffect(() => {
const timer = setTimeout(() => setDebouncedValue(value), delay);
return () => clearTimeout(timer);
}, [value, delay]);

return debouncedValue;
}</pre>
</div>

<h4 class="text-lg font-semibold text-cyan-400 mb-2">2. Keyboard Navigation: A11y Matters</h4>
<p class="mb-4 text-gray-600 dark:text-light-300">Track the highlighted index and respond to key events.</p>

<h4 class="text-lg font-semibold text-cyan-400 mb-2">3. Caching: Don't Re-fetch</h4>
<p class="mb-4 text-gray-600 dark:text-light-300">Store previous results in a Map or object to avoid duplicate requests.</p>
            `,
  code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  🔍 PRODUCTION AUTOCOMPLETE / TYPEAHEAD                              ║
║  The #1 Frontend Interview Question - Build it in 45 minutes!        ║
╠══════════════════════════════════════════════════════════════════════╣
║  FEATURES:                                                           ║
║  ✅ Debounced API calls (300ms)                                      ║
║  ✅ Keyboard navigation (↑↓ + Enter)                                 ║
║  ✅ Click outside to close                                           ║
║  ✅ Results caching                                                  ║
║  ✅ Loading & error states                                           ║
║  ✅ Highlight matching text                                          ║
╚══════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════
// 🪝 CUSTOM HOOK: useDebounce
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
// 🪝 CUSTOM HOOK: useClickOutside
// ═══════════════════════════════════════════════════════════════════
function useClickOutside(ref, handler) {
React.useEffect(() => {
const listener = (event) => {
  if (!ref.current || ref.current.contains(event.target)) return;
  handler();
};
document.addEventListener('mousedown', listener);
return () => document.removeEventListener('mousedown', listener);
}, [ref, handler]);
}

// ═══════════════════════════════════════════════════════════════════
// 📦 MOCK API (Replace with real API in production)
// ═══════════════════════════════════════════════════════════════════
const MOCK_DATA = [
'JavaScript', 'Java', 'Python', 'TypeScript', 'PHP', 
'C++', 'C#', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin',
'React', 'Redux', 'Angular', 'Vue', 'Svelte', 'Next.js'
];

const searchAPI = async (query) => {
await new Promise(r => setTimeout(r, 200 + Math.random() * 300)); // Simulate latency
if (Math.random() < 0.05) throw new Error('API Error'); // 5% chance of error
return MOCK_DATA.filter(item => 
item.toLowerCase().includes(query.toLowerCase())
);
};

// ═══════════════════════════════════════════════════════════════════
// 🧩 HIGHLIGHT COMPONENT
// ═══════════════════════════════════════════════════════════════════
function HighlightMatch({ text, query }) {
if (!query) return <span>{text}</span>;

const regex = new RegExp(\`(\${query})\`, 'gi');
const parts = text.split(regex);

return (
<span>
  {parts.map((part, i) => 
    regex.test(part) 
      ? <mark key={i} style={{ background: '#fef08a', padding: '0 2px' }}>{part}</mark>
      : part
  )}
</span>
);
}

// ═══════════════════════════════════════════════════════════════════
// 🔍 MAIN AUTOCOMPLETE COMPONENT
// ═══════════════════════════════════════════════════════════════════
function Autocomplete() {
const [query, setQuery] = React.useState('');
const [results, setResults] = React.useState([]);
const [isOpen, setIsOpen] = React.useState(false);
const [isLoading, setIsLoading] = React.useState(false);
const [error, setError] = React.useState(null);
const [highlightedIndex, setHighlightedIndex] = React.useState(-1);

const containerRef = React.useRef(null);
const inputRef = React.useRef(null);
const cache = React.useRef(new Map());

const debouncedQuery = useDebounce(query, 300);

useClickOutside(containerRef, () => setIsOpen(false));

// ═══════════════════════════════════════════════════════════════
// 🔄 FETCH RESULTS (with caching)
// ═══════════════════════════════════════════════════════════════
React.useEffect(() => {
const fetchResults = async () => {
  if (!debouncedQuery.trim()) {
    setResults([]);
    setIsOpen(false);
    return;
  }

  // Check cache first!
  if (cache.current.has(debouncedQuery)) {
    setResults(cache.current.get(debouncedQuery));
    setIsOpen(true);
    return;
  }

  setIsLoading(true);
  setError(null);
  
  try {
    const data = await searchAPI(debouncedQuery);
    cache.current.set(debouncedQuery, data); // Cache it!
    setResults(data);
    setIsOpen(true);
  } catch (err) {
    setError('Failed to fetch results. Try again.');
    setResults([]);
  } finally {
    setIsLoading(false);
  }
};

fetchResults();
}, [debouncedQuery]);

// ═══════════════════════════════════════════════════════════════
// ⌨️ KEYBOARD NAVIGATION
// ═══════════════════════════════════════════════════════════════
const handleKeyDown = (e) => {
if (!isOpen) return;

switch (e.key) {
  case 'ArrowDown':
    e.preventDefault();
    setHighlightedIndex(prev => 
      prev < results.length - 1 ? prev + 1 : 0
    );
    break;
  case 'ArrowUp':
    e.preventDefault();
    setHighlightedIndex(prev => 
      prev > 0 ? prev - 1 : results.length - 1
    );
    break;
  case 'Enter':
    e.preventDefault();
    if (highlightedIndex >= 0 && results[highlightedIndex]) {
      selectItem(results[highlightedIndex]);
    }
    break;
  case 'Escape':
    setIsOpen(false);
    setHighlightedIndex(-1);
    break;
}
};

const selectItem = (item) => {
setQuery(item);
setIsOpen(false);
setHighlightedIndex(-1);
console.log('Selected:', item); // In real app, call onSelect prop
};

// ═══════════════════════════════════════════════════════════════
// 🎨 RENDER
// ═══════════════════════════════════════════════════════════════
return (
<div style={{ fontFamily: 'system-ui', padding: '20px', maxWidth: '400px' }}>
  <h3 style={{ marginBottom: '15px' }}>🔍 Autocomplete Demo</h3>
  
  <div ref={containerRef} style={{ position: 'relative' }}>
    <input
      ref={inputRef}
      type="text"
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        setHighlightedIndex(-1);
      }}
      onFocus={() => results.length > 0 && setIsOpen(true)}
      onKeyDown={handleKeyDown}
      placeholder="Search programming languages..."
      style={{
        width: '100%',
        padding: '12px 40px 12px 16px',
        fontSize: '16px',
        border: '2px solid #e2e8f0',
        borderRadius: '8px',
        outline: 'none',
        boxSizing: 'border-box'
      }}
      aria-autocomplete="list"
      aria-controls="autocomplete-list"
      aria-expanded={isOpen}
    />
    
    {isLoading && (
      <span style={{
        position: 'absolute',
        right: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#94a3b8'
      }}>⏳</span>
    )}

    {/* Dropdown */}
    {isOpen && (
      <ul
        id="autocomplete-list"
        role="listbox"
        style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          margin: '4px 0 0 0',
          padding: 0,
          listStyle: 'none',
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
          maxHeight: '250px',
          overflowY: 'auto',
          zIndex: 1000
        }}
      >
        {error && (
          <li style={{ padding: '12px', color: '#ef4444' }}>⚠️ {error}</li>
        )}
        
        {!error && results.length === 0 && (
          <li style={{ padding: '12px', color: '#94a3b8' }}>No results found</li>
        )}
        
        {results.map((item, index) => (
          <li
            key={item}
            role="option"
            aria-selected={index === highlightedIndex}
            onClick={() => selectItem(item)}
            onMouseEnter={() => setHighlightedIndex(index)}
            style={{
              padding: '10px 16px',
              cursor: 'pointer',
              background: index === highlightedIndex ? '#f1f5f9' : 'transparent',
              borderBottom: index < results.length - 1 ? '1px solid #f1f5f9' : 'none'
            }}
          >
            <HighlightMatch text={item} query={query} />
          </li>
        ))}
      </ul>
    )}
  </div>
  
  <p style={{ fontSize: '12px', color: '#64748b', marginTop: '10px' }}>
    Try: "java", "react", "python" | Use ↑↓ keys + Enter
  </p>
</div>
);
}

function App() {
return <Autocomplete />;
}`,
  comparison: {
    junior: `// ❌ No debouncing, laggy
const [query, setQuery] = useState('');

useEffect(() => {
fetch('/api/search?q=' + query) // Called on EVERY keystroke!
.then(r => r.json())
.then(setResults);
}, [query]);`,
    senior: `// ✅ Debounced + Cached
const debouncedQuery = useDebounce(query, 300);
const cache = useRef(new Map());

useEffect(() => {
if (cache.current.has(debouncedQuery)) {
return setResults(cache.current.get(debouncedQuery));
}
fetch('/api/search?q=' + debouncedQuery)
.then(r => r.json())
.then(data => {
  cache.current.set(debouncedQuery, data);
  setResults(data);
});
}, [debouncedQuery]);`
  },
  interview: {
    questions: [
      {
        q: "Why debounce instead of throttle for autocomplete?",
        a: "Debounce waits until the user STOPS typing for X ms, then fires once. Throttle fires every X ms while typing. For search, we want the final query, not intermediate ones. Debounce = better UX and fewer API calls."
      },
      {
        q: "How would you handle race conditions with async search?",
        a: "Use an AbortController to cancel previous requests, or track request IDs. Only update state if the response matches the current query. Libraries like TanStack Query handle this automatically."
      },
      {
        q: "How do you make autocomplete accessible?",
        a: "Use ARIA attributes: aria-autocomplete, aria-expanded, aria-controls, aria-selected, role='listbox' and role='option'. Ensure keyboard navigation works (↑↓ Enter Escape). Announce changes to screen readers."
      }
    ]
  }
};
