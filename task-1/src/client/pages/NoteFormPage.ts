import { Component } from "../../pseudo-react/Component";
import { createElement } from "../../pseudo-react/createElement";
import { Layout } from "../components/Layout";
import { NoteForm } from "../features/notes/NoteForm";

export const NoteFormPage: Component = () => {
  return createElement({
    type: Layout,
    attributes: {
      ratio: '1/3',
      content: createElement({
        type: 'div',
        attributes: {
          class: 'mt-8',
        },
        children: [
          createElement({
            type: NoteForm
          })
        ]
      })
    }
  })
}
