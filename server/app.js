/**
 * Main application file
 * Sistema creado por Jorge Bo y Martín Pielvitori
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

//Logger
var winston = require('winston');
var cwd = process.cwd();
winston.loggers.add('info', {
  file: {
    filename: cwd + '/info.log',
    json: false,
    formatter: formatter
  }
});

winston.loggers.add('error', {
  file: {
    filename: cwd + '/error.log',
    json: false,
    formatter: formatter
  }
});

// Define options for Date#toLocaleTimeString call we will use.
var twoDigit = '2-digit';
var options = {
  day: twoDigit,
  month: twoDigit,
  year: twoDigit,
  hour: twoDigit,
  minute: twoDigit,
  second: twoDigit
};
function formatter(args) {
  var dateTimeComponents = new Date().toLocaleTimeString('es-AR', options).split(',');
  var logMessage = dateTimeComponents[0] + dateTimeComponents[1] + ' - ' + args.level + ': ' + args.message;
  return logMessage;
}


var loggerInfo = winston.loggers.get('info');
loggerInfo.info('Iniciando aplicación');

var config = require('./config/environment');

// Connect to database
var connection = mongoose.connect(config.mongo.uri, config.mongo.options);
autoIncrement.initialize(connection);

// Populate DB with sample data comentar en prod @martin
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
