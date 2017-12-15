/**
 * Created by chlee1001 on 2017.12.06.
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
		database: "computerNetwork",
		connectionLimit: 50
	};

	function handleDisconnect() {
		var pool = mysql.createPool(db_config); // Recreate the connection pool, since
		// the old one cannot be reused.

		// Get Connection in Pool
		pool.getConnection(function (err, connection) { // The server is either down
			if (err) { // or restarting (takes a while sometimes).
				console.log('error when connecting to db:', err);
				setTimeout(handleDisconnect, 5000); // We introduce a delay before attempting to reconnect,
				connection.release(); // 커넥션을 풀에 반환
			} // to avoid a hot loop, and to allow our node script to
			else {
				updateDB(connection);
			}
		}); // process asynchronous requests in the meantime.
		// If you're also serving http, display a 503 error.
		pool.on('error', function (err) {
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
	var request = require('request');
	require('date-utils');
	var dDate = new Date();
	var today = dDate.toFormat('YYYY-MM-DD HH24:MI');

	var token = '0e11bbe9-967c-39bb-82cf-75cee94b2530';

	var options = {
		url: 'http://apis.skplanetx.com/weather/summary?lon=127.1278846&stnid=&lat=37.4506388&version=1',
		method: 'GET',
		headers: {
			'appkey': token
		}
	};

	request.get(options, function (error, response, body) {
		// request 성공했으면..
		if (!error && response.statusCode == 200) {
			console.log('API connection success');
			// json 파싱
			var objBody = JSON.parse(response.body);

			// 필요한 부분만 추출
			var sky1 = objBody.weather.summary[0].today.sky.name;
			var temperature1 = objBody.weather.summary[0].today.temperature;

			var sky2 = objBody.weather.summary[0].tomorrow.sky.name;
			var temperature2 = objBody.weather.summary[0].tomorrow.temperature;

			if (sky1 == '비 또는 눈') {
				sky1 += ' (비) (눈)';
			} else if (sky1 == '눈') {
				sky1 += ' (눈)';
			} else if (sky1 == '흐림') {
				sky1 += ' (구름)';
			} else if (sky1 == '구름많음') {
				sky1 += ' (구름)(구름)';
			}

			if (sky2 == '비 또는 눈') {
				sky2 += ' (비) (눈)';
			} else if (sky2 == '눈') {
				sky2 += ' (눈)';
			} else if (sky2 == '흐림') {
				sky2 += ' (구름)';
			} else if (sky2 == '구름많음') {
				sky2 += ' (구름)(구름)';
			}

			/*
			result = '오늘 ' + today + '의 날씨 정보\n\n' + sky
			+ '\n최고 기온: ' + temperature.tmax
			+ '℃\n최저 기온: ' + temperature.tmin + '℃';
			 */

			// table 초기화
			for (var i = 1; i <= 2; i++) {
				var deleteQuery = connection.query(
						"DELETE FROM weather WHERE id =" + i,
						function (err, result) {
						if (err) {
							console.log('db err: ' + err);
							throw err;
						}
						//console.log('Del_success ');
					});
			}

			// Insert data to table
			var n_sky1 = '복정동 날씨: ' + sky1; // 날씨 정보
			var n_tempMax1 = '최고 기온: ' + temperature1.tmax + '℃\n'; // 최고기온
			var n_tempMin1 = '최저 기온: ' + temperature1.tmin + '℃'; // 최저기온

			var n_sky2 = '복정동 날씨: ' + sky2; // 날씨 정보
			var n_tempMax2 = '최고 기온: ' + temperature2.tmax + '℃\n'; // 최고기온
			var n_tempMin2 = '최저 기온: ' + temperature2.tmin + '℃'; // 최저기온

			var todayweather = {
				id: '1',
				sky: n_sky1,
				maxTemperature: n_tempMax1,
				minTemperature: n_tempMin1
			};

			var tomorrowweather = {
				id: '2',
				sky: n_sky2,
				maxTemperature: n_tempMax2,
				minTemperature: n_tempMin2
			};

			var query = connection.query(
					"Insert into weather set ?", todayweather,
					function (err, result) {
					if (err) {
						console.log(' db err: ' + err);
						throw err;
					}
					console.log('success todayweather ' + today);
				});

			var query = connection.query(
					"Insert into weather set ?", tomorrowweather,
					function (err, result) {
					if (err) {
						console.log(' db err: ' + err);
						throw err;
					}
					console.log('success tomorrowweather ' + today);
				});

		} else {
			console.log('weather error ');
			//console.log(' error = ' + response.statusCode);

		}
	});

}