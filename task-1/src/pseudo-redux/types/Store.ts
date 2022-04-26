import { AnyAction } from "./Action"

export type Subscribe = () => void;
export type Unsubscribe = () => void;

export type Store<State> = {
  getState(): State,
  dispatch(action: AnyAction): AnyAction,
  subscribe(listener: Subscribe): Unsubscribe
}

// export type EnchacedStore<State>
