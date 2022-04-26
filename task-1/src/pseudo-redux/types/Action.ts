export type ActionType = string;

export interface BaseAction<AType extends ActionType = ActionType> {
  type: AType,
}

export interface AnyAction<AType extends ActionType = ActionType> extends BaseAction<AType> {
  [key: string]: any
}

export interface PayloadAction<Payload, AType extends ActionType = ActionType> extends BaseAction<AType> {
  payload: Payload
}

export type ActionTypeFromAction<Action extends BaseAction> = Action extends BaseAction<infer AType> ? AType : never;

export type ActionCreator<
  Action extends BaseAction = AnyAction,
  Props extends any[] = any[]
> = {
  (...args: Props): Action,

  type: ActionTypeFromAction<Action>,
  toString: () => ActionTypeFromAction<Action>,
  match: <OtherAction extends BaseAction>(action: OtherAction | ActionCreator<OtherAction>) => boolean
}
