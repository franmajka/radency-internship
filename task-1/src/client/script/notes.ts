import { Notes } from '../components/Notes';
import { v4 } from 'uuid';

console.log("hello world!");

const notes = new Notes({
  $element: document.querySelector('#root')!,
  initialState: {
    notes: [
      {
        id: v4(),
        category: 'Task',
        name: 'Доделать таск',
        content: 'Ох если бы вы знали как же я немного устал',
      },
    ]
  }
})

const id = v4();
setTimeout(() => {
  notes.addNote(id, {
    id,
    category: 'Task',
    name: 'Shopping list',
    content: 'Tomatoes, bread',
  })
}, 5000)

window.addEventListener('unload', () => notes.destroy())
