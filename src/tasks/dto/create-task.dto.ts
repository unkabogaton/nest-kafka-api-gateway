import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsString()
  title: string;

  @IsString()
  notes: string;
}
