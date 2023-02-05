import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { QuizResultDto } from './dto/quizresult.dto';
import { QuizresultService } from './quizresult.service';

@UseGuards(JwtGuard)
@Controller('quiz')
export class QuizresultController {
  constructor(private quizResultService: QuizresultService) {}

  @Get('')
  getQuiz() {
    return this.quizResultService.getAllQuizResult();
  }

  @Get('results')
  getUserResultQuiz(@GetUser('id') userId: number) {
    return this.quizResultService.getUserQuizResults(userId);
  }

  @Get('best-score')
  getAllBestScore() {
    return this.quizResultService.getAllBestScore();
  }

  @Post('')
  addQuizResult(@GetUser('id') userId: number, @Body() dto: QuizResultDto) {
    return this.quizResultService.addQuizResult(userId, dto);
  }
}
