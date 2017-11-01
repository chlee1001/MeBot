/**
 * Created by chlee1001 on 2017-11-01.
 */
module.exports.restaurant = function (callback) {
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
			

			
			for (var i = 0; i < 100; i++){
			var title = objBody.items[i].title;
			var category = objBody.items[i].category;
			

			}

			//카톡으로 메시지를 전송하기 위한 메시지


		} else {
			//네이버에서 메시지 에러 발생
			console.log('error = ' + response.statusCode);

			let message = {
				"message": {
					"text": response.statusCode
				},
			};
			//카톡에 메시지 전송 에러 메시지
			return callback(message);
		}
	});
}