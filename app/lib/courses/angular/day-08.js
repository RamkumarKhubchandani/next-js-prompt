export const day08 = {
  day: 8,
  title: "HttpClient (Interceptors, Error Handling, Retries)",
  intro: "Most apps are API-driven. Learn the professional HTTP stack: typed responses, interceptors, and resilient error handling.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Professional HTTP Rules</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Always type responses.</li>
  <li>Use interceptors for auth headers + correlation IDs.</li>
  <li>Centralize error mapping (don’t repeat it in every component).</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The “API Layer” Pattern</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Keep HttpClient calls in a <span class="text-yellow-600 dark:text-yellow-400 font-bold">data-access service</span>. Components should not assemble URLs or parse responses.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Interceptors (Cross‑Cutting Concerns)</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>Add Authorization header</li>
  <li>Add requestId header</li>
  <li>Map HTTP errors → domain errors</li>
  <li>Handle token refresh (carefully)</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Resilience: Retries and Backoff</h3>
<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl mb-6">
  <p class="text-red-800 dark:text-red-200 text-sm">
    Retry only when safe. Retrying POST without idempotency can duplicate actions.
  </p>
</div>
            `,
  code: `/**
 * Day 8: HttpClient + interceptor + typed API service (conceptual)
 */

// type ApiError =
//   | { code: 'UNAUTHORIZED' }
//   | { code: 'NOT_FOUND' }
//   | { code: 'VALIDATION_ERROR'; details?: unknown }
//   | { code: 'NETWORK_ERROR' }
//   | { code: 'UNKNOWN' };
//
// @Injectable({ providedIn: 'root' })
// export class UsersApi {
//   constructor(private http: HttpClient, @Inject(API_BASE_URL) private baseUrl: string) {}
//
//   list(): Observable<User[]> {
//     return this.http.get<User[]>(this.baseUrl + '/users');
//   }
// }
//
// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   const token = /* read token from auth store */ '';
//   const authReq = token ? req.clone({ setHeaders: { Authorization: 'Bearer ' + token } }) : req;
//   return next(authReq).pipe(
//     catchError((err: HttpErrorResponse) => {
//       // map to domain errors
//       return throwError(() => err);
//     }),
//   );
// };`,
  comparison: {
    junior: "// ❌ fetch in components",
    senior: "// ✅ HttpClient + service layer + interceptors"
  },
  interview: {
    questions: [
      {
        q: "What are interceptors used for?",
        a: "Cross-cutting HTTP concerns: auth headers, logging, retries, error mapping, correlation IDs."
      },
      {
        q: "How do you cancel HTTP requests in Angular?",
        a: "Unsubscribe from the observable or use takeUntil; HttpClient cancels the underlying request when unsubscribed."
      },
      {
        q: "Where should API calling logic live?",
        a: "In services (data access layer), not components, to keep UI clean and testable."
      }
    ]
  }
};
