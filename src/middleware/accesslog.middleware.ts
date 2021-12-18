const logger = require('../util/logger.util');

function accessLogger(req, res, next) {
  const message = `${req.method} - ${req.protocol}://${req.hostname}${req.url} | IP: ${req.ip}`;
  logger.http(message)
  next();
}

module.exports = accessLogger;
