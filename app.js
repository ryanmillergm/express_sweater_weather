var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/api/v1/users');
var sessionsRouter = require('./routes/api/v1/sessions');

var app = express();

const MONGO_USERNAME = process.env.MONGO_USERNAME
const MONGO_PASSWORD = process.env.MONGO_PASSWORD
const MONGOURL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@express-practice-ll9xu.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(MONGOURL)
  .then(() => console.log("DB connected"))
  .catch(error => console.log(error));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/sessions', sessionsRouter);

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

// let express = require('express')
// let app = express()
// let personRoute = require('./routes/person')
// let customerRoute = require('./routes/customer')
// let path = require('path')
// let bodyParser = require('body-parser')
//
// app.use(bodyParser.json())
//
// app.use((req, res, next) => {
//   console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body)
//   next()
// })
//
// app.use(personRoute)
// app.use(customerRoute)
// app.use(express.static('public'))
//
// //handler for 404 - Resource not found
// app.use((req, res, next) => {
//   res.status(404).send('We think that you are lost!')
// })
//
// //handler for error 500
// app.use((err, req, res, next) => {
//   console.error(err.stack)
//   res.sendFile(path.join(__dirname, '../public/500.html'))
// })
// const PORT = process.env.PORT || 3000
// app.listen(PORT, () => console.info(`Server has started on port ${PORT}`))
