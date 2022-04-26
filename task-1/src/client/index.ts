import { createApp } from "../pseudo-react/createApp";
import { createElement } from "../pseudo-react/createElement";
import { store } from "./store";
import { App } from "./App";

import './icon.css';
import './index.css';

import { addNote } from "./features/notes/notesSlice";
import { Categories } from "../shared/types";

const notes: {
  name: string,
  category: keyof Categories
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
    content: 'I’m gonna have a dentist appointment on the 03.05.2021, I moved it from 05.05.2021'
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

notes.forEach(note => store.dispatch(addNote(note)));

const app = createApp({
  store,
  root: document.querySelector('#root')!,
  treeCreator: createElement({
    type: App
  })
});
