import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizService } from './database/Quiz.service';
import { QuestionService } from './database/Question.service';
import { PropositionService } from './database/Proposition.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './database/Quiz.entities';
import { Question } from './database/Question.entities';
import { Proposition } from './database/Proposition.entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'quiz',
      password: 'quiz',
      database: 'quiz',
      autoLoadEntities: true,
      entities: [Quiz, Question, Proposition],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Quiz, Question, Proposition]),
  ],
  controllers: [AppController],
  providers: [AppService, QuizService, QuestionService, PropositionService],
})
export class AppModule {}
