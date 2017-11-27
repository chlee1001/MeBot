/**
 * Created by chlee1001 on 2017-11-04.
 */

var request = require("request");
require('date-utils');

const token = '9SuhlhFnlYnT9IVRKIHsLGaC42DbXhA6pAfsyNpvhhJ9OS8l2v';
var dDate = new Date();
var today = dDate.toFormat('YYYY-MM-DD');
//console.log(today);
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
		var days = dDate.toFormat('MM-DD');
		
		//필요한 부분만 추출
		var name = objBody.store.name;
		var menus = objBody.store.menus;
		var menu = new Array();
		var menuCnt = 0;
		
		for (var i = 0; i < objLength; i++) {
			if (menus[i].date.indexOf(days) > -1) {
				menu[i] = '\n<' + menus[i].name + '>\n' + menus[i].description + '\n';
				menuCnt++;
			}
		}

		// 출력
		var result = name;
		for (var i = 0; i < menuCnt; i++) {
			result += menu[i];
		}

		console.log(result);

	} else {
		console.log('error = ' + response.statusCode);
	}
});