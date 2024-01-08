import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Quiz } from './Quiz.entities';
import { Proposition } from './Proposition.entities';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  description: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  doc_link: string;

  // un quiz peut avoir plusieurs questions
  // une question ne peut avoir qu'un seul quiz
  @ManyToOne((type) => Quiz, (quiz) => quiz.questions)
  quiz: Quiz;

  // une question peut avoir plusieurs propositions
  // une proposition ne peut avoir qu'une seule question
  @OneToMany((type) => Proposition, (proposition) => proposition.question)
  propositions: Proposition[];
}
