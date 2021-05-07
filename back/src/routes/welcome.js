const express = require('express');
var jwt = require('jsonwebtoken');
require('dotenv').config();
const sign = process.env.SIGN;
const router = express.Router();

router.get('/',(req, res) => {
    let token = req.headers['authorization'];
  try {
    var decoded = jwt.verify(token, sign);
  } catch (error) {
      console.error("Error:",error.message)
  }
  res.json({name: decoded.data.name});
});

module.exports = router;