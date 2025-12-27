export const testingQuestions = [
    {
        id: 'angular-testing-1',
        category: 'Testing',
        difficulty: 'Medium',
        question: 'Component Testing - TestBed and ComponentFixture',
        answer: `**TestBed** provides testing utilities for Angular.

### Core APIs:
- **TestBed** - Configure testing module
- **ComponentFixture** - Component wrapper
- **DebugElement** - Query DOM

### Best Practice:
Test behavior, not implementation`,
        codeExample: `// Component Testing
console.log('=== Basic Test ===');
console.log('describe("UserComponent", () => {');
console.log('  let component: UserComponent;');
console.log('  let fixture: ComponentFixture<UserComponent>;');
console.log('  ');
console.log('  beforeEach(() => {');
console.log('    TestBed.configureTestingModule({');
console.log('      imports: [UserComponent]');
console.log('    });');
console.log('    fixture = TestBed.createComponent(UserComponent);');
console.log('    component = fixture.componentInstance;');
console.log('  });');
console.log('  ');
console.log('  it("should display user name", () => {');
console.log('    component.user = { name: "John" };');
console.log('    fixture.detectChanges();');
console.log('    const el = fixture.nativeElement;');
console.log('    expect(el.textContent).toContain("John");');
console.log('  });');
console.log('});');

console.log('\\n✓ TestBed: Configure tests');
console.log('✓ ComponentFixture: Test components');`
    },
    {
        id: 'angular-testing-2',
        category: 'Testing',
        difficulty: 'Hard',
        question: 'Service Testing - Mocking Dependencies',
        answer: `**Service testing** validates business logic.

### Techniques:
- Mock dependencies
- Test observables
- Spy on methods

### Tools:
- Jasmine spies
- Jest mocks`,
        codeExample: `// Service Testing
console.log('=== Testing Service ===');
console.log('describe("UserService", () => {');
console.log('  let service: UserService;');
console.log('  let httpMock: jasmine.SpyObj<HttpClient>;');
console.log('  ');
console.log('  beforeEach(() => {');
console.log('    httpMock = jasmine.createSpyObj("HttpClient", ["get"]);');
console.log('    service = new UserService(httpMock);');
console.log('  });');
console.log('  ');
console.log('  it("should fetch users", () => {');
console.log('    const users = [{ id: 1, name: "John" }];');
console.log('    httpMock.get.and.returnValue(of(users));');
console.log('    ');
console.log('    service.getUsers().subscribe(result => {');
console.log('      expect(result).toEqual(users);');
console.log('    });');
console.log('  });');
console.log('});');

console.log('\\n✓ Mock dependencies for isolation');
console.log('✓ Test observables with marble testing');`
    },
    {
        id: 'angular-testing-3',
        category: 'Testing',
        difficulty: 'Expert',
        question: 'Testing Signals - Signal-based Component Testing',
        answer: `**Signal testing** validates signal-based components.

### Techniques:
- Test signal values
- Test computed signals
- Test effects

### Best Practice:
Signals are synchronous, easier to test`,
        codeExample: `// Testing Signals
console.log('=== Testing Signal Component ===');
console.log('describe("CounterComponent", () => {');
console.log('  it("should increment count", () => {');
console.log('    const component = new CounterComponent();');
console.log('    expect(component.count()).toBe(0);');
console.log('    ');
console.log('    component.increment();');
console.log('    expect(component.count()).toBe(1);');
console.log('  });');
console.log('  ');
console.log('  it("should compute double", () => {');
console.log('    const component = new CounterComponent();');
console.log('    component.count.set(5);');
console.log('    expect(component.double()).toBe(10);');
console.log('  });');
console.log('});');

console.log('\\n✓ Signals: Synchronous, easy to test');
console.log('✓ No need for async/fakeAsync');`
    },
    {
        id: 'angular-testing-4',
        category: 'Testing',
        difficulty: 'Medium',
        question: 'Integration Testing - Testing Component Interactions',
        answer: `**Integration tests** validate component interactions.

### Scope:
- Multiple components
- Services
- Routing

### Best Practice:
Test user flows, not implementation`,
        codeExample: `// Integration Testing
console.log('=== Testing User Flow ===');
console.log('describe("Login Flow", () => {');
console.log('  it("should login and redirect", fakeAsync(() => {');
console.log('    const fixture = TestBed.createComponent(LoginComponent);');
console.log('    const router = TestBed.inject(Router);');
console.log('    ');
console.log('    // Fill form');
console.log('    const emailInput = fixture.nativeElement.querySelector("#email");');
console.log('    emailInput.value = "test@example.com";');
console.log('    emailInput.dispatchEvent(new Event("input"));');
console.log('    ');
console.log('    // Submit');
console.log('    const form = fixture.nativeElement.querySelector("form");');
console.log('    form.dispatchEvent(new Event("submit"));');
console.log('    tick();');
console.log('    ');
console.log('    // Verify redirect');
console.log('    expect(router.url).toBe("/dashboard");');
console.log('  }));');
console.log('});');

console.log('\\n✓ Integration tests: Test user flows');`
    },
    {
        id: 'angular-testing-5',
        category: 'Testing',
        difficulty: 'Hard',
        question: 'E2E Testing - Playwright and Cypress',
        answer: `**E2E tests** validate entire application.

### Tools:
- **Playwright** - Modern, fast
- **Cypress** - Developer-friendly

### Best Practice:
Test critical user journeys`,
        codeExample: `// E2E Testing with Playwright
console.log('=== Playwright Test ===');
console.log('test("user can login", async ({ page }) => {');
console.log('  await page.goto("http://localhost:4200");');
console.log('  ');
console.log('  await page.fill("#email", "test@example.com");');
console.log('  await page.fill("#password", "password");');
console.log('  await page.click("button[type=submit]");');
console.log('  ');
console.log('  await expect(page).toHaveURL("/dashboard");');
console.log('  await expect(page.locator("h1")).toHaveText("Dashboard");');
console.log('});');

console.log('\\n=== Cypress Test ===');
console.log('it("user can login", () => {');
console.log('  cy.visit("/");');
console.log('  cy.get("#email").type("test@example.com");');
console.log('  cy.get("#password").type("password");');
console.log('  cy.get("button[type=submit]").click();');
console.log('  cy.url().should("include", "/dashboard");');
console.log('});');

console.log('\\n✓ E2E: Test critical user journeys');
console.log('✓ Playwright: Modern, fast');`
    }
];
