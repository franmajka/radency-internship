import { Component } from "../pseudo-react/Component";
import { createElement } from "../pseudo-react/createElement";
import { Route } from "../pseudo-react/router/Route";

import { NotePage } from "./pages/NotePage";
import { NotesPage } from "./pages/NotesPage";
import { NoteFormPage } from "./pages/NoteFormPage";

export const App: Component = () => {
  return createElement({
    type: null,
    children: [
      createElement({
        type: Route,
        attributes: {
          path: '/notes',
          content: createElement({
            type: NotesPage
          })
        }
      }),

      createElement({
        type: Route,
        attributes: {
          path: '/notes/:id',
          content: createElement({
            type: NotePage
          })
        }
      }),

      createElement({
        type: Route,
        attributes: {
          path: '/createNote',
          content: createElement({
            type: NoteFormPage
          })
        }
      }),

      createElement({
        type: Route,
        attributes: {
          path: '/editNote/:id',
          content: createElement({
            type: NoteFormPage
          })
        }
      }),
    ]
  })
}
