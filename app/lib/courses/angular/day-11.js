export const day11 = {
  day: 11,
  title: "Extreme Performance Patterns",
  intro: "Make your app fly. Master <strong>OnPush</strong>, <strong>@defer</strong>, and <strong>Zoneless</strong> patterns to eliminate lag.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 11. The #1 perf killer in Angular is <strong>Change Detection</strong> checking too many components too often."
      },
      {
        type: "talk",
        message: "By default, if you click a button, Angular checks the ENTIRE app. With <strong>OnPush</strong>, it only checks what changed."
      },
      {
        type: "challenge",
        instruction: "This component is slow because it re-renders on every global event. Enable `OnPush` and use a `computed` signal to fix it.",
        buggyCode: `// ❌ Default: Checks on every click/timer in the app
@Component({ ... })
export class SlowCard {
  @Input() data: any;
  
  // ❌ Called on every CD cycle (hundreds of times!)
  get heavyComputation() {
    return fibonacci(this.data.num);
  }
}`,
        solutionCode: `// ✅ OnPush: Checks only when input/signal changes
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  ...
})
export class FastCard {
  data = input.required<any>();
  
  // ⚡ Computed: Memoized and only runs when data changes
  heavyComputation = computed(() => fibonacci(this.data().num));
}`,
        verifyOutput: "OnPush",
        successMessage: "Boom! Now resizing the window or clicking elsewhere won't trigger this expensive calculation.",
        hint: "Add `changeDetection: ChangeDetectionStrategy.OnPush`."
      }
    ]
  },
  content: `
<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">⚡ 1. The Golden Rule: OnPush</h3>
<p class="mb-6 text-gray-600 dark:text-light-300 leading-relaxed">
Never use the default strategy in production. OnPush tells Angular: "Don't check me unless my Input references change or *I* tell you to."
</p>

<div class="grid md:grid-cols-2 gap-6 mb-10">
    <div class="bg-red-50 dark:bg-red-900/10 p-5 rounded-xl border border-red-200 dark:border-red-900/30">
        <h4 class="font-bold text-red-800 dark:text-red-300 mb-3">Default (Slow)</h4>
        <p class="text-xs text-gray-600 dark:text-gray-400">
            Angular assumes ANY event might have changed your data. It dirty-checks every binding in the entire tree.
        </p>
    </div>
    <div class="bg-green-50 dark:bg-green-900/10 p-5 rounded-xl border border-green-200 dark:border-green-900/30">
        <h4 class="font-bold text-green-800 dark:text-green-300 mb-3">OnPush (Fast)</h4>
        <p class="text-xs text-gray-600 dark:text-gray-400">
            Angular sleeps until:
            <br>1. An <code>@Input()</code> reference changes
            <br>2. A Signal used in template updates
            <br>3. An Async Pipe emits
        </p>
    </div>
</div>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">💤 2. Lazy Loading Views (@defer)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300 leading-relaxed">
Don't load heavy components (charts, maps) until the user needs them.
</p>

<div class="bg-gray-100 dark:bg-dark-800 p-6 rounded-xl border-l-4 border-purple-500 mb-10">
<pre class="text-sm font-mono text-gray-800 dark:text-gray-200">
@defer (on viewport) {
  <heavy-chart />
} @placeholder {
  <div>Loading chart...</div>
}
</pre>
</div>
`,
  code: `import { Component, ChangeDetectionStrategy, signal, computed, effect, Input, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

// --- CELL COMPONENT ---
// We will toggle OnPush on and off for this component to show the difference.
@Component({
  selector: 'app-cell',
  standalone: true,
  imports: [CommonModule],
  // We can't dynamically change strategy at runtime in decorator, 
  // so we will simulate "Default" behavior by manually checking.
  changeDetection: ChangeDetectionStrategy.OnPush, 
  template: \`
    <div #cell
         class="w-full h-8 rounded transition-colors duration-200 flex items-center justify-center text-[10px] font-mono cursor-pointer"
         [class.bg-gray-800]="!active()"
         [class.bg-blue-500]="active()"
         (click)="toggle()">
      {{ checks() }}
    </div>
  \`
})
class CellComponent {
  @Input() mode: 'onpush' | 'default' = 'onpush';
  
  active = signal(false);
  checks = signal(0);
  
  @ViewChild('cell') el!: ElementRef;

  constructor(private renderer: Renderer2) {}

  // "Dirty Check" Simulation
  check() {
    this.checks.update(c => c + 1);
    
    // VISUALIZE THE CHECK!
    // Flash yellow if we are checking
    this.renderer.addClass(this.el.nativeElement, 'ring-2');
    this.renderer.addClass(this.el.nativeElement, 'ring-yellow-400');
    setTimeout(() => {
        this.renderer.removeClass(this.el.nativeElement, 'ring-2');
        this.renderer.removeClass(this.el.nativeElement, 'ring-yellow-400');
    }, 200);
  }
  
  toggle() {
      this.active.update(v => !v);
  }
}

// --- MAIN COMPONENT ---
@Component({
  selector: 'app-perf-lab',
  standalone: true,
  imports: [CommonModule, CellComponent],
  template: \`
    <div class="max-w-xl mx-auto bg-gray-950 p-6 rounded-2xl border border-gray-800 shadow-2xl min-h-[500px]" style="background-color: #030712; color: white">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-white">🔬 Render Lab</h2>
            
            <div class="flex bg-gray-900 p-1 rounded-lg border border-gray-800">
                <button (click)="mode.set('default')" 
                    [class.bg-red-600]="mode() === 'default'"
                    class="px-3 py-1 text-xs rounded-md transition-all text-gray-300">Default (Slow)</button>
                <button (click)="mode.set('onpush')"
                    [class.bg-green-600]="mode() === 'onpush'"
                    class="px-3 py-1 text-xs rounded-md transition-all text-gray-300">OnPush (Fast)</button>
            </div>
        </div>

        <div class="mb-4 p-3 bg-gray-900 border border-gray-900 rounded-lg text-xs text-gray-400">
             @if (mode() === 'default') {
                 <span class="text-red-400 font-bold">⚠️ Default Mode:</span> Clicking ONE cell triggers change detection on ALL cells. Watch them all flash.
             } @else {
                 <span class="text-green-400 font-bold">🚀 OnPush Mode:</span> Clicking a cell only checks THAT cell. The others sleep.
             }
        </div>

        <!-- The Grid -->
        <div class="grid grid-cols-10 gap-1 mb-6">
             @for (i of cells; track i) {
                 <app-cell [mode]="mode()" #cellRef></app-cell>
             }
        </div>

        <button (click)="triggerGlobalEvent()" class="w-full py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-bold border border-gray-700">
            Trigger Global App Event
        </button>

        <p class="text-center text-[10px] text-gray-500 mt-2">
            (Simulates a click, HTTP response, or timer elsewhere in the app)
        </p>

    </div>
  \`
})
export class PerfLab {
    mode = signal<'default' | 'onpush'>('onpush');
    cells = Array.from({ length: 50 }, (_, i) => i);
    
    // We need to simulate the framework's behavior
    // In a real app, 'default' mode components check always.
    
    @ViewChild(CellComponent) firstCell!: CellComponent;
    @ViewChild('cellRef') cellRefs!: any; // QueryList in real app

    triggerGlobalEvent() {
        // Trigger CD
        // In this simulation, we manually call 'check' on child components 
        // to mimic what Angular does under the hood.
        
        // This is a simulation!
        const allCells = document.querySelectorAll('app-cell');
        
        if (this.mode() === 'default') {
            // Default: Check EVERYONE
            // We use a custom event or simple broadcasting for the demo
            // Since we can't easily access children instances instances dynamically in sandpack without ViewChildren
            // We will rely on the user seeing the difference in interaction.
        }
    }
    
    // Actually, to make the demo work nicely in Sandpack without complex ViewChildren logic:
    // We will cheat slightly. The Child component will listen to a global signal if mode is default.
    // Re-writing Child to listen to a trigger.
    
    trigger = signal(0);
    
    triggerGlobalEventReal() {
        this.trigger.update(v => v + 1);
    }
}
`,
  // Re-writing code block to implement the logic correctly
  code: `import { Component, ChangeDetectionStrategy, signal, computed, effect, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cell',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <div class="h-8 rounded transition-all duration-200 flex items-center justify-center text-[10px] font-mono cursor-pointer border border-gray-800"
         [class.bg-gray-800]="!active()"
         [class.bg-blue-600]="active()"
         [class.ring-2]="isChecking()"
         [class.ring-yellow-400]="isChecking()"
         (click)="toggle()">
      {{ checks() }}
    </div>
  \`
})
class CellComponent {
  @Input({ required: true }) mode!: 'default' | 'onpush';
  // Input to force check in default mode
  @Input() trigger = 0; 
  
  active = signal(false);
  checks = signal(0);
  isChecking = signal(false);

  constructor() {
      // Simulate "Default" strategy behavior
      effect(() => {
          // If mode is default, we react to the global trigger
          if (this.mode === 'default') {
              // trigger changed? Run check.
              this.trigger; // Dependency
              this.runCheck();
          }
      }, { allowSignalWrites: true });
  }

  toggle() {
      this.active.update(v => !v);
      this.runCheck(); // Always check self on interaction
  }
  
  runCheck() {
      this.checks.update(c => c + 1);
      this.isChecking.set(true);
      setTimeout(() => this.isChecking.set(false), 300);
  }
}

@Component({
  selector: 'app-perf-lab',
  standalone: true,
  imports: [CommonModule, CellComponent],
  template: \`
    <div class="max-w-xl mx-auto bg-gray-950 p-6 rounded-2xl border border-gray-800 shadow-2xl min-h-[500px]" style="background-color: #030712; color: white">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-white">🔬 Render Lab</h2>
            
            <div class="flex bg-gray-900 p-1 rounded-lg border border-gray-800">
                <button (click)="mode.set('default')" 
                    [class.bg-red-600]="mode() === 'default'"
                    class="px-3 py-1 text-xs rounded-md transition-all text-gray-300">Default (Slow)</button>
                <button (click)="mode.set('onpush')"
                    [class.bg-green-600]="mode() === 'onpush'"
                    class="px-3 py-1 text-xs rounded-md transition-all text-gray-300">OnPush (Fast)</button>
            </div>
        </div>

        <div class="mb-4 p-3 bg-gray-900 border border-gray-900 rounded-lg text-xs text-gray-400">
             @if (mode() === 'default') {
                 <span class="text-red-400 font-bold">⚠️ Default Mode:</span> Every event checks EVERY component. Click "Trigger Event" to see the chaos.
             } @else {
                 <span class="text-green-400 font-bold">🚀 OnPush Mode:</span> Events only check relevant components. Silence is golden.
             }
        </div>

        <!-- The Grid -->
        <div class="grid grid-cols-10 gap-1 mb-6">
             @for (i of cells; track i) {
                 <app-cell [mode]="mode()" [trigger]="globalTrigger()"></app-cell>
             }
        </div>

        <button (click)="fireEvent()" class="w-full py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-bold border border-gray-700 shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2">
            <span>💥</span> Trigger Global App Event
        </button>

        <p class="text-center text-[10px] text-gray-500 mt-2">
            (Simulates a click, HTTP response, or timer elsewhere in the app)
        </p>
    </div>
  \`
})
export class PerfLab {
    mode = signal<'default' | 'onpush'>('default');
    globalTrigger = signal(0);
    cells = Array.from({ length: 50 }, (_, i) => i);
    
    fireEvent() {
        // In a real app, this happens automatically. 
        // Here we increment a signal to notify the 'default' strategy simulation.
        this.globalTrigger.update(v => v + 1);
    }
}`,
  comparison: {
    junior: `// ❌ Implicit Checks
@Component({
  template: '{{ heavy() }}' // Runs 100x/sec
})`,
    senior: `// ✅ Explicit Checks
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '{{ fast }}' // Runs only on change
})`
  },
  interview: {
    questions: [
      {
        q: "Does OnPush alone make my app faster?",
        a: "No. OnPush reduces the *frequency* of checks. You still need to ensure your templates are fast (no heavy computations in getters)."
      },
      {
        q: "What is 'Zone Pollution'?",
        a: "When third-party libraries (like chart.js) trigger Change Detection because they use setTimeout/setInterval patched by Zone.js. Run them outside angular to fix."
      }
    ]
  }
};
