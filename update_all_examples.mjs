import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsDir = path.join(__dirname, 'app', 'lib', 'interview-questions', 'javascript');

// Map of code patterns to their demo code
const demos = {
    // Memoize
    'function memoize(fn': `\n\n// DEMO\nconst slowFn = (n) => { console.log('Computing...'); return n * 2; };\nconst fast = memoize(slowFn, 2000);\n\nconsole.log('First call:', fast(5)); // Logs: "Computing..." then 10\nconsole.log('Second call (cached):', fast(5)); // Just logs: 10`,

    // Bind implementation
    'Function.prototype.myBind': `\n\n// DEMO\nconst person = { name: 'Alice' };\nfunction greet(greeting, punctuation) { \n  console.log(greeting + ', ' + this.name + punctuation); \n}\nconst boundGreet = greet.myBind(person, 'Hello');\nboundGreet('!'); // "Hello, Alice!"`,

    // Flatten object
    'function flattenObj(obj': `\n\n// DEMO\nconst obj = { a: 1, b: { c: 2, d: { e: 3 } } };\nconsole.log('Original:', JSON.stringify(obj));\nconsole.log('Flattened:', flattenObj(obj));\n// { 'a': 1, 'b.c': 2, 'b.d.e': 3 }`,

    // LRU Cache
    'class LRUCache {': `\n\n// DEMO\nconst cache = new LRUCache(2);\ncache.put(1, 'A');\ncache.put(2, 'B');\nconsole.log('Get 1:', cache.get(1)); // 'A'\ncache.put(3, 'C'); // Evicts key 2\nconsole.log('Get 2:', cache.get(2)); // null (evicted)\nconsole.log('Get 3:', cache.get(3)); // 'C'`,

    // Palindrome
    'function isPalindrome(str)': `\n\n// DEMO\nconsole.log('racecar:', isPalindrome('racecar')); // true\nconsole.log('hello:', isPalindrome('hello')); // false\nconsole.log('A man a plan:', isPalindrome('A man a plan a canal Panama')); // true`,

    // First unique character
    'function firstUnique(str)': `\n\n// DEMO\nconsole.log(firstUnique('leetcode')); // 'l'\nconsole.log(firstUnique('loveleetcode')); // 'v'\nconsole.log(firstUnique('aabb')); // null`,

    // Event Loop example
    "console.log('1. Script Start')": `\n\n// This example is already complete - just run it!`,

    // Var hoisting
    'for (var i = 0': `\n\n// This example demonstrates the issue - run it to see!`,

    // IIFE Module
    'const heavyModule = (function()': `\n\n// DEMO\nconsole.log('Public value:', heavyModule.publicValue);\nheavyModule.publicMethod(); // "Hello from private!"\n// console.log(heavyModule.privateValue); // undefined`,

    // typeof NaN
    'console.log(typeof NaN)': `\n\n// This example is already complete!`,

    // Hidden Classes
    'const fast = { a: 1, b: 2 }': `\n\n// DEMO - Run to see performance difference\nconsole.log('Fast object:', fast);\nconsole.log('Slow object:', slow);\nconsole.log('Both work, but "fast" is optimized by V8!');`,

    // Observer Pattern
    'class EventEmitter {': `\n\n// DEMO\nconst emitter = new EventEmitter();\nemitter.on('greet', (name) => console.log('Hello, ' + name + '!'));\nemitter.on('greet', (name) => console.log('Hi, ' + name + '!'));\nemitter.emit('greet', 'Alice');\n// Logs: "Hello, Alice!" and "Hi, Alice!"`,

    // Abort Controller
    'let currentController = null': `\n\n// DEMO\nconst controller = new AbortController();\nfetch('https://api.example.com/data', { signal: controller.signal })\n  .then(res => console.log('Success'))\n  .catch(err => console.log('Aborted:', err.name));\n  \ncontroller.abort(); // Cancels the request`,

    // Composition vs Inheritance
    'class Animal {}': `\n\n// DEMO\nconst dog = new Dog();\ndog.bark(); // "Woof!"\ndog.eat();  // "Eating..."\n\nconst robotDog = createRobotDog();\nrobotDog.bark(); // "Woof!"\nrobotDog.charge(); // "Charging..."`
};

function updateFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    for (const [pattern, demo] of Object.entries(demos)) {
        // Check if pattern exists and demo not already added
        if (content.includes(pattern) && !content.includes(demo.trim().slice(0, 20))) {
            // Find the codeExample containing this pattern
            const regex = new RegExp(`(codeExample: \`[^`]* ${ pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') }[^ `]*)\`(?!\\n\\n// DEMO)`, 'g');

            const newContent = content.replace(regex, `$1${demo}\``);
            if (newContent !== content) {
                content = newContent;
                modified = true;
                console.log(`✓ Added demo for: ${pattern.slice(0, 30)}...`);
            }
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        return true;
    }
    return false;
}

// Process all files
const files = ['basics.js', 'core.js', 'coding.js', 'architecture.js', 'expert.js'];
let totalUpdated = 0;

for (const file of files) {
    const filePath = path.join(jsDir, file);
    console.log(`\nProcessing ${file}...`);
    if (updateFile(filePath)) {
        totalUpdated++;
        console.log(`✅ Updated ${file}`);
    } else {
        console.log(`⏭️  No changes needed in ${file}`);
    }
}

console.log(`\n✅ Complete! Updated ${totalUpdated} files.`);
