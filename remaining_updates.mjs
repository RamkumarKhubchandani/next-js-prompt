// This file documents all remaining examples that need demos added
// I'll update them manually in batches

const remainingUpdates = {
    'coding.js': [
        {
            id: 'js-32',
            current: 'console.log(typeof NaN); // "number"\\nconsole.log(NaN === NaN); // false (Unique property)',
            add: '\\n\\n// DEMO: NaN quirks\\nconsole.log("Is NaN a number?", typeof NaN); // "number"\\nconsole.log("NaN === NaN?", NaN === NaN); // false\\nconsole.log("How to check:", isNaN(NaN)); // true'
        },
        {
            id: 'js-77', // Flatten object
            pattern: 'function flattenObj',
            add: '\\n\\n// DEMO\\nconst obj = { a: 1, b: { c: 2, d: { e: 3 } } };\\nconsole.log("Original:", JSON.stringify(obj));\\nconsole.log("Flattened:", flattenObj(obj));\\n// { "a": 1, "b.c": 2, "b.d.e": 3 }'
        },
        {
            id: 'js-86', // Array mutation
            pattern: 'const arr = [1];',
            add: '\\n\\n// This example demonstrates the mutation - run it!'
        },
        {
            id: 'js-87', // Closure secret
            pattern: 'const secret = ',
            add: '\\n\\n// DEMO\\nconsole.log("Secret value:", secret.getValue()); // 42\\nconsole.log("Try to access _value:", secret._value); // undefined'
        },
        {
            id: 'js-98', // First unique char
            pattern: 'function firstUnique',
            add: '\\n\\n// DEMO\\nconsole.log(firstUnique("leetcode")); // "l"\\nconsole.log(firstUnique("loveleetcode")); // "v"\\nconsole.log(firstUnique("aabb")); // null'
        }
    ],
    'architecture.js': [
        {
            id: 'js-59', // Event Loop - already complete
            note: 'Already has full demo'
        },
        {
            id: 'js-60', // Hidden Classes
            pattern: 'const fast = { a: 1, b: 2 }',
            add: '\\n\\n// DEMO\\nconsole.log("Fast object:", fast);\\nconsole.log("Slow object:", slow);\\nconsole.log("Both work, but fast is optimized!");'
        },
        {
            id: 'js-64', // Service Worker
            pattern: 'self.addEventListener',
            add: '\\n\\n// This is Service Worker code - run in SW context'
        },
        {
            id: 'js-69', // Observer Pattern
            pattern: 'class EventEmitter',
            add: '\\n\\n// DEMO\\nconst emitter = new EventEmitter();\\nemitter.on("greet", (name) => console.log("Hello, " + name + "!"));\\nemitter.on("greet", (name) => console.log("Hi, " + name + "!"));\\nemitter.emit("greet", "Alice");'
        }
    ]
};

console.log('Remaining examples to update:', JSON.stringify(remainingUpdates, null, 2));
