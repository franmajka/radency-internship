import { Component } from '../Component';
import { VNode } from './VNode';

const buildDOM = (element: HTMLElement, tree: VNode) => {
  if (tree.type instanceof Component) {

  } else if (typeof tree.type === 'function') {
    const componentTree = tree.type({
      children: tree.children,
      ...tree.props
    });

    Object.assign(componentTree.events, tree.events);
    buildDOM(element, componentTree)
  } else {
    const child = document.createElement(tree.type);
    
  }
}

export const render = ({ element, originalTree, newTree } : {
  element: HTMLElement,
  originalTree?: VNode,
  newTree: VNode,
}) : void => {

}
