const express = require('express');
const router = express.Router();

const mysql = require('mysql2/promise');
const CONFIG = require('../db/config');
// const Q = require('../db/queries');

router.post('/login', async function (req, res, next) {
    const email = req.body.email;
    console.log('**************');
    console.log(email);
    console.log('**************');

    // Проверяем есть ли пользователь в базе??

    let query = 'SELECT * FROM users WHERE email = ? limit 1';
    const connection = await mysql.createConnection(CONFIG);
    let [user, fields] = await connection.execute(query, [email]);
    console.log(user);

    // Проверяем найден ли пользователь с таким емейл

    if (user.length === 0) {
        // ветка отвечающая за то, что пользователя нет. 
        // регистрируем пользователя
        console.log('user not found');
        console.log('created new user');

        query = "INSERT INTO users (email, created_at) VALUES (?, ?)";
        user = await connection.execute(query, [email, Math.floor(Date.now() / 1000)]);
        console.log(user[0].insertId);
        // теперь нужно сгенерировать код для пользователя (для входа)

        const auth = createRandomString(16);
        const code = createRandomString(6);
        query = "INSERT INTO user_code (auth, uid, code, created_at) VALUES (?, ?, ?, ?)"
        await connection.execute(query, [auth, user[0].insertId, code, Math.floor(Date.now() / 1000)]);

        // отправляем email c кодом пользователю

        // #todo sendEmail(user[0]['email'], code);
    }
    else {
        console.log('user was found');
        // теперь нужно сгенерировать код для пользователя (для входа)

        const auth = createRandomString(16);
        const code = createRandomString(6);
        query = "INSERT INTO user_code (auth, uid, code, created_at) VALUES (?, ?, ?, ?)"
        await connection.execute(query, [auth, user[0].id, code, Math.floor(Date.now() / 1000)]);

        // отправляем email c кодом пользователю

        // #todo sendEmail(user[0]['email'], code);

    }
    res.json({ "email": email });
});

function createRandomString(length) {
    const chars = "A!B@C#D$E%F^G&*H_I+J=KLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

module.exports = router;