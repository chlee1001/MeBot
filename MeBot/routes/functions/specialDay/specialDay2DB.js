/**
 * Created by chlee1001 on 2017.12.14.
 */
var request = require('request');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

var time = require('date-utils');
var dDate = new Date();
var today = dDate.toFormat('YYYY-MM-DD');
var year = dDate.toFormat('YYYY');
var month = dDate.toFormat('MM');

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
				initDB(connection);
				updateholidayDB(connection);
				update24DB(connection);
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

function initDB(connection) {
	connection.query('SELECT * from specialDay', function (err, rows, fields) {
		//	connection.end();
		if (!err) {
			if (!rows.length) {
				data = 'DB is Empty';
				console.log(data);
				//return callback(data);
			} else {
				for (var i = 0; i < rows.length; i++) {
					var deleteQuery = connection.query(
							"DELETE FROM specialDay",
							function (err, result) {
							if (err) {
								console.log('db err: ' + err);
								throw err;
							}
							console.log('Del_success ');
						});
				}

			}
		} else {
			console.log('Error while performing Query.');
		}
	});

}

function updateholidayDB(connection) {
	var options = {
		url: 'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?serviceKey=rC%2BmF3DCdE%2BCfEcFI9xIb%2FIzswvPz1MPV5rx4MoHur2mLbP4HAple5n8itK18TW9PwYMlpTIoArMpyA4DN8oYQ%3D%3D&solYear=' + year + '&solMonth=' + month
	};

	request.get(options, function (error, response, body) {
		//request 성공했으면..
		if (!error && response.statusCode == 200) {
			//console.log(body);
			var xml = body;
			parser.parseString(xml, function (err, result) {
				console.log('API connection success');
				if ((result.response.header[0].resultCode) == 22) {
					console.log("DB result error: code 22");
				} else {
					var i = 0;
					cnt = result.response.body[0].totalCount[0];
					for (i = 0; i < cnt; i++) {
						var re_result = (result.response.body[0].items[0].item[i]);

						// Insert data to table
						var n_dateName = re_result.dateName[0];
						var n_date = re_result.locdate[0];

						var specialDay = {
							id: month,
							date: n_date,
							dateName: n_dateName
						};

						console.log(specialDay);
						var query = connection.query(
								"Insert into specialDay set ?", specialDay,
								function (err, result) {
								if (err) {
									console.log(' db err: ' + err);
									throw err;
								}
								console.log('success specialDay ' + today);
							});
					}

				}
			});

		} else {
			console.log(' specialDay error ');
			//console.log(' error = ' + response.statusCode);

		}
	});
}

function update24DB(connection) {
	var options = {
		url: 'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/get24DivisionsInfo?serviceKey=rC%2BmF3DCdE%2BCfEcFI9xIb%2FIzswvPz1MPV5rx4MoHur2mLbP4HAple5n8itK18TW9PwYMlpTIoArMpyA4DN8oYQ%3D%3D&solYear=' + year + '&solMonth=' + month
	};

	request.get(options, function (error, response, body) {
		//request 성공했으면..
		if (!error && response.statusCode == 200) {
			//console.log(body);
			var xml = body;
			parser.parseString(xml, function (err, result) {
				console.log('API connection success');
				if ((result.response.header[0].resultCode) == 22) {
					console.log("DB result error: code 22");
				} else {
					var i = 0;
					cnt = result.response.body[0].totalCount[0];
					for (i = 0; i < cnt; i++) {
						var re_result = (result.response.body[0].items[0].item[i]);

						// Insert data to table
						var n_dateName = re_result.dateName[0];
						var n_date = re_result.locdate[0];

						var specialDay = {
							id: month,
							date: n_date,
							dateName: n_dateName
						};

						console.log(specialDay);
						var query = connection.query(
								"Insert into specialDay set ?", specialDay,
								function (err, result) {
								if (err) {
									console.log(' db err: ' + err);
									throw err;
								}
								console.log('success specialDay ' + today);
							});
					}

				}
			});

		} else {
			console.log(' specialDay error ');
			//console.log(' error = ' + response.statusCode);

		}
	});

}