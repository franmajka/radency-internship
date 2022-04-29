import { date, InferType, mixed, object, reach, string } from 'yup';

// It works kinda bad with const array
export enum Categories {
  'Task',
  'Random Though',
  'Idea',
  'Quote'
};

export const noteSchema = object({
  name: string().required(),
  content: string().required(),
  category: mixed<keyof typeof Categories>()
    .oneOf(Object.keys(Categories).filter(key => isNaN(+key)) as any)
    .required(),
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
