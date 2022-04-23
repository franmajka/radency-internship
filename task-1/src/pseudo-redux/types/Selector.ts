import { ValueTypes } from "../utils/ValueTypes";

export type Selector<State, Ret = any> = (state: State, ...args: any[]) => Extract<ValueTypes<State>, Ret> | void;
