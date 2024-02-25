var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var logger = require('./utils/logger').getLogger();
var dbconnect = require('./db/connect');
const apiRouter = require('./router/api');


// var config = require('./config');

const bodyParser = require('body-parser');

console.log("SETTING LOG LEVEL TO " + process.env.LOG_LEVEL ?? 'info');
logger.info("Logger Loaded Successfully");
dbconnect.connect(true);

var app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static( path.join(__dirname, '../frontend/build') ));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	next();
});
  

app.get("/", async (req, res) => {
	return res.status(200).send("Hello World");
});


// app.listen(3000, (req, res) => {
// 	console.log("Server started at port 3000");
// })
// app.use('/', indexRouter);
// app.use('/ui', uiRouter);
// app.use('/api/auth', auth);
app.use('/api', apiRouter);



module.exports = app;
