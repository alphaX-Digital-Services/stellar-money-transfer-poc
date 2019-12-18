const { createLogger, format, transports } = require('winston');
const { combine, colorize, timestamp, prettyPrint, errors, splat, json, simple } = format;

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    colorize(),
    errors({ stack: true }),
    splat(),
    json()
  ),
  defaultMeta: { service: 'stellar-transfer-money' },
  transports: [
    new transports.File({ filename: 'stellar-money-error.log', level: 'error' }),
    new transports.File({ filename: 'stellar-money-combined.log' })
  ]
});

if (process.env.NODE_LOG === 'on') {
  logger.add(new transports.Console({
    format: combine(
      colorize(),
      simple(),
      prettyPrint()
    )
  }));
}

module.exports = logger;
