import { Router } from "express";
import { validateMiddleware } from "../middlewares/validate.middleware";
import { editNoteOptsSchema, noteSchema } from "../models/note.model";
import * as notesService from '../services/notes.service'

const router = Router()

router.get('/', (_, res) => {
  return res.status(200).json({ notes: notesService.getAllNotes() });
});

router.get('/stats', (req, res) => {
  return res.status(200).json({ stats: notesService.getStats() });
});

router.get('/:id', (req, res) => {
  const note = notesService.getNote(req.params.id);
  return res.status(200).json({ note });
});

router.post('/', validateMiddleware(noteSchema), (req, res) => {
  notesService.createNote(req.body);

  return res.status(201).end();
});

router.delete('/:id', (req, res) => {
  notesService.deleteNote(req.params.id);
  return res.status(200).end();
});

router.patch('/:id', validateMiddleware(editNoteOptsSchema), (req, res) => {
  notesService.updateNote(req.params.id, req.body);

  return res.status(200).end();
});



export default router;
