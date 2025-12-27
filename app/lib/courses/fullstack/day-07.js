export const day07 = {
  day: 7,
  title: "Microservices Architecture",
  intro: "Breaking the monolith into small, independent services.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>When microservices are a good idea (and when they are a disaster).</li>
  <li>Database-per-service + why shared DBs create “distributed monoliths”.</li>
  <li>Sync vs async communication: HTTP/gRPC vs events.</li>
  <li>Operational realities: observability, retries, idempotency, and versioning.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The Core Rule: Own Your Data</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
If two services share one database schema, you have tight coupling. One migration can break multiple services.
Microservices work when each service owns its persistence and exposes a stable API/event contract.
</p>

<div class="bg-gray-100 dark:bg-dark-900 p-6 rounded-xl border border-gray-200 dark:border-dark-600 font-mono text-xs md:text-sm text-purple-700 dark:text-purple-300 mb-6 overflow-x-auto">
<pre>
           (sync) HTTP/gRPC
[ API Gateway ] ───────────────▶ [ User Service ] ──▶ UserDB
      │
      ├─────────────────────────▶ [ Order Service ] ─▶ OrderDB
      │
      └────── (async) events ───▶ [ Billing Service ] ▶ BillingDB
</pre>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) Communication Patterns</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Synchronous</span>: request/response (easy, but chains can cascade failures).</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">Asynchronous</span>: event-driven (more resilient, but eventual consistency).</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Idempotency + Retries (Production Mandatory)</h3>
<p class="mb-4 text-gray-600 dark:text-light-300">
In distributed systems, retries happen (timeouts, network blips). Handlers must be idempotent, and events should have unique IDs.
</p>
            `,
  code: `/**
 * Day 7: Event-driven integration (conceptual)
 * Pattern: Outbox table + publisher for reliable events
 */

// Order Service (writes order + outbox in same DB transaction)
// BEGIN;
//   INSERT INTO orders ...
//   INSERT INTO outbox (event_id, type, payload_json) VALUES (...)
// COMMIT;
//
// Publisher loop reads outbox rows and publishes to broker (Kafka/NATS/RabbitMQ),
// then marks them as published.

// Consumer (Billing Service):
// onMessage(event) {
//   if (alreadyProcessed(event.event_id)) return; // idempotency
//   chargeCustomer(...)
//   markProcessed(event.event_id)
// }`,
  comparison: {
    junior: `// ❌ Distributed Monolith
// Services share the same Database
// If one schema changes, everything breaks`,
    senior: `// ✅ Service boundaries (real microservices)
// - Database per service
// - API contracts or event contracts
// - Outbox + idempotency
// - Observability (trace IDs) + SLOs`
  },
  interview: {
    questions: [
      {
        q: "What is a distributed monolith?",
        a: "Multiple deployable services that are still tightly coupled (shared DB/schema, synchronous chains everywhere). You get microservice complexity without the benefits."
      },
      {
        q: "What is eventual consistency and where is it acceptable?",
        a: "State converges over time (not immediately). It’s acceptable for analytics, emails/notifications, some inventory views—usually not for money transfer invariants."
      },
      {
        q: "What is the Outbox pattern?",
        a: "A way to reliably publish events by writing domain changes + an outbox event record in the same DB transaction, then publishing from outbox to the message broker."
      }
    ]
  }
};
