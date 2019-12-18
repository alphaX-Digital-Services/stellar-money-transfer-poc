const result = require('dotenv').config({ path: `./_deployment/${process.env.DOCKER_ENV}/.env` });

module.exports = key => result.parsed[key.toUpperCase()];
