const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { title: 'Express 2', foo: 55 });
  // res.end('2')
  // res.json({one: 77})
});

module.exports = router;
