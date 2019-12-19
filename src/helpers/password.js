const bcrypt = require('bcryptjs');

async function hash(password, saltRounds = 12) {
  return bcrypt.hash(password, saltRounds);
}

async function match(password, hash) {
  return bcrypt.compare(password, hash);
}

module.exports = {
  hash,
  match
};
