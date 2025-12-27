import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsDir = path.join(__dirname, 'app', 'lib', 'interview-questions', 'javascript');

// Patterns to add demo code based on code content
const demoPatterns = [
    {
        // Debounce/Throttle functions
        match: /function (debounce|throttle)/,
        demo: `\n\n// DEMO\nlet count = 0;\nconst logCount = () => console.log('Count:', ++count);\nconst debouncedLog = debounce(logCount, 1000);\n\n// Simulate rapid calls\nfor (let i = 0; i < 5; i++) {\n  debouncedLog();\n}\nconsole.log('Called 5 times, but will log once after 1s');`
    },
    {
        // Promise.all implementation
        match: /function myAll\\(promises\\)/,
        demo: `\n\n// DEMO\nconst p1 = Promise.resolve(1);\nconst p2 = Promise.resolve(2);\nconst p3 = Promise.resolve(3);\n\nmyAll([p1, p2, p3]).then(results => {\n  console.log('All resolved:', results); // [1, 2, 3]\n});`
    },
    {
        // Flatten array
        match: /function flatten/,
        demo: `\n\n// DEMO\nconst nested = [1, [2, [3, [4, 5]]]];\nconsole.log('Flattened:', flatten(nested)); // [1, 2, 3, 4, 5]`
    },
    {
        // Memoize
        match: /function memoize/,
        demo: `\n\n// DEMO\nconst slowFn = (n) => { console.log('Computing...'); return n * 2; };\nconst fast = memoize(slowFn);\n\nconsole.log(fast(5)); // Logs: "Computing..." then 10\nconsole.log(fast(5)); // Cached! Just logs: 10`
    },
    {
        // Bind implementation
        match: /Function\\.prototype\\.myBind/,
        demo: `\n\n// DEMO\nconst person = { name: 'Alice' };\nfunction greet(greeting) { console.log(greeting + ', ' + this.name); }\nconst boundGreet = greet.myBind(person);\nboundGreet('Hello'); // "Hello, Alice"`
    },
    {
        // Flatten object
        match: /function flattenObj/,
        demo: `\n\n// DEMO\nconst obj = { a: 1, b: { c: 2, d: { e: 3 } } };\nconsole.log(flattenObj(obj));\n// { 'a': 1, 'b.c': 2, 'b.d.e': 3 }`
    },
    {
        // LRU Cache
        match: /class LRUCache/,
        demo: `\n\n// DEMO\nconst cache = new LRUCache(2);\ncache.put(1, 'A');\ncache.put(2, 'B');\nconsole.log('Get 1:', cache.get(1)); // 'A'\ncache.put(3, 'C'); // Evicts key 2\nconsole.log('Get 2:', cache.get(2)); // null (evicted)`
    },
    {
        // Palindrome
        match: /function isPalindrome/,
        demo: `\n\n// DEMO\nconsole.log(isPalindrome('racecar')); // true\nconsole.log(isPalindrome('hello')); // false`
    },
    {
        // First unique character
        match: /function firstUnique/,
        demo: `\n\n// DEMO\nconsole.log(firstUnique('leetcode')); // 'l'\nconsole.log(firstUnique('aabb')); // null`
    }
];

async function addDemoCode() {
    const files = ['basics.js', 'core.js', 'coding.js', 'architecture.js', 'expert.js', 'elite.js'];

    for (const file of files) {
        const filePath = path.join(jsDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        for (const pattern of demoPatterns) {
            // Find code examples matching the pattern
            const regex = new RegExp(`(codeExample: \`[^`]* ${ pattern.match.source }[^ `]*)\`(?!\\n\\n// DEMO)`, 'g');

            if (regex.test(content)) {
                content = content.replace(regex, `$1${pattern.demo}\``);
                modified = true;
                console.log(`✓ Added demo to ${file} for pattern: ${pattern.match}`);
            }
        }

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Updated ${file}`);
        }
    }

    console.log('\\n✅ All files processed!');
}

addDemoCode().catch(console.error);
