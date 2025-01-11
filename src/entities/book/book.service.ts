import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { IBook } from './book.interface';
import { BookResponseDto } from '../../dtos/response/book/book-response.dto';
import _ from 'lodash';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly _bookRepository: Repository<Book>,
  ) {}

  // region Main logic methods
  public async findAll(): Promise<BookResponseDto[]> {
    const _books: Book[] = await this._bookRepository.find({
      where: { isDeleted: false },
    });
    return _.map(_books, (book) => this._convertBookToBookResponseDto(book));
  }

  public async findById(id: string): Promise<Book> {
    const _book: Book = await this._bookRepository.findOne({ where: { id } });
    // TODO Change
    if (!_book) throw new NotFoundException('Book not found');
    return _book;
  }

  public async createBook(data: IBook): Promise<Book> {
    const _book = this._bookRepository.create({
      name: data.name,
      // TODO Change
      author: data.author || 'ناشناس',
      image: data.image,
    });
    return this._bookRepository.save(_book);
  }
  // endregion

  // region Helper methods
  private _convertBookToBookResponseDto(data: Book): BookResponseDto {
    return {
      id: data.id,
      name: data.name,
      author: data.author,
      image: data.image,
      popularityScore: data.popularityScore,
      createdDate: data.createdDate,
      modifiedDate: data.modifiedDate,
    };
  }

  // endregion
}
