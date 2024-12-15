import { IHighlight } from '../highlight/highlight.interface';

export interface IBook {
  id?: string;
  name: string;
  author: string;
  image?: string;
  popularityScore: BookPopularityScoreEnum;
  highlights?: IHighlight[];
}

export enum BookPopularityScoreEnum {
  SOON = 'SOON',
  SOME_DAY = 'SOME_DAY',
  LATER = 'LATER',
  DISCARD = 'DISCARD',
}
