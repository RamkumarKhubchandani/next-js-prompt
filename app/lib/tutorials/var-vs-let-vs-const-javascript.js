export const varVsLetVsConstJs = {
    title: "var vs let vs const: Scopes, Hoisting, and the Global Window Relationship",
    description: "An easy-to-understand developer's guide explaining the differences between var, let, and const in JavaScript, highlighting global window object assignments and hoisting.",
    slug: "var-vs-let-vs-const-javascript",
    category: "JavaScript",
    type: "static",
    author: "Ramkumar Khubchandani",
    createdAt: new Date().toISOString(),
    readTime: "18 min read",
    difficulty: "Beginner-to-Intermediate",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=1200",
    tags: ["JavaScript", "Variables", "Coding Basics", "Web Development"],
    keywords: ["var vs let vs const", "javascript global window object variables", "var window property binding", "let const block scope javascript", "temporal dead zone hoisting"],
    toc: [
        { id: "global-pollution-clash", label: "01. The Global Pollution Clash" },
        { id: "the-window-relationship", label: "02. The Window Object Relationship" },
        { id: "block-vs-function-scope", label: "03. Block Scope vs. Function Scope" },
        { id: "hoisting-tdz", label: "04. Hoisting and the Temporal Dead Zone" },
        { id: "mutability-const", label: "05. Mutability and Const Reassignment" },
        { id: "best-practices", label: "06. Scoping Best Practices" },
        { id: "faq", label: "07. Frequently Asked Questions" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. The Global Pollution Clash -->
        <section id="global-pollution-clash" class="scroll-mt-32">
             <div class="border-l-8 border-amber-600 bg-amber-50 dark:bg-amber-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    "I was reviewing a pull request where a globally declared var name = 'auth' broke our third-party map integration."
                </h1>
                <p class="text-xl md:text-2xl text-amber-800 dark:text-amber-200 font-light leading-relaxed">
                    The external API relied on a global window.name attribute, which our local code accidentally overwrote because of var's relationship with the global window object. That is when I decided to outline the differences between var, let, and const clearly.
                </p>
             </div>
             <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8 space-y-6">
                 <p>
                     Declaring variables is the first thing we learn in JavaScript. But the choice between <code>var</code>, <code>let</code>, and <code>const</code> goes beyond simple syntax preferences. It directly impacts memory leak vulnerabilities, scoping errors, and interactions with the global browser workspace.
                 </p>
                 <p>
                     This guide breaks down exactly how variables are scoped, how they interact with the browser's <code>window</code> object, and how hoisting can introduce silent runtime errors.
                 </p>
             </div>
        </section>

        <!-- 02. The Window Object Relationship -->
        <section id="the-window-relationship" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-amber-600 dark:text-amber-500">02.</span>
                The Window Object Relationship
            </h2>
            <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8 space-y-6">
                <p>
                    In browser environments, the global context is represented by the <code>window</code> object. 
                </p>
                <p>
                    When you declare a variable with <code>var</code> in the global scope (outside of any function), it is **automatically assigned as a property** on the <code>window</code> object.
                </p>
                
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-8">Global Var Binding</h3>
                <pre class="bg-gray-900 text-gray-100 p-6 rounded-2xl overflow-x-auto text-sm border border-white/10 shadow-xl">
<code>var message = "I am global!";

console.log(message); // "I am global!"
console.log(window.message); // "I am global!" (Bound to window)</code></pre>

                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-8">Global Let and Const Separation</h3>
                <p>
                    Global variables declared with <code>let</code> or <code>const</code> behave differently. They are globally scoped and accessible in your code, but they **do not** bind as properties on the <code>window</code> object:
                </p>
                <pre class="bg-gray-900 text-gray-100 p-6 rounded-2xl overflow-x-auto text-sm border border-white/10 shadow-xl">
<code>let testLet = "Active let";
const testConst = "Active const";

console.log(window.testLet); // undefined
console.log(window.testConst); // undefined</code></pre>
                <p>
                    This is a critical safety feature. Binding variables to the <code>window</code> object risks collision with other scripts, libraries, or global browser APIs.
                </p>
            </div>
        </section>

        <!-- 03. Block Scope vs. Function Scope -->
        <section id="block-vs-function-scope" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-amber-600 dark:text-amber-500">03.</span>
                Block Scope vs. Function Scope
            </h2>
            <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8 space-y-6">
                <p>
                    Variables declared with <code>var</code> are **function-scoped**. They ignore blocks like <code>if</code> blocks, <code>for</code> loops, or <code>switch</code> blocks, and leak into the surrounding scope.
                </p>
                <p>
                    Variables declared with <code>let</code> and <code>const</code> are **block-scoped**, meaning they are strictly bound to the block (demarcated by curly braces <code>{}</code>) where they are declared.
                </p>
                
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-8">Scoping Comparison Example</h3>
                <pre class="bg-gray-900 text-gray-100 p-6 rounded-2xl overflow-x-auto text-sm border border-white/10 shadow-xl">
<code>if (true) {
  var variableOne = "I am a var";
  let variableTwo = "I am a let";
}

console.log(variableOne); // "I am a var" (Leaked out of the block)
console.log(variableTwo); // ReferenceError: variableTwo is not defined</code></pre>
            </div>
        </section>

        <!-- 04. Hoisting and the Temporal Dead Zone -->
        <section id="hoisting-tdz" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-amber-600 dark:text-amber-500">04.</span>
                Hoisting and the Temporal Dead Zone
            </h2>
            <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8 space-y-6">
                <p>
                    In JavaScript, variable declarations are "hoisted" to the top of their scope during compilation.
                </p>
                <ul class="list-disc pl-6 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li><strong>var hoisting:</strong> <code>var</code> is hoisted and automatically initialized as <code>undefined</code>. You can reference it before the line it is declared on without a crash.</li>
                    <li><strong>let and const hoisting:</strong> These are hoisted but <strong>not</strong> initialized. They exist in a <strong>Temporal Dead Zone (TDZ)</strong> from the start of the block until the declaration line. Accessing them before initialization throws a <code>ReferenceError</code>.</li>
                </ul>
                
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-8">Hoisting Example</h3>
                <pre class="bg-gray-900 text-gray-100 p-6 rounded-2xl overflow-x-auto text-sm border border-white/10 shadow-xl">
<code>console.log(hoistedVar); // Outputs: undefined
var hoistedVar = "Success";

console.log(hoistedLet); // ReferenceError: Cannot access 'hoistedLet' before initialization
let hoistedLet = "Success";</code></pre>
            </div>
        </section>

        <!-- 05. Mutability and Const Reassignment -->
        <section id="mutability-const" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-amber-600 dark:text-amber-500">05.</span>
                Mutability and Const Reassignment
            </h2>
            <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8 space-y-6">
                <p>
                    Variables declared with <code>const</code> cannot be reassigned. However, the value of a <code>const</code> variable is not necessarily immutable.
                </p>
                <p>
                    If a <code>const</code> variable holds an object or an array, you can modify its properties or elements:
                </p>
                
                <pre class="bg-gray-900 text-gray-100 p-6 rounded-2xl overflow-x-auto text-sm border border-white/10 shadow-xl">
<code>const user = { name: "Ramkumar" };
user.name = "Khubchandani"; // Allowed: Modifying a property

console.log(user.name); // "Khubchandani"

// Throws TypeError: Assignment to constant variable.
user = { name: "Test" }; </code></pre>
            </div>
        </section>

        <!-- 06. Scoping Best Practices -->
        <section id="best-practices" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-amber-600 dark:text-amber-500">06.</span>
                Scoping Best Practices
            </h2>
            <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8 space-y-6">
                <p>
                    To write reliable, modern JavaScript:
                </p>
                <p>
                    Use <strong>const</strong> by default for variables that do not need to be reassigned.
                </p>
                <p>
                    Use <strong>let</strong> for loop counters or variables that require reassignment.
                </p>
                <p>
                    Avoid <strong>var</strong> entirely to prevent global window object pollution and bugs related to block leakage and hoisting.
                </p>
                <p>
                    To test your skills in managing JavaScript scope and variables, explore our [INTERNAL LINK: frontend coding challenges], or join our [INTERNAL LINK: React Masterclass learning path]. You can also book [INTERNAL LINK: 1:1 expert mentorship sessions] with our senior engineers to audit your application structure.
                </p>
            </div>
        </section>

        <!-- 07. FAQ -->
        <section id="faq" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-amber-600 dark:text-amber-500">07.</span>
                Frequently Asked Questions
            </h2>
            <div class="space-y-6">
                <div class="bg-gray-50 dark:bg-dark-800 p-6 rounded-2xl border border-gray-200 dark:border-dark-700">
                    <h4 class="font-bold text-lg mb-2 text-slate-900 dark:text-white">Why does var bind to the window object in browsers?</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">This behavior dates back to JavaScript's initial design, where all global declarations were treated as properties of the global object. When ES6 introduced let and const, they were designed to exist in a separate declarative environment record to prevent namespace pollution.</p>
                </div>
                <div class="bg-gray-50 dark:bg-dark-800 p-6 rounded-2xl border border-gray-200 dark:border-dark-700">
                    <h4 class="font-bold text-lg mb-2 text-slate-900 dark:text-white">Can you freeze a const object to make it immutable?</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Yes, you can use Object.freeze(obj). Once frozen, you cannot add, delete, or modify properties on the object.</p>
                </div>
                <div class="bg-gray-50 dark:bg-dark-800 p-6 rounded-2xl border border-gray-200 dark:border-dark-700">
                    <h4 class="font-bold text-lg mb-2 text-slate-900 dark:text-white">Are let and const hoisted?</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Yes, let and const are hoisted to the top of their block, but they are not initialized. They remain in the Temporal Dead Zone (TDZ) until execution reaches their declaration line, and accessing them before that throws a ReferenceError.</p>
                </div>
            </div>
        </section>
    </div>
    `
};
