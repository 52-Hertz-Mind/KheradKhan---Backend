import { BookPopularityScoreEnum } from '../../../entities/book/book.interface';

export interface BookResponseDto {
  id: string;
  name: string;
  author: string;
  image?: string;
  popularityScore: BookPopularityScoreEnum;
  createdDate: Date;
  modifiedDate: Date;
}
