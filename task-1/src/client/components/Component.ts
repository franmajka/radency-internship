export interface IHandler {
  eventType: keyof HTMLElementEventMap,
  action: EventListener,
};

export type IListener = IHandler & { $element: HTMLElement };

export interface IPropsDefault {

};

export interface IStateDefault {

};

type IDefaultState<IState> = {
  [key in keyof IState]?: IState[key]
}

export interface IChild{
  insertChild(): void,
  child: Component
}

export class Component<
  IProps extends IPropsDefault = IPropsDefault,
  IState extends IStateDefault = IStateDefault,
> {
  public $element: HTMLElement;

  // Thus there is no optimization in rendering component
  // there is no need to split data into state and props
  protected _state: IState;
  private defaultState: IDefaultState<IState>;

  protected listeners: IListener[];

  protected children: IChild[];

  constructor({$element, initialState, defaultState = {}}
    : {
      $element: HTMLElement,
      initialState: IState,
      defaultState?: IDefaultState<IState>
    }) {
    this.$element = $element;

    this.defaultState = defaultState;
    this._state = this.computeState(initialState);

    this.listeners = [];

    this.children = [];

    this.componentDidMount();
    this.render();
  }

  private computeState(state: IState) {
    return {
      ...this.defaultState,
      ...state,
    }
  }

  protected shouldComponentUpdate(newState: IState) : boolean {
    return JSON.stringify(this._state) !== JSON.stringify(newState);
  }

  private removeChildren() {
    while (this.$element.firstChild) {
      this.$element.removeChild(this.$element.firstChild);
    }
  }

  private removeEventListeners() {
    for (const listener of this.listeners) {
      listener.$element.removeEventListener(listener.eventType, listener.action);
    }
  }

  protected componentWillUpdate() {
    this.removeEventListeners();
    this.removeChildren();
  }

  protected componentDidUpdate() {
    for (const {insertChild} of this.children) {
      insertChild.call(this);
    }
  }

  public get state() : IState {
    return this._state;
  }

  public setState(newState: IState) {
    newState = this.computeState(newState);
    if (this.shouldComponentUpdate(newState)) {
      this._state = newState;

      this.componentWillUpdate();
      this.render();
      this.componentDidUpdate();
    }
  }

  public listen({$element = this.$element, eventType, action} : IListener) {
    $element.addEventListener(eventType, action);
    this.listeners.push({$element, eventType, action});
  }

  protected componentDidMount() {

  }

  protected componentWillUnmount() {
    this.removeEventListeners()
  }

  public destroy() {
    this.componentWillUnmount();

    for (const {child} of this.children) {
      child.destroy();
    }

    this.$element.remove();
  }

  protected render() {

  }

  public addChildComponent({insertChild, child} : IChild) {
    this.children.push({insertChild, child});
  }
}
