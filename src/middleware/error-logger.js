const expressWinston = require('express-winston');
const winstonInstance = require('./../helpers/logger');

module.exports = () => {
  return expressWinston.errorLogger({
    winstonInstance,
    colorize: true
  });
};
