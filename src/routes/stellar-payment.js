const express = require('express');
const createError = require('http-errors');
const error = require('debug')('app:error:register');
// const info = require('debug')('app:info:register');
const asyncHandler = require('express-async-handler');
// const User = require('./../models/user-model');

const router = express.Router();
router.post('/payments', asyncHandler(async (req, res) => {
  console.log('In route stellar payment!!!!!!!!!!!!!');
  const { fromUser, toUser, sendAnchor, destAnchor, destAmount, sendMax } = req.body;
  if (!fromUser) throw createError(400, 'User sender is required.');
  if (!toUser) throw createError(400, 'User recipient is required');
  if (!sendAnchor) throw createError(400, 'Anchor sender is required');
  if (!destAnchor) throw createError(400, 'Anchor recipient is required');
  if (!destAmount) throw createError(400, 'Destination amount is required');
  if (!sendMax) throw createError(400, 'Max limit for spend is required');

  try {
    // todo call util
  } catch (err) {
    error(err);
    throw err;
  }

  res.send({ result: true });
  
}));

module.exports = router;
