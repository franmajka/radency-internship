import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Button } from "../../components/button/Button";
import { getKeys } from "../../utils/getKeys";
import { noteAdded, noteEdited, selectNote } from "./notesSlice";
import { Categories } from "./types";

// TODO: It should be written based on app theme
const formComponentClasses = `
  mt-2
  rounded-lg
  w-full
  px-4
  border-solid
  border-2
  border-gray-500
`;

const formTextClasses = `
  py-2
  outline-none
  text-gray-500
  focus:text-gray-800
`;

const inputClasses = `
  ${formComponentClasses}
  ${formTextClasses}
  outline-none
  focus:border-gray-800
`;

export const NoteForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {noteId} = useParams();
  const note = useAppSelector(state => selectNote(state, noteId ?? ''));

  const [name, setName] = useState(note ? note.name : '');
  const [content, setContent] = useState(note ? note.content : '');
  const [category, setCategory] = useState<keyof typeof Categories>(note ? note.category : 'Task');

  const submitCb = (e: React.MouseEvent) => {
    e.preventDefault()

    if (!name.trim() || !content.trim()) return;

    const opts = { name, content, category };

    dispatch(note ? noteEdited(note, opts) : noteAdded(opts));

    navigate('/notes');
  };

  return (
    <form>
      <input
        required
        type='text'
        autoComplete="off"
        name="noteName"
        placeholder="Note name"
        className={inputClasses}
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <div className={`${formComponentClasses} focus-within:border-gray-800`}>
        <select
          className={`${formTextClasses} bg-transparent outline-none w-full`}
          value={category}
          onChange={e => setCategory(e.target.value as any)}
        >
          {getKeys(Categories).map(categoryName => (
            <option key={categoryName} value={categoryName}>
              {categoryName}
            </option>
          ))}
        </select>
      </div>

      <textarea
        required
        name="content"
        placeholder="Note content"
        className={inputClasses}
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      <Button onClick={submitCb}>
        {note ? 'Edit note' : 'Create note'}
      </Button>
    </form>
  )
}
