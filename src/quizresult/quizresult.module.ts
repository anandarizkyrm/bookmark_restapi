import { Module } from '@nestjs/common';
import { QuizresultService } from './quizresult.service';
import { QuizresultController } from './quizresult.controller';

@Module({
  providers: [QuizresultService],
  controllers: [QuizresultController],
})
export class QuizresultModule {}
