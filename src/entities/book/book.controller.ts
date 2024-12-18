import { Controller, Get } from '@nestjs/common';
import { BookService } from './book.service';
import { ResponseMessageKey } from '../../enums/response-message.enum';
import { BookResponseDto } from '../../dtos/response/book/book-response.dto';

@Controller('book')
export class BookController {
  constructor(private readonly _bookService: BookService) {}

  @Get('find-all')
  public async findAll() {
    const _books: BookResponseDto[] = await this._bookService.findAll();
    return {
      message: { key: ResponseMessageKey.BOOKS_RETRIEVED },
      data: _books,
    };
  }

  // @Get('/:id')
  // async findById(@Param('id') id: string) {
  //   const _book = await this._bookService.findById(id);
  //   return {
  //     message: { key: ResponseMessageKey.BOOK_RETRIEVED },
  //     data: _book,
  //   };
  // }
}
