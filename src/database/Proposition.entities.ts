import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Question } from './Question.entities';

@Entity()
export class Proposition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  description: string;

  @Column()
  is_true: boolean;

  @ManyToOne(() => Question, (question) => question.propositions)
  question: Question;
}
