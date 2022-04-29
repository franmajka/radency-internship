import { v4 } from 'uuid';
import { NoteNotFoundError } from '../errors/notes.errors';
import { parseDates } from '../helpers/parseDates';
import { categories, Category, editableNoteProps, EditNoteInput, Note, NoteInput } from '../models/note.model';
import * as notesRepo from '../repositories/notes.repository'

export const getAllNotes = () => notesRepo.getAllNotes();

export const getNote = (id: string) => {
  const note = notesRepo.getNote(id);

  if (!note) throw new NoteNotFoundError();

  return note;
}

export const createNote = (options: NoteInput) => {
  const note: Note = {
    ...options,
    date: options.date.toISOString(),
    dates: parseDates(options.content),
    id: v4()
  }

  notesRepo.createNote(note);
}

export const deleteNote = (id: string) => {
  getNote(id);

  notesRepo.deleteNote(id);
}

type Stats = {
  [key in Category]: number
}

export const getStats = () => {
  const stats = Object.fromEntries(
    categories.map(category => [category, 0])
  ) as Stats;

  getAllNotes()
    .forEach(note => stats[note.category]++)

  return stats;
}

export const updateNote = (id: string, opts: EditNoteInput) => {
  const note = getNote(id);

  editableNoteProps.forEach(key => {
    const value = opts[key];
    if (value === undefined) return;

    if (key === 'content') {
      note.dates = parseDates(value);
    }

    note[key] = value as any;
  })

  notesRepo.updateNote(id, note);
}
