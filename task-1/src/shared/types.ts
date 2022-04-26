import { categories } from "./categories";

export type Categories = typeof categories;

export type Icons = 'random-thought' | 'edit' | 'idea' | 'task' | 'archive' | 'quote' | 'delete';

export type Note = {
  id: string,
  category: keyof Categories,
  name: string,
  content: string,
  date: number,
  dates: string[],
  isArchived: boolean,
};
