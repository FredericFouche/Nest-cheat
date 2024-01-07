import { Controller, Get, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

// @Controller() est un décorateur qui permet de définir un contrôleur
@Controller()

// la classe AppController est un contrôleur, elle est exportée et injectée dans le module principal
export class AppController {
  // le constructeur de la classe AppController injecte le service AppService
  constructor(private readonly appService: AppService) {}

  // @Get() est un décorateur qui permet de définir une route pour la méthode getHello()
  @Get()
  // la méthode getHello() retourne une chaîne de caractères qui est retournée par le service AppService (voir app.service.ts)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/hello')
  getHi(@Res() res): string {
    return res.render('index', { message: 'Hello World!' });
  }
}
