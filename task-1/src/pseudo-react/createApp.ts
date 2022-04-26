import { AnyAction } from "../pseudo-redux/types/Action"
import { Store } from "../pseudo-redux/types/Store"
import { BaseHook, DefaultHooks, DefinedHooks } from "./hooks/types"
import { useParams } from "./router/Route"
import { compareFunctions } from "./utils/compareFunctions"
import { compareObjects } from "./utils/compareObjects"
import { VNode, VNodeMinimized } from "./VNode"





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
      useSelector: selector => selector(store.getState()),
      // Gives only way to not reload component every time
      // it work with functions
      useCallback: (callback, deps) => {
        (callback as any).deps = deps;
        return callback as any;
      },
      useParams
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


    type VNodeChildren = Exclude<VNode['children'], undefined>;
    // Mutates node
    function prepareVNode(minimizedNode: VNodeMinimized): VNodeChildren {
      const children: VNodeChildren = [];

      if (minimizedNode.children) {
        minimizedNode.children.forEach(child => {
          if (typeof child === 'string') {
            children.push(child);
            return;
          }

          // Component
          if (typeof child === 'function') {
            children.push(...prepareVNode(child(hooks)));
            return;
          }

          // Will deal with fragments and already expanded nodes
          children.push(...prepareVNode(child));
        })

        minimizedNode.children = children;
      }

      return minimizedNode.tag === null ? children : [minimizedNode as VNode];
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
          element.addEventListener(type, listener as EventListener);
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
      domNode: HTMLElement,
      previousTree: VNode | VNodeChildren,
      newTree: VNode | VNodeChildren
    ) {
      const getChildren = (tree: typeof newTree) => Array.isArray(tree) ? tree : tree.children
      const previousChildren = getChildren(previousTree) ?? [];
      const newChildren = getChildren(newTree) ?? [];

      if (
        !(Array.isArray(previousTree) || Array.isArray(newTree)) &&
        !compareNodes(previousTree, newTree)
      ) {
        if (previousTree.tag !== newTree.tag) {
          const newNodeChild = treeToHTML(newTree);
          domNode.replaceWith(newNodeChild);

          return newNodeChild;
        }


        const previousAttributes = previousTree.attributes ?? {};
        const newAttributes = newTree.attributes ?? {};

        Object.keys(newAttributes).forEach(attribute => {
          if (newAttributes[attribute] !== previousAttributes[attribute]) {
            domNode.setAttribute(attribute, newAttributes[attribute]);
          }
        });

        Object.keys(previousAttributes).forEach(attribute => {
          if (!(attribute in newAttributes)) {
            domNode.removeAttribute(attribute);
          }
        })


        const previousEvents = previousTree.events ?? {};
        const newEvents = newTree.events ?? {};

        (<(keyof typeof newEvents)[]>Object.keys(newEvents))
          .forEach(event => {
            if (!compareFunctions(previousEvents[event], newEvents[event])) {
              if (previousEvents[event]) {
                domNode.removeEventListener(event, previousEvents[event] as EventListener);
              }

              domNode.addEventListener(event, newEvents[event] as EventListener);
            }
          });

        (<(keyof typeof previousEvents)[]>Object.keys(previousEvents))
          .forEach(event => {
            if (!(event in newEvents)) {
              domNode.removeEventListener(event, previousEvents[event] as EventListener);
            }
          });
      }

      let currentChild: ChildNode | null | undefined = domNode.firstChild;
      for (let i = 0; i < newChildren.length; i++, currentChild = currentChild?.nextSibling) {
        const previousChild = previousChildren[i];
        const newChild = newChildren[i];

        if (previousChild === undefined) {
          domNode.appendChild(treeToHTML(newChild));
          continue;
        }

        if (typeof previousChild === 'string' || typeof newChild === 'string') {
          if (previousChild !== newChild) {
            const newNodeChild = treeToHTML(newChild);
            currentChild!.replaceWith(newNodeChild);
            currentChild = newNodeChild;
          }
          continue;
        }

        currentChild = reconciliation(currentChild as HTMLElement, previousChild, newChild)
      }

      let nextChild = currentChild?.nextSibling;
      while (currentChild) {
        currentChild.remove();

        currentChild = nextChild;
        nextChild = currentChild?.nextSibling;
      }

      return domNode;
    }


    let tree = prepareVNode(treeCreator(hooks));
    tree.forEach(subTree => root.appendChild(treeToHTML(subTree)));

    const notifyApp = () => {
      const newTree = prepareVNode(treeCreator(hooks));
      reconciliation(root, tree, newTree);
      tree = newTree;
    }

    window.addEventListener('popstate', notifyApp);
    store.subscribe(notifyApp);

    return { hooks }
  }
)
