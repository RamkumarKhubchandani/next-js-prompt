export const day27 = {
  day: 27,
  title: "React Testing: RTL & Vitest Mastery",
  intro: "Write tests that give confidence without testing implementation details. React Testing Library philosophy.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You'll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li>Testing philosophy: Test behavior, not implementation</li>
<li>Setting up Vitest + React Testing Library</li>
<li>Queries: getBy, findBy, queryBy</li>
<li>User interactions with userEvent</li>
<li>Mocking API calls</li>
<li>Testing async components</li>
</ul>

<div class="bg-gradient-to-r from-green-500/20 to-teal-500/20 border border-green-200 dark:border-green-500/30 p-4 rounded-xl mb-6">
<h4 class="text-green-600 dark:text-green-400 font-bold mb-2">🏆 Testing Library Philosophy</h4>
<p class="text-gray-600 dark:text-light-300">"The more your tests resemble the way your software is used, the more confidence they can give you." - Kent C. Dodds</p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Setup Steps</h3>
<div class="bg-gray-100 dark:bg-dark-900 p-4 rounded-xl mb-6 font-mono text-sm">
<pre class="text-gray-800 dark:text-cyan-300"># Install dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom

# Add to vite.config.js
export default defineConfig({
test: {
globals: true,
environment: 'jsdom',
setupFiles: './src/test/setup.js'
}
})

# Create setup.js
import '@testing-library/jest-dom';</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🔍 Query Priority (Use in Order)</h3>
<ol class="list-decimal list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">getByRole</code> - Accessible (best!)</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">getByLabelText</code> - Form fields</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">getByPlaceholderText</code> - Inputs</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">getByText</code> - Non-interactive content</li>
<li><code class="bg-gray-100 dark:bg-dark-900 text-cyan-400 px-2 py-1 rounded">getByTestId</code> - Last resort</li>
</ol>
            `,
  code: `/*
╔══════════════════════════════════════════════════════════════════════╗
║  🧪 REACT TESTING LIBRARY - COMPLETE GUIDE                           ║
║  Test behavior, not implementation!                                  ║
╠══════════════════════════════════════════════════════════════════════╣
║  Note: These tests would run in Vitest/Jest environment.             ║
║  This code demonstrates patterns and best practices.                 ║
╚══════════════════════════════════════════════════════════════════════╝
*/

// ═══════════════════════════════════════════════════════════════════
// 📦 COMPONENT TO TEST: LoginForm
// ═══════════════════════════════════════════════════════════════════
function LoginForm({ onSubmit }) {
const [email, setEmail] = React.useState('');
const [password, setPassword] = React.useState('');
const [error, setError] = React.useState('');
const [isLoading, setIsLoading] = React.useState(false);

const handleSubmit = async (e) => {
e.preventDefault();
setError('');

if (!email || !password) {
  setError('Please fill in all fields');
  return;
}

setIsLoading(true);
try {
  await onSubmit({ email, password });
} catch (err) {
  setError(err.message);
} finally {
  setIsLoading(false);
}
};

return (
<form onSubmit={handleSubmit} aria-label="Login form">
  <h2>Login</h2>
  
  {error && <div role="alert" style={{ color: 'red' }}>{error}</div>}
  
  <div>
    <label htmlFor="email">Email</label>
    <input
      id="email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter email"
    />
  </div>
  
  <div>
    <label htmlFor="password">Password</label>
    <input
      id="password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Enter password"
    />
  </div>
  
  <button type="submit" disabled={isLoading}>
    {isLoading ? 'Logging in...' : 'Login'}
  </button>
</form>
);
}

// ═══════════════════════════════════════════════════════════════════
// 🧪 TEST EXAMPLES (would go in LoginForm.test.jsx)
// ═══════════════════════════════════════════════════════════════════
/*
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
// ═══════════════════════════════════════════════════════════════
// TEST 1: Renders correctly
// ═══════════════════════════════════════════════════════════════
it('renders email and password fields', () => {
render(<LoginForm onSubmit={vi.fn()} />);

// ✅ Best: Query by role (accessible)
expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();

// ✅ Good: Query by label
expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

// ✅ Good: Query by role for button
expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});

// ═══════════════════════════════════════════════════════════════
// TEST 2: Shows validation error
// ═══════════════════════════════════════════════════════════════
it('shows error when fields are empty', async () => {
const user = userEvent.setup();
render(<LoginForm onSubmit={vi.fn()} />);

await user.click(screen.getByRole('button', { name: /login/i }));

// ✅ Use getByRole('alert') for error messages
expect(screen.getByRole('alert')).toHaveTextContent(/fill in all fields/i);
});

// ═══════════════════════════════════════════════════════════════
// TEST 3: Submits with valid data
// ═══════════════════════════════════════════════════════════════
it('calls onSubmit with email and password', async () => {
const user = userEvent.setup();
const mockSubmit = vi.fn();
render(<LoginForm onSubmit={mockSubmit} />);

// Type in fields
await user.type(screen.getByLabelText(/email/i), 'test@example.com');
await user.type(screen.getByLabelText(/password/i), 'password123');

// Submit
await user.click(screen.getByRole('button', { name: /login/i }));

// Assert
expect(mockSubmit).toHaveBeenCalledWith({
  email: 'test@example.com',
  password: 'password123'
});
});

// ═══════════════════════════════════════════════════════════════
// TEST 4: Shows loading state
// ═══════════════════════════════════════════════════════════════
it('disables button while loading', async () => {
const user = userEvent.setup();
// Mock that takes time to resolve
const mockSubmit = vi.fn(() => new Promise(r => setTimeout(r, 100)));
render(<LoginForm onSubmit={mockSubmit} />);

await user.type(screen.getByLabelText(/email/i), 'test@example.com');
await user.type(screen.getByLabelText(/password/i), 'password123');
await user.click(screen.getByRole('button', { name: /login/i }));

// Button should show loading
expect(screen.getByRole('button')).toHaveTextContent(/logging in/i);
expect(screen.getByRole('button')).toBeDisabled();

// Wait for completion
await waitFor(() => {
  expect(screen.getByRole('button')).toHaveTextContent(/login/i);
});
});

// ═══════════════════════════════════════════════════════════════
// TEST 5: Shows API error
// ═══════════════════════════════════════════════════════════════
it('displays error from failed submission', async () => {
const user = userEvent.setup();
const mockSubmit = vi.fn().mockRejectedValue(new Error('Invalid credentials'));
render(<LoginForm onSubmit={mockSubmit} />);

await user.type(screen.getByLabelText(/email/i), 'test@example.com');
await user.type(screen.getByLabelText(/password/i), 'wrong');
await user.click(screen.getByRole('button', { name: /login/i }));

// Wait for error to appear
await waitFor(() => {
  expect(screen.getByRole('alert')).toHaveTextContent(/invalid credentials/i);
});
});
});
*/

// ═══════════════════════════════════════════════════════════════════
// 🎮 INTERACTIVE DEMO
// ═══════════════════════════════════════════════════════════════════
function App() {
const [result, setResult] = React.useState(null);

const handleSubmit = async (data) => {
// Simulate API
await new Promise(r => setTimeout(r, 1000));
if (data.password === 'wrong') {
  throw new Error('Invalid credentials');
}
setResult(\`✅ Logged in as \${data.email}\`);
};

return (
<div style={{ fontFamily: 'system-ui', padding: '20px', maxWidth: '400px' }}>
  <h3>🧪 React Testing Library Demo</h3>
  <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
    This component demonstrates patterns for testable React components.
  </p>
  
  <div style={{ background: '#f1f5f9', padding: '20px', borderRadius: '8px' }}>
    <LoginForm onSubmit={handleSubmit} />
  </div>
  
  {result && (
    <div style={{ 
      marginTop: '15px', 
      padding: '10px', 
      background: '#dcfce7', 
      borderRadius: '8px' 
    }}>
      {result}
    </div>
  )}
  
  <div style={{ marginTop: '20px', fontSize: '13px', color: '#64748b' }}>
    <strong>Test Tips:</strong>
    <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
      <li>Try empty fields → Shows validation error</li>
      <li>Try password "wrong" → Shows API error</li>
      <li>Valid email + password → Shows success</li>
    </ul>
  </div>
</div>
);
}`,
  comparison: {
    junior: `// ❌ Testing implementation details
expect(component.state.isLoading).toBe(true);
expect(wrapper.find('.btn-loading')).toHaveLength(1);
// Breaks when you refactor CSS classes or state names`,
    senior: `// ✅ Testing behavior
expect(screen.getByRole('button')).toBeDisabled();
expect(screen.getByRole('button')).toHaveTextContent(/loading/i);
// Works regardless of implementation`
  },
  interview: {
    questions: [
      {
        q: "What's the difference between getBy, findBy, and queryBy?",
        a: "getBy throws if not found (use when element should exist). queryBy returns null if not found (use to assert absence). findBy is async and waits (use for elements that appear after async operations)."
      },
      {
        q: "Why prefer getByRole over getByTestId?",
        a: "getByRole tests accessibility - if the test passes, screen readers can find the element. getByTestId is implementation detail that doesn't verify accessibility. Only use testId as last resort."
      },
      {
        q: "How do you test components that fetch data?",
        a: "Mock the fetch/axios at module level with vi.mock(). Use waitFor or findBy queries to wait for loading to complete. Assert on the final rendered state, not intermediate loading states."
      }
    ]
  }
};
