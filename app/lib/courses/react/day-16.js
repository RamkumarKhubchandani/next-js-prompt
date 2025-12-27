export const day16 = {
  day: 16,
  title: "React 19: Actions & Optimistic UI",
  intro: "React 19 brings the biggest changes in years. Built-in Actions, useOptimistic, and useActionState simplify forms and mutations.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li>How React 19 simplifies data mutations with "Actions"</li>
<li>Using <code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">useActionState</code> for form handling</li>
<li>Optimistic updates with <code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">useOptimistic</code></li>
<li>The new <code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">use</code> API for promises and context</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ 1. Actions: Forms without the Hassle</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">Forget <code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">onSubmit</code>, <code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">e.preventDefault()</code>, and manual loading states.</p>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-gray-800 dark:text-cyan-300">// ❌ React 18: Manual Everything
function Form() {
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const handleSubmit = async (e) => {
e.preventDefault();
setLoading(true);
try {
  await updateName(e.target.name.value);
} catch (err) {
  setError(err);
} finally {
  setLoading(false);
}
};
return &lt;form onSubmit={handleSubmit}&gt;...&lt;/form&gt;;
}

// ✅ React 19: Actions
function Form() {
// "action" automatically handles pending states!
const [state, action, isPending] = useActionState(updateName, null);

return (
&lt;form action={action}&gt;
  &lt;input name="name" /&gt;
  &lt;button disabled={isPending}&gt;Update&lt;/button&gt;
  {state?.error && &lt;p&gt;{state.error}&lt;/p&gt;}
&lt;/form&gt;
);
}</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🚀 2. Optimistic UI Updates</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">Show the new value <i>instantly</i>, before the server responds.</p>

<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-gray-800 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
const [optimisticName, setOptimisticName] = useOptimistic(currentName);

function action(formData) {
const newName = formData.get("name");

// 1. Update UI immediately!
setOptimisticName(newName);

// 2. Send to server (background)
await updateNameOnServer(newName);
}
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔮 3. The "use" API</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">Read Promises and Context directly in render.</p>
<div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/30 p-4 rounded-xl mb-6">
<pre class="bg-white dark:bg-dark-900 p-2 rounded text-green-800 dark:text-green-200 text-sm">// Read a Promise (suspends automatically!)
const comments = use(commentsPromise);

// Read Context (conditional!)
if (showTheme) {
const theme = use(ThemeContext);
}</pre>
</div>
            `,
  code: `/*
╔══════════════════════════════════════════════════════════════╗
║            ⚛️ REACT 19 ACTIONS DEMO                          ║
║      Built-in mutation handling with automatic pending states║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   NEW HOOKS:                                                 ║
║   ══════════                                                 ║
║   1. useActionState(fn, initial)                             ║
║      → Manages form state (data, errors, pending)            ║
║                                                              ║
║   2. useOptimistic(state, reducer)                           ║
║      → Show updates INSTANTLY while server processes         ║
║                                                              ║
║   3. useFormStatus()                                         ║
║      → Read pending state in child components                ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════
// 🛠️ SIMULATED SERVER ACTION
// ═══════════════════════════════════════════════════════════════
async function updateProfile(prevState, formData) {
// Simulate network delay
await new Promise(resolve => setTimeout(resolve, 1500));

const name = formData.get("name");

if (name.toLowerCase() === "error") {
return { error: "Invalid name! Try something else." };
}

return { message: "Updated to " + name + "!" };
}

// ═══════════════════════════════════════════════════════════════
// 🧩 CHILD COMPONENT (Accessing Status)
// ═══════════════════════════════════════════════════════════════
// useFormStatus lets us read the parent form's pending state
// without passing props!
function SubmitButton() {
const { pending } = React.useFormStatus ? React.useFormStatus() : { pending: false };
// Fallback for demo environment if React 19 not fully active

return (
<button 
  type="submit" 
  disabled={pending}
  style={{
    padding: '10px 20px',
    background: pending ? '#94a3b8' : '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: pending ? 'not-allowed' : 'pointer'
  }}
>
  {pending ? '⏳ Saving...' : '💾 Save Profile'}
</button>
);
}

function App() {
// ═══════════════════════════════════════════════════════════
// 🎣 useActionState (New in React 19)
// ═══════════════════════════════════════════════════════════
// Automatically handles:
// 1. Pending state (isPending)
// 2. Return value from action (state)
// 3. Form resetting
// ═══════════════════════════════════════════════════════════

// NOTE: In this live demo, we might be on React 18.
// We'll simulate React 19 behavior if hooks aren't available.
const [state, formAction] = React.useActionState 
? React.useActionState(updateProfile, null)
: [null, (formData) => alert("React 19 Action would run here!")];

return (
<div style={{ fontFamily: 'system-ui', padding: '20px' }}>
  <h3 style={{ color: '#1e293b' }}>⚛️ React 19 Actions Demo</h3>
  
  <div style={{ 
    padding: '20px', 
    background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
    borderRadius: '16px',
    border: '1px solid #818cf8'
  }}>
    <form action={formAction}>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '8px', color: '#3730a3', fontWeight: 'bold' }}>
          Update Username
        </label>
        <input 
          name="name" 
          placeholder="Enter new name..." 
          required
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #a5b4fc',
            fontSize: '16px'
          }}
        />
      </div>
      
      <SubmitButton />
      
      {/* Success/Error Message */}
      {state?.error && (
        <p style={{ marginTop: '15px', color: '#ef4444', fontWeight: 'bold' }}>
          ❌ {state.error}
        </p>
      )}
      {state?.message && (
        <p style={{ marginTop: '15px', color: '#16a34a', fontWeight: 'bold' }}>
          ✅ {state.message}
        </p>
      )}
    </form>
  </div>
  
  <p style={{ color: '#64748b', marginTop: '20px', fontSize: '13px' }}>
    💡 Try typing "error" to see error handling!
  </p>
</div>
);
}`,
  comparison: {
    junior: `// ❌ React 18 Boilerplate
const [loading, setLoading] = useState(false);
const onSubmit = async (e) => {
e.preventDefault();
setLoading(true);
await saveData();
setLoading(false);
};`,
    senior: `// ✅ React 19 Action
const [state, action, isPending] = useActionState(saveData, null);

return <form action={action}>
<button disabled={isPending}>Save</button>
</form>;`
  },
  interview: {
    questions: [
      {
        q: "What is the difference between useActionState and useFormStatus?",
        a: "useActionState is used at the top level to manage the form's state and action. useFormStatus is used in child components (like buttons) to read the pending state without passing props."
      }
    ]
  }
};
