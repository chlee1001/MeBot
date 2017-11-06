/**
 * Created by chlee1001 on 2017-11-07.
 */
module.exports = function (app, mysql, connection) {
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

		for (var i = 0; i < 100; i++) {
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
					console.log('success ');
				});

		}

		//카톡으로 메시지를 전송하기 위한 메시지


	} else {
		console.log('error = ' + response.statusCode);

	}
});
}