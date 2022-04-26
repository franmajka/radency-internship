import { Icons } from "./types";

const _categories = {
  "Task": 'task',
  "Idea": 'idea',
  "Quote": 'quote',
  "Random Though": 'random-thought',
};

export const categories = _categories as Record<keyof typeof _categories, Icons>;
