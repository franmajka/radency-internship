export interface VNode {
  tag: keyof HTMLElementTagNameMap,
  attributes?: Record<string, any>,
  events?: {
    [key in keyof HTMLElementEventMap]?: (e: HTMLElementEventMap[key]) => void
  },
  children?: (
    VNode |
    string
  )[],
}

export interface VNodeMinimized {
  tag: keyof HTMLElementTagNameMap | null,
  attributes?: Record<string, any>,
  events?: {
    [key in keyof HTMLElementEventMap]?: (e: HTMLElementEventMap[key]) => void
  },
  children?: (
    ((...args: any[]) => VNodeMinimized) |
    VNodeMinimized |
    string
  )[],
}
