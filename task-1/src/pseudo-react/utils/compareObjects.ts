// Crude deep compare
export function compareObjects(
  lhs: Record<string, any> | undefined,
  rhs: Record<string, any> | undefined
): boolean {
  if (lhs === rhs) return true;
  if (lhs === undefined) return false;
  if (rhs === undefined) return false;
  if (Object.keys(lhs).length !== Object.keys(rhs).length) return false;

  return Object.keys(lhs).every(key => {
    if (typeof lhs[key] === 'object' || typeof rhs[key] === 'object') {
      return compareObjects(lhs[key], rhs[key]);
    }

    // Check for memoized callbacks
    if (
      (typeof lhs[key] === 'function' && typeof rhs[key] === 'function') &&
      (lhs[key].toString() === rhs[key].toString()) &&
      (Array.isArray(lhs[key].deps) && Array.isArray(rhs[key].deps))
    ) {
      return compareObjects(lhs[key].deps, rhs[key].deps)
    }

    if (
      (lhs[key] instanceof Date && rhs[key] instanceof Date) ||
      (lhs[key] instanceof RegExp && rhs[key] instanceof RegExp)
    ) return lhs[key].toString() === rhs[key].toString();

    return lhs[key] === rhs[key]
  });
}
