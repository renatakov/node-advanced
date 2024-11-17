const express = require('express');
const router = express.Router();

const mysql = require('mysql2/promise');
const CONFIG        = require('../db/config');
// const Q = require('../db/queries');

/* GET home page. */
router.get('/', async function(req, res, next) {

  console.log('login');

  res.render('login', { 
    title: 'login',
  });
});

// операция login
router.get('/check', async function(req, res, next) {

  console.log('login check');
  const email = req.query.email;
  const code = req.query.code;

  // проверяем, есть ли такой юзер
  let query = "SELECT id, email, code FROM `user_code` LEFT JOIN users ON users.id = user_code.uid WHERE users.email = ? and user_code.code = ? order by user_code.created_at desc limit 1";

  const connection  = await mysql.createConnection(CONFIG);
  const [user, fields] = await connection.execute(query, [email, code]);

  console.log(user);

  if (user.length === 0) {
    // если пары емейл и код не найдено - очищаем все
      console.log('user not found');
      req.session.pid = undefined;
      res.locals.email = undefined;
  }
  else {
      console.log('user found');
      // создаем логин
      req.session.pid = user[0].id;
      res.locals.email = user[0]['email'];
  }
  connection.end();

  res.redirect('/')
});

module.exports = router;