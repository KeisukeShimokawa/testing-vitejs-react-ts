import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  // https://en.wikipedia.org/wiki/ISO_8601
  @IsDate()
  @Type(() => Date)
  expires: Date;
}
