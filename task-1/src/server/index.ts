import express from 'express';
import path from 'path';

import notesRouter from './routes/notes.routes';

const __dirname = path.resolve();

const PORT: string = process.env.PORT ?? '3000';
const app = express();

app.use('/api/notes', notesRouter);

app.use(express.static(path.resolve(__dirname, 'dist')));

app.listen(PORT, () => {
  console.log('Server has been started...');
});
