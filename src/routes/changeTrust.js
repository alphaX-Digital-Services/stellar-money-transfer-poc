const express = require('express');
const createError = require('http-errors');
const error = require('debug')('error:register');
const asyncHandler = require('express-async-handler');
const changeTrust = require('./../helpers/utils/changeTrust');
const Anchor = require('./../models/anchor-model');
const User = require('./../models/user-model');
const router = express.Router();

// Users can choose in what currency of Anchor he will trust. And set a limit of trust.
router.post('/changeTrust', asyncHandler(async (req, res) => {
  const { userAccount, anchor, limitOfTrust } = req.body;
  if (!userAccount) throw createError(400, 'userAccount is required.');
  if (!anchor) throw createError(400, 'anchor is required.');
  if (!limitOfTrust) throw createError(400, 'limitOfTrust is required');
  try {
    const fromUserDB = await User.findOne({email: req.body.userAccount});
    const AnchorDB = await Anchor.findOne({assetCode: req.body.anchor});
    const response = await changeTrust(fromUserDB, AnchorDB, limitOfTrust);
    res.send({ 'transaction href': response._links.transaction.href });
  } catch (err) {
    error(err);
    throw err;
  }
}));

module.exports = router;
