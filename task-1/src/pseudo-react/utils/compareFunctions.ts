import { compareObjects } from "./compareObjects"

type Func = {
  (...args: any[]): any,

  [key: string]: any
}

export const compareFunctions = (lhs: Func | undefined, rhs: Func | undefined) => {
  if (lhs === rhs) return true;
  if (lhs === undefined || rhs === undefined) return false;

  if (
    (lhs.toString() === rhs.toString()) &&
    (Array.isArray(lhs.deps) && Array.isArray(rhs.deps))
  ) {
    return compareObjects(lhs.deps, rhs.deps)
  }
}
