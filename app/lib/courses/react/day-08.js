export const day08 = {
  day: 8,
  title: "Context API",
  intro: "Avoid Prop Drilling. Share global data like User Auth or Theme.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li>What is "prop drilling" and why it's a problem</li>
<li>How Context provides a solution</li>
<li>Creating, providing, and consuming context</li>
<li>When to use Context vs other state management</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📚 The Problem: Prop Drilling</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">Imagine you need to pass user data from App to a deeply nested component:</p>

<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl mb-6">
<pre class="text-red-800 dark:text-red-200 text-sm">// ❌ PROP DRILLING - Passing through every level!

&lt;App user={user}&gt;                    // Level 0: Has the data
&lt;Layout user={user}&gt;               // Level 1: Just passes it
&lt;Sidebar user={user}&gt;            // Level 2: Just passes it
  &lt;Navigation user={user}&gt;       // Level 3: Just passes it
    &lt;UserMenu user={user} /&gt;     // Level 4: Finally uses it!
  &lt;/Navigation&gt;
&lt;/Sidebar&gt;
&lt;/Layout&gt;
&lt;/App&gt;</pre>
<p class="text-red-300 text-sm mt-2">❌ Layout, Sidebar, Navigation don't even USE user - they just pass it through!</p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">✅ The Solution: Context API</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">Context creates a "portal" - data teleports directly to where it's needed:</p>

<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-cyan-700 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
┌──────────────────────────────────────────────────────┐
│  &lt;UserContext.Provider value={user}&gt;                 │  ← PROVIDE once
│                                                      │
│    &lt;App&gt;                                             │
│      &lt;Layout&gt;            ← No props needed!          │
│        &lt;Sidebar&gt;         ← No props needed!          │
│          &lt;Navigation&gt;    ← No props needed!          │
│            &lt;UserMenu /&gt;  ← useContext(UserContext)   │  ← CONSUME anywhere!
│                                                      │
└──────────────────────────────────────────────────────┘
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔧 Three Steps to Use Context</h3>

<div class="space-y-4 mb-6">
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl border-l-4 border-blue-500">
    <p class="text-gray-900 dark:text-white font-bold">Step 1: CREATE the Context</p>
    <pre class="bg-gray-100 dark:bg-dark-900 p-3 rounded mt-2 text-cyan-700 dark:text-cyan-300 text-sm">const UserContext = React.createContext(null);
// The argument is the DEFAULT value (used when no Provider above)</pre>
</div>

<div class="bg-white dark:bg-dark-800 p-4 rounded-xl border-l-4 border-green-500">
    <p class="text-gray-900 dark:text-white font-bold">Step 2: PROVIDE the value</p>
    <pre class="bg-gray-100 dark:bg-dark-900 p-3 rounded mt-2 text-cyan-700 dark:text-cyan-300 text-sm">&lt;UserContext.Provider value={currentUser}&gt;
&lt;App /&gt;   {/* Everything inside can access currentUser */}
&lt;/UserContext.Provider&gt;</pre>
</div>

<div class="bg-white dark:bg-dark-800 p-4 rounded-xl border-l-4 border-purple-500">
    <p class="text-gray-900 dark:text-white font-bold">Step 3: CONSUME anywhere below</p>
    <pre class="bg-gray-100 dark:bg-dark-900 p-3 rounded mt-2 text-cyan-700 dark:text-cyan-300 text-sm">function UserMenu() {
const user = React.useContext(UserContext);
return &lt;span&gt;Hello, {user.name}!&lt;/span&gt;;
}</pre>
</div>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📊 Common Use Cases for Context</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
<div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/30 p-4 rounded-xl">
    <p class="text-green-300 font-bold mb-2">✅ GOOD Use Cases</p>
    <ul class="text-green-800 dark:text-green-200 text-sm space-y-1">
        <li>• Theme (dark/light mode)</li>
        <li>• Current user / Auth state</li>
        <li>• Language / Locale</li>
        <li>• UI state (sidebar open/closed)</li>
    </ul>
</div>
<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl">
    <p class="text-red-300 font-bold mb-2">❌ BAD Use Cases</p>
    <ul class="text-red-800 dark:text-red-200 text-sm space-y-1">
        <li>• Frequently changing data</li>
        <li>• Large objects (causes many re-renders)</li>
        <li>• Data only used by 1-2 components</li>
        <li>• Complex state with many actions</li>
    </ul>
</div>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚠️ Context Re-render Trap</h3>
<div class="bg-yellow-900/20 border border-yellow-500/30 p-4 rounded-xl mb-6">
<p class="text-yellow-300 font-bold mb-2">🚨 When Provider value changes, ALL consumers re-render!</p>
<pre class="text-yellow-200 text-sm mt-2">// ❌ BAD: New object every render!
&lt;UserContext.Provider value={{ user, theme }}&gt;

// ✅ GOOD: Memoize or split contexts
const value = useMemo(() => ({ user, theme }), [user, theme]);
&lt;UserContext.Provider value={value}&gt;</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔑 Context vs Redux vs Other State Management</h3>
<div class="overflow-x-auto mb-6">
<table class="w-full text-sm text-left">
    <thead class="bg-dark-700 text-gray-700 dark:text-light-200">
        <tr>
            <th class="p-3 rounded-tl-lg">Feature</th>
            <th class="p-3">Context</th>
            <th class="p-3 rounded-tr-lg">Redux/Zustand</th>
        </tr>
    </thead>
    <tbody class="text-gray-600 dark:text-light-300">
        <tr class="border-b border-gray-200 dark:border-dark-600">
            <td class="p-3">Setup complexity</td>
            <td class="p-3 text-green-600 dark:text-green-400">Simple</td>
            <td class="p-3 text-yellow-600 dark:text-yellow-400">Medium</td>
        </tr>
        <tr class="border-b border-gray-200 dark:border-dark-600">
            <td class="p-3">Re-render optimization</td>
            <td class="p-3 text-red-600 dark:text-red-400">Poor (all consumers)</td>
            <td class="p-3 text-green-600 dark:text-green-400">Great (selectors)</td>
        </tr>
        <tr class="border-b border-gray-200 dark:border-dark-600">
            <td class="p-3">DevTools</td>
            <td class="p-3 text-yellow-600 dark:text-yellow-400">Limited</td>
            <td class="p-3 text-green-600 dark:text-green-400">Excellent</td>
        </tr>
        <tr>
            <td class="p-3 rounded-bl-lg">Best for</td>
            <td class="p-3">Low-frequency updates</td>
            <td class="p-3 rounded-br-lg">Complex app state</td>
        </tr>
    </tbody>
</table>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">💡 Pro Tips</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Split contexts by update frequency</span> - separate theme from user data</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Create custom hooks</span> - useUser() instead of useContext(UserContext)</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Colocate Provider near consumers</span> - don't always put at app root</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Consider Zustand/Jotai</span> - for complex state with better performance</li>
</ul>
            `,
  code: `/*
╔══════════════════════════════════════════════════════════════╗
║              🎯 CONTEXT API - Global State                   ║
║         Share data without passing props through every       ║
║                    level of the tree!                        ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   THE PROBLEM: PROP DRILLING                                 ║
║   ═══════════════════════════                                ║
║                                                              ║
║   <App theme={theme}>                                        ║
║     <Header theme={theme}>         ← Pass through            ║
║       <Nav theme={theme}>          ← Pass through            ║
║         <Button theme={theme} />   ← Finally uses it!        ║
║                                                              ║
║   THE SOLUTION: CONTEXT                                      ║
║   ══════════════════════                                     ║
║                                                              ║
║   <ThemeContext.Provider value={theme}>                      ║
║     <Header>                                                 ║
║       <Nav>                                                  ║
║         <Button />  ← useContext(ThemeContext) 🎉            ║
║                                                              ║
║   HOW IT WORKS:                                              ║
║   ══════════════                                             ║
║   1. createContext() - Create the context                    ║
║   2. <Provider value={...}> - Provide the value              ║
║   3. useContext() - Consume anywhere below                   ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════
// 📦 STEP 1: CREATE CONTEXT
// ═══════════════════════════════════════════════════════════════
// createContext takes a default value (used when no Provider above)
// This creates a "channel" for passing data down the tree
// ═══════════════════════════════════════════════════════════════
const ThemeContext = React.createContext('light');

// ═══════════════════════════════════════════════════════════════
// 🎨 CONSUMER COMPONENT (Deep in the tree)
// ═══════════════════════════════════════════════════════════════
// This component is nested deep, but it can access theme
// directly via useContext - NO prop drilling needed!
// ═══════════════════════════════════════════════════════════════
function ThemeButton() {
// 🎯 STEP 3: CONSUME CONTEXT
// React finds the nearest ThemeContext.Provider above
// and returns its current value
const theme = React.useContext(ThemeContext);

return (
<button style={{
  background: theme === 'dark' ? '#1e293b' : '#ffffff',
  color: theme === 'dark' ? '#f8fafc' : '#1e293b',
  padding: '12px 24px',
  border: theme === 'dark' ? '2px solid #3b82f6' : '2px solid #e2e8f0',
  borderRadius: '8px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
}}>
  🎨 Theme: {theme.toUpperCase()}
</button>
);
}

// Another consumer - shows context can be used by multiple components
function ThemeStatus() {
const theme = React.useContext(ThemeContext);
return (
<p style={{ 
  color: theme === 'dark' ? '#94a3b8' : '#64748b',
  fontSize: '14px' 
}}>
  Current mode: {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
</p>
);
}

function App() {
const [theme, setTheme] = React.useState('light');

// ═══════════════════════════════════════════════════════════
// 📦 STEP 2: PROVIDE CONTEXT
// ═══════════════════════════════════════════════════════════
// Wrap your app (or part of it) in Provider
// Any component below can access the value!
// When value changes, all consumers re-render
// ═══════════════════════════════════════════════════════════
return (
<ThemeContext.Provider value={theme}>
  <div style={{ 
    fontFamily: 'system-ui', 
    padding: '20px',
    background: theme === 'dark' ? '#0f172a' : '#f8fafc',
    minHeight: '200px',
    borderRadius: '12px',
    transition: 'all 0.3s ease'
  }}>
    <h3 style={{ color: theme === 'dark' ? '#f8fafc' : '#1e293b' }}>
      🔗 Context API Demo
    </h3>
    
    {/* These components access theme via context, not props! */}
    <ThemeButton />
    <ThemeStatus />
    
    <div style={{ marginTop: '15px' }}>
      <button 
        onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
        style={{
          padding: '10px 20px',
          background: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        🔄 Toggle Theme
      </button>
    </div>
    
    <p style={{ 
      color: theme === 'dark' ? '#64748b' : '#94a3b8',
      marginTop: '15px',
      fontSize: '13px'
    }}>
      💡 ThemeButton and ThemeStatus use useContext - no props passed!
    </p>
  </div>
</ThemeContext.Provider>
);
}`,
  comparison: {
    junior: `// ❌ Prop Drilling
<GrandParent theme={theme} />
// ... inside GrandParent
<Parent theme={theme} />
// ... inside Parent
<Child theme={theme} />`,
    senior: `// ✅ Context Consumer
// In Child:
const theme = useContext(ThemeContext);
// No intermediate props needed`
  },
  interview: {
    questions: [
      {
        q: "Does Context replace Redux?",
        a: "For simple global state (Theme, User), yes. For complex high-frequency updates, Redux/Zustand is better due to selectors and preventing unnecessary re-renders."
      }
    ]
  }
};
