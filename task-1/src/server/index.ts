import express from 'express';
import path from 'path';

import notesRouter from './routes/notes.routes';

const __dirname = path.resolve();

const PORT: string = process.env.PORT ?? '3000';
const app = express();

app.use('/api/notes', notesRouter);

app.use(express.static(path.resolve(__dirname, 'dist')));

app.all('/*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server has been started... Here\'s the link: http://localhost:${PORT}/notes`);
});
