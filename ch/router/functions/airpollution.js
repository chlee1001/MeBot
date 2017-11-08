/**
 * Created by chlee1001 on 2017-11-07.
 */
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var request = require('request');
require('date-utils');
var dDate = new Date();
var today = dDate.toFormat('YYYY-MM-DD HH24:MI');

var token = 'rC%2BmF3DCdE%2BCfEcFI9xIb%2FIzswvPz1MPV5rx4MoHur2mLbP4HAple5n8itK18TW9PwYMlpTIoArMpyA4DN8oYQ%3D%3D';

var options = {
	url: 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnMesureSidoLIst?serviceKey=rC%2BmF3DCdE%2BCfEcFI9xIb%2FIzswvPz1MPV5rx4MoHur2mLbP4HAple5n8itK18TW9PwYMlpTIoArMpyA4DN8oYQ%3D%3D&numOfRows=50&pageSize=10&pageNo=1&startPage=1&sidoName=%EA%B2%BD%EA%B8%B0&searchCondition=DAILY'
};

request.get(options, function (error, response, body) {
	//request 성공했으면..
	if (!error && response.statusCode == 200) {
		//console.log(body);
		var xml = body;
		parser.parseString(xml, function (err, result) {
			//console.log(result);
			var strBody = JSON.stringify(result);
			console.log(result);

			//var objBody = JSON.parse(strBody);
			//result = (result.response.body[0].items[0].item[11]);
			//console.log(result);
		});

	}
});