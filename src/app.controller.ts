import { Controller, Get, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { QuizService } from './database/Quiz.service';
import { Quiz } from './database/Quiz.entities';

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
}
