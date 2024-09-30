const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
    res.render('contacts', {title: 'Contacts', description: 'This is contacts page'})
})
router.get('/kyiv', (req, res, next)=>{
    res.render('contacts', {title: 'Contacts Kyiv', description: 'This is Contacts Kyiv page'})
})
router.get('/kharkiv', (req, res, next)=>{
    res.render('contacts', {title: 'Contacts Kharkiv', description: 'This is Contacts Kharkiv page'})
})
router.get('/lviv', (req, res, next)=>{
    res.render('contacts', {title: 'Contacts Lviv', description: 'This is Contacts Lviv page'})
})

module.exports = router;