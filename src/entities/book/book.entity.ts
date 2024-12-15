import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Highlight } from '../highlight/highlight.entity';
import { BookPopularityScoreEnum } from './book.interface';
import { getBookPopularityScoreDefault } from "./book.constants";

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  author: string;

  @Column({ nullable: true })
  image: string;

  @Column({
    type: 'enum',
    enum: BookPopularityScoreEnum,
    default: getBookPopularityScoreDefault(),
  })
  popularityScore: BookPopularityScoreEnum;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  modifiedDate: Date;

  @OneToMany(() => Highlight, (highlight) => highlight.book, { cascade: true })
  highlights: Highlight[];
}
