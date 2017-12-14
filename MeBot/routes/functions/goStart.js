/**
 * Created by chlee1001 on 2017.12.14.
 */

module.exports.start = function (callback) {
	// DataBase
	var mysql = require("mysql");
	var express = require('express');
	var app = express();
	var time = require('date-utils');
	var dDate = new Date();
	var ctoday = dDate.toFormat('YYYYMMDD');
	var today = dDate.toFormat('YYYY-MM-DD');

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

	var data = '';
	connection.query('SELECT * from specialDay ORDER BY date', function (err, rows, fields) {
		connection.end();

		if (!err) {
			if (!rows.length) {
				data = '오늘은 ' + today + '입니다.';
				//console.log(data);
				return callback(data);
			} else {
				for (var i = 0; i < rows.length; i++) {
					if (rows[i].date == ctoday) {
						data += rows[i].dateName + ' ';
					} else {
						data = '오늘은 ' + today + '입니다.';
						return callback(data);
					}
				}
				var result = '오늘은 ' + today + ' ' + data + '입니다.';
				return callback(result);
			}
		} else {
			console.log('Error while performing Query.');
		}
	});
}