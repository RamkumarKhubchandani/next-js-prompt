export const day30 = {
  day: 30,
  title: "Capstone Project (Build a Real App Step-by-Step)",
  intro: "This is it. The Final Boss. We are going to architect and build a complete <strong>Task Management App</strong> using every pattern we've learned over the last 30 days.",
  aiSession: {
    enabled: true,
    steps: [
      {
        type: "talk",
        message: "Day 30. Congratulations! You've made it to the final boss. We're going to build a production-grade Kanban Board."
      },
      {
        type: "talk",
        message: "But before we code, we **Plan**. A Senior Engineer spends 80% of their time designing the state model and API contracts."
      },
      {
        type: "challenge",
        instruction: "Design the `Task` interface for a Trello-like app. It needs a status, an assignee, and optimistic update support.",
        buggyCode: `// ❌ Too simple
interface Task {
  id: number;
  text: string;
}`,
        solutionCode: `// ✅ Production Ready
interface Task {
  id: string; // UUIDs are safer
  title: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  assigneeId?: string;
  isSyncing?: boolean; // For optimistic UI
  createdAt: string; // ISO Date
}`,
        verifyOutput: "isSyncing",
        successMessage: "Perfect. Including `isSyncing` flag allows us to show a grayed-out state while the backend confirms the save. That's a Senior UI pattern.",
        hint: "Add properties for `status`, `assigneeId`, and an optimistic flag like `isSyncing`."
      }
    ]
  },
  content: `
<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🏆 The Challenge</h3>
<p class="mb-6 text-gray-600 dark:text-light-300 leading-relaxed">
Build "AngularFlow" - A Trello clone.
</p>

<div class="grid md:grid-cols-2 gap-6 mb-10">
    <div class="bg-gray-50 dark:bg-dark-900/40 p-5 rounded-xl border border-gray-200 dark:border-dark-700">
        <h4 class="font-bold text-gray-800 dark:text-white mb-3">Core Features</h4>
        <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <li>✅ Auth with JWT & Guards</li>
            <li>✅ Drag & Drop (Directives)</li>
            <li>✅ Recursive Lists (Projected Content)</li>
            <li>✅ Optimistic UI Updates (Signals)</li>
        </ul>
    </div>
    <div class="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-xl border border-blue-200 dark:border-blue-900/30">
        <h4 class="font-bold text-blue-800 dark:text-blue-300 mb-3">Tech Constraints</h4>
        <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <li>⚙️ OnPush Everywhere</li>
            <li>⚙️ Typed Forms Only</li>
            <li>⚙️ Functional Interceptors</li>
            <li>⚙️ 100% Signal-based State</li>
        </ul>
    </div>
</div>

<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">🚀 Your Roadmap</h3>
<ol class="list-decimal pl-5 mb-6 text-gray-600 dark:text-light-300 space-y-2">
    <li><strong>Setup:</strong> Folder structure (Core/Shared/Features)</li>
    <li><strong>Auth:</strong> Login screen, Interceptor, Guard</li>
    <li><strong>State:</strong> SignalStore for "Tasks"</li>
    <li><strong>UI:</strong> Kanban Board Component</li>
    <li><strong>Polish:</strong> View Transitions & Loading Skeletons</li>
</ol>
`,
  code: `// Deliverables checklist:
// - route lazy loading
// - typed HttpClient services + interceptors
// - reactive forms with validators
// - OnPush + trackBy performance`,
  comparison: {
    junior: "// ❌ build without architecture",
    senior: "// ✅ build as slices + contracts"
  },
  interview: {
    questions: [
      {
        q: "How do you keep a large Angular app maintainable?",
        a: "Feature slices, strict boundaries, typed contracts, consistent state patterns, and performance discipline (OnPush, lazy loading)."
      },
      {
        q: "What do you prioritize first in a new app?",
        a: "Architecture boundaries, auth model, API contracts, and tooling (lint/test/build) so the app scales without rewrites."
      },
      {
        q: "Where do most Angular apps fail?",
        a: "Unbounded state, mixed responsibilities in components, and ignoring performance until it’s too late."
      }
    ]
  }
};
