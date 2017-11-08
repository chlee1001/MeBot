/**
 * Created by chlee1001 on 2017.11.07.
 */
module.exports.airpollution = function (callback) {
	var xml2js = require('xml2js');
	var parser = new xml2js.Parser();
	var request = require('request');

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
				result = (result.response.body[0].items[0].item[11]);
				var locate = '측정소 위치: ' + result.stationName; // 측정소 위치
				var date = '측정시간: ' + result.dataTime; // 측정 시간
				//var o3 = result.o3Value[0]; // 오존 농도
				var pm10 = '미세먼지 농도: ' + result.pm10Value[0]; // 미세먼지 (PM10) 농도
				var pm10Grade = result.pm10Grade[0]; // 미세먼지 등급
				switch (pm10Grade) { // 미세먼지 등급 변환
				case '1':
					pm10Grade = '좋음';
					break;
				case '2':
					pm10Grade = '보통';
					break;
				case '3':
					pm10Grade = '니쁨';
					break;
				case '4':
					pm10Grade = '매우나쁨';
					break;
				default:
					pm10Grade = 'error';
				}
				var message = locate + '\n' + date + '\n' + pm10 + '\n' + '미세먼지 등급: ' + pm10Grade;
				//console.log(message);

				return callback(message); // weather.js로 콜백

			});

		}
	});
}