import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStudentDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  grade: number;
}
