const express = require('express');
const createError = require('http-errors');
const error = require('debug')('error:register');
const asyncHandler = require('express-async-handler');
const User = require('./../models/user-model');
const Anchor = require('./../models/anchor-model');
const pathPayment = require('./../helpers/utils/pathPayment');
const router = express.Router();
// User can send one currency to another user and he will receive the amount of another currency in equivalent
router.post('/pathPayment', asyncHandler(async (req, res) => {
  const { fromUser, toUser, sendAnchor, destAnchor, destAmount, sendMax } = req.body;
  if (!fromUser) throw createError(400, 'User sender is required.');
  if (!toUser) throw createError(400, 'User recipient is required');
  if (!sendAnchor) throw createError(400, 'Anchor sender is required');
  if (!destAnchor) throw createError(400, 'Anchor recipient is required');
  if (!destAmount) throw createError(400, 'Destination amount is required');
  if (!sendMax) throw createError(400, 'Max limit for spend is required');

  try {
    const fromUserDB = await User.findOne({email: req.body.fromUser});
    const toUserDB = await User.findOne({email: req.body.toUser});
    const sendAnchorDB = await Anchor.findOne({assetCode: req.body.sendAnchor});
    const destAnchorDB = await Anchor.findOne({assetCode: req.body.destAnchor});
    const response = await pathPayment(fromUserDB, toUserDB, sendAnchorDB, destAnchorDB, destAmount, sendMax);
    res.send({ 'transaction href': response._links.transaction.href });
  } catch (err) {
    error(err);
    throw err;
  }
}));

module.exports = router;
