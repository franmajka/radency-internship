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

    return lhs[key] === rhs[key]
  });
}
