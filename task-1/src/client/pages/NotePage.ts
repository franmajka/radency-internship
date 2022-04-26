import { Component } from "../../pseudo-react/Component";
import { createElement } from "../../pseudo-react/createElement";
import { categories } from "../../shared/categories";
import { appTheme } from "../appTheme";
import { RoundIcon } from "../components/icon/RoundIcon";
import { Layout } from "../components/Layout";
import { selectNote } from "../features/notes/notesSlice";
import { Hooks } from "../hooks";

export const NotePage: Component<{}, Hooks> = ({
  hooks: { useParams, useSelector }
}) => {
  const { id } = useParams();
  const note = useSelector(state => selectNote(state, id));

  return createElement({
    type: Layout,
    attributes: {
      content: createElement({
        type: "div",
        attributes: {
          class: 'mt-8'
        },
        children: note ? [
          createElement({
            type: 'h1',
            attributes: {
              class: 'text-5xl font-bold',
              style: `color: ${appTheme.light["text-color-highlight"]}`
            },
            children: [note.name]
          }),

          createElement({
            type: 'div',
            attributes: {
              class: 'mt-4'
            },
            children: [
              createElement({
                type: 'h2',
                attributes: {
                  class: 'text-lg',
                  style: `color: ${appTheme.light["text-color"]}`
                },
                children: [`Created: ${(new Date(note.date)).toLocaleString('ru-Ru')}`]
              }),

              createElement({
                type: 'h2',
                attributes: {
                  class: 'text-lg',
                  style: `color: ${appTheme.light["text-color"]}`
                },
                children: [
                  createElement({
                    type: 'span',
                    attributes: {
                      class: 'mr-2'
                    },
                    children: [`Category: ${note.category}`]
                  }),
                  createElement({
                    type: RoundIcon,
                    attributes: {
                      background: appTheme.dark['background-color'],
                      color: appTheme.dark['text-color'],
                      size: '1.5rem',
                      icon: categories[note.category]
                    }
                  })
                ]
              }),
            ]
          }),

          createElement({
            type: 'p',
            attributes: {
              class: 'text-lg mt-2',
              style: `color: ${appTheme.light["text-color"]}`
            },
            children: [note.content]
          }),
        ] : [
          createElement({
            type: 'h1',
            attributes: {
              class: 'text-6xl text-red-700 text-center'
            },
            children: ['404 Page not found']
          })
        ]
      })
    }
  })
}
