export const basicsQuestions = [
    {
        id: 'angular-basics-1',
        category: 'Basics',
        difficulty: 'Medium',
        question: 'New Control Flow Syntax - @if, @for, @switch (Angular 17+)',
        answer: `Angular 17 introduced **built-in control flow** replacing structural directives.

### Why the Change?
- **Better performance** - No need for structural directives
- **Type safety** - Better TypeScript inference
- **Simpler syntax** - More readable code
- **Smaller bundles** - Built into compiler

### New Syntax:
- **@if** replaces *ngIf
- **@for** replaces *ngFor  
- **@switch** replaces *ngSwitch
- **@defer** for lazy loading

### Key Benefits:
- No CommonModule import needed
- Better change detection
- Improved developer experience
- Automatic track optimization`,
        codeExample: `// New Control Flow (Angular 17+)
console.log('=== @if - Conditional ===');
console.log('OLD: <div *ngIf="isLoggedIn">Welcome!</div>');
console.log('NEW: @if (isLoggedIn) { <div>Welcome!</div> }');

console.log('\\n=== @for - Loops ===');
console.log('OLD: <div *ngFor="let user of users">{{ user.name }}</div>');
console.log('NEW: @for (user of users; track user.id) {');
console.log('  <div>{{ user.name }}</div>');
console.log('} @empty { <div>No users</div> }');

console.log('\\n=== @switch - Multiple Conditions ===');
console.log('@switch (status) {');
console.log('  @case ("active") { <div>Active</div> }');
console.log('  @case ("pending") { <div>Pending</div> }');
console.log('  @default { <div>Unknown</div> }');
console.log('}');

console.log('\\n✓ New control flow: Better performance & type safety');`
    },
    {
        id: 'angular-basics-2',
        category: 'Basics',
        difficulty: 'Hard',
        question: 'Deferrable Views - @defer for Lazy Loading (Angular 17+)',
        answer: `**@defer** enables declarative lazy loading of components and templates.

### Triggers:
- **on idle** - Load when browser is idle
- **on viewport** - Load when element enters viewport
- **on interaction** - Load on click/hover
- **on timer** - Load after delay
- **when condition** - Load when condition is true

### Sub-blocks:
- **@placeholder** - Show before loading
- **@loading** - Show during loading
- **@error** - Show if loading fails

### Use Cases:
- Heavy components (charts, editors)
- Below-the-fold content
- Modal dialogs`,
        codeExample: `// Deferrable Views
console.log('=== @defer - Lazy Loading ===');
console.log('@defer (on viewport) {');
console.log('  <heavy-chart />');
console.log('} @placeholder {');
console.log('  <div>Loading...</div>');
console.log('}');

console.log('\\n=== Performance Impact ===');
console.log('Before @defer: Initial bundle 500KB');
console.log('After @defer: Initial bundle 200KB (60% reduction!)');
console.log('Heavy components loaded on demand');

console.log('\\n✓ @defer: Declarative lazy loading');
console.log('✓ Multiple triggers available');`
    },
    {
        id: 'angular-basics-3',
        category: 'Basics',
        difficulty: 'Medium',
        question: 'Standalone Components - Modern Angular Architecture',
        answer: `**Standalone components** are the default in Angular 18+, eliminating NgModules.

### Key Features:
- \`standalone: true\` (default in Angular 18+)
- \`imports: []\` array for dependencies
- No NgModule needed
- Better tree-shaking

### Benefits:
- Less boilerplate
- Clearer dependencies
- Faster compilation
- Easier lazy loading`,
        codeExample: `// Standalone Components
console.log('=== OLD: NgModule-based ===');
console.log('@NgModule({');
console.log('  declarations: [AppComponent],');
console.log('  imports: [CommonModule]');
console.log('})');

console.log('\\n=== NEW: Standalone (Angular 18+) ===');
console.log('@Component({');
console.log('  selector: "app-user",');
console.log('  standalone: true,');
console.log('  imports: [CommonModule],');
console.log('  template: "<div>{{ user.name }}</div>"');
console.log('})');

console.log('\\n=== Bootstrapping ===');
console.log('bootstrapApplication(AppComponent, {');
console.log('  providers: [provideRouter(routes)]');
console.log('});');

console.log('\\n✓ Standalone: Modern Angular architecture');`
    },
    {
        id: 'angular-basics-4',
        category: 'Basics',
        difficulty: 'Easy',
        question: 'Component Lifecycle Hooks - Complete Guide',
        answer: `Angular components have **lifecycle hooks** for different phases.

### Lifecycle Order:
1. **constructor** - Class instantiation
2. **ngOnChanges** - Input properties change
3. **ngOnInit** - Component initialization
4. **ngAfterViewInit** - View initialized
5. **ngOnDestroy** - Component destroyed

### Most Common:
- **ngOnInit** - Initialization logic
- **ngOnDestroy** - Cleanup (unsubscribe)
- **ngOnChanges** - React to input changes`,
        codeExample: `// Lifecycle Hooks
console.log('=== Lifecycle Order ===');
console.log('1. constructor() - Component created');
console.log('2. ngOnChanges() - @Input changed');
console.log('3. ngOnInit() - Component initialized');
console.log('4. ngAfterViewInit() - View initialized');
console.log('5. ngOnDestroy() - Component destroyed');

console.log('\\n=== Common Patterns ===');
console.log('ngOnInit() {');
console.log('  this.userService.getUsers()');
console.log('    .subscribe(users => this.users = users);');
console.log('}');

console.log('\\nngOnDestroy() {');
console.log('  this.subscription.unsubscribe();');
console.log('}');

console.log('\\n✓ ngOnInit: Initialization');
console.log('✓ ngOnDestroy: Cleanup');`
    },
    {
        id: 'angular-basics-5',
        category: 'Basics',
        difficulty: 'Medium',
        question: 'Component Communication - @Input, @Output, Services',
        answer: `Angular provides **multiple ways** for components to communicate.

### 1. @Input - Parent to Child
Pass data down from parent to child component.

### 2. @Output - Child to Parent  
Emit events up to parent component.

### 3. Services - Any to Any
Share data between unrelated components.

### When to Use:
- **@Input/@Output** - Parent-child relationship
- **Services** - Unrelated components, shared state`,
        codeExample: `// Component Communication
console.log('=== @Input - Parent to Child ===');
console.log('Parent: <child [user]="currentUser" />');
console.log('Child: @Input() user!: User;');

console.log('\\n=== @Output - Child to Parent ===');
console.log('Child: @Output() clicked = new EventEmitter();');
console.log('Parent: <child (clicked)="onUserClick($event)" />');

console.log('\\n=== Service - Shared State ===');
console.log('@Injectable({ providedIn: "root" })');
console.log('class UserService {');
console.log('  private userSubject = new BehaviorSubject(null);');
console.log('  user$ = this.userSubject.asObservable();');
console.log('}');

console.log('\\n✓ @Input/@Output: Parent-child');
console.log('✓ Services: Shared state');`
    },
    {
        id: 'angular-basics-6',
        category: 'Basics',
        difficulty: 'Easy',
        question: 'Data Binding - Interpolation, Property, Event, Two-Way',
        answer: `Angular supports **four types** of data binding.

### 1. Interpolation {{ }}
Display component data in template.

### 2. Property Binding [property]
Bind to element properties.

### 3. Event Binding (event)
Listen to DOM events.

### 4. Two-Way Binding [(ngModel)]
Sync data between component and template.`,
        codeExample: `// Data Binding Types
console.log('=== 1. Interpolation {{ }} ===');
console.log('<h1>{{ title }}</h1>');
console.log('<p>Count: {{ count }}</p>');

console.log('\\n=== 2. Property Binding [property] ===');
console.log('<img [src]="imageUrl" />');
console.log('<button [disabled]="isDisabled">Click</button>');

console.log('\\n=== 3. Event Binding (event) ===');
console.log('<button (click)="onClick()">Click Me</button>');
console.log('<input (input)="onInput($event)" />');

console.log('\\n=== 4. Two-Way Binding [(ngModel)] ===');
console.log('<input [(ngModel)]="name" />');
console.log('<p>Hello, {{ name }}!</p>');

console.log('\\n✓ {{ }}: Display data');
console.log('✓ [property]: Bind properties');
console.log('✓ (event): Handle events');
console.log('✓ [(ngModel)]: Two-way sync');`
    },
    {
        id: 'angular-basics-7',
        category: 'Basics',
        difficulty: 'Medium',
        question: 'Directives - Structural vs Attribute Directives',
        answer: `Angular has **two types** of directives.

### Structural Directives
Modify DOM structure by adding/removing elements.
- *ngIf, *ngFor, *ngSwitch (OLD)
- @if, @for, @switch (NEW - Angular 17+)

### Attribute Directives
Modify appearance or behavior of existing elements.
- ngClass - Dynamic classes
- ngStyle - Dynamic styles
- ngModel - Two-way binding

### Custom Directives
Create your own with @Directive decorator.`,
        codeExample: `// Directives
console.log('=== Structural Directives ===');
console.log('*ngIf: <div *ngIf="isLoggedIn">Welcome!</div>');
console.log('*ngFor: <div *ngFor="let user of users">{{ user.name }}</div>');

console.log('\\n=== Attribute Directives ===');
console.log('ngClass: [ngClass]="{ active: isActive }"');
console.log('ngStyle: [ngStyle]="{ color: textColor }"');

console.log('\\n=== Custom Directive ===');
console.log('@Directive({ selector: "[appHighlight]" })');
console.log('class HighlightDirective {');
console.log('  @HostListener("mouseenter")');
console.log('  onMouseEnter() {');
console.log('    this.el.nativeElement.style.backgroundColor = "yellow";');
console.log('  }');
console.log('}');

console.log('\\n✓ Structural: Modify DOM structure');
console.log('✓ Attribute: Modify element behavior');`
    },
    {
        id: 'angular-basics-8',
        category: 'Basics',
        difficulty: 'Easy',
        question: 'Pipes - Transform Data in Templates',
        answer: `**Pipes** transform data for display in templates.

### Built-in Pipes:
- **DatePipe** - Format dates
- **CurrencyPipe** - Format currency
- **DecimalPipe** - Format numbers
- **AsyncPipe** - Subscribe to observables

### Custom Pipes:
Create with @Pipe decorator.

### Pure vs Impure:
- **Pure** (default) - Only run when input changes
- **Impure** - Run on every change detection`,
        codeExample: `// Pipes
console.log('=== Built-in Pipes ===');
console.log('{{ today | date:"short" }} // 12/27/24, 11:30 AM');
console.log('{{ price | currency:"USD" }} // $99.99');
console.log('{{ 3.14159 | number:"1.2-2" }} // 3.14');

console.log('\\n=== AsyncPipe ===');
console.log('Component: users$ = this.http.get("/api/users");');
console.log('Template: @for (user of users$ | async; track user.id) {');
console.log('  <div>{{ user.name }}</div>');
console.log('}');
console.log('// AsyncPipe auto subscribes/unsubscribes!');

console.log('\\n=== Custom Pipe ===');
console.log('@Pipe({ name: "truncate" })');
console.log('class TruncatePipe {');
console.log('  transform(value: string, limit: number) {');
console.log('    return value.length > limit');
console.log('      ? value.substring(0, limit) + "..."');
console.log('      : value;');
console.log('  }');
console.log('}');

console.log('\\n✓ Pipes: Transform display data');
console.log('✓ AsyncPipe: Auto subscribe/unsubscribe');`
    },
    {
        id: 'angular-basics-9',
        category: 'Basics',
        difficulty: 'Medium',
        question: 'Content Projection - ng-content and Multi-slot Projection',
        answer: `**Content projection** allows passing content into components.

### Basic Projection:
Use \`<ng-content>\` to project content.

### Multi-slot Projection:
Use \`select\` attribute to project to specific slots.

### Use Cases:
- Reusable card components
- Layout components
- Modal dialogs

### Selectors:
- **Element**: \`select="header"\`
- **Class**: \`select=".header"\`
- **Attribute**: \`select="[header]"\``,
        codeExample: `// Content Projection
console.log('=== Basic Projection ===');
console.log('Component:');
console.log('<div class="card">');
console.log('  <ng-content></ng-content>');
console.log('</div>');

console.log('\\nUsage:');
console.log('<app-card>');
console.log('  <h2>Title</h2>');
console.log('  <p>Content</p>');
console.log('</app-card>');

console.log('\\n=== Multi-slot Projection ===');
console.log('Component:');
console.log('<div class="card">');
console.log('  <div class="header">');
console.log('    <ng-content select="[header]"></ng-content>');
console.log('  </div>');
console.log('  <div class="body">');
console.log('    <ng-content select="[body]"></ng-content>');
console.log('  </div>');
console.log('</div>');

console.log('\\nUsage:');
console.log('<app-card>');
console.log('  <div header><h2>Title</h2></div>');
console.log('  <div body><p>Content</p></div>');
console.log('</app-card>');

console.log('\\n✓ ng-content: Project content');
console.log('✓ select: Multi-slot projection');`
    },
    {
        id: 'angular-basics-10',
        category: 'Basics',
        difficulty: 'Hard',
        question: 'Template Reference Variables and ViewChild/ContentChild',
        answer: `Access template elements and components using **template references**.

### Template Reference (#var)
Create reference to element or component in template.

### @ViewChild
Access child component/element from parent class.

### @ContentChild
Access projected content from parent class.

### Timing:
- Available in \`ngAfterViewInit\`
- Not available in \`ngOnInit\`

### Best Practice:
Prefer @Input/@Output over direct access.`,
        codeExample: `// Template References
console.log('=== Template Reference (#var) ===');
console.log('<input #nameInput type="text" />');
console.log('<button (click)="nameInput.focus()">Focus</button>');

console.log('\\n=== @ViewChild ===');
console.log('@Component({');
console.log('  template: "<input #nameInput />"');
console.log('})');
console.log('class AppComponent {');
console.log('  @ViewChild("nameInput") nameInput!: ElementRef;');
console.log('  ');
console.log('  ngAfterViewInit() {');
console.log('    this.nameInput.nativeElement.focus();');
console.log('  }');
console.log('}');

console.log('\\n=== @ContentChild ===');
console.log('@Component({');
console.log('  template: "<ng-content></ng-content>"');
console.log('})');
console.log('class CardComponent {');
console.log('  @ContentChild(HeaderComponent) header!: HeaderComponent;');
console.log('  ');
console.log('  ngAfterContentInit() {');
console.log('    console.log("Header:", this.header);');
console.log('  }');
console.log('}');

console.log('\\n✓ #var: Template references');
console.log('✓ @ViewChild: Component class access');
console.log('✓ Available in ngAfterViewInit');`
    }
];
