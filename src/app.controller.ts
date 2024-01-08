import { Controller, Get, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { QuizService } from './database/Quiz.service';
import { Quiz } from './database/Quiz.entities';

// @Controller() est un décorateur qui permet de définir un contrôleur
@Controller()

// la classe AppController est un contrôleur, elle est exportée et injectée dans le module principal
export class AppController {
  // le constructeur de la classe AppController injecte le service AppService
  constructor(
    private readonly appService: AppService,
    private readonly quizService: QuizService,
  ) {}

  // @Get() est un décorateur qui permet de définir une route pour la méthode getHello()
  @Get()
  // la méthode getHello() retourne une chaîne de caractères qui est retournée par le service AppService (voir app.service.ts)
  getHello(@Res() res): void {
    // je récupère les données du service QuizService
    // en utilisant la requête findall() du service QuizService
    const quizs: Promise<Quiz[]> = this.quizService.findAll();
    console.log(quizs);
    // cette fonction retourne une vue index
    res.render('index', { message: this.appService.getHello(), quizs: quizs });
  }
}
