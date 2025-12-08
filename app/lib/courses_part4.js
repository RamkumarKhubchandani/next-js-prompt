    fullstack: {
        id: 'fullstack',
        title: 'Full Stack Architect: Node.js & Cloud',
        description: 'From Backend Internals to Microservices. Master the complete stack.',
        totalDays: 20,
        days: [
            // --- WEEK 1: NODE.JS & DATABASE ---
            {
                day: 1,
                title: 'Node.js Internals: Beyond Express',
                intro: "Node is not just 'server-side JS'. It's a C++ runtime with Libuv. Understand the Event Loop on the server.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The Server Event Loop</h3>
<p class="mb-4">It has phases, unlike the browser loop.</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-blue-300 mb-6 overflow-x-auto shadow-inner">
<pre>
   ┌───────────────────────────┐
   │         TIMERS            │ (setTimeout)
   └─────────────┬─────────────┘
                 ▼
   ┌───────────────────────────┐
   │    PENDING CALLBACKS      │ (OS Ops)
   └─────────────┬─────────────┘
                 ▼
   ┌───────────────────────────┐
   │      POLL (I/O)           │ (Incoming Request)
   └─────────────┬─────────────┘
                 ▼
   ┌───────────────────────────┐
   │         CHECK             │ (setImmediate)
   └───────────────────────────┘
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2. The Worker Pool</h3>
<p>Heavy tasks (Crypto, Compression, FS) are offloaded to Libuv's C++ Thread Pool. This keeps the Main Thread free.</p>
                `,
                code: `// Example 1: Blocking vs Non-Blocking
const crypto = require('crypto');

// BAD: Sync version blocks all other requests
// crypto.pbkdf2Sync(...) 

// GOOD: Async version uses the Thread Pool
crypto.pbkdf2(..., () => console.log('Done'));

// Example 2: setImmediate vs process.nextTick
// nextTick runs IMMEDIATELY after current operation, before any I/O.
// setImmediate runs on the next 'Check' phase of the loop.`,
                interview: {
                    questions: [
                        { q: "Is Node.js single threaded?", a: "Yes, the JS execution is single-threaded. But I/O operations (file, network) and CPU-heavy tasks (crypto, zlib) run in C++ threads via Libuv." },
                        { q: "What is `process.nextTick` used for?", a: "To schedule a callback to run *immediately* after the current operation completes, but before the event loop continues. Use with caution (can starve I/O)." },
                        { q: "Difference between `cluster` module and Worker Threads?", a: "Cluster forks processes (separate memory). Workers share memory/process. Cluster is for scaling across cores; Workers are for CPU tasks." }
                    ]
                }
            },
            {
                day: 2,
                title: 'Streams & Buffers',
                intro: "How to handle 10GB files with 1GB RAM? Streams. This is the difference between a Junior and a Senior dev.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Piping Data</h3>
<p class="mb-4">Instead of loading the whole file into RAM, we stream it chunk by chunk.</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-green-300 mb-6 overflow-x-auto shadow-inner">
<pre>
[ File System ] ──Chunk1──▶ [ Gzip ] ──Chunk1──▶ [ Response ]
       │                       │                     │
      ...                     ...                   ...
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2. Buffer</h3>
<p>Raw binary data (octets). Node's way of handling binary before <code>ArrayBuffer</code> existed.</p>
                `,
                code: `// Example 1: Stream vs ReadFile
const fs = require('fs');

// BAD: Loads entire file into RAM. Crashes on large files.
// fs.readFile('big.mp4', (err, data) => res.send(data));

// GOOD: Stream chunks to response. Memory usage constant.
const stream = fs.createReadStream('big.mp4');
stream.pipe(res);`,
                interview: {
                    questions: [
                        { q: "What is Backpressure?", a: "When the Readable stream is faster than the Writable stream (e.g., reading disk fast, writing to slow network). Node handles this by pausing the readable stream so memory doesn't overflow." },
                        { q: "Difference between Buffer and ArrayBuffer?", a: "Buffer is Node's implementation (pre-ES6). ArrayBuffer is the standard JS implementation. Node Buffers are a subclass of Uint8Array now." }
                    ]
                }
            },
            {
                day: 3,
                title: 'Database Design: SQL vs NoSQL',
                intro: "The most important architectural decision. Relational (Postgres) vs Document (Mongo).",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Relational (SQL)</h3>
<p class="mb-4">Strict schema. Data is normalized (spread across tables).</p>

<h3 class="text-xl font-bold text-white mb-4">2. Document (NoSQL)</h3>
<p class="mb-4">Flexible schema. Data is denormalized (embedded in one document).</p>

<div class="grid grid-cols-2 gap-4 mb-6">
    <div class="bg-dark-800 p-4 rounded-lg text-sm">
        <strong class="text-blue-400">SQL User</strong><br/>
        ID: 1<br/>
        Name: Alice
    </div>
    <div class="bg-dark-800 p-4 rounded-lg text-sm">
        <strong class="text-green-400">Mongo User</strong><br/>
        _id: 1<br/>
        Name: Alice<br/>
        Address: { city: "NY" }
    </div>
</div>
                `,
                code: `// Example 1: SQL Relationship (One-to-Many)
// Users Table: | id | name |
// Posts Table: | id | user_id (FK) | content |

// Example 2: NoSQL Embedding (One-to-Few)
// User Document
// {
//   _id: 1,
//   name: "Alice",
//   addresses: [ // Embedded array
//     { street: "Main St", city: "NY" }
//   ]
// }`,
                interview: {
                    questions: [
                        { q: "What is Normalization?", a: "Organizing data to minimize redundancy (e.g., storing a user's address in a separate table, not repeating it in every order). Improves integrity, hurts read performance (requires Joins)." },
                        { q: "When should you use NoSQL?", a: "When data is unstructured, when you need high write throughput, or when you need to shard data across many servers easily." },
                        { q: "Explain ACID.", a: "Atomicity (All or nothing), Consistency (Valid state), Isolation (Concurrent transactions don't interfere), Durability (Saved forever)." }
                    ]
                }
            },
            {
                day: 4,
                title: 'Authentication & Security',
                intro: "Never roll your own crypto. Sessions vs JWTs. OAuth.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. JWT Anatomy</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm mb-6 overflow-x-auto shadow-inner">
<pre>
<span class="text-red-400">eyJhbGciOiJIUzI1NiJ9</span>.<span class="text-purple-400">eyJzdWIiOiIxMjM0NTY3ODkwIn0</span>.<span class="text-blue-400">SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</span>
   (Header)         (Payload)           (Signature)
</pre>
</div>

<h3 class="text-xl font-bold text-white mb-4">2. The Refresh Pattern</h3>
<p>Access tokens are short-lived (15m). Refresh tokens are long-lived (7d) and kept securely in HttpOnly cookies.</p>
                `,
                code: `// Example 1: JWT Verification
// Server receives token from Header
const token = req.headers.authorization.split(' ')[1];
try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
} catch (e) {
    res.status(401).send("Invalid Token");
}`,
                interview: {
                    questions: [
                        { q: "Where should you store a JWT?", a: "Ideally HttpOnly Cookie (prevents XSS). If in LocalStorage, it's vulnerable to XSS." },
                        { q: "What is Salt in hashing?", a: "Random data added to a password before hashing. Prevents Rainbow Table attacks (pre-computed hash lookups)." }
                    ]
                }
            },
            {
                day: 5,
                title: 'API Architecture: REST vs GraphQL',
                intro: "How do clients talk to servers? Designing scalable interfaces.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. REST vs GraphQL</h3>
<div class="grid grid-cols-2 gap-4 mb-6">
    <div class="bg-dark-800 p-4 rounded-lg">
        <h4 class="text-blue-400 font-bold mb-2">REST</h4>
        <p class="text-sm text-light-400">Multiple endpoints (/users, /posts). Over-fetching is common.</p>
    </div>
    <div class="bg-dark-800 p-4 rounded-lg">
        <h4 class="text-pink-400 font-bold mb-2">GraphQL</h4>
        <p class="text-sm text-light-400">One endpoint (/graphql). Ask for exactly what you need.</p>
    </div>
</div>
                `,
                code: `// Example 1: GraphQL Query
query {
  user(id: 1) {
    name
    posts {
      title
    }
  }
}
// Response: No "friends", no "address", just what I asked for.`,
                interview: {
                    questions: [
                        { q: "What is the N+1 problem in GraphQL?", a: "Fetching a list of authors, then for each author fetching their books. This results in 1 query for authors + N queries for books. Solved with DataLoaders (batching)." },
                        { q: "When to use gRPC?", a: "For internal Microservices communication. It uses Protobuf (binary) and HTTP/2, making it much faster than JSON REST." },
                        { q: "What is Idempotency?", a: "Making multiple identical requests has the same effect as making a single request. (e.g., retrying a Payment API shouldn't charge twice)." }
                    ]
                }
            },
            // --- WEEK 2: SCALE & DEPLOYMENT ---
            {
                day: 6,
                title: 'Caching Strategies: Redis',
                intro: "The fastest request is the one you don't serve from the DB. Redis is key.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Cache-Aside Pattern</h3>
<p class="mb-4">1. Check Cache. 2. Miss? Check DB. 3. Update Cache. 4. Return.</p>

<h3 class="text-xl font-bold text-white mb-4">2. Eviction Policies</h3>
<p><strong>LRU (Least Recently Used):</strong> "I haven't used this key in a while, delete it to make space."</p>
                `,
                code: `// Example 1: Redis Cache Middleware
async function getPost(id) {
    const cached = await redis.get(\`post:\${id}\`);
    if (cached) return JSON.parse(cached);
    
    const data = await db.findPost(id);
    await redis.set(\`post:\${id}\`, JSON.stringify(data), 'EX', 3600); // 1h TTL
    return data;
}`,
                interview: {
                    questions: [
                        { q: "What is Cache Stampede?", a: "When a popular cache key expires, thousands of requests hit the DB simultaneously. Solved by Locking or Probabilistic Early Expiration." },
                        { q: "Redis vs Memcached?", a: "Redis supports complex data types (Lists, Sets, Sorted Sets) and persistence. Memcached is simpler, pure Key-Value string store." }
                    ]
                }
            },
            {
                day: 7,
                title: 'Message Queues & Background Jobs',
                intro: "Don't send emails or process video in the request handler. Offload it.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Decoupling</h3>
<p class="mb-4">The Web Server should only accept the request. The Worker Server does the heavy lifting.</p>

<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-yellow-300 mb-6 overflow-x-auto shadow-inner">
<pre>
[ User ] ──▶ [ API ] ──▶ [ Redis Queue ] ──▶ [ Worker ]
           (Fast Resp)                       (Sends Email)
</pre>
</div>
                `,
                code: `// Example 1: Adding a Job (Producer)
await emailQueue.add('send-welcome', { email: 'user@example.com' });
res.send('Email queued');

// Example 2: Processing (Worker)
emailQueue.process(async (job) => {
    await sendEmail(job.data.email);
});`,
                interview: {
                    questions: [
                        { q: "Why use a Queue instead of just `await sendEmail()`?", a: "To decouple the response time from the processing time. The user gets a fast response, and the server can process the heavy task at its own pace (smoothing traffic spikes)." },
                        { q: "What is a Dead Letter Queue?", a: "A queue where messages go after they fail to process X times. Allows developers to debug failed jobs without blocking the main queue." }
                    ]
                }
            },
            {
                day: 8,
                title: 'Docker & Containerization',
                intro: "Works on my machine? Docker makes it work everywhere.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The Layer Cake</h3>
<p class="mb-4">Docker images are built in layers. Layers are cached.</p>
<ul class="list-disc list-inside space-y-2 bg-dark-800 p-4 rounded-lg">
    <li>Layer 1: OS (Alpine Linux)</li>
    <li>Layer 2: Node.js Runtime</li>
    <li>Layer 3: <code>node_modules</code> (Cached if package.json unchanged)</li>
    <li>Layer 4: App Code (Changed frequently)</li>
</ul>
                `,
                code: `// Example 1: Simple Dockerfile
// FROM node:18-alpine
// WORKDIR /app
// COPY package*.json ./
// RUN npm ci --only=production
// COPY . .
// EXPOSE 3000
// CMD ["node", "server.js"]`,
                interview: {
                    questions: [
                        { q: "Difference between VM and Container?", a: "VMs virtualize hardware (heavy OS). Containers virtualize the OS kernel (lightweight, shared kernel)." },
                        { q: "What is Kubernetes?", a: "An orchestrator for containers. Handles scaling, self-healing, and networking of thousands of containers." }
                    ]
                }
            },
            {
                day: 9,
                title: 'CI/CD Pipelines',
                intro: "Continuous Integration / Continuous Deployment. Automate the pain.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The Pipeline</h3>
<div class="flex items-center space-x-2 text-xs md:text-sm mb-6">
    <div class="bg-blue-900/40 p-2 rounded border border-blue-500">Code Push</div>
    <span>➞</span>
    <div class="bg-yellow-900/40 p-2 rounded border border-yellow-500">Test (CI)</div>
    <span>➞</span>
    <div class="bg-green-900/40 p-2 rounded border border-green-500">Deploy (CD)</div>
</div>

<h3 class="text-xl font-bold text-white mb-4">2. Deployment Strategies</h3>
<ul class="list-disc list-inside space-y-2 bg-dark-800 p-4 rounded-lg">
    <li><strong>Blue/Green:</strong> Zero downtime. Instant rollback.</li>
    <li><strong>Canary:</strong> Roll out to 10% of users first.</li>
</ul>
                `,
                code: `// Example 1: GitHub Actions Workflow
// name: CI
// on: [push]
// jobs:
//   test:
//     runs-on: ubuntu-latest
//     steps:
//       - uses: actions/checkout@v2
//       - run: npm install
//       - run: npm test`,
                interview: {
                    questions: [
                        { q: "What is Blue-Green Deployment?", a: "Running two identical environments. Blue is live. Deploy to Green. Switch router to Green. Zero downtime. Instant rollback." },
                        { q: "Why immutable infrastructure?", a: "Never patch a running server. Replace it with a new one. Eliminates configuration drift." }
                    ]
                }
            },
            {
                day: 10,
                title: 'System Design: Scalability',
                intro: "Horizontal vs Vertical Scaling. Load Balancers.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The Architecture of Scale</h3>
<div class="bg-dark-900 p-6 rounded-xl border border-dark-600 font-mono text-xs md:text-sm text-purple-300 mb-6 overflow-x-auto shadow-inner">
<pre>
      [ Load Balancer ]
      /       |       \
[ App 1 ] [ App 2 ] [ App 3 ]
      \       |       /
      [ Shared Redis ]
              |
         [ Database ]
</pre>
</div>
                `,
                code: `// Example 1: Nginx Config (Simplified)
// upstream backend {
//    server 10.0.0.1;
//    server 10.0.0.2;
// }
// server {
//    location / {
//       proxy_pass http://backend;
//    }
// }`,
                interview: {
                    questions: [
                        { q: "What is CAP Theorem?", a: "Consistency, Availability, Partition Tolerance. In a distributed system, you can only pick 2. (Usually AP or CP)." },
                        { q: "Stateful vs Stateless Architecture?", a: "Stateless (REST) allows easy scaling (any server can handle any request). Stateful (Sticky Sessions) is harder to scale." }
                    ]
                }
            },
            // --- WEEK 3: ADVANCED ARCHITECTURE ---
            {
                day: 11,
                title: 'Microservices & Communication',
                intro: "Breaking the monolith. Service Discovery, API Gateway.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The API Gateway</h3>
<p class="mb-4">The single entry point for all clients. Handles Auth, Rate Limiting, and Routing.</p>

<h3 class="text-xl font-bold text-white mb-4">2. Async Communication</h3>
<p>Services shouldn't talk directly (tight coupling). They should emit events.</p>
                `,
                code: `// Example 1: Event Driven Architecture
// Service A (Order) emits 'OrderCreated'
// Service B (Inventory) listens and subtracts stock
// Service C (Shipping) listens and prints label`,
                interview: {
                    questions: [
                        { q: "What is the Saga Pattern?", a: "Managing distributed transactions. Instead of a global lock, use a sequence of local transactions. If one fails, execute compensating transactions to undo." },
                        { q: "What is Circuit Breaker?", a: "If a service is failing, stop calling it immediately to prevent cascading failure. Retry after a timeout." }
                    ]
                }
            },
            {
                day: 12,
                title: 'WebSockets & Real-time',
                intro: "HTTP is request-response. Sockets are full-duplex. Chat, Gaming, Live Updates.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The Upgrade Header</h3>
<p class="mb-4">WebSockets start as a standard HTTP GET request with <code>Connection: Upgrade</code>.</p>

<h3 class="text-xl font-bold text-white mb-4">2. Scaling Sockets</h3>
<p>Socket connections are stateful. You need a <strong>Redis Adapter</strong> to broadcast messages across multiple server instances.</p>
                `,
                code: `// Example 1: Socket.io
const io = require('socket.io')(server);
io.on('connection', (socket) => {
    socket.on('chat', (msg) => {
        io.emit('chat', msg); // Broadcast
    });
});`,
                interview: {
                    questions: [
                        { q: "Polling vs Long Polling vs WebSockets?", a: "Polling: 'Are we there yet?' every 1s. Long Polling: Server holds request until data ready. Sockets: Permanent open channel." },
                        { q: "How many concurrent socket connections can a server handle?", a: "Depends on RAM and File Descriptors (ulimit). A single Node process can handle 10k-100k idle connections easily." }
                    ]
                }
            },
            {
                day: 13,
                title: 'Testing: Integration & Load',
                intro: "Unit tests aren't enough. Does the API actually work? Can it handle 10k users?",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Integration Tests</h3>
<p class="mb-4">Spin up a real DB. Hit real endpoints. Ensure the system works as a whole.</p>

<h3 class="text-xl font-bold text-white mb-4">2. Load Testing</h3>
<p>Simulating 10,000 users hitting your login route at once.</p>
                `,
                code: `// Example 1: Supertest (Integration)
const request = require('supertest');
const app = require('./app');

it('GET /user responds with json', (done) => {
  request(app)
    .get('/user')
    .expect(200, done);
});`,
                interview: {
                    questions: [
                        { q: "What is Chaos Engineering?", a: "Intentionally breaking things (killing servers, adding latency) in production to test resilience (Netflix Simian Army)." },
                        { q: "What metrics to watch during load test?", a: "Latency (p95, p99), Error Rate, CPU/RAM saturation, Throughput (RPS)." }
                    ]
                }
            },
            {
                day: 14,
                title: 'Serverless & Edge Functions',
                intro: "No servers to manage. Pay per execution. AWS Lambda, Cloudflare Workers.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. Cold Starts</h3>
<p class="mb-4">The container needs to "wake up" for the first request. This adds latency.</p>

<h3 class="text-xl font-bold text-white mb-4">2. The Edge</h3>
<p>Running code on CDN nodes physically closer to the user. Near-zero latency.</p>
                `,
                code: `// Example 1: AWS Lambda Handler
exports.handler = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
};`,
                interview: {
                    questions: [
                        { q: "Pros and Cons of Serverless?", a: "Pros: Infinite scale, zero ops, cost effective for spiky traffic. Cons: Cold starts, vendor lock-in, hard to debug, stateless." },
                        { q: "How to handle DB connections in Serverless?", a: "Reuse the connection outside the handler function. Or use a connection pool proxy (like AWS RDS Proxy/Prisma Accelerate)." }
                    ]
                }
            },
            {
                day: 15,
                title: 'Capstone: Designing Twitter',
                intro: "Putting it all together. A classic System Design interview question.",
                content: `
<h3 class="text-xl font-bold text-white mb-4">1. The Fan-Out Problem</h3>
<p class="mb-4">When Justin Bieber tweets, 100M people need to see it.</p>
<ul class="list-disc list-inside space-y-2 bg-dark-800 p-4 rounded-lg">
    <li><strong>Pull Model:</strong> Users query DB on load. (Slow reads).</li>
    <li><strong>Push Model:</strong> Pre-compute feeds into Redis Lists. (Fast reads, slow writes).</li>
</ul>

<h3 class="text-xl font-bold text-white mb-4">2. Architecture</h3>
<p>LB ➞ API ➞ Fan-out Service ➞ Redis Cluster ➞ User Feed.</p>
                `,
                code: `// No code, just architecture diagrams in your head.
// 1. LB -> Web Server -> Redis (Feed) -> User
// 2. Async Worker -> Fan out tweets to Redis Lists`,
                interview: {
                    questions: [
                        { q: "How to store Images?", a: "S3 (Object Storage). Store the URL in the DB. Use a CDN to serve them." },
                        { q: "How to generate unique IDs?", a: "Twitter Snowflake (Timestamp + Machine ID + Sequence). UUIDs are too big and not sortable." },
                        { q: "How to search tweets?", a: "Elasticsearch (Inverted Index). A separate service that indexes tweets asynchronously." }
                    ]
                }
            }
        ]
    }
};
