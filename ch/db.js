/**
 * Created by chlee1001 on 2017-11-02.
 */
var express = require('express');
var app = express();
module.exports = () => {
	// DataBase
	var mysql = require("mysql");
	var connection = mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "1234",
			database: "computerNetwork"
		});
	connection.connect(function (err) {
		if (err) {
			console.log('Error connecting: ' + err.stack);
			return;
		}
		console.log('Connection as id ' + connection.threadId);
	});

	var schedule = require('node-schedule');

	var startDB = schedule.scheduleJob('00 00 06 1 */1 *', function () {
			var router = require('./router/meal/restaurantList2DB')(app, mysql, connection);
		});
};