import { Router } from 'express';
import { getAllNotesHandler, getNoteHandler } from '../services/notes.service';

const router = Router();

router.get('/', getAllNotesHandler);

router.post('/', (req, res) => {

});

router.get('/notes/:id', getNoteHandler);

router.patch('/notes/:id', (req, res) => {

});

router.delete('/notes/:id', (req, res) => {

});

router.get('/stats', (req, res) => {

});

export default router;
