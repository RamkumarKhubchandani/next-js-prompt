import { NextResponse } from 'next/server';

// Enhanced Dictionary of Suggestions
const SUGGESTIONS = {
    // FRONTEND
    'frontend-react': [
        "Master React Server Components",
        "Deep Dive into React Suspense & Streaming",
        "Build a Custom Hook Library",
        "Refactor a Legacy App to Next.js 14+",
        "Learn Advanced Framer Motion Animations",
        "Implement a proper Micro-Frontend with Module Federation"
    ],
    'frontend-angular': [
        "Master Angular Signals & Zoneless Change Detection",
        "Build a scalable Nx Monorepo",
        "Learn RxJS Higher-Order Mapping Operators",
        "Implement Standalone Components Architecture",
        "Optimize Angular Universal (SSR) Performance",
        "Create a complex Directive for UI interactions"
    ],
    'frontend-vue': [
        "Master Vue 3 Composition API",
        "Build a real-time app with Nuxt 3",
        "Learn Pinia for State Management",
        "Create a custom Renderer with Vue",
        "Implement VueUse composables in a project",
        "Optimize Web Vitals for a Vue SPA"
    ],
    // BACKEND
    'backend-node': [
        "Master NestJS Microservices",
        "Deep dive into Node.js Event Loop & Streams",
        "Build a GraphQL API with Apollo Federation",
        "Implement Redis Caching Strategies",
        "Learn Message Queues (RabbitMQ/Kafka)",
        "Secure a Node API with OAuth2 & OIDC"
    ],
    'backend-python': [
        "Master FastAPI & AsyncIO",
        "Build AI Agents with LangChain",
        "Deploy ML Models with Docker & Kubernetes",
        "Learn Django ORM Optimization techniques",
        "Implement Celery for Background Tasks",
        "Build a Data Pipeline with Airflow"
    ],
    // FULLSTACK
    'fullstack-mern': [
        "Build a SaaS with Next.js, Stripe, & MongoDB",
        "Implement End-to-End Type Safety (TRPC/Zod)",
        "Deploy a CI/CD Pipeline with GitHub Actions",
        "Learn AWS Serverless (Lambda, DynamoDB)",
        "Add Real-time Collaboration (Socket.io/Yjs)",
        "Implement Role-Based Access Control (RBAC)"
    ],
    // GENERAL / OTHER
    'general': [
        "Solving 1 LeetCode Medium/Hard daily",
        "Contribute to an Open Source Project",
        "Write a technical Engineering Blog",
        "Speak at a local Tech Meetup",
        "Read 'Designing Data-Intensive Applications'",
        "Refactor a bad codebase to Clean Architecture"
    ]
};

const getKeyResults = (goalText) => {
    // Simulate smart sub-task generation based on goal keywords
    const text = goalText.toLowerCase();
    if (text.includes('react server components')) {
        return ["Read Next.js Docs on RSC", "Convert a Client Component to Server", "Implement Streaming", "Use Server Actions"];
    }
    if (text.includes('microservices')) {
        return ["Design System Architecture", "Set up Docker Compose", "Implement Inter-service Communication", "Add API Gateway"];
    }
    if (text.includes('saas')) {
        return ["Define MVP Features", "Set up Database Schema", "Integrate Stripe Payments", "Build Authentication Flow"];
    }
    if (text.includes('leetcode')) {
        return ["Solve Array Problems", "Master Dynamic Programming", "Practice Graph Algorithms", "Do Mock Interview"];
    }
    return ["Research Topic", "Build Proof of Concept", "Complete Tutorial", "apply in Project"]; // Fallback
}

export async function POST(req) {
    try {
        const { interest, technology } = await req.json();
        // interest: 'frontend', 'backend', 'fullstack'
        // technology: 'react', 'angular', 'node', etc.

        // Construct key to look up
        let key = `${interest}-${technology}`.toLowerCase();

        // Fallback logic
        let pool = SUGGESTIONS[key];

        if (!pool) {
            // Try partial match or general fallback
            if (interest === 'backend') pool = SUGGESTIONS['backend-node']; // default backend
            else if (interest === 'frontend') pool = SUGGESTIONS['frontend-react']; // default frontend
            else pool = SUGGESTIONS['general'];
        }

        // Randomly select 3 unique suggestions
        const shuffled = pool.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);

        // Format them with simulated Key Results
        const suggestions = selected.map(text => ({
            text,
            isAiSuggested: true,
            keyResults: getKeyResults(text).map(kr => ({ text: kr, isCompleted: false }))
        }));

        return NextResponse.json({ suggestions });

    } catch (error) {
        return NextResponse.json({ error: 'Failed to generate suggestions' }, { status: 500 });
    }
}
