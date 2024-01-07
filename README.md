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
<!DOCTYPE html>
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
