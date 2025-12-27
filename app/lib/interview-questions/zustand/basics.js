export const basicsQuestions = [
    {
        id: 'zustand-basic-1',
        category: 'Basics',
        difficulty: 'Easy',
        question: 'What is Zustand and how does it differ from Context API?',
        answer: `**Zustand** is a small, fast, and scalable bearbones state-management solution.
        
### Key Differences vs Context API:
1.  **Selectors**: Zustand allows you to select a slice of state. The component *only* re-renders if that specific slice changes. Context API triggers a re-render for *all* consumers whenever *any* part of the value changes.
2.  **No Provider**: Zustand stores are hooks. You don't need to wrap your app in a Provider tree.
3.  **Outside React**: You can access and update Zustand state outside of React components (e.g., in utility functions).
4.  **Boilerplate**: Zustand is minimal. Context often requires creating Context, Provider, and custom hooks.`,
        codeExample: `// 1. Create Store (No Provider needed)
import { create } from 'zustand';

const useStore = create((set) => ({
  bears: 0,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
}));

// 2. Use Hook (Selector prevents unnecessary renders)
function BearCounter() {
  // Only renders when 'bears' changes, not when other state changes
  const bears = useStore((state) => state.bears);
  return <h1>{bears} around here ...</h1>;
}`
    },
    {
        id: 'zustand-basic-2',
        category: 'Basics',
        difficulty: 'Medium',
        question: 'How do you update state in Zustand? Explain the "set" function.',
        answer: `State updates in Zustand are handled by the **set** function provided in the create callback.

### The "set" Function:
-   **Merges State**: It shallowly merges the new state with the existing state (like \`setState\` in class components). You don't need to spread \`...state\` for top-level properties.
-   **Callback Pattern**: \`set((state) => ({ count: state.count + 1 }))\`. Use this when the new state depends on the old state.
-   **Object Pattern**: \`set({ count: 10 })\`. Use this for setting static values.
-   **Replace Flag**: \`set({ count: 0 }, true)\`. Passing \`true\` as the second argument *replaces* the entire state object instead of merging.`,
        codeExample: `const useStore = create((set) => ({
  firstName: 'John',
  lastName: 'Doe',
  age: 30,

  // Shallow merge: lastName and age are preserved
  updateName: (name) => set({ firstName: name }),

  // Dependency on previous state
  birthday: () => set((state) => ({ age: state.age + 1 })),

  // Nuke everything and replace
  resetParams: () => set({ firstName: '', lastName: '', age: 0 }, true)
}));`
    },
    {
        id: 'zustand-basic-3',
        category: 'Basics',
        difficulty: 'Easy',
        question: 'How do you access state outside of React components?',
        answer: `One of Zustand's superpowers is that the store is not bound to the React tree. You can access it in vanilla JS functions, router guards, or API interceptors.

### API Methods:
-   **getState()**: Returns the current state object.
-   **setState(newState)**: Updates the state (same behavior as \`set\` inside the store).
-   **subscribe(listener)**: Listens for state changes.`,
        codeExample: `// store.js
export const useAuthStore = create((set) => ({
  token: null,
  setToken: (token) => set({ token })
}));

// api-client.js (Non-React file)
import { useAuthStore } from './store';

function fetchWithAuth(url) {
  // 1. Read state directly
  const token = useAuthStore.getState().token;

  return fetch(url, {
    headers: { Authorization: \`Bearer \${token}\` }
  });
}

// 2. Update state from outside
export function logout() {
  useAuthStore.setState({ token: null });
}`
    },
    {
        id: 'zustand-basic-4',
        category: 'Basics',
        difficulty: 'Medium',
        question: 'How do you handle async actions in Zustand?',
        answer: `In Zustand, **actions are just functions**. You don't need "thunks", "sagas", or any middleware for async logic.

### Pattern:
1.  Mark the action as \`async\`.
2.  Perform your \`await\` operations (fetch, etc.).
3.  Call \`set\` whenever you need to update the state (e.g., setting \`loading: true\` before fetching, and setting data after).`,
        codeExample: `const useStore = create((set, get) => ({
  data: null,
  loading: false,
  error: null,

  fetchData: async (id) => {
    // 1. Start loading
    set({ loading: true, error: null });

    try {
      const response = await fetch(\`/api/items/\${id}\`);
      const result = await response.json();
      
      // 2. Success: Update data
      set({ data: result, loading: false });
    } catch (err) {
      // 3. Error: Update error state
      set({ error: err.message, loading: false });
    }
  }
}));`
    },
    {
        id: 'zustand-basic-5',
        category: 'Basics',
        difficulty: 'Medium',
        question: 'What is the "Slice Pattern" in Zustand?',
        answer: `As your app grows, a single store file can become huge. The **Slice Pattern** lets you split your store into smaller, independent slices and merge them into one hook.

### How it works:
1.  Create separate functions (slices) that accept \`set\` and \`get\`.
2.  Combine them in the main \`create\` call using the spread operator.
3.  This keeps code organized by feature (AuthSlice, CartSlice, etc.).`,
        codeExample: `// bearSlice.js
const createBearSlice = (set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
});

// fishSlice.js
const createFishSlice = (set) => ({
  fishes: 0,
  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
});

// store.js
import { create } from 'zustand';

export const useBoundStore = create((...a) => ({
  ...createBearSlice(...a),
  ...createFishSlice(...a),
}));`
    }
];
