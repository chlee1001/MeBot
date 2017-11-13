/**
 * Created by chlee1001 on 2017.11.12.
 */
var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require("fs");
var http = require('http');
var schedule = require('node-schedule');
var restaurantListDB = require('./routes/functions/meal/restaurantList2DB.js');
var airpollution2DB = require('./routes/functions/weather/airpollution2DB.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
		extended: false
	}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// Server connect
var server = app.listen(9000, function () { // port 9000 서버 실행
		console.log("Express server has started on port 9000")
	});

// MeBot start
var router = require('./routes/start')(app, fs);

app.get('/list', function (req, res) {
	var db = require('./routes/functions/meal/restaurantList.js')(req, res);
});

// call restaurantDB connection
var restaurantDB = schedule.scheduleJob('00 00 06 1 */1 *', function () { // DB update Scheduler: 매월 1일 6시
		restaurantListDB();
	});

var airpollutionDB = schedule.scheduleJob('10 * * * *', function() {
		airpollution2DB();
	});



// Connect IO
var io = require('./io')(server);

var index = require('./routes/homepage/index');
app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
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