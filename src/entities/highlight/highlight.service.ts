import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Highlight } from './highlight.entity';
import { CreateHighlightRequestDto } from '../../dtos/request/highlight/create-highlight-request.dto';
import { Book } from '../book/book.entity';
import { BookService } from '../book/book.service';
import { IBook } from '../book/book.interface';
import { HighlightResponseDto } from '../../dtos/response/highlight/highlight-response.dto';

@Injectable()
export class HighlightService {
  constructor(
    @InjectRepository(Highlight)
    private readonly _highlightRepository: Repository<Highlight>,
    private readonly _bookService: BookService,
  ) {}

  // async findAll(): Promise<IHighlight[]> {
  //   return this.highlightRepository.find();
  // }
  //
  // async findById(id: string): Promise<IHighlight> {
  //   const highlight = await this.highlightRepository.findOne({ where: { id } });
  //   if (!highlight) {
  //     throw new NotFoundException('Highlight not found');
  //   }
  //   return highlight;
  // }
  //
  // async deleteById(id: string): Promise<IHighlight> {
  //   const highlight = await this.findById(id);
  //   await this.highlightRepository.delete(id);
  //   return highlight;
  // }
  //
  // async addNote(id: string, data: AddNoteRequestDto): Promise<IHighlight> {
  //   const highlight = await this.findById(id);
  //   if (highlight.note) {
  //     throw new Error('Note already exists');
  //   }
  //   highlight.note = data.note;
  //   return this.highlightRepository.save(highlight);
  // }
  //
  // async updateNote(
  //   id: string,
  //   data: UpdateNoteRequestDto,
  // ): Promise<IHighlight> {
  //   const highlight = await this.findById(id);
  //   highlight.note = data.note;
  //   return this.highlightRepository.save(highlight);
  // }
  //
  // async deleteNote(id: string): Promise<IHighlight> {
  //   const highlight = await this.findById(id);
  //   const previousHighlight = { ...highlight };
  //   highlight.note = null;
  //   await this.highlightRepository.save(highlight);
  //   return previousHighlight;
  // }

  // region Main logic methods
  public async createHighlight(
    data: CreateHighlightRequestDto,
  ): Promise<HighlightResponseDto> {
    let _book: Book;

    if (data.bookId) _book = await this._bookService.findById(data.bookId);
    else
      _book = await this._bookService.createBook(
        this._convertCreateHighlightRequestDtoToIBook(data),
      );

    // TODO Change
    if (!_book) throw new NotFoundException('Book not found or created');

    const _highlight = this._highlightRepository.create({
      text: data.text,
      // TODO Change
      pageNumber: 1,
      book: _book,
    });

    await this._highlightRepository.save(_highlight);
    return this._convertHighlightToHighlightResponseDto(_highlight);
  }

  public async findHighlightsByBookId(
    id: string,
  ): Promise<HighlightResponseDto[]> {
    const _highlights: Highlight[] = await this._highlightRepository.find({
      where: { book: { id }, isDeleted: false },
      relations: ['book'],
      order: { createdDate: 'ASC' },
    });
    // TODO Change
    if (!_highlights) throw new NotFoundException('Highlight not found');
    // TODO Change
    return _highlights.map((_highlight) =>
      this._convertHighlightToHighlightResponseDto(_highlight),
    );
  }

  // endregion

  // region Helper methods
  private _convertCreateHighlightRequestDtoToIBook(
    data: CreateHighlightRequestDto,
  ): IBook {
    return {
      name: data.name,
      author: null,
      popularityScore: null,
    };
  }

  private _convertHighlightToHighlightResponseDto(
    data: Highlight,
  ): HighlightResponseDto {
    const { book } = data;
    return {
      highlight: {
        id: data.id,
        text: data.text,
        popularityScore: data.popularityScore,
        pageNumber: data.pageNumber,
        note: data.note,
        createdDate: data.createdDate,
        modifiedDate: data.modifiedDate,
      },
      book: book && {
        id: book.id,
        name: book.name,
        author: book.author,
        image: book.image,
        popularityScore: book.popularityScore,
        createdDate: book.createdDate,
        modifiedDate: book.modifiedDate,
      },
    };
  }

  // endregion
}
