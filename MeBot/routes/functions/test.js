//module.exports.papago = function (content, callback) {
//네이버 TTS 용 패키지 웹 요청 용
var request = require('request');
var xml2js = require('xml2js');
require('date-utils');
var dDate = new Date();
var MM = dDate.toFormat('MM');
var DD = dDate.toFormat('DD');
var parser = new xml2js.Parser({
		explicitArray: false
	});
var querystring = require('querystring');
//카카오톡 파싱용 패키지
var bodyParser = require('body-parser');
var client_id = 'jGddVefbv4vkbp6ZdIGv';
var client_secret = 'zQsi6SaVMy';

var options = {
	headers: {
		'X-Naver-Client-Id': client_id,
		'X-Naver-Client-Secret': client_secret
	},
	method: 'get',
	encoding: "utf-8",
	url: 'https://openapi.naver.com/v1/search/encyc.xml',
	qs: {
		query: '12월25일',
		display: 100,
		start: 1,
		sort: 'sim'
	}
}
request(options, function (err, res, html) {
	parser.parseString(html, function (err, result) {
		// 랜덤 넘버 생성
		var generateRandom = function (min, max) {
			var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
			return ranNum;
		}

		var i = generateRandom(0, 100); // 랜덤 넘버


		console.log(result.rss.channel.item[i]);
	});
});
//}