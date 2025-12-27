
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
    16: {
        day: 16,
        title: "Decorators",
        intro: "Metaprogramming in TypeScript. Decorators allow you to annotate and modify classes and members at design time.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Class Decorators</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Functions that receive the constructor of the class.
</p>
`,
        code: `// Day 16: Decorators

function Sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@Sealed
class BugReport {
  type = "report";
  title: string;
  constructor(t: string) {
    this.title = t;
  }
}`,
        labSteps: [
            {
                id: "ts-d16-lab",
                title: "Method Decorator",
                subtitle: "Logging",
                teacherNote: "Log every call.",
                bugCode: "// No logging",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "@LogMethod \n method() { ... }",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["Decorators wrap the original method."]
            }
        ]
    },
    17: {
        day: 17,
        title: "Mixins",
        intro: "Composition over inheritance. Mixins let you combine behavior from multiple classes into one.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The Pattern</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    A function that takes a class and returns a new class extending it.
</p>
`,
        code: `// Day 17: Mixins

type Constructor = new (...args: any[]) => {};

function Jumpable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    jump() {
      console.log("Jump!");
    }
  };
}

class Sprite {
  x = 0;
  y = 0;
}

const Player = Jumpable(Sprite);
const p = new Player();
p.jump();`,
        labSteps: [
            {
                id: "ts-d17-lab",
                title: "Multiple Mixins",
                subtitle: "Stacking behavior",
                teacherNote: "Combine Jumpable and Duckable.",
                bugCode: "const Player = Jumpable(Sprite); // Missing Duckable",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "const Player = Duckable(Jumpable(Sprite));",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["Mixins chain together."]
            }
        ]
    },
    18: {
        day: 18,
        title: "Declaration Files (.d.ts)",
        intro: "How to use JavaScript libraries in TypeScript. Writing your own type definitions for untyped code.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Ambient Context</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Use <code>declare</code> to tell TS about variables that exist at runtime (e.g., from a CDN script).
</p>
`,
        code: `// Day 18: Declarations

// global.d.ts
declare var MY_GLOBAL_CONFIG: {
  apiUrl: string;
};

// usage.ts
console.log(MY_GLOBAL_CONFIG.apiUrl); // No error`,
        labSteps: [
            {
                id: "ts-d18-lab",
                title: "Module Augmentation",
                subtitle: "Extending libraries",
                teacherNote: "Add a method to String prototype.",
                bugCode: "String.prototype.shout = ... // Error",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "declare global { interface String { shout(): string; } }",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["You must declare it before you define it."]
            }
        ]
    },
    19: {
        day: 19,
        title: "Publishing Packages",
        intro: "Preparing your TS code for NPM. Emitting declarations, source maps, and handling CommonJS vs ESM.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) tsconfig.json</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Ensure <code>declaration: true</code> is set so consumers get type hints.
</p>
`,
        code: `// Day 19: Publishing
// tsconfig.json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "declaration": true,
    "outDir": "./dist"
  }
}

// package.json
{
  "name": "my-lib",
  "main": "dist/index.js",
  "types": "dist/index.d.ts"
}`,
        labSteps: [
            {
                id: "ts-d19-lab",
                title: "Exports",
                subtitle: "Controlling visibility",
                teacherNote: "Don't export internal types.",
                bugCode: "export interface Internal { ... }",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "interface Internal { ... } // Not exported",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["Only export what the user needs."]
            }
        ]
    },
    20: {
        day: 20,
        title: "Monorepos & References",
        intro: "Managing large codebases. Project References allow you to split a TS project into smaller, faster-to-compile pieces.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Project References</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Use <code>references</code> in tsconfig to link projects.
</p>
`,
        code: `// Day 20: Architecture

// /packages/core/tsconfig.json
{
  "compilerOptions": { "composite": true }
}

// /packages/ui/tsconfig.json
{
  "references": [{ "path": "../core" }]
}`,
        labSteps: [
            {
                id: "ts-d20-lab",
                title: "Build Mode",
                subtitle: "tsc -b",
                teacherNote: "Use build mode for references.",
                bugCode: "tsc // Compiles only current folder",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "tsc -b // Builds all referenced projects",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["Incremental builds are much faster."]
            }
        ]
    }
};

// --- ZUSTAND CONTENT ---
const zustandContent = {
    16: {
        day: 16,
        title: "Atomic State",
        intro: "Breaking down complex state into atoms. Recoil-like patterns in Zustand.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Atoms</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Instead of one big object, use many small stores.
</p>
`,
        code: `// Day 16: Atomic
const useTextState = create(() => "hello");
const useCountState = create(() => 0);

function App() {
  const text = useTextState();
  const count = useCountState();
}`,
        labSteps: [
            {
                id: "zustand-d16-lab",
                title: "Composition",
                subtitle: "Combining atoms",
                teacherNote: "Create a derived hook.",
                bugCode: "// Manually calling both hooks everywhere",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "const useCombined = () => ({ text: useTextState(), count: useCountState() })",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["Compose hooks for cleaner API."]
            }
        ]
    },
    17: {
        day: 17,
        title: "Integrations",
        intro: "Using Zustand with Immer, React Query, and other libraries.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Immer Middleware</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Simplify nested updates.
</p>
`,
        code: `// Day 17: Immer
import { immer } from 'zustand/middleware/immer';

const useStore = create(
  immer((set) => ({
    nested: { obj: { count: 0 } },
    inc: () =>
      set((state) => {
        state.nested.obj.count += 1; // Mutation allowed!
      }),
  }))
);`,
        labSteps: [
            {
                id: "zustand-d17-lab",
                title: "React Query",
                subtitle: "Syncing server state",
                teacherNote: "Store query result in Zustand?",
                bugCode: "// Storing everything in Zustand",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "// Use React Query for cache, Zustand for filters/UI state",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["Don't duplicate server cache."]
            }
        ]
    },
    18: {
        day: 18,
        title: "State Machines",
        intro: "Implementing finite state machines (FSM) inside Zustand for predictable transitions.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Reducer Pattern</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    You can use a reducer inside Zustand to enforce transitions.
</p>
`,
        code: `// Day 18: FSM
const useStore = create((set) => ({
  status: 'idle',
  dispatch: (action) => set((state) => reducer(state, action)),
}));

function reducer(state, action) {
  switch (state.status) {
    case 'idle':
      if (action === 'FETCH') return { status: 'loading' };
      break;
    // ...
  }
  return state;
}`,
        labSteps: [
            {
                id: "zustand-d18-lab",
                title: "XState",
                subtitle: "Using XState",
                teacherNote: "Connect XState machine.",
                bugCode: "// Manual FSM is hard to maintain",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "// Use xstate middleware (community)",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["For complex logic, use a real FSM library."]
            }
        ]
    },
    19: {
        day: 19,
        title: "Performance",
        intro: "Profiling your store. Identifying unnecessary re-renders and optimizing selectors.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Profiler</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Use React DevTools Profiler to see which components render when state changes.
</p>
`,
        code: `// Day 19: Optimization
// Use transient updates for animations
// Use shallow for object selection
// Split stores for code splitting`,
        labSteps: [
            {
                id: "zustand-d19-lab",
                title: "Batched Updates",
                subtitle: "React 18",
                teacherNote: "React 18 batches automatically.",
                bugCode: "unstable_batchedUpdates(() => { set1(); set2(); })",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "set1(); set2(); // Auto-batched in React 18",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["No need for manual batching anymore."]
            }
        ]
    },
    20: {
        day: 20,
        title: "Enterprise Architecture",
        intro: "Structuring a large-scale application with Zustand. Folder structure, testing strategy, and best practices.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The Facade Pattern</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Hide the store behind a custom hook facade to decouple components from Zustand.
</p>
`,
        code: `// Day 20: Architecture

// internal store
const _useStore = create(...);

// public facade
export function useCounter() {
  const count = _useStore(s => s.count);
  const inc = _useStore(s => s.inc);
  return { count, inc };
}`,
        labSteps: [
            {
                id: "zustand-d20-lab",
                title: "Feature Folders",
                subtitle: "Colocation",
                teacherNote: "Keep store near usage.",
                bugCode: "/stores/allStores.js",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "/features/cart/cartStore.js",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["Scales better than a central folder."]
            }
        ]
    }
};

// --- REDUX CONTENT ---
const reduxContent = {
    16: {
        day: 16,
        title: "Code Splitting",
        intro: "Injecting reducers on the fly. Don't load the entire admin reducer for a guest user.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) replaceReducer</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    The store has a <code>replaceReducer</code> method. Use it to add new slices dynamically.
</p>
`,
        code: `// Day 16: Code Splitting

const store = configureStore({ reducer: staticReducers });

function injectReducer(key, asyncReducer) {
  store.asyncReducers[key] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
}`,
        labSteps: [
            {
                id: "redux-d16-lab",
                title: "Reducer Manager",
                subtitle: "Utility",
                teacherNote: "Use a manager to handle injection.",
                bugCode: "// Manual replacement is error prone",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "const manager = createReducerManager(initialReducers);",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["See Redux docs for full implementation."]
            }
        ]
    },
    17: {
        day: 17,
        title: "SSR with Redux",
        intro: "Hydrating state from the server. Next.js integration with next-redux-wrapper.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) HYDRATE Action</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    You need to handle a special HYDRATE action to merge server state into client state.
</p>
`,
        code: `// Day 17: SSR
import { HYDRATE } from 'next-redux-wrapper';

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload };
  }
  return combinedReducer(state, action);
};`,
        labSteps: [
            {
                id: "redux-d17-lab",
                title: "Server Actions",
                subtitle: "Dispatching on server",
                teacherNote: "Dispatch in getServerSideProps.",
                bugCode: "// Dispatching in component only",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "store.dispatch(fetchUser()); // In gSSP",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["Pre-fills the store before render."]
            }
        ]
    },
    18: {
        day: 18,
        title: "Websockets",
        intro: "Handling real-time data. Middleware is the perfect place to manage a socket connection.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Socket Middleware</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Connect on startup, dispatch actions on message.
</p>
`,
        code: `// Day 18: Sockets
const socketMiddleware = store => {
  let socket;
  return next => action => {
    if (action.type === 'WS_CONNECT') {
      socket = new WebSocket(action.payload);
      socket.onmessage = (msg) => store.dispatch({ type: 'WS_MSG', payload: msg.data });
    }
    return next(action);
  };
};`,
        labSteps: [
            {
                id: "redux-d18-lab",
                title: "Sending Messages",
                subtitle: "Dispatch to socket",
                teacherNote: "Intercept actions to send.",
                bugCode: "socket.send(action) // Inside component",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "if (action.type === 'WS_SEND') socket.send(action.payload);",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["Keep socket logic out of UI."]
            }
        ]
    },
    19: {
        day: 19,
        title: "Performance Tuning",
        intro: "Handling large datasets. Normalization, batching, and avoiding unnecessary renders.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Batching</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Redux notifies subscribers after every dispatch. Use <code>batch(() => { ... })</code> to group updates.
</p>
`,
        code: `// Day 19: Performance
import { batch } from 'react-redux';

function handleClick() {
  batch(() => {
    dispatch(increment());
    dispatch(increment());
  }); // Only 1 notify
}`,
        labSteps: [
            {
                id: "redux-d19-lab",
                title: "Shallow Equality",
                subtitle: "useSelector optimization",
                teacherNote: "Use shallowEqual for objects.",
                bugCode: "useSelector(s => ({ a: s.a, b: s.b })) // New object every time",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "useSelector(s => ({ a: s.a, b: s.b }), shallowEqual)",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["Prevents rerender if props haven't changed."]
            }
        ]
    },
    20: {
        day: 20,
        title: "Domain Driven Design",
        intro: "Structuring Redux for large teams. Feature-based slices, selectors, and types.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Feature Folders</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Group everything related to a feature (slice, selectors, thunks, components) in one folder.
    "Ducks" pattern or "Feature Slices".
</p>
`,
        code: `// Day 20: DDD
// /features/users/
//   - userSlice.ts
//   - userSelectors.ts
//   - userThunks.ts
//   - UserList.tsx`,
        labSteps: [
            {
                id: "redux-d20-lab",
                title: "Public API",
                subtitle: "index.ts",
                teacherNote: "Export only what is needed.",
                bugCode: "import { internalHelper } from './users/internal';",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "import { UserList } from './users';",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["Enforce boundaries with index files."]
            }
        ]
    }
};

// Execute
[16, 17, 18, 19, 20].forEach(day => {
    generateFile('typescript', day, tsContent[day]);
    generateFile('zustand', day, zustandContent[day]);
    generateFile('redux', day, reduxContent[day]);
});
