const expressWinston = require('express-winston');
const winstonInstance = require('../helpers/logger');

module.exports = () => {
  return expressWinston.logger({
    winstonInstance,
    colorize: true
  });
};
