// Feature entitlement check — replaces hard-coded `if (plan === "pro")` checks.
// Currently a stub; wire this to plan_features with the tenant's active subscription.
export function canAccess(feature) {
  return async (req, res, next) => {
    req.entitlements = req.entitlements || {};
    req.entitlements[feature] = true; // TODO: enforce from subscriptions + plan_features
    next();
  };
}
