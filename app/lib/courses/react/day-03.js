export const day03 = {
  day: 3,
  title: "Props vs State",
  intro: "This is the MOST important concept in React. Master this, and everything else becomes easy.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li>What are Props? (Data passed IN)</li>
<li>What is State? (Data managed INSIDE)</li>
<li>The one-way data flow rule</li>
<li>How children talk to parents</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📚 The Simple Analogy</h3>
<div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30 p-4 rounded-xl mb-6">
<p class="text-blue-800 dark:text-blue-200 mb-2">Think of a component like a <span class="text-yellow-600 dark:text-yellow-400 font-bold">vending machine</span>:</p>
<p class="text-blue-800 dark:text-blue-200">📥 <span class="text-yellow-600 dark:text-yellow-400 font-bold">Props</span> = The money you put IN (external input, read-only)</p>
<p class="text-blue-800 dark:text-blue-200">🧠 <span class="text-yellow-600 dark:text-yellow-400 font-bold">State</span> = The machine's inventory (internal memory, can change)</p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📦 Props: Data from Parent</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">Props are <span class="text-yellow-600 dark:text-yellow-400 font-bold">read-only</span> values passed from parent to child:</p>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-cyan-700 dark:text-cyan-300">// Parent passes data DOWN via props
&lt;UserCard <span class="text-yellow-300">name="John"</span> <span class="text-yellow-300">age={25}</span> /&gt;

// Child RECEIVES props (read-only!)
function UserCard(<span class="text-yellow-300">{ name, age }</span>) {
return &lt;p&gt;{name} is {age} years old&lt;/p&gt;;
}</pre>
</div>

<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl mb-6">
<p class="text-red-300 font-bold">⚠️ NEVER modify props!</p>
<pre class="text-red-800 dark:text-red-200 text-sm mt-2">function Child({ name }) {
name = "Bob";  // ❌ WRONG! Props are read-only!
}</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🧠 State: Component's Memory</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">State is data that the component <span class="text-yellow-600 dark:text-yellow-400 font-bold">owns and can change</span>:</p>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-cyan-700 dark:text-cyan-300">function Counter() {
// 👇 State: internal memory that can change
const [<span class="text-yellow-300">count</span>, <span class="text-green-300">setCount</span>] = React.useState(0);

return (
&lt;button onClick={() => <span class="text-green-300">setCount</span>(count + 1)}&gt;
  Clicked {<span class="text-yellow-300">count</span>} times
&lt;/button&gt;
);
}</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔄 One-Way Data Flow</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">Data flows DOWN. Events flow UP. This is React's golden rule!</p>

<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-cyan-700 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
┌─────────────────────────────────────┐
│           PARENT                    │
│   ┌─────────────────────────────┐   │
│   │  state = { name: "John" }   │   │
│   └─────────────────────────────┘   │
│              │                      │
│              │ Props (data DOWN)    │
│              ▼                      │
│   ┌─────────────────────────────┐   │
│   │         CHILD               │   │
│   │   props.name = "John"       │   │
│   │                             │   │
│   │   onClick → calls           │   │
│   │   props.onUpdate("Bob")     │───┼──→ Event (action UP)
│   └─────────────────────────────┘   │
└─────────────────────────────────────┘
                                  │
                                  ▼
                        Parent's setState runs
                        Child gets new props!
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔑 Quick Reference</h3>
<div class="overflow-x-auto mb-6">
<table class="w-full text-sm text-left">
    <thead class="bg-dark-700 text-gray-700 dark:text-light-200">
        <tr>
            <th class="p-3 rounded-tl-lg">Feature</th>
            <th class="p-3">Props</th>
            <th class="p-3 rounded-tr-lg">State</th>
        </tr>
    </thead>
    <tbody class="text-gray-600 dark:text-light-300">
        <tr class="border-b border-gray-200 dark:border-dark-600">
            <td class="p-3">Owned by</td>
            <td class="p-3">Parent</td>
            <td class="p-3">Component itself</td>
        </tr>
        <tr class="border-b border-gray-200 dark:border-dark-600">
            <td class="p-3">Mutable?</td>
            <td class="p-3">❌ Read-only</td>
            <td class="p-3">✅ Can change</td>
        </tr>
        <tr class="border-b border-gray-200 dark:border-dark-600">
            <td class="p-3">Purpose</td>
            <td class="p-3">Configure component</td>
            <td class="p-3">Track changing data</td>
        </tr>
        <tr>
            <td class="p-3 rounded-bl-lg">Changes cause</td>
            <td class="p-3">Re-render</td>
            <td class="p-3 rounded-br-lg">Re-render</td>
        </tr>
    </tbody>
</table>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">💡 Pro Tips</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Lift state up</span>: If two siblings need the same data, move state to their parent</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Keep state minimal</span>: Don't store what you can calculate from other state</li>
<li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Use props for configuration</span>: Color, size, labels, callbacks</li>
</ul>
            `,
  code: `/*
╔══════════════════════════════════════════════════════════════╗
║            🎯 PROPS vs STATE - The Core Concept              ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   ┌─────────────────────────────────────────────────┐        ║
║   │                   PARENT                        │        ║
║   │  ┌───────────────────────────────────────────┐  │        ║
║   │  │  STATE = { message: "Hello!" }            │  │        ║
║   │  │         ↑                                 │  │        ║
║   │  │         │ setState()                      │  │        ║
║   │  └─────────│─────────────────────────────────┘  │        ║
║   │            │                                    │        ║
║   │    ┌───────┴───────┐                            │        ║
║   │    ↓ PROPS (down)  ↑ EVENTS (up)               │        ║
║   │    │               │                            │        ║
║   │  ┌─┴───────────────┴─────────────────────────┐  │        ║
║   │  │              CHILD                        │  │        ║
║   │  │  props.message = "Hello!"  (READ-ONLY)   │  │        ║
║   │  │  props.onUpdate → calls parent setState  │  │        ║
║   │  └───────────────────────────────────────────┘  │        ║
║   └─────────────────────────────────────────────────┘        ║
║                                                              ║
║   💡 REMEMBER:                                               ║
║      • Props = EXTERNAL input (from parent)                  ║
║      • State = INTERNAL memory (owned by component)          ║
║      • Data flows DOWN, Events flow UP                       ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════
// 👶 CHILD COMPONENT
// ═══════════════════════════════════════════════════════════════
// This component RECEIVES data via props.
// It cannot change props directly - they are READ-ONLY!
// To communicate back to parent, it calls callback functions.
// ═══════════════════════════════════════════════════════════════
function ChildComponent({ 
message,      // 📥 Data from parent (read-only)
onSendReply   // 📤 Callback to send data UP to parent
}) {
return (
<div style={{ 
  padding: '20px', 
  background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
  borderRadius: '12px',
  margin: '15px 0',
  border: '3px solid #22c55e'
}}>
  <h4 style={{ margin: '0 0 10px', color: '#166534' }}>
    👶 Child Component
  </h4>
  
  {/* ════════════════════════════════════════════════════════
      📥 DISPLAYING PROPS
      ════════════════════════════════════════════════════════
      Props are the "configuration" passed from parent.
      We can READ them but NEVER modify them directly!
      ════════════════════════════════════════════════════════ */}
  <div style={{ 
    background: 'white', 
    padding: '10px 15px', 
    borderRadius: '8px',
    marginBottom: '15px'
  }}>
    <strong>Received from parent:</strong>
    <p style={{ 
      margin: '5px 0 0', 
      color: '#3b82f6',
      fontSize: '18px'
    }}>
      "{message}"
    </p>
  </div>
  
  {/* ════════════════════════════════════════════════════════
      📤 SENDING DATA BACK UP
      ════════════════════════════════════════════════════════
      Child can't modify parent's state directly.
      Instead, it CALLS A FUNCTION that parent provided.
      This function (onSendReply) triggers parent's setState!
      ════════════════════════════════════════════════════════ */}
  <button 
    onClick={() => onSendReply('Reply from Child! 👋')}
    style={{ 
      padding: '10px 20px', 
      background: '#22c55e',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 'bold'
    }}
  >
    📤 Send Reply to Parent
  </button>
</div>
);
}

// ═══════════════════════════════════════════════════════════════
// 👨 PARENT COMPONENT (App)
// ═══════════════════════════════════════════════════════════════
// This component OWNS the state.
// It passes data DOWN to children via props.
// It passes callback functions so children can send data UP.
// ═══════════════════════════════════════════════════════════════
function App() {
// ═══════════════════════════════════════════════════════════
// 🧠 STATE: Component's Internal Memory
// ═══════════════════════════════════════════════════════════
// useState returns: [currentValue, setterFunction]
// When setMessage is called, React re-renders this component
// AND all children that depend on this state!
// ═══════════════════════════════════════════════════════════
const [message, setMessage] = React.useState('Hello from Parent! 👨');
const [replyCount, setReplyCount] = React.useState(0);

// ═══════════════════════════════════════════════════════════
// 📮 HANDLER: Called when child sends a reply
// ═══════════════════════════════════════════════════════════
const handleChildReply = (childMessage) => {
setMessage(childMessage);
setReplyCount(prev => prev + 1);
};

return (
<div style={{ fontFamily: 'system-ui', padding: '20px' }}>
  <h3 style={{ color: '#1e293b' }}>🔄 Props & State Demo</h3>
  
  {/* Parent's own state display */}
  <div style={{ 
    padding: '20px', 
    background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
    borderRadius: '12px',
    border: '3px solid #3b82f6'
  }}>
    <h4 style={{ margin: '0 0 10px', color: '#1e40af' }}>
      👨 Parent Component (owns state)
    </h4>
    <div style={{ background: 'white', padding: '10px 15px', borderRadius: '8px' }}>
      <strong>Current State:</strong>
      <p style={{ margin: '5px 0 0', color: '#22c55e', fontSize: '18px' }}>
        "{message}"
      </p>
      <p style={{ margin: '5px 0 0', color: '#666', fontSize: '14px' }}>
        Replies received: {replyCount}
      </p>
    </div>
    
    <button 
      onClick={() => setMessage('Fresh message from Parent! 📬')}
      style={{ 
        marginTop: '15px',
        padding: '10px 20px', 
        background: '#3b82f6',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer'
      }}
    >
      📬 Update Message
    </button>
  </div>
  
  {/* Pass state DOWN and callback function */}
  <ChildComponent 
    message={message}           
    onSendReply={handleChildReply}    
  />
  
  <div style={{ 
    marginTop: '15px', 
    padding: '15px', 
    background: '#fef3c7', 
    borderRadius: '8px',
    fontSize: '14px'
  }}>
    <strong>💡 What's happening:</strong>
    <ul style={{ margin: '10px 0 0', paddingLeft: '20px' }}>
      <li>Parent owns <code>message</code> state</li>
      <li>Parent passes <code>message</code> to Child as prop</li>
      <li>Child displays prop but <strong>cannot modify it</strong></li>
      <li>Child calls <code>onSendReply()</code> to send data UP</li>
      <li>Parent receives it and updates state</li>
    </ul>
  </div>
</div>
);
}`,
  comparison: {
    junior: `// ❌ Mutating Props
const Child = (props) => {
props.name = "Bob"; // ERROR: Read-only
return <div>{props.name}</div>;
};`,
    senior: `// ✅ Local State
const Child = ({ name }) => {
const [localName, setLocalName] = useState(name);
return <div onClick={() => setLocalName("Bob")}>{localName}</div>;
};`
  },
  interview: {
    questions: [
      {
        q: "Can a child modify parent state?",
        a: "Not directly. The parent must pass a callback function (updater) to the child."
      }
    ]
  }
};
