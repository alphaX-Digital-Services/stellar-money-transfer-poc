const passwordHelper = require('./../helpers/password');
const error = require('debug')('error:encrypt-password');

module.exports = async (req, res, next) => {
  const { password } = req.body;
  if (!password) next();
  try {
    req.body.password = await passwordHelper.hash(password);
  } catch (err) {
    error(err);
    next(err);
  }
  next();
};
