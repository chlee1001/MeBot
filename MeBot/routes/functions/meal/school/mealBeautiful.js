/**
 * Created by chlee1001 on 2017-11-04.
 */
module.exports.beautiful = function (callback) {

	var request = require("request");
	require('date-utils');

	const token = '9SuhlhFnlYnT9IVRKIHsLGaC42DbXhA6pAfsyNpvhhJ9OS8l2v';
	var dDate = new Date();
	var today = dDate.toFormat('YYYY-MM-DD');
	console.log(today);
	var options = {
		url: 'https://bds.bablabs.com:443/openapi/v1/campuses/iaSfflZqCl/stores/MjEzMTE1NzYx?date=' + today,
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

			/* objBody.store.menus[0].name : 교직원 1
			objBody.store.menus[0].description : 교직원 1 메뉴
			objBody.store.menus[1].name : 교직원 2
			objBody.store.menus[1].description : 교직원 2 메뉴
			objBody.store.menus[2].name : 특식특식
			objBody.store.menus[2].description : 특식 메뉴 */

			//필요한 부분만 추출
			var name = objBody.store.name; // 식당 이름
			var menu = new Array();

			for (var i = 0; i < objLength; i++) {
				menu[i] = '\n\n<' + objBody.store.menus[i].name + '>\n' + objBody.store.menus[i].description;
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
						"비전타워",
						"창조관",
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