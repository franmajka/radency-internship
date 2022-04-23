import { Reducer, ReducersObject } from "./types/Reducer"

export const combineReducers = (
  <State = Object>
  (reducersObject: ReducersObject<State>): Reducer<State> => (
    (state, action) => (
      (<(keyof State)[]>Object.keys(reducersObject))
        .reduce((res, key) => ({
          ...res,
          [key]: reducersObject[key](
            typeof state === 'undefined' ? state : state[key], action
          )
        }), {}) as State
    )
  )
);
