
const fs = require('fs');
const path = require('path');

const coursesDir = 'app/lib/courses';

const tsDay1 = {
  day: 1,
  title: "Day 1: The TypeScript Mental Model & Compiler",
  intro: "TypeScript is not just 'Java for JavaScript'. It's a powerful static analysis tool that erases itself at runtime. Today we build the correct mental model: Structural Typing and Erasure.",
  content: \`
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The "Erasure" Mental Model</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    The most important thing to understand: <strong>TypeScript types do not exist at runtime.</strong>
    They are purely for the compiler. When you run your code, it's just JavaScript.
</p>

<div class="grid md:grid-cols-2 gap-6 mb-8">
  <div class="bg-white dark:bg-dark-800 p-5 rounded-xl border border-gray-200 dark:border-dark-600">
    <h4 class="font-bold text-brand-primary mb-2">TypeScript (Development)</h4>
    <pre class="text-xs text-gray-600 dark:text-light-300">
function add(a: number, b: number) {
  return a + b;
}
    </pre>
  </div>
  <div class="bg-white dark:bg-dark-800 p-5 rounded-xl border border-gray-200 dark:border-dark-600">
    <h4 class="font-bold text-brand-primary mb-2">JavaScript (Runtime)</h4>
    <pre class="text-xs text-gray-600 dark:text-light-300">
function add(a, b) {
  return a + b;
}
    </pre>
  </div>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Structural Typing (Duck Typing)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
    In Java/C#, types are "Nominal" (based on names). In TypeScript, types are "Structural" (based on shape).
    If it looks like a duck and quacks like a duck, it IS a duck.
</p>

<div class="bg-gray-100 dark:bg-dark-900 p-5 rounded-xl border border-gray-200 dark:border-dark-600 mb-8">
  <p class="text-sm text-gray-700 dark:text-light-200 mb-2">
    This is valid in TS, but invalid in Java:
  </p>
  <pre class="text-sm text-blue-600 dark:text-blue-400">
interface Point { x: number; y: number; }
interface Vector { x: number; y: number; }

const p: Point = { x: 1, y: 2 };
const v: Vector = p; // ✅ OK! Same shape.
  </pre>
</div>

<div class="mb-8 p-5 rounded-xl border border-purple-500/30 bg-purple-500/5">
  <h4 class="font-bold text-purple-700 dark:text-purple-300 mb-3 flex items-center gap-2">
    <span class="text-xl">🏛️</span> Architect's Note
  </h4>
  <p class="text-sm text-gray-700 dark:text-light-200">
    <strong>Strictness is a dial, not a switch.</strong>
    Always enable \`"strict": true\` in your \`tsconfig.json\`. 
    Without it, \`null\` and \`undefined\` are ignored, which defeats 50% of the purpose of using TS.
  </p>
</div>
\`,
  predictions: [
    {
      prompt: "What happens to interfaces when you compile TS to JS?",
      options: ["They become classes", "They become JSON objects", "They disappear completely", "They become runtime checks"],
      correctIndex: 2,
      explanation: "Interfaces are erased. They leave zero runtime footprint."
    }
  ],
  checkpoints: [
    {
      prompt: "True or False: TypeScript adds runtime validation for API responses.",
      options: ["True", "False"],
      correctIndex: 1,
      explanation: "False! You still need Zod or Yup to validate data at runtime. TS only checks code at compile time."
    }
  ],
  labSteps: [
    {
      id: "ts-d1-lab",
      title: "The 'any' Trap",
      subtitle: "Why 'noImplicitAny' matters",
      teacherNote: "Try removing the type annotation.",
      bugCode: "function fn(s) { console.log(s.substr(3)); } fn(42);",
      bugFocus: { fromLine: 1, toLine: 1 },
      fixCode: "function fn(s: string) { console.log(s.substr(3)); } // Error caught!",
      fixFocus: { fromLine: 1, toLine: 1 },
      whatToNotice: ["Without types, this crashes at runtime.", "With types, it fails at compile time."]
    }
  ],
  code: \`// Day 1: The Mental Model
// 1. Structural Typing
interface Dog {
  breed: string;
}
interface Cat {
  breed: string;
}

let myDog: Dog = { breed: "Labrador" };
let myCat: Cat = { breed: "Persian" };

// This works because they have the same SHAPE
myDog = myCat; 
console.log("TS is Structural:", myDog);

// 2. Erasure
// The interface below will vanish in the output
interface Config {
  apiKey: string;
}
const config: Config = { apiKey: "123" };
console.log("Config:", config);\`,
  interview: {
    questions: [
      {
        q: "What is Type Erasure?",
        a: "The process where all type annotations, interfaces, and type aliases are removed during compilation, leaving only standard JavaScript."
      },
      {
        q: "Explain Structural vs Nominal typing.",
        a: "Nominal typing relies on the name of the class/interface (Java). Structural typing relies on the shape/properties of the object (TypeScript)."
      }
    ]
  },
  recap: {
    takeaways: [
      "TS types disappear at runtime.",
      "TS uses Structural Typing (Duck Typing).",
      "Always use strict mode."
    ]
  }
};

const zustandDay1 = {
  day: 1,
  title: "Day 1: Why Zustand? The Minimalist Mental Model",
  intro: "Redux is powerful but verbose. Context is built-in but rerenders everything. Zustand sits in the sweet spot: a tiny, hook-based store that scales.",
  content: \`
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
\`,
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
  code: \`// Day 1: Your First Store
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
console.log("After inc:", useStore.getState().count);\`,
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

const reduxDay1 = {
  day: 1,
  title: "Day 1: Redux Toolkit (RTK) - The Modern Standard",
  intro: "If you remember Redux as 'boilerplate hell', it's time to relearn. Redux Toolkit (RTK) is the official, opinionated, batteries-included toolset for efficient Redux development.",
  content: \`
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Why Redux Toolkit?</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Classic Redux required manual setup: actions, action types, reducers, immutable logic, thunks, and devtools.
    <strong>RTK does all of this for you.</strong>
</p>

<div class="grid md:grid-cols-2 gap-6 mb-8">
  <div class="bg-red-50 dark:bg-red-900/20 p-5 rounded-xl border border-red-200 dark:border-red-500/30">
    <h4 class="font-bold text-red-700 dark:text-red-300 mb-2">Old Redux</h4>
    <ul class="list-disc list-inside text-xs text-gray-600 dark:text-light-300">
      <li>Manual action types ('ADD_TODO')</li>
      <li>Switch statements</li>
      <li>Manual immutability ({...state, x: 1})</li>
      <li>Separate file for actions/reducers</li>
    </ul>
  </div>
  <div class="bg-green-50 dark:bg-green-900/20 p-5 rounded-xl border border-green-200 dark:border-green-500/30">
    <h4 class="font-bold text-green-700 dark:text-green-300 mb-2">Redux Toolkit</h4>
    <ul class="list-disc list-inside text-xs text-gray-600 dark:text-light-300">
      <li>createSlice (auto-generates actions)</li>
      <li>No switch statements</li>
      <li>Immer built-in (state.x = 1)</li>
      <li>Single file logic</li>
    </ul>
  </div>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) The "Slice" Concept</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
    A <strong>Slice</strong> is a collection of Redux reducer logic and actions for a single feature of your app.
    It's the atomic unit of RTK.
</p>

<div class="mb-8 p-5 rounded-xl border border-purple-500/30 bg-purple-500/5">
  <h4 class="font-bold text-purple-700 dark:text-purple-300 mb-3 flex items-center gap-2">
    <span class="text-xl">🏛️</span> Architect's Note
  </h4>
  <p class="text-sm text-gray-700 dark:text-light-200">
    <strong>Single Source of Truth.</strong>
    Redux shines in complex apps where state needs to be debuggable, traceable, and predictable.
    Use Redux DevTools. If you aren't using the DevTools, you aren't getting the benefit of Redux.
  </p>
</div>
\`,
  predictions: [
    {
      prompt: "Does RTK allow mutable state updates?",
      options: ["Yes, it uses Immer under the hood", "No, never", "Only in development", "Only for numbers"],
      correctIndex: 0,
      explanation: "RTK uses Immer, which lets you write 'mutable' code (state.x = 1) that is safely converted to immutable updates."
    }
  ],
  checkpoints: [
    {
      prompt: "True or False: You still need to manually configure the Redux DevTools Extension with RTK.",
      options: ["True", "False"],
      correctIndex: 1,
      explanation: "False! `configureStore` enables DevTools automatically."
    }
  ],
  labSteps: [
    {
      id: "redux-d1-lab",
      title: "Creating a Slice",
      subtitle: "Auto-generated actions",
      teacherNote: "Check the console to see the action object.",
      bugCode: "// How do we get the action creator?\nconst slice = createSlice({ ... });\n// console.log(slice.???);",
      bugFocus: { fromLine: 1, toLine: 3 },
      fixCode: "const { actions, reducer } = slice;\nconsole.log(actions.increment()); // { type: 'counter/increment', payload: undefined }",
      fixFocus: { fromLine: 1, toLine: 2 },
      whatToNotice: ["createSlice generates the action creators for you based on the reducer names."]
    }
  ],
  code: \`// Day 1: Redux Toolkit Setup
import { configureStore, createSlice } from '@reduxjs/toolkit';

// 1. Create a Slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    // Immer lets us mutate state directly!
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// 2. Export Actions
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// 3. Configure Store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

// 4. Usage
console.log("Initial:", store.getState().counter.value);
store.dispatch(increment());
console.log("After increment:", store.getState().counter.value);\`,
  interview: {
    questions: [
      {
        q: "What is the difference between createStore and configureStore?",
        a: "createStore is the old Redux method. configureStore is the RTK method that sets up good defaults (DevTools, Thunk, Immer) automatically."
      },
      {
        q: "How does Immer work in Redux Toolkit?",
        a: "It uses Proxies to record changes to a draft state and then produces a new immutable state based on those changes."
      }
    ]
  },
  recap: {
    takeaways: [
      "RTK = Redux made easy.",
      "Slices bundle actions and reducers.",
      "Immer allows 'mutable' syntax."
    ]
  }
};

fs.writeFileSync(path.join(coursesDir, 'typescript/day-01.js'), \`export const day01 = \${JSON.stringify(tsDay1, null, 2)};\`);
fs.writeFileSync(path.join(coursesDir, 'zustand/day-01.js'), \`export const day01 = \${JSON.stringify(zustandDay1, null, 2)};\`);
fs.writeFileSync(path.join(coursesDir, 'redux/day-01.js'), \`export const day01 = \${JSON.stringify(reduxDay1, null, 2)};\`);

console.log("Updated Day 1 content for TypeScript, Zustand, and Redux.");
