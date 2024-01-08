import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Question } from './Question.entities';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  level: string;

  @Column()
  number_questions: number;

  // un quiz peut avoir plusieurs questions
  // une question ne peut avoir qu'un seul quiz
  @OneToMany(() => Question, (question) => question.quiz)
  questions: Question[];
}
