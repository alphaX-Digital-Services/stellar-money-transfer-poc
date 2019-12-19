const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const helmet = require('helmet');
const requestLogger = require('./middleware/request-logger');
const getEnv = require('./helpers/get-env');
const errorLogger = require('./middleware/error-logger');


const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

const app = express();
mongoose.connect(getEnv('database'),  {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); 
// view engine setup.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');    

app.use(helmet());
app.use(cors());
app.use(requestLogger());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);

app.use(errorLogger());
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
