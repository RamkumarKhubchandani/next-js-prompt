export const day21 = {
  day: 21,
  title: "Animations: The Angular Animations API",
  intro: "Stop using <code>setTimeout</code> for animations. Angular's animation system is built on the Web Animations API (WAAPI) and integrates perfectly with component state.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 21. CSS animations are great, but Angular animations (`@trigger`) let you coordinate complex sequences with your data state."
      },
      {
        type: "talk",
        message: "A common mistake is using `setTimeout` to wait for an animation to finish before removing an item. Angular's `void` state handles this automatically."
      },
      {
        type: "challenge",
        instruction: "Use Angular Animations to fade this element in when it enters the DOM.",
        buggyCode: `// ❌ CSS Class Toggle
@Component({
  template: '<div [class.fade-in]="visible">Hello</div>'
})
class App {
  visible = true;
}`,
        solutionCode: `// ✅ Angular Animation
@Component({
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 }))
      ])
    ])
  ],
  template: '<div @fade>Hello</div>'
})
class App {}`,
        verifyOutput: ":enter",
        successMessage: "Smooth! The `:enter` alias automatically targets elements being added to the DOM.",
        hint: "Define a trigger with `transition(':enter', ...)`."
      }
    ]
  },
  content: `
<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🎬 1. Declarative Animations</h3>
<p class="mb-6 text-gray-600 dark:text-light-300 leading-relaxed">
Don't write imperative code like <code>element.style.opacity = 1</code>. 
Instead, describe the states in metadata: "When state is 'open', style is height: 200px".
Angular handles the tweening.
</p>

<div class="bg-gray-100 dark:bg-dark-800 p-6 rounded-xl border-l-4 border-purple-500 mb-10">
<pre class="text-sm font-mono text-gray-800 dark:text-gray-200">
trigger('openClose', [
  state('open', style({ height: '200px' })),
  state('closed', style({ height: '0px' })),
  transition('open <=> closed', [
    animate('0.5s ease-in-out')
  ])
])
</pre>
</div>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">⚡ 2. Enter and Leave</h3>
<p class="mb-4 text-gray-600 dark:text-light-300 leading-relaxed">
The most powerful feature is animating elements arriving or leaving the DOM (<code>*ngIf</code>, routing). CSS can't do this easily because the element is gone before the transition finishes. Angular waits for the animation to end before removing the element.
</p>
<ul class="list-disc pl-5 mb-6 text-gray-600 dark:text-light-300 space-y-2">
    <li><code>:enter</code> (void => *)</li>
    <li><code>:leave</code> (* => void)</li>
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
