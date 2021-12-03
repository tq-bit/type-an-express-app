const router = require('express').Router();
const readPackageJsonFile = require('../util/filesystem.util');

async function handleRenderHomePage(req, res) {
  res.render('home')
}

async function handleRenderAboutPage(req, res) {
  const packageJson = await readPackageJsonFile();
  const aboutConfig = {
    packageJson,
  };
  res.render('about', aboutConfig);
}

router.get('', handleRenderHomePage);
router.get('/about', handleRenderAboutPage);

module.exports = router;
