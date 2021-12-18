# Checklist to migrate a Node.js app to Typescript

- Requires `rimraf` and `gulp` and node v14 for fs/promises to work.

## Step 1. Update the project's structure, if you haven't yet
1. Create a folder named 'src'
2. Move all app related folders and files into it
  - /routes
  - /services
  - /middleware
  - /util
  - /index.js
4. Rename all .js files to .ts files
5. Adjust npm dev script and the app's entrypoint
```json
//
  "main": "./src/index.ts",
  "scripts": {
    "dev": "nodemon src/index.ts"
  },
//
```
6. Adjust paths in the `index.ts` (for app.set('views')) and in `filesystem.util.ts` (for package.json) file.

> If you are migrating another project, make sure to resolve all relative paths properly.

## Step 2: Add TS support for your project and configure the compiler
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

## Step 3: Apply Typescript Syntax (No types yet)
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

> This step only applies if third party types, such as Express's `Request.query`, conflict with your app's dynamic types.

 1. Create `/src/@types/index.d.ts` file
 2. When running `npm run dev`, there still is a problem with `req.query` in the `jokes.client.ts` file's function `searchJokes`
 3. There is also a conflict with `searchConfig` in the `view.router.ts` file. It shows the following error message: `Object literal may only specify known properties`
 4. Let's add the first two custom types now: `JokeQuery` and `SearchViewConfig`. 
 5. After creation, they can be imported and applied.

> After this, the first compilation will be successful and the app runs as it did before.

## Step 5: Add types and custom interfaces
Let's sta
