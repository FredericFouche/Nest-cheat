import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizService } from './database/Quiz.service';
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
      entities: [Quiz, Question, Proposition],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Quiz]),
  ],
  controllers: [AppController],
  providers: [AppService, QuizService],
})
export class AppModule {}
