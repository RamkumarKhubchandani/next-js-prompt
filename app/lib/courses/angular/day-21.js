export const day21 = {
  day: 21,
  title: "Animations: The Angular Animations API",
  intro: "Bring your UI to life with Angular's powerful animation system. Create smooth transitions, state-based animations, and complex sequences.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎬 Angular Animations</h3>
<p class="mb-4 text-gray-600 dark:text-gray-300">
Angular's animation system is built on Web Animations API, providing declarative animations with full TypeScript support.
</p>

<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-8 font-mono text-sm border-l-4 border-purple-500">
<pre class="text-gray-800 dark:text-gray-100">
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">⚡ Common Animation Patterns</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-8">
  <li><strong class="text-brand-primary">:enter/:leave:</strong> Element added/removed from DOM</li>
  <li><strong class="text-brand-primary">State transitions:</strong> Animate between defined states</li>
  <li><strong class="text-brand-primary">Keyframes:</strong> Multi-step animations</li>
  <li><strong class="text-brand-primary">Stagger:</strong> Animate list items with delay</li>
</ul>
`,
  code: `// Example: Fade in animation
import { trigger, transition, style, animate } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(10px)' }),
    animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
  ])
]);`,
  comparison: {
    junior: `// ❌ CSS classes + setTimeout
element.classList.add('fade-in');
setTimeout(() => element.classList.remove('fade-in'), 300);`,
    senior: `// ✅ Angular animations
@Component({
  animations: [fadeIn]
})
// Template: <div @fadeIn>Content</div>`
  },
  interview: {
    questions: [
      {
        q: "What's the advantage of Angular animations over CSS?",
        a: "TypeScript integration, programmatic control, callbacks (onDone/onStart), and better testing support."
      }
    ]
  }
};
