import { createAction } from "./createAction"
import { createReducer } from "./createReducer"
import { ActionCreator, ActionType, AnyAction, BaseAction, PayloadAction } from "./types/Action"
import { Builder, CaseReducer, Prepare, Reducer, ReducerAndPrepareObject } from "./types/Reducer"

type SliceCaseReducers<State> = {
  [action: ActionType]:
    CaseReducer<
      State, PayloadAction<any, ActionType>
    > | ReducerAndPrepareObject<State>
}

type ValidateSliceCaseReducers<State, SCR extends SliceCaseReducers<State>> = SCR & {
  [AType in keyof SCR]: SCR[AType] extends {
    reducer: CaseReducer<State, infer Action>
  } ? {
    prepare(...args: never[]): Omit<Action, 'type'>
  } : {}
}

type SliceActions<
  State,
  Reducers extends SliceCaseReducers<State>
> = {
  [AType in keyof Reducers]:
    Reducers[AType] extends ReducerAndPrepareObject<State, infer Payload, infer Props> ? (
      ActionCreator<
        Payload extends void ? BaseAction : PayloadAction<Payload>,
        Props
      >
    ) : Reducers[AType] extends CaseReducer<State, infer Action> ? (
      ActionCreator<
        Action,
        Action extends PayloadAction<infer Payload> ? [payload: Payload] : []
      >
    ) : never
};

export interface Slice<
  State,
  Reducers extends SliceCaseReducers<State>,
  Name extends ActionType = ActionType
> {
  name: Name,
  reducer: Reducer<State>,
  actions: SliceActions<State, Reducers>
}

export const createSlice = (
  <
    State,
    Reducers extends SliceCaseReducers<State>,
    Name extends ActionType = ActionType
  >({
    name, initialState, reducers, extraReducers
  } : {
    name: Name,
    initialState: State,
    reducers: ValidateSliceCaseReducers<State, Reducers>,
    extraReducers?: (builder: Builder<State>) => void
  }): Slice<State, Reducers, Name> => {
    const actions: SliceActions<State, Reducers> = Object.fromEntries(
      (<(keyof Reducers)[]>Object.keys(reducers)).map(actionType => {

        const fullActionType = `${name}/${actionType}`;
        const reducer = reducers[actionType];

        if (typeof reducer === 'object') {

          return [actionType, createAction(fullActionType, reducer.prepare)]
        }

        return [
          actionType,
          createAction<
            typeof reducer extends CaseReducer<State, infer Action> ? (
              Action extends PayloadAction<infer Payload> ? (
                Payload
              ) : void
            ) : never
          >(fullActionType)
        ];
      })
    );

    return {
      name,
      actions,
      reducer: createReducer(initialState, builder => {
        (<(keyof Reducers)[]>Object.keys(reducers)).forEach(actionType => {
          const reducer = reducers[actionType];

          builder.addCase(
            actions[actionType] as ActionCreator<PayloadAction<any>>,
            typeof reducer === 'object' ? reducer.reducer : reducer
          )
        });

        if (extraReducers) extraReducers(builder);
      })
    }
  }
)
