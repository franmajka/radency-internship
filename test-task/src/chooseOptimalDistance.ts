// Simply speaking it's a brute-force method kinda dfs
// It makes a decision on each call to include the current element or not
// For each variant it creates its own branch and compares results from them

const chooseOptimalDistanceRecursive = (t: number, k: number, ls: number[], current: number) : number | null => {
  // If it's not possible to pick enough items
  if (ls.length - current < k) return null;
  // Base case: if we already picked k items there will be 2 more calls
  // We don't wanna them to affect our calculations so they return 0 each
  if (k === 0) return 0;

  // Getting results of 2 branches
  let included = chooseOptimalDistanceRecursive(t - ls[current], k - 1, ls, current + 1);
  if (included !== null) included += ls[current]

  const notIncluded = chooseOptimalDistanceRecursive(t, k, ls, current + 1);

  if (included === null && notIncluded === null) return null;

  // Here it compares results with upper bound t
  if (included === null || included > t) return notIncluded;
  if (notIncluded === null || notIncluded > t) return included;

  return Math.max(included, notIncluded);
}

/**
 * @param t max sum of distances
 * @param k quantity of cities that we have to visit
 * @param ls list of distances between cities
 * @returns optimal distance that includes visiting all k cities with total distance among them less or equal than t
 */
export const chooseOptimalDistance = (t: number, k: number, ls: number[]) : number | null => {
  if (k < 1 || t < 0 || ls.length === 0) return null;

  return chooseOptimalDistanceRecursive(t, k, ls, 0);
}
