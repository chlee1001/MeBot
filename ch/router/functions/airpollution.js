/**
 * Created by chlee1001 on 2017-11-07.
 */

	var request = require('request');
	require('date-utils');
	var dDate = new Date();
	var today = dDate.toFormat('YYYY-MM-DD HH24:MI');


	var options = {
		url: 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnMesureSidoLIst?serviceKey=rC%2BmF3DCdE%2BCfEcFI9xIb%2FIzswvPz1MPV5rx4MoHur2mLbP4HAple5n8itK18TW9PwYMlpTIoArMpyA4DN8oYQ%3D%3D&numOfRows=50&pageSize=50&pageNo=1&startPage=1&sidoName=경기&searchCondition=DAILY',
		method: 'GET',
	};

	request.get(options, function (error, response, body) {
		//request 성공했으면..
		if (!error && response.statusCode == 200) {
			//json 파싱
			var objBody = JSON.parse(response.body);
			//필요한 부분만 추출
			
			console.log(objBody);
			
		}
	});
