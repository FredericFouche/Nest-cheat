# NestJS

## Installation via NPM

```bash
npm i -g @nestjs/cli
```

Cette ligne de commande permet d'installer le CLI de NestJS en global sur votre machine.

## Création d'un projet

```bash
nest new project-name
```

Cette ligne de commande permet de créer un nouveau projet NestJS en lui donnant un nom, un dossier sera créé avec le nom du projet. Ce dossier contiendra le projet avec les fichiers de base comme le fichier `package.json` et le dossier `src` qui contiendra le code source de l'application respectant l'architecture MVC.

## Les fichiers de base et leur rôle

| Fichier                  | Description                                                                                                                                                                                                                                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app.controller.ts`      | Un contrôleur de base avec une seule route.                                                                                                                                                                                                                                                             |
| `app.controller.spec.ts` | Les tests unitaires pour le contrôleur.                                                                                                                                                                                                                                                                 |
| `app.module.ts`          | Le module racine de l'application.                                                                                                                                                                                                                                                                      |
| `app.service.ts`         | Un service de base avec une seule méthode.                                                                                                                                                                                                                                                              |
| `main.ts`                | Le fichier d'entrée de l'application qui utilise la fonction principale NestFactory pour créer une instance d'application Nest. Le fichier main.ts est le point d'entrée principal de votre application NestJS. Il contient une fonction bootstrap() qui est responsable du démarrage de l'application. |

## Lancer le projet

```bash
cd project-name
npm run start
```

Cette ligne de commande permet de lancer le projet, le serveur sera accessible à l'adresse `http://localhost:3000/`.

## Notre première route

Dans le fichier `app.controller.ts`, qui est le contrôleur de base de l'application, nous allons créer une route qui sera accessible à l'adresse `http://localhost:3000/hello`.

```typescript
// cette ligne qui est ajouté dans la classe permet de définir le chemin de base de la route et le mot clé qui sera utilisé pour accéder à la route en l'oocurence ici un get sur l'adresse http://localhost:3000/hello
  @Get('/hello')
    // cette fonction sera appelé lorsque l'on accédera à l'adresse http://localhost:3000/hello et retournera une chaîne de caractère qui sera affiché dans le navigateur
  getHi(): string {
    // cette fonction retourne une chaîne de caractère "Hi! I'm a route!"
    return "Hi! I'm a route!";
  }
```

Pour retourner une vue, il faut utiliser la fonction `render()` de l'objet `response` qui est passé en paramètre de la fonction.

### Création d'une vue

Pour créer une vue, il faut créer un dossier `views` à la racine du projet et créer un fichier `index.hbs` dans ce dossier. hbs est l'extension du moteur de template Handlebars qui est utilisé par défaut par NestJS.

```bash
mkdir views
touch views/index.hbs
```

Dans le fichier `index.hbs`, nous allons ajouter le code suivant :

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <style>
      body {
        background-color: #282c34;
        color: white;
        font-family: Arial, Helvetica, sans-serif;
      }
    </style>
  </head>
  <body>
    <h1>Hello World!</h1>
  </body>
</html>
```

### Définir le moteur de template

Pour définir le moteur de template, il faut ajouter la ligne suivante dans le fichier `main.ts` :

```typescript
app.useStaticAssets(join(__dirname, '..', 'public'));
app.setBaseViewsDir(join(__dirname, '..', 'views'));
app.setViewEngine('ejs');
```

avec les imports suivants :

```typescript
import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
```

Cela permettra d'utiliser le moteur de template EJS, de servir les vues depuis le dossier `views` et de servir les fichiers statiques depuis le dossier `public`.

### Création d'une route avec une vue

Dans le fichier `app.controller.ts`, nous allons créer une route qui sera accessible à l'adresse `http://localhost:3000/`. Cette route retournera la vue `index.ejs`. Nous allons utiliser le appService pour passer des données à la vue.

```typescript
// cette ligne qui est ajouté dans la classe permet de définir le chemin de base de la route et le mot clé qui sera utilisé pour accéder à la route en l'oocurence ici un get sur l'adresse http://localhost:3000/
  @Get('/')
    // cette fonction sera appelé lorsque l'on accédera à l'adresse http://localhost:3000/ et retournera une vue qui sera affiché dans le navigateur
  getHello(@Res() res): void {
    // cette fonction retourne une vue index.hbs
    res.render('index', { message: this.appService.getHello() });
  }
```

appService sert à passer des données à la vue, il faut donc créer un service qui sera injecté dans le contrôleur, un peu comme les locals dans Express.

### Création d'un data mapper rudimentaire

Pour créer un datamapper rudimentaire, il faut créer un dossier `database` dans le dossier `src` et créer des fichiers `entity.ts` pour les entités, `module.ts` pour les modules (pour la connexion à la base de données par exemple). Voici un modèle de fichier `entity.ts` :

```typescript
// import des méthodes de typeorm dont on a besoin
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
// import de l'entité parente
import { Quiz } from './Quiz.entities';
// import de l'entité enfant
import { Proposition } from './Proposition.entities';

// cette ligne permet de définir le nom de l'entité dans la base de données
@Entity()
// cette ligne permet de définir le nom de l'entité dans le code
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
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
```
