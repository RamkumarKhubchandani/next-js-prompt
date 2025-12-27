export const routingQuestions = [
    {
        id: 'react-route-1',
        category: 'Routing',
        difficulty: 'Hard',
        question: 'React Router v6 - Complete Guide and Best Practices',
        answer: `Essential for **any SPA** - asked at every company.

### Key Concepts:
1. **Routes** - Define path → component mapping
2. **Outlet** - Render nested routes
3. **Navigate** - Programmatic navigation
4. **useParams** - Access URL parameters
5. **useSearchParams** - Query string handling
6. **useNavigate** - Navigation hook

### v6 Changes from v5:
- \`<Switch>\` → \`<Routes>\`
- \`<Route element>\` instead of component/render
- Nested routes with \`<Outlet />\`
- Relative paths by default

### Best Practices:
- Code split routes with React.lazy
- Protected routes with wrapper components
- 404 catch-all route
- Scroll restoration`,
        codeExample: `// React Router v6 Patterns
console.log('=== Basic Routing Setup ===');

// Simulating React Router v6
function BrowserRouter({ children }) {
  console.log('[Router] BrowserRouter initialized');
  return children;
}

function Routes({ children }) {
  console.log('[Router] Routes container');
  return children;
}

function Route({ path, element }) {
  console.log('[Route] Path:', path, '→ Component');
  return element;
}

// App structure
console.log('\\n<BrowserRouter>');
console.log('  <Routes>');
console.log('    <Route path="/" element={<Home />} />');
console.log('    <Route path="/about" element={<About />} />');
console.log('    <Route path="/users/:id" element={<UserProfile />} />');
console.log('    <Route path="*" element={<NotFound />} />');
console.log('  </Routes>');
console.log('</BrowserRouter>');

console.log('\\n=== Nested Routes with Outlet ===');

console.log('// Parent route');
console.log('<Route path="/dashboard" element={<DashboardLayout />}>');
console.log('  <Route index element={<DashboardHome />} />');
console.log('  <Route path="settings" element={<Settings />} />');
console.log('  <Route path="profile" element={<Profile />} />');
console.log('</Route>');

console.log('\\n// DashboardLayout.js');
console.log('function DashboardLayout() {');
console.log('  return (');
console.log('    <div>');
console.log('      <Sidebar />');
console.log('      <Outlet /> {/* Nested routes render here */}');
console.log('    </div>');
console.log('  );');
console.log('}');

console.log('\\n=== useParams - URL Parameters ===');

function useParams() {
  const params = { id: '123', category: 'electronics' };
  console.log('[useParams] Extracted:', JSON.stringify(params));
  return params;
}

function ProductPage() {
  const { id, category } = useParams();
  console.log('Product ID:', id);
  console.log('Category:', category);
}

console.log('URL: /products/electronics/123');
ProductPage();

console.log('\\n=== useNavigate - Programmatic Navigation ===');

function useNavigate() {
  return (to, options) => {
    console.log('[Navigate] Going to:', to);
    if (options?.replace) console.log('[Navigate] Replace mode (no history)');
    if (options?.state) console.log('[Navigate] Passing state:', options.state);
  };
}

const navigate = useNavigate();
console.log('\\nAfter form submit:');
navigate('/success', { replace: true, state: { from: 'checkout' } });

console.log('\\n=== Protected Routes Pattern ===');

console.log('function ProtectedRoute({ children }) {');
console.log('  const { isAuthenticated } = useAuth();');
console.log('  ');
console.log('  if (!isAuthenticated) {');
console.log('    return <Navigate to="/login" replace />;');
console.log('  }');
console.log('  ');
console.log('  return children;');
console.log('}');
console.log('');
console.log('// Usage:');
console.log('<Route path="/dashboard" element={');
console.log('  <ProtectedRoute>');
console.log('    <Dashboard />');
console.log('  </ProtectedRoute>');
console.log('} />');

console.log('\\n=== Code Splitting Routes ===');

console.log('const Home = lazy(() => import("./pages/Home"));');
console.log('const Dashboard = lazy(() => import("./pages/Dashboard"));');
console.log('');
console.log('<Routes>');
console.log('  <Route path="/" element={');
console.log('    <Suspense fallback={<Loading />}>');
console.log('      <Home />');
console.log('    </Suspense>');
console.log('  } />');
console.log('</Routes>');

console.log('\\n✓ Use nested routes with Outlet');
console.log('✓ Code split for better performance');
console.log('✓ Protect routes with wrapper components');`
    },
    {
        id: 'react-route-2',
        category: 'Routing',
        difficulty: 'Expert',
        question: 'Advanced Routing - Data Loading and Error Boundaries',
        answer: `React Router 6.4+ features - asked at **modern companies**.

### Loader Pattern:
- Load data before rendering route
- Parallel data fetching
- Automatic error handling
- Type-safe with TypeScript

### Key APIs:
1. **loader** - Fetch data for route
2. **useLoaderData** - Access loaded data
3. **action** - Handle form submissions
4. **useActionData** - Access action results
5. **errorElement** - Error boundary per route

### Benefits:
- No loading states in components
- Waterfall prevention
- Automatic error handling
- Better UX with instant navigation`,
        codeExample: `// Advanced React Router - Loaders & Actions
console.log('=== Route Loaders ===');

// Loader function
async function productLoader({ params }) {
  console.log('[Loader] Fetching product:', params.id);
  
  // Simulated API call
  const product = {
    id: params.id,
    name: 'React Course',
    price: 49
  };
  
  console.log('[Loader] Data loaded:', JSON.stringify(product));
  return product;
}

// Route configuration
console.log('\\nRoute with loader:');
console.log('{');
console.log('  path: "/products/:id",');
console.log('  element: <ProductPage />,');
console.log('  loader: productLoader,');
console.log('  errorElement: <ErrorPage />');
console.log('}');

// Component using loader data
console.log('\\nComponent:');
console.log('function ProductPage() {');
console.log('  const product = useLoaderData();');
console.log('  // No loading state needed!');
console.log('  return <div>{product.name}</div>;');
console.log('}');

productLoader({ params: { id: '123' } });

console.log('\\n=== Form Actions ===');

async function createProductAction({ request }) {
  const formData = await request.formData();
  const product = {
    name: formData.get('name'),
    price: formData.get('price')
  };
  
  console.log('[Action] Creating product:', JSON.stringify(product));
  
  // Simulated API call
  console.log('[Action] Product created successfully');
  
  return { success: true, id: '456' };
}

console.log('\\nRoute with action:');
console.log('{');
console.log('  path: "/products/new",');
console.log('  element: <NewProduct />,');
console.log('  action: createProductAction');
console.log('}');

console.log('\\nComponent with Form:');
console.log('function NewProduct() {');
console.log('  const actionData = useActionData();');
console.log('  ');
console.log('  return (');
console.log('    <Form method="post">');
console.log('      <input name="name" />');
console.log('      <input name="price" />');
console.log('      <button type="submit">Create</button>');
console.log('      {actionData?.success && <p>Created!</p>}');
console.log('    </Form>');
console.log('  );');
console.log('}');

console.log('\\n=== Parallel Data Loading ===');

console.log('// Parent and child loaders run in parallel!');
console.log('');
console.log('Route: /dashboard/analytics');
console.log('  ├─ Dashboard loader (user data)');
console.log('  └─ Analytics loader (metrics)');
console.log('');
console.log('Both fetch simultaneously → faster page load');

console.log('\\n=== Error Boundaries Per Route ===');

console.log('function ErrorPage() {');
console.log('  const error = useRouteError();');
console.log('  ');
console.log('  if (error.status === 404) {');
console.log('    return <NotFound />;');
console.log('  }');
console.log('  ');
console.log('  return <GenericError error={error} />;');
console.log('}');

console.log('\\n✓ Loaders: fetch before render');
console.log('✓ Actions: handle form submissions');
console.log('✓ Error boundaries: per-route errors');`
    },
    {
        id: 'react-route-3',
        category: 'Routing',
        difficulty: 'Hard',
        question: 'URL State Management - Search Params and State',
        answer: `Important for **shareable URLs** and bookmarking.

### useSearchParams:
- Read/write query strings
- Preserve state in URL
- Shareable links
- Back button support

### URL State vs Component State:
**URL State (useSearchParams):**
- Filters, sorting, pagination
- Search queries
- Tab selection
- Modal state (sometimes)

**Component State (useState):**
- Form inputs (before submit)
- UI toggles (sidebar, dropdown)
- Temporary selections

### Best Practices:
- Serialize complex objects
- Validate params
- Provide defaults
- Update without navigation`,
        codeExample: `// URL State Management
console.log('=== useSearchParams ===');

function useSearchParams() {
  const params = new URLSearchParams('?sort=price&filter=electronics&page=2');
  
  const get = (key) => {
    const value = params.get(key);
    console.log('[SearchParams] Get', key + ':', value);
    return value;
  };
  
  const set = (updates) => {
    Object.entries(updates).forEach(([key, value]) => {
      params.set(key, value);
      console.log('[SearchParams] Set', key + ':', value);
    });
  };
  
  return [{ get }, set];
}

console.log('\\nCurrent URL: /products?sort=price&filter=electronics&page=2');

const [searchParams, setSearchParams] = useSearchParams();

console.log('\\nReading params:');
const sort = searchParams.get('sort');
const filter = searchParams.get('filter');
const page = searchParams.get('page');

console.log('\\nUpdating params:');
setSearchParams({ sort: 'name', page: '3' });
console.log('New URL: /products?sort=name&filter=electronics&page=3');

console.log('\\n=== Complex State in URL ===');

// Serialize/deserialize complex state
function useUrlState(key, defaultValue) {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const getValue = () => {
    const param = searchParams.get(key);
    if (!param) return defaultValue;
    
    try {
      const parsed = JSON.parse(decodeURIComponent(param));
      console.log('[UrlState] Parsed', key + ':', JSON.stringify(parsed));
      return parsed;
    } catch {
      return defaultValue;
    }
  };
  
  const setValue = (value) => {
    const encoded = encodeURIComponent(JSON.stringify(value));
    console.log('[UrlState] Encoding', key + ':', encoded);
    setSearchParams({ [key]: encoded });
  };
  
  return [getValue(), setValue];
}

console.log('\\nStoring filters in URL:');
const filters = { category: 'electronics', priceRange: [0, 1000], inStock: true };
const encoded = encodeURIComponent(JSON.stringify(filters));
console.log('Encoded:', encoded);
console.log('URL: /products?filters=' + encoded.slice(0, 40) + '...');

console.log('\\n=== Pagination with URL ===');

function usePagination() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  
  const goToPage = (newPage) => {
    console.log('[Pagination] Going to page:', newPage);
    setSearchParams({ page: newPage.toString() });
  };
  
  return { page, goToPage };
}

const { page, goToPage } = usePagination();
console.log('\\nCurrent page:', page);
goToPage(5);

console.log('\\n=== When to Use URL State ===');
console.log('✓ Filters and sorting');
console.log('✓ Search queries');
console.log('✓ Pagination');
console.log('✓ Tab selection (sometimes)');
console.log('');
console.log('✗ Form inputs (before submit)');
console.log('✗ Temporary UI state');
console.log('✗ Sensitive data');

console.log('\\n✓ URL state = shareable, bookmarkable');`
    },
    {
        id: 'react-route-4',
        category: 'Routing',
        difficulty: 'Expert',
        question: 'Client-Side Routing vs Server-Side - Trade-offs',
        answer: `Architecture decision asked at **senior interviews**.

### Client-Side Routing (SPA):
**How it works:**
- JavaScript handles routing
- No full page reload
- Fetch data via API

**Pros:**
- Instant navigation
- Smooth transitions
- App-like feel

**Cons:**
- Larger initial bundle
- SEO challenges (without SSR)
- Slower initial load

### Server-Side Routing (MPA):
**How it works:**
- Server renders each page
- Full page reload on navigation

**Pros:**
- Fast initial load
- Better SEO
- Simpler architecture

**Cons:**
- Full page reload
- No smooth transitions
- More server load

### Hybrid (Next.js):
- Server render initial page
- Client routing after hydration
- Best of both worlds`,
        codeExample: `// Client vs Server Routing
console.log('=== Client-Side Routing (SPA) ===');

console.log('Navigation flow:');
console.log('1. User clicks link');
console.log('2. JavaScript intercepts click');
console.log('3. Update URL with history.pushState()');
console.log('4. Fetch data via API');
console.log('5. Re-render component');
console.log('');
console.log('✓ No page reload');
console.log('✓ Instant navigation');
console.log('✗ Larger initial bundle');

console.log('\\n=== Server-Side Routing (MPA) ===');

console.log('Navigation flow:');
console.log('1. User clicks link');
console.log('2. Browser requests new page');
console.log('3. Server renders HTML');
console.log('4. Browser loads new page');
console.log('5. Full page reload');
console.log('');
console.log('✓ Fast initial load');
console.log('✓ Better SEO');
console.log('✗ Full page reload');

console.log('\\n=== Hybrid Approach (Next.js) ===');

console.log('Initial load:');
console.log('1. Server renders HTML');
console.log('2. Send to browser');
console.log('3. Hydrate with JavaScript');
console.log('');
console.log('Subsequent navigation:');
console.log('1. Client-side routing');
console.log('2. Prefetch on hover');
console.log('3. Instant navigation');
console.log('');
console.log('✓ Fast initial load (SSR)');
console.log('✓ Instant navigation (CSR)');
console.log('✓ Best SEO');

console.log('\\n=== Performance Comparison ===');

const metrics = {
  'Initial Load': {
    SPA: '2.5s (large bundle)',
    MPA: '0.8s (HTML only)',
    Hybrid: '1.0s (SSR + hydration)'
  },
  'Navigation': {
    SPA: '0.1s (instant)',
    MPA: '1.5s (full reload)',
    Hybrid: '0.1s (client routing)'
  },
  'SEO': {
    SPA: 'Poor (needs SSR)',
    MPA: 'Excellent',
    Hybrid: 'Excellent'
  }
};

console.log('\\nMetrics:');
Object.entries(metrics).forEach(([metric, values]) => {
  console.log('\\n' + metric + ':');
  Object.entries(values).forEach(([type, value]) => {
    console.log('  ' + type + ': ' + value);
  });
});

console.log('\\n=== When to Use Each ===');

console.log('\\nClient-Side (SPA):');
console.log('  • Web apps (dashboards, tools)');
console.log('  • Authenticated experiences');
console.log('  • Rich interactions');

console.log('\\nServer-Side (MPA):');
console.log('  • Content sites (blogs, docs)');
console.log('  • E-commerce (SEO critical)');
console.log('  • Simple sites');

console.log('\\nHybrid (Next.js/Remix):');
console.log('  • Best of both worlds');
console.log('  • Most modern apps');
console.log('  • SEO + UX both important');

console.log('\\n✓ Choose based on requirements');`
    }
];
