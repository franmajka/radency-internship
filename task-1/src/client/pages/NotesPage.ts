import { Component } from "../../pseudo-react/Component";
import { createElement } from "../../pseudo-react/createElement";
import { Link } from "../../pseudo-react/router/Link";
import { Button } from "../components/button/Button";
import { Layout } from "../components/Layout";
import { Notes } from "../features/notes/Notes";
import { NotesStats } from "../features/notes/NotesStats";

export const NotesPage: Component = () => {
  return createElement({
    type: Layout,
    attributes: {
      content: createElement({
        type: null,
        children: [
          createElement({
            type: Notes
          }),

          createElement({
            type: 'div',
            attributes: {
              class: 'mt-8'
            },
            children: [
              createElement({
                type: Link,
                attributes: {
                  to: '/createNote',
                  content: createElement({
                    type: Button,
                    attributes: {
                      content: 'Create new note'
                    }
                  })
                }
              })
            ]
          }),

          createElement({
            type: NotesStats
          })
        ]
      })
    }
  })
}
