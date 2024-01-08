import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Question } from './Question.entities';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  level: string;

  @Column({ nullable: true })
  number_question: number;

  // un quiz peut avoir plusieurs questions
  // une question ne peut avoir qu'un seul quiz
  @OneToMany(() => Question, (question) => question.quiz)
  questions: Question[];
}
