/**
 * Created by chlee1001 on 2017-10-31.
 */
module.exports.visionTower = function (callback) {

	var request = require("request");
	require('date-utils');

	const token = '9SuhlhFnlYnT9IVRKIHsLGaC42DbXhA6pAfsyNpvhhJ9OS8l2v';
	var dDate = new Date();
	var today = dDate.toFormat('YYYY-MM-DD');
	console.log(today);
	var options = {
		url: 'https://bds.bablabs.com:443/openapi/v1/campuses/iaSfflZqCl/stores/MjEzMTc3NDg5?date=' + today,
		method: 'GET',
		headers: {
			'accesstoken': token,
			'babsession': 'meal'
		}
	};

	request.get(options, function (error, response, body) {

		if (!error && response.statusCode == 200) { //request 성공했으면..
			//json 파싱
			var objBody = JSON.parse(response.body);
			var objLength = objBody.store.menus.length;

			//필요한 부분만 추출
			var name = objBody.store.name;
			var menu = new Array();

			for (var i = 0; i < objLength; i++) {
				menu[i] = '\n\n<' + objBody.store.menus[i].name + '>\n' + objBody.store.menus[i].description + '\n';
			}

			var result = name;
			for (var i = 0; i < objLength; i++) {
				result += menu[i];
			}

			console.log(result);

			let message = {
				"message": {
					"text": result
				},
				"keyboard": {
					"type": "buttons",
					"buttons": [
						"창조관",
						"아름관",
						"돌아가기"
					]
				}
			};
			return callback(message);

		} else {
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