export interface VNode {
  tag: keyof HTMLElementTagNameMap,
  attributes?: Record<string, any>,
  events?: {
    [key in keyof WindowEventMap]?: EventListener
  },
  children?: (
    VNode |
    string
  )[],
}

export interface VNodeMinimized {
  tag: keyof HTMLElementTagNameMap,
  attributes?: Record<string, any>,
  events?: {
    [key in keyof WindowEventMap]?: EventListener
  },
  children?: (
    ((...args: any[]) => VNodeMinimized) |
    VNodeMinimized |
    string
  )[],
}
