export const day01 = {
  day: 1,
  title: "Redux Toolkit (RTK): The Modern Way",
  intro: "If you remember Redux as 'boilerplate hell', it's time to relearn. Redux Toolkit (RTK) is the official, opinionated, batteries-included toolset for efficient Redux development.",
  content: `
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
`,
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
  code: `// Day 1: Redux Toolkit Setup
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
console.log("After increment:", store.getState().counter.value);`,
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
