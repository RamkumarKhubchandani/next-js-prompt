export const advancedPatternsQuestions = [
    {
        id: 'angular-advanced-1',
        category: 'Advanced Patterns',
        difficulty: 'Expert',
        question: 'Host Directives - Composing Directive Behavior (Angular 15+)',
        answer: `**Host directives** compose directive behavior.

### Use Cases:
- Add behavior to components
- Reuse directive logic
- Composition over inheritance

### Benefits:
- Better code reuse
- Cleaner architecture`,
        codeExample: `// Host Directives
console.log('=== Creating Host Directive ===');
console.log('@Directive({ selector: "[appTooltip]" })');
console.log('class TooltipDirective {');
console.log('  @Input() tooltip = "";');
console.log('}');

console.log('\\n=== Using Host Directive ===');
console.log('@Component({');
console.log('  hostDirectives: [');
console.log('    { directive: TooltipDirective, inputs: ["tooltip"] }');
console.log('  ]');
console.log('})');
console.log('class ButtonComponent {}');

console.log('\\n=== Usage ===');
console.log('<app-button tooltip="Click me!" />');

console.log('\\n✓ Host directives: Compose behavior');`
    },
    {
        id: 'angular-advanced-2',
        category: 'Advanced Patterns',
        difficulty: 'Hard',
        question: 'Dynamic Components - ComponentRef and ViewContainerRef',
        answer: `**Dynamic components** create components at runtime.

### APIs:
- **ViewContainerRef** - Container for components
- **ComponentRef** - Component reference

### Use Cases:
- Modals
- Dynamic forms
- Plugin systems`,
        codeExample: `// Dynamic Components
console.log('=== Creating Dynamic Component ===');
console.log('class HostComponent {');
console.log('  viewContainer = inject(ViewContainerRef);');
console.log('  ');
console.log('  loadComponent() {');
console.log('    this.viewContainer.clear();');
console.log('    const componentRef = this.viewContainer.createComponent(');
console.log('      DynamicComponent');
console.log('    );');
console.log('    componentRef.instance.data = "Hello";');
console.log('  }');
console.log('}');

console.log('\\n✓ Dynamic components: Runtime creation');`
    },
    {
        id: 'angular-advanced-3',
        category: 'Advanced Patterns',
        difficulty: 'Expert',
        question: 'Custom Structural Directives - TemplateRef and ViewContainerRef',
        answer: `**Custom structural directives** manipulate template structure.

### APIs:
- **TemplateRef** - Template reference
- **ViewContainerRef** - View container

### Use Cases:
- Custom *ngIf
- Permission-based rendering`,
        codeExample: `// Custom Structural Directive
console.log('=== Creating Directive ===');
console.log('@Directive({ selector: "[appUnless]" })');
console.log('class UnlessDirective {');
console.log('  constructor(');
console.log('    private templateRef: TemplateRef<any>,');
console.log('    private viewContainer: ViewContainerRef');
console.log('  ) {}');
console.log('  ');
console.log('  @Input() set appUnless(condition: boolean) {');
console.log('    if (!condition) {');
console.log('      this.viewContainer.createEmbeddedView(this.templateRef);');
console.log('    } else {');
console.log('      this.viewContainer.clear();');
console.log('    }');
console.log('  }');
console.log('}');

console.log('\\n=== Usage ===');
console.log('<div *appUnless="isHidden">Visible</div>');

console.log('\\n✓ Custom directives: Template manipulation');`
    },
    {
        id: 'angular-advanced-4',
        category: 'Advanced Patterns',
        difficulty: 'Hard',
        question: 'Attribute Directives with HostBinding and HostListener',
        answer: `**HostBinding/HostListener** create interactive directives.

### Decorators:
- **@HostBinding** - Bind to host properties
- **@HostListener** - Listen to host events

### Use Cases:
- Highlight on hover
- Click outside
- Drag and drop`,
        codeExample: `// HostBinding & HostListener
console.log('=== Interactive Directive ===');
console.log('@Directive({ selector: "[appHighlight]" })');
console.log('class HighlightDirective {');
console.log('  @HostBinding("style.backgroundColor")');
console.log('  backgroundColor = "";');
console.log('  ');
console.log('  @HostListener("mouseenter")');
console.log('  onMouseEnter() {');
console.log('    this.backgroundColor = "yellow";');
console.log('  }');
console.log('  ');
console.log('  @HostListener("mouseleave")');
console.log('  onMouseLeave() {');
console.log('    this.backgroundColor = "";');
console.log('  }');
console.log('}');

console.log('\\n✓ HostBinding/HostListener: Interactive directives');`
    },
    {
        id: 'angular-advanced-5',
        category: 'Advanced Patterns',
        difficulty: 'Expert',
        question: 'Renderer2 - Safe DOM Manipulation',
        answer: `**Renderer2** provides safe DOM manipulation.

### Why Use Renderer2:
- Platform-agnostic
- SSR-compatible
- Security

### Methods:
- createElement, createText
- appendChild, removeChild
- setStyle, addClass`,
        codeExample: `// Renderer2
console.log('=== Using Renderer2 ===');
console.log('class Component {');
console.log('  renderer = inject(Renderer2);');
console.log('  el = inject(ElementRef);');
console.log('  ');
console.log('  addElement() {');
console.log('    const div = this.renderer.createElement("div");');
console.log('    const text = this.renderer.createText("Hello");');
console.log('    this.renderer.appendChild(div, text);');
console.log('    this.renderer.appendChild(this.el.nativeElement, div);');
console.log('  }');
console.log('  ');
console.log('  setStyle() {');
console.log('    this.renderer.setStyle(');
console.log('      this.el.nativeElement,');
console.log('      "color",');
console.log('      "red"');
console.log('    );');
console.log('  }');
console.log('}');

console.log('\\n✓ Renderer2: Safe, platform-agnostic DOM manipulation');`
    }
];
