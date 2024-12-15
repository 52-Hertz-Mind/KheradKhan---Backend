import { BookResponseDto } from '../book/book-response.dto';
import { HighlightPopularityScoreEnum } from '../../../entities/highlight/highlight.interface';

export class HighlightResponseDto {
  id: string;
  text: string;
  pageNumber: number;
  note?: string;
  popularityScore: HighlightPopularityScoreEnum;
  createdDate: Date;
  modifiedDate: Date;
  book: BookResponseDto;
}
