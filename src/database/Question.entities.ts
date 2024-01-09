import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
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
  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  @JoinColumn({ name: 'quizId' }) // Ceci est la clé étrangère dans la base de données
  quiz: Quiz;

  // une question peut avoir plusieurs propositions
  // une proposition ne peut avoir qu'une seule question
  @OneToMany((type) => Proposition, (proposition) => proposition.question)
  propositions: Proposition[];
}
