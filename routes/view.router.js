const router = require('express').Router();
const readPackageJsonFile = require('../util/filesystem.util');
const {getRandomJoke, searchJokes} = require('../services/jokes.client');

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
  const packageJson = await readPackageJsonFile();
  const searchResults = await searchJokes(req.query);
  const aboutConfig = { packageJson, searchResults };
  res.render('search', aboutConfig);
}

router.get('', renderHomePage);
router.get('/about', renderAboutPage);
router.get('/search', renderSearchPage);

module.exports = router;
