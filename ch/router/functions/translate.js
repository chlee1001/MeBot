/**
 * Created by chlee1001 on 2017-10-30.
 */
module.exports.papago = function (content, callback) {
	//네이버 TTS 용 패키지 웹 요청 용
	var request = require('request');

	//카카오톡 파싱용 패키지
	var bodyParser = require('body-parser');
	var client_id = 'jGddVefbv4vkbp6ZdIGv'; //'당신의 네이버 API ID';
	var client_secret = 'zQsi6SaVMy'; //'당신의 네이버 API 암호키';
	var api_url = 'https://openapi.naver.com/v1/papago/n2mt';

	var options = {
		url: api_url,
		//한국어(source : ko) > 영어 (target : en ), 카톡에서 받은 메시지(text)
		form: {
			'source': 'ko',
			'target': 'en',
			'text': content
		},
		headers: {
			'X-Naver-Client-Id': client_id,
			'X-Naver-Client-Secret': client_secret
		}
	};
	//네이버로 번역하기 위해 전송(post)
	request.post(options, function (error, response, body) {
		//번역이 성공하였다면.
		if (!error && response.statusCode == 200) {
			//json 파싱
			var objBody = JSON.parse(response.body);
			//번역된 메시지
			console.log(objBody.message.result.translatedText);

			//카톡으로 번역된 메시지를 전송하기 위한 메시지
			let message = {
				"message": {
					"text": objBody.message.result.translatedText

				},
			};
			//카톡에 메시지 전송
			return callback(message);

		} else {
			 //네이버에서 메시지 에러 발생
			res.status(response.statusCode).end();
			console.log('error = ' + response.statusCode);

			let message = {
			"message": {
			"text": response.statusCode
			},
			};
			//카톡에 메시지 전송 에러 메시지
			return message;
			 
		}
	});
}