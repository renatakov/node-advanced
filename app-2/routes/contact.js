const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('contact', {title: "contact", text: "common information about contacts"});
});

router.get('/kyiv', function(req, res, next) {
  res.render('contact', {title: "contact", text: "contacts in Kyiv"});
});

router.get('/lviv', function(req, res, next) {
  res.render('contact_lviv', {title: "contact", text: "contacts in Lviv"});
});

module.exports = router;
