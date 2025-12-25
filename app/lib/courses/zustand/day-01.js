export const day01 = {
  day: 1,
  title: "Why Zustand? The Minimalist Mental Model",
  intro: "Redux is powerful but verbose. Context is built-in but rerenders everything. Zustand sits in the sweet spot: a tiny, hook-based store that scales.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The "Hook" Mental Model</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    In Redux, you wrap your app in a Provider. In Zustand, <strong>your store IS a hook</strong>.
    You create it once, and import it anywhere. No Context hell.
</p>

<div class="bg-gray-100 dark:bg-dark-900 p-5 rounded-xl border border-gray-200 dark:border-dark-600 mb-8">
  <pre class="text-sm text-gray-700 dark:text-light-200">
import { create } from 'zustand';

// 1. Create the store (it returns a hook)
const useStore = create((set) => ({
  bears: 0,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
}));

// 2. Use the hook
function BearCounter() {
  const bears = useStore((state) => state.bears);
  return &lt;h1&gt;{bears} bears&lt;/h1&gt;;
}
  </pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Zustand vs Context</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
    React Context is for <strong>Dependency Injection</strong>, not State Management.
    When Context changes, <strong>all consumers rerender</strong>, even if they only use a tiny part of the value.
    Zustand uses <strong>Selectors</strong> to subscribe only to what you need.
</p>

<div class="mb-8 p-5 rounded-xl border border-purple-500/30 bg-purple-500/5">
  <h4 class="font-bold text-purple-700 dark:text-purple-300 mb-3 flex items-center gap-2">
    <span class="text-xl">🏛️</span> Architect's Note
  </h4>
  <p class="text-sm text-gray-700 dark:text-light-200">
    <strong>Global State is a last resort.</strong>
    Before reaching for Zustand, ask: "Can this be local state?" or "Is this server state (React Query)?"
    Zustand is for client state that needs to be accessed by many disparate components (e.g., Sidebar open/close, User session, Shopping cart).
  </p>
</div>
`,
  predictions: [
    {
      prompt: "Does Zustand require a <Provider> wrapper?",
      options: ["Yes, always", "No, never", "Only for SSR", "Only for Class components"],
      correctIndex: 1,
      explanation: "Zustand stores are external singletons consumed via hooks. No Provider needed."
    }
  ],
  checkpoints: [
    {
      prompt: "True or False: Zustand causes rerenders in all components using the store when any state changes.",
      options: ["True", "False"],
      correctIndex: 1,
      explanation: "False! Zustand uses selectors. If you select `state.bears`, you only rerender when `bears` changes."
    }
  ],
  labSteps: [
    {
      id: "zustand-d1-lab",
      title: "Creating a Store",
      subtitle: "The 'set' function",
      teacherNote: "Notice how we pass a function to 'set' to update based on previous state.",
      bugCode: "const useStore = create((set) => ({ count: 0, inc: () => set({ count: count + 1 }) })); // Error: count is undefined",
      bugFocus: { fromLine: 1, toLine: 1 },
      fixCode: "const useStore = create((set) => ({ count: 0, inc: () => set((state) => ({ count: state.count + 1 })) }));",
      fixFocus: { fromLine: 1, toLine: 1 },
      whatToNotice: ["We must use the callback form of `set` to access current state."]
    }
  ],
  code: `// Day 1: Your First Store
import { create } from 'zustand';

// 1. Define the store
// set: function to update state
// get: function to read state (rarely used inside actions)
const useStore = create((set) => ({
  count: 0,
  text: "hello",
  
  // Action: Increment
  inc: () => set((state) => ({ count: state.count + 1 })),
  
  // Action: Set Text
  setText: (newText) => set({ text: newText }),
  
  // Action: Reset
  reset: () => set({ count: 0, text: "" })
}));

// Mock usage (normally inside a component)
const state = useStore.getState();
console.log("Initial:", state.count);

useStore.getState().inc();
console.log("After inc:", useStore.getState().count);`,
  interview: {
    questions: [
      {
        q: "Why is Zustand preferred over Context for complex state?",
        a: "Context causes re-renders in all consumers when the value changes. Zustand allows components to subscribe to specific slices of state, preventing unnecessary renders."
      },
      {
        q: "What is the 'set' function in Zustand?",
        a: "It's a function provided by the store creator that merges the new state into the existing state (shallow merge)."
      }
    ]
  },
  recap: {
    takeaways: [
      "Zustand = Hooks (No Provider).",
      "Selectors prevent rerenders.",
      "State is updated via `set` (shallow merge)."
    ]
  }
};
