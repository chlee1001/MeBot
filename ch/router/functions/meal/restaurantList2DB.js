/**
 * Created by chlee1001 on 2017-11-07.
 */

//module.exports = function (app, mysql, connection) {
// DataBase
var mysql = require("mysql");
var express = require('express');
var app = express();

var connection = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "1234",
		database: "computerNetwork"
	});
connection.connect(function (err) {
	if (err) {
		console.log('Error connecting: ' + err.stack);
	} else
		console.log('Connection as id ' + connection.threadId);
});

updateDB();
//}

function updateDB() {
	var fs = require('fs');

	//네이버 TTS 용 패키지 웹 요청 용
	var request = require('request');

	//카카오톡 파싱용 패키지
	var bodyParser = require('body-parser');
	var client_id = 'jGddVefbv4vkbp6ZdIGv'; //'네이버 API ID';
	var client_secret = 'zQsi6SaVMy'; //'네이버 API 암호키';
	var api_url = 'https://openapi.naver.com/v1/search/local.json';

	var options = {
		url: api_url,
		qs: {
			'query': '가천대맛집',
			'display': 100,
			'start': 1,
			'sort': 'random'
		},
		headers: {
			'X-Naver-Client-Id': client_id,
			'X-Naver-Client-Secret': client_secret
		}
	};

	request.get(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			//json 파싱
			var objBody = JSON.parse(response.body);

			for (var i = 1; i <= 100; i++) { // table 초기화
				var deleteQuery = connection.query(
						"DELETE FROM restaurantList WHERE id =" + i,
						function (err, result) {
						if (err) {
							console.log('db err: ' + err);
							throw err;
						}
						//console.log('Del_success ');
					});
			}

			var setAIquery = connection.query( // AI 1로 초기화
					"ALTER TABLE restaurantList AUTO_INCREMENT=1 ",
					function (err, result) {
					if (err) {
						console.log('db err: ' + err);
						throw err;
					}
					//console.log('ResetAIsuccess ');
				});

			for (var i = 0; i < 100; i++) { // Insert data to table
				var n_title = objBody.items[i].title;
				var n_link = objBody.items[i].link;
				var n_category = objBody.items[i].category;
				var n_roadAddress = objBody.items[i].roadAddress;

				//var list = i + 1 + ' ' + title + category + roadAddress + link;

				var restaurantList = {
					title: n_title,
					category: n_category,
					roadAddress: n_roadAddress,
					link: n_link
				};

				var query = connection.query(
						"Insert into restaurantList set ?", restaurantList,
						function (err, result) {
						if (err) {
							console.log('db err: ' + err);
							throw err;
						}
						//	console.log('success ');
					});

			}

		} else {
			console.log('error = ' + response.statusCode);

		}
	});

}