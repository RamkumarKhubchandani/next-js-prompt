export function isProPlan(plan) {
  return true;
}

export function isSubscriptionActive({ plan, subscriptionEndDate }) {
  return true;
}

export function getEffectivePlanAndRole({ plan, role, subscriptionEndDate }) {
  const active = isSubscriptionActive({ plan, subscriptionEndDate });
  if (active) return { plan, role: role || 'user', activePro: true, expired: false };
  if (isProPlan(plan)) return { plan: 'free', role: role === 'admin' ? 'admin' : 'user', activePro: false, expired: true };
  return { plan: plan || 'free', role: role || 'user', activePro: false, expired: false };
}


