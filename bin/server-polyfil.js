if (process.env.NODE_ENV === 'development'){
  require('babel-register')
}

require('babel-polyfill')
var log = require('nlogger').logger(module)
var app = require('express')()

var cfg = require('./config')
var db  = require('./db')


db.once('open', function () {
  log.info('MongoDB connected.')
})

db.on('close', function () {
  log.info('MongoDB closed.')
})

db.on('error', function (err) {
  log.error('MongoDB connection error:', err)
})

require('./middleware/express')(app)

var server = app.listen(cfg.port, function () {
  log.info('Server listening on port ', cfg.port)
})

// Start socket.io & bring in routes
var io = require('./io')(server)
require('./router')(app, io)


server.on('close', function () {
  log.info('Server connection closed.')
})


module.exports = server
