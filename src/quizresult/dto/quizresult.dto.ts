import { IsNotEmpty, IsNumber } from 'class-validator';

export class QuizResultDto {
  @IsNumber()
  @IsNotEmpty()
  correctAnswer: number;

  @IsNumber()
  @IsNotEmpty()
  totalQueztion: number;

  @IsNumber()
  @IsNotEmpty()
  totaltime: number;
}
