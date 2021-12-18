const fs = require("fs/promises")
const path = require("path")

async function readPackageJsonFile() {
  const jsonBuffer = await fs.readFile(path.join(__dirname, '../../package.json'));
  const jsonString = Buffer.from(jsonBuffer).toString('utf-8')
  return JSON.parse(jsonString);
}

module.exports = readPackageJsonFile