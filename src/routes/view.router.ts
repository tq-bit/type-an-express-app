const router = require('express').Router();
const readPackageJsonFile = require('../util/filesystem.util');
const { getRandomJoke, searchJokes } = require('../services/jokes.client');

async function renderHomePage(req, res) {
  const packageJson = await readPackageJsonFile();
  const randomJoke = await getRandomJoke();
  const homeConfig = { packageJson, randomJoke };
  res.render('home', homeConfig);
}

async function renderAboutPage(req, res) {
  const packageJson = await readPackageJsonFile();
  const aboutConfig = { packageJson };
  res.render('about', aboutConfig);
}

async function renderSearchPage(req, res) {
  const hasSearchRequest = Object.keys(req.query).length > 0;
  const packageJson = await readPackageJsonFile();
  let searchConfig = { packageJson };
  if (hasSearchRequest) {
    const searchResults = await searchJokes(req.query);
    searchConfig = { ...searchConfig, searchResults };
  }
  res.render('search', searchConfig);
}

function renderNotFoundPage(req, res) {
  res.render('404');
}

router.get('', renderHomePage);
router.get('/about', renderAboutPage);
router.get('/search', renderSearchPage);
router.get('/*', renderNotFoundPage);

module.exports = router;
