export const realInterviewQuestions = [
    {
        id: 'zustand-real-1',
        category: 'Real Interview Questions',
        difficulty: 'Medium',
        question: 'Why did you choose Zustand over Redux or Context in your last project?',
        answer: `**I chose Zustand because it sits in the perfect "Goldilocks" zone between Context and Redux.**

### Why NOT Context:
In my previous dashboard application, we had frequent updates (user mouse position, real-time widget data).
-   **Performance:** Context triggers a re-render in *every* consumer when the value changes. Optimizing this requires splitting Contexts into many small providers ("Context Hell").
-   **Complexity:** I didn't want to wrap the app in 10 layers of Providers.

### Why NOT Redux:
-   **Boilerplate:** Even with Redux Toolkit, there is overhead (slices, providers, store config).
-   **Overkill:** We didn't need time-travel debugging or strict architectural constraints for this specific feature set.

### Why Zustand:
-   **Atomic Selectors:** I could subscribe components to *specific* fields (\`state.items\`). If \`state.user\` changed, the items component didn't render. This solved our performance bottleneck immediately.
-   **Simplicity:** It felt like just using global variables but with React hooks. The learning curve for the junior devs was near zero.
-   **DevTools:** It still connects to Redux DevTools, so we didn't lose debuggability.`,
        codeExample: `// The "Aha!" moment code for our team
// No providers, just a hook. 

// store.ts
const useStore = create((set) => ({
  mouse: { x: 0, y: 0 },
  updateMouse: (x, y) => set({ mouse: { x, y } })
}));

// Component A (Renders on EVERY update)
const { x, y } = useStore(s => s.mouse);

// Component B (NEVER renders on mouse update)
const user = useUserStore(s => s.user);`
    },
    {
        id: 'zustand-real-2',
        category: 'Real Interview Questions',
        difficulty: 'Hard',
        question: 'How did you handle server state vs client state in your architecture?',
        answer: `**I strictly separate Server State (API data) and Client State (UI state).**

### The Architecture:
1.  **Server State (React Query / TanStack Query):**
    -   I used React Query for fetching, caching, and invalidating API data.
    -   *Why?* Zustand is synchronous. implementing caching, deduping, and loading states manually in Zustand is reinventing the wheel and error-prone.

2.  **Client State (Zustand):**
    -   I used Zustand strictly for *global UI state* that React Query doesn't handle.
    -   Examples:
        -   Is the Sidebar open?
        -   Current Theme (Dark/Light)
        -   Complex Multi-step Form Data (Draft state)
        -   Toast Notifications queue

### The "Bridge":
Sometimes UI state depends on Data. I usually keep them separate, but if I need to sync them, I do it inside the event handler, not a \`useEffect\`.

**Bad Pattern:** Fetch data -> \`useEffect\` -> \`setZustandStore\`.
**Good Pattern:** Fetch data -> Render directly. User clicks "Edit" -> \`setZustandStore(data)\` to initialize a draft.`,
        codeExample: `// Architecture Demo

// 1. React Query for Data
const { data: user } = useQuery(['user'], fetchUser);

// 2. Zustand for UI State
const isModalOpen = useStore(s => s.isModalOpen);
const setModalData = useStore(s => s.setModalData);

// 3. The Interaction
const onEditClick = () => {
  // Sync Server Data to Client State ONLY when needed (e.g., starting an edit)
  setModalData(user); 
  useStore.setState({ isModalOpen: true });
};`
    },
    {
        id: 'zustand-real-3',
        category: 'Real Interview Questions',
        difficulty: 'Expert',
        question: 'Can you explain a complex scenario where you had to use Zustand middleware?',
        answer: `**Yes, I built a custom middleware for "Undo/Redo" functionality and State Persistence.**

### The Scenario:
We were building a "Form Builder" where users could drag-and-drop fields. We needed:
1.  To save progress automatically (persist).
2.  To allow users to Undo their mistakes (temporal).

### The Implementation:
1.  **Chaining Middleware:** Zustand middleware composes nicely. I wrapped the store in \`temporal(persist(...))\`.
2.  **Zudo (or custom Temporal):** We used a temporal middleware that tracked the \`past\`, \`present\`, and \`future\` states.
3.  **Filtration:** We didn't want to undo *everything* (like UI tab selection), only the *form schema*. We used \`partialize\` in persist and an inclusion list in temporal.

### Creating Custom Middleware:
I also wrote a simple "logger" middleware for dev environments to trace state changes in the console, similar to \`redux-logger\`.`,
        codeExample: `// Custom Logger Middleware Implementation
const log = (config) => (set, get, api) => config(
  (args) => {
    console.log("  prev state", get());
    console.log("  action", args);
    set(args);
    console.log("  next state", get());
  },
  get,
  api
);

// Usage
const useStore = create(
  log(
    (set) => ({
      bears: 0,
      increase: () => set((state) => ({ bears: state.bears + 1 })),
    })
  )
);`
    },
    {
        id: 'zustand-real-4',
        category: 'Real Interview Questions',
        difficulty: 'Medium',
        question: 'How do you structure your store files in a large application?',
        answer: `**I avoid the "One Giant Store" anti-pattern.**

In Redux, a single store is required. In Zustand, multiple stores are allowed and encouraged.

### My Folder Structure:
\`/stores\`
  \`useAuthStore.ts\`       (User, Token, Permissions)
  \`useCartStore.ts\`       (Items, Total, Discount)
  \`useUISettings.ts\`      (Theme, Sidebar, Modals)

### Why this works:
1.  **Code Splitting:** If a page only needs \`useAuthStore\`, it doesn't bundle the logic for the shopping cart.
2.  **Mental Model:** It's easier to reason about "Auth Logic" in isolation.
3.  **Cross-Store Logic:** If I need to clear the Cart when the User logs out, I handle that in the \`logout\` action by importing the other store.

\`\`\`javascript
export const logout = () => {
   useAuthStore.getState().clearToken();
   useCartStore.getState().resetCart(); // Cross-store interaction
}
\`\`\``,
        codeExample: `// Example: Independent Atomic Stores

// 1. Auth Store (Critical, loaded early)
export const useAuthStore = create(...)

// 2. Settings Store (Lazy loaded potentially)
export const useSettingsStore = create(...)

// 3. Computed Store (Derived from others)
// Sometimes I create a hook that combines them
export const useDashboardInfo = () => {
  const user = useAuthStore(s => s.user);
  const theme = useSettingsStore(s => s.theme);
  
  return { welcomeMessage: \`Hello \${user.name}, enjoy \${theme} mode!\` };
}`
    },
    {
        id: 'zustand-real-5',
        category: 'Real Interview Questions',
        difficulty: 'Hard',
        question: 'What is the "stale closure" problem in React hooks and how does Zustand helper prevent it?',
        answer: `**Stale closures happen when a function "captures" an old variable value and never sees the updates.**

### The Problem:
If you use \`useEffect\` or an event listener and reference a state variable directly (e.g., from \`useState\`), the callback might be defined once and forever see the initial value \`0\`.

### Zustand's Solution:
Zustand's \`getState()\` is a function. Because it's a function reference that doesn't change, but *invoking* it returns the *current* value, it bypasses stale closures entirely.

Instead of capturing \`count\` (value), you capture \`useStore.getState\` (function). When the event fires, you call \`getState().count\`, getting the fresh value at that exact moment.`,
        codeExample: `// ❌ Broken (Stale Closure)
function BrokenComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      // 'count' is forever 0 here because the closure was created on mount
      console.log(count); 
    }, 1000);
    return () => clearInterval(timer);
  }, []); // Empty dependency array captures scope once
}

// ✅ Working (Zustand getState)
function WorkingComponent() {
  useEffect(() => {
    const timer = setInterval(() => {
      // Always gets freshness directly from the store
      const count = useStore.getState().count;
      console.log(count);
    }, 1000);
    return () => clearInterval(timer);
  }, []);
}`
    }
];
