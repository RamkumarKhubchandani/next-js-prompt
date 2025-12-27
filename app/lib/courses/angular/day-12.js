export const day12 = {
  day: 12,
  title: "Testing (Component Tests, Service Tests, Router Tests)",
  intro: "A senior Angular app is testable by design. Learn what to test and how to keep tests stable.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Testing Strategy</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Services: unit tests (fast).</li>
  <li>Components: shallow tests for logic + template expectations.</li>
  <li>Critical flows: a small number of integration/E2E tests.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) What to Test</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Business logic</span> in services/stores (highest ROI).</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Guards</span> and route behavior (auth flows).</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">HTTP services</span> with HttpTestingController.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) The #1 Flake Cause: Time and Async</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Flaky tests come from timers, async scheduling, and shared state. Make tests deterministic: mock time, mock HTTP, isolate state.
</p>
            `,
  code: `/**
 * Day 12: HttpClient testing pattern (conceptual)
 */

// it('calls /users and returns typed data', () => {
//   TestBed.configureTestingModule({
//     providers: [UsersApi, provideHttpClient(), provideHttpClientTesting()],
//   });
//
//   const api = TestBed.inject(UsersApi);
//   const httpMock = TestBed.inject(HttpTestingController);
//
//   let result: User[] | undefined;
//   api.list().subscribe((x) => (result = x));
//
//   const req = httpMock.expectOne('https://api.example.com/users');
//   expect(req.request.method).toBe('GET');
//   req.flush([{ id: '1', name: 'Ada' }]);
//
//   httpMock.verify();
//   expect(result?.[0].name).toBe('Ada');
// });`,
  comparison: {
    junior: "// ❌ no tests",
    senior: "// ✅ test pyramid + deterministic fixtures"
  },
  interview: {
    questions: [
      {
        q: "What do you mock in Angular tests?",
        a: "External dependencies: HTTP, timers, browser APIs. Keep business logic pure and test it directly."
      },
      {
        q: "What is HttpTestingController?",
        a: "A tool to mock and assert HttpClient requests deterministically."
      },
      {
        q: "How do you avoid flaky tests?",
        a: "Avoid real time/network, isolate state, and keep tests deterministic."
      }
    ]
  }
};
