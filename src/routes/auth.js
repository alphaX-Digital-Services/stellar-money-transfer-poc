const express = require('express');
const createError = require('http-errors');
const error = require('debug')('error:register');
const info = require('debug')('info:register');
const asyncHandler = require('express-async-handler');
const User = require('./../models/user-model');
const encryptPassword = require('./../middleware/encrypt-password');
const createAccount = require('./../helpers/utils/createAccount');

const router = express.Router();
router.post('/register', asyncHandler(encryptPassword), asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  if (!email) throw createError(400, 'Email required.');
  if (!password) throw createError(400, 'Password required');
  // create and fund a new account in Stellar 
  const newAccount = await createAccount();
  const user = new User();
  user.email = email;
  user.password = password;
  user.firstName = firstName ? firstName : 'none';
  user.lastName = lastName ? lastName : 'none';
  user.publicKey = newAccount.publicKey;
  user.secretSeed = newAccount.secret; 
  try {
    info(user);
    const userAfterSave = await user.save();
    res.send(userAfterSave);
  } catch (err) {
    if (err.code === 11000) throw createError(400, 'Email already exists.');
    error(err);
    throw err;
  }
  
}));

module.exports = router;
