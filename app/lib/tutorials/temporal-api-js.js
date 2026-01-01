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
        <section id="pain" class="scroll-mt-32">
             <div class="border-l-8 border-purple-600 bg-purple-50 dark:bg-purple-900/10 pl-8 py-8 mb-12 rounded-r-2xl shadow-sm">
                 <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                    Friends don't let friends use <code>new Date()</code>.
                </h1>
                <p class="text-xl md:text-2xl text-purple-800 dark:text-purple-200 font-light leading-relaxed">
                    JavaScript's original Date object was copied from Java in 1995. It's mutable, confusing (months are 0-indexed, days are 1-indexed), and handles time zones poorly.
                    <br/><br/>
                    The <strong>Temporal API</strong> is a global object that acts as a top-level namespace (like Math) to bring modern date/time handling to the ECMAScript language.
                </p>
             </div>
        </section>

        <!-- 02. Basics -->
        <section id="basics" class="scroll-mt-32">
             <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-4 border-b pb-4 dark:border-gray-800">
                <span class="text-purple-600 dark:text-purple-500">02.</span>
                Immutable & Type-Safe
            </h2>
            <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mb-8">
                <p>
                    Temporal introduces specific types for specific use cases. No more using a generic milliseconds-since-epoch for "Today".
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
                Time Zones without Tears
            </h2>
            <div class="bg-slate-900 p-6 rounded-xl mb-6 shadow-lg">
                <pre class="text-gray-300 text-sm font-mono overflow-x-auto">
const departure = Temporal.ZonedDateTime.from('2026-10-01T14:00:00[Europe/London]');
const arrival = departure.add({ hours: 8 });

console.log(arrival.toString()); 
// Automatically handles Daylight Savings (BST vs GMT) 
// and preserves the timezone ID.
                </pre>
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
import { Clock, Globe, Calendar, ArrowRight } from 'lucide-react';

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
                    <div className="text-xs font-bold text-gray-400 uppercase mb-4 flex items-center gap-2">
                        <Calendar size={14} /> Start Date (Temporal.PlainDateTime)
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
                        <ArrowRight size={24} />
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
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Globe size={100} />
                    </div>
                    
                    <div className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase mb-4 flex items-center gap-2">
                        <Clock size={14} /> Calculated Result
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
