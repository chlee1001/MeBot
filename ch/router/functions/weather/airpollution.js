/**
 * Created by chlee1001 on 2017.11.10.
 */

module.exports.airpollution= function (callback) {
	// DataBase
	var mysql = require("mysql");
	var express = require('express');
	var app = express();

	var connection = mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "a40844084",
			database: "computerNetwork"
		});
	connection.connect(function (err) {
		if (err) {
			console.log('Error connecting: ' + err.stack);
		} else
			console.log('Connection as id ' + connection.threadId);
	});

	connection.query('SELECT * from airpollution', function (err, rows, fields) {
		connection.end();
		if (!err) {
			var data = rows[0].locate + '\n' + rows[0].date + '\n' + rows[0].pm10 + '\n' + '미세먼지 등급: ' + rows[0].pm10Grade;
			console.log(data);
			//res.send(data);
			return callback(data); // weather.js로 콜백
		} else
			console.log('Error while performing Query.');
	});
}
