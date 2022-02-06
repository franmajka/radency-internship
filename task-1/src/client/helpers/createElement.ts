import { Component, IHandler, IStateDefault } from "../components/Component";

export function createElement<
  K extends keyof HTMLElementTagNameMap,
  IState extends IStateDefault = IStateDefault,
  C extends Component<IState> = Component<IState>,
  IParentState extends IStateDefault = IStateDefault,
  IParent extends Component<IParentState> = Component<IParentState>
>(this: IParent | undefined, {
  root, ComponentClass, extractState, handler, children
} : {
  root: HTMLElementTagNameMap[K] | K,
  ComponentClass?: new ({ $element, initialState } : {
    $element: HTMLElement,
    initialState: IState,
  }) => C,
  extractState?: ((state?: IParentState) => IState) | (() => IState),
  handler?: IHandler,
  children?: (Component | HTMLElement)[]
}) : C | HTMLElementTagNameMap[K] {
  const $element = typeof root === 'string' ? document.createElement(root) : root;
  if (ComponentClass) {
    if (!extractState) throw 'If creating component state is required';
    let component: C;

    if (this) {
      component = new ComponentClass({
        $element,
        initialState: extractState(this.state)
      });
    } else {
      component = new ComponentClass({
        $element,
        initialState: extractState()
      });
    }


    if (handler) {
      component.listen({$element, ...handler});
    }

    return component;
  }

  if (handler && this instanceof Component) {
    this.listen({$element, ...handler});
  }

  for (const child of children || []) {
    if (!(child instanceof Component)) {
      $element.appendChild(child);
      continue;
    }

    if (!(this instanceof Component)) {
      throw 'Not possible to create child component outside of component';
    }

    const lastChild = $element.lastChild;
    this.addChildComponent({
      child,
      insertChild() {
        // TODO setState
        if (lastChild) {
          lastChild.after(child.$element);
        } else {
          $element.insertAdjacentElement('afterbegin', child.$element);
        }
      },
    })
  }

  return $element;
};
