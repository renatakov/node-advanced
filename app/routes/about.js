const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.render('about', { title: 'About', foo: 55 });
});
router.get('/foo', function (req, res) {
    res.render('about', { title: 'foo', foo: 55 });
});

module.exports = router;
