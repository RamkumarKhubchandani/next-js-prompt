export function isProPlan(plan) {
  return typeof plan === 'string' && plan.startsWith('pro_');
}

export function isSubscriptionActive({ plan, subscriptionEndDate }) {
  if (!isProPlan(plan)) return false;
  if (!subscriptionEndDate) return true; // legacy: treat missing expiry as active
  const end = subscriptionEndDate instanceof Date ? subscriptionEndDate : new Date(subscriptionEndDate);
  return Number.isFinite(end.getTime()) && end.getTime() > Date.now();
}

export function getEffectivePlanAndRole({ plan, role, subscriptionEndDate }) {
  const active = isSubscriptionActive({ plan, subscriptionEndDate });
  if (active) return { plan, role: role || 'user', activePro: true, expired: false };
  if (isProPlan(plan)) return { plan: 'free', role: role === 'admin' ? 'admin' : 'user', activePro: false, expired: true };
  return { plan: plan || 'free', role: role || 'user', activePro: false, expired: false };
}


