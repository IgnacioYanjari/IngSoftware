var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Configuración de nexmo
// var nexmo = require('./system/nexmo.js');

// Configuración de MongoDB
require('./system/mongoDB.js');

//Configuración de Mongoose
require('./system/mongoose.js');
// Header
var responseHeader = require('./system/responseHeader.js')

// Require de las rutas:
var indexRouter = require('./routes/index');
var sendSMS = require('./routes/api/sms/sendSMS');
var apiUser = require('./routes/api/user/main');


var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// Set Headers
app.use(responseHeader);

// Default
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Rutas :
app.use('/', indexRouter);
app.use('/sendSMS', sendSMS);
app.use('/api/user',apiUser);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
