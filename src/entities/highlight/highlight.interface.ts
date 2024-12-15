import { IBook } from '../book/book.interface';

export interface IHighlight {
  id: string;
  text: string;
  pageNumber: number;
  note?: string;
  popularityScore: HighlightPopularityScoreEnum;
  createdDate: Date;
  modifiedDate: Date;
  book: IBook;
}

export enum HighlightPopularityScoreEnum {
  SOON = 'SOON',
  SOME_DAY = 'SOME_DAY',
  LATER = 'LATER',
  DISCARD = 'DISCARD',
}
