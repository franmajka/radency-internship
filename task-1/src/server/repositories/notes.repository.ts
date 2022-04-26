import { Note } from "../../shared/types";

let NOTES: Note[] = [];

export const createNote = (note: Note) => NOTES.push(note);
export const getAllNotes = () => NOTES;
export const getNote = (id: string) => NOTES.find(note => note.id === id);
export const updateNote = (id: string, newNoteData: Note) => NOTES[NOTES.findIndex(note => note.id === id)] = newNoteData;
export const deleteNote = (id: string) => NOTES = NOTES.filter(note => note.id !== id);
