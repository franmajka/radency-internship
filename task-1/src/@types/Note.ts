import { IStateDefault } from '../client/components/Component';
import categories from '../server/repositories/categories.repository';

export interface INote extends IStateDefault {
  id: string,
  category: keyof typeof categories,
  name: string,
  content: string,
  date?: Date,
  dates?: Date[],
  isArchived?: boolean,
};
