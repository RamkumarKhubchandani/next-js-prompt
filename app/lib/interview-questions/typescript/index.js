import { basicsQuestions } from './basics';
import { genericsQuestions } from './generics';
import { advancedTypesQuestions } from './advanced-types';
import { utilityTypesQuestions } from './utility-types';
import { realWorldQuestions } from './real-world';

export const typescriptQuestions = [
    ...basicsQuestions,
    ...genericsQuestions,
    ...advancedTypesQuestions,
    ...utilityTypesQuestions,
    ...realWorldQuestions
];
