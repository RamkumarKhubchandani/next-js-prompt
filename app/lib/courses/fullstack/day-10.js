export const day10 = {
  day: 10,
  title: "GraphQL",
  intro: "Ask for exactly what you need.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>GraphQL’s value: typed schema + client-driven queries.</li>
  <li>Resolvers, context, auth, and error handling.</li>
  <li>N+1 problem and how DataLoader batching fixes it.</li>
  <li>When GraphQL is a great fit (and when REST is simpler).</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) GraphQL = Schema as a Contract</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
REST is a set of endpoints. GraphQL is a single endpoint with a typed schema that clients query.
It shines when many clients (web/mobile) need different shapes of the same data.
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Resolvers + Context</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
Resolvers are functions that fetch data for schema fields. <code class="bg-gray-100 dark:bg-dark-700 text-gray-800 dark:text-brand-primary px-1 rounded">context</code> carries auth/session,
DB clients, and request-scoped utilities (like DataLoader).
</p>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) The N+1 Trap (and the Fix)</h3>
<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl mb-6">
  <p class="text-red-800 dark:text-red-200 text-sm">
    If your resolver does a DB call per item in a list, performance collapses.
    Fix it with batching/caching (DataLoader) or joins/aggregation.
  </p>
</div>
            `,
  code: `/**
 * Day 10: Minimal GraphQL server (Apollo) + DataLoader idea
 * Install: npm i @apollo/server graphql dataloader
 */

const { ApolloServer } = require('@apollo/server');
const DataLoader = require('dataloader');

const typeDefs = \`
  type User { id: ID!, name: String! }
  type Post { id: ID!, title: String!, authorId: ID! }
  type Query {
    user(id: ID!): User
    postsByAuthor(authorId: ID!): [Post!]!
  }
\`;

// pretend DB
const db = {
  users: [{ id: '1', name: 'Ada' }],
  posts: [
    { id: 'p1', title: 'Hello', authorId: '1' },
    { id: 'p2', title: 'World', authorId: '1' },
  ],
};

const resolvers = {
  Query: {
    user: (_, { id }, ctx) => ctx.loaders.userById.load(id),
    postsByAuthor: (_, { authorId }) => db.posts.filter((p) => p.authorId === authorId),
  },
};

function createLoaders() {
  return {
    userById: new DataLoader(async (ids) => {
      // batch fetch in one go (simulate)
      const map = new Map(db.users.map((u) => [u.id, u]));
      return ids.map((id) => map.get(String(id)) || null);
    }),
  };
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// In a real HTTP integration, you'd create context per request:
// context: async ({ req }) => ({ user: req.user, loaders: createLoaders() })`,
  comparison: {
    junior: `// ❌ Over-fetching
GET /api/users/1
// Returns object with 50 fields
// We only needed the name`,
    senior: `// ✅ Contract + flexible queries
# Client asks only what it needs:
query { user(id: "1") { name } }

# But you must still design resolvers to avoid N+1.`
  },
  interview: {
    questions: [
      {
        q: "What is the N+1 problem in GraphQL?",
        a: "When resolvers run one query per item (N) after an initial list query (1). Fix with batching (DataLoader), joins/aggregation, or preloading in parent resolvers."
      },
      {
        q: "What belongs in GraphQL context?",
        a: "Request-scoped data like the authenticated user/session, DB clients, requestId/logger, and DataLoaders. Avoid global mutable state."
      },
      {
        q: "When would you choose REST over GraphQL?",
        a: "Simple CRUD with stable shapes, caching via HTTP/CDNs, and when you want lower operational complexity. GraphQL adds power but also schema/resolver maintenance and performance pitfalls."
      }
    ]
  }
};
