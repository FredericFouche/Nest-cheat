import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  // @ est le décorateur qui permet de définir les colonnes
  // entre parenthèses, on peut définir des options comme le type de la colonne
  // ensuite on définit le nom de la colonne et son type en TypeScript
  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  level: string;

  @Column('int', {
    nullable: false,
  })
  number_question: number;
}
