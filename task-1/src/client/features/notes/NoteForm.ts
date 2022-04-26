import { Component } from "../../../pseudo-react/Component";
import { createElement } from "../../../pseudo-react/createElement";
import { moveLocation } from "../../../pseudo-react/router/moveLocation";
import { categories } from "../../../shared/categories";
import { Button } from "../../components/button/Button";
import { Hooks } from "../../hooks";
import { addNote, editNote, selectNote } from "./notesSlice";

export const NoteForm: Component<{}, Hooks> = ({
  hooks: {
    useParams,
    useCallback,
    useSelector,
    useDispatch
  }
}) => {
  const dispatch = useDispatch();
  const {id} = useParams();

  const note = useSelector(state => selectNote(state, id))

  return createElement({
    type: 'form',
    children: [
      createElement({
        type: 'input',
        attributes: {
          autocomplete: 'off',
          value: note?.name ?? '',
          required: true,
          type: 'text',
          placeholder: 'Note name',
          name: 'noteName',
          class: `
            w-full
            outline-none
            px-4 py-2
            rounded-lg
            border-2
            border-solid
            border-gray-500
            text-gray-500
            focus:border-gray-800
            focus:text-gray-800
          `
        }
      }),

      createElement({
        type: 'div',
        attributes: {
          class: `
            mt-2
            rounded-lg
            w-full
            px-4
            border-solid
            border-2
            border-gray-500
            focus-within:border-gray-800
          `,
        },
        children: [
          createElement({
            type: 'select',
            attributes: {
              class: `
                w-full
                bg-transparent
                py-2
                outline-none
                text-gray-500
                focus:text-gray-800
              `,
              name: 'category'
            },
            children: Object.keys(categories)
              .map(category => createElement({
                type: 'option',
                attributes: {
                  value: category,
                  ...(
                    note?.category === category ? {
                      selected: 'true'
                    } : {}
                  )
                },
                children: [category]
              }))
          }),
        ]
      }),

      createElement({
        type: 'textarea',
        attributes: {
          name: 'content',
          required: true,
          placeholder: 'Note content',
          class: `
            my-2
            w-full
            outline-none
            px-4 py-2
            rounded-lg
            border-2
            border-solid
            border-gray-500
            text-gray-500
            focus:border-gray-800
            focus:text-gray-800
          `
        },
        children: [note?.content ?? '']
      }),

      createElement({
        type: Button,
        attributes: {
          content: note ? 'Edit note' : 'Create note',
          callback: useCallback(
            (e: MouseEvent) => {
              const form = (e.target as HTMLElement).parentElement as any;

              // Would be cool if user knew about it...
              if (!form.checkValidity()) return;

              const opts = {
                name: form.noteName.value,
                category: form.category.value,
                content: form.content.value
              };

              dispatch(note ? editNote(note, opts) : addNote(opts));

              moveLocation('/notes');
            }, [dispatch, editNote, addNote, moveLocation]
          )
        },
      }),
    ]
  })
}
