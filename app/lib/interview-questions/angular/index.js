import { basicsQuestions } from './basics.js';
import { dependencyInjectionQuestions } from './dependency-injection.js';
import { signalsQuestions } from './signals.js';
import { rxjsQuestions } from './rxjs.js';
import { changeDetectionQuestions } from './change-detection.js';
import { routingQuestions } from './routing.js';
import { formsQuestions } from './forms.js';
import { stateManagementQuestions } from './state-management.js';
import { performanceQuestions } from './performance.js';
import { testingQuestions } from './testing.js';
import { advancedPatternsQuestions } from './advanced-patterns.js';
import { httpQuestions } from './http.js';
import { materialQuestions } from './material.js';
import { buildQuestions } from './build.js';
import { securityQuestions } from './security.js';
import { animationsQuestions } from './animations.js';
import { ssrQuestions } from './ssr.js';
import { eliteQuestions } from './elite.js';
import { realInterviewQuestions } from './real-interview.js';

export const angularInterviewQuestions = [
    ...basicsQuestions,                     // 10 questions
    ...dependencyInjectionQuestions,        // 8 questions
    ...signalsQuestions,                    // 8 questions
    ...rxjsQuestions,                       // 7 questions
    ...changeDetectionQuestions,            // 7 questions
    ...routingQuestions,                    // 6 questions
    ...formsQuestions,                      // 6 questions
    ...stateManagementQuestions,            // 6 questions
    ...performanceQuestions,                // 6 questions
    ...testingQuestions,                    // 5 questions
    ...advancedPatternsQuestions,           // 5 questions
    ...httpQuestions,                       // 5 questions
    ...materialQuestions,                   // 4 questions
    ...buildQuestions,                      // 4 questions
    ...securityQuestions,                   // 4 questions
    ...animationsQuestions,                 // 3 questions
    ...ssrQuestions,                        // 3 questions
    ...eliteQuestions,                      // 7 questions
    ...realInterviewQuestions               // 8 questions (expanding to 25)
];

// Total: 108 questions (expanding to 125) ✅
// Coverage: Angular 18+ features including Signals, Zoneless, New Control Flow, Deferrable Views
