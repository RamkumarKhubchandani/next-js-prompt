
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
    6: {
        day: 6,
        title: "Generics: The Power of Reusability",
        intro: "Generics allow you to write code that works with a variety of types rather than a single one. It's the key to reusable components.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) What are Generics?</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Think of generics as <strong>arguments for types</strong>.
    Just as a function takes arguments to produce a value, a generic type takes type arguments to produce a type.
</p>
`,
        code: `// Day 6: Generics

// 1. Generic Function
function identity<T>(arg: T): T {
  return arg;
}

const n = identity(10); // T is number
const s = identity("hello"); // T is string

// 2. Generic Interface
interface Box<T> {
  value: T;
}

const numberBox: Box<number> = { value: 42 };
const stringBox: Box<string> = { value: "gift" };`,
        labSteps: [
            {
                id: "ts-d6-lab",
                title: "Generic Array",
                subtitle: "Building a stack",
                teacherNote: "Make the class generic.",
                bugCode: "class Stack { items: any[] = []; push(item: any) { this.items.push(item); } }",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "class Stack<T> { items: T[] = []; push(item: T) { this.items.push(item); } }",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["Now we can have a Stack<number> that only accepts numbers."]
            }
        ]
    },
    7: {
        day: 7,
        title: "Advanced Generics & Constraints",
        intro: "Sometimes you want a generic, but not *any* type. Constraints let you limit what types can be passed to your generic.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The 'extends' keyword</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Use <code>extends</code> to enforce that a generic type must have certain properties.
</p>
`,
        code: `// Day 7: Constraints

// We want T to have a .length property
function logLength<T extends { length: number }>(arg: T) {
  console.log(arg.length);
}

logLength("hello"); // OK (string has length)
logLength([1, 2]); // OK (array has length)
// logLength(10); // Error (number has no length)

// keyof Constraint
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}`,
        labSteps: [
            {
                id: "ts-d7-lab",
                title: "Constraining Objects",
                subtitle: "Must have ID",
                teacherNote: "Ensure T has an id property.",
                bugCode: "function printId<T>(obj: T) { console.log(obj.id); } // Error: id not on T",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "function printId<T extends { id: number }>(obj: T) { console.log(obj.id); }",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["Now TS knows 'id' exists on 'obj'."]
            }
        ]
    },
    8: {
        day: 8,
        title: "Unions, Intersections & Narrowing",
        intro: "Modeling real-world data often requires combining types. Learn how to mix types and then safely pull them apart.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Narrowing</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    TypeScript understands control flow. If you check <code>typeof x === 'string'</code>, TS knows x is a string inside that block.
</p>
`,
        code: `// Day 8: Narrowing

function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    // padding is number here
    return " ".repeat(padding) + input;
  }
  // padding is string here
  return padding + input;
}

// Intersection
type Draggable = { drag: () => void };
type Resizable = { resize: () => void };
type UIElement = Draggable & Resizable;`,
        labSteps: [
            {
                id: "ts-d8-lab",
                title: "Truthiness Narrowing",
                subtitle: "Checking for null",
                teacherNote: "Handle the null case.",
                bugCode: "function print(s: string | null) { console.log(s.toUpperCase()); } // Error",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "function print(s: string | null) { if (s) { console.log(s.toUpperCase()); } }",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["The 'if (s)' check removes null from the type."]
            }
        ]
    },
    9: {
        day: 9,
        title: "Discriminated Unions",
        intro: "The single most important pattern in TypeScript. How to handle multiple related shapes safely using a common 'tag'.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The Pattern</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    1. Create interfaces with a common literal property (the "discriminant").
    2. Union them together.
    3. Switch on the discriminant.
</p>
`,
        code: `// Day 9: Discriminated Unions

interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2; // TS knows it's a Circle
    case "square":
      return shape.sideLength ** 2; // TS knows it's a Square
  }
}`,
        labSteps: [
            {
                id: "ts-d9-lab",
                title: "Adding a Shape",
                subtitle: "Exhaustiveness checking",
                teacherNote: "Add a Triangle and see if the switch handles it.",
                bugCode: "// Add Triangle to Shape, but forget to handle it in switch",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "case 'triangle': return 0.5 * shape.base * shape.height;",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["If you use 'never' checking, TS will warn you about missing cases."]
            }
        ]
    },
    10: {
        day: 10,
        title: "Type Guards & Assertion Functions",
        intro: "Sometimes you know more than TypeScript. Learn how to tell the compiler 'trust me, this is a string'.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) User-Defined Type Guards</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Functions that return <code>arg is Type</code>.
</p>
`,
        code: `// Day 10: Type Guards

interface Fish { swim: () => void }
interface Bird { fly: () => void }

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function move(pet: Fish | Bird) {
  if (isFish(pet)) {
    pet.swim(); // TS knows it's a Fish
  } else {
    pet.fly(); // TS knows it's a Bird
  }
}`,
        labSteps: [
            {
                id: "ts-d10-lab",
                title: "Assertion Functions",
                subtitle: "Throwing if wrong",
                teacherNote: "Write a function that asserts a condition.",
                bugCode: "function assertIsString(val: any) { if (typeof val !== 'string') throw new Error(); }",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "function assertIsString(val: any): asserts val is string { if (typeof val !== 'string') throw new Error(); }",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["The 'asserts' keyword tells TS that if this function returns, the type is confirmed."]
            }
        ]
    }
};

// --- ZUSTAND CONTENT ---
const zustandContent = {
    6: {
        day: 6,
        title: "Slices Pattern",
        intro: "As your app grows, one giant store file becomes unmanageable. Learn how to split your store into small, independent slices.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Creating Slices</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    A slice is just a function that returns a part of the state object.
    You merge them together in the main create function.
</p>
`,
        code: `// Day 6: Slices
import { create } from 'zustand';

// Slice 1
const createBearSlice = (set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
});

// Slice 2
const createFishSlice = (set) => ({
  fishes: 0,
  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
});

// Combine
const useStore = create((...a) => ({
  ...createBearSlice(...a),
  ...createFishSlice(...a),
}));`,
        labSteps: [
            {
                id: "zustand-d6-lab",
                title: "Shared State",
                subtitle: "Cross-slice interaction",
                teacherNote: "Update both slices at once.",
                bugCode: "// How to update bears AND fishes?",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "eatFish: () => set(state => ({ bears: state.bears + 1, fishes: state.fishes - 1 }))",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["Slices are merged, so 'set' has access to the whole state."]
            }
        ]
    },
    7: {
        day: 7,
        title: "Middleware: Persist & DevTools",
        intro: "Zustand has a powerful middleware system. We'll learn how to persist state to localStorage and connect to Redux DevTools.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Persist Middleware</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Automatically save your store to localStorage, sessionStorage, or AsyncStorage.
</p>
`,
        code: `// Day 7: Middleware
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

const useStore = create(
  devtools(
    persist(
      (set) => ({
        bears: 0,
        increase: () => set((state) => ({ bears: state.bears + 1 })),
      }),
      {
        name: 'bear-storage', // unique name
      }
    )
  )
);`,
        labSteps: [
            {
                id: "zustand-d7-lab",
                title: "Partial Persistence",
                subtitle: "Saving only some fields",
                teacherNote: "Don't save 'loading' state.",
                bugCode: "persist(..., { name: 'store' }) // Saves everything",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "persist(..., { name: 'store', partialize: (state) => ({ bears: state.bears }) })",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["Use 'partialize' to whitelist fields."]
            }
        ]
    },
    8: {
        day: 8,
        title: "Computed State",
        intro: "Deriving state from other state. Should you store it or calculate it? We explore the best patterns.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Derivation in Selector</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    The best way to handle computed state is to calculate it inside the selector.
</p>
`,
        code: `// Day 8: Computed
const useStore = create((set) => ({
  firstName: 'John',
  lastName: 'Doe',
}));

// Computed in component (Recommended)
const fullName = useStore((state) => \`\${state.firstName} \${state.lastName}\`);

// Computed in store (If complex)
const useStoreWithComputed = create((set, get) => ({
  firstName: 'John',
  lastName: 'Doe',
  get fullName() {
    return \`\${get().firstName} \${get().lastName}\`;
  }
}));`,
        labSteps: [
            {
                id: "zustand-d8-lab",
                title: "Memoized Selectors",
                subtitle: "Expensive calculations",
                teacherNote: "Use useCallback or useShallow if needed.",
                bugCode: "const expensive = useStore(s => s.items.filter(...)); // Runs on every render",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "const expensive = useStore(useShallow(s => s.items.filter(...)));",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["useShallow prevents rerenders if the result array content is the same."]
            }
        ]
    },
    9: {
        day: 9,
        title: "Zustand Outside React",
        intro: "Zustand stores are just vanilla JS objects. You can use them in utility functions, event listeners, or anywhere else.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) getState and setState</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Every hook created by <code>create</code> has <code>.getState()</code> and <code>.setState()</code> methods attached to it.
</p>
`,
        code: `// Day 9: Vanilla Usage
const useStore = create(() => ({ count: 0 }));

// 1. Read
const count = useStore.getState().count;

// 2. Write
useStore.setState({ count: 1 });

// 3. Subscribe
const unsub = useStore.subscribe((state) => {
  console.log("New count:", state.count);
});`,
        labSteps: [
            {
                id: "zustand-d9-lab",
                title: "Auth Token",
                subtitle: "Using store in API client",
                teacherNote: "Inject token from store into fetch.",
                bugCode: "// How to get token inside a non-React function?",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "const token = useAuthStore.getState().token;",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["Very useful for Axios interceptors."]
            }
        ]
    },
    10: {
        day: 10,
        title: "Testing Zustand",
        intro: "How to write unit tests for your store logic using Jest or Vitest. Mocking and resetting state between tests.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Resetting State</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Since stores are global singletons, state persists between tests. You must reset it.
</p>
`,
        code: `// Day 10: Testing
import { act, renderHook } from '@testing-library/react';
import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  inc: () => set((s) => ({ count: s.count + 1 })),
}));

test('should increment', () => {
  const { result } = renderHook(() => useStore());
  
  act(() => {
    result.current.inc();
  });
  
  expect(result.current.count).toBe(1);
});`,
        labSteps: [
            {
                id: "zustand-d10-lab",
                title: "Mocking",
                subtitle: "Creating a mock store",
                teacherNote: "Use a creator function for tests.",
                bugCode: "// Importing the global store directly in tests can be flaky",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "const createTestStore = () => create(...); // Create fresh store per test",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["Isolation is key for reliable tests."]
            }
        ]
    }
};

// --- REDUX CONTENT ---
const reduxContent = {
    6: {
        day: 6,
        title: "Async Thunks",
        intro: "Handling side effects in Redux. createAsyncThunk generates pending, fulfilled, and rejected actions for you.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) createAsyncThunk</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Accepts a type string and a payload creator function (usually an async fetch).
</p>
`,
        code: `// Day 6: Thunks
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// 1. Define Thunk
export const fetchUser = createAsyncThunk(
  'users/fetchById',
  async (userId, thunkAPI) => {
    const response = await fetch(\`/api/users/\${userId}\`);
    return response.json();
  }
);

// 2. Handle in Slice
const usersSlice = createSlice({
  name: 'users',
  initialState: { entities: [], loading: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.entities.push(action.payload);
    });
  },
});`,
        labSteps: [
            {
                id: "redux-d6-lab",
                title: "Error Handling",
                subtitle: "Catching rejections",
                teacherNote: "Handle the rejected case.",
                bugCode: "// Only handling fulfilled",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "builder.addCase(fetchUser.rejected, (state, action) => { state.error = action.error.message; })",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["Thunks automatically dispatch 'rejected' on error."]
            }
        ]
    },
    7: {
        day: 7,
        title: "Loading & Error States",
        intro: "Managing the lifecycle of an async request. Best practices for tracking loading status and displaying errors.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The Standard Pattern</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Use an enum or string union for status: <code>'idle' | 'loading' | 'succeeded' | 'failed'</code>.
</p>
`,
        code: `// Day 7: Async Lifecycle
const slice = createSlice({
  name: 'posts',
  initialState: {
    status: 'idle',
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});`,
        labSteps: [
            {
                id: "redux-d7-lab",
                title: "Resetting Status",
                subtitle: "Cleanup",
                teacherNote: "Add an action to reset error.",
                bugCode: "// Error persists forever",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "reducers: { resetError: (state) => { state.status = 'idle'; state.error = null; } }",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["Always provide a way to clear errors."]
            }
        ]
    },
    8: {
        day: 8,
        title: "RTK Query: Intro",
        intro: "Stop writing thunks for data fetching. RTK Query is a powerful data fetching and caching tool built into Redux Toolkit.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) What is RTK Query?</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    It's like React Query or Apollo, but for Redux. It handles caching, polling, invalidation, and deduplication.
</p>
`,
        code: `// Day 8: RTK Query Setup
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => \`pokemon/\${name}\`,
    }),
  }),
});

export const { useGetPokemonByNameQuery } = pokemonApi;`,
        labSteps: [
            {
                id: "redux-d8-lab",
                title: "Adding to Store",
                subtitle: "Middleware setup",
                teacherNote: "Don't forget the middleware!",
                bugCode: "reducer: { [api.reducerPath]: api.reducer } // Missing middleware",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "middleware: (gDM) => gDM().concat(api.middleware)",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["Middleware is required for caching and invalidation."]
            }
        ]
    },
    9: {
        day: 9,
        title: "RTK Query: Caching",
        intro: "Understanding how RTK Query caches data. Tags, invalidation, and cache lifetime.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) Tags</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Tags are labels attached to data. When you mutate data, you "invalidate" tags to force a refetch.
</p>
`,
        code: `// Day 9: Caching
export const api = createApi({
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: ['Post'],
    }),
    addPost: builder.mutation({
      query: (body) => ({
        url: '/posts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});`,
        labSteps: [
            {
                id: "redux-d9-lab",
                title: "Specific Tags",
                subtitle: "Granular invalidation",
                teacherNote: "Invalidate only specific ID.",
                bugCode: "providesTags: ['Post'] // Invalidates ALL posts",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "providesTags: (result) => result.map(({ id }) => ({ type: 'Post', id }))",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["This allows updating one item without refetching the whole list."]
            }
        ]
    },
    10: {
        day: 10,
        title: "RTK Query: Optimistic Updates",
        intro: "Make your app feel instant. Update the UI immediately before the server responds, and rollback if it fails.",
        content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) onQueryStarted</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
    Use this lifecycle method to manually update the cache.
</p>
`,
        code: `// Day 10: Optimistic UI
updatePost: builder.mutation({
  query: ({ id, ...patch }) => ({
    url: \`post/\${id}\`,
    method: 'PATCH',
    body: patch,
  }),
  async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
    const patchResult = dispatch(
      api.util.updateQueryData('getPost', id, (draft) => {
        Object.assign(draft, patch);
      })
    );
    try {
      await queryFulfilled;
    } catch {
      patchResult.undo();
    }
  },
}),`,
        labSteps: [
            {
                id: "redux-d10-lab",
                title: "Undo Patch",
                subtitle: "Rollback on error",
                teacherNote: "Ensure we undo if the request fails.",
                bugCode: "// No try/catch block around queryFulfilled",
                bugFocus: { fromLine: 1, toLine: 1 },
                fixCode: "catch { patchResult.undo(); }",
                fixFocus: { fromLine: 1, toLine: 1 },
                whatToNotice: ["Crucial for data consistency."]
            }
        ]
    }
};

// Execute
[6, 7, 8, 9, 10].forEach(day => {
    generateFile('typescript', day, tsContent[day]);
    generateFile('zustand', day, zustandContent[day]);
    generateFile('redux', day, reduxContent[day]);
});
