export const routingQuestions = [
    {
        id: 'angular-routing-1',
        category: 'Routing',
        difficulty: 'Medium',
        question: 'Lazy Loading Routes - loadComponent and loadChildren',
        answer: `**Lazy loading** loads routes on-demand for better performance.

### Standalone Components:
- **loadComponent** - Lazy load component
- **loadChildren** - Lazy load routes

### Benefits:
- Smaller initial bundle
- Faster load time
- Better code splitting

### Best Practice:
Lazy load feature modules`,
        codeExample: `// Lazy Loading
console.log('=== loadComponent (Standalone) ===');
console.log('const routes = [');
console.log('  {');
console.log('    path: "admin",');
console.log('    loadComponent: () =>');
console.log('      import("./admin/admin.component")');
console.log('        .then(m => m.AdminComponent)');
console.log('  }');
console.log('];');

console.log('\\n=== loadChildren (Routes) ===');
console.log('const routes = [');
console.log('  {');
console.log('    path: "dashboard",');
console.log('    loadChildren: () =>');
console.log('      import("./dashboard/routes")');
console.log('        .then(m => m.DASHBOARD_ROUTES)');
console.log('  }');
console.log('];');

console.log('\\n✓ Lazy loading: Better performance');`
    },
    {
        id: 'angular-routing-2',
        category: 'Routing',
        difficulty: 'Hard',
        question: 'Functional Route Guards - canActivate, canMatch (Angular 15+)',
        answer: `**Functional guards** replace class-based guards.

### Guard Types:
- **canActivate** - Can access route
- **canMatch** - Can match route
- **canDeactivate** - Can leave route

### Benefits:
- Simpler syntax
- Better tree-shaking
- Composable

### Use inject() for dependencies`,
        codeExample: `// Functional Guards
console.log('=== canActivate Guard ===');
console.log('export const authGuard: CanActivateFn = () => {');
console.log('  const authService = inject(AuthService);');
console.log('  const router = inject(Router);');
console.log('  ');
console.log('  if (authService.isAuthenticated()) {');
console.log('    return true;');
console.log('  }');
console.log('  return router.createUrlTree(["/login"]);');
console.log('};');

console.log('\\n=== Using Guard ===');
console.log('const routes = [');
console.log('  {');
console.log('    path: "admin",');
console.log('    canActivate: [authGuard],');
console.log('    loadComponent: () => import("./admin")');
console.log('  }');
console.log('];');

console.log('\\n✓ Functional guards: Modern, simpler');`
    },
    {
        id: 'angular-routing-3',
        category: 'Routing',
        difficulty: 'Medium',
        question: 'Route Resolvers - Prefetch Data Before Navigation',
        answer: `**Resolvers** load data before activating route.

### Benefits:
- Data ready before component loads
- Better UX
- Error handling before navigation

### Use ResolveFn (functional)`,
        codeExample: `// Route Resolvers
console.log('=== Functional Resolver ===');
console.log('export const userResolver: ResolveFn<User> = (route) => {');
console.log('  const userService = inject(UserService);');
console.log('  const id = route.paramMap.get("id")!;');
console.log('  return userService.getUser(id);');
console.log('};');

console.log('\\n=== Using Resolver ===');
console.log('const routes = [');
console.log('  {');
console.log('    path: "user/:id",');
console.log('    resolve: { user: userResolver },');
console.log('    loadComponent: () => import("./user")');
console.log('  }');
console.log('];');

console.log('\\n=== Accessing Resolved Data ===');
console.log('class UserComponent {');
console.log('  route = inject(ActivatedRoute);');
console.log('  user = this.route.snapshot.data["user"];');
console.log('}');

console.log('\\n✓ Resolvers: Prefetch data');`
    },
    {
        id: 'angular-routing-4',
        category: 'Routing',
        difficulty: 'Hard',
        question: 'Router State Management - ActivatedRoute and Router',
        answer: `**Router state** provides navigation information.

### Services:
- **Router** - Navigate programmatically
- **ActivatedRoute** - Current route info
- **RouterState** - Full router state

### Use Cases:
- Get route params
- Navigate programmatically
- Access query params`,
        codeExample: `// Router State
console.log('=== ActivatedRoute - Route Params ===');
console.log('class Component {');
console.log('  route = inject(ActivatedRoute);');
console.log('  ');
console.log('  ngOnInit() {');
console.log('    // Snapshot (one-time)');
console.log('    const id = this.route.snapshot.paramMap.get("id");');
console.log('    ');
console.log('    // Observable (updates)');
console.log('    this.route.paramMap.subscribe(params => {');
console.log('      const id = params.get("id");');
console.log('    });');
console.log('  }');
console.log('}');

console.log('\\n=== Router - Programmatic Navigation ===');
console.log('class Component {');
console.log('  router = inject(Router);');
console.log('  ');
console.log('  navigate() {');
console.log('    this.router.navigate(["/users", userId]);');
console.log('    // Navigates to /users/123');
console.log('  }');
console.log('}');

console.log('\\n✓ ActivatedRoute: Route info');
console.log('✓ Router: Navigate programmatically');`
    },
    {
        id: 'angular-routing-5',
        category: 'Routing',
        difficulty: 'Medium',
        question: 'Child Routes and Nested Routing',
        answer: `**Child routes** create nested navigation.

### Structure:
- Parent route with <router-outlet>
- Child routes nested

### Use Cases:
- Tabs
- Nested layouts
- Multi-level navigation`,
        codeExample: `// Child Routes
console.log('=== Parent-Child Routes ===');
console.log('const routes = [');
console.log('  {');
console.log('    path: "dashboard",');
console.log('    component: DashboardComponent,');
console.log('    children: [');
console.log('      { path: "overview", component: OverviewComponent },');
console.log('      { path: "stats", component: StatsComponent },');
console.log('      { path: "", redirectTo: "overview", pathMatch: "full" }');
console.log('    ]');
console.log('  }');
console.log('];');

console.log('\\n=== Parent Component ===');
console.log('<div class="dashboard">');
console.log('  <nav>');
console.log('    <a routerLink="overview">Overview</a>');
console.log('    <a routerLink="stats">Stats</a>');
console.log('  </nav>');
console.log('  <router-outlet></router-outlet>');
console.log('</div>');

console.log('\\n✓ Child routes: Nested navigation');`
    },
    {
        id: 'angular-routing-6',
        category: 'Routing',
        difficulty: 'Expert',
        question: 'Route Preloading Strategies - PreloadAllModules and Custom',
        answer: `**Preloading** loads lazy routes in background.

### Strategies:
- **NoPreloading** - Don't preload (default)
- **PreloadAllModules** - Preload all
- **Custom** - Selective preloading

### Benefits:
- Faster navigation
- Better UX
- Smart loading`,
        codeExample: `// Preloading Strategies
console.log('=== PreloadAllModules ===');
console.log('provideRouter(routes, ');
console.log('  withPreloading(PreloadAllModules)');
console.log(');');

console.log('\\n=== Custom Preloading ===');
console.log('export class CustomPreload implements PreloadingStrategy {');
console.log('  preload(route: Route, load: () => Observable<any>) {');
console.log('    return route.data?.["preload"] ? load() : of(null);');
console.log('  }');
console.log('}');

console.log('\\n=== Using Custom Preload ===');
console.log('const routes = [');
console.log('  {');
console.log('    path: "admin",');
console.log('    data: { preload: true },');
console.log('    loadChildren: () => import("./admin")');
console.log('  }');
console.log('];');

console.log('\\n✓ Preloading: Faster navigation');`
    }
];
