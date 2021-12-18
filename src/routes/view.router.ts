import { Router, Request, Response } from 'express';
import readPackageJsonFile from '../util/filesystem.util';
import { getRandomJoke, searchJokes } from '../services/jokes.client';

const router = Router();

async function renderHomePage(req: Request, res: Response) {
  const packageJson = await readPackageJsonFile();
  const randomJoke = await getRandomJoke();
  const homeConfig = { packageJson, randomJoke };
  res.render('home', homeConfig);
}

async function renderAboutPage(req: Request, res: Response) {
  const packageJson = await readPackageJsonFile();
  const aboutConfig = { packageJson };
  res.render('about', aboutConfig);
}

async function renderSearchPage(req: Request, res: Response) {
  const hasSearchRequest = Object.keys(req.query).length > 0;
  const packageJson = await readPackageJsonFile();
  let searchConfig = { packageJson };
  if (hasSearchRequest) {
    const searchResults = await searchJokes(req.query);
    searchConfig = { ...searchConfig, searchResults };
  }
  res.render('search', searchConfig);
}

function renderNotFoundPage(req: Request, res: Response) {
  res.render('404');
}

router.get('', renderHomePage);
router.get('/about', renderAboutPage);
router.get('/search', renderSearchPage);
router.get('/*', renderNotFoundPage);

export default router;
