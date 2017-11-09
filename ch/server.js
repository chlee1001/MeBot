/**
 * Created by chlee1001 on 2017-10-17.
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs");
var schedule = require('node-schedule');
var restaurantListDB = require('./router/functions/meal/restaurantList2DB.js');
var airpollutionDB = require('./router/functions/airpollution2DB.js');

app.get('/', function (req, res) {
	res.send("Hello World");
});

var server = app.listen(3000, function () { // port 3000으로 서버 실행
		console.log("Express server has started on port 3000")
	});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

var router = require('./router/start')(app, fs);

// call restaurantDB connection
var restaurantDB = schedule.scheduleJob('00 00 06 1 */1 *', function () { // DB update Scheduler: 매월 1일 6시
		restaurantListDB();
	});

var airpollutionDB = schedule.scheduleJob('00 30* * * *', function() {
		airpollution2DB();
	});

app.get('/list', function (req, res) {
	var db = require('./router/functions/meal/restaurantList.js')(req, res);
});