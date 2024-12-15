import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Book } from '../book/book.entity';
import { HighlightPopularityScoreEnum } from './highlight.interface';
import { getHighlightPopularityScoreDefault } from './highlight.constants';

@Entity('highlights')
export class Highlight {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @Column('int')
  pageNumber: number;

  @Column({ nullable: true })
  note: string;

  @Column({
    type: 'enum',
    enum: HighlightPopularityScoreEnum,
    default: getHighlightPopularityScoreDefault(),
  })
  popularityScore: HighlightPopularityScoreEnum;

  @Column({ type: 'boolean', default: false })
  isFavorite: boolean;

  @Column({ type: 'boolean', default: false })
  isDiscard: boolean;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  modifiedDate: Date;

  @ManyToOne(() => Book, (book) => book.highlights, { onDelete: 'CASCADE' })
  book: Book;
}
