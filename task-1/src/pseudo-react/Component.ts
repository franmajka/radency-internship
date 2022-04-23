import { createElement } from "./createElement";
import { BaseHooks } from "./hooks/types";
import { VNode, VNodeMinimized } from "./VNode";

export type BaseProps = Record<string, any>;

export type Component<
  Props extends BaseProps = {},
  Hooks extends BaseHooks = {}
> = (arg: {
  props: Props,
  hooks: Hooks
}) => (hooks: Hooks) => VNodeMinimized
