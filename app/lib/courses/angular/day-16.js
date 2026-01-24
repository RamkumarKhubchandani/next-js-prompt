export const day16 = {
  day: 16,
  title: "Modern Routing: Inputs & View Transitions",
  intro: "Reading route params like `this.route.params.subscribe()` is the old way. Today, we switch to **Component Input Binding** and free Native animations with **View Transitions**.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 16. Stop writing `route.paramMap.subscribe()`. It's boilerplate. Angular 16+ lets you bind params directly to `@Input()`."
      },
      {
        type: "talk",
        message: "Also, we can now use the native browser **View Transitions API** to animate navigations automatically."
      },
      {
        type: "challenge",
        instruction: "Refactor this component to use Router Inputs instead of `ActivatedRoute` servce.",
        buggyCode: `// ❌ Old boilerplate style
@Component({...})
export class ProductPage {
  id$ = this.route.paramMap.pipe(
    map(params => params.get('id'))
  );
  constructor(private route: ActivatedRoute) {}
}`,
        solutionCode: `// ✅ Modern Input Binding
@Component({...})
export class ProductPage {
  // Matches /products/:id
  @Input() id!: string; 
  
  // Or with Signals
  // id = input.required<string>();
}`,
        verifyOutput: "@Input",
        successMessage: "So much cleaner! The router automatically pushes the parameter value into your component input.",
        hint: "Use `@Input()` matching the parameter name."
      }
    ]
  },
  content: `
<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🔗 1. Component Input Binding</h3>
<p class="mb-6 text-gray-600 dark:text-light-300 leading-relaxed">
If your route is <code>path: 'product/:id'</code>, you shouldn't have to inject <code>ActivatedRoute</code> to get the ID. Angular can just give it to you as an <code>@Input()</code>.
</p>

<div class="bg-gray-100 dark:bg-dark-800 p-6 rounded-xl border-l-4 border-purple-500 mb-10">
<pre class="text-sm font-mono text-gray-800 dark:text-gray-200">
// app.config.ts
provideRouter(routes, withComponentInputBinding());

// product.component.ts
@Input() id!: string; // Done!
</pre>
</div>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">✨ 2. View Transitions API</h3>
<p class="mb-4 text-gray-600 dark:text-light-300 leading-relaxed">
Want your app to feel like a native mobile app? Enable View Transitions. The browser will automatically morph the old page into the new page.
</p>
<div class="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl">
    <p class="text-sm text-blue-700 dark:text-blue-300">
        <strong>Tip:</strong> Give two elements on different pages the same <code>view-transition-name</code> (like 'hero-image'), and they will fly across the screen to morph into each other.
    </p>
</div>
`,
  code: `import { Component, Input, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

// --- MOCK ROUTER (Simulation) ---
// Since we are in a single file without a real router, we simulate the effect
// of "Router Input Binding" and "View Transitions".

@Component({
  selector: 'app-gallery-detail',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <!-- The hero image will morph from the list view! -->
    <div class="p-6 bg-gray-900 rounded-2xl border border-gray-800 animate-in fade-in zoom-in duration-300">
        <button (click)="back.emit()" class="mb-4 text-sm text-gray-400 hover:text-white">← Back</button>
        
        <div class="flex gap-6 items-start">
            <img [src]="item.img" 
                 class="w-40 h-40 rounded-xl object-cover shadow-2xl" 
                 [style.view-transition-name]="'img-' + item.id" />
            
            <div>
                <h2 class="text-3xl font-bold text-white mb-2" [style.view-transition-name]="'title-' + item.id">{{ item.title }}</h2>
                <p class="text-gray-400">Router Input ID: <code class="text-blue-400">{{ id }}</code></p>
                <p class="text-gray-500 mt-4 leading-relaxed">
                    This detailed view received the ID via <code>@Input()</code> binding. 
                    If this were a real router, the URL would be <code>/gallery/{{id}}</code>.
                </p>
            </div>
        </div>
    </div>
  \`
})
class DetailView {
    @Input({ required: true }) id!: string;
    @Input({ required: true }) item!: any;
    @Input() back: any = { emit: () => {} }; // Mock Output
}

@Component({
  selector: 'app-router-lab',
  standalone: true,
  imports: [CommonModule, DetailView],
  template: \`
    <div class="max-w-2xl mx-auto bg-gray-950 p-6 rounded-2xl border border-gray-800 shadow-2xl min-h-[500px]" style="background-color: #030712; color: white">
        <h2 class="text-2xl font-bold text-white mb-6">✨ Router Inputs & Transitions</h2>

        @if (!selectedId()) {
            <!-- LIST VIEW -->
            <div class="grid grid-cols-2 gap-4">
                @for (item of items; track item.id) {
                    <div (click)="navigate(item.id)" 
                         class="group p-4 bg-gray-900 rounded-xl border border-gray-800 hover:border-blue-500/50 cursor-pointer transition-all hover:bg-gray-800">
                        
                        <!-- These elements have view-transition-names -->
                        <img [src]="item.img" 
                             class="w-full h-32 rounded-lg object-cover mb-3 grayscale group-hover:grayscale-0 transition-all" 
                             [style.view-transition-name]="'img-' + item.id" />
                        
                        <h3 class="font-bold text-white group-hover:text-blue-400" 
                            [style.view-transition-name]="'title-' + item.id">
                            {{ item.title }}
                        </h3>
                    </div>
                }
            </div>
            
            <p class="mt-8 text-center text-xs text-gray-500">
                Click an item to "Navigate". Notice how we pass data cleanly.
            </p>
        } @else {
            <!-- DETAIL VIEW (Routed Component) -->
            <app-gallery-detail 
                [id]="selectedId()!" 
                [item]="getSelectedItem()" 
                (back)="selectedId.set(null)">
            </app-gallery-detail>
        }
    </div>
  \`
})
export class RouterLab {
    selectedId = signal<string | null>(null);

    items = [
        { id: '1', title: 'Neon Cyber', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=80' },
        { id: '2', title: 'Future City', img: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=400&q=80' },
        { id: '3', title: 'Tech Core', img: 'https://images.unsplash.com/photo-1592478411213-61535fdd861d?w=400&q=80' },
        { id: '4', title: 'Abstract AI', img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&q=80' }
    ];

    navigate(id: string) {
        // In a real app: router.navigate(['/gallery', id])
        // Here we simulate the state change
        if (document.startViewTransition) {
            document.startViewTransition(() => {
                this.selectedId.set(id);
            });
        } else {
            this.selectedId.set(id);
        }
    }

    getSelectedItem() {
        return this.items.find(i => i.id === this.selectedId());
    }
}`,
  comparison: {
    junior: `// ❌ Boilerplate Hell
constructor(private route: ActivatedRoute) {
  route.params.subscribe(p => {
    this.id = p['id'];
  });
}`,
    senior: `// ✅ Component Inputs
@Input() id!: string;`
  },
  interview: {
    questions: [
      {
        q: "How do you enable Component Input Binding?",
        a: "In `app.config.ts`, add `withComponentInputBinding()` to the `provideRouter` function."
      },
      {
        q: "What is `view-transition-name`?",
        a: "A CSS property used by the View Transitions API to match elements between two different DOM states (pages), allowing the browser to morph one into the other."
      }
    ]
  }
};
