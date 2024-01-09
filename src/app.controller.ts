import { Controller, Get, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { QuizService } from './database/Quiz.service';
import { Quiz } from './database/Quiz.entities';
import { Param } from '@nestjs/common';
import { QuestionService } from './database/Question.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly quizService: QuizService,
    private readonly questionService: QuestionService, // Ajoutez cette ligne
  ) {}

  @Get()
  async getHello(@Res() res: Response) {
    // Attendez que la promesse soit résolue
    const quizzes: Quiz[] = await this.quizService.findAll();
    console.log(quizzes); // Maintenant, cela affichera les données réelles des quiz

    // Rendu de la vue avec les données des quiz
    res.render('index', {
      message: this.appService.getHello(),
      quizzes: quizzes,
    });
  }
  @Get('/Level')
  async getLevelPage(@Res() res: Response) {
    const quizzes: Quiz[] = await this.quizService.findQuizzesByLevel();
    res.render('level', {
      quizzes: quizzes,
    });
  }
  @Get('/quiz/:id')
  async getQuiz(@Param('id') id: number, @Res() res: Response) {
    const quiz = await this.quizService.findById(id);
    if (!quiz) {
      // Gérer l'erreur ici, par exemple en renvoyant une réponse d'erreur
      res.status(404).send('Quiz not found');
      return;
    }
    const questions = await this.questionService.findByQuizId(quiz.id);
    console.log(quiz);
    console.log(questions);
    res.render('quiz', {
      quiz: quiz,
      questions: questions, // Ajoutez les questions au rendu
    });
  }
}
