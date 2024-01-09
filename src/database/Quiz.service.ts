import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './Quiz.entities';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
  ) {}

  // CRUD -> en réalité, on ne fait que le Read car on ne peut pas modifier les quiz pour l'instant
  async findAll(): Promise<Quiz[]> {
    return this.quizRepository.find();
  }

  async findById(id: number): Promise<Quiz> {
    return this.quizRepository.findOne({ where: { id } });
  }

  async findQuizzesByLevel(): Promise<Quiz[]> {
    const quizzes = await this.quizRepository.find();

    const sortedQuizzes = quizzes.sort((a, b) => {
      const levels = ['débutant', 'avancé', 'difficile'];
      return levels.indexOf(a.level) - levels.indexOf(b.level);
    });

    return sortedQuizzes;
  }
}
