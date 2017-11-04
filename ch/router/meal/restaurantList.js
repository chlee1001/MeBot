/**
 * Created by chlee1001 on 2017-11-01.
 */

var officegen = require('officegen');
var xlsx = officegen('xlsx');
var fs = require('fs');

//네이버 TTS 용 패키지 웹 요청 용
var request = require('request');

//카카오톡 파싱용 패키지
var bodyParser = require('body-parser');
var client_id = 'jGddVefbv4vkbp6ZdIGv'; //'네이버 API ID';
var client_secret = 'zQsi6SaVMy'; //'네이버 API 암호키';
var api_url = 'https://openapi.naver.com/v1/search/local.json';

var options = {
	url: api_url,
	qs: {
		'query': '가천대맛집',
		'display': 100,
		'start': 1,
		'sort': 'random'
	},
	headers: {
		'X-Naver-Client-Id': client_id,
		'X-Naver-Client-Secret': client_secret
	}
};

request.get(options, function (error, response, body) {
	if (!error && response.statusCode == 200) {
		//json 파싱
		var objBody = JSON.parse(response.body);

		for (var i = 0; i < 100; i++) {
			var title = objBody.items[i].title;
			var link = objBody.items[i].link;
			var category = objBody.items[i].category;
			var roadAddress = objBody.items[i].roadAddress;

			var list = i + 1 + ' ' + title + category + roadAddress + link;
			exportToExcel(list);

		}

		//카톡으로 메시지를 전송하기 위한 메시지


	} else {
		console.log('error = ' + response.statusCode);

	}
});

function exportToExcel(list) {
	var sheet = xlsx.makeNewSheet();
	sheet.name = "list";
	var i = 0;
	var value = list;
	console.log(value);
	sheet.setCell('a' + i + 1, value);

	var strm = fs.createWriteStream('../../data/test.xlsx');
	xlsx.generate(strm);

}