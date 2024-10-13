const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('form', {});
});


router.get('/get-form', function (req, res, next) {
    res.render('form_get', {});
});

router.get('/post-form', function (req, res, next) {
    res.render('form_post', {});
});

router.get('/get-form-js', function (req, res, next) {
    res.render('form_get_js', {});
});

router.get('/get-form-data', function (req, res, next) {
    console.log(req.query);

    res.json(req.query)
});

router.post('/post-form-data', function (req, res, next) {
    console.log(req.query);
    console.log(req.body);
    console.log(req.body.pass);
    res.json(req.body)
});

router.get('/post-form-js', function (req, res, next) {
    res.render('form_post_js', {});
});


module.exports = router;
