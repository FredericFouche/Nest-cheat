import { Test, TestingModule } from '@nestjs/testing';
import { QuizService } from './quiz.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Quiz } from './quiz.entities';
import { Repository } from 'typeorm';

describe('QuizService', () => {
  let service: QuizService;
  let mockRepository: Partial<Repository<Quiz>>;

  beforeEach(async () => {
    mockRepository = {
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuizService,
        {
          provide: getRepositoryToken(Quiz),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<QuizService>(QuizService);
  });

  describe('findAll', () => {
    it('should return an array of quiz', async () => {
      const quiz1 = new Quiz();
      quiz1.title = 'Quiz 1';
      quiz1.description = 'Description du quiz 1';
      quiz1.level = 'Facile';
      quiz1.number_question = 5;

      const quiz2 = new Quiz();
      quiz2.title = 'Quiz 2';
      quiz2.description = 'Description du quiz 2';
      quiz2.level = 'Moyen';
      quiz2.number_question = 10;

      const quizs = [quiz1, quiz2];
      (mockRepository.find as jest.Mock).mockReturnValue(quizs);

      expect(await service.findAll()).toBe(quizs);
    });
  });

  describe('findQuizzesByLevel', () => {
    it('should return an array of quiz', async () => {
      const quiz1 = new Quiz();
      quiz1.title = 'Quiz 1';
      quiz1.description = 'Description du quiz 1';
      quiz1.level = 'Facile';
      quiz1.number_question = 5;

      const quiz2 = new Quiz();
      quiz2.title = 'Quiz 2';
      quiz2.description = 'Description du quiz 2';
      quiz2.level = 'Moyen';
      quiz2.number_question = 10;

      const quizs = [quiz1, quiz2];
      (mockRepository.find as jest.Mock).mockReturnValue(quizs);

      expect(await service.findQuizzesByLevel()).toBe(quizs);
    });
  });
});
