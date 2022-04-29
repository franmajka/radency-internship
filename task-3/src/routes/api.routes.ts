import { Router } from "express";
import notesRoutes from './notes.routes'

const router = Router();

router.use('/notes', notesRoutes);

export default router;
