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

			// 랜덤 넘버 생성
			var generateRandom = function (min, max) {
				var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
				return ranNum;
			}

			var i = generateRandom(1, 100); // 랜덤 넘버

			// 랜덤 넘버에 해당하는 식당 추출
			var title = objBody.items[i].title;
			var link = objBody.items[i].link;
			var category = objBody.items[i].category;
			var roadAddress = objBody.items[i].roadAddress;

			// 추출한 값들 합침
			var result = title + '\n' + category + '\n' + roadAddress;

			if (link.indexOf('http') > -1) { // 링크가 있을 때
				let message = {
					"message": {
						"text": result,
						"message_button": {
							"label": '링크',
							"url": link
						}
					},
					"keyboard": {
						"type": "buttons",
						"buttons": [
							'더 추천받기',
							'식당 리스트',
							'돌아가기'
						]
					}
				};

				return callback(message);

			} else {
				let message = {
					"message": {
						"text": result
					},
					"keyboard": {
						"type": "buttons",
						"buttons": [
							'더 추천받기',
							'식당 리스트',
							'돌아가기'
						]
					}
				};

				return callback(message);
			}

			console.log(result);
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