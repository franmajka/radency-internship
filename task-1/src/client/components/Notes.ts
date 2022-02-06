import { Component, IStateDefault } from './Component';
import { Note } from './Note';

import { INote as INoteState} from '../../@types/Note';

import { httpRequest } from '../helpers/httpRequest';
import { Error, Success } from '../../@types/response';

interface INotesState extends IStateDefault {
  notes: {
    [key: string]: INoteState
  };
}

export class Notes extends Component<INotesState> {
  constructor({$element, initialState: { notes = [] }} : {
    $element: HTMLElement,
    initialState: { notes: INoteState[] }
  }) {
    super({$element, initialState: { notes: {} }});

    this.addNotes(
      notes.map(noteState => ({
        key: noteState.id,
        noteState
      }))
    );
  }

  protected async componentDidMount(): Promise<void> {
    type NotesResponse = Success & { notes: INoteState[] };
    const data = await httpRequest({
      method: 'GET',
      url: '/api/notes',
    }) as Error | NotesResponse;

    if (data.error) {
      throw data.message;
    }

    this.addNotes((data as NotesResponse).notes.map(noteState => ({
      key: noteState.id,
      noteState
    })));
  }

  public addNotes(notes: {key: string, noteState: INoteState}[]) {
    if (!notes.length) return;

    const notesState: typeof this.state.notes = {};

    for (const {key, noteState} of notes) {
      const root = document.createElement('tr');
      const child = new Note({
        $element: root,
        initialState: noteState,
      });

      notesState[key] = child.state;

      this.addChildComponent({
        insertChild: () => {
          child.setState(this.state.notes[key]);
          this.$element.querySelector('#notes')?.appendChild(root);
        },
        child
      });
    }

    this.setState({
      notes: {
        ...this.state.notes,
        ...notesState,
      }
    })
  }

  public addNote(key: string, noteState: INoteState) {
    this.addNotes([{key, noteState}]);
  }

  protected render(): void {
    this.$element.innerHTML = `
      <table>
        <thead></thead>
        <tbody id='notes'></tbody>
      </table>

      <a
        href='/create-note'
        class='rounded-lg px-4 py-2 mt-2 inline-block bg-blue-700 text-white text-right transition-colors hover:bg-blue-900'
      >
        Create Note
      </a>

      <table>
        <thead></thead>
        <tbody></tbody>
      </table>
    `;
  }
}
