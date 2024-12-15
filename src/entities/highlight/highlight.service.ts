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
    private readonly highlightRepository: Repository<Highlight>,
    private readonly bookService: BookService,
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
    let book: Book;

    if (data.bookId) book = await this.bookService.findById(data.bookId);
    else
      book = await this.bookService.createBook(
        this._convertCreateHighlightRequestDtoToIBook(data),
      );

    // TODO Change
    if (!book) throw new NotFoundException('Book not found or created');

    const highlight = this.highlightRepository.create({
      text: data.text,
      // TODO Change
      pageNumber: 1,
      book,
    });

    await this.highlightRepository.save(highlight);
    return this._convertHighlightToHighlightResponseDto(highlight);
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
    return {
      id: data.id,
      text: data.text,
      popularityScore: data.popularityScore,
      pageNumber: data.pageNumber,
      book: this.bookService.convertBookToBookResponseDto(data.book),
      note: data.note,
      createdDate: data.createdDate,
      modifiedDate: data.modifiedDate,
    };
  }

  // endregion
}
