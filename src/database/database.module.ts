import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // type de bdd
      type: 'postgres',
      // nom de l'hôte
      host: 'localhost',
      // port de l'hôte
      port: 5432,
      // nom d'utilisateur
      username: 'quiz',
      // mot de passe
      password: 'quiz',
      // nom de la base de données
      database: 'quiz',
      // entités à utiliser
      entities: [Quiz, Proposition, Question],
      // auto-synchronisation
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
