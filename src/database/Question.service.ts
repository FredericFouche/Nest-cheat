import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './Question.entities';
import { Quiz } from './Quiz.entities';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  // CRUD -> en réalité, on ne fait que le Read car on ne peut pas modifier les quiz pour l'instant
  async findByQuizId(quizId: number): Promise<Question[]> {
    return this.questionRepository.find({
      where: { quiz: { id: Number(quizId) } },
    });
  }
}
