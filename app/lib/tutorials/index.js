import connectDB from '../mongodb';
import Tutorial from '../../models/Tutorial';
// Import all static tutorials here manually to bundle them
// We can't use 'fs' in client-side bundling, but for server actions/APIs 'fs' is fine.
// However, to keep it simple and bundled, we'll import the JS files directly.
import { masteringUseEffect } from './mastering-useeffect';
import { reactServerComponents } from './react-server-components';
import { nextjsAppRouter } from './nextjs-15-app-router';
import { zustandStateManagement } from './zustand-state-management';
import { reactPerformance } from './react-performance';
import { typescriptAdvancedPatterns } from './typescript-advanced-patterns';
import { framerMotionAnimations } from './framer-motion-animations';
import { reactQueryMasterclass } from './react-query-masterclass';
import { tailwindArchitecture } from './tailwind-architecture';
import { shadcnGuide } from './shadcn-ui-guide';
import { aiSdkIntegration } from './ai-sdk-integration';
import { deathOfUseMemo } from './death-of-usememo';
import { beyondUseEffect } from './beyond-useeffect';
import { activityComponent } from './activity-component';
import { aiOrchestrators } from './ai-orchestrators';
import { partialPrerendering } from './partial-prerendering';
import { reactVsSignals } from './react-vs-signals';
import { masteringUseOptimistic } from './mastering-useoptimistic';
import { virtualDomDead } from './virtual-dom-dead';
import { reactRustWasm } from './react-rust-wasm';
import { sustainableReact } from './sustainable-react';
import { masteringUseHook } from './mastering-use-hook';
import { edgeFirstReact } from './edge-first-react';
import { localFirstReact } from './local-first-react';
import { microFrontends2 } from './micro-frontends-2';
import { vibeCoding } from './vibe-coding';
import { typescriptPerformance } from './typescript-performance';
import { patternMatchingJs } from './pattern-matching-js';
import { zonelessAngular } from './zoneless-angular';
import { nodejsShrinkingModules } from './nodejs-shrinking-modules';
import { temporalApiJs } from './temporal-api-js';
import { signalStoreMastery } from './signal-store-mastery';
import { nodeBunDenoShowdown } from './node-bun-deno-showdown';
import { javascriptPipelineOperator } from './javascript-pipeline-operator';
import { wasmJsPerformance } from './wasm-js-performance';
import { angularHydrationMastery } from './angular-hydration-mastery';
import { angularStandaloneMfes } from './angular-standalone-mfes';
import { angularSsrNitro } from './angular-ssr-nitro';
import { nodeNativeFetchStreams } from './node-native-fetch-streams';
import { nodeWorkerThreads } from './node-worker-threads';
import { nodeSecurityFirst } from './node-security-first';
import { jsRecordsTuples } from './js-records-tuples';
import { jsExplicitResourceManagement } from './js-explicit-resource-management';
import { nodeNativeSqlite } from './node-native-sqlite';
import { jsTopLevelAwait } from './js-top-level-await';
import { jsSharedMemory } from './js-shared-memory';
import { aiAgentsReact } from './ai-agents-react';
import { aiGenerativeUi } from './ai-generative-ui';
import { aiMultimodalRag } from './ai-multimodal-rag';
import { aiBrowserSlms } from './ai-browser-slms';
import { aiLlmOptimization } from './ai-llm-optimization';
import { aiInteroperability } from './ai-interoperability';
import { aiVectorDbFrontend } from './ai-vector-db-frontend';
import { aiSelfHealing } from './ai-self-healing-code';
import { aiPromptInjection } from './ai-prompt-injection';
import { jsConstIsKing } from './js-const-is-king';
import { jsAsyncIterators } from './js-async-iterators';
import { angularDeferMastery } from './angular-defer-mastery';
import { angularMaterial3 } from './angular-material-3';
import { angularAdvancedDi } from './angular-advanced-di';
import { angularTestingSignals } from './angular-testing-signals';
import { angularDevtools2026 } from './angular-devtools-2026';
import { aiPromptsFe } from './ai-prompts-fe';
import { mernStackRoadmap } from './mern-stack-roadmap-2026';
import { nextjs15ProductionSetup } from './nextjs-production-setup';

const STATIC_TUTORIALS = [
  nextjs15ProductionSetup,
  mernStackRoadmap,
  aiPromptsFe,
  masteringUseEffect,
  reactServerComponents,
  nextjsAppRouter,
  zustandStateManagement,
  reactPerformance,
  typescriptAdvancedPatterns,
  framerMotionAnimations,
  reactQueryMasterclass,
  tailwindArchitecture,
  shadcnGuide,
  aiSdkIntegration,
  deathOfUseMemo,
  beyondUseEffect,
  activityComponent,
  aiOrchestrators,
  partialPrerendering,
  reactVsSignals,
  masteringUseOptimistic,
  virtualDomDead,
  reactRustWasm,
  sustainableReact,
  masteringUseHook,
  edgeFirstReact,
  localFirstReact,
  microFrontends2,
  vibeCoding,
  typescriptPerformance,
  patternMatchingJs,
  zonelessAngular,
  nodejsShrinkingModules,
  temporalApiJs,
  signalStoreMastery,
  nodeBunDenoShowdown,
  javascriptPipelineOperator,
  wasmJsPerformance,
  angularHydrationMastery,
  angularStandaloneMfes,
  angularSsrNitro,
  nodeNativeFetchStreams,
  nodeWorkerThreads,
  nodeSecurityFirst,
  jsRecordsTuples,
  jsExplicitResourceManagement,
  nodeNativeSqlite,
  jsTopLevelAwait,
  jsSharedMemory,
  aiAgentsReact,
  aiGenerativeUi,
  aiMultimodalRag,
  aiBrowserSlms,
  aiLlmOptimization,
  aiInteroperability,
  aiVectorDbFrontend,
  aiSelfHealing,
  aiPromptInjection,
  jsConstIsKing,
  jsAsyncIterators,
  angularDeferMastery,
  angularMaterial3,
  angularAdvancedDi,
  angularTestingSignals,
  angularDevtools2026,
];

/**
 * URL Friendly Date Formatter
 */
function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Unified Service to get all tutorials (Static + DB)
 */
export async function getAllTutorials() {
  let dynamicTutorials = [];

  if (process.env.MONGODB_URI) {
    try {
      await connectDB();
      // 1. Fetch Dynamic (DB)
      const dynamicDocs = await Tutorial.find({ isPublished: true }).sort({ createdAt: -1 });
      dynamicTutorials = dynamicDocs.map(doc => ({
        _id: doc._id.toString(),
        title: doc.title,
        slug: doc.slug,
        description: doc.description,
        tags: doc.tags || [],
        difficulty: doc.difficulty || 'Intermediate',
        readTime: doc.readTime || '5 min read',
        createdAt: doc.createdAt.toISOString(),
        formattedDate: formatDate(doc.createdAt),
        type: 'dynamic', // It comes from DB
        isPremium: false, // Default text blogs are free
        author: doc.author,
        thumbnail: doc.thumbnail || null,
        image: doc.image || null, // Pass image through
      }));
    } catch (err) {
      console.warn("Warning: Could not connect to database for dynamic tutorials fetching. Falling back to static guides only.", err.message);
    }
  } else {
    console.warn("Warning: MONGODB_URI is not defined. Only static tutorials will be rendered.");
  }

  // 2. Format Static
  const staticTutorials = STATIC_TUTORIALS.map(t => ({
    ...t,
    _id: `static-${t.slug}`,
    createdAt: new Date().toISOString(),
    formattedDate: 'Featured Guide',
    type: 'static',
    isPremium: false,
    image: t.image || null, // Pass image through for static files too
  }));

  // 3. Merge
  return [...staticTutorials, ...dynamicTutorials];
}

export async function getTutorialBySlug(slug) {
  // 1. Check Static First (Fastest)
  const staticTutorial = STATIC_TUTORIALS.find(t => t.slug === slug);
  if (staticTutorial) {
    return {
      ...staticTutorial,
      _id: `static-${staticTutorial.slug}`,
      type: 'static',
      formattedDate: 'Featured Guide',
      image: staticTutorial.image || null
    };
  }

  // 2. Check DB
  await connectDB();
  const doc = await Tutorial.findOne({ slug, isPublished: true });

  if (doc) {
    return {
      _id: doc._id.toString(),
      title: doc.title,
      slug: doc.slug,
      description: doc.description,
      tags: doc.tags || [],
      difficulty: doc.difficulty,
      readTime: doc.readTime,
      content: doc.content, // HTML String
      createdAt: doc.createdAt.toISOString(),
      formattedDate: formatDate(doc.createdAt),
      type: 'dynamic',
      author: doc.author,
      thumbnail: doc.thumbnail || null,
      image: doc.image || null,
    };
  }

  return null;
}
