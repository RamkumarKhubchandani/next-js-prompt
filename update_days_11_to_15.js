
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
    11: {
        day: 11,
        title: "Utility Types: The Basics",
        intro: "TypeScript ships with powerful utilities to transform types. Learn Partial, Pick, Omit, and Record to avoid repetition.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Partial & Required</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    <code>Partial&lt;T&gt;</code> makes all properties optional. <code>Required&lt;T&gt;</code> makes them all required.
</p>
`,
        code: `// Day 11: Utility Types

interface User {
  id: number;
  name: string;
  email: string;
}

// 1. Partial (Good for updates)
function updateUser(id: number, fields: Partial<User>) {
  // fields.name is string | undefined
}

// 2. Pick (Select subset)
type UserPreview = Pick<User, "id" | "name">;

// 3. Omit (Remove subset)
type UserInput = Omit<User, "id">;

// 4. Record (Map type)
type Roles = "admin" | "user" | "guest";
const permissions: Record<Roles, number> = {
  admin: 100,
  user: 10,
  guest: 1
};`,
        labSteps: [
            {
                id: "ts-d11-lab",
                title: "Readonly",
                subtitle: "Immutability",
                teacherNote: "Make the User immutable.",
                bugCode: "type ReadonlyUser = User; // Still mutable",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "type ReadonlyUser = Readonly<User>;",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["Now you cannot assign to any property."]
            }
        ]
    },
    12: {
        day: 12,
        title: "Advanced Utilities",
        intro: "Extracting types from functions. ReturnType and Parameters allow you to infer types from existing code.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) ReturnType</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Get the return type of a function type.
</p>
`,
        code: `// Day 12: Advanced Utilities

function createUser() {
  return { id: 1, name: "Alice", active: true };
}

// Extract return type
type User = ReturnType<typeof createUser>;

// Extract parameters
function move(x: number, y: number) {}
type MoveParams = Parameters<typeof move>; // [number, number]`,
        labSteps: [
            {
                id: "ts-d12-lab",
                title: "Promise Return",
                subtitle: "Async types",
                teacherNote: "Get the type INSIDE the Promise.",
                bugCode: "async function get() { return 1; } \ntype T = ReturnType<typeof get>; // Promise<number>",
                bugFocus: { fromLine: 2, toLine: 2 },
                fixCode: "type T = Awaited<ReturnType<typeof get>>;",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["Awaited unwraps the Promise."]
            }
        ]
    },
    13: {
        day: 13,
        title: "Mapped Types",
        intro: "Iterating over keys to create new types. The basis of many utility types.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Syntax</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    <code>{ [K in Keys]: Type }</code>
</p>
`,
        code: `// Day 13: Mapped Types

type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

interface FeatureFlags {
  darkMode: () => void;
  newUserProfile: () => void;
}

// Converts all properties to boolean
type FeatureOptions = OptionsFlags<FeatureFlags>;
// { darkMode: boolean; newUserProfile: boolean; }`,
        labSteps: [
            {
                id: "ts-d13-lab",
                title: "Modifiers",
                subtitle: "Removing readonly",
                teacherNote: "Strip 'readonly' from properties.",
                bugCode: "type Mutable<T> = { [P in keyof T]: T[P] }; // Keeps modifiers",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "type Mutable<T> = { -readonly [P in keyof T]: T[P] };",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["The '-' prefix removes the modifier."]
            }
        ]
    },
    14: {
        day: 14,
        title: "Conditional Types",
        intro: "Ternary operators for types. <code>T extends U ? X : Y</code>. This is where TS becomes a programming language.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The 'infer' keyword</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Used within conditional types to extract a type variable.
</p>
`,
        code: `// Day 14: Conditional Types

type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false

// Using infer to get array element type
type Flatten<T> = T extends Array<infer Item> ? Item : T;

type Str = Flatten<string[]>; // string
type Num = Flatten<number>; // number`,
        labSteps: [
            {
                id: "ts-d14-lab",
                title: "Extracting Args",
                subtitle: "Recreating Parameters<T>",
                teacherNote: "Use infer to get arguments.",
                bugCode: "type MyParams<T> = T extends (...args: any[]) => any ? args : never; // Error",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "type MyParams<T> = T extends (...args: infer P) => any ? P : never;",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["We infer P from the function signature."]
            }
        ]
    },
    15: {
        day: 15,
        title: "Template Literal Types",
        intro: "Manipulating string types. You can concatenate, capitalize, and pattern match strings at the type level.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) String Manipulation</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    TS can construct string types dynamically.
</p>
`,
        code: `// Day 15: Template Literals

type World = "world";
type Greeting = \`hello \${World}\`; // "hello world"

type Color = "red" | "blue";
type Quantity = "one" | "two";

type Item = \`\${Color}-\${Quantity}\`;
// "red-one" | "red-two" | "blue-one" | "blue-two"

// Key Remapping
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K]
};

interface Person {
  name: string;
  age: number;
}

type PersonGetters = Getters<Person>;
// { getName: () => string; getAge: () => number; }`,
        labSteps: [
            {
                id: "ts-d15-lab",
                title: "Event Names",
                subtitle: "Generating handlers",
                teacherNote: "Create 'onChanged' types.",
                bugCode: "type Handlers = { [K in keyof Props]: (val: Props[K]) => void }",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "type Handlers = { [K in keyof Props as \`on\${Capitalize<string & K>}Changed\`]: (val: Props[K]) => void }",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["Powerful for library authors."]
            }
        ]
    }
};

// --- ZUSTAND CONTENT ---
const zustandContent = {
    11: {
        day: 11,
        title: "Context vs Zustand",
        intro: "When should you actually use Context? We clarify the boundaries between Prop Drilling, Context, and Zustand.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The Rule</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Use Context for <strong>Dependency Injection</strong> (e.g., theming, localization) where updates are rare.
    Use Zustand for <strong>Application State</strong> (e.g., data, UI state) where updates are frequent.
</p>
`,
        code: `// Day 11: Comparison

// Context: Good for static/rare data
const ThemeContext = createContext('light');

// Zustand: Good for high-frequency updates
const useMousePosition = create((set) => ({
  x: 0, 
  y: 0,
  move: (x, y) => set({ x, y })
}));`,
        labSteps: [
            {
                id: "zustand-d11-lab",
                title: "Prop Drilling",
                subtitle: "Identifying the problem",
                teacherNote: "Refactor props to store.",
                bugCode: "<A user={user}><B user={user}><C user={user} /></B></A>",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "// In C:\nconst user = useStore(s => s.user);",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["Components become independent."]
            }
        ]
    },
    12: {
        day: 12,
        title: "SSR & Hydration",
        intro: "Using Zustand with Next.js. Handling the hydration mismatch error and ensuring server state matches client state.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The Mismatch Problem</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    If the server renders "0 bears" but localStorage has "5 bears", React will throw a hydration error.
</p>
`,
        code: `// Day 12: SSR
import { useState, useEffect } from 'react';

// Custom hook to safely hydrate
const useStore = create(...)

function useHydratedStore(selector) {
  const [hydrated, setHydrated] = useState(false);
  const result = useStore(selector);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated ? result : null;
}`,
        labSteps: [
            {
                id: "zustand-d12-lab",
                title: "Skip Hydration",
                subtitle: "Persist middleware option",
                teacherNote: "Prevent hydration on init.",
                bugCode: "persist(..., { name: 'store' }) // Hydrates immediately",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "persist(..., { name: 'store', skipHydration: true })",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["You must manually call rehydrate() later."]
            }
        ]
    },
    13: {
        day: 13,
        title: "Transient Updates",
        intro: "For high-performance needs (like animations), you don't want to re-render React components on every frame. Enter Transient Updates.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Direct Mutation</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Instead of binding state to the view, subscribe to changes and update the DOM directly (refs).
</p>
`,
        code: `// Day 13: Transient
const useStore = create(set => ({ count: 0, inc: ... }));

function Counter() {
  const ref = useRef(null);
  
  useEffect(() => {
    // Subscribe without re-rendering component
    return useStore.subscribe(state => {
      if (ref.current) {
        ref.current.innerText = state.count;
      }
    });
  }, []);

  return <div ref={ref} />;
}`,
        labSteps: [
            {
                id: "zustand-d13-lab",
                title: "Animation Loop",
                subtitle: "60fps updates",
                teacherNote: "Update store without React render.",
                bugCode: "const x = useStore(s => s.x); // Rerenders 60 times/sec",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "// Use subscribe inside useEffect as shown above",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["React is bypassed for the update."]
            }
        ]
    },
    14: {
        day: 14,
        title: "Subscribe & Side Effects",
        intro: "Reacting to state changes outside of components. Logging, analytics, or syncing with other libraries.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The subscribe method</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    <code>useStore.subscribe(selector, callback)</code> allows you to listen to specific changes.
</p>
`,
        code: `// Day 14: Subscribe

// Log whenever 'user' changes
const unsub = useStore.subscribe(
  (state) => state.user,
  (user, previousUser) => {
    console.log("User changed from", previousUser, "to", user);
    analytics.identify(user.id);
  }
);`,
        labSteps: [
            {
                id: "zustand-d14-lab",
                title: "Syncing Stores",
                subtitle: "Connecting two stores",
                teacherNote: "Update Store B when Store A changes.",
                bugCode: "// Manual sync in components",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "useStoreA.subscribe(s => s.token, token => useStoreB.setState({ token }))",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["Reactive glue code."]
            }
        ]
    },
    15: {
        day: 15,
        title: "Multiple vs Single Store",
        intro: "Redux enforces a single store. Zustand allows multiple. Which approach is better?",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The Atomic Approach</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Zustand encourages multiple small stores (e.g., <code>useAuthStore</code>, <code>useCartStore</code>, <code>useSettingsStore</code>).
    This improves code splitting and separation of concerns.
</p>
`,
        code: `// Day 15: Architecture

// Store 1: Auth (Critical, small)
const useAuthStore = create(...);

// Store 2: Dashboard (Large, lazy loaded)
const useDashboardStore = create(...);

// Combining them?
// Usually you don't need to. Just use both hooks.
function App() {
  const user = useAuthStore(s => s.user);
  const widgets = useDashboardStore(s => s.widgets);
}`,
        labSteps: [
            {
                id: "zustand-d15-lab",
                title: "Cross-Store Actions",
                subtitle: "Thunk pattern",
                teacherNote: "Action that affects both stores.",
                bugCode: "// Importing one store into another's creator (Circular dependency)",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "export const logout = () => { useAuthStore.getState().reset(); useDataStore.getState().clear(); }",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["Define complex actions outside the stores."]
            }
        ]
    }
};

// --- REDUX CONTENT ---
const reduxContent = {
    11: {
        day: 11,
        title: "Middleware",
        intro: "Redux middleware provides a third-party extension point between dispatching an action, and the moment it reaches the reducer.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Custom Middleware</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Useful for logging, crash reporting, or async logic (like Thunks/Sagas).
</p>
`,
        code: `// Day 11: Middleware

const loggerMiddleware = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(loggerMiddleware),
});`,
        labSteps: [
            {
                id: "redux-d11-lab",
                title: "Analytics",
                subtitle: "Tracking actions",
                teacherNote: "Send event on specific action.",
                bugCode: "// Checking action type string manually",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "if (action.type === 'user/login') { track('login'); }",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["Middleware sees every action."]
            }
        ]
    },
    12: {
        day: 12,
        title: "EntityAdapter",
        intro: "Managing normalized state (IDs and Entities) is common. EntityAdapter generates reducers and selectors for you.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Normalization</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Instead of arrays <code>[{ id: 1 }, { id: 2 }]</code>, use objects <code>{ ids: [1, 2], entities: { 1: {...}, 2: {...} } }</code>.
    This makes lookups O(1).
</p>
`,
        code: `// Day 12: EntityAdapter
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const usersAdapter = createEntityAdapter();

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(),
  reducers: {
    userAdded: usersAdapter.addOne,
    usersReceived: usersAdapter.setAll,
    userUpdated: usersAdapter.updateOne,
  },
});

export const { selectAll, selectById } = usersAdapter.getSelectors(state => state.users);`,
        labSteps: [
            {
                id: "redux-d12-lab",
                title: "Sorting",
                subtitle: "Sorted adapter",
                teacherNote: "Keep entities sorted by name.",
                bugCode: "createEntityAdapter() // No sort",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "createEntityAdapter({ sortComparer: (a, b) => a.name.localeCompare(b.name) })",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["selectAll will now return sorted array."]
            }
        ]
    },
    13: {
        day: 13,
        title: "Selectors & Reselect",
        intro: "Memoizing derived data. If you calculate expensive data in mapStateToProps or useSelector, you need Reselect.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) createSelector</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    RTK re-exports <code>createSelector</code> from the reselect library.
    It only re-calculates if input selectors change.
</p>
`,
        code: `// Day 13: Reselect
import { createSelector } from '@reduxjs/toolkit';

const selectItems = state => state.items;
const selectFilter = state => state.filter;

export const selectVisibleItems = createSelector(
  [selectItems, selectFilter],
  (items, filter) => {
    // Expensive filtering logic
    console.log("Filtering...");
    return items.filter(item => item.includes(filter));
  }
);`,
        labSteps: [
            {
                id: "redux-d13-lab",
                title: "Composition",
                subtitle: "Chaining selectors",
                teacherNote: "Use a selector as input to another.",
                bugCode: "// Duplicating logic",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "const selectCount = createSelector(selectVisibleItems, items => items.length);",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["Selectors are composable."]
            }
        ]
    },
    14: {
        day: 14,
        title: "Testing Logic",
        intro: "Testing reducers and selectors is easy because they are pure functions. Testing thunks requires mocking.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Testing Reducers</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Pass an initial state and an action, assert the new state.
</p>
`,
        code: `// Day 14: Testing
import reducer, { addTodo } from './todoSlice';

test('should handle initial state', () => {
  expect(reducer(undefined, { type: 'unknown' })).toEqual([]);
});

test('should handle addTodo', () => {
  const previousState = [];
  const nextState = reducer(previousState, addTodo('Run'));
  expect(nextState[0].text).toEqual('Run');
});`,
        labSteps: [
            {
                id: "redux-d14-lab",
                title: "Testing Selectors",
                subtitle: "Pure functions",
                teacherNote: "Test the selector logic.",
                bugCode: "// Testing component instead of selector",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "expect(selectVisibleItems({ items: ['a'], filter: 'a' })).toEqual(['a'])",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["Unit test business logic in isolation."]
            }
        ]
    },
    15: {
        day: 15,
        title: "Testing Components",
        intro: "Integration testing with Redux. You need to wrap your component in a Provider with a test store.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) renderWithProviders</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Create a custom render function that sets up the Redux store.
</p>
`,
        code: `// Day 15: Integration Test
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import UserProfile from './UserProfile';

function renderWithProviders(ui, { preloadedState } = {}) {
  const store = configureStore({ reducer: { user: userReducer }, preloadedState });
  return render(<Provider store={store}>{ui}</Provider>);
}

test('displays user name', () => {
  renderWithProviders(<UserProfile />, { preloadedState: { user: { name: 'Alice' } } });
  expect(screen.getByText('Alice')).toBeInTheDocument();
});`,
        labSteps: [
            {
                id: "redux-d15-lab",
                title: "Dispatching in Test",
                subtitle: "Interactions",
                teacherNote: "Fire an event and check store/UI.",
                bugCode: "// How to check if dispatch happened?",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "fireEvent.click(button); expect(screen.getByText('Updated')).toBeInTheDocument();",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["Test the user visible outcome, not the implementation details."]
            }
        ]
    }
};

// Execute
[11, 12, 13, 14, 15].forEach(day => {
    generateFile('typescript', day, tsContent[day]);
    generateFile('zustand', day, zustandContent[day]);
    generateFile('redux', day, reduxContent[day]);
});
