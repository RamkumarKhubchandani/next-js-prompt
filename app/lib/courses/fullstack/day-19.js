export const day19 = {
  day: 19,
  title: "Authorization: RBAC, ABAC & Policy Design",
  intro: "Authentication says who you are. Authorization says what you can do — and it’s where most apps get hacked.",
  content: `
<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 What You’ll Learn</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li>RBAC (roles) vs ABAC (attributes) vs ACLs (per-resource permissions).</li>
  <li>How to avoid the #1 bug: <span class="text-red-700 dark:text-red-300 font-bold">IDOR</span> (Insecure Direct Object Reference).</li>
  <li>Where to enforce authz: route middleware + service layer.</li>
  <li>How to model permissions and keep them maintainable.</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">1) The IDOR Problem</h3>
<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 p-4 rounded-xl mb-6">
  <p class="text-red-800 dark:text-red-200 text-sm">
    If a user can access <code class="bg-gray-100 dark:bg-dark-900 px-1 rounded">/orders/123</code> just by guessing the ID,
    and you don’t check ownership, you have an IDOR vulnerability.
  </p>
</div>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">2) RBAC vs ABAC</h3>
<ul class="list-disc list-inside space-y-2 text-gray-600 dark:text-light-300 mb-6">
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">RBAC</span>: roles like admin/support/user (simple, coarse).</li>
  <li><span class="text-yellow-600 dark:text-yellow-400 font-bold">ABAC</span>: rules based on attributes (ownerId match, orgId, region, plan).</li>
</ul>

<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">3) Enforcement Strategy</h3>
<p class="mb-6 text-gray-600 dark:text-light-300">
Enforce authorization in the service layer (business logic) even if you also have route middleware.
This prevents bypass via reused services or internal calls.
</p>
            `,
  code: `/**
 * Day 19: Authorization guard (service-layer)
 * Pattern: fetch resource, check policy, then act.
 */

function canReadOrder({ actor, order }) {
  if (!actor) return false;
  if (actor.roles && actor.roles.includes('admin')) return true;
  return order.userId === actor.id; // ABAC: ownership
}

async function getOrderService({ db, actor, orderId }) {
  const order = await db.order.findById(orderId);
  if (!order) {
    const err = new Error('not found');
    err.status = 404;
    throw err;
  }
  if (!canReadOrder({ actor, order })) {
    const err = new Error('forbidden');
    err.status = 403;
    throw err;
  }
  return order;
}`,
  comparison: {
    junior: `// ❌ Only checks "is logged in"
app.get('/orders/:id', auth, async (req, res) => {
  const order = await db.order.findById(req.params.id);
  res.json(order); // IDOR risk
});`,
    senior: `// ✅ Checks ownership/policy (authz)
app.get('/orders/:id', auth, asyncHandler(async (req, res) => {
  const order = await getOrderService({ db, actor: req.user, orderId: req.params.id });
  res.json({ data: order });
}));`
  },
  interview: {
    questions: [
      {
        q: "RBAC vs ABAC?",
        a: "RBAC grants permissions based on role membership. ABAC grants based on attributes (ownerId, orgId, resource state). Many real systems combine both."
      },
      {
        q: "What is IDOR and how do you prevent it?",
        a: "Insecure Direct Object Reference: accessing resources by guessing IDs without authorization checks. Prevent by enforcing ownership/permission checks server-side for every resource access."
      },
      {
        q: "Where should authorization logic live?",
        a: "In the service/domain layer so it can’t be bypassed, with optional route-level middleware for early rejection. Keep policies centralized and testable."
      }
    ]
  }
};
