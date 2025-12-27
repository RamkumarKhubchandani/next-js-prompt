export const ssrQuestions = [
    {
        id: 'angular-ssr-1',
        category: 'SSR & Hydration',
        difficulty: 'Hard',
        question: 'Server-Side Rendering (SSR) - Angular Universal',
        answer: `**SSR** renders Angular on the server.

### Benefits:
- Better SEO
- Faster initial load
- Social media previews

### Setup:
\`ng add @angular/ssr\`

### Considerations:
- No window/document access
- Use isPlatformBrowser()`,
        codeExample: `// Server-Side Rendering
console.log('=== Setup SSR ===');
console.log('ng add @angular/ssr');

console.log('\\n=== Platform Check ===');
console.log('import { isPlatformBrowser } from "@angular/common";');
console.log('import { PLATFORM_ID } from "@angular/core";');
console.log('');
console.log('class Component {');
console.log('  platformId = inject(PLATFORM_ID);');
console.log('  ');
console.log('  ngOnInit() {');
console.log('    if (isPlatformBrowser(this.platformId)) {');
console.log('      // Browser-only code');
console.log('      window.localStorage.getItem("key");');
console.log('    }');
console.log('  }');
console.log('}');

console.log('\\n=== Build & Serve ===');
console.log('npm run build:ssr');
console.log('npm run serve:ssr');

console.log('\\n✓ SSR: Better SEO, faster initial load');`
    },
    {
        id: 'angular-ssr-2',
        category: 'SSR & Hydration',
        difficulty: 'Expert',
        question: 'Incremental Hydration - Deferrable Views with SSR (Angular 17+)',
        answer: `**Incremental hydration** hydrates components progressively.

### How It Works:
- Server renders all
- Client hydrates on-demand
- Uses @defer triggers

### Benefits:
- Faster Time to Interactive
- Lower JavaScript execution
- Better performance`,
        codeExample: `// Incremental Hydration
console.log('=== Deferrable Views with SSR ===');
console.log('@defer (on viewport) {');
console.log('  <heavy-component />');
console.log('} @placeholder {');
console.log('  <div>Loading...</div>');
console.log('}');
console.log('');
console.log('// Server: Renders placeholder');
console.log('// Client: Hydrates when in viewport');

console.log('\\n=== Performance Impact ===');
console.log('Traditional SSR:');
console.log('  - Hydrate all components immediately');
console.log('  - Large JavaScript execution');
console.log('');
console.log('Incremental Hydration:');
console.log('  - Hydrate on-demand');
console.log('  - Smaller initial JavaScript');
console.log('  - Faster Time to Interactive');

console.log('\\n✓ Incremental hydration: Progressive loading');`
    },
    {
        id: 'angular-ssr-3',
        category: 'SSR & Hydration',
        difficulty: 'Hard',
        question: 'Event Replay - Non-destructive Hydration (Angular 18+)',
        answer: `**Event replay** captures events before hydration.

### Problem:
Events fired before hydration are lost.

### Solution:
Event replay captures and replays events.

### Benefits:
- No lost interactions
- Better UX
- Automatic in Angular 18+`,
        codeExample: `// Event Replay
console.log('=== Traditional Hydration ===');
console.log('1. Server renders page');
console.log('2. User clicks button');
console.log('3. Nothing happens (not hydrated yet)');
console.log('4. Hydration completes');
console.log('5. Click is lost');

console.log('\\n=== Event Replay (Angular 18+) ===');
console.log('1. Server renders page');
console.log('2. User clicks button');
console.log('3. Event is captured');
console.log('4. Hydration completes');
console.log('5. Event is replayed');
console.log('6. Click handler executes');

console.log('\\n=== Enable Event Replay ===');
console.log('bootstrapApplication(App, {');
console.log('  providers: [');
console.log('    provideClientHydration(withEventReplay())');
console.log('  ]');
console.log('});');

console.log('\\n✓ Event replay: No lost interactions');
console.log('✓ Automatic in Angular 18+');`
    }
];
