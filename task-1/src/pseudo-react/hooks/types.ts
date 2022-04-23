export type BaseHook = (...args: any[]) => any;

export type BaseHooks = Record<string, BaseHook>;
