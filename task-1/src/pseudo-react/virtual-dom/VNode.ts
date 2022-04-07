import { Component } from "../Component";

export interface Props {
  [key: string]: any
}

export type FunctionalComponent = (props?: Props) => VNode;

export interface VNode {
  type: keyof HTMLElementTagNameMap | Component | FunctionalComponent,
  props?: Props,
  events?: {
    [type in keyof WindowEventMap]-?: EventListener
  },
  children?: VNode[] | string,
}
