import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateHighlightRequestDto {
  @IsString()
  text: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUUID()
  bookId?: string;
}
