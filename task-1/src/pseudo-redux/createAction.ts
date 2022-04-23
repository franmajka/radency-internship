import { ActionCreator, ActionType, BaseAction, PayloadAction } from "./types/Action";
import { Prepare } from "./types/Reducer";

export function createAction<Payload = void, AType extends ActionType = ActionType>(type: AType):
  Payload extends void ?
    ActionCreator<BaseAction<AType>, []> :
    ActionCreator<
      PayloadAction<Payload, AType>,
      any extends Payload ? (
        [payload?: Payload]
      ) : [payload: Payload]
    >

export function createAction<
  TPrepare extends Prepare<any>,
  AType extends ActionType = ActionType
>(type: AType, prepare: TPrepare):
  ActionCreator<PayloadAction<ReturnType<TPrepare>['payload'], AType>, Parameters<TPrepare>>

export function createAction(type: ActionType, prepare?: Function): any {
  function actionCreator(...args: any[]) {
    if (prepare) {
      return {
        type,
        ...prepare(...args)
      }
    }

    return {
      type,
      ...(args[0] ? { payload: args[0] } : {})
    }
  }

  actionCreator.type = type;
  actionCreator.toString = () => type;
  actionCreator.match = (
    <OtherAction extends BaseAction>
    (action: OtherAction | ActionCreator<OtherAction>) => action.type === type
  );

  return actionCreator;
}
