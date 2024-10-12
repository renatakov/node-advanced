const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next)=>{
    const [data] = await global.conn.execute('SELECT * FROM programming_languages');
    res.render('pl', {"data": data});
})

module.exports = router;