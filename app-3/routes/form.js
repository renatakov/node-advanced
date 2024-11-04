const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('form', {});
});

//рисуем форму
router.get('/get-form', function (req, res, next) {
    res.render('form_get', {});
});
 //обрабатываем данные с формы 
router.get('/get-form-data', function (req, res, next) {
    console.log(req.query);

    res.json(req.query)
});

//сюда посылаем данные из формы с помощью js
router.get('/get-form-js', function (req, res, next) {
    res.render('form_get_js', {});
});

//рисуем форму с post отправкой
router.get('/post-form', function (req, res, next) {
    res.render('form_post', {});
});

//обработка post данных их формы
router.post('/post-form-data', function (req, res, next) {
    console.log(req.query);
    console.log(req.body);
    console.log(req.body.pass);
    res.json(req.body)
});

//обрыбатываем дынные отправленые с помощью js
router.get('/post-form-js', function (req, res, next) {
    res.render('form_post_js', {});
});


module.exports = router;
