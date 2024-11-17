const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const mysql = require('mysql2/promise');
const CONFIG = require('./db/config');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');

const emailRouter = require('./routes/email');

const expressSession = require('express-session');
const bodyParser = require('body-parser');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser('а9і8ао23тт**о3'));
app.use(expressSession({
  secret: 'а9і8ао23тт**о3',
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// авторизация
app.use(async (req, res, next) => {
  if (res.locals.email === undefined) {
    console.log('========middleware auth ========')
    console.log(req.session.pid);
    console.log('========middleware auth ========')
    if (req.session.pid) {
      let query = "SELECT * from users where id = ? limit 1";
      const connection = await mysql.createConnection(CONFIG);
      const [user, fields] = await connection.execute(query, [req.session.pid]);
      res.locals.email = user[0]['email'];
      console.log('========middleware========')
      console.log(user[0]['email']);
      console.log('========middleware========')
    }
  }
  next();
});


app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/login', loginRouter);
app.use('/email', emailRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
