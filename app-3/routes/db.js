const express = require('express');
const router = express.Router();



router.get('/', async (req, res, next) => {
    const [data] = await global.conn.execute('SELECT * FROM category Left join category_lang on category_lang.cid = category.id where lang = "ua"');

    console.log(data)
    res.render('db', { "data": data });
})

router.get('/test/:n', async (req, res, next) => {
    const n = req.params.n;
    console.log(n)

    const [data] = await global.conn.execute('SELECT * FROM category Left join category_lang on category_lang.cid = category.id  WHERE lang = "ua" and category.id= ?', [n]);

    console.log(data)

    res.render('db1', { "data": data[0] })
})

module.exports = router;