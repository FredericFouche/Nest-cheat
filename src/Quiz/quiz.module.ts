import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './quiz.entities';
import { QuizService } from './quiz.service';
import { AppController } from 'src/app.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz])],
  providers: [QuizService],
  controllers: [AppController],
})
export class QuizModule {}
