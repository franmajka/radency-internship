export class Component {
  private $element: HTMLElement;

  private props: object;
  private _state: object;

  private listeners: {eventType: keyof HTMLElementEventMap, action: EventListener}[];

  private children: Component[];

  constructor({$element, props = {}, initialState = {}}
    : {$element: HTMLElement, props: object, initialState: object}) {
    this.$element = $element;

    this.props = props;
    this._state = initialState;

    this.listeners = [];

    this.children = [];

    this.componentDidMount();
    this.render();
  }

  private shouldComponentUpdate() : boolean {
    return true;
  }

  private componentDidUpdate() {

  }

  private get state() : object {
    return this._state;
  }

  private set state(state: object) {
    this._state = state;
    if (this.shouldComponentUpdate()) {
      this.render();
      this.componentDidUpdate();
    }
  }

  listen(eventType: keyof HTMLElementEventMap, action: EventListener) {
    this.$element.addEventListener(eventType, action);
    this.listeners.push({eventType, action});
  }

  componentDidMount() {

  }

  private componentWillUnmount() {
    for (const listener of this.listeners) {
      this.$element.removeEventListener(listener.eventType, listener.action);
    }

    for (const child of this.children) {
      child.componentWillUnmount();
    }
  }

  private destroy() {
    this.componentWillUnmount();

    this.$element.remove();
  }

  private render() {

  }

  private addChild(child: Component) {
    this.children.push(child);
  }
}
