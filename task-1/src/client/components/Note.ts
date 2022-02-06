import { Component } from './Component';
import categories from '../../server/repositories/categories.repository';

import { INote as INoteState } from '../../@types/Note';



export class Note extends Component<INoteState> {
  constructor({ $element, initialState } : {
    $element: HTMLElement,
    initialState: INoteState
  }) {
    super({
      $element,
      initialState,
      defaultState: {
        date: new Date(),
        dates: [],
        isArchived: false
      }
    });
  }

  protected render(): void {
    const {id, name, date, category, content, dates} = this.state;
    this.$element.innerHTML = `
      <th>
        <div class='rounded-full h-8 w-8 flex justify-center items-center bg-gray-700'>
          <span class='icon-${categories[category]} text-white text-sm'></span>
        </div>
      </th>

      <th class='text-ellipsis'>${name}</th>
      <th>${date?.toLocaleDateString('ru-RU')}</th>
      <th>${category}</th>
      <th class='text-ellipsis'>${content}</th>
      <th>${dates!.join(', ')}</th>

      <th>
        <a class='icon-edit' href='/edit-note/${id}'></a>
        <a class='icon-archive' href='/archive-icon/${id}'></a>
        <a class='icon-delete'></a>
      </th>
    `;
  }
}
