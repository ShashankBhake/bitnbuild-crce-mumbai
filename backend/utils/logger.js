
var log4js = require('log4js');
require('dotenv').config();
const logLevel = process.env.LOG_LEVEL || 'info';

module.exports.getLoggerByName = function(name){
	log4js.configure({
		appenders: {
		  everything: { type: "stdout", layout: { type: 'pattern',  pattern: '[%d] [%p] - %c - %f{1}:%l:%o -  %m%n'} },
		},
		categories: {
		  default: { appenders: ["everything"], level: logLevel, enableCallStack : true },
		},
	  });
    const logger = log4js.getLogger(name);
    return logger;
}

module.exports.getLogger = function()
{
	return module.exports.getLoggerByName("default");
}