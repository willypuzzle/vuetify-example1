var express = require('express')
var path = require('path')
// var favicon = require('serve-favicon');
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var cors = require('cors')
var mongoose = require('moongose')
mongoose.connect('mongodb://localhost/example1')

var routes = require('./routes/index')
var users = require('./routes/users')

var app = express()

app.use(cors())

global.model = {}

global.model.get = (model) => {
  model = model.replace('/', path.sep)
  return require(path.join(__dirname, 'models', model))(mongoose)
}

global.helper.log = (file, line, err) => {
  console.log(file, line, err)
}

Object.defineProperty(global, '__stack', {
  get: function stackGet () {
    var orig = Error.prepareStackTrace
    Error.prepareStackTrace = function (_, stack) {
      return stack
    }
    var err = new Error()
    Error.captureStackTrace(err, stackGet)
    var stack = err.stack
    Error.prepareStackTrace = orig
    return stack
  }
})

Object.defineProperty(global, '__line', {
  get: function () {
    return __stack[1].getLineNumber()
  }
})

Object.defineProperty(global, '__function', {
  get: function () {
    return __stack[1].getFunctionName()
  }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)
app.use('/users', users)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
