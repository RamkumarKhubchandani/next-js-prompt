export const tsStrictModeMigrationGuide = {
    title: "TypeScript Strict Mode in 2026: A Step-by-Step Migration Guide for Legacy JavaScript Codebases",
    description: "A comprehensive, step-by-step engineering guide to migrating legacy JavaScript codebases to TypeScript strict mode incrementally in 2026.",
    slug: "typescript-strict-mode-migration-guide-legacy-javascript",
    category: "TypeScript",
    type: "static",
    author: "Principal Engineer",
    createdAt: new Date().toISOString(),
    readTime: "24 min read",
    difficulty: "Advanced",
    image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=1200",
    tags: ["TypeScript", "Migration", "JavaScript", "Software Architecture"],
    keywords: ["TypeScript strict mode migration legacy javascript", "noImplicitAny strictNullChecks", "tsconfig.json strict mode typescript", "typescript-strict-mode-migration-guide-legacy-javascript"],
    toc: [
        { id: "inherited-legacy-reality", label: "01. The Inherited Legacy Reality" },
        { id: "incremental-config-setup", label: "02. Phase 1: Creating the Coexistence Sandbox" },
        { id: "step-by-step-flags", label: "03. Phase 2: Staged Order of Operations" },
        { id: "ts-migrating-strategy", label: "04. Phase 3: Narrowing and Suppression Strategies" },
        { id: "strict-null-checks-deep", label: "05. Null-Checks and Catch Variable Narrowing" },
        { id: "the-verdict", label: "06. The Migration Verdict" },
        { id: "faq", label: "07. Frequently Asked Questions" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. The Inherited Legacy Reality -->
        <section id="inherited-legacy-reality" class="scroll-mt-32">
             <div class="border-l-8 border-cyan-600 bg-cyan-50 dark:bg-cyan-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    "I inherited a 120,000-line legacy Node and React codebase last quarter."
                 </h1>
                 <p class="text-xl md:text-2xl text-cyan-800 dark:text-cyan-200 font-light leading-relaxed">
                    The build ran fine under loose TypeScript rules, but we were shipping raw runtime errors—like "Cannot read properties of undefined (reading 'map')"—to production twice a week. That is when I convinced our product manager to let us run a staged migration to TypeScript Strict Mode.
                 </p>
             </div>
             <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8 space-y-6">
                 <p>
                     Many engineering teams delay migrating to strict mode because they fear it will freeze feature development or block deployment pipelines with thousands of compile errors. In 2026, the standard practice is to adopt **staged type transformations**. You do not flip the strict flag overnight; you systematically enable individual safety boundaries one compile flag at a time.
                 </p>
                 <p>
                     This guide outlines the exact, step-by-step order of operations to transition your legacy JavaScript systems to TypeScript strict mode incrementally, keeping your codebase shippable and your build pipeline passing at every checkpoint.
                 </p>
             </div>
        </section>

        <!-- 02. Phase 1: Creating the Coexistence Sandbox -->
        <section id="incremental-config-setup" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-cyan-600 dark:text-cyan-500">02.</span>
                Phase 1: Creating the Coexistence Sandbox
            </h2>
            <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8 space-y-6">
                <p>
                    Do not start by changing your file extensions to <code>.ts</code>. Your first goal is to establish a type-checking baseline while allowing your existing JavaScript code to build normally.
                </p>
                <p>
                    Create a baseline <code>tsconfig.json</code> file at the root of your project:
                </p>
                
                <pre class="bg-gray-900 text-gray-100 p-6 rounded-2xl overflow-x-auto text-sm border border-white/10 shadow-xl">
<code>{
  "compilerOptions": {
    "target": "es2022",
    "module": "commonjs",
    "allowJs": true,           // Allows JS files to coexist
    "checkJs": false,          // Disables strict checking for JS files during initial stage
    "strict": false,           // Disables strict mode for now
    "noEmit": true             // Runs tsc strictly for type checking
  },
  "include": ["src/**/*"]
}</code></pre>

                <p>
                    Once this file is created, add a check task to your CI pipeline: <code>tsc --noEmit</code>. This guarantees that you can monitor type errors without blocking production bundles.
                </p>
            </div>
        </section>

        <!-- 03. Phase 2: Staged Order of Operations -->
        <section id="step-by-step-flags" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-cyan-600 dark:text-cyan-500">03.</span>
                Phase 2: The Staged Order of Operations
            </h2>
            <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8 space-y-6">
                <p>
                    Enabling <code>"strict": true</code> globally triggers all strict flags simultaneously. Instead, enable them one by one. I recommend following this exact sequence:
                </p>
                
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-8">Step 1: Enable <code>noImplicitAny</code></h3>
                <p>
                    This is the most common compiler warning. It prevents TypeScript from assigning the fallback <code>any</code> type to function parameters or variables where it cannot infer the type.
                </p>
                <p>
                    For example, this insecure JS function:
                </p>
                <pre class="bg-gray-900 text-gray-150 p-6 rounded-2xl overflow-x-auto text-sm border border-white/10 shadow-xl">
<code>// TypeScript Error: Parameter 'user' implicitly has an 'any' type.
function formatUser(user) {
  return user.name.toUpperCase();
}</code></pre>

                <p>
                    Resolve it by defining a strict type interface:
                </p>
                <pre class="bg-gray-900 text-gray-150 p-6 rounded-2xl overflow-x-auto text-sm border border-white/10 shadow-xl">
<code>interface User {
  name: string;
}

function formatUser(user: User): string {
  return user.name.toUpperCase();
}</code></pre>

                <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-8">Step 2: Enable <code>strictNullChecks</code></h3>
                <p>
                    This flag ensures that <code>null</code> and <code>undefined</code> are handled explicitly. It prevents the notorious "Cannot read properties of undefined" runtime exceptions.
                </p>
                <p>
                    If this flag is enabled, objects that can be optionally empty must be checked before accessing properties:
                </p>
                <pre class="bg-gray-900 text-gray-150 p-6 rounded-2xl overflow-x-auto text-sm border border-white/10 shadow-xl">
<code>interface Profile {
  age?: number;
}

// Compiler Error: Object is possibly 'undefined'.
function printAge(profile: Profile) {
  return profile.age.toFixed(0); 
}</code></pre>

                <p>
                    Correct this using type narrowing:
                </p>
                <pre class="bg-gray-900 text-gray-150 p-6 rounded-2xl overflow-x-auto text-sm border border-white/10 shadow-xl">
<code>function printAge(profile: Profile) {
  if (profile.age === undefined) {
    return "Age not provided";
  }
  return profile.age.toFixed(0); // Safe to execute
}</code></pre>
            </div>
        </section>

        <!-- 04. Phase 3: Narrowing and Suppression Strategies -->
        <section id="ts-migrating-strategy" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-cyan-600 dark:text-cyan-500">04.</span>
                Phase 3: Narrowing and Suppression Strategies
            </h2>
            <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8 space-y-6">
                <p>
                    When migrating a massive codebase, you will hit roadblocks where you cannot solve every type error immediately.
                </p>
                <p>
                    Avoid using <code>any</code> as a fallback because it disables type-safety for that value completely. Instead, use <code>unknown</code>. It forces you to write type narrowing checks before accessing properties or executing functions:
                </p>

                <pre class="bg-gray-900 text-gray-100 p-6 rounded-2xl overflow-x-auto text-sm border border-white/10 shadow-xl">
<code>function parsePayload(data: unknown) {
  // We can't access data.id directly without check.
  if (data && typeof data === "object" && "id" in data) {
    // Narrowed scope permits safe execution
    console.log("Valid ID:", (data as { id: string }).id);
  }
}</code></pre>

                <p>
                    If you must suppress a compilation error to unblock a release, use <code>// @ts-expect-error</code> instead of <code>// @ts-ignore</code>. The <code>expect-error</code> comment will throw a compiler warning if the code is refactored in the future and the type check passes, keeping your codebase clean.
                </p>
            </div>
        </section>

        <!-- 05. Null-Checks and Catch Variable Narrowing -->
        <section id="strict-null-checks-deep" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-cyan-600 dark:text-cyan-500">05.</span>
                Catch Variable Narrowing (useUnknownInCatchVariables)
            </h2>
            <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8 space-y-6">
                <p>
                    In legacy codebases, catch variables are implicitly typed as <code>any</code>. In strict mode, the <code>useUnknownInCatchVariables</code> flag changes the type of catch variables to <code>unknown</code>. This prevents you from executing properties on raw errors without verifying their type:
                </p>
                
                <pre class="bg-gray-900 text-gray-100 p-6 rounded-2xl overflow-x-auto text-sm border border-white/10 shadow-xl">
<code>try {
  fetchUserData();
} catch (error) {
  // error is typed as unknown. error.message will throw compile error.
  if (error instanceof Error) {
    console.error("Failed to load user:", error.message);
  } else {
    console.error("Unknown API error:", error);
  }
}</code></pre>
            </div>
        </section>

        <!-- 06. The Migration Verdict -->
        <section id="the-verdict" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-cyan-600 dark:text-cyan-500">06.</span>
                The Migration Verdict
            </h2>
            <div class="prose prose-xl max-w-none text-gray-700 dark:text-gray-300 leading-8 space-y-6">
                <p>
                    Migrating to TypeScript Strict Mode is a staged process, not a simple config toggle. It requires systematic code narrowing, strict validation patterns, and continuous integration audits.
                </p>
                <p>
                    Start today by running your healthcheck, establishing your tsconfig coexistence sandbox, and staged enabling parameters.
                </p>
                <p>
                    To test your skills in debugging strict type interfaces, check out our [INTERNAL LINK: frontend coding challenges], or join our [INTERNAL LINK: React Masterclass learning path]. You can also book [INTERNAL LINK: 1:1 expert mentorship sessions] with our core engineering team to audit your system migration plans.
                </p>
            </div>
        </section>

        <!-- 07. FAQ -->
        <section id="faq" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-cyan-600 dark:text-cyan-500">07.</span>
                Frequently Asked Questions
            </h2>
            <div class="space-y-6">
                <div class="bg-gray-50 dark:bg-dark-800 p-6 rounded-2xl border border-gray-200 dark:border-dark-700">
                    <h4 class="font-bold text-lg mb-2 text-slate-900 dark:text-white">What is the difference between strict: true and individual flags?</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Flipping strict: true enables all strict flags simultaneously. Setting individual flags (e.g. noImplicitAny, strictNullChecks) to true manually allows you to fix errors incrementally, flag by flag.</p>
                </div>
                <div class="bg-gray-50 dark:bg-dark-800 p-6 rounded-2xl border border-gray-200 dark:border-dark-700">
                    <h4 class="font-bold text-lg mb-2 text-slate-900 dark:text-white">Why choose unknown instead of any?</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">The any type disables all type checks, creating potential runtime bugs. The unknown type instructs the compiler that the value is unsafe, forcing you to use type narrowing checks before accessing properties.</p>
                </div>
                <div class="bg-gray-50 dark:bg-dark-800 p-6 rounded-2xl border border-gray-200 dark:border-dark-700">
                    <h4 class="font-bold text-lg mb-2 text-slate-900 dark:text-white">How should I migrate external packages without typings?</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">If a package has no npm @types module, create a custom declaration file (e.g. declarations.d.ts) inside your src folder and define a broad module declaration to satisfy the compiler.</p>
                </div>
            </div>
        </section>
    </div>
    `
};
