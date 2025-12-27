export const animationsQuestions = [
    {
        id: 'angular-animations-1',
        category: 'Animations',
        difficulty: 'Medium',
        question: 'Angular Animations - trigger, state, transition',
        answer: `**Angular Animations** provide declarative animations.

### Core Concepts:
- **trigger** - Animation name
- **state** - Define states
- **transition** - State changes
- **animate** - Animation timing

### Setup:
Import BrowserAnimationsModule`,
        codeExample: `// Angular Animations
console.log('=== Basic Animation ===');
console.log('import { trigger, state, style, transition, animate } from "@angular/animations";');
console.log('');
console.log('@Component({');
console.log('  animations: [');
console.log('    trigger("fade", [');
console.log('      state("in", style({ opacity: 1 })),');
console.log('      state("out", style({ opacity: 0 })),');
console.log('      transition("in => out", animate("300ms")),');
console.log('      transition("out => in", animate("300ms"))');
console.log('    ])');
console.log('  ]');
console.log('})');

console.log('\\n=== Template ===');
console.log('<div [@fade]="isVisible ? \'in\' : \'out\'">');
console.log('  Content');
console.log('</div>');

console.log('\\n✓ Animations: Declarative, performant');`
    },
    {
        id: 'angular-animations-2',
        category: 'Animations',
        difficulty: 'Hard',
        question: 'Route Animations - Animating Route Transitions',
        answer: `**Route animations** animate between routes.

### Implementation:
- Define animation
- Add to router-outlet
- Use route data

### Common Patterns:
- Slide
- Fade
- Scale`,
        codeExample: `// Route Animations
console.log('=== Route Animation ===');
console.log('export const slideAnimation = trigger("routeAnimations", [');
console.log('  transition("* <=> *", [');
console.log('    style({ position: "relative" }),');
console.log('    query(":enter, :leave", [');
console.log('      style({');
console.log('        position: "absolute",');
console.log('        top: 0,');
console.log('        left: 0,');
console.log('        width: "100%"');
console.log('      })');
console.log('    ]),');
console.log('    query(":enter", [style({ left: "100%" })]),');
console.log('    group([');
console.log('      query(":leave", [animate("300ms", style({ left: "-100%" }))]),');
console.log('      query(":enter", [animate("300ms", style({ left: "0%" }))])');
console.log('    ])');
console.log('  ])');
console.log(']);');

console.log('\\n=== Template ===');
console.log('<div [@routeAnimations]="outlet.activatedRouteData">');
console.log('  <router-outlet #outlet="outlet"></router-outlet>');
console.log('</div>');

console.log('\\n✓ Route animations: Smooth transitions');`
    },
    {
        id: 'angular-animations-3',
        category: 'Animations',
        difficulty: 'Expert',
        question: 'List Animations - Stagger and Query',
        answer: `**List animations** animate list items.

### Techniques:
- **query** - Select elements
- **stagger** - Delay between items
- **animateChild** - Trigger child animations

### Use Cases:
- List enter/leave
- Staggered reveals`,
        codeExample: `// List Animations
console.log('=== Stagger Animation ===');
console.log('trigger("listAnimation", [');
console.log('  transition("* => *", [');
console.log('    query(":enter", [');
console.log('      style({ opacity: 0, transform: "translateY(-20px)" }),');
console.log('      stagger(100, [');
console.log('        animate("300ms", style({');
console.log('          opacity: 1,');
console.log('          transform: "translateY(0)"');
console.log('        }))');
console.log('      ])');
console.log('    ], { optional: true })');
console.log('  ])');
console.log(']);');

console.log('\\n=== Template ===');
console.log('<div [@listAnimation]="items.length">');
console.log('  @for (item of items; track item.id) {');
console.log('    <div>{{ item.name }}</div>');
console.log('  }');
console.log('</div>');

console.log('\\n✓ List animations: Staggered, smooth');`
    }
];
