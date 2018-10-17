var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose')
var session = require('express-session')
var passport = require('passport')
var flash = require('connect-flash')
var validation = require('express-validator')
var bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var productRouter = require('./routes/shop/product')
var userAccount = require('./routes/user/account')

var app = express();

//setting up DB
dbURL = 'mongodb://127.0.0.1:27017/cee-kay'  //locally installed mongodb

mongoose.connect(dbURL, {useNewUrlParser: true})
mongoose.Promise = global.Promise;

require('./config/passport')


// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'chinedusupersecret', resave: false, saveUninitialized: false}))

//body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//set express validator after body parser
app.use(validation())

//flash middleware is used to append validation message to sessions
app.use(flash())
//initializing passport middleware
app.use(passport.initialize())
//this tells passport to use session for authentiication
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')))


//setting uproute middleware
app.use('/', indexRouter);
app.use('/products', productRouter);
app.use('/account', userAccount);

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
