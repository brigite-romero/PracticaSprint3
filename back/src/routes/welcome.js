const { json } = require('express');
const express = require('express');
var jwt = require('jsonwebtoken');
require('dotenv').config();
const sign = process.env.SIGN;
const router = express.Router();

router.get('/',(req, res) => {
    let token = req.headers['authorization']
    try {
        var decoded = jwt.verify(token, sign);
        res.json({name: decoded.data.name, admin: decoded.data.admin});
    }catch (error) {
      res.status(400).json({msg: "error"});
      console.error("Error:",error.message)
    }
    
});

module.exports = router;