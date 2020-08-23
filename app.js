let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let siteRoutes = require('./routes/routerlist');
let compression = require('compression');
let helmet = require('helmet');

let app = express();

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      'default-src': ["'self'", 'chriscorchado.com'],
      'style-src': [
        "'self'",
        'stackpath.bootstrapcdn.com',
        'cdn.jsdelivr.net',
        'chriscorchado.com',
      ],
      'script-src': [
        "'self'",
        'code.jquery.com',
        'cdn.jsdelivr.net',
        'cdnjs.cloudflare.com',
        'chriscorchado.com',
      ],
      'img-src': ["'self'", 'chriscorchado.com'],
    },
  })
);

//Set up mongoose connection
let mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://mongoDBuser:m0ng0WE3409@parker.d2xy4.mongodb.net/nodejs',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(compression()); //Compress all routes
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', siteRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
