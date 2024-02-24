var mongoose = require('mongoose');
const logger = require('../utils/logger').getLoggerByName('Database Connection');

var connectionString = process.env.MONGODB_URI || 'gotcha bro';

module.exports.connect = function(auto_reconnect) {
    logger.trace("Trying to connect to MongoDB");

    var dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };
	logger.trace("CONNECTION STRING: " + connectionString);
    mongoose.connect(connectionString, dbOptions);

    var db = mongoose.connection;

    db.on('connecting', function() {
        logger.trace('connecting to MongoDB...');
    });

    db.on('error', function(error) {
        logger.error('Error in MongoDb connection: ' + error);
        mongoose.disconnect();
    });
    db.on('connected', function() {
        logger.info('MongoDB connected!');
    });
    db.once('open', function() {
        logger.trace('MongoDB connection opened!');
    });
    db.on('reconnected', function() {
        logger.info('MongoDB reconnected!');
    });
    db.on('disconnected', function() {
		logger.info('MongoDB disconnected!');
		mongoose.connect(connectionString, dbOptions);
    });
}
