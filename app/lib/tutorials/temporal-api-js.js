export const temporalApiJs = {
    title: "Temporal API: Why You'll Finally Delete moment.js and date-fns",
    description: "The JavaScript Date object has been broken for 25 years. The Temporal API fixes time zones, parsing, and arithmetic natively. Learn how to handle dates without external libraries.",
    slug: "temporal-api-js",
    category: "JavaScript",
    type: "static",
    author: "TC39 Observer",
    createdAt: new Date().toISOString(),
    readTime: "25 min read",
    difficulty: "Advanced",
    // image: "https://images.unsplash.com/photo-1501139083538-0139583c61df?q=80&w=2670&auto=format&fit=crop",
    tags: ["JavaScript", "Temporal API", "Date & Time", "Internationalization", "ES2026"],
    keywords: ["Temporal.Now", "Temporal.PlainDate", "Time Zones", "Moment.js alternative", "Date Arithmetic"],
    toc: [
        { id: "pain", label: "01. The Pain of new Date()" },
        { id: "basics", label: "02. Temporal Basics" },
        { id: "timezones", label: "03. Time Zone Sanity" },
        { id: "arithmetic", label: "04. Date Math That Works" },
        { id: "senior-guidance", label: "05. Senior Guidance" }
    ],
    content: `
    <div class="space-y-16 font-sans text-gray-800 dark:text-gray-200">
        
        <!-- 01. Pain -->
        <!-- 01. Pain -->
        <section id="pain" class="scroll-mt-32">
             <div class="border-l-8 border-purple-600 bg-purple-50 dark:bg-purple-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    Friends don't let friends use <code>new Date()</code>.
                </h1>
                <p class="text-xl md:text-2xl text-purple-800 dark:text-purple-200 font-light leading-relaxed">
                    JavaScript's original <code>Date</code> object is a 1995 port of <code>java.util.Date</code>. It's mutable, confusing (months are 0-indexed, days are 1-indexed), and fails at basic arithmetic.
                    <br/><br/>
                    The <strong>Temporal API</strong> is the clean slate we've been waiting for: A robust, immutable, timezone-aware standard built for the modern web.
                </p>
             </div>

             <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert mb-8">
                <h3 class="text-2xl font-bold">Why the \`Date\` object failed us</h3>
                <ul class="list-disc pl-5 space-y-2">
                    <li><strong>Mutability:</strong> <code>date.setHours(0)</code> modifies the object in place. This causes bugs when dates are shared across components.</li>
                    <li><strong>0-Indexed Months:</strong> <code>new Date(2023, 0, 1)</code> is January. <code>new Date(2023, 1, 1)</code> is February. This off-by-one error has wasted millions of developer hours.</li>
                    <li><strong>Parsing Inconsistency:</strong> Browser support for parsing strings like <code>"2023-01-01"</code> varies dangerously between UTC and Local time.</li>
                </ul>
             </div>
        </section>

        <!-- 02. Basics -->
        <section id="basics" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-purple-600 dark:text-purple-500">02.</span>
                Immutable & Type-Safe
            </h2>
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert mb-8">
                <h3 class="text-2xl font-bold">Clear Benefits</h3>
                <p>
                    Temporal handles concepts distinctively: Wall-Clock time (PlainDate) vs. Absolute time (Instant) vs. Zoned time (ZonedDateTime). This prevents you from accidentally mixing up "local time" with "UTC time".
                </p>
            </div>
             <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-sm">
                <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl">
                    <h4 class="font-bold text-gray-700 dark:text-gray-300 mb-2">Temporal.PlainDate</h4>
                    <pre class="whitespace-pre-wrap font-mono text-gray-500">
// Just a calendar date. No time. No timezone.
const birthday = Temporal.PlainDate.from('2026-05-15');
                    </pre>
                </div>
                 <div class="bg-purple-50 dark:bg-purple-900/10 p-6 rounded-xl border border-purple-200 dark:border-purple-900/30">
                     <h4 class="font-bold text-purple-700 dark:text-purple-300 mb-2">Temporal.ZonedDateTime</h4>
                    <pre class="whitespace-pre-wrap font-mono text-gray-500">
// Complete precision.
const meeting = Temporal.Now.zonedDateTimeISO('Asia/Tokyo');
                    </pre>
                </div>
            </div>
        </section>

        <!-- 03. Time Zones -->
        <section id="timezones" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-purple-600 dark:text-purple-500">03.</span>
                Time Zone Sanity & Arithmetic
            </h2>
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert mb-8">
                <p>
                    Time zones and Daylight Saving Time (DST) are notorious sources of bugs in date and time handling. The native <code>Date</code> object offers minimal help, often requiring complex external libraries to manage these intricacies. Temporal, however, was built from the ground up with time zones in mind, making operations like adding hours across DST boundaries or comparing dates in different zones straightforward and reliable.
                </p>
                <p>
                    <code>Temporal.ZonedDateTime</code> is your go-to for representing a specific moment in time within a particular time zone. It automatically handles offsets, DST transitions, and provides robust methods for arithmetic and comparison.
                </p>
            </div>
            
            <div class="grid grid-cols-1 gap-8 mb-12">
                <!-- Example 1 -->
                <div class="bg-gray-900 p-6 rounded-xl border border-gray-800">
                    <h4 class="text-sm font-bold text-gray-400 uppercase mb-4">Adding Time (DST Safe)</h4>
                    <pre class="whitespace-pre-wrap font-mono text-sm text-gray-300">
const flight = Temporal.ZonedDateTime.from(
  '2026-03-14T10:00:00[America/New_York]'
); // Day before DST changes

// Add 24 hours (wall clock time)
const nextDay = flight.add({ hours: 24 });
// Temporal knows if 24 hours actually lands at 10am or 11am based on DST rules!</pre>
                </div>

                <!-- Example 2 -->
                <div class="bg-gray-900 p-6 rounded-xl border border-gray-800">
                    <h4 class="text-sm font-bold text-gray-400 uppercase mb-4">Comparing Dates</h4>
                    <pre class="whitespace-pre-wrap font-mono text-sm text-gray-300">
const d1 = Temporal.PlainDate.from('2026-01-01');
const d2 = Temporal.PlainDate.from('2026-06-01');

const duration = d1.until(d2); 
console.log(duration.toString()); // "P5M" (Period: 5 Months)
console.log(d1.equals(d2));       // false</pre>
                </div>

                <!-- Example 3 -->
                <div class="bg-gray-900 p-6 rounded-xl border border-gray-800">
                    <h4 class="text-sm font-bold text-gray-400 uppercase mb-4">Sorting</h4>
                    <pre class="whitespace-pre-wrap font-mono text-sm text-gray-300">
const dates = [
  Temporal.PlainDate.from('2026-01-01'),
  Temporal.PlainDate.from('2025-12-31')
];

dates.sort(Temporal.PlainDate.compare); // Built-in comparator!</pre>
                </div>
            </div>
        </section>

        <!-- 05. Senior Guidance -->
        <section id="senior-guidance" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-purple-600 dark:text-purple-500">05.</span>
                Senior Guidance
            </h2>
            <div class="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl border-l-4 border-purple-500">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Delete your libraries.</h3>
                <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    Moment.js is 300kb. Date-fns is lighter but still adds bundle weight.
                    <br/><br/>
                    Temporal is built-in. It costs 0kb. It's faster because it's C++ binding in V8.
                    The only reason to keep using libraries is if you need complex human-readable formatting like "3 minutes ago" (RelativeTimeFormat covers some of this) or legacy browser support without polyfills.
                </p>
            </div>
        </section>
    </div>
    `,
    code: `import React, { useState, useEffect } from 'react';

// ⏳ Temporal API Visualizer
// Note: Since Temporal is not in all browsers yet, this is a simulated demo for the tutorial.

export default function TemporalDemo() {
    // Simulator state
    const [baseTime, setBaseTime] = useState(new Date().toISOString());
    const [timezone, setTimezone] = useState('America/New_York');
    const [calcMode, setCalcMode] = useState('add');
    const [amount, setAmount] = useState(1);
    const [unit, setUnit] = useState('months');
    
    // Derived values (simulating Temporal logic)
    const calculateResult = () => {
        const date = new Date(baseTime);
        // This is where real Temporal would handle DST perfectly.
        // We simulate basic jumps for the UI.
        if (calcMode === 'add') {
             if (unit === 'months') date.setMonth(date.getMonth() + amount);
             if (unit === 'hours') date.setHours(date.getHours() + amount);
        }
        return date.toISOString();
    };

    const result = calculateResult();

    return (
        <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                <div>
                     <h3 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <span className="text-purple-600">⏳</span> Temporal API
                    </h3>
                    <p className="text-gray-500 mt-2">Native, Immutable, Timezone-Aware Date/Time.</p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
            
                {/* Input Card */}
                <div className="w-full max-w-sm p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg">
                    <div class="text-xs font-bold text-gray-400 uppercase mb-4 flex items-center gap-2">
                        <span className="text-xl">📅</span> Start Date (Temporal.PlainDateTime)
                    </div>
                    <div className="text-2xl font-mono font-bold text-gray-800 dark:text-white break-all">
                        {baseTime.split('T')[0]}
                        <br/>
                        <span className="text-purple-500 text-lg">{baseTime.split('T')[1].substring(0,8)}</span>
                    </div>
                    
                     <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <label className="text-xs font-bold text-gray-500 block mb-2">Time Zone</label>
                        <select 
                            value={timezone}
                            onChange={(e) => setTimezone(e.target.value)}
                            className="w-full p-2 rounded-lg bg-slate-100 dark:bg-black border border-slate-200 dark:border-slate-800 text-sm font-mono"
                        >
                            <option value="America/New_York">America/New_York (EST)</option>
                            <option value="Europe/London">Europe/London (GMT)</option>
                            <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                        </select>
                    </div>
                </div>

                {/* Operation */}
                <div className="flex flex-col items-center gap-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full text-purple-600">
                        <span className="text-2xl">➡️</span>
                    </div>
                    <div className="bg-white dark:bg-black p-4 rounded-xl shadow-sm border text-center space-y-2">
                        <div className="text-xs font-bold text-gray-400 uppercase">Operation</div>
                         <div className="font-mono text-sm">
                            <span className="text-blue-500">.add</span>(
                                {'{'} <span className="text-orange-500">{unit}</span>: <span className="text-red-500">{amount}</span> {'}'}
                            )
                        </div>
                    </div>
                </div>

                {/* Result Card */}
                 <div className="w-full max-w-sm p-6 bg-purple-50 dark:bg-purple-900/10 rounded-2xl border-2 border-purple-200 dark:border-purple-500/50 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 select-none pointer-events-none">
                        <span className="text-[100px]">🌍</span>
                    </div>
                    
                    <div className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase mb-4 flex items-center gap-2">
                        <span className="text-xl">⏰</span> Calculated Result
                    </div>
                    <div className="text-2xl font-mono font-bold text-gray-900 dark:text-white break-all relative z-10">
                        {result.split('T')[0]}
                        <br/>
                        <span className="text-purple-600 dark:text-purple-400 text-lg">{result.split('T')[1].substring(0,8)}</span>
                    </div>
                     <div className="mt-2 text-xs text-gray-500 font-mono">
                         ISO 8601 Compliance: ✅
                    </div>
                </div>
                
            </div>
            
             <div className="mt-10 p-6 bg-slate-100 dark:bg-slate-900 rounded-xl">
                <h4 className="text-sm font-bold mb-3 text-gray-500 uppercase">Why this matters</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-start gap-2">
                        <span className="text-green-500">✓</span> No mutation bugs (original date stays same)
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-green-500">✓</span> No "month index 0" confusion
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-green-500">✓</span> Handles ambiguous hours (DST transitions)
                    </div>
                     <div className="flex items-start gap-2">
                        <span className="text-green-500">✓</span> Comparison methods (.equals, .since)
                    </div>
                </div>
            </div>

        </div>
    );
}
`
};
