import { AnyAction } from "../pseudo-redux/types/Action"
import { Selector } from "../pseudo-redux/types/Selector"
import { Store } from "../pseudo-redux/types/Store"
import { BaseHook } from "./hooks/types"
import { compareObjects } from "./utils/compareObjects"
import { VNode, VNodeMinimized } from "./VNode"

export type DefaultHooks<State> = {
  useDispatch: () => (action: AnyAction) => AnyAction,
  useSelector: <Ret>(selector: Selector<State, Ret>) => ReturnType<Selector<State, Ret>>
}

type DefinedHooks<
  DefinableHooks extends Record<string, (hooks: any) => BaseHook>
> = {
  [HookName in keyof DefinableHooks]: ReturnType<DefinableHooks[HookName]>
}

type CreateAppConf<
  State,
  DefinableHooks extends Record<string, (hooks: DefaultHooks<State>) => BaseHook>
> = {
  store: Store<State>,
  root: HTMLElement,
  definedHooks?: DefinableHooks,
  treeCreator: (hooks: DefinedHooks<DefinableHooks> & DefaultHooks<State>) => VNodeMinimized
}

export const createApp = (
  <
    State,
    DefinableHooks extends Record<string, (hooks: DefaultHooks<State>) => BaseHook>
  >
  ({ store, root, treeCreator, definedHooks } : CreateAppConf<State, DefinableHooks>) => {
    const defaultHooks: DefaultHooks<State> = {
      useDispatch: () => store.dispatch,
      useSelector: selector => selector(store.getState())
    }

    const hooks = {
      ...defaultHooks,
      ...<DefinedHooks<DefinableHooks>>(
        definedHooks ? (
          Object.entries(definedHooks)
            .reduce((acc, [name, hookCreator]) => ({
              ...acc,
              [name]: hookCreator(defaultHooks)
            }), {})
        ) : {}
      )
    };


    function prepareVNode(minimizedNode: VNodeMinimized): VNode {
      if (minimizedNode.children) {
        for (let i = 0; i < minimizedNode.children.length; i++) {
          const child = minimizedNode.children[i];
          if (typeof child === 'function') {
            const childNode = prepareVNode(child(hooks));

            minimizedNode.children[i] = childNode;
          }
        }
      }

      return minimizedNode as VNode;
    }

    function treeToHTML(tree: VNode | string): ChildNode {
      if (typeof tree === 'string') {
        return document.createTextNode(tree);
      }

      const element = document.createElement(tree.tag);

      if (tree.attributes) {
        Object.entries(tree.attributes).forEach(([attribute, value]) => {
          element.setAttribute(attribute, value);
        })
      }

      if (tree.events) {
        Object.entries(tree.events).forEach(([type, listener]) => {
          element.addEventListener(type, listener);
        })
      }

      if (tree.children) {
        tree.children.forEach(child => {
          switch (typeof child) {
            case 'string':
              element.appendChild(document.createTextNode(child));
              break;
            case 'object':
              element.appendChild(treeToHTML(child));
              break;
          }

        })
      }

      return element;
    }

    function compareNodes(lhs: VNode | string, rhs: VNode | string): boolean {
      if (typeof lhs === 'string' || typeof rhs == 'string') {
        return lhs === rhs;
      }

      const sameTag = lhs.tag === rhs.tag;
      const sameAttributes = compareObjects(lhs.attributes, rhs.attributes);
      const sameEvents = compareObjects(lhs.events, rhs.events);

      return sameTag && sameAttributes && sameEvents;
    }

    function reconciliation(
      domNode: ChildNode,
      previousTree: VNode,
      newTree: VNode
    ) {
      if (!compareNodes(previousTree, newTree)) {
        domNode.replaceWith(treeToHTML(newTree));
      }

      if (previousTree.children === undefined && newTree.children !== undefined) {
        newTree.children.forEach(child => domNode.appendChild(treeToHTML(child)));

        return;
      }

      if (previousTree.children !== undefined && newTree.children === undefined) {
        while (domNode.firstChild) {
          domNode.removeChild(domNode.firstChild);
        }

        return;
      }

      // Or for ts purposes
      if (previousTree.children === undefined || newTree.children === undefined) {
        return;
      }

      let currentChild: ChildNode | null | undefined = domNode.firstChild;
      for (let i = 0; i < newTree.children.length; i++, currentChild = currentChild?.nextSibling) {
        const previousChild = previousTree.children[i];
        const newChild = newTree.children[i];

        if (!compareNodes(previousChild, newChild)) {
          if (!currentChild) {
            domNode.appendChild(treeToHTML(newChild));

            continue;
          }

          const newNodeChild = treeToHTML(newChild);
          currentChild.replaceWith(newNodeChild);

          currentChild = newNodeChild;
          continue;
        }

        if (typeof previousChild !== 'string' && typeof newChild !== 'string') {
          reconciliation(currentChild!, previousChild, newChild)
        }
      }
    }


    let tree = prepareVNode(treeCreator(hooks));
    root.appendChild(treeToHTML(tree));

    store.subscribe(() => {
      const newTree = prepareVNode(treeCreator(hooks));
      reconciliation(root.firstChild!, tree, newTree);
      tree = newTree;
    });

    return { hooks }
  }
)
