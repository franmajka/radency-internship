import { useContext } from "react";
import { useParams } from "react-router-dom"
import { useAppSelector } from "../app/hooks";
import { RoundIcon } from "../components/icon/RoundIcon";
import { Layout } from "../components/Layout"
import { ThemesContext } from "../contexts/ThemesContext";
import { selectNote } from "../features/notes/notesSlice";
import { Categories } from "../features/notes/types";

export const NotePage = () => {
  const {noteId} = useParams();
  const note = useAppSelector(state => selectNote(state, noteId ?? ''));

  const themes = useContext(ThemesContext);
  const theme = themes[themes.main as 'light' | 'dark'];

  if (!note) {
    return (
      <h1 className="text-6xl text-red-700 text-center">
        404 Page Not Found
      </h1>
    );
  }

  return (
    <Layout>
      <div className='mt-8'>
        <h1
          className='text-5xl font-bold'
          style={{color: theme['text-color-highlight']}}
        >
          {note.name}
        </h1>

        <div className="mt-4">
          <h2
            className="text-lg"
            style={{color: theme['text-color']}}
          >
            Created: {(new Date(note.date)).toLocaleString('ru-Ru')}
          </h2>

          <h2
            className="text-lg"
            style={{color: theme['text-color']}}
          >
            <span className='mr-2'>
              Category: {note.category}
            </span>

            <RoundIcon
              icon={Categories[note.category]}
              background={theme['text-color']}
              color={theme['background-color']}
              size='1.5rem'
            />
          </h2>
        </div>

        <p className='text-lg mt-2' style={{ color: theme['text-color'] }}>
          {note.content}
        </p>
      </div>
    </Layout>
  )
}
