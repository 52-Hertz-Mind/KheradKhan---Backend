import { Controller, Get } from '@nestjs/common';
import { BookService } from './book.service';
import { ResponseMessageKey } from '../../enums/response-message.enum';

@Controller('book')
export class BookController {
  constructor(private readonly _bookService: BookService) {}

  @Get('find-all')
  public async findAll() {
    const _books = await this._bookService.findAll();
    return {
      message: { key: ResponseMessageKey.BOOKS_RETRIEVED },
      data: _books,
    };
  }

  // @Get('final:id')
  // public async findById(@Param('id') id: string) {
  //   const _book = await this._bookService.findById(id);
  //   return {
  //     message: { key: ResponseMessageKey.BOOK_RETRIEVED },
  //     data: _book,
  //   };
  // }
}
