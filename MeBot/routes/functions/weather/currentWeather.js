/**
 * Created by chlee1001 on 2017.10.31.
 */

module.exports.weather = function (callback) {
	var request = require('request');
	require('date-utils');
	var dDate = new Date();
	var today = dDate.toFormat('YYYY-MM-DD HH24:MI');

	var token = '0e11bbe9-967c-39bb-82cf-75cee94b2530';

	var options = {
		url: 'http://apis.skplanetx.com/weather/current/hourly?lon=127.1278846&village=&county=&lat=37.4506388&city=&version=1',
		method: 'GET',
		headers: {
			'appkey': token
		}
	};

	var result2 = '';
	var air = require('./airpollution');

	air.airpollution(function (result2) {
		//console.log(result2);

		request.get(options, function (error, response, body) {
			//request 성공했으면..
			if (!error && response.statusCode == 200) {

				//json 파싱
				var objBody = JSON.parse(response.body);
				//필요한 부분만 추출

				var sky = objBody.weather.hourly[0].sky.name;
				var temperature = objBody.weather.hourly[0].temperature;
				var humidity = objBody.weather.hourly[0].humidity;

				if (sky == '비 또는 눈') {
					sky += ' (비) (눈)';
				} else if (sky == '눈') {
					sky += ' (눈)';
				} else if (sky == '흐림') {
					sky += ' (구름)';
				} else if (sky == '구름많음') {
					sky += ' (구름)(구름)';
				}

				result = '현재 ' + today + '의 날씨 정보(해)(구름)(비)\n\n' + sky
					 + '\n현재 기온: ' + temperature.tc + '℃\n최고 기온: ' + temperature.tmax
					 + '℃\n최저 기온: ' + temperature.tmin + '℃\n습도: ' + humidity + '%\n\n미세먼지 정보\n' + result2;

				//카톡으로 번역된 메시지를 전송하기 위한 메시지
				let message = {
					"message": {
						"text": result
					},
					"keyboard": {
						"type": "buttons",
						"buttons": [
							"오늘 날씨",
							"내일 날씨",
							"돌아가기"
						]
					}
				};
				//카톡에 메시지 전송
				return callback(message);

			}
		});
	})

}