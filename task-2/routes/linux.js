const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next)=>{
    const [data] = await global.conn.execute('SELECT * FROM linux_distributions');
    console.log(data);
    res.render('linux', {"data": data})
})

module.exports = router;