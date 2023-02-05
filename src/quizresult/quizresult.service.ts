import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuizResultDto } from './dto/quizresult.dto';

@Injectable()
export class QuizresultService {
  constructor(private prisma: PrismaService) {}

  async getAllQuizResult() {
    const result = await this.prisma
      .$queryRaw`SELECT grade, users."firstName", users."email", users."createdAt" FROM quizresults 
      JOIN users ON quizresults.userid = users.id 
      GROUP BY quizresults.id, users.id 
      ORDER BY quizresults."createdAt" DESC;`;

    return result;
  }

  async getAllBestScore() {
    const result = await this.prisma
      .$queryRaw`SELECT userid, MAX(grade) as highest_score , users.email, users."firstName" as lastname
    FROM quizresults
    JOIN users ON quizresults.userid = users.id
    WHERE grade IS NOT NULL
    GROUP BY quizresults.userid, users.id;
    `;

    return result;
  }

  async getUserQuizResults(userId: number) {
    const result = await this.prisma
      .$queryRaw`SELECT * FROM quizresults WHERE userid = ${userId}`;
    return result;
  }

  async addQuizResult(userid: number, dto: QuizResultDto) {
    const quiz = await this.prisma.quizResult.create({
      data: {
        userid,
        grade: (dto.correctAnswer / dto.totalQueztion) * 100,
        total_queztion: dto.totalQueztion,
        totaltime: dto.totaltime,
        correct_answer: dto.correctAnswer,
      },
    });

    //   const quiz = await this.prisma.$queryRaw`
    //   INSERT INTO quizresults (userid, grade ,total_queztion, totaltime, correct_answer, updatedAt)
    //   VALUES (${userid}, ${(dto.correctAnswer / dto.totalQueztion) * 100}, ${
    //     dto.totalQueztion
    //   }, ${dto.totaltime}, ${dto.correctAnswer}, NOW())
    // `;

    return quiz;
  }
}
