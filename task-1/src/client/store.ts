import { createStore } from "../pseudo-redux/createStore";
import notesReducer from './features/notes/notesSlice';

export const store = createStore({
  reducer: {
    notes: notesReducer
  }
});

export type State = ReturnType<typeof store.getState>
