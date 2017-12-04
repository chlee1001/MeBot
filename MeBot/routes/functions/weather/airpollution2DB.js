/**
 * Created by chlee1001 on 2017.11.09.
 */

module.exports = function (app, mysql, connection) {
	// DataBase
	var mysql = require("mysql");
	var express = require('express');
	var app = express();

	var db_config = {
		host: "localhost",
		user: "root",
		password: "a40844084",
		database: "computerNetwork"
	};

	function handleDisconnect() {
		var connection = mysql.createConnection(db_config); // Recreate the connection, since
		// the old one cannot be reused.

		connection.connect(function (err) { // The server is either down
			if (err) { // or restarting (takes a while sometimes).
				console.log('error when connecting to db:', err);
				setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
			} // to avoid a hot loop, and to allow our node script to
			else {
				console.log('Connection as id ' + connection.threadId);
				updateDB(connection);
			}
		}); // process asynchronous requests in the meantime.
		// If you're also serving http, display a 503 error.
		connection.on('error', function (err) {
			console.log('db error', err);
			if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
				handleDisconnect(); // lost due to either server restart, or a
			} else { // connnection idle timeout (the wait_timeout
				throw err; // server variable configures this)
			}
		});
	}

	handleDisconnect();

}

function updateDB(connection) {
	var xml2js = require('xml2js');
	var parser = new xml2js.Parser();
	var request = require('request');
	var time = require('date-utils');
	var dDate = new Date();
	var today = dDate.toFormat('YYYY-MM-DD HH24:MI');
	var options = {
		url: 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=rC%2BmF3DCdE%2BCfEcFI9xIb%2FIzswvPz1MPV5rx4MoHur2mLbP4HAple5n8itK18TW9PwYMlpTIoArMpyA4DN8oYQ%3D%3D&numOfRows=50&pageNo=1&ver=1.3&sidoName=%EA%B2%BD%EA%B8%B0'
	};

	request.get(options, function (error, response, body) {
		//request 성공했으면..
		if (!error && response.statusCode == 200) {
			//console.log(body);
			var xml = body;
			parser.parseString(xml, function (err, result) {

				//var objBody = JSON.parse(strBody);
				result = (result.response.body[0].items[0].item[12]);

				// table 초기화
				var deleteQuery = connection.query(
						"DELETE FROM airpollution WHERE id = 1",
						function (err, result) {
						if (err) {
							console.log('db err: ' + err);
							throw err;
						}
						//console.log('Del_success ');
					});

				// Insert data to table
				var n_locate = '측정소 위치: ' + result.stationName; // 측정소 위치
				var n_date = '측정시간: ' + result.dataTime; // 측정 시간
				//var o3 = result.o3Value[0]; // 오존 농도
				var n_pm10 = '미세먼지 농도: ' + result.pm10Value[0]; // 미세먼지 (PM10) 농도
				var n_pm10Grade = result.pm10Grade[0]; // 미세먼지 등급
				switch (n_pm10Grade) { // 미세먼지 등급 변환
				case '1':
					n_pm10Grade = '좋음';
					break;
				case '2':
					n_pm10Grade = '보통';
					break;
				case '3':
					n_pm10Grade = '니쁨';
					break;
				case '4':
					n_pm10Grade = '매우나쁨';
					break;
				default:
					n_pm10Grade = 'error';
				}

				if (result.pm10Value[0] == '-') {
					n_pm10 = '미세먼지 농도: ' + '공공데이터 포털에서 제공하는 API에 오류가 있습니다.'

				}

				var airpollution = {
					id: ' 1 ',
					locate: n_locate,
					date: n_date,
					pm10: n_pm10,
					pm10Grade: n_pm10Grade
				};

				var query = connection.query(
						"Insert into airpollution set ?", airpollution,
						function (err, result) {
						if (err) {
							console.log(' db err: ' + err);
							throw err;
						}
						console.log(' success ' + today);
					});

			});

		} else {
			console.log(' airpollution error ');
			//console.log(' error = ' + response.statusCode);

		}
	});

}