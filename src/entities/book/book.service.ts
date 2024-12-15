import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { IBook } from './book.interface';
import { BookResponseDto } from '../../dtos/response/book/book-response.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  // async findAll(): Promise<Book[]> {
  //   return this.bookRepository.find();
  // }

  // region Main logic methods
  public async findById(id: string): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });
    // TODO Change
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  public async createBook(data: IBook): Promise<Book> {
    const book = this.bookRepository.create({
      name: data.name,
      // TODO Change
      author: data.author || 'ناشناس',
      image: data.image,
    });
    return this.bookRepository.save(book);
  }

  // endregion

  // region Helper methods
  public convertBookToBookResponseDto(data: Book): BookResponseDto {
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
