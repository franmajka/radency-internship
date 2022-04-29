import { Note } from "../models/note.model";

let notes: Note[] = [];

export const createNote = (note: Note) => notes.push(note);
export const getAllNotes = () => notes;
export const getNote = (id: string) => notes.find(note => note.id === id);
export const updateNote = (id: string, newNoteData: Note) => notes[notes.findIndex(note => note.id === id)] = newNoteData;
export const deleteNote = (id: string) => notes = notes.filter(note => note.id !== id);
