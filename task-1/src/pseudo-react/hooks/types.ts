import { AnyAction } from "../../pseudo-redux/types/Action";
import { useParams } from "../router/Route";

export type BaseHook = (...args: any[]) => any;

export type BaseHooks = Record<string, BaseHook>;

export type MemoizedCallback<
  Cb extends (...args: any[]) => any,
  Deps extends any[]
> = {
  (...args: Parameters<Cb>): ReturnType<Cb>,
  deps: Deps
}

export type DefaultHooks<State> = {
  useDispatch: () => (action: AnyAction) => AnyAction,

  useSelector:
    <Selector extends (state: State, ...ags: any[]) => any>
    (selector: Selector) => ReturnType<Selector>,

  useCallback: <
      Cb extends (...args: any[]) => any,
      Deps extends any[]
    >
    (callback: Cb, deps: Deps) => MemoizedCallback<Cb, Deps>,

  useParams: typeof useParams
}

export type DefinedHooks<
  DefinableHooks extends Record<string, (hooks: any) => BaseHook>
> = {
  [HookName in keyof DefinableHooks]: ReturnType<DefinableHooks[HookName]>
}
