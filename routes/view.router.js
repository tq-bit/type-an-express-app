const router = require('express').Router();
const readPackageJsonFile = require('../util/filesystem.util');
const getRandomJoke = require('../services/jokes.client');

async function handleRenderHomePage(req, res) {
  const packageJson = await readPackageJsonFile();
  const randomJoke = await getRandomJoke();
  const homeConfig = { packageJson, randomJoke };
  res.render('home', homeConfig);
}

async function handleRenderAboutPage(req, res) {
  const packageJson = await readPackageJsonFile();
  const aboutConfig = { packageJson };
  res.render('about', aboutConfig);
}

router.get('', handleRenderHomePage);
router.get('/about', handleRenderAboutPage);

module.exports = router;
