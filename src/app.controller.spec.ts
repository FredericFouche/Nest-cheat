import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// describe() est une fonction qui permet de définir un bloc de tests unitaires
// le premier paramètre est une chaîne de caractères qui décrit le bloc de tests
describe('AppController', () => {
  let appController: AppController;

  // beforeEach() est une fonction qui est exécutée avant chaque test, elle permet d'initialiser les variables
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    // appController est une instance de la classe AppController qui est injectée dans le module principal
    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
