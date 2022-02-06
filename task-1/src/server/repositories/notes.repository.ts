import { INote } from "../../@types/Note";

let NOTES: INote[] = [];

export const createNote = (note: INote) => NOTES.push(note);
export const getAllNotes = () => NOTES;
export const getNote = (id: string) => NOTES.find(note => note.id === id);
export const updateNote = (id: string, newNoteData: INote) => NOTES[NOTES.findIndex(note => note.id === id)] = newNoteData;
export const deleteNote = (id: string) => NOTES = NOTES.filter(note => note.id !== id);
