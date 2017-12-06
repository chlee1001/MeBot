/**
 * Created by chlee1001 on 2017.12.06.
 */

module.exports.tomorrowWeather = function (callback) {
	// DataBase
	var mysql = require("mysql");
	var express = require('express');
	var app = express();
	require('date-utils');
	var dDate = new Date();
	var tomorrow = dDate.toFormat('YYYY-MM');
	var temp = dDate.toFormat('DD');
	temp = parseInt(temp) + 1;
	tomorrow += '-' + temp;

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
	connection.query('SELECT * from weather', function (err, rows, fields) {
		connection.end();
		if (!err) {
			if (!rows.length) {
				data = 'DB is Empty';
				//console.log(data);
				//return callback(data);
			} else {
				data = rows[1].sky + '\n' + rows[1].maxTemperature + rows[1].minTemperature;
				//console.log(data);
				//res.send(data);
				//return callback(data); // weather.js로 콜백
			}

			result = '내일 ' + tomorrow + '의 날씨 정보\n\n' + data;

			//카톡으로 번역된 메시지를 전송하기 위한 메시지
			let message = {
				"message": {
					"text": result
				},
				"keyboard": {
					"type": "buttons",
					"buttons": [
						"현재 날씨",
						"오늘 날씨",
						"돌아가기"
					]
				}
			};
			//카톡에 메시지 전송
			return callback(message);

		} else {
			console.log('Error while performing Query.');
		}
	});
}