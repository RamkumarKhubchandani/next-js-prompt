export const day29 = {
  day: 29,
  title: "Architecture Patterns (Core/Shared/Feature + Clean Boundaries)",
  intro: "Spaghetti code happens when you don't have boundaries. Today, we learn the <strong>Nx-style</strong> architecture (Core, Shared, Features) applicable to any Angular workspace.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 29. Angular scales infinitely, but only if you respect **Boundaries**. Feature slices are the key."
      },
      {
        type: "talk",
        message: "The Golden Rule: Features can import Shared. Shared explicitly CANNOT import Features. If you break this, you get circular dependency hell."
      },
      {
        type: "challenge",
        instruction: "This import violates the dependency rule. Fix it by moving the reusable code.",
        buggyCode: `// ❌ In 'libs/shared/ui-button.ts'
import { AuthService } from 'libs/features/auth'; // BAD!

@Component({ ... })
export class Button {
  auth = inject(AuthService); // Coupled!
}`,
        solutionCode: `// ✅ Parent passes data (Dumb Component)
@Component({ ... })
export class Button {
  // Just an input! No dependency on Auth feature.
  isLoggedIn = input(false); 
}`,
        verifyOutput: "input",
        successMessage: "Correct! The Shared Button is now \"dumb\" and reusable. It relies on Inputs, not Feature Services.",
        hint: "Remove the service injection and use an `@Input()` instead."
      }
    ]
  },
  content: `
<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🏘️ 1. The Folder Structure</h3>
<p class="mb-6 text-gray-600 dark:text-light-300 leading-relaxed">
Don't organize by type (<code>/components</code>, <code>/services</code>). Organize by <strong>Domain</strong>.
</p>

<div class="bg-gray-100 dark:bg-dark-800 p-6 rounded-xl border-l-4 border-purple-500 mb-10">
<pre class="text-sm font-mono text-gray-800 dark:text-gray-200">
/src/app
  /core       <-- Singleton services (Auth, Logging), Interceptors
  /shared     <-- Reusable UI (Buttons, Cards), Pipes
  /features   <-- Business Logic (Dashboards, Settings, Profile)
     /dashboard
     /settings
</pre>
</div>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🛑 2. The Golden Rule</h3>
<p class="mb-4 text-gray-600 dark:text-light-300 leading-relaxed">
<strong>Features can import Shared.</strong><br>
<strong>Shared can NEVER import Features.</strong>
</p>
<p class="mb-6 text-gray-600 dark:text-light-300 leading-relaxed">
If <code>SharedButton</code> imports <code>AuthService</code> (from a feature), you have a circular dependency. Keep Shared "dumb" and Features "smart".
</p>
`,
  code: "// Rule: features should depend on shared/core; shared should not depend on features.",
  comparison: {
    junior: "// ❌ spaghetti imports",
    senior: "// ✅ strict dependency direction"
  },
  interview: {
    questions: [
      {
        q: "Why are boundaries important?",
        a: "They prevent accidental coupling, reduce refactor cost, and allow multiple teams to work without collisions."
      },
      {
        q: "What belongs in core?",
        a: "Singleton services (auth, config), interceptors, app shell pieces, and providers that should exist once."
      },
      {
        q: "What’s a feature slice?",
        a: "A vertical unit: route + UI + data access + state for a specific business domain."
      }
    ]
  }
};
