import { Category } from "./models/note.model";
import { createNote } from "./services/notes.service";

const NOTES: {
  name: string,
  category: Category
  content: string,
}[] = [
  {
    name: 'The theory of evolution',
    category: 'Random Though',
    content: 'The evolution...',
  },
  {
    name: 'Shopping list',
    category: 'Task',
    content: 'Tomatoes, bread',
  },
  {
    name: 'New feature',
    category: 'Idea',
    content: 'I’m gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021'
  },
  {
    name: 'Books',
    category: 'Task',
    content: 'The Lean Startup',
  },
  {
    name: 'William Gaddis',
    category: 'Quote',
    content: 'Power doesn\'t corrupt people, people corrupt power.',
  },
  {
    name: 'Petyr \'Littlefinger\' Baelish',
    category: 'Quote',
    content: 'Chaos isn\'t a pit. Chaos is a ladder. Many who try to climb it fail and never get to try again.',
  },
  {
    name: 'Gu Yue Fang Yuan',
    category: 'Quote',
    content: 'In this world, everyone is a main character, but everyone is also a side character.',
  },
];

export const prepopulate = () => NOTES.forEach(note => createNote({
  ...note,
  date: new Date()
}));
