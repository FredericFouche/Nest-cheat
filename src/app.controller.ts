import { Controller, Get, Render, Res, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { Param } from '@nestjs/common';
import { QuizService } from './quiz/quiz.service';
import { Quiz } from './quiz/quiz.entities';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly quizService: QuizService,
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
}
