import { useAppSelector } from "../../app/hooks"
import { Table } from "../../components/table/Table";
import { getKeys } from "../../utils/getKeys";
import { selectNotesStats } from "./notesSlice"
import { Categories } from "./types";

const categoryIconSize = '2rem';

export const NotesStats = () => {
  const stats = useAppSelector(selectNotesStats);

  return (
    <div className='mt-8'>
      <Table
        cols={[
          { key: 'CategoryIcon', width: categoryIconSize },
          { key: 'NoteCategory', title: 'Note Category', highlight: true },
          { key: 'Active', title: 'Active' },
          { key: 'Archived', title: 'Archived' },
        ]}
        items={
          getKeys(stats).map(category => ({
            key: category,
            row: [
              { icon: Categories[category], rounded: true },
              category,
              stats[category].active,
              stats[category].archived
            ]
          }))
        }
      />
    </div>
  )
}
