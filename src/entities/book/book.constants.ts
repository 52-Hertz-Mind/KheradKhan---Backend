import { BookPopularityScoreEnum } from './book.interface';

const BOOK_POPULARITY_SCORE_DEFAULT = BookPopularityScoreEnum.SOME_DAY;

export function getBookPopularityScoreDefault(): BookPopularityScoreEnum {
  return BOOK_POPULARITY_SCORE_DEFAULT;
}
