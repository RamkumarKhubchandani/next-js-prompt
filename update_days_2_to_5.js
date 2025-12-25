
const fs = require('fs');
const path = require('path');

const coursesDir = 'app/lib/courses';

const generateFile = (course, day, contentObj) => {
    const dir = path.join(coursesDir, course);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const filePath = path.join(dir, `day-${String(day).padStart(2, '0')}.js`);
    const fileContent = `export const day${String(day).padStart(2, '0')} = ${JSON.stringify(contentObj, null, 2)};`;
    fs.writeFileSync(filePath, fileContent);
    console.log(`Created ${filePath}`);
};

// --- TYPESCRIPT CONTENT ---
const tsContent = {
    2: {
        day: 2,
        title: "Basic Types & Type Inference",
        intro: "TypeScript is smart. You don't always need to tell it what type something is. Today we learn when to be explicit and when to let inference do the work.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Type Inference</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    TypeScript can deduce types. If you initialize a variable, TS knows its type.
    <strong>Rule of Thumb:</strong> Only annotate when TS cannot infer, or when you want to enforce a contract.
</p>
<div class="bg-gray-100 dark:bg-dark-900 p-5 rounded-xl border border-gray-200 dark:border-dark-600 mb-8">
  <pre class="text-sm text-gray-700 dark:text-light-200">
let x = 10; // TS knows x is number
// x = "hello"; // Error!

// Explicit annotation (often unnecessary here)
let y: number = 20; 
  </pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) The "any" type vs "unknown"</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
    <code>any</code> turns off type checking. <code>unknown</code> is the type-safe counterpart.
    Always prefer <code>unknown</code> if you don't know the type yet.
</p>
`,
        code: `// Day 2: Inference & Basic Types

// 1. Inference
let userName = "Alice"; // Inferred as string
// userName = 42; // Error

// 2. Arrays
let scores = [10, 20, 30]; // Inferred as number[]
scores.push(40);
// scores.push("50"); // Error

// 3. Objects
const user = {
  id: 1,
  name: "Bob"
}; // Inferred as { id: number; name: string }

// 4. Any vs Unknown
let loose: any = 4;
loose.toFixed(); // OK (but dangerous)

let safe: unknown = 4;
// safe.toFixed(); // Error: Object is of type 'unknown'.
if (typeof safe === 'number') {
  safe.toFixed(); // OK (Narrowed)
}`,
        labSteps: [
            {
                id: "ts-d2-lab",
                title: "Fixing 'any'",
                subtitle: "Refactor to use specific types",
                teacherNote: "Replace 'any' with the correct object shape.",
                bugCode: "function printCoord(pt: any) { console.log(pt.x, pt.y); }",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "function printCoord(pt: { x: number; y: number }) { console.log(pt.x, pt.y); }",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["We get autocomplete for .x and .y now."]
            }
        ]
    },
    3: {
        day: 3,
        title: "Interfaces vs Types",
        intro: "The age-old question: Interface or Type Alias? Today we settle it and explore how to define the shape of your data.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Interfaces</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Interfaces are strictly for defining <strong>object shapes</strong>. They support <strong>declaration merging</strong> (you can add to them later).
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Type Aliases</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Types are more flexible. They can define primitives, unions, intersections, and tuples.
    <code>type ID = string | number;</code>
</p>
`,
        code: `// Day 3: Interfaces vs Types

// 1. Interface (Open for extension)
interface User {
  name: string;
}
interface User {
  age: number;
}
const u: User = { name: "A", age: 10 }; // Merged!

// 2. Type (Closed)
type Point = {
  x: number;
  y: number;
};
// type Point = { z: number }; // Error: Duplicate identifier

// 3. Union Types (Only possible with 'type')
type Status = "loading" | "success" | "error";
`,
        labSteps: [
            {
                id: "ts-d3-lab",
                title: "Extending Types",
                subtitle: "Interface vs Intersection",
                teacherNote: "See how we extend definitions.",
                bugCode: "interface A { x: number } \n// How to make B have x AND y using type?",
                bugFocus: { fromLine: 1, toLine: 2 },
                fixCode: "type B = A & { y: number };",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["Intersection types (&) combine shapes."]
            }
        ]
    },
    4: {
        day: 4,
        title: "Functions & Call Signatures",
        intro: "Functions are first-class citizens. We learn how to type arguments, return values, and handle function overloading.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Typing Functions</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Explicitly type arguments. Return types are usually inferred, but explicit returns prevent accidental changes.
</p>
`,
        code: `// Day 4: Functions

// 1. Basic
function add(a: number, b: number): number {
  return a + b;
}

// 2. Optional Parameters
function greet(name: string, greeting?: string) {
  return \`\${greeting || 'Hello'}, \${name}\`;
}

// 3. Function Types
type MathOp = (x: number, y: number) => number;
const multiply: MathOp = (x, y) => x * y;
`,
        labSteps: [
            {
                id: "ts-d4-lab",
                title: "Optional Args",
                subtitle: "Handling undefined",
                teacherNote: "Make the last argument optional.",
                bugCode: "function f(a: number, b: number) {} f(1); // Error",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "function f(a: number, b?: number) {} f(1); // OK",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["The '?' makes it optional."]
            }
        ]
    },
    5: {
        day: 5,
        title: "Classes & Access Modifiers",
        intro: "TypeScript adds true OOP features to JS classes: public, private, protected, and readonly.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Access Modifiers</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Control who can see your properties. <code>private</code> is checked at compile time (and now runtime with #private).
</p>
`,
        code: `// Day 5: Classes

class Player {
  public name: string;
  private health: number;
  protected readonly maxHealth: number = 100;

  constructor(name: string) {
    this.name = name;
    this.health = 100;
  }

  takeDamage(amount: number) {
    this.health -= amount;
  }
}

const p = new Player("Hero");
p.name = "Hero 2"; // OK
// p.health = 0; // Error: private
// p.maxHealth = 200; // Error: readonly
`,
        labSteps: [
            {
                id: "ts-d5-lab",
                title: "Parameter Properties",
                subtitle: "Shorthand constructors",
                teacherNote: "Reduce boilerplate.",
                bugCode: "class C { x: number; constructor(x: number) { this.x = x; } }",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "class C { constructor(public x: number) {} }",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["It creates and assigns the property automatically."]
            }
        ]
    }
};

// --- ZUSTAND CONTENT ---
const zustandContent = {
    2: {
        day: 2,
        title: "Creating Your First Store",
        intro: "Let's build a real store. We'll look at the 'create' function, state initialization, and consuming it in components.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The Store Pattern</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Zustand stores are hooks. You don't need a provider.
    State and Actions live together.
</p>
`,
        code: `// Day 2: First Store
import { create } from 'zustand';

interface BearState {
  bears: number;
  increase: (by: number) => void;
}

const useStore = create<BearState>((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}));

// Component
function App() {
  const bears = useStore((state) => state.bears);
  const increase = useStore((state) => state.increase);
  
  return <button onClick={() => increase(1)}>{bears}</button>;
}`,
        labSteps: [
            {
                id: "zustand-d2-lab",
                title: "Adding Actions",
                subtitle: "Reset Action",
                teacherNote: "Add a reset function.",
                bugCode: "// Store has no reset\nconst useStore = create(set => ({ count: 0 }));",
                bugFocus: { fromLine: 1, toLine: 2 },
                fixCode: "const useStore = create(set => ({ count: 0, reset: () => set({ count: 0 }) }));",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["Actions are just functions in the store."]
            }
        ]
    },
    3: {
        day: 3,
        title: "Updating State: Actions",
        intro: "State updates in Zustand are immutable but simple. We explore the 'set' function and how to handle complex objects.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Shallow Merging</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    <code>set</code> merges your changes at the top level. For nested state, you need to spread or use Immer.
</p>
`,
        code: `// Day 3: Updates
const useStore = create((set) => ({
  user: { name: "John", age: 30 },
  
  // Shallow merge (works for top level)
  updateName: (name) => set((state) => ({ 
    user: { ...state.user, name } 
  })),
  
  // Wrong way (overwrites user object completely if not careful)
  // updateNameBad: (name) => set({ user: { name } }) // age is gone!
}));`,
        labSteps: [
            {
                id: "zustand-d3-lab",
                title: "Nested Updates",
                subtitle: "Spreading correctly",
                teacherNote: "Update 'city' without losing 'street'.",
                bugCode: "state = { address: { city: 'NY', street: '5th' } };\n// set({ address: { city: 'LA' } }) // Street is lost!",
                bugFocus: { fromLine: 2, toLine: 2 },
                fixCode: "set(state => ({ address: { ...state.address, city: 'LA' } }))",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["Always spread existing nested objects."]
            }
        ]
    },
    4: {
        day: 4,
        title: "Selecting State: Performance",
        intro: "The secret to Zustand's speed is Selectors. Learn how to subscribe to only the data you need to prevent unnecessary re-renders.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Auto-Selectors</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    By default, Zustand detects strict equality (===). If you return a new object, it will re-render.
</p>
`,
        code: `// Day 4: Selectors

// 1. Good: Primitive (Re-renders only if 'bears' changes)
const bears = useStore((state) => state.bears);

// 2. Bad: New Object (Re-renders EVERY time)
const { bears, fish } = useStore((state) => ({ 
  bears: state.bears, 
  fish: state.fish 
})); 

// 3. Fix for #2: shallow comparison
import { useShallow } from 'zustand/react/shallow';
const { bears, fish } = useStore(
  useShallow((state) => ({ bears: state.bears, fish: state.fish }))
);`,
        labSteps: [
            {
                id: "zustand-d4-lab",
                title: "Fixing Rerenders",
                subtitle: "Atomic Selection",
                teacherNote: "Select only what you need.",
                bugCode: "const state = useStore(); // Selects EVERYTHING",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "const count = useStore(s => s.count); // Selects only count",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["The component won't re-render if other state changes."]
            }
        ]
    },
    5: {
        day: 5,
        title: "Async Actions",
        intro: "Zustand doesn't need middleware for async. Just make your actions async!",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Async is Native</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Simply mark your function as <code>async</code> and <code>await</code> your fetch. Call <code>set</code> when done.
</p>
`,
        code: `// Day 5: Async
const useStore = create((set) => ({
  data: null,
  loading: false,
  error: null,
  
  fetchData: async () => {
    set({ loading: true });
    try {
      const res = await fetch('/api/data');
      const data = await res.json();
      set({ data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  }
}));`,
        labSteps: [
            {
                id: "zustand-d5-lab",
                title: "Async Flow",
                subtitle: "Loading states",
                teacherNote: "Ensure loading is set to true first.",
                bugCode: "fetch: async () => { const d = await get(); set({ data: d }); } // No loading state",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "fetch: async () => { set({ loading: true }); const d = await get(); set({ data: d, loading: false }); }",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["UI needs to know when we are loading."]
            }
        ]
    }
};

// --- REDUX CONTENT ---
const reduxContent = {
    2: {
        day: 2,
        title: "Slices: Reducers & Actions",
        intro: "The Slice is the heart of RTK. It combines the reducer and action creators into one concise file.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Anatomy of a Slice</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    <code>createSlice</code> takes a name, initial state, and a reducers object. It returns the reducer and auto-generated actions.
</p>
`,
        code: `// Day 2: Slices
import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({ id: Date.now(), text: action.payload, completed: false });
    },
    toggleTodo: (state, action) => {
      const todo = state.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    }
  }
});

export const { addTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;`,
        labSteps: [
            {
                id: "redux-d2-lab",
                title: "Payloads",
                subtitle: "Using action.payload",
                teacherNote: "Access the data passed to the action.",
                bugCode: "addTodo: (state, action) => { state.push(action); } // Pushes the whole action object!",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "addTodo: (state, action) => { state.push(action.payload); }",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["The data is always in .payload"]
            }
        ]
    },
    3: {
        day: 3,
        title: "Configuring the Store",
        intro: "Connecting your slices to the store. configureStore sets up the Redux DevTools and middleware automatically.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The Store Setup</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Import your slice reducers and pass them to <code>configureStore</code>.
</p>
`,
        code: `// Day 3: Store
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    user: userReducer
  }
});

// Types for TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;`,
        labSteps: [
            {
                id: "redux-d3-lab",
                title: "Adding Reducers",
                subtitle: "Combining reducers",
                teacherNote: "Add a new slice to the store.",
                bugCode: "reducer: todoReducer // Wrong if you have multiple",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "reducer: { todos: todoReducer, auth: authReducer }",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["The keys here determine the state shape."]
            }
        ]
    },
    4: {
        day: 4,
        title: "Hooks: useSelector & useDispatch",
        intro: "How to interact with the store from React components. Reading state and dispatching actions.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) useSelector</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Extract data from the Redux store state. It subscribes to the store and re-renders when the selected data changes.
</p>
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) useDispatch</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Returns the dispatch function to send actions to the store.
</p>
`,
        code: `// Day 4: Hooks
import { useSelector, useDispatch } from 'react-redux';
import { increment } from './counterSlice';

export function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(increment())}>
      {count}
    </button>
  );
}`,
        labSteps: [
            {
                id: "redux-d4-lab",
                title: "Dispatching",
                subtitle: "Triggering actions",
                teacherNote: "Don't forget to call the action creator.",
                bugCode: "dispatch(increment); // Wrong: passing function definition",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "dispatch(increment()); // Correct: passing action object",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["You must invoke the action creator."]
            }
        ]
    },
    5: {
        day: 5,
        title: "Immer & Immutability",
        intro: "Redux state must be immutable. RTK uses Immer to let you write 'mutating' logic that is safely converted.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The Magic of Immer</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    You can write <code>state.push()</code> or <code>state.x = 123</code> inside <code>createSlice</code>.
    Immer tracks these changes and produces a new immutable state.
</p>
`,
        code: `// Day 5: Immer
const slice = createSlice({
  name: 'test',
  initialState: { items: [] },
  reducers: {
    // Mutable syntax (OK in RTK)
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    // Immutable syntax (Classic Redux - also OK)
    addItemOld: (state, action) => {
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    }
  }
});`,
        labSteps: [
            {
                id: "redux-d5-lab",
                title: "Direct Mutation",
                subtitle: "Simplifying updates",
                teacherNote: "Use assignment instead of spread.",
                bugCode: "return { ...state, value: 123 };",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "state.value = 123;",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["Much cleaner code with Immer."]
            }
        ]
    }
};

// Execute
[2, 3, 4, 5].forEach(day => {
    generateFile('typescript', day, tsContent[day]);
    generateFile('zustand', day, zustandContent[day]);
    generateFile('redux', day, reduxContent[day]);
});
