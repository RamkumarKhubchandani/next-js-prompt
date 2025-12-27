export const patternsQuestions = [
  {
    id: 'react-pattern-1',
    category: 'Patterns',
    difficulty: 'Hard',
    question: 'Higher-Order Components (HOC) - When and How',
    answer: `Classic pattern asked by Meta and Google (though less common now with hooks).

### What is HOC?
A function that takes a component and returns a new enhanced component.

### Use Cases:
- **Code reuse:** Share logic across components
- **Props manipulation:** Add/modify props
- **Conditional rendering:** Show/hide based on auth
- **Data fetching:** Inject data as props

### Modern Alternative:
Custom hooks (preferred in modern React).

### When to Use HOC:
- Legacy codebases
- Third-party libraries (Redux connect)
- Class components (can't use hooks)

### Common HOCs:
- withAuth: Protect routes
- withLoading: Show loading state
- withErrorBoundary: Error handling`,
    codeExample: `// Higher-Order Components (HOC)
console.log('=== HOC Pattern ===');

// HOC: Add loading state
function withLoading(WrappedComponent) {
  return function WithLoading({ isLoading, ...props }) {
    if (isLoading) {
      console.log('[withLoading] Showing spinner');
      return <div className="spinner">Loading...</div>;
    }
    console.log('[withLoading] Rendering wrapped component');
    return <WrappedComponent {...props} />;
  };
}

// HOC: Add authentication
function withAuth(WrappedComponent) {
  return function WithAuth(props) {
    const [isAuthenticated] = useState(true);
    
    if (!isAuthenticated) {
      console.log('[withAuth] Not authenticated, redirecting');
      return <div>Please log in</div>;
    }
    
    console.log('[withAuth] Authenticated, rendering');
    return <WrappedComponent {...props} />;
  };
}

// HOC: Add data fetching
function withUser(WrappedComponent) {
  return function WithUser(props) {
    const [user] = useState({ name: 'John', role: 'Admin' });
    
    console.log('[withUser] Injecting user data');
    return <WrappedComponent user={user} {...props} />;
  };
}

// Base component
function UserProfile({ user }) {
  console.log('[UserProfile] Rendering for:', user?.name);
  return (
    <div>
      <h1>{user?.name}</h1>
      <p>Role: {user?.role}</p>
    </div>
  );
}

// Compose HOCs
console.log('\\n--- Composing HOCs ---');
const EnhancedProfile = withAuth(withLoading(withUser(UserProfile)));

console.log('\\n--- Rendering Enhanced Component ---');
EnhancedProfile({ isLoading: false });

console.log('\\n--- With loading state ---');
const LoadingProfile = withLoading(UserProfile);
LoadingProfile({ isLoading: true, user: null });

console.log('\\n=== Modern Alternative: Custom Hook ===');

function useUser() {
  const [user] = useState({ name: 'Jane', role: 'User' });
  const [loading] = useState(false);
  return { user, loading };
}

function ModernProfile() {
  const { user, loading } = useUser();
  
  if (loading) return <div>Loading...</div>;
  
  console.log('[ModernProfile] Using custom hook');
  return <div>{user.name}</div>;
}

ModernProfile();

console.log('\\n✓ HOCs work but hooks are cleaner!');`
  },
  {
    id: 'react-pattern-2',
    category: 'Patterns',
    difficulty: 'Hard',
    question: 'Render Props Pattern - Deep Dive',
    answer: `Another classic pattern (asked by Meta, less common with hooks).

### What is Render Props?
A component that takes a function as a prop and calls it to render content.

### Why Use It?
- **Share logic:** Without HOCs
- **Flexibility:** Consumer controls rendering
- **Composition:** Easy to compose multiple providers

### Modern Alternative:
Custom hooks (preferred).

### Famous Examples:
- React Router render prop
- Formik
- React Motion

### Render Props vs Hooks:
**Render Props:** More verbose, harder to compose
**Hooks:** Cleaner, easier to compose`,
    codeExample: `// Render Props Pattern
console.log('=== Render Props Pattern ===');

// Render Props component: Mouse tracker
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 100, y: 150 });
  
  // Would normally track actual mouse position
  useEffect(() => {
    console.log('[MouseTracker] Tracking mouse...');
  }, []);
  
  // Call render prop with data
  return render(position);
}

// Usage 1: Render as text
console.log('\\n--- Usage 1: Text Display ---');
const textResult = MouseTracker({
  render: ({ x, y }) => {
    console.log('[Consumer] Rendering as text');
    return <p>Mouse: ({x}, {y})</p>;
  }
});
console.log('Result:', JSON.stringify(textResult));

// Usage 2: Render as tooltip
console.log('\\n--- Usage 2: Tooltip ---');
const tooltipResult = MouseTracker({
  render: ({ x, y }) => {
    console.log('[Consumer] Rendering as tooltip');
    return (
      <div style={{ position: 'absolute', left: x, top: y }}>
        Tooltip at {x}, {y}
      </div>
    );
  }
});
console.log('Result:', JSON.stringify(tooltipResult));

// Render Props: Data Fetcher
console.log('\\n=== Data Fetcher with Render Props ===');

function DataFetcher({ url, render }) {
  const [state] = useState({
    loading: false,
    data: { users: ['Alice', 'Bob'] },
    error: null
  });
  
  console.log('[DataFetcher] Fetching:', url);
  
  return render(state);
}

DataFetcher({
  url: '/api/users',
  render: ({ loading, data, error }) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    console.log('[Consumer] Data:', data.users);
    return (
      <ul>
        {data.users.map(u => <li key={u}>{u}</li>)}
      </ul>
    );
  }
});

// Modern alternative
console.log('\\n=== Modern: Custom Hook ===');

function useMouse() {
  const [position] = useState({ x: 200, y: 250 });
  return position;
}

function ModernMouseDisplay() {
  const { x, y } = useMouse();
  console.log('[Hook] Much cleaner!');
  return <p>Mouse: ({x}, {y})</p>;
}

ModernMouseDisplay();

console.log('\\n✓ Hooks are preferred for new code');`
  },
  {
    id: 'react-pattern-3',
    category: 'Patterns',
    difficulty: 'Expert',
    question: 'Compound Components Pattern - Advanced',
    answer: `Asked by design system teams at Airbnb, Stripe, and Shopify.

### What is Compound Components?
Components that work together to form a complete UI.

**Think:** HTML select and option

### Why Use It?
- **Flexibility:** Users compose as needed
- **Implicit State:** Shared state without prop drilling
- **API Design:** Clean, intuitive API

### How It Works:
1. Parent manages state
2. Children access via Context
3. Users compose freely

### Use Cases:
- **Design systems:** Tabs, Accordion, Dropdown
- **Form libraries:** Form, Field, Error
- **UI kits:** Modal, Dialog, Menu

### Famous Examples:
- Radix UI
- Headless UI
- Reach UI`,
    codeExample: `// Compound Components Pattern
console.log('=== Compound Components ===');

// Create context for shared state
const TabsContext = createContext();

// Parent component
function Tabs({ children, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  console.log('[Tabs] Active tab:', activeTab);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

// Child: Tab button
function Tab({ id, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === id;
  
  console.log('[Tab]', id, isActive ? '(active)' : '');
  
  return (
    <button 
      onClick={() => setActiveTab(id)}
      className={isActive ? 'active' : ''}
    >
      {children}
    </button>
  );
}

// Child: Tab panel
function TabPanel({ id, children }) {
  const { activeTab } = useContext(TabsContext);
  
  if (activeTab !== id) {
    console.log('[TabPanel]', id, '- hidden');
    return null;
  }
  
  console.log('[TabPanel]', id, '- visible');
  return <div className="panel">{children}</div>;
}

// Attach sub-components
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;

// Usage: Clean, flexible API
console.log('\\n--- Compound Usage ---');

function App() {
  return (
    <Tabs defaultTab="home">
      <div className="tab-list">
        <Tabs.Tab id="home">Home</Tabs.Tab>
        <Tabs.Tab id="profile">Profile</Tabs.Tab>
        <Tabs.Tab id="settings">Settings</Tabs.Tab>
      </div>
      
      <Tabs.Panel id="home">
        <h2>Welcome Home!</h2>
      </Tabs.Panel>
      <Tabs.Panel id="profile">
        <h2>Your Profile</h2>
      </Tabs.Panel>
      <Tabs.Panel id="settings">
        <h2>Settings Page</h2>
      </Tabs.Panel>
    </Tabs>
  );
}

App();

console.log('\\n=== Benefits ===');
console.log('1. Flexible composition');
console.log('2. No prop drilling');
console.log('3. Clean, intuitive API');
console.log('4. Used by Radix, Headless UI');

console.log('✓ Compound Components: flexible, composable APIs');`
  },
  {
    id: 'react-pat-4',
    category: 'Patterns',
    difficulty: 'Expert',
    question: 'Inversion of Control (IoC) - Flexible Component APIs',
    answer: `Advanced pattern asked at **senior/staff interviews**.

### What is IoC?
Give control to the consumer instead of the component.

**Traditional:**
Component controls everything internally.

**IoC:**
Consumer controls behavior via props/children.

### Benefits:
- Maximum flexibility
- Easy to customize
- Testable
- Reusable

### Techniques:
1. **Render Props** - Pass rendering logic
2. **Children as Function** - Pass component logic
3. **Controlled Components** - Consumer manages state
4. **Hooks** - Consumer controls behavior

### When to Use:
- Building libraries
- Complex, customizable components
- Need maximum flexibility`,
    codeExample: `// Inversion of Control
console.log('=== Traditional (Component Controls) ===');

console.log('❌ Rigid component:');
console.log('function DataTable({ data }) {');
console.log('  return (');
console.log('    <table>');
console.log('      {data.map(row => (');
console.log('        <tr key={row.id}>');
console.log('          <td>{row.name}</td>');
console.log('          <td>{row.email}</td>');
console.log('        </tr>');
console.log('      ))}');
console.log('    </table>');
console.log('  );');
console.log('}');
console.log('');
console.log('Problem: Fixed columns, no customization');

console.log('\\n=== IoC (Consumer Controls) ===');

console.log('\\n✓ Flexible with render prop:');
console.log('function DataTable({ data, renderRow }) {');
console.log('  return (');
console.log('    <table>');
console.log('      {data.map(row => renderRow(row))}');
console.log('    </table>');
console.log('  );');
console.log('}');
console.log('');
console.log('// Consumer controls rendering');
console.log('<DataTable');
console.log('  data={users}');
console.log('  renderRow={user => (');
console.log('    <tr key={user.id}>');
console.log('      <td>{user.name}</td>');
console.log('      <td>{user.email}</td>');
console.log('      <td><button>Edit</button></td>');
console.log('    </tr>');
console.log('  )}');
console.log('/>');

console.log('\\n=== Children as Function ===');

console.log('\\nfunction DataFetcher({ url, children }) {');
console.log('  const [data, setData] = useState(null);');
console.log('  const [loading, setLoading] = useState(true);');
console.log('  ');
console.log('  useEffect(() => {');
console.log('    fetch(url)');
console.log('      .then(res => res.json())');
console.log('      .then(data => {');
console.log('        setData(data);');
console.log('        setLoading(false);');
console.log('      });');
console.log('  }, [url]);');
console.log('  ');
console.log('  // Consumer controls rendering');
console.log('  return children({ data, loading });');
console.log('}');

console.log('\\n// Usage');
console.log('<DataFetcher url="/api/users">');
console.log('  {({ data, loading }) => (');
console.log('    loading ? <Spinner /> : <UserList users={data} />');
console.log('  )}');
console.log('</DataFetcher>');

console.log('\\n=== Controlled Component Pattern ===');

console.log('\\nfunction SearchBox({ value, onChange, onSearch }) {');
console.log('  // Component doesn\\'t manage state');
console.log('  return (');
console.log('    <div>');
console.log('      <input value={value} onChange={onChange} />');
console.log('      <button onClick={onSearch}>Search</button>');
console.log('    </div>');
console.log('  );');
console.log('}');

console.log('\\n// Consumer controls state');
console.log('function App() {');
console.log('  const [query, setQuery] = useState("");');
console.log('  ');
console.log('  const handleSearch = () => {');
console.log('    console.log("Searching for:", query);');
console.log('  };');
console.log('  ');
console.log('  return (');
console.log('    <SearchBox');
console.log('      value={query}');
console.log('      onChange={e => setQuery(e.target.value)}');
console.log('      onSearch={handleSearch}');
console.log('    />');
console.log('  );');
console.log('}');

console.log('\\n=== Custom Hook (IoC) ===');

console.log('\\nfunction useDataFetcher(url) {');
console.log('  const [data, setData] = useState(null);');
console.log('  const [loading, setLoading] = useState(true);');
console.log('  ');
console.log('  useEffect(() => {');
console.log('    fetch(url).then(res => res.json()).then(setData);');
console.log('    setLoading(false);');
console.log('  }, [url]);');
console.log('  ');
console.log('  return { data, loading };');
console.log('}');

console.log('\\n// Consumer controls everything');
console.log('function UserList() {');
console.log('  const { data, loading } = useDataFetcher("/api/users");');
console.log('  ');
console.log('  if (loading) return <Spinner />;');
console.log('  return <div>{data.map(u => <User key={u.id} {...u} />)}</div>;');
console.log('}');

console.log('\\n✓ IoC: give control to consumer');
console.log('✓ Maximum flexibility and reusability');
console.log('✓ Perfect for libraries and complex UIs');`
  },
  {
    id: 'react-pat-5',
    category: 'Patterns',
    difficulty: 'Expert',
    question: 'Dependency Injection in React - Testable Components',
    answer: `Advanced testing pattern asked at **senior interviews**.

### What is Dependency Injection?
Pass dependencies as props instead of importing directly.

**Benefits:**
- Easy to test (mock dependencies)
- Loosely coupled
- Flexible
- Reusable

### Techniques:
1. **Props** - Pass dependencies as props
2. **Context** - Inject via Context
3. **Custom Hooks** - Inject services
4. **Higher-Order Components** - Wrap with dependencies

### When to Use:
- Testing complex components
- Building libraries
- Need to swap implementations
- Multiple environments (dev/prod)`,
    codeExample: `// Dependency Injection
console.log('=== Without DI (Tightly Coupled) ===');

console.log('❌ Hard to test:');
console.log('import { api } from "./api";');
console.log('');
console.log('function UserProfile({ userId }) {');
console.log('  const [user, setUser] = useState(null);');
console.log('  ');
console.log('  useEffect(() => {');
console.log('    api.getUser(userId).then(setUser); // Tightly coupled!');
console.log('  }, [userId]);');
console.log('  ');
console.log('  return <div>{user?.name}</div>;');
console.log('}');
console.log('');
console.log('Problem: Can\\'t test without real API');

console.log('\\n=== With DI (Loosely Coupled) ===');

console.log('\\n✓ Easy to test:');
console.log('function UserProfile({ userId, api }) {');
console.log('  const [user, setUser] = useState(null);');
console.log('  ');
console.log('  useEffect(() => {');
console.log('    api.getUser(userId).then(setUser); // Injected!');
console.log('  }, [userId, api]);');
console.log('  ');
console.log('  return <div>{user?.name}</div>;');
console.log('}');

console.log('\\n// Production');
console.log('<UserProfile userId={1} api={realApi} />');

console.log('\\n// Testing');
console.log('const mockApi = {');
console.log('  getUser: jest.fn(() => Promise.resolve({ name: "Test" }))');
console.log('};');
console.log('<UserProfile userId={1} api={mockApi} />');

console.log('\\n=== Context-Based DI ===');

console.log('\\nconst ApiContext = createContext(null);');
console.log('');
console.log('function ApiProvider({ children, api }) {');
console.log('  return (');
console.log('    <ApiContext.Provider value={api}>');
console.log('      {children}');
console.log('    </ApiContext.Provider>');
console.log('  );');
console.log('}');

console.log('\\nfunction UserProfile({ userId }) {');
console.log('  const api = useContext(ApiContext); // Injected via context');
console.log('  const [user, setUser] = useState(null);');
console.log('  ');
console.log('  useEffect(() => {');
console.log('    api.getUser(userId).then(setUser);');
console.log('  }, [userId, api]);');
console.log('  ');
console.log('  return <div>{user?.name}</div>;');
console.log('}');

console.log('\\n// Production');
console.log('<ApiProvider api={realApi}>');
console.log('  <UserProfile userId={1} />');
console.log('</ApiProvider>');

console.log('\\n// Testing');
console.log('<ApiProvider api={mockApi}>');
console.log('  <UserProfile userId={1} />');
console.log('</ApiProvider>');

console.log('\\n=== Custom Hook DI ===');

console.log('\\nfunction useApi() {');
console.log('  return useContext(ApiContext);');
console.log('}');

console.log('\\nfunction UserProfile({ userId }) {');
console.log('  const api = useApi(); // Clean injection');
console.log('  const [user, setUser] = useState(null);');
console.log('  ');
console.log('  useEffect(() => {');
console.log('    api.getUser(userId).then(setUser);');
console.log('  }, [userId, api]);');
console.log('  ');
console.log('  return <div>{user?.name}</div>;');
console.log('}');

console.log('\\n=== Service Layer Pattern ===');

console.log('\\nclass UserService {');
console.log('  constructor(api) {');
console.log('    this.api = api;');
console.log('  }');
console.log('  ');
console.log('  async getUser(id) {');
console.log('    const user = await this.api.getUser(id);');
console.log('    return { ...user, displayName: user.name.toUpperCase() };');
console.log('  }');
console.log('}');

console.log('\\nconst ServiceContext = createContext(null);');
console.log('');
console.log('function ServiceProvider({ children }) {');
console.log('  const services = useMemo(() => ({');
console.log('    userService: new UserService(realApi)');
console.log('  }), []);');
console.log('  ');
console.log('  return (');
console.log('    <ServiceContext.Provider value={services}>');
console.log('      {children}');
console.log('    </ServiceContext.Provider>');
console.log('  );');
console.log('}');

console.log('\\nfunction useServices() {');
console.log('  return useContext(ServiceContext);');
console.log('}');

console.log('\\n// Usage');
console.log('function UserProfile({ userId }) {');
console.log('  const { userService } = useServices();');
console.log('  const [user, setUser] = useState(null);');
console.log('  ');
console.log('  useEffect(() => {');
console.log('    userService.getUser(userId).then(setUser);');
console.log('  }, [userId, userService]);');
console.log('  ');
console.log('  return <div>{user?.displayName}</div>;');
console.log('}');

console.log('\\n✓ DI: pass dependencies, don\\'t import');
console.log('✓ Easy to test with mocks');
console.log('✓ Loosely coupled, flexible');`
  }
];
