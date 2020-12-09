const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

require('dotenv').config()

const siteRoutes = require('./routes/routerlist')
const compression = require('compression')
const helmet = require('helmet')

const app = express()

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "default-src": ["'self'", "'chriscorchado.com'"],
      "style-src": [
        "'self'",
        "'stackpath.bootstrapcdn.com'",
        "'cdn.jsdelivr.net'",
        "'chriscorchado.com'"
      ],
      "script-src": [
        "'self'",
        "'code.jquery.com'",
        "'cdn.jsdelivr.net'",
        "'cdnjs.cloudflare.com'",
        "'chriscorchado.com'"
      ],
      "img-src": ["'self'", "'chriscorchado.com'"]
    }
  })
)

// Set up mongoose connection
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(compression()) // Compress all routes
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', siteRoutes)

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// Error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // Render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
