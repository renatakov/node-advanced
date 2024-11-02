const express = require('express');
const router = express.Router();

/* GET home page. */
router.post('/', function (req, res, next) {
    const q = req.body;

    res.json(q);
});

module.exports = router;
