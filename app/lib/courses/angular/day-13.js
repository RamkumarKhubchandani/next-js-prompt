export const day13 = {
  day: 13,
  title: "Advanced Directives: Composition & Signals",
  intro: "Directives are superpowers for your HTML. Why wrap a button in a component just to add a tooltip? Today, we master <strong>Directive Composition</strong> and <strong>Zoneless Events</strong>.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 13. Components are for *UI*, but Directives are for *Behavior*. Don't mix them."
      },
      {
        type: "challenge",
        instruction: "Create a `ClickLog` directive that logs to the console whenever the host element is clicked.",
        buggyCode: `// ❌ Wrapper Component (Overkill)
@Component({
  selector: 'app-btn',
  template: '<button (click)="log()"><ng-content></ng-content></button>'
})
class Btn { log() { console.log('Clicked'); } }`,
        solutionCode: `// ✅ Directive (Reusable on ANY element)
@Directive({
  selector: '[appLog]',
  standalone: true
})
class LogDirective {
  // Listen to host event
  @HostListener('click') onClick() {
    console.log('Clicked element!');
  }
}
// Usage: <div appLog>...</div> or <button appLog>...</button>`,
        verifyOutput: "HostListener",
        successMessage: "Nice! Now you can add logging behavior to divs, buttons, or even other components without wrapping them.",
        hint: "Use `@HostListener('click')` inside a Directive."
      }
    ]
  },
  content: `
<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🧩 1. Composition over Inheritance</h3>
<p class="mb-6 text-gray-600 dark:text-light-300 leading-relaxed">
In the past, if you wanted a "Draggable Button with a Tooltip", you created a messy inheritance chain.
</p>
<p class="mb-4 text-gray-600 dark:text-light-300 leading-relaxed">
Now, you can just slap directives together:
</p>

<div class="bg-gray-100 dark:bg-dark-800 p-6 rounded-xl border-l-4 border-purple-500 mb-10 font-mono text-sm">
&lt;button appDraggable appTooltip="Save" appRipple&gt;Save&lt;/button&gt;
</div>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🖱️ 2. The "Zone Pollution" Problem</h3>
<p class="mb-4 text-gray-600 dark:text-light-300 leading-relaxed">
Angular listens to every event by default. If you listen to <code>mousemove</code>, Angular runs Change Detection <strong>60 times per second</strong>. Your app will freeze.
</p>

<div class="grid md:grid-cols-2 gap-6 mb-10">
    <div class="bg-red-50 dark:bg-red-900/10 p-5 rounded-xl border border-red-200 dark:border-red-900/30">
        <h4 class="font-bold text-red-800 dark:text-red-300 mb-3">⛔ The Wrapper Way</h4>
        <pre class="text-xs font-mono text-gray-600 dark:text-gray-400">
@HostListener('mousemove')
onMove() {
  // Triggers Global CD
  // Kills Battery
}
        </pre>
    </div>
    <div class="bg-green-50 dark:bg-green-900/10 p-5 rounded-xl border border-green-200 dark:border-green-900/30">
        <h4 class="font-bold text-green-800 dark:text-green-300 mb-3">✅ The Zone-Free Way</h4>
        <pre class="text-xs font-mono text-gray-600 dark:text-gray-400">
ngZone.runOutsideAngular(() => {
  el.addEventListener('mousemove', ...);
  // Zero Angular Overhead
});
        </pre>
    </div>
</div>
`,
  code: `import { Directive, ElementRef, Input, inject, NgZone, Component, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

// --- DRAGGABLE DIRECTIVE ---
@Directive({
  selector: '[appDraggable]',
  standalone: true
})
export class DraggableDirective {
  private el = inject(ElementRef);
  private ngZone = inject(NgZone);
  
  // State
  isDragging = false;
  startX = 0;
  startY = 0;
  initialLeft = 0;
  initialTop = 0;

  constructor() {
    this.el.nativeElement.style.cursor = 'grab';
    this.el.nativeElement.style.position = 'absolute';
    this.el.nativeElement.style.userSelect = 'none';
    
    // We bind mousedown in the zone (to start logic)
    this.el.nativeElement.addEventListener('mousedown', this.onMouseDown.bind(this));
  }

  onMouseDown(e: MouseEvent) {
    this.isDragging = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
    
    const rect = this.el.nativeElement.getBoundingClientRect();
    // Assuming parent is relatively positioned for this demo
    this.initialLeft = this.el.nativeElement.offsetLeft;
    this.initialTop = this.el.nativeElement.offsetTop;

    this.el.nativeElement.style.cursor = 'grabbing';
    this.el.nativeElement.style.zIndex = '1000';
    this.el.nativeElement.style.transform = 'scale(1.05)';
    this.el.nativeElement.style.transition = 'none';

    // Hook up global listeners OUTSIDE Angular to prevent CD spam
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('mouseup', this.onMouseUp);
    });
  }

  // Arrow function to preserve 'this'
  onMouseMove = (e: MouseEvent) => {
    if (!this.isDragging) return;
    
    const dx = e.clientX - this.startX;
    const dy = e.clientY - this.startY;
    
    this.el.nativeElement.style.left = \`\${this.initialLeft + dx}px\`;
    this.el.nativeElement.style.top = \`\${this.initialTop + dy}px\`;
  };

  onMouseUp = () => {
    this.isDragging = false;
    this.el.nativeElement.style.cursor = 'grab';
    this.el.nativeElement.style.zIndex = '';
    this.el.nativeElement.style.transform = '';
    this.el.nativeElement.style.transition = 'transform 0.2s';
    
    // Remove listeners
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  };
}

@Component({
  selector: 'app-directive-demo',
  standalone: true,
  imports: [CommonModule, DraggableDirective],
  template: \`
    <div class="h-[500px] bg-gray-950 p-6 rounded-2xl border border-gray-800 shadow-2xl relative overflow-hidden" 
         style="background-color: #030712; color: white">
        
        <h2 class="text-2xl font-bold text-white mb-2 pointer-events-none select-none">🖱️ Zone-Free Drag</h2>
        <p class="text-gray-500 mb-6 text-sm pointer-events-none select-none">
            These elements are draggable. The drag events happen <strong>outside</strong> Angular's zone for 60fps performance.
        </p>

        <!-- Container for drag area -->
        <div class="absolute inset-0 top-24 pointer-events-none">
             <!-- Note: ponter-events-auto needed on children -->
             
             <!-- Card 1 -->
             <div appDraggable style="left: 50px; top: 50px;" 
                  class="pointer-events-auto absolute w-48 bg-blue-600 rounded-xl p-4 shadow-xl border border-white/10 flex flex-col items-center justify-center gap-2">
                 <div class="text-3xl">🧊</div>
                 <div class="font-bold">Drag Me</div>
                 <div class="text-[10px] bg-black/20 px-2 py-1 rounded">No Change Detection</div>
             </div>

             <!-- Card 2 -->
             <div appDraggable style="left: 300px; top: 100px;" 
                  class="pointer-events-auto absolute w-40 h-40 bg-purple-600 rounded-full p-4 shadow-xl border border-white/10 flex items-center justify-center">
                 <div class="text-center">
                     <div class="text-3xl mb-1">🟣</div>
                     <div class="font-bold text-sm">Me Too</div>
                 </div>
             </div>

             <!-- Card 3 -->
             <div appDraggable style="left: 150px; top: 250px;" 
                  class="pointer-events-auto absolute w-64 bg-gray-800 rounded-xl p-4 shadow-xl border border-green-500/50 flex items-center gap-4">
                 <div class="w-10 h-10 rounded bg-green-500 flex items-center justify-center font-bold text-black">JS</div>
                 <div>
                     <div class="font-bold text-green-400">Pure DOM</div>
                     <div class="text-xs text-gray-400">Direct style manipulation</div>
                 </div>
             </div>
        </div>

        <!-- FPS Counter Simulation -->
        <div class="absolute bottom-4 right-4 text-xs font-mono text-green-500 opacity-50 select-none pointer-events-none">
             Performance: 60 FPS (Zone Free)
        </div>
    </div>
  \`
})
export class DirectiveDemoComponent {
    // Component is empty! All logic is in the directive.
}`,
  comparison: {
    junior: `// ❌ Janky Drag
@HostListener('mousemove', ['$event'])
onMove(e) {
  this.x = e.clientX; // Triggers CD 500 times
}`,
    senior: `// ✅ Smooth Drag
ngZone.runOutsideAngular(() => {
  window.addEventListener('mousemove', (e) => {
    element.style.transform = ...; // Zero CD cost
  });
});`
  },
  interview: {
    questions: [
      {
        q: "What is 'Directive Composition'?",
        a: "A feature in Angular 15+ allowing you to add directives to a host element from *within* another directive (using `hostDirectives`), enabling powerful code reuse without inheritance."
      },
      {
        q: "Why run events outside Angular's Zone?",
        a: "Angular's Zone.js patches global events. High-frequency events like scroll/mousemove trigger Change Detection continuously, killing performance. Running outside Zone bypasses this."
      }
    ]
  }
};
