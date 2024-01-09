import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './quiz.entity';

@Injectable()
export class QuizService {
  // Injectez le repository Quiz dans le service Quiz
  // le repository est une classe qui nous permet d'effectuer des requêtes SQL
  // elle est générée automatiquement par TypeORM à partir de notre entité Quiz
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
  ) {}

  // dans ce fichier, nous mettons en place la logique métier de notre application
  // méthode pour récupérer tous les quiz
  async findAll(): Promise<Quiz[]> {
    return await this.quizRepository.find();
  }

  // méthode pour récupérer tous les quiz par niveau
  async findQuizzesByLevel(): Promise<Quiz[]> {
    return await this.quizRepository.find({
      order: {
        level: 'ASC',
      },
    });
  }
}
