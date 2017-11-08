/**
 * Created by chlee1001 on 2017-10-31.
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

	request.get(options, function (error, response, body) {
		//request 성공했으면..
		if (!error && response.statusCode == 200) {
			//json 파싱
			var objBody = JSON.parse(response.body);
			//필요한 부분만 추출

			var sky = objBody.weather.hourly[0].sky.name;
			var temperature = objBody.weather.hourly[0].temperature;
			var humidity = objBody.weather.hourly[0].humidity;

			result = sky + '\n현재 기온: ' + temperature.tc + '℃\n최고 기온: ' + temperature.tmax
				 + '℃\n최저 기온: ' + temperature.tmin + '℃\n습도: ' + humidity + '%';

			//카톡으로 번역된 메시지를 전송하기 위한 메시지
			let message = {
				"message": {
					"text": '현재 ' + today + '의 날씨 정보(해)(구름)(비)\n\n' + result
				},
				"keyboard": {
					"type": "buttons",
					"buttons": [
						"학식",
						"식당추천",
						"날씨",
						"번역기",
						"사진",
						"처음으로"
					]
				}
			};
			//카톡에 메시지 전송
			return callback(message);

		}
	});
}