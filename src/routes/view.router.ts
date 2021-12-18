import {
  SearchViewConfig,
  JokeQuery,
  AppMetadata,
  RandomTwoPartJoke,
  HomeViewConfig,
  AboutViewConfig,
  MultipleJokesResponse,
} from '../@types/index';
import { Router, Request, Response } from 'express';
import readPackageJsonFile from '../util/filesystem.util';
import { getRandomJoke, searchJokes } from '../services/jokes.client';

const router: Router = Router();

async function renderHomePage(req: Request, res: Response): Promise<void> {
  const packageJson: AppMetadata = await readPackageJsonFile();
  const randomJoke: RandomTwoPartJoke = await getRandomJoke();
  const homeConfig: HomeViewConfig = { packageJson, randomJoke };
  res.render('home', homeConfig);
}

async function renderAboutPage(req: Request, res: Response): Promise<void> {
  const packageJson: AppMetadata = await readPackageJsonFile();
  const aboutConfig: AboutViewConfig = { packageJson };
  res.render('about', aboutConfig);
}

async function renderSearchPage(req: Request, res: Response): Promise<void> {
  const hasSearchRequest: Boolean = Object.keys(req.query).length > 0;
  const packageJson: AppMetadata = await readPackageJsonFile();
  let searchConfig: SearchViewConfig = { packageJson };
  if (hasSearchRequest) {
    const jokeQuery: JokeQuery = {
      search: `${req.query.search}`,
      all: `${req.query.all}`,
      nsfw: `${req.query.nsfw}`,
      count: `${req.query.count}`,
    };
    const searchResults: MultipleJokesResponse = await searchJokes(jokeQuery);
    searchConfig = { ...searchConfig, searchResults };
  }
  res.render('search', searchConfig);
}

function renderNotFoundPage(req: Request, res: Response): void {
  res.render('404');
}

router.get('', renderHomePage);
router.get('/about', renderAboutPage);
router.get('/search', renderSearchPage);
router.get('/*', renderNotFoundPage);

export default router;
