/**
 * Created by chlee1001 on 2017-11-04.
 */
module.exports.creator = function (callback) {

	var request = require("request");
	require('date-utils');

	const token = '9SuhlhFnlYnT9IVRKIHsLGaC42DbXhA6pAfsyNpvhhJ9OS8l2v';
	var dDate = new Date();
	var today = dDate.toFormat('YYYY-MM-DD');
	console.log(today);
	var options = {
		url: 'https://bds.bablabs.com:443/openapi/v1/campuses/iaSfflZqCl/stores/MjEzMDU0MDQx?date=' + today,
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
			//필요한 부분만 추출
			var name = objBody.store.name;
			var menuName1 = objBody.store.menus[0].name; // 교직원
			var menuDetail1 = objBody.store.menus[0].description;

			var menuName2 = objBody.store.menus[1].name; // 일품
			var menuDetail2 = objBody.store.menus[1].description;

			var menuName3 = objBody.store.menus[2].name; // 특식
			var menuDetail3 = objBody.store.menus[2].description;

			if (menuName1 == '식당에서 메뉴를 업로드하지 않았습니다.') {
				result = name + '\n' + menuName1;
				console.log(result);

				//카톡으로 메시지를 전송하기 위한 메시지
				let message = {
					"message": {
						"text": result
					},
					"keyboard": {
						"type": "buttons",
						"buttons": [
							"비전타워",
							"아름관",
							"돌아가기"
						]
					}
				};
				//카톡에 메시지 전송
				return callback(message);

			} else {
				result = name + '\n<' + menuName1 + '>\n' + menuDetail1 + '\n\n<' + menuName2 + '>\n' + menuDetail2 + '\n\n<' + menuName3 + '>\n' + menuDetail3;
				console.log(result);

				let message = {
					"message": {
						"text": result
					},
					"keyboard": {
						"type": "buttons",
						"buttons": [
							"비전타워",
							"아름관",
							"돌아가기"
						]
					}
				};
				return callback(message);

			}
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