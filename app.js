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
var forecastRouter = require('./routes/api/v1/forecast');
var favoritesRouter = require('./routes/api/v1/favorites');
// var googleRouter = require('./services/google_geocoding');

var app = express();

const MONGO_USERNAME = process.env.MONGO_USERNAME
const MONGO_PASSWORD = process.env.MONGO_PASSWORD
const MONGOURL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@express-practice-ll9xu.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(MONGOURL)
  .then(() => console.log("DB connected"))
  .catch(error => console.log(error));

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
app.use('/api/v1/forecast', forecastRouter);
app.use('/api/v1/favorites', favoritesRouter);
// app.use('/google_geocoding.js', googleRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
