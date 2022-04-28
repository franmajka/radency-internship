import { Icons } from "../../app/types";

export type CategoryIcon = Exclude<Icons, 'edit' | 'archive' | 'delete'>;

export enum Categories {
  "Task" = 'task',
  "Idea" = 'idea',
  "Quote" = 'quote',
  "Random Though" = 'random-thought',
};

export type Note = {
  id: string,
  category: keyof typeof Categories,
  name: string,
  content: string,
  date: number,
  dates: string[],
  isArchived: boolean,
};
