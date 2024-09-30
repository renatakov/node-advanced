var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    // res.send('send contact +++');
    res.redirect('/bug');
    
});

module.exports = router;
