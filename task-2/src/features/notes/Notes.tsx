import { useCallback } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Table } from "../../components/table/Table";
import { archiveToggled, noteEdited, noteRemoved, selectNotes } from "./notesSlice";
import { Categories, Note } from "./types";

const categoryIconSize = '2rem';
const iconSize = '1rem'

export const Notes = () => {
  const notes = useAppSelector(selectNotes);
  const dispatch = useAppDispatch();

  const toggleArchivedViewCb = useCallback(() => {
    dispatch(archiveToggled());
  }, [dispatch]);

  const toggleArchivedNoteCb = (note: Note) => (
    () => {
      dispatch(noteEdited(note, { isArchived: !note.isArchived }));
    }
  );

  const removeNoteCb = (note: Note) => (
    () => {
      dispatch(noteRemoved(note.id));
    }
  );

  return (
    <div className="mt-8">
      <Table
        cols={[
          { key: 'CategoryIcon', width: categoryIconSize },
          { key: 'Name', title: 'Name', highlight: true },
          { key: 'Created', title: 'Created' },
          { key: 'Category', title: 'Category' },
          { key: 'Content', title: 'Content', width: '1.5fr' },
          { key: 'Dates', title: 'Dates' },
          { key: 'EditIcon', width: iconSize },
          { key: 'ArchiveIcon', width: iconSize, title: { icon: 'archive', callback: toggleArchivedViewCb } },
          { key: 'DeleteIcon', width: iconSize, title: { icon: 'delete' } },
        ]}

        items={
          notes
            .concat()
            .sort((lhs, rhs) => rhs.date - lhs.date) // Most recent first
            .map(note => ({
              key: note.id,
              row: [
                { icon: Categories[note.category], rounded: true },
                <Link to={`${note.id}`}>{note.name}</Link>,
                (new Date(note.date)).toLocaleDateString('ru-Ru'),
                note.category,
                note.content,
                note.dates.join(', '),
                { icon: 'edit', link: `${note.id}/edit` },
                { icon: 'archive', callback: toggleArchivedNoteCb(note) },
                { icon: 'delete', callback: removeNoteCb(note) },
              ]
            }))
        }
      />
    </div>
  )
}
