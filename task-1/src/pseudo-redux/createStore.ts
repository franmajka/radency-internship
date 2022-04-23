import { combineReducers } from "./combineReducers";
import { AnyAction } from "./types/Action";
import { Reducer, ReducersObject } from "./types/Reducer"
import { Selector } from "./types/Selector";
import { Store, Subscribe } from "./types/Store";



export const createStore = (
  <State, Middleware>
  ({ reducer, preloadedState, middleware } : {
    reducer: Reducer<State> | ReducersObject<State>,
    preloadedState?: State,
    middleware?: Middleware
  }): Store<State> => {
    const rootReducer = typeof reducer === 'function' ? reducer : combineReducers(reducer);
    let state = preloadedState || rootReducer(undefined, { type: '@@INIT' });

    const subscribes: Subscribe[] = [];

    return {
      getState: () => state,
      dispatch: (action: AnyAction) => {
        state = rootReducer(state, action)

        for (const subscribe of subscribes) {
          subscribe();
        }

        return action;
      },
      subscribe: (listener: Subscribe) => {
        subscribes.push(listener);

        return () => {
          const idx = subscribes.indexOf(listener);
          subscribes.splice(idx, 1);
        }
      }
    }
  }
)
