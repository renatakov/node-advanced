const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('contacts', { title: 'Contacts', description: 'This is contacts page' })
})
router.get('/kyiv', (req, res, next) => {
    console.log(res);
    
    res.redirect('https://kyivcity.gov.ua/kyiv_ta_miska_vlada/kontaktna_informatsiia.html')
})
router.get('/kharkiv', (req, res, next) => {
    res.render('contacts', { title: 'Contacts Kharkiv', description: 'This is Contacts Kharkiv page' })
})
router.get('/lviv', (req, res, next) => {
    res.render('contacts', { title: 'Contacts Lviv', description: 'This is Contacts Lviv page' })
})

module.exports = router;