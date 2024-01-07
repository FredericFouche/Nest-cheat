import { Injectable } from '@nestjs/common';

// @Injectable() est un décorateur qui permet de définir un service
@Injectable()
export class AppService {
  // la méthode getHello() retourne une chaîne de caractères hello world
  getHello(): string {
    return 'Hello World!';
  }
}
