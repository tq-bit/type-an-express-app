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
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "types": ["node"]
  },
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Recommended",
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
```

> You can alternatively use the [recommended base](https://www.npmjs.com/package/@tsconfig/recommended) for a `tsconfig` file.

> Note that, if you try and run this app with `npm run dev` now, it will error out until you complete Step 4!

## Step 3: Apply Typescript Syntax

[*Link to commit*](https://github.com/tq-bit/type-an-express-app/commit/22be3bc4c50a83bcaf30a16f7b8fb060ce9a74fa)

1. Convert CommonJs to ES6 module syntax

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
Let's sta
