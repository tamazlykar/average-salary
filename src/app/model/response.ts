import { Vacancy } from './vacancy';

export interface Response {
  found: number;
  items: Vacancy[];
  page: number;
  pages: number;
}
