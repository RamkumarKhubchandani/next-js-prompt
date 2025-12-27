import { semanticsQuestions } from './semantics';
import { accessibilityQuestions } from './accessibility';
import { cssFundamentalsQuestions } from './css-fundamentals';
import { layoutQuestions } from './layout';
import { responsiveQuestions } from './responsive';
import { animationsQuestions } from './animations';
import { stylingQuestions } from './styling';
import { browserInternalsQuestions } from './browser-internals';
import { modernFeaturesQuestions } from './modern-features';
import { realWorldQuestions } from './real-world';

export const htmlCssQuestions = [
    ...semanticsQuestions,
    ...accessibilityQuestions,
    ...cssFundamentalsQuestions,
    ...layoutQuestions,
    ...responsiveQuestions,
    ...animationsQuestions,
    ...stylingQuestions,
    ...browserInternalsQuestions,
    ...modernFeaturesQuestions,
    ...realWorldQuestions
];
