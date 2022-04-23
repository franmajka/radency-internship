import { ActionCreator, ActionType, AnyAction, BaseAction, PayloadAction } from "./Action";

export type Reducer<State, TAction extends BaseAction = AnyAction> = (
  state: State | undefined,
  action: TAction
) => State

export type ReducersObject<State> = {
  [Property in keyof State]: Reducer<State[Property]>
}

export type CaseReducer<State, TAction extends BaseAction = AnyAction> = (
  state: State,
  action: TAction
) => State

export type Prepare<Payload, Props extends any[] = any[]> =
  (...args: Props) => Omit<PayloadAction<Payload>, 'type'>

export type ReducerAndPrepareObject<
  State,
  Payload = any,
  Props extends any[] = any[]
> = {
  reducer: CaseReducer<State, PayloadAction<Payload>>,
  prepare: Prepare<Payload, Props>
}

export type Builder<State> = {
  addCase<
    AType extends ActionType = ActionType,
    Action extends BaseAction<AType> = AnyAction<AType>,
    Props extends any[] = any[]
  > (
    actionCreator: ActionCreator<Action, Props>,
    reducer: CaseReducer<State, ReturnType<ActionCreator<Action, Props>>>
  ): Builder<State>

  addMatcher(
    matcher: (action: AnyAction) => boolean,
    reducer: CaseReducer<State>
  ): Builder<State>

  addDefaultCase(reducer: CaseReducer<State>): Builder<State>
}
