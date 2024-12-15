import { HighlightPopularityScoreEnum } from './highlight.interface';

const HIGHLIGHT_POPULARITY_SCORE_DEFAULT =
  HighlightPopularityScoreEnum.SOME_DAY;

export function getHighlightPopularityScoreDefault(): HighlightPopularityScoreEnum {
  return HIGHLIGHT_POPULARITY_SCORE_DEFAULT;
}
