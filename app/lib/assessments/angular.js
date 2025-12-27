export const angularAssessment = {
    id: "angular-certification",
    title: "Angular Certification",
    description: "Demonstrate your proficiency in Angular's opinionated structure, Signals, RxJS, and Dependency Injection.",
    questions: [
        {
            id: "ng-1",
            question: "What is the purpose of the `@Component` decorator?",
            options: [
                "To define a service",
                "To mark a class as an Angular component and provide metadata (selector, template, styles)",
                "To import modules",
                "To create a route"
            ],
            correctAnswer: 1,
            explanation: "The `@Component` decorator identifies the class immediately below it as a component class, and specifies its metadata."
        },
        {
            id: "ng-2",
            question: "What is Dependency Injection (DI) in Angular?",
            options: [
                "A way to inject CSS",
                "A design pattern where dependencies (services) are provided to a class rather than the class creating them itself",
                "A way to inject HTML",
                "A build tool"
            ],
            correctAnswer: 1,
            explanation: "DI is a core concept in Angular. It allows you to keep your component classes lean and efficient. They don't fetch data from the server, validate user input, or log directly to the console; they delegate such tasks to services."
        },
        {
            id: "ng-3",
            question: "What is the difference between `ngOnInit` and the `constructor`?",
            options: [
                "They are the same",
                "The constructor is for class initialization (DI), `ngOnInit` is for Angular initialization (logic after inputs are set)",
                "`ngOnInit` runs first",
                "The constructor is deprecated"
            ],
            correctAnswer: 1,
            explanation: "The constructor should only be used to initialize class members but shouldn't do actual work. `ngOnInit` is a lifecycle hook called by Angular to indicate that Angular is done creating the component."
        },
        {
            id: "ng-4",
            question: "What is a Structural Directive?",
            options: [
                "A directive that changes the appearance of an element",
                "A directive that changes the DOM layout by adding and removing DOM elements (e.g., *ngIf, *ngFor)",
                "A component",
                "A service"
            ],
            correctAnswer: 1,
            explanation: "Structural directives are responsible for HTML layout. They shape or reshape the DOM's structure, typically by adding, removing, or manipulating elements."
        },
        {
            id: "ng-5",
            question: "What is the purpose of `OnPush` change detection?",
            options: [
                "To run change detection every second",
                "To optimize performance by only checking the component when inputs change reference or an event occurs",
                "To disable change detection",
                "To push data to the server"
            ],
            correctAnswer: 1,
            explanation: "OnPush is a change detection strategy that tells Angular to only check this component when its input properties change (by reference) or when an event originates from the component."
        },
        {
            id: "ng-6",
            question: "What are Angular Signals?",
            options: [
                "A way to send HTTP requests",
                "A reactive primitive for managing state and notifying consumers of changes (fine-grained reactivity)",
                "A routing mechanism",
                "A security feature"
            ],
            correctAnswer: 1,
            explanation: "Signals are a system that granularly tracks how and where your state is used throughout an application, allowing the framework to optimize rendering updates."
        },
        {
            id: "ng-7",
            question: "What is the difference between an Observable and a Promise?",
            options: [
                "Promises are multi-value, Observables are single-value",
                "Observables are lazy and can emit multiple values over time; Promises are eager and emit a single value",
                "They are identical",
                "Observables are deprecated"
            ],
            correctAnswer: 1,
            explanation: "Observables are declarative—computation does not start until subscription. Promises execute immediately on creation. Observables provide many values. Promises provide one."
        },
        {
            id: "ng-8",
            question: "What is a Pipe in Angular?",
            options: [
                "A way to connect components",
                "A class used to transform data in templates (e.g., formatting dates, currency)",
                "A data stream",
                "A service"
            ],
            correctAnswer: 1,
            explanation: "Pipes are simple functions to use in template expressions to accept an input value and return a transformed value."
        },
        {
            id: "ng-9",
            question: "What is the purpose of `trackBy` in `*ngFor`?",
            options: [
                "To track user clicks",
                "To improve performance by preventing Angular from re-rendering the entire list when items change",
                "To sort the list",
                "To filter the list"
            ],
            correctAnswer: 1,
            explanation: "`trackBy` takes a function that returns a unique identifier for each item. Angular uses this to identify which items have been added, removed, or moved, avoiding unnecessary DOM churn."
        },
        {
            id: "ng-10",
            question: "What is a Guard in Angular Routing?",
            options: [
                "A security guard",
                "An interface to control navigation (e.g., `CanActivate` to check if a user is logged in)",
                "A firewall",
                "A layout component"
            ],
            correctAnswer: 1,
            explanation: "Guards are used to protect routes. They can allow or deny navigation to or from a route based on certain conditions."
        },
        {
            id: "ng-11",
            question: "What is the `async` pipe?",
            options: [
                "A pipe that makes code run faster",
                "A pipe that subscribes to an Observable or Promise and returns the latest value",
                "A pipe for async/await",
                "A pipe for error handling"
            ],
            correctAnswer: 1,
            explanation: "The `async` pipe subscribes to an `Observable` or `Promise` and returns the latest value it has emitted. When a new value is emitted, the `async` pipe marks the component to be checked for changes."
        },
        {
            id: "ng-12",
            question: "What is ViewEncapsulation?",
            options: [
                "Hiding the view",
                "A mechanism to control how styles are applied to components (Emulated, ShadowDom, None)",
                "Encrypting the view",
                "Compressing the view"
            ],
            correctAnswer: 1,
            explanation: "View encapsulation defines whether the template and styles defined within the component can affect the whole application or vice versa."
        },
        {
            id: "ng-13",
            question: "What is the difference between `@Input` and `@Output`?",
            options: [
                "`@Input` sends data out, `@Output` takes data in",
                "`@Input` allows data to flow into a component, `@Output` allows the component to emit events to the parent",
                "They are the same",
                "`@Output` is for services"
            ],
            correctAnswer: 1,
            explanation: "`@Input` and `@Output` are decorators that allow Angular components to share data. `@Input` is for receiving data, `@Output` is for sending data (events)."
        },
        {
            id: "ng-14",
            question: "What is a Service in Angular?",
            options: [
                "A component",
                "A broad category encompassing any value, function, or feature that an app needs (typically a class with a narrow, well-defined purpose)",
                "A server",
                "A database"
            ],
            correctAnswer: 1,
            explanation: "Services are a fundamental category of objects in Angular. They are typically used to share data or logic across components."
        },
        {
            id: "ng-15",
            question: "What is `ng-content` used for?",
            options: [
                "To display content from the server",
                "To project content (content projection) from a parent into a child component",
                "To import content",
                "To style content"
            ],
            correctAnswer: 1,
            explanation: "`ng-content` is used for content projection. It acts as a placeholder for the content that is passed between the opening and closing tags of a component."
        },
        {
            id: "ng-16",
            question: "What is the purpose of `RouterModule`?",
            options: [
                "To create a router",
                "To configure the router service and declare the router directives",
                "To make HTTP requests",
                "To manage state"
            ],
            correctAnswer: 1,
            explanation: "`RouterModule` is a separate Angular module that provides the necessary service providers and directives for navigating through application views."
        },
        {
            id: "ng-17",
            question: "What is a Standalone Component?",
            options: [
                "A component that has no friends",
                "A component that does not need to be declared in an NgModule",
                "A component that runs offline",
                "A deprecated feature"
            ],
            correctAnswer: 1,
            explanation: "Standalone components provide a simplified way to build Angular applications by reducing the need for NgModules."
        },
        {
            id: "ng-18",
            question: "What is the `Subject` in RxJS?",
            options: [
                "The topic of the stream",
                "A special type of Observable that allows values to be multicasted to many Observers",
                "A promise",
                "A function"
            ],
            correctAnswer: 1,
            explanation: "A Subject is like an Observable, but can multicast to many Observers. Subjects are like EventEmitters: they maintain a registry of many listeners."
        },
        {
            id: "ng-19",
            question: "How do you unsubscribe from an Observable to prevent memory leaks?",
            options: [
                "You don't need to",
                "Call `.unsubscribe()` on the subscription, or use the `async` pipe, or `takeUntilDestroyed`",
                "Delete the component",
                "Refresh the page"
            ],
            correctAnswer: 1,
            explanation: "It is crucial to unsubscribe from long-lived observables to prevent memory leaks. The `async` pipe handles this automatically."
        },
        {
            id: "ng-20",
            question: "What is the purpose of `environment.ts`?",
            options: [
                "To store global variables",
                "To define configuration variables for different environments (dev, prod)",
                "To store secrets",
                "To list dependencies"
            ],
            correctAnswer: 1,
            explanation: "Angular CLI uses `environment.ts` files to manage configuration settings for different build environments (e.g., development vs production)."
        }
    ]
};
