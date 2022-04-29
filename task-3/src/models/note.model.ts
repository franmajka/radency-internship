import { date, InferType, mixed, object, reach, string } from 'yup';

export const categories = [
  'Task',
  'Quote',
  'Random Though',
  'Idea',
] as const;

export type Category = (typeof categories)[number]

export const noteSchema = object({
  name: string().required(),
  content: string().required(),
  category: mixed<Category>().oneOf([...categories]).required(),
  date: date().default(() => new Date),
});

export type NoteInput = InferType<typeof noteSchema>;

export interface Note extends Omit<NoteInput, 'date'> {
  id: string,
  dates: string[],
  date: string
};

export const editableNoteProps = ['name', 'category', 'content'] as const;

export const editNoteOptsSchema = object(Object.fromEntries(
  editableNoteProps
    .map(key => [key, reach(noteSchema, key).optional()])
));

export type EditNoteInput = {
  [key in keyof Pick<NoteInput, (typeof editableNoteProps)[number]>]?: NoteInput[key]
}
