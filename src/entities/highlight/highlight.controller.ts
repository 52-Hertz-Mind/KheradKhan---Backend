import { Controller, Post, Body } from '@nestjs/common';
import { HighlightService } from './highlight.service';
import { CreateHighlightRequestDto } from '../../dtos/request/highlight/create-highlight-request.dto';
import { HighlightResponseDto } from '../../dtos/response/highlight/highlight-response.dto';
import { ResponseMessageKey } from '../../enums/response-message.enum';

@Controller('highlight')
export class HighlightController {
  constructor(private readonly highlightService: HighlightService) {}

  @Post('createHighlight')
  async createHighlight(@Body() createHighlightDto: CreateHighlightRequestDto) {
    const highlight: HighlightResponseDto =
      await this.highlightService.createHighlight(createHighlightDto);
    return {
      message: { key: ResponseMessageKey.HIGHLIGHT_CREATED },
      data: highlight,
    };
  }

  // @Get()
  // async findAll() {
  //   const highlights = await this.highlightService.findAll();
  //   return {
  //     message: { key: ResponseMessageKey.HIGHLIGHTS_RETRIEVED },
  //     data: highlights,
  //   };
  // }
  //
  // @Get('/:id')
  // async findById(@Param('id') id: string) {
  //   const highlight = await this.highlightService.findById(id);
  //   return {
  //     message: { key: ResponseMessageKey.HIGHLIGHT_RETRIEVED },
  //     data: highlight,
  //   };
  // }
  //
  //
  // @Delete('/:id')
  // async deleteById(@Param('id') id: string) {
  //   const highlight = await this.highlightService.deleteById(id);
  //   return {
  //     message: { key: ResponseMessageKey.HIGHLIGHT_DELETED },
  //     data: highlight,
  //   };
  // }
  //
  // @Post('/note/:id')
  // async addNote(
  //   @Param('id') id: string,
  //   @Body() addNoteDto: AddNoteRequestDto,
  // ) {
  //   const highlight = await this.highlightService.addNote(id, addNoteDto);
  //   return {
  //     message: { key: ResponseMessageKey.NOTE_ADDED },
  //     data: highlight,
  //   };
  // }
  //
  // @Patch('/note/:id')
  // async updateNote(
  //   @Param('id') id: string,
  //   @Body() updateNoteDto: UpdateNoteRequestDto,
  // ) {
  //   const highlight = await this.highlightService.updateNote(id, updateNoteDto);
  //   return {
  //     message: { key: ResponseMessageKey.NOTE_UPDATED },
  //     data: highlight,
  //   };
  // }
  //
  // @Delete('/note/:id')
  // async deleteNote(@Param('id') id: string) {
  //   const highlight = await this.highlightService.deleteNote(id);
  //   return {
  //     message: { key: ResponseMessageKey.NOTE_DELETED },
  //     data: highlight,
  //   };
  // }
}
