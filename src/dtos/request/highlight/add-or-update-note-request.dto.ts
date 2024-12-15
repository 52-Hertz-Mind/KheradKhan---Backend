import { IsString } from 'class-validator';

export class AddOrUpdateNoteRequestDto {
  @IsString()
  note: string;
}
