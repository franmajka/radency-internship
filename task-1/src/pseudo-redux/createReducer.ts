import { ActionType, AnyAction, PayloadAction } from "./types/Action";
import { Builder, CaseReducer, Reducer } from "./types/Reducer";

export const createReducer = (
  <State>
  (
    initialState: State,
    buildReducer: (builder: Builder<State>) => void
  ): Reducer<State, AnyAction> => {
    const reducers: Record<ActionType, CaseReducer<State, AnyAction>> = {};
    const matchReducers: {
      matcher(action: AnyAction): boolean,
      reducer: CaseReducer<State>
    }[] = []
    let defaultReducer: CaseReducer<State, AnyAction>;

    const builder: Builder<State> = {
      addCase(actionCreator, reducer) {
        reducers[actionCreator.toString()] = reducer as CaseReducer<State, AnyAction>;
        return this;
      },

      addMatcher(matcher, reducer) {
        matchReducers.push({ matcher, reducer });
        return this;
      },

      addDefaultCase(reducer) {
        defaultReducer = reducer;
        return this;
      }
    }

    buildReducer(builder);

    return (
      <AType extends ActionType = ActionType>
      (state: State | undefined, action: AnyAction<AType>) => {
        const reducer = reducers[action.type]
          ?? matchReducers.find(({matcher}) => matcher(action))?.reducer
          ?? defaultReducer;

        const newState = reducer
          ? reducer(state ?? initialState, action)
          : initialState;

        return newState;
      }
    );
  }
);
