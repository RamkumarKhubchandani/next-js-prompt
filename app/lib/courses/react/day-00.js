export const day00 = {
  day: 0,
  title: "Day 0: The Professional Setup",
  intro: "Stop using Create-React-App. Learn the professional toolchain: Vite, ESLint, Prettier, and VS Code extensions.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Welcome to Day 0. The first step to writing pro React code is a pro environment."
      },
      {
        type: "talk",
        message: "Many tutorials use `create-react-app`, but that tool is deprecated and slow. We use **Vite**."
      },
      {
        type: "challenge",
        instruction: "Which command creates a new React project with TypeScript using Vite?",
        buggyCode: `// ❌ Deprecated/Wrong
npm create-react-app my-app --typescript
// npx create-react-app my-app`,
        solutionCode: `// ✅ Modern & Fast
npm create vite@latest my-app -- --template react-ts`,
        verifyOutput: "npm create vite@latest",
        successMessage: "Correct! Vite is orders of magnitude faster than Webpack-based CRA.",
        hint: "It starts with `npm create vite@latest...`"
      }
    ]
  },
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1. Why Not Create-React-App?</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">CRA is great for beginners, but it's slow and opinionated. Modern development uses faster bundlers like Vite.</p>
<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-gray-700 dark:text-light-200 overflow-x-auto">
<pre><code>
┌───────────────────────────┐     ┌───────────────────────────┐
│       Webpack (CRA)       │     │         Vite (ESBuild)    │
│───────────────────────────│     │───────────────────────────│
│ 1. Bundles ALL JS/CSS     │     │ 1. Serves NATIVE ESM      │
│    into a single file.    │     │    (no bundling in dev).  │
│ 2. Slow Dev Server Start  │     │ 2. Instant Dev Server     │
│    (Bundles everything).  │     │    (Browser handles imports).
│ 3. HMR is slower.         │     │ 3. HMR is lightning fast. │
│ 4. Complex config.        │     │ 4. Simple config.         │
└───────────────────────────┘     └───────────────────────────┘
</code></pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2. Setup with Vite</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">Let's create a new React project with Vite.</p>
<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-gray-700 dark:text-light-200 overflow-x-auto">
<pre><code>
# Create a new Vite + React project
npm create vite@latest my-react-app -- --template react-ts

# Navigate into your project
cd my-react-app

# Install dependencies
npm install

# Start the development server
npm run dev
</code></pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3. Essential VS Code Extensions</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li>**ESLint:** For code quality and catching errors early.</li>
<li>**Prettier:** For consistent code formatting.</li>
<li>**Tailwind CSS IntelliSense:** For auto-completion and linting Tailwind classes.</li>
<li>**GitLens:** For powerful Git insights.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">4. Code Formatting & Linting</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">Configure ESLint and Prettier for a professional workflow.</p>
<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm text-gray-700 dark:text-light-200 overflow-x-auto">
<pre><code>
# Install ESLint and Prettier packages
npm install -D eslint prettier eslint-plugin-react @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier

# Create .eslintrc.cjs (example config)
module.exports = {
root: true,
env: { browser: true, es2020: true },
extends: [
'eslint:recommended',
'plugin:@typescript-eslint/recommended',
'plugin:react-hooks/recommended',
'prettier' // Must be last
],
parser: '@typescript-eslint/parser',
parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
plugins: ['react-refresh'],
rules: {
'react-refresh/only-export-components': [
  'warn',
  { allowConstantExport: true },
],
},
}

# Create .prettierrc.json
{
"semi": true,
"trailingComma": "all",
"singleQuote": true,
"printWidth": 100,
"tabWidth": 2
}
</code></pre>
</div>
                `,
  code: `function App() {
const tools = [
{ name: 'Vite', desc: 'Lightning fast bundler', status: '✅' },
{ name: 'ESLint', desc: 'Code quality checker', status: '✅' },
{ name: 'Prettier', desc: 'Code formatter', status: '✅' },
{ name: 'TypeScript', desc: 'Type safety', status: '✅' },
];

return (
<div style={{ fontFamily: 'sans-serif', padding: '10px' }}>
  <h3>🛠️ Professional React Setup</h3>
  <p style={{ color: '#666', marginBottom: '15px' }}>
    Modern tools for modern development
  </p>
  <div style={{ display: 'grid', gap: '8px' }}>
    {tools.map(tool => (
      <div key={tool.name} style={{ 
        padding: '12px', 
        background: '#f0fdf4', 
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <div>
          <strong>{tool.name}</strong>
          <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>{tool.desc}</p>
        </div>
        <span style={{ fontSize: '20px' }}>{tool.status}</span>
      </div>
    ))}
  </div>
  <p style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
    Run: npm create vite@latest my-app -- --template react-ts
  </p>
</div>
);
}`,
  video: "SqcY0GlETPk",
  comparison: {
    junior: `// ❌ Manual Setup (CRA)
// npx create-react-app my-app
// Wait 5 minutes...
// Eject config to customize...
// Regret life choices...`,
    senior: `// ✅ Vite + TS
// npm create vite@latest
// Instant start.
// Built-in TypeScript support.
// Optimized Build.`
  },
  interview: {
    questions: [
      {
        q: "Why choose Vite over Webpack for a new React project?",
        a: "Vite offers significantly faster development server startup and HMR (Hot Module Replacement) due to its use of native ES Modules and ESBuild for bundling, leading to a much smoother developer experience compared to Webpack's traditional bundling approach."
      },
      {
        q: "What is the role of ESLint and Prettier in a professional React workflow?",
        a: "ESLint enforces code quality and catches potential errors or anti-patterns, while Prettier ensures consistent code formatting across the entire team. Together, they reduce cognitive load, improve readability, and prevent debates over style."
      },
      {
        q: "How do you manage Node.js versions in a professional environment?",
        a: "Tools like `nvm` (Node Version Manager) are essential. They allow developers to easily switch between different Node.js versions required by various projects, preventing compatibility issues and ensuring a consistent development environment."
      }
    ]
  }
};
