export const day02 = {
  day: 2,
  title: "JSX & React.createElement",
  intro: "JSX looks like HTML but it's actually JavaScript in disguise. Understanding this is key to mastering React.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li>What JSX really is (hint: it's not HTML!)</li>
<li>How Babel transforms JSX into JavaScript</li>
<li>JSX rules you must follow</li>
<li>How to use JavaScript inside JSX</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📚 The Big Secret: JSX = JavaScript</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">When you write this:</p>
<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-gray-800 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>&lt;h1 className="title"&gt;Hello&lt;/h1&gt;</pre>
</div>

<p class="mb-4 text-gray-600 dark:text-light-300">Babel (a compiler) transforms it into this:</p>
<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-yellow-700 dark:text-yellow-300">
<pre>React.createElement('h1', { className: 'title' }, 'Hello')</pre>
</div>

<div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30 p-4 rounded-xl mb-6">
<p class="text-blue-800 dark:text-blue-200">💡 <span class="text-yellow-600 dark:text-yellow-400 font-bold">Key Insight:</span> JSX is just syntactic sugar! It makes writing React.createElement() calls easier and more readable.</p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚙️ The Transformation Process</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-gray-800 dark:text-cyan-300 mb-6 overflow-x-auto">
<pre>
YOUR CODE (JSX)                    AFTER BABEL (JavaScript)
─────────────────                  ────────────────────────
&lt;div&gt;                              React.createElement(
&lt;h1&gt;Title&lt;/h1&gt;          →         'div',
&lt;p&gt;Text&lt;/p&gt;                        null,
&lt;/div&gt;                               React.createElement('h1', null, 'Title'),
                                 React.createElement('p', null, 'Text')
                               )
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">📜 JSX Rules You MUST Follow</h3>

<div class="space-y-4 mb-6">
<div class="bg-white dark:bg-dark-800 p-4 rounded-xl border-l-4 border-red-500">
    <p class="text-gray-900 dark:text-white font-bold">Rule 1: Return ONE parent element</p>
    <div class="grid md:grid-cols-2 gap-4 mt-2">
        <div class="text-red-700 dark:text-red-300 text-sm">
            <p>❌ Wrong:</p>
            <pre class="bg-gray-100 dark:bg-dark-900 p-2 rounded mt-1">return (
&lt;h1&gt;Title&lt;/h1&gt;
&lt;p&gt;Text&lt;/p&gt;
)</pre>
        </div>
        <div class="text-green-300 text-sm">
            <p>✅ Correct:</p>
            <pre class="bg-gray-100 dark:bg-dark-900 p-2 rounded mt-1">return (
&lt;div&gt;
&lt;h1&gt;Title&lt;/h1&gt;
&lt;p&gt;Text&lt;/p&gt;
&lt;/div&gt;
)</pre>
        </div>
    </div>
</div>

<div class="bg-white dark:bg-dark-800 p-4 rounded-xl border-l-4 border-yellow-500">
    <p class="text-gray-900 dark:text-white font-bold">Rule 2: Use className, not class</p>
    <p class="text-gray-600 dark:text-light-300 text-sm mt-2"><code class="bg-gray-100 dark:bg-dark-700 text-gray-800 dark:text-brand-primary px-1 rounded">class</code> is a reserved word in JavaScript, so JSX uses <code class="bg-gray-100 dark:bg-dark-700 text-gray-800 dark:text-brand-primary px-1 rounded">className</code></p>
    <pre class="bg-gray-100 dark:bg-dark-900 p-2 rounded mt-2 text-green-300 text-sm">&lt;div className="container"&gt;...&lt;/div&gt;</pre>
</div>

<div class="bg-white dark:bg-dark-800 p-4 rounded-xl border-l-4 border-blue-500">
    <p class="text-gray-900 dark:text-white font-bold">Rule 3: Close ALL tags</p>
    <p class="text-gray-600 dark:text-light-300 text-sm mt-2">Even self-closing tags need a slash:</p>
    <pre class="bg-gray-100 dark:bg-dark-900 p-2 rounded mt-2 text-green-300 text-sm">&lt;img src="pic.jpg" /&gt;
&lt;input type="text" /&gt;
&lt;br /&gt;</pre>
</div>

<div class="bg-white dark:bg-dark-800 p-4 rounded-xl border-l-4 border-purple-500">
    <p class="text-gray-900 dark:text-white font-bold">Rule 4: camelCase for attributes</p>
    <p class="text-gray-600 dark:text-light-300 text-sm mt-2">HTML: onclick → JSX: onClick</p>
    <pre class="bg-gray-100 dark:bg-dark-900 p-2 rounded mt-2 text-green-300 text-sm">&lt;button onClick={handleClick}&gt;Click&lt;/button&gt;
&lt;label htmlFor="name"&gt;Name&lt;/label&gt;</pre>
</div>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔧 Using JavaScript in JSX</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">Use <span class="text-yellow-600 dark:text-yellow-400 font-bold">curly braces { }</span> to embed any JavaScript expression:</p>

<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-gray-800 dark:text-cyan-300">const name = "John";
const age = 25;

return (
&lt;div&gt;
&lt;p&gt;Name: <span class="text-yellow-700 dark:text-yellow-300">{name}</span>&lt;/p&gt;           {/* Variable */}
&lt;p&gt;Age: <span class="text-yellow-700 dark:text-yellow-300">{age}</span>&lt;/p&gt;             {/* Variable */}
&lt;p&gt;Next year: <span class="text-yellow-700 dark:text-yellow-300">{age + 1}</span>&lt;/p&gt;   {/* Expression */}
&lt;p&gt;Adult: <span class="text-yellow-700 dark:text-yellow-300">{age >= 18 ? 'Yes' : 'No'}</span>&lt;/p&gt;  {/* Ternary */}
&lt;/div&gt;
);</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">💡 Pro Tips</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li>Use <code class="bg-gray-100 dark:bg-dark-700 text-gray-800 dark:text-brand-primary px-1 rounded">&lt;&gt;...&lt;/&gt;</code> (Fragment) instead of div when you don't need a wrapper</li>
<li>Inline styles use double curly braces: <code class="bg-gray-100 dark:bg-dark-700 text-gray-800 dark:text-brand-primary px-1 rounded">style={{ color: 'red' }}</code></li>
<li>Comments in JSX: <code class="bg-gray-100 dark:bg-dark-700 text-gray-800 dark:text-brand-primary px-1 rounded">{/* comment */}</code></li>
</ul>
            `,
  code: `/*
╔══════════════════════════════════════════════════════════════╗
║              🎯 JSX = JavaScript + XML                       ║
║      JSX is NOT HTML! It compiles to JavaScript.             ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   JSX (What you write)      JavaScript (What browser sees)   ║
║   ════════════════════      ══════════════════════════════   ║
║   <h1>Hello</h1>      →     React.createElement(             ║
║                               'h1',                          ║
║                               null,                          ║
║                               'Hello'                        ║
║                             )                                ║
║                                                              ║
║   {name}              →     Variable value inserted          ║
║   {2 + 2}             →     Expression evaluated (= 4)       ║
║   {isTrue ? 'A':'B'}  →     Ternary evaluated                ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
*/

function App() {
// ═══════════════════════════════════════════════════════════
// 📦 JAVASCRIPT VARIABLES
// ═══════════════════════════════════════════════════════════
// These are regular JS variables. We can use them in JSX
// by wrapping them in curly braces: {variableName}
// ═══════════════════════════════════════════════════════════
const name = "React Developer";
const skills = ['React', 'JavaScript', 'CSS', 'Node.js'];
const isExpert = true;
const yearsExp = 3;

// ═══════════════════════════════════════════════════════════
// 🎨 INLINE STYLES IN JSX
// ═══════════════════════════════════════════════════════════
// Unlike HTML (style="color: blue"), JSX uses objects:
//   HTML:  style="font-size: 24px"  
//   JSX:   style={{ fontSize: '24px' }}  (camelCase!)
//
// Double curly braces because:
//   Outer {} = "this is JavaScript"
//   Inner {} = "this is an object"
// ═══════════════════════════════════════════════════════════
const cardStyle = { 
background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
padding: '20px',
borderRadius: '12px',
color: 'white',
marginBottom: '15px'
};

return (
// ════════════════════════════════════════════════════════
// 🔴 RULE 1: ONE PARENT ELEMENT
// ════════════════════════════════════════════════════════
// JSX must return ONE parent. Use <div> or <> (Fragment)
// ════════════════════════════════════════════════════════
<div style={{ fontFamily: 'system-ui', padding: '20px' }}>
  
  {/* ════════════════════════════════════════════════════════
      📝 EMBEDDING VARIABLES
      ════════════════════════════════════════════════════════
      Use {variableName} to insert JavaScript values.
      The curly braces tell React: "evaluate this JavaScript"
      ════════════════════════════════════════════════════════ */}
  <div style={cardStyle}>
    <h2 style={{ margin: 0 }}>👋 Hello, {name}!</h2>
    <p style={{ margin: '5px 0 0', opacity: 0.9 }}>
      {yearsExp} years of experience
    </p>
  </div>
  
  {/* ════════════════════════════════════════════════════════
      ➕ EXPRESSIONS
      ════════════════════════════════════════════════════════
      Any valid JS expression works inside {}
      ════════════════════════════════════════════════════════ */}
  <div style={{ background: '#f1f5f9', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
    <p style={{ margin: '5px 0' }}>🧮 Math: 2 + 2 = <strong>{2 + 2}</strong></p>
    <p style={{ margin: '5px 0' }}>📅 Year: <strong>{new Date().getFullYear()}</strong></p>
    <p style={{ margin: '5px 0' }}>📏 Skills count: <strong>{skills.length}</strong></p>
  </div>
  
  {/* ════════════════════════════════════════════════════════
      ❓ CONDITIONAL RENDERING (Ternary)
      ════════════════════════════════════════════════════════
      condition ? showIfTrue : showIfFalse
      ════════════════════════════════════════════════════════ */}
  <p style={{ 
    padding: '10px 15px', 
    background: isExpert ? '#dcfce7' : '#fef3c7',
    borderRadius: '8px',
    marginBottom: '15px'
  }}>
    Status: {isExpert ? '🏆 Expert Developer' : '📚 Still Learning'}
  </p>
  
  {/* ════════════════════════════════════════════════════════
      🔄 RENDERING LISTS WITH .map()
      ════════════════════════════════════════════════════════
      Array.map() transforms each item into JSX.
      ALWAYS add a unique "key" prop for React's diffing!
      ════════════════════════════════════════════════════════ */}
  <div>
    <h3 style={{ marginBottom: '10px' }}>💼 Skills:</h3>
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {skills.map((skill, index) => (
        <span 
          key={skill}  // ← KEY IS REQUIRED!
          style={{
            background: '#3b82f6',
            color: 'white',
            padding: '5px 12px',
            borderRadius: '20px',
            fontSize: '14px'
          }}
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
  
  <p style={{ color: '#64748b', marginTop: '20px', fontSize: '14px' }}>
    💡 Try editing the skills array or changing isExpert to false!
  </p>
</div>
);
}`,
  comparison: {
    junior: `// ❌ Confusing Logic in JSX
return (
<div>
{user ? (
   admin ? <Admin /> : <User />
) : <Login />}
</div>
); // Nested ternaries are hard to read`,
    senior: `// ✅ Early Returns
if (!user) return <Login />;
if (admin) return <Admin />;
return <User />;`
  },
  interview: {
    questions: [
      {
        q: "Can browsers read JSX?",
        a: "No. It must be transpiled by Babel/SWC into standard JavaScript."
      },
      {
        q: "Why is `class` becomes `className`?",
        a: "`class` is a reserved keyword in JavaScript."
      }
    ]
  }
};
