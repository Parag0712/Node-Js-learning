var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var usersRouter = require('./routes/users');
//extra
var session = require('express-session')
var indexRouter = require('./routes/index');
const passport = require('passport');
const flash = require('connect-flash')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static("./public"))

// session setup server ko allow kar rhe hai hold kar sake session ka data
//server save kar payega

app.use(session({
  resave:false,
  saveUninitialized:false,
  secret:"hlaoa"
}))

// passport setup
//yaha pe passport ko initialize kar rhe ki ab shuru ho jav ab tumhe authentication authorization on kar na hai
app.use(passport.initialize())

//here we talk about passport package 
//passport session() on passportsession module jisse ki passport apne session ko save kar payega  
app.use(passport.session())

//checking hoga user ki 
passport.serializeUser(usersRouter.serializeUser())
passport.deserializeUser(usersRouter.deserializeUser())

app.use(flash());


// logger 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

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
