require('dotenv').config();
var app = require('./server');
var http = require('http');
var logger = require('./utils/logger').getLoggerByName("Server Startup");


var port = process.env.PORT || '3000';
console.log("PORT IS ", port);
app.set('port', port);
var server = http.createServer(app);
server.listen(port, "0.0.0.0");
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}


function onListening() {
    logger.info('Listening on ' + port);
}
