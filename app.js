const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var spacesRouter = require('./routes/spaces');
var testsRouter = require('./routes/tests');
var speedRouter = require('./routes/speed');
var apiRouter = require('./routes/api');

const strings = require('./strings');

var app = express();
console.log(strings.dbConnect());
//database
mongoose.connect(strings.dbConnect(), { useNewUrlParser: true, keepAlive: true, keepAliveInitialDelay: 300000 })
    .then(() => {console.log('Connected ot database...')})
    .catch(err => console.error(err));

// session
app.use(session({
  secret: strings.sessionSecret,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: strings.sessionTtl // 10 weeks
  })
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ?
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 100000, arrayLimit: 100000 }));

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src')));

// Routes
app.use('/', indexRouter);
app.use('/space', spacesRouter);
app.use('/test', testsRouter);
app.use('/api', apiRouter);
app.use('/speed', speedRouter);


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
