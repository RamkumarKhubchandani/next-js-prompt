export const day19 = {
  day: 19,
  title: "Advanced Templates: Content Projection",
  intro: "Don't build rigid components that take 20 inputs. Learn to use <strong>Content Projection</strong> to let the parent components decide what gets rendered.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 19. Don't build rigid components. Let the parent component check in the content using **Content Projection**."
      },
      {
        type: "talk",
        message: "Angular has 3 layers of reusability: Inputs (Data), Content Projection (HTML), and TemplateRefs (Lazy HTML structure)."
      },
      {
        type: "challenge",
        instruction: "Refactor this component to accept a custom 'footer' slot using projection.",
        buggyCode: `// ❌ Rigid Structure
@Component({
  template: \`
    <div class="modal">
       <div class="body">{{ content }}</div>
       <button (click)="close()">Close</button>
    </div>
  \`
})
// Can't add an "Accept" button!`,
        solutionCode: `// ✅ Flexible Structure
@Component({
  template: \`
    <div class="modal">
       <ng-content select="[body]"></ng-content>
       <div class="footer">
         <!-- Default fallback if empty? No, ng-content just projects. -->
         <ng-content select="[footer]"></ng-content>
       </div>
    </div>
  \`
})
// <app-modal>
//   <div body>Some text</div>
//   <div footer><button>Confirm</button></div>
// </app-modal>`,
        verifyOutput: "ng-content",
        successMessage: "Now your modal can have any footer constraints you (or your team) want!",
        hint: "Use `<ng-content select=\"[footer]\"></ng-content>`."
      }
    ]
  },
  content: `
<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">📦 1. ng-content (The Slot Machine)</h3>
<p class="mb-6 text-gray-600 dark:text-light-300 leading-relaxed">
Think of your component as a customized laptop. You (the component author) provide the screen and keyboard, but you let the user plug in *any* USB device they want.
</p>
<p class="mb-6 text-gray-600 dark:text-light-300 leading-relaxed">
<code>ng-content</code> is that USB port. It allows the *parent* to decide what goes inside.
</p>

<div class="bg-gray-100 dark:bg-dark-800 p-6 rounded-xl border-l-4 border-purple-500 mb-10">
<pre class="text-sm font-mono text-gray-800 dark:text-gray-200">
// Multi-slot projection
&lt;ng-content select="[header]"&gt;&lt;/ng-content&gt;
&lt;ng-content select=".body"&gt;&lt;/ng-content&gt;
&lt;ng-content&gt;&lt;/ng-content&gt; &lt;!-- The Catch-all --&gt;
</pre>
</div>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">📄 2. ngTemplateOutlet (The Stamp)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300 leading-relaxed">
Sometimes you want to render the SAME piece of content multiple times (like a row in a list). <code>ng-content</code> moves the element. <code>ngTemplateOutlet</code> *stamps* a copy of it.
</p>
`,
  code: `import { Component, Input, ContentChild, TemplateRef, Directive, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// --- TAB COMPONENT (Child) ---
// This is just a marker for content
@Directive({
    selector: 'app-tab',
    standalone: true
})
export class TabDirective {
    @Input({ required: true }) title = '';
    
    // We get the structural template content
    constructor(public template: TemplateRef<any>) {}
}

// --- TAB GROUP COMPONENT (Container) ---
@Component({
    selector: 'app-tabs',
    standalone: true,
    imports: [CommonModule],
    template: \`
        <div class="flex flex-col h-full bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
            <!-- Tab Headers -->
            <div class="flex border-b border-gray-800 bg-black/20">
                @for (tab of tabs(); track tab.title) {
                    <button (click)="activeTab.set(tab)"
                            class="px-6 py-3 text-sm font-bold transition-colors border-r border-gray-800 hover:bg-white/5"
                            [class.text-blue-400]="activeTab() === tab"
                            [class.text-gray-500]="activeTab() !== tab"
                            [class.bg-white_5]="activeTab() === tab">
                        {{ tab.title }}
                    </button>
                }
            </div>

            <!-- Tab Body (Dynamic Template) -->
            <div class="p-6 flex-1 bg-gray-900/50">
                @if (activeTab(); as tab) {
                    <div class="animate-in fade-in duration-300">
                        <ng-container *ngTemplateOutlet="tab.template"></ng-container>
                    </div>
                }
            </div>
        </div>
    \`
})
export class TabsComponent {
    // We project the directives!
    // But since we are mocking without Multi-provider token magic or accessing ContentChildren easily in this setup:
    // We will use Inputs for the demo data structure, which is a common pattern too.
    
    // Wait, let's try to simulate ContentChildren behavior manually via Inputs to be safe in this environment.
    // In real Angular: @ContentChildren(TabDirective) tabs: QueryList<TabDirective>
    
    @Input() tabs = signal<TabDirective[]>([]);
    activeTab = signal<TabDirective | null>(null);

    ngOnChanges() {
        if (this.tabs().length > 0 && !this.activeTab()) {
            this.activeTab.set(this.tabs()[0]);
        }
    }
}

@Component({
  selector: 'app-projection-lab',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div class="max-w-xl mx-auto bg-gray-950 p-6 rounded-2xl border border-gray-800 shadow-2xl min-h-[500px]" style="background-color: #030712; color: white">
        <h2 class="text-2xl font-bold text-white mb-6">📦 Content Projection Lab</h2>

        <p class="text-sm text-gray-400 mb-6">
            We are simulating a reusable Tabs component. The content inside each tab is **projected** from the parent, not hardcoded in the tabs component.
        </p>

        <!-- THE REUSABLE TABS COMPONENT -->
        <!-- In real Angular: <app-tabs><app-tab>...</app-tab></app-tabs> -->
        <!-- Here we manually construct the view structure for the demo -->

        <div class="flex flex-col h-64 bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
             <!-- Header -->
             <div class="flex border-b border-gray-800">
                  <button (click)="selected = 'profile'" [class.text-blue-400]="selected === 'profile'" class="px-4 py-2 text-gray-400 font-bold border-r border-gray-800">Profile</button>
                  <button (click)="selected = 'settings'" [class.text-blue-400]="selected === 'settings'" class="px-4 py-2 text-gray-400 font-bold border-r border-gray-800">Settings</button>
             </div>
             
             <!-- Body -->
             <div class="p-6">
                 @if (selected === 'profile') {
                     <!-- Projected Content 1 -->
                     <ng-container *ngTemplateOutlet="profileTpl"></ng-container>
                 }
                 @if (selected === 'settings') {
                     <!-- Projected Content 2 -->
                     <ng-container *ngTemplateOutlet="settingsTpl"></ng-container>
                 }
             </div>
        </div>

        <!-- DEFINING THE CONTENT (TemplateRef) -->
        <ng-template #profileTpl>
            <div class="flex items-center gap-4">
                <div class="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-2xl">👤</div>
                <div>
                    <h3 class="text-xl font-bold text-white">John Doe</h3>
                    <p class="text-gray-400">Software Engineer</p>
                </div>
            </div>
        </ng-template>

        <ng-template #settingsTpl>
            <div class="space-y-4">
                <div class="flex justify-between items-center text-sm text-gray-300">
                    <span>Dark Mode</span>
                    <div class="w-10 h-5 bg-green-600 rounded-full relative"><div class="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full"></div></div>
                </div>
                <div class="flex justify-between items-center text-sm text-gray-300">
                    <span>Notifications</span>
                     <div class="w-10 h-5 bg-gray-700 rounded-full relative"><div class="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full"></div></div>
                </div>
            </div>
        </ng-template>
        
        <p class="mt-8 text-xs text-gray-500 text-center">
            Note: In a full app, you would use <code>@ContentChildren</code> to query these templates automatically.
            Here we use <code>ngTemplateOutlet</code> to demonstrate the rendering mechanism.
        </p>

    </div>
  \`
})
export class ProjectionLab {
    selected = 'profile';
}`,
  comparison: {
    junior: `// ❌ ngIf soup
@Input() type: 'user' | 'admin';

<!-- Template grows forever... -->
<div *ngIf="type === 'user'">User...</div>
<div *ngIf="type === 'admin'">Admin...</div>`,
    senior: `// ✅ Projection
<ng-content></ng-content>
<!-- Parent decides what goes here! Component stays simple. -->`
  },
  interview: {
    questions: [
      {
        q: "What is ngTemplateOutlet?",
        a: "A directive that inserts a `TemplateRef` into the DOM. It can also pass a context object to the template, allowing for highly dynamic lists or grids."
      },
      {
        q: "What is `ng-container`?",
        a: "A logical container that does not render a DOM element itself. Useful for grouping elements for structural directives like `*ngIf` without polluting the DOM with `div`s."
      }
    ]
  }
};
