import { createSlice } from "../../../pseudo-redux/createSlice";
import { PayloadAction } from "../../../pseudo-redux/types/Action";
import { Note } from "../../../shared/types";
import { State } from "../../store";
import { idGenerator } from "../../utils/idGenerator";
import { parseDates } from "../../utils/parseDates";
import { categories } from '../../../shared/categories';

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    items: [] as Note[],
    isArchived: false
  },
  reducers: {
    addNote: {
      reducer: (state, action: PayloadAction<Note>) => ({
        items: [...state.items, action.payload],
        isArchived: state.isArchived
      }),
      prepare: (options: Omit<Note, 'id' | 'date' | 'isArchived' | 'dates'>) => ({
        payload: {
          ...options,
          id: String(idGenerator.id),
          date: Date.now(),
          isArchived: false,
          dates: parseDates(options.content)
        }
      })
    },

    editNote: {
      reducer: (state, action: PayloadAction<Note>) => {
        const editedNote = action.payload;

        const idx = state.items.findIndex(note => note.id === editedNote.id);

        // If note not in store
        if (!~idx) return state;

        return {
          items: [
            ...state.items.slice(0, idx),
            editedNote,
            ...state.items.slice(idx + 1)
          ],
          isArchived: state.isArchived
        }
      },

      prepare: (
        note: Note,
        options: Partial<Pick<Note, 'category' | 'name' | 'content' | 'isArchived'>>
      ) => ({
        payload: {
          ...note,
          ...(
            (<(keyof typeof options)[]>Object.keys(options))
              .reduce((acc, key) => ({
                ...acc,
                ...(
                  key === 'content' ? {
                    [key]: options[key],
                    dates: parseDates(options[key]!)
                  } : {
                    [key]: options[key]
                  }
                )
              }), {})
          )
        }
      })
    },

    removeNote: (state, action: PayloadAction<string>) => {
      const idx = state.items.findIndex(note => note.id === action.payload);

      // If note not in store
      if (!~idx) return state;

      return {
        items: [
          ...state.items.slice(0, idx),
          ...state.items.slice(idx + 1)
        ],
        isArchived: state.isArchived
      }
    },

    toggleArchived: state => ({
      items: state.items,
      isArchived: !state.isArchived
    }),
  }
});

export default notesSlice.reducer;

export const { addNote, editNote, removeNote, toggleArchived } = notesSlice.actions;

export const selectNotes = (state: State) => {
  return state.notes.items
    .filter(note => note.isArchived === state.notes.isArchived)
}

export const selectNote = (state: State, id: string) => {
  return state.notes.items
    .find(note => note.id === id)
}

type Stats = {
  [category in Note['category']]: {
    active: number,
    archived: number
  }
};

export const selectNotesStats = (state: State) => {
  const stats = Object.fromEntries(
    Object.keys(categories)
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
