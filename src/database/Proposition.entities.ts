import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Question } from './Question.entities';

@Entity()
export class Proposition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  is_correct: boolean;

  // une question peut avoir plusieurs propositions
  // une proposition ne peut avoir qu'une seule question
  @ManyToOne(() => Question, (question) => question.propositions)
  question: Question;
}
