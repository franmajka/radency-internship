import { BaseProps, Component } from './Component'
import { BaseHooks } from './hooks/types'
import { VNode, VNodeMinimized } from './VNode'

type CreateElementConf<
  Props extends BaseProps,
  Hooks extends BaseHooks
> = {
  type: VNode['tag'] | Component<Props, Hooks> | null,
  attributes?: Props,
  events?: VNode['events'],
  children?: VNodeMinimized['children']
};



export function createElement<
  Attrs extends BaseProps
>(options: {
  type: VNode['tag'],
  attributes?: Attrs,
  events?: VNodeMinimized['events'],
  children?: VNodeMinimized['children']
}): () => VNodeMinimized

export function createElement<
  Attrs extends BaseProps
>(options: {
  type: null,
  children: VNodeMinimized['children']
}): () => VNodeMinimized

export function createElement<
  Props extends BaseProps = BaseProps,
  Hooks extends BaseHooks = BaseHooks,
>(options: keyof Props extends never ? {
  type: Component<Props, Hooks>,
} : {
  type: Component<Props, Hooks>,
  attributes: Props
}): (hooks: any) => VNodeMinimized

export function createElement(
  { type, attributes, events, children }
    : CreateElementConf<Record<string, any>, any>
): (hooks: any) => VNodeMinimized {
  if (typeof type === 'string') {
    return () => ({
      tag: type,
      attributes,
      events,
      children
    });
  }

  if (type === null) {
    return () => ({
      tag: type,
      children
    })
  }

  return hooks => type({
    props: attributes ?? {},
    hooks
  })(hooks)
}
