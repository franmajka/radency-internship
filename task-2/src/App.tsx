import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { NoteFormPage } from './pages/NoteFormPage';
import { NotePage } from './pages/NotePage';
import { NotesPage } from './pages/NotesPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Link to='/notes'>Consider going to /notes</Link>} />
        <Route path='/notes' element={<NotesPage />} />
        <Route path='/notes/:noteId' element={<NotePage />} />
        <Route path='/notes/:noteId/edit' element={<NoteFormPage />} />
        <Route path='/notes/create' element={<NoteFormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
