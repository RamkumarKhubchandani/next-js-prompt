export const day14 = {
  day: 14,
  title: "Mastering Pipes: Performance & Injection",
  intro: "Pipes aren't just for dates. Learn how to build <strong>Performant Pure Pipes</strong> and how to inject services into pipes for advanced transformations.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 14. Angular Pipes are **Pure Functions** for your template. They are the secret to performant rendering."
      },
      {
        type: "talk",
        message: "A common mistake is calling methods in the template `{{ calculate(val) }}`. This runs on EVERY change detection cycle. Pipes cache the result."
      },
      {
        type: "challenge",
        instruction: "This template calls a heavy function directly. Refactor it into a Pure Pipe to memoize the result.",
        buggyCode: `// ❌ Called 100s of times per second
@Component({
  template: '{{ heavyCompute(value) }}'
})
class App {
  heavyCompute(val: number) {
    // 500ms calculation...
    return result;
  }
}`,
        solutionCode: `// ✅ Cached! Only runs when 'value' changes
@Pipe({ name: 'heavy', pure: true })
class HeavyPipe implements PipeTransform {
  transform(val: number) {
    // 500ms calculation...
    return result;
  }
}
// Template: {{ value | heavy }}`,
        verifyOutput: "PipeTransform",
        successMessage: "Optimization unlocked! Pure pipes only re-calculate when their arguments change. The result is cached (memoized).",
        hint: "Create a class implementing `PipeTransform` with `pure: true`."
      }
    ]
  },
  content: `
<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🛑 1. The "Method Call" Trap</h3>
<p class="mb-6 text-gray-600 dark:text-light-300 leading-relaxed">
Never bind a function call in your template unless you want performance issues.
</p>

<div class="grid md:grid-cols-2 gap-6 mb-10">
    <div class="bg-red-50 dark:bg-red-900/10 p-5 rounded-xl border border-red-200 dark:border-red-900/30">
        <h4 class="font-bold text-red-800 dark:text-red-300 mb-3">Function Call</h4>
        <pre class="text-xs font-mono text-gray-600 dark:text-gray-400">
{{ calculate(data) }}
// Reruns on:
// - Click events
// - API responses
// - Mouse moves ...
        </pre>
    </div>
    <div class="bg-green-50 dark:bg-green-900/10 p-5 rounded-xl border border-green-200 dark:border-green-900/30">
        <h4 class="font-bold text-green-800 dark:text-green-300 mb-3">Pure Pipe</h4>
        <pre class="text-xs font-mono text-gray-600 dark:text-gray-400">
{{ data | calculate }}
// Reruns ONLY if:
// - 'data' reference changes
        </pre>
    </div>
</div>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">💉 2. Injecting Services into Pipes</h3>
<p class="mb-4 text-gray-600 dark:text-light-300 leading-relaxed">
Pipes are classes. You can inject dependencies! Use this for things like translations, currency conversion, or permission checks.
</p>

<div class="bg-gray-100 dark:bg-dark-800 p-6 rounded-xl border-l-4 border-purple-500 mb-10">
<pre class="text-sm font-mono text-gray-800 dark:text-gray-200">
@Pipe({ name: 'translate', standalone: true })
export class TranslatePipe implements PipeTransform {
  // Inject services!
  translate = inject(TranslationService);
  
  transform(key: string): string {
    return this.translate.get(key);
  }
}
</pre>
</div>
`,
  code: `import { Pipe, PipeTransform, Component, signal, ChangeDetectionStrategy, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

// --- EXPENSIVE CALCULATION ---
// Simulating a heavy operation (Fibonacci of 30+)
function fib(n: number): number {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}

// --- PURE PIPE (Optimized) ---
@Pipe({
  name: 'fibPure',
  standalone: true,
  pure: true // Default (Caching enabled)
})
export class FibPipe implements PipeTransform {
  transform(val: number): number {
    console.log('[Pure Pipe] Calculating for', val);
    return fib(val);
  }
}

// --- IMPURE PIPE (Not Optimized) ---
@Pipe({
  name: 'fibImpure',
  standalone: true,
  pure: false // Reruns on every check!
})
export class FibImpurePipe implements PipeTransform {
  transform(val: number): number {
    console.log('🔴 [Impure Pipe] Calculating for', val);
    return fib(val);
  }
}

@Component({
  selector: 'app-pipe-lab',
  standalone: true,
  imports: [CommonModule, FibPipe, FibImpurePipe],
  // We use Default CD here to demonstrate how pipes handle CD cycles
  changeDetection: ChangeDetectionStrategy.Default, 
  template: \`
    <div class="h-[600px] bg-gray-950 p-6 rounded-2xl border border-gray-800 shadow-2xl overflow-y-auto" style="background-color: #030712; color: white">
        <h2 class="text-2xl font-bold text-white mb-2">🔬 Pipe Performance Lab</h2>
        <p class="text-gray-400 mb-6 text-sm">Open Console to see calculation logs.</p>

        <!-- CD Trigger -->
        <div class="mb-8 p-4 bg-gray-900 rounded-xl border border-gray-800">
             <div class="flex justify-between items-center mb-4">
                 <div>
                     <h3 class="font-bold text-white">Global Trigger</h3>
                     <p class="text-xs text-gray-500">Triggers Change Detection everywhere</p>
                 </div>
                 <button (click)="trigger()" class="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-bold active:scale-95 transition-transform">
                    🔥 Trigger CD
                 </button>
             </div>
             
             <div class="text-[10px] font-mono text-gray-500">
                 Tick: {{ tick() }}
             </div>
        </div>

        <div class="grid grid-cols-2 gap-6">
            <!-- PURE PIPE -->
            <div class="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                <h3 class="font-bold text-green-400 mb-4">Pure Pipe</h3>
                <div class="space-y-4">
                    @for (val of numbers; track val) {
                        <div class="flex justify-between items-center p-2 bg-black/20 rounded">
                            <span class="text-xs text-gray-400">fib({{val}})</span>
                            <span class="font-mono font-bold">{{ val | fibPure }}</span>
                        </div>
                    }
                </div>
                <div class="mt-4 text-xs text-green-400/70 border-t border-green-500/20 pt-2">
                    ✅ Only logs when numbers change. Ignored 'Trigger CD'.
                </div>
            </div>

            <!-- IMPURE PIPE / METHOD -->
            <div class="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                <h3 class="font-bold text-red-400 mb-4">Impure / Method</h3>
                <div class="space-y-4">
                     @for (val of numbers; track val) {
                        <div class="flex justify-between items-center p-2 bg-black/20 rounded">
                            <span class="text-xs text-gray-400">fib({{val}})</span>
                            <!-- Using impure pipe to simulate method call behavior -->
                            <span class="font-mono font-bold">{{ val | fibImpure }}</span>
                        </div>
                    }
                </div>
                 <div class="mt-4 text-xs text-red-400/70 border-t border-red-500/20 pt-2">
                    ❌ Logs every single time you click 'Trigger CD'. Calculation is wasted.
                </div>
            </div>
        </div>

        <div class="mt-8">
            <h3 class="font-bold text-white mb-2">Change Values</h3>
             <button (click)="changeNumbers()" class="w-full py-3 bg-gray-800 hover:bg-gray-700 rounded-xl border border-gray-700 text-gray-300">
                🔄 Update Numbers 
                <span class="text-xs text-gray-500 block font-normal">(Updates Input reference - both will update)</span>
            </button>
        </div>
    </div>
  \`
})
export class PipeLab {
    tick = signal(0);
    numbers = [30, 31, 32]; // Heavy enough to notice in console

    trigger() {
        this.tick.update(t => t + 1);
        // This triggers CD. 
        // Pure Pipe: Does nothing (inputs same).
        // Impure Pipe: Recalculates everything.
    }

    changeNumbers() {
        // Change the input data
        this.numbers = this.numbers.map(n => n + 1);
    }
}`,
  comparison: {
    junior: `// ❌ Method Call
@Component({
  template: \`Total: {{ calculateTotal(items) }}\`
})
// Recalculates 100x per second if items haven't changed!`,
    senior: `// ✅ Pure Pipe
@Component({
  template: \`Total: {{ items | totalSummary }}\`
})
// Calculate only when 'items' reference updates.`
  },
  interview: {
    questions: [
      {
        q: "What makes a pipe 'Pure'?",
        a: "A pipe is pure if its `transform` method is only invoked when its input arguments change. This is the default and allows Angular to optimize heavily."
      },
      {
        q: "How can you inject a service into a Pipe?",
        a: "Since Pipes are classes, you can simply inject dependencies in the constructor or use `inject()` property assignment, just like in Components."
      }
    ]
  }
};
