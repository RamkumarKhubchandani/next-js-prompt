export const jsArrayCrudOperations = {
    title: "JavaScript Array CRUD Operations and Methods: A Practical Guide to Push, Pop, Shift, Unshift, Slice, and Splice",
    description: "Learn how to perform complete CRUD (Create, Read, Update, Delete) operations on JavaScript arrays, featuring examples of push, pop, shift, unshift, slice, splice, and interactive homework challenges.",
    slug: "javascript-array-crud-operations-methods-push-pop-slice-splice",
    category: "JavaScript",
    type: "static",
    author: "Ramkumar Khubchandani",
    createdAt: new Date().toISOString(),
    readTime: "20 min read",
    difficulty: "Beginner-to-Intermediate",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200",
    tags: ["JavaScript", "Arrays", "Programming Basics", "Coding Challenges"],
    keywords: ["JavaScript Array CRUD", "array methods push pop shift unshift", "slice vs splice javascript", "immutability in javascript arrays", "javascript-array-crud-operations-methods-push-pop-slice-splice"],
    toc: [
        { id: "cart-leak-reality", label: "01. The Mutation Trap" },
        { id: "array-crud-creation", label: "02. Create: Inserting Elements (push, unshift)" },
        { id: "array-crud-reading", label: "03. Read: Copying and Selecting (slice)" },
        { id: "array-crud-updating", label: "04. Update: Modifying Elements (splice)" },
        { id: "array-crud-deleting", label: "05. Delete: Removing Elements (pop, shift, splice)" },
        { id: "immutability-best-practices", label: "06. Immutable CRUD in Modern Frameworks" },
        { id: "homework-assignments", label: "07. Interactive Homework Challenges" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. The Mutation Trap -->
        <section id="cart-leak-reality" class="scroll-mt-32">
             <div class="border-l-8 border-violet-600 bg-violet-50 dark:bg-violet-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    "I was interviewing a candidate for a senior frontend role last week."
                 </h1>
                 <p class="text-xl md:text-2xl text-violet-800 dark:text-violet-200 font-light leading-relaxed">
                    I asked them to update a user's address inside an array of profiles without mutating the original state. They immediately reached for splice, mutating the state array directly and causing React to ignore the update. That is when I realized that developers still struggle with mutating vs non-mutating array methods.
                 </p>
             </div>
             <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8 space-y-6">
                 <p>
                     Arrays are the most versatile data structure in JavaScript. When working with them, you constantly perform **CRUD** operations: Creating new elements, Reading items, Updating values, and Deleting records.
                 </p>
                 <p>
                     However, many built-in JavaScript array methods mutate (modify) the original array directly. In modern, component-driven frameworks like React, mutating state directly breaks reference checking, causing components to skip re-rendering.
                 </p>
                 <p>
                     This guide details both mutating and non-mutating array methods, showing you how to perform clean CRUD operations in vanilla JavaScript and modern frameworks.
                 </p>
             </div>
        </section>

        <!-- 02. Create: Inserting Elements -->
        <section id="array-crud-creation" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-violet-600 dark:text-violet-500">02.</span>
                Create: Inserting Elements (push, unshift)
            </h2>
            <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8 space-y-6">
                <p>
                    Adding new elements to an array depends on whether you want to insert them at the beginning or the end:
                </p>
                <ul class="list-disc pl-6 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li><strong><code>push()</code> (Mutating):</strong> Adds one or more elements to the end of the array and returns the new array length.</li>
                    <li><strong><code>unshift()</code> (Mutating):</strong> Adds one or more elements to the beginning of the array and returns the new array length.</li>
                </ul>

                <pre class="bg-gray-900 text-gray-100 p-6 rounded-2xl overflow-x-auto text-sm border border-white/10 shadow-xl">
<code>const fruits = ["Banana", "Cherry"];

// 1. Add to the end (Create / push)
fruits.push("Date");
console.log(fruits); // ["Banana", "Cherry", "Date"]

// 2. Add to the beginning (Create / unshift)
fruits.unshift("Apple");
console.log(fruits); // ["Apple", "Banana", "Cherry", "Date"]</code></pre>
            </div>
        </section>

        <!-- 03. Read: Copying and Selecting -->
        <section id="array-crud-reading" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-violet-600 dark:text-violet-500">03.</span>
                Read: Copying and Selecting (slice)
            </h2>
            <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8 space-y-6">
                <p>
                    Reading elements can be done by index, or you can extract a segment of an array using the non-mutating <code>slice()</code> method:
                </p>
                <p>
                    <strong><code>slice(start, end)</code> (Non-Mutating):</strong> Returns a shallow copy of a portion of an array. The original array remains completely unchanged.
                </p>

                <pre class="bg-gray-900 text-gray-100 p-6 rounded-2xl overflow-x-auto text-sm border border-white/10 shadow-xl">
<code>const plants = ["Fern", "Ivy", "Oak", "Pine"];

// Extract indices 1 and 2 (end index is non-inclusive)
const partialPlants = plants.slice(1, 3);

console.log(partialPlants); // ["Ivy", "Oak"]
console.log(plants); // ["Fern", "Ivy", "Oak", "Pine"] (Unchanged!)</code></pre>
            </div>
        </section>

        <!-- 04. Update: Modifying Elements -->
        <section id="array-crud-updating" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-violet-600 dark:text-violet-500">04.</span>
                Update: Modifying Elements (splice)
            </h2>
            <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8 space-y-6">
                <p>
                    Updating array items at specific indices can be achieved using direct assignment or the mutating <code>splice()</code> method.
                </p>
                <p>
                    <strong><code>splice(start, deleteCount, item1, item2, ...)</code> (Mutating):</strong> Modifies the contents of an array by removing or replacing existing elements and/or adding new elements in place.
                </p>

                <pre class="bg-gray-900 text-gray-100 p-6 rounded-2xl overflow-x-auto text-sm border border-white/10 shadow-xl">
<code>const tools = ["Hammer", "Screwdriver", "Wrench"];

// Replace "Screwdriver" (index 1) with "Drill"
// splice returns the removed elements
const removed = tools.splice(1, 1, "Drill");

console.log(tools); // ["Hammer", "Drill", "Wrench"]
console.log(removed); // ["Screwdriver"]</code></pre>
            </div>
        </section>

        <!-- 05. Delete: Removing Elements -->
        <section id="array-crud-deleting" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-violet-600 dark:text-violet-500">05.</span>
                Delete: Removing Elements (pop, shift, splice)
            </h2>
            <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8 space-y-6">
                <p>
                    Removing elements from an array varies by position:
                </p>
                <ul class="list-disc pl-6 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li><strong><code>pop()</code> (Mutating):</strong> Removes the last element of the array and returns that element.</li>
                    <li><strong><code>shift()</code> (Mutating):</strong> Removes the first element of the array and returns that element.</li>
                    <li><strong><code>splice()</code> (Mutating):</strong> Removes elements from any index you specify.</li>
                </ul>

                <pre class="bg-gray-900 text-gray-100 p-6 rounded-2xl overflow-x-auto text-sm border border-white/10 shadow-xl">
<code>const animals = ["Lion", "Tiger", "Bear", "Wolf"];

// 1. Remove from the end (pop)
animals.pop(); // Returns "Wolf"
console.log(animals); // ["Lion", "Tiger", "Bear"]

// 2. Remove from the beginning (shift)
animals.shift(); // Returns "Lion"
console.log(animals); // ["Tiger", "Bear"]

// 3. Remove from middle index 1
animals.splice(1, 1); // Removes "Bear"
console.log(animals); // ["Tiger"]</code></pre>
            </div>
        </section>

        <!-- 06. Immutable CRUD in Modern Frameworks -->
        <section id="immutability-best-practices" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-violet-600 dark:text-violet-500">06.</span>
                Immutable CRUD: Best Practices for Component State
            </h2>
            <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8 space-y-6">
                <p>
                    In frameworks like React or Vue, mutating state directly prevents components from re-rendering because their reference pointers remain unchanged.
                </p>
                <p>
                    To update state safely, use the **spread operator** (<code>[...]</code>) to clone the array before performing updates:
                </p>

                <pre class="bg-gray-900 text-gray-100 p-6 rounded-2xl overflow-x-auto text-sm border border-white/10 shadow-xl">
<code>const originalCart = ["Shirt", "Shoes"];

// Secure, non-mutating update (Create)
const updatedCart = [...originalCart, "Hat"];

console.log(originalCart); // ["Shirt", "Shoes"] (Safe)
console.log(updatedCart); // ["Shirt", "Shoes", "Hat"]</code></pre>
            </div>
        </section>

        <!-- 07. Interactive Homework Challenges -->
        <section id="homework-assignments" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-violet-600 dark:text-violet-500">07.</span>
                Interactive Homework Challenges
            </h2>
            <div class="space-y-8">
                <p class="text-lg text-gray-700 dark:text-gray-300">
                    To practice these concepts, complete the programming exercises below. Copy the code into your browser's console or a Node.js runtime and write the missing logic:
                </p>

                <!-- Exercise 1 -->
                <div class="bg-gray-50 dark:bg-dark-800 p-8 rounded-2xl border border-gray-200 dark:border-dark-700 space-y-4">
                    <h4 class="font-bold text-xl text-slate-900 dark:text-white">Challenge 1: Immutable Insert</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        Write a function <code>insertAt(arr, index, element)</code> that returns a new array with the element inserted at the specified index without mutating the original array.
                    </p>
                    <pre class="bg-gray-900 text-gray-100 p-6 rounded-xl text-xs overflow-x-auto">
<code>function insertAt(arr, index, element) {
  // TODO: Implement using slice and spread operator
}

const baseline = ["Red", "Blue", "Green"];
const updated = insertAt(baseline, 1, "Yellow");

console.log(updated); // Should output: ["Red", "Yellow", "Blue", "Green"]
console.log(baseline); // Should output: ["Red", "Blue", "Green"] (Verify no mutation)</code></pre>
                </div>

                <!-- Exercise 2 -->
                <div class="bg-gray-50 dark:bg-dark-800 p-8 rounded-2xl border border-gray-200 dark:border-dark-700 space-y-4">
                    <h4 class="font-bold text-xl text-slate-900 dark:text-white">Challenge 2: Safe Object Search & Update</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        Write a function <code>updateUserStatus(users, targetId, newStatus)</code> that updates a user's status within an array of user objects without mutating the original array.
                    </p>
                    <pre class="bg-gray-900 text-gray-100 p-6 rounded-xl text-xs overflow-x-auto">
<code>function updateUserStatus(users, targetId, newStatus) {
  // TODO: Use map to return a new array with the target user's status updated
}

const users = [
  { id: 1, name: "Alice", status: "pending" },
  { id: 2, name: "Bob", status: "pending" }
];
const updatedUsers = updateUserStatus(users, 2, "active");

console.log(updatedUsers[1].status); // Should output: "active"
console.log(users[1].status); // Should output: "pending" (Verify no mutation)</code></pre>
                </div>
            </div>
            
            <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8 space-y-6 mt-12">
                <p>
                    To test your skills in managing JavaScript scope and variables, explore our [INTERNAL LINK: frontend coding challenges], or join our [INTERNAL LINK: React Masterclass learning path]. You can also book [INTERNAL LINK: 1:1 expert mentorship sessions] with our senior engineers to audit your application structure.
                </p>
            </div>
        </section>
    </div>
    `
};
