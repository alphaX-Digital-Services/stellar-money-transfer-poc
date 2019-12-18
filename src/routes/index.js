const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send({ message: 'Welcome to Transfer Money app' });
});

module.exports = router;
