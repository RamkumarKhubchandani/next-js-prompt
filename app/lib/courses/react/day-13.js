export const day13 = {
  day: 13,
  title: "Compound Components",
  intro: "Build flexible UI libraries. `Select.Option` instead of `options={[]}`.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li>What is the Compound Component pattern</li>
<li>How parent and children share state implicitly</li>
<li>Building flexible, declarative APIs</li>
<li>Real-world examples (Tabs, Accordion, Select)</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📚 The Problem: Inflexible Component APIs</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">Config-based components are hard to customize:</p>

<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl mb-6">
<pre class="text-red-800 dark:text-red-200 text-sm">// ❌ Configuration Prop Approach
&lt;Select 
options={[
{ value: 'a', label: 'Option A', icon: '🍎', disabled: false },
{ value: 'b', label: 'Option B', icon: '🍊', disabled: true },
]}
renderOption={(opt) => ...}  // Need custom renderer
optionClassName="..."        // What if I need different styles per option?
/&gt;

// Problems:
// • Hard to add custom behavior to individual items
// • Complex prop types to maintain
// • Every customization = another prop</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">✅ The Solution: Compound Components</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">Let users compose UI naturally, like HTML's &lt;select&gt; and &lt;option&gt;:</p>

<div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/30 p-4 rounded-xl mb-6">
<pre class="text-green-800 dark:text-green-200 text-sm">// ✅ Compound Component Approach (Like HTML!)
&lt;Select&gt;
&lt;Select.Option value="a"&gt;🍎 Option A&lt;/Select.Option&gt;
&lt;Select.Option value="b" disabled&gt;🍊 Option B&lt;/Select.Option&gt;
&lt;Select.Divider /&gt;
&lt;Select.Option value="c" className="special"&gt;
&lt;CustomIcon /&gt; Option C with anything!
&lt;/Select.Option&gt;
&lt;/Select&gt;

// Benefits:
// • Full control over each item
// • Natural JSX composition
// • Easy to add custom elements</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔧 How It Works: Implicit State Sharing</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-cyan-700 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
Parent Component (Tabs)              Child Components (Tab, Panel)
════════════════════════             ════════════════════════════

┌──────────────────────────┐         
│  const TabsContext =     │         
│    createContext();      │         
│                          │         
│  function Tabs() {       │         
│    const [active, set]   │   ───────► Child reads from context:
│      = useState(0);      │         │
│                          │         │  function Tab({ id }) {
│    return (              │         │    const { active, setActive }
│      &lt;TabsContext.Provider│         │      = useContext(TabsContext);
│        value={{          │         │    return (
│          active,         │         │      &lt;button
│          setActive       │         │        onClick={() => setActive(id)}
│        }}                │         │        className={active === id ? ... }
│      &gt;                   │         │      &gt;
│        {children}        │         │    );
│      &lt;/TabsContext.Provider&gt;│      │  }
│    );                    │         │
│  }                       │         │
└──────────────────────────┘         
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📊 Real-World Compound Components</h3>
<div class="grid md:grid-cols-2 gap-4 mb-6">
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl">
    <p class="text-brand-primary font-bold mb-2">Tabs</p>
    <p class="text-gray-600 dark:text-light-300 text-sm font-mono">&lt;Tabs&gt;&lt;Tabs.Tab&gt;&lt;Tabs.Panel&gt;</p>
</div>
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl">
    <p class="text-brand-primary font-bold mb-2">Accordion</p>
    <p class="text-gray-600 dark:text-light-300 text-sm font-mono">&lt;Accordion&gt;&lt;Accordion.Item&gt;</p>
</div>
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl">
    <p class="text-brand-primary font-bold mb-2">Menu</p>
    <p class="text-gray-600 dark:text-light-300 text-sm font-mono">&lt;Menu&gt;&lt;Menu.Item&gt;&lt;Menu.Divider&gt;</p>
</div>
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl">
    <p class="text-brand-primary font-bold mb-2">Form</p>
    <p class="text-gray-600 dark:text-light-300 text-sm font-mono">&lt;Form&gt;&lt;Form.Field&gt;&lt;Form.Error&gt;</p>
</div>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔑 Two Implementation Approaches</h3>
<div class="overflow-x-auto mb-6">
<table class="w-full text-sm text-left">
    <thead class="bg-dark-700 text-gray-700 dark:text-light-200">
        <tr>
            <th class="p-3 rounded-tl-lg">Approach</th>
            <th class="p-3">How</th>
            <th class="p-3 rounded-tr-lg">Best For</th>
        </tr>
    </thead>
    <tbody class="text-gray-600 dark:text-light-300">
        <tr class="border-b border-gray-200 dark:border-dark-600">
            <td class="p-3 font-bold">Static Properties</td>
            <td class="p-3 font-mono text-xs">Tabs.Tab = TabComponent</td>
            <td class="p-3 text-sm">Simple grouping</td>
        </tr>
        <tr>
            <td class="p-3 rounded-bl-lg font-bold">Context</td>
            <td class="p-3 font-mono text-xs">useContext(TabsContext)</td>
            <td class="p-3 rounded-br-lg text-sm">Shared state between children</td>
        </tr>
    </tbody>
</table>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚠️ Common Pitfalls</h3>
<div class="bg-yellow-900/20 border border-yellow-500/30 p-4 rounded-xl mb-6">
<ul class="text-yellow-200 text-sm space-y-1">
    <li>• <span class="font-bold">Context value stability</span> - memoize to prevent re-renders</li>
    <li>• <span class="font-bold">Missing Provider</span> - handle gracefully when used outside</li>
    <li>• <span class="font-bold">Deeply nested children</span> - context only works for descendants</li>
</ul>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">💡 Pro Tips</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Throw helpful errors</span> if child used outside parent</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Export a custom hook</span> - useTabs() instead of useContext(TabsContext)</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">TypeScript</span> - children can be typed for better DX</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Libraries like Radix UI</span> - use this pattern extensively</li>
</ul>
            `,
  code: `/*
╔══════════════════════════════════════════════════════════════╗
║         🎯 COMPOUND COMPONENTS - Flexible UI Patterns        ║
║      Components that work together to form a complete UI     ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   THE PROBLEM:                                               ║
║   ════════════                                               ║
║                                                              ║
║   // Giant config object - hard to customize                 ║
║   <Tabs tabs={[                                              ║
║     { id: 'a', label: 'Tab A', content: '...' },             ║
║     { id: 'b', label: 'Tab B', content: '...' }              ║
║   ]} />                                                      ║
║                                                              ║
║   THE SOLUTION - Compound Components:                        ║
║   ════════════════════════════════════                       ║
║                                                              ║
║   // Like HTML <select> + <option> - natural & flexible!     ║
║   <Tabs>                                                     ║
║     <Tabs.Tab>Tab A</Tabs.Tab>                               ║
║     <Tabs.Tab>Tab B</Tabs.Tab>                               ║
║     <Tabs.Panel>Content A</Tabs.Panel>                       ║
║     <Tabs.Panel>Content B</Tabs.Panel>                       ║
║   </Tabs>                                                    ║
║                                                              ║
║   HOW IT WORKS:                                              ║
║   ══════════════                                             ║
║                                                              ║
║   1. Parent creates Context to share state                   ║
║   2. Child components consume Context                        ║
║   3. Children are attached as static properties (Tabs.Tab)   ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════
// 📦 STEP 1: CREATE CONTEXT
// ═══════════════════════════════════════════════════════════════
// Context allows parent and children to communicate
// without passing props through every level
// ═══════════════════════════════════════════════════════════════
const TabsContext = React.createContext();

// ═══════════════════════════════════════════════════════════════
// 🏠 PARENT COMPONENT: Tabs
// ═══════════════════════════════════════════════════════════════
// - Holds the shared state (activeTab)
// - Provides context to all children
// - Children can be placed anywhere inside!
// ═══════════════════════════════════════════════════════════════
function Tabs({ children, defaultTab }) {
const [activeTab, setActiveTab] = React.useState(defaultTab);

return (
<TabsContext.Provider value={{ activeTab, setActiveTab }}>
  <div style={{
    background: '#f8fafc',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid #e2e8f0'
  }}>
    {children}
  </div>
</TabsContext.Provider>
);
}

// ═══════════════════════════════════════════════════════════════
// 🔘 CHILD COMPONENT: Tabs.Tab
// ═══════════════════════════════════════════════════════════════
// - Reads activeTab from context
// - Calls setActiveTab when clicked
// - Attached as static property: Tabs.Tab
// ═══════════════════════════════════════════════════════════════
Tabs.Tab = function Tab({ id, children, icon }) {
const { activeTab, setActiveTab } = React.useContext(TabsContext);
const isActive = activeTab === id;

return (
<button
  onClick={() => setActiveTab(id)}
  style={{
    padding: '12px 20px',
    background: isActive ? '#3b82f6' : 'transparent',
    color: isActive ? 'white' : '#64748b',
    border: 'none',
    borderBottom: isActive ? '3px solid #1d4ed8' : '3px solid transparent',
    cursor: 'pointer',
    fontWeight: isActive ? 'bold' : 'normal',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  }}
>
  {icon && <span>{icon}</span>}
  {children}
</button>
);
};

// ═══════════════════════════════════════════════════════════════
// 📄 CHILD COMPONENT: Tabs.Panel
// ═══════════════════════════════════════════════════════════════
// - Only renders if its id matches activeTab
// - Content is completely flexible!
// ═══════════════════════════════════════════════════════════════
Tabs.Panel = function Panel({ id, children }) {
const { activeTab } = React.useContext(TabsContext);

// Don't render if not active
if (activeTab !== id) return null;

return (
<div style={{ 
  padding: '20px',
  background: 'white',
  animation: 'fadeIn 0.3s ease'
}}>
  {children}
</div>
);
};

// ═══════════════════════════════════════════════════════════════
// 🎯 USAGE EXAMPLE
// ═══════════════════════════════════════════════════════════════
function App() {
return (
<div style={{ fontFamily: 'system-ui', padding: '20px' }}>
  <h3 style={{ color: '#1e293b' }}>🧩 Compound Components Demo</h3>
  
  <Tabs defaultTab="home">
    {/* Tab List */}
    <div style={{ 
      display: 'flex', 
      borderBottom: '1px solid #e2e8f0',
      background: '#f1f5f9'
    }}>
      <Tabs.Tab id="home" icon="🏠">Home</Tabs.Tab>
      <Tabs.Tab id="profile" icon="👤">Profile</Tabs.Tab>
      <Tabs.Tab id="settings" icon="⚙️">Settings</Tabs.Tab>
    </div>
    
    {/* Panels - can have ANY content! */}
    <Tabs.Panel id="home">
      <h4 style={{ margin: '0 0 10px', color: '#1e293b' }}>Welcome Home! 🎉</h4>
      <p style={{ color: '#64748b', margin: 0 }}>
        This is the home panel with custom content.
      </p>
    </Tabs.Panel>
    
    <Tabs.Panel id="profile">
      <h4 style={{ margin: '0 0 10px', color: '#1e293b' }}>Your Profile 👤</h4>
      <p style={{ color: '#64748b', margin: 0 }}>
        Edit your profile settings here.
      </p>
    </Tabs.Panel>
    
    <Tabs.Panel id="settings">
      <h4 style={{ margin: '0 0 10px', color: '#1e293b' }}>Settings ⚙️</h4>
      <p style={{ color: '#64748b', margin: 0 }}>
        Configure your preferences.
      </p>
    </Tabs.Panel>
  </Tabs>
  
  <p style={{ color: '#64748b', marginTop: '15px', fontSize: '13px' }}>
    💡 Click tabs - components communicate via Context!
  </p>
</div>
);
}`,
  comparison: {
    junior: `// ❌ Giant Configuration Prop
<Menu items={[
{ label: 'Home', icon: 'home' },
{ label: 'Settings', icon: 'cog' }
]} />
// Hard to customize individual items`,
    senior: `// ✅ Compound Component
<Menu>
<Menu.Item icon="home">Home</Menu.Item>
<Menu.Divider />
<Menu.Item icon="cog" style={{ color: 'red' }}>
 Settings
</Menu.Item>
</Menu>`
  },
  interview: {
    questions: [
      {
        q: "What is a Compound Component?",
        a: "A pattern where components work together to form a complete UI, usually sharing state via Context (e.g., `<select>` and `<option>`)."
      }
    ]
  }
};
