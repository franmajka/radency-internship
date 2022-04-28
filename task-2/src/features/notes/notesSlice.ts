import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getKeys } from "../../utils/getKeys";
import { parseDates } from "../../utils/parseDates";
import { Categories, Note } from "./types";

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    items: [] as Note[],
    isArchived: false
  },
  reducers: {
    noteAdded: {
      reducer: (state, action: PayloadAction<Note>) => {
        state.items.push(action.payload);
      },
      prepare: (options: Omit<Note, 'id' | 'date' | 'isArchived' | 'dates'>) => ({
        payload: {
          ...options,
          id: nanoid(),
          date: Date.now(),
          isArchived: false,
          dates: parseDates(options.content)
        }
      })
    },

    noteEdited: {
      reducer: (state, action: PayloadAction<Note>) => {
        const idx = state.items.findIndex(note => note.id === action.payload.id);

        // If there is note with same id
        if (~idx) {
          state.items[idx] = action.payload;
        }
      },
      prepare: (
        note: Note,
        changes: Partial<Pick<Note, 'category' | 'name' | 'content' | 'isArchived'>>
      ) => {
        const newNote: Note = { ...note };

        getKeys(changes).forEach(key => {
          const change = changes[key];
          if (change === undefined) return;

          if (key === 'content') {
            newNote['dates'] = parseDates(change as string);
          }

          // newNote[key] = change
          // gives Type 'string | boolean' is not assignable to type 'never'.
          // I don't really know what's wrong with it cause I tried to cast
          // key to keyof typeof newNote and it gives the same result
          (newNote as any)[key] = change;
        })

        return { payload: newNote };
      }
    },

    noteRemoved: (state, action: PayloadAction<string>) => ({
      items: state.items.filter(note => note.id !== action.payload),
      isArchived: state.isArchived
    }),

    archiveToggled: state => {
      state.isArchived = !state.isArchived;
    }
  }
});

export default notesSlice.reducer;

export const { noteAdded, noteEdited, noteRemoved, archiveToggled } = notesSlice.actions;

export const selectNotes = (state: RootState) => {
  return state.notes.items
    .filter(note => note.isArchived === state.notes.isArchived)
}

export const selectNote = (state: RootState, id: string) => {
  return state.notes.items
    .find(note => note.id === id)
}

type Stats = {
  [category in Note['category']]: {
    active: number,
    archived: number
  }
};

export const selectNotesStats = (state: RootState) => {
  const stats = Object.fromEntries(
    Object.keys(Categories)
      .map(category => [
        category, {
          active: 0,
          archived: 0
        }
      ])
  ) as Stats;

  state.notes.items
    .forEach(
      ({ category, isArchived }) => {
        stats[category][isArchived ? 'archived' : 'active']++;
      }
    );

  return stats;
}
