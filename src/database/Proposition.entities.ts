import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Question } from './Question.entities';

// une proposition est une entité qui représente une table dans la bdd

@Entity()
export class Proposition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  description: string;

  @Column()
  is_true: boolean;

  // une question peut avoir plusieurs propositions
  // une proposition ne peut avoir qu'une seule question
  @ManyToOne(() => Question, (question) => question.propositions)
  question: Question;
}
