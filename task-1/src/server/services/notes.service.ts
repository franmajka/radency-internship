import { Request, Response } from "express";
import { getAllNotes, getNote } from "../repositories/notes.repository"

export const getAllNotesHandler = (req: Request, res: Response) => {
  res.status(200).json({
    error: false,
    notes: getAllNotes()
  });
}

export const getNoteHandler = (req: Request, res: Response) => {
  const note = getNote(req.params.id);

  if (note) {
    res.status(200).json({
      error: false,
      note
    });
  } else {
    res.status(404).json({
      error: true,
      message: 'There\'s no such note',
    })
  }
}
