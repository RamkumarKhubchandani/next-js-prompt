export const day11 = {
  day: 11,
  title: "Extreme Performance Patterns",
  intro: "Does your app feel laggy? The culprit is likely <strong>Change Detection</strong>. Today, we learn the 'Golden Rule' of Angular performance: <strong>OnPush</strong>.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 11. Angular checks for changes too often. `OnPush` tells Angular: \"Relax. Don't check me unless my input changes.\""
      },
      {
        type: "challenge",
        instruction: "Enable `OnPush` change detection and use a Signal to trigger updates.",
        buggyCode: `// ❌ Default Strategy (Slow)
@Component({
  template: '{{ count }}'
})
class Counter {
  count = 0;
  constructor() {
    setInterval(() => this.count++, 1000);
  }
}`,
        solutionCode: `// ✅ OnPush + Signals (Fast)
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '{{ count() }}' 
})
class Counter {
  count = signal(0);
  constructor() {
    // Signals automatically notify OnPush components!
    setInterval(() => this.count.update(c => c + 1), 1000);
  }
}`,
        verifyOutput: "ChangeDetectionStrategy.OnPush",
        successMessage: "Speed boost! 🚀 Your component now sleeps until the signal specifically wakes it up.",
        hint: "Set `changeDetection: ChangeDetectionStrategy.OnPush` in the component metadata."
      }
    ]
  },
  content: `
<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">⚡ 1. How Angular Updates the Screen</h3>
<p class="mb-4 text-gray-600 dark:text-light-300 leading-relaxed">
By default (<code>Default</code> strategy), whenever <strong>ANYTHING</strong> happens (click, timer, HTTP request), Angular checks <strong>EVERY</strong> component in your app.
</p>
<p class="mb-6 text-gray-600 dark:text-light-300 leading-relaxed">
Imagine if you clicked a "Like" button, and your app re-calculated the entire User Profile, Sidebar, and Footer. That's what happens by default!
</p>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🛑 2. The Solution: OnPush</h3>
<p class="mb-6 text-gray-600 dark:text-light-300 leading-relaxed">
When you set <code>changeDetection: ChangeDetectionStrategy.OnPush</code>, you tell Angular: <strong>"Ignore me unless my inputs change."</strong>
</p>

<div class="grid md:grid-cols-2 gap-6 mb-10">
    <div class="bg-red-50 dark:bg-red-900/10 p-5 rounded-xl border border-red-200 dark:border-red-900/30">
        <h4 class="font-bold text-red-800 dark:text-red-300 mb-3">Default (The Panic Mode)</h4>
        <ul class="text-xs text-gray-600 dark:text-gray-400 space-y-2">
            <li>• Window resize? -> <strong>CHECK EVERYTHING</strong></li>
            <li>• Mouse move? -> <strong>CHECK EVERYTHING</strong></li>
            <li>• HTTP done? -> <strong>CHECK EVERYTHING</strong></li>
        </ul>
    </div>
    <div class="bg-green-50 dark:bg-green-900/10 p-5 rounded-xl border border-green-200 dark:border-green-900/30">
        <h4 class="font-bold text-green-800 dark:text-green-300 mb-3">OnPush (The Zen Mode)</h4>
        <ul class="text-xs text-gray-600 dark:text-gray-400 space-y-2">
            <li>• Only check if <strong>@Input()</strong> reference changes.</li>
            <li>• Only check if a <strong>Signal</strong> referenced in HTML updates.</li>
            <li>• Only check if an <strong>Async Pipe</strong> emits.</li>
        </ul>
    </div>
</div>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">💤 3. Lazy Loading with @defer</h3>
<p class="mb-4 text-gray-600 dark:text-light-300 leading-relaxed">
Why load a heavy chart if the user hasn't scrolled down to see it? Use <code>@defer</code> to load components only when needed.
</p>
<div class="bg-gray-100 dark:bg-dark-800 p-6 rounded-xl border-l-4 border-purple-500 mb-10 font-mono text-sm">
@defer (on viewport) { <heavy-chart /> }
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
