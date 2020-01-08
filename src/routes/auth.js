const express = require('express');
const createError = require('http-errors');
const error = require('debug')('app:error:register');
const info = require('debug')('app:info:register');
const asyncHandler = require('express-async-handler');
const User = require('./../models/user-model');
const encryptPassword = require('./../middleware/encrypt-password');

const router = express.Router();
router.post('/register', asyncHandler(encryptPassword), asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  if (!email) throw createError(400, 'Email required.');
  if (!password) throw createError(400, 'Password required');

  const user = new User();
  user.email = email;
  user.password = password;
  user.firstName = firstName ? firstName : 'none';
  user.lastName = lastName ? lastName : 'none';
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
