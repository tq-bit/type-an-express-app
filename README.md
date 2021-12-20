# ✅ Checklist to migrate a Node.js app to Typescript

This repository is a demo to migrate a Node.js application to Typescript. It serves as a stating point, as well as a step-by-step guide for my blogpost 'A step-by-step guide to migrate a Node webapp to Typescript'.

For the technology stack, I decided to use a minimal [Express.js application](https://expressjs.com/) with the common [route](https://expressjs.com/en/guide/routing.html) + [middleware](https://expressjs.com/en/guide/writing-middleware.html) functionality. The app also includes a view layer written with [Handlebars.js](https://handlebarsjs.com/). It uses an [express-handlebars view engine](https://www.npmjs.com/package/express-handlebars).

> The app requires Node v14+ to work properly, please make sure to have it installed before you start.

## Step 1. Update the project's structure

[*Link to commit*](https://github.com/tq-bit/type-an-express-app/commit/30b5d4eaa8c1addb263a199b9475a8a98d5a7387)

1. Create a folder named 'src'
2. Move all app related folders and files into it
  - `/routes/*`
  - `/services/*`
  - `/middleware/*`
  - `/util/*`
  - `/index.js`
4. Change the `.js` - file extension of all files to `.ts`
5. Adjust npm dev script and the app's entrypoint
```json
//
  "main": "./src/index.ts",
  "scripts": {
    "dev": "nodemon src/index.ts"
  },
//
```
6. Adjust paths in the `filesystem.util.ts` file (for package.json).

> If you are migrating another project, make sure to resolve all relative paths properly.

## Step 2: Add TS support for your project and configure the compiler

[*Link to commit*](https://github.com/tq-bit/type-an-express-app/commit/db8ced2ea27fed5e749e4ec6ba54fb2a0166ca31)

1. Install the necessary packages for typescript

```shell
npm i -D ts-node @types/node @types/express @types/express-handlebars
```

> If you are using its latest version, nodemon will use ts-node to compile Typescript files under the hood - you will not need an additional build step.

2. Add a `tsconfig.json` file to your project's root. Fill it with the following configuration:

```json
{
  "compilerOptions": {
    "target": "ES2015",
    "outDir": "dist",
    "module": "commonjs",
    "moduleResolution": "node",
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
  },
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Recommended",
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
```

References for the chosen  options:

- [target](https://www.staging-typescript.org/tsconfig#target) - The Javascript ECMA version, e.g. `ES5`, `ES6`, ...
- [outDir](https://www.staging-typescript.org/tsconfig#outDir) - The directory into which Javascript files are compiled. Commonly used: `dist`, `build`
- [module](https://www.staging-typescript.org/tsconfig#module) - The type of module to compile into. e.g. `commonjs`, `amd`, ...
- [moduleResolution](https://www.staging-typescript.org/tsconfig#moduleResolution) - Strategy to resolve modules.
- [strict](https://www.staging-typescript.org/tsconfig#strict) - Enables a variety of strict type checks for variables and functions
- [skipLibCheck](https://www.staging-typescript.org/tsconfig#skipLibCheck) - Skip type checking on declaration files
- [forceConsistentCasingInFileNames](https://www.staging-typescript.org/tsconfig#forceConsistentCasingInFileNames) - Issue an error if a program tries to include a file by a casing different from the casing on disk.

> You can alternatively use the [recommended base](https://www.npmjs.com/package/@tsconfig/recommended) for a `tsconfig` file.

> Note that, if you try and run this app with `npm run dev` now, it will error out until you complete Step 4!

## Step 3: Apply Typescript Syntax

[*Link to commit*](https://github.com/tq-bit/type-an-express-app/commit/22be3bc4c50a83bcaf30a16f7b8fb060ce9a74fa)

1. Convert CommonJs to ES6 module syntax (if you're asking yourself whether this is really necessary: It is not (really)). And if you wonder what the difference is, check out this [thread on Stackoverflow](https://stackoverflow.com/questions/31354559/using-node-js-require-vs-es6-import-export)

- Starting from top-down middleware -> util
- Replace const - require with import - from
- Replace `module.exports` with `export default`
- In `/services/jokes.client.ts`, replace `module.exports` with `export` for each function

2. Add Express types in the `view.router.ts` and `accesslog.middleware.ts` files
- req: Request
- res: Response
- next: NextFunction

e.g.

```ts
async function renderHomePage(req: Request, res: Response) { /* ... */ }
```

To assign types, you must import them from the module's declaration. If these types are not found, you must install them manually. In this example, we did so in Step 2.1 by installing `@types/express`

In the `view.router.ts` file

```ts
import { Router, Request, Response } from 'express';
```

## Step 4: Fix conflicting types (optional)

[*Link to commit*](https://github.com/tq-bit/type-an-express-app/commit/821be7779c8628e361b832f1419d8c54907b645f)

> This step only applies if third party types, such as Express's `Request.query`, conflict with your app's dynamic types.

 1. Create `/src/@types/index.d.ts` file
 2. When running `npm run dev`, there still is a problem with `req.query` in the `jokes.client.ts` file's function `searchJokes`
 3. There is also a conflict with `searchConfig` in the `view.router.ts` file. It shows the following error message: `Object literal may only specify known properties`
 4. Let's add the first two custom types now: `JokeQuery` and `SearchViewConfig`.
 5. After creation, they can be imported and applied.

> After this, the first compilation will be successful and the app runs as it did before.

## Step 5: Add types and custom interfaces

[*Link to commit*](https://github.com/tq-bit/type-an-express-app/commit/a9bbaa5db10ff058a33ae57c47157e58a4e38a78)

Let's start adding types, top down again, starting with middleware, ending with index.ts

**Overview of Interfaces added and applied for this example:**

- AppMetadata
- RandomTwoPartJoke
- MultipleJokesResponse
- HomeViewConfig
- AboutViewConfig
- SearchViewConfig

## Step 6 (optional, recommended): Add Typescript to your dev pipeline

[*Link to commit*](https://github.com/tq-bit/type-an-express-app/commit/f551fccb393fd7f604d2b8fb36c654201d03aff0)

> This step applies whenever you're using a task runner, such as grunt or gulp, to build or compile your project. You can read more about Gulp on the www, e.g. in Google's [Introduction to Gulp](https://developers.google.com/web/ilt/pwa/introduction-to-gulp)

1. Install gulp globally and install the `gulp-typescript` plugin in your project
2. Let's also install `gulp-htmlmin` to minify our HTML code for our app's view (it's Handlebars syntax, but will be recognized by the plugin)

```shell
npm i -g gulp-cli
npm i -D gulp@4 gulp-typescript
npm i -D gulp-htmlmin
```

3. Create a `gulpfile.js` in your project's root and add the following to it:

```js
const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

function compileTypescript() {
  const tsResult = gulp.src('src/**/*.ts').pipe(tsProject());

  return tsResult.js.pipe(gulp.dest('dist'));
}
```

4. (Optional) If you have other tasks to run, such as htmlmin or CSS preprocessing, you can include them as part of `gulp.series`. In this case, instead of the above, add the following to your `gulpfile.js`:

```js
const gulp = require('gulp');
const ts = require('gulp-typescript');
const htmlmin = require('gulp-htmlmin');
const tsProject = ts.createProject('tsconfig.json');

function compileTypescript() {
  const tsResult = gulp.src('src/**/*.ts').pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist'));
}

function minifyHandlebarsTemplates() {
  return gulp
    .src(['src/views/*.handlebars', 'src/views/**/*.handlebars'])
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist/views'));
}

exports.default = gulp.series(compileTypescript, minifyHandlebarsTemplates);
```

## Step 7: Add npm scripts for compilation

[*Link to commit*](https://github.com/tq-bit/type-an-express-app/commit/eb56007d7a54f830d79a36e785f7f60ff3dc4c18)

1. Finally, let's add two scripts to build and run the app. We'll also use rimraf to clean up older versions of dist

```shell
npm i -D rimraf
```

- `dev` will use `nodemon` and `ts-node` to launch the app for development
- `build` will get rid of the old app's distro and run build a new version
- `start` will run the built application
- `serve` is a shortcut for the `build` and `start` steps

> If you decided to skip step 6, you must make sure all non-Typescript folders are still available in your `dist` folder. When using the **Only Typescript compilation** option, `views` will not be moved & minified by the tsc compiler.

**Only Typescript compilation**

```json
// ...
  "scripts": {
    "dev": "nodemon src/index.ts",
    "build": "rimraf -r dist && tsc",
    "start": "node dist/index.js",
    "serve": "npm run build && npm run start"
  },
// ...
```

**Gulp workflow**

```json
// ...
  "scripts": {
    "dev": "nodemon src/index.ts",
    "build": "rimraf -r dist && gulp",
    "start": "node dist/index.js",
    "serve": "npm run build && npm run start"
  },
// ...
```

2. To wrap things up, let's now run `npm run serve` and see what we get. Given everything went well, the compilaton was successful and the app is running as it did before.
