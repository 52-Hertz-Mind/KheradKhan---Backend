import { Controller, Get, Param } from '@nestjs/common';
import { BookService } from './book.service';
import { ResponseMessageKey } from '../../enums/response-message.enum';

@Controller('book')
export class BookController {
  constructor(private readonly _bookService: BookService) {}

  // @Get()
  // async findAll() {
  //   const books = await this.bookService.findAll();
  //   return {
  //     message: { key: ResponseMessageKey.BOOKS_RETRIEVED },
  //     data: books,
  //   };
  // }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    const _book = await this._bookService.findById(id);
    return {
      message: { key: ResponseMessageKey.BOOK_RETRIEVED },
      data: _book,
    };
  }
}
