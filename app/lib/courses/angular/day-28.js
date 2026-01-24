export const day28 = {
  day: 28,
  title: "CI/CD for Frontend (Build Once, Promote, Smoke Test)",
  intro: "Don't let your deployment be the Wild West. Learn the <strong>One-Build Rule</strong> and how to effectively Smoke Test your frontend before users see it.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 28. A \"Works on my Machine\" badge is not a qualification. We need CI/CD pipelines."
      },
      {
        type: "talk",
        message: "The biggest Angular deployment mistake is baking `environment.ts` values into the build. This forces you to rebuild for every environment."
      },
      {
        type: "challenge",
        instruction: "Refactor this service to use Runtime Type Configuration instead of build-time constants.",
        buggyCode: `// ❌ Baked in at build time
import { environment } from 'src/environments/environment';

@Injectable()
class ApiService {
  url = environment.apiUrl; 
}`,
        solutionCode: `// ✅ Runtime Config (config.json)
@Injectable()
class ApiService {
  private config = inject(AppConfigService);
  
  // Loaded from assets/config.json at startup
  get url() { return this.config.apiUrl; } 
}`,
        verifyOutput: "AppConfigService",
        successMessage: "Now you can promote the exact same build artifact from Staging to Prod, just by changing the `config.json` file!",
        hint: "Inject a configuration service that loads JSON at runtime."
      }
    ]
  },
  content: `
<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">📦 1. Build Once, Deploy Everywhere</h3>
<p class="mb-4 text-gray-600 dark:text-light-300 leading-relaxed">
Junior Devs build for Staging (<code>npm run build:stage</code>), then build again for Prod (<code>npm run build:prod</code>).
</p>
<p class="mb-6 text-gray-600 dark:text-light-300 leading-relaxed">
<strong>This is dangerous.</strong> Dependencies might change between builds.
Instead, build <strong>one artifact</strong> (zip/docker image). Inject environment variables (API URL) at <strong>runtime</strong> (using <code>assets/config.json</code> or server environment variables).
</p>

<div class="bg-gray-100 dark:bg-dark-800 p-6 rounded-xl border-l-4 border-purple-500 mb-10">
<pre class="text-sm font-mono text-gray-800 dark:text-gray-200">
// BAD: Const in code
export const API_URL = environment.api; // Baked in at build time

// GOOD: Runtime Config
http.get('/assets/config.json').subscribe(config => {
  this.apiUrl = config.api;
});
</pre>
</div>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🔥 2. Smoke Tests</h3>
<p class="mb-4 text-gray-600 dark:text-light-300 leading-relaxed">
Before you swap the Production traffic, run a "Smoke Test" against the new deployment.
1. Does the homepage load?
2. Can I log in?
3. Is it version v1.2.3?
</p>
`,
  code: `// Smoke test idea:
// - load homepage
// - verify API base URL is correct
// - verify auth redirect works`,
  comparison: {
    junior: "// ❌ deploy from laptop",
    senior: "// ✅ CI artifact promotion + smoke tests"
  },
  interview: {
    questions: [
      {
        q: "Why 'build once, promote many' for frontend too?",
        a: "It ensures prod runs the exact build tested in staging; rebuilding can introduce differences (env, deps, flags)."
      },
      {
        q: "What are smoke tests?",
        a: "Small, fast checks that ensure the deployed app is alive and critical paths work."
      },
      {
        q: "What’s the biggest frontend deploy risk?",
        a: "Caching/CDN + stale assets. Use cache-busting filenames and correct cache headers."
      }
    ]
  }
};
