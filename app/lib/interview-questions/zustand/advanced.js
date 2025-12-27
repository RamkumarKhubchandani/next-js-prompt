export const advancedQuestions = [
    {
        id: 'zustand-adv-1',
        category: 'Advanced Patterns',
        difficulty: 'Hard',
        question: 'How do you optimize rendering performance in Zustand? (Selectors & Shallow)',
        answer: `Zustand uses **strict equality (===)** by default to detect changes.

### 1. Atomic Selectors (Best Practice)
Select *only* what you need.
\`const bears = useStore(state => state.bears)\`
If \`bears\` doesn't change, the component won't re-render, even if \`fishes\` changes.

### 2. Object Return Problems
\`const { bears, fishes } = useStore(state => ({ bears: state.bears, fishes: state.fishes }))\`
❌ This causes a re-render on **every** store update because the returned object \`{...}\` is always a new reference.

### 3. Solution: useShallow
To return an object or array and only re-render if the *contents* changed, use \`useShallow\`.
\`const { bears, fishes } = useStore(useShallow(state => ({ bears: state.bears, fishes: state.fishes })))\`
`,
        codeExample: `import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

const useStore = create((set) => ({
  nested: { count: 0, text: 'hi' },
  inc: () => set(state => ({ nested: { ...state.nested, count: state.nested.count + 1 } }))
}));

function Component() {
  // ⚠️ BAD: Rerenders whenever ANYTHING in store changes because object ref is new
  // const { count, text } = useStore(state => state.nested);

  // ✅ GOOD: Rerenders only if count or text actually change values
  const { count, text } = useStore(
    useShallow(state => ({ 
      count: state.nested.count, 
      text: state.nested.text 
    }))
  );

  return <div>{count}</div>;
}`
    },
    {
        id: 'zustand-adv-2',
        category: 'Advanced Patterns',
        difficulty: 'Hard',
        question: 'How does the Persist middleware work and how do you handle hydration?',
        answer: `The \`persist\` middleware automatically saves your store to storage (localStorage by default).

### Hydration Issues
In SSR frameworks like Next.js, the server renders the initial HTML (default state) but the client hydrates from localStorage (persisted state). This mismatch causes **Hydration Errors**.

### Solutions:
1.  **skipHydration**: Use \`{ skipHydration: true }\` in options and manually call \`rehydrate()\` in \`useEffect\`.
2.  **Custom Hook**: Create a \`useHydratedStore\` hook that returns \`null\` or default state until the client has mounted.`,
        codeExample: `import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      bears: 0,
      addBear: () => set({ bears: 1 }),
    }),
    {
      name: 'food-storage', // unique name
      storage: createJSONStorage(() => sessionStorage), // default is localStorage
      partialize: (state) => ({ bears: state.bears }), // only persist 'bears'
    }
  )
);`
    },
    {
        id: 'zustand-adv-3',
        category: 'Advanced Patterns',
        difficulty: 'Expert',
        question: 'What are "Transient Updates" and when should you use them?',
        answer: `**Transient Updates** occur when state changes heavily (e.g., 60fps animation, scroll position, mouse movement) but you **don't** want to trigger React re-renders for every change.

### How to implement:
Instead of using the hook \`useStore(selector)\`, you use the explicit \`useStore.subscribe()\` method inside a \`useEffect\`. You then mutate the DOM directly via Refs.

### Use Cases:
-   Game loops
-   Parallax scrolling
-   Canvas drawing`,
        codeExample: `const useStore = create(() => ({ x: 0, y: 0 }));

function Scene() {
  const ref = useRef();

  useEffect(() => {
    // Subscribe to changes without re-rendering this component
    const unsub = useStore.subscribe((state) => {
      // Direct DOM mutation for performance
      ref.current.style.transform = \`translate(\${state.x}px, \${state.y}px)\`;
    });
    return unsub;
  }, []);

  return <div ref={ref} />;
}`
    },
    {
        id: 'zustand-adv-4',
        category: 'Advanced Patterns',
        difficulty: 'Medium',
        question: 'How do you test Zustand stores?',
        answer: `Since Zustand stores are global singletons, state persists between tests, which can cause flaky tests.

### Best Practice:
1.  **Mocking**: Create a fresh store instance for each test.
2.  **Context Injection**: Alternatively, create the store inside a Context (though rare for Zustand) to provide a fresh one per test.
3.  **Reset Method**: Export a method to reset the store to initial state and call it in \`beforeEach\`.`,
        codeExample: `// store.js
export const useStore = create((set) => ({
  count: 0,
  inc: () => set(s => ({ count: s.count + 1 })),
  reset: () => set({ count: 0 }) // For testing
}));

// store.test.js
import { renderHook, act } from '@testing-library/react';
import { useStore } from './store';

/* Reset before each test */
beforeEach(() => {
  const { result } = renderHook(() => useStore());
  act(() => result.current.reset());
});

test('should increment', () => {
  const { result } = renderHook(() => useStore());
  
  act(() => {
    result.current.inc();
  });

  expect(result.current.count).toBe(1);
});`
    },
    {
        id: 'zustand-adv-5',
        category: 'Advanced Patterns',
        difficulty: 'Hard',
        question: 'How do you handle nested object updates safely in Zustand with Immer?',
        answer: `By default, updating nested state in Zustand requires spreading every level: \`{ ...state, nested: { ...state.nested, count: 1 } }\`. This is verbose and error-prone.

**Immer middleware** lets you write "mutable" code that produces immutable updates safe for React implementation.

### Syntax:
Wrap your creator with \`immer\`. The \`set\` function now accepts a callback where you mutate the draft.`,
        codeExample: `import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const useStore = create(
  immer((set) => ({
    nested: { structure: { count: 0 } },
    
    // "Mutation" style (much cleaner)
    inc: () => set((state) => {
      state.nested.structure.count += 1;
    })
  }))
);`
    }
];
