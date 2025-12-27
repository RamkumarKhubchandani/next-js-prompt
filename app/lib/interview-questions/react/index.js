import { basicsQuestions } from './basics.js';
import { hooksQuestions } from './hooks.js';
import { eliteQuestions } from './elite.js';
import { performanceQuestions } from './performance.js';
import { patternsQuestions } from './patterns.js';
import { advancedHooksQuestions } from './advanced-hooks.js';
import { stateManagementQuestions } from './state-management.js';
import { testingQuestions } from './testing.js';
import { architectureQuestions } from './architecture.js';
import { securityQuestions } from './security.js';
import { accessibilityQuestions } from './accessibility.js';
import { formsQuestions } from './forms.js';
import { routingQuestions } from './routing.js';
import { debuggingQuestions } from './debugging.js';
// import { nextjsQuestions } from './nextjs.js'; // Temporarily disabled - fixing syntax
import { apiQuestions } from './api.js';
import { typescriptQuestions } from './typescript.js';
import { animationQuestions } from './animation.js';
import { buildDeployQuestions } from './build-deploy.js';

export const reactInterviewQuestions = [
    ...basicsQuestions,              // 10 questions
    ...hooksQuestions,                // 8 questions
    ...advancedHooksQuestions,        // 8 questions (+2)
    ...performanceQuestions,          // 7 questions
    ...patternsQuestions,             // 5 questions
    ...stateManagementQuestions,      // 7 questions (+2)
    ...testingQuestions,              // 5 questions
    ...architectureQuestions,         // 6 questions (+2)
    ...securityQuestions,             // 4 questions
    ...accessibilityQuestions,        // 4 questions
    ...formsQuestions,                // 4 questions
    ...routingQuestions,              // 4 questions
    ...debuggingQuestions,            // 4 questions
    // ...nextjsQuestions,            // 4 questions - temporarily disabled
    ...apiQuestions,                  // 4 questions
    ...typescriptQuestions,           // 4 questions
    ...animationQuestions,            // 4 questions
    ...buildDeployQuestions,          // 4 questions
    ...eliteQuestions                 // 8 questions
];

// Total: 100 questions across 18 comprehensive modules! 🎉🎉🎉
// Covers: Basics, Hooks, Performance, Patterns, State, Testing, Architecture,
// Security, Accessibility, Forms, Routing, Debugging, API, TypeScript, Animation,
// Build & Deploy, Elite - Complete React interview preparation from basics to expert!
