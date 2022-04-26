import { Component } from "../../../pseudo-react/Component";
import { createElement } from "../../../pseudo-react/createElement";
import { categories } from "../../../shared/categories";
import { Categories } from "../../../shared/types";
import { Table } from "../../components/table/Table";
import { Hooks } from "../../hooks";
import { selectNotesStats } from "./notesSlice";

const categoryIconSize = '2rem';

export const NotesStats: Component<{}, Hooks> = ({ hooks: { useSelector } }) => {
  const stats = useSelector(selectNotesStats);

  return createElement({
    type: "div",
    attributes: {
      class: 'mt-8'
    },
    children: [
      createElement({
        type: Table,
        attributes: {
          cols: [
            { width: categoryIconSize },
            { title: 'Note Category', highlight: true },
            { title: 'Active' },
            { title: 'Archived' },
          ],
          items: (<(keyof Categories)[]>Object.keys(stats))
            .map(category => [
              { icon: categories[category], rounded: true },
              category,
              String(stats[category].active),
              String(stats[category].archived)
            ])
        }
      })
    ]
  })
}
