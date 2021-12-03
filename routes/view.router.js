const router = require('express').Router();
const readPackageJsonFile = require('../util/filesystem.util');


router.get('', (req, res) => res.render('home'));
router.get('/about', async (req, res) => {
  const packageJson = await readPackageJsonFile();
  console.log(packageJson)
  const aboutConfig = {
    packageJson
  }
  res.render('about', aboutConfig)
});

module.exports = router;
