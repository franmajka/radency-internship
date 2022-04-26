import { Component } from "../../../pseudo-react/Component";
import { createElement } from "../../../pseudo-react/createElement";
import { Link } from "../../../pseudo-react/router/Link";
import { categories } from "../../../shared/categories";
import { Icons, Note } from "../../../shared/types";
import { Table } from "../../components/table/Table";
import { Hooks } from "../../hooks";
import { editNote, removeNote, selectNotes, toggleArchived } from "./notesSlice";

const categoryIconSize = '2rem';
const iconSize = '1rem'

export const Notes: Component<{}, Hooks> = ({
  hooks: {useSelector, useDispatch, useCallback}
}) => {
  const notes = useSelector(selectNotes);
  const dispatch = useDispatch();

  const toggleArchivedViewCb = useCallback(() => {
    dispatch(toggleArchived());
  }, [dispatch, toggleArchived])

  const toggleArchivedNoteCb = (note: Note) => useCallback(
    () => {
      dispatch(editNote(note, { isArchived: !note.isArchived }));
    }, [dispatch, editNote, note]
  );

  const removeNoteCb = (note: Note) => useCallback(
    () => {
      dispatch(removeNote(note.id))
    }, [dispatch, removeNote, note.id]
  )

  return createElement({
    type: 'div',
    attributes: {
      class: `mt-8`
    },
    children: [
      createElement({
        type: Table,
        attributes: {
          cols: [
            { width: categoryIconSize },
            { title: 'Name', highlight: true },
            { title: 'Created' },
            { title: 'Category' },
            { title: 'Content', width: '1.5fr' },
            { title: 'Dates' },
            { width: iconSize },
            { width: iconSize, title: { icon: 'archive', callback: toggleArchivedViewCb } },
            { width: iconSize, title: { icon: 'delete' } },
          ],
          items: notes
            .concat()
            .sort((lhs, rhs) => rhs.date - lhs.date) // Most recent first
            .map(note => [
              { icon: categories[note.category] as Icons, rounded: true },
              createElement({ type: Link, attributes: { to: `/notes/${note.id}`, content: note.name } }),
              (new Date(note.date)).toLocaleDateString('ru-Ru'),
              note.category,
              note.content,
              note.dates.join(', '),
              { icon: 'edit' as Icons, link: `/editNote/${note.id}` },
              { icon: 'archive' as Icons, callback: toggleArchivedNoteCb(note) },
              { icon: 'delete' as Icons, callback: removeNoteCb(note) },
            ])
        }
      })
    ]
  });
}
