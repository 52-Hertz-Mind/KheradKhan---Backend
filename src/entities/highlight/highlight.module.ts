import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Highlight } from './highlight.entity';
import { HighlightService } from './highlight.service';
import { HighlightController } from './highlight.controller';
import { BookModule } from '../book/book.module';

@Module({
  imports: [TypeOrmModule.forFeature([Highlight]), BookModule],
  controllers: [HighlightController],
  providers: [HighlightService],
  exports: [HighlightService],
})
export class HighlightModule {}
