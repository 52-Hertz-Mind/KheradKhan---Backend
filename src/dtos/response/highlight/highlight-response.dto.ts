import { HighlightPopularityScoreEnum } from '../../../entities/highlight/highlight.interface';
import { BookPopularityScoreEnum } from '../../../entities/book/book.interface';

export class HighlightResponseDto {
  highlight: HighlightResponseDtoHighlight;
  book: HighlightResponseDtoBook;
}

export class HighlightResponseDtoHighlight {
  id: string;
  text: string;
  pageNumber: number;
  note?: string;
  popularityScore: HighlightPopularityScoreEnum;
  createdDate: Date;
  modifiedDate: Date;
}

export class HighlightResponseDtoBook {
  id: string;
  name: string;
  author: string;
  image?: string;
  popularityScore: BookPopularityScoreEnum;
  createdDate: Date;
  modifiedDate: Date;
}
