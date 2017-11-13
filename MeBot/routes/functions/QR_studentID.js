/**
 * Created by chlee1001 on 2017.11.10.
 */

// m+학번+현재시각(YYYYMMDDHH24MISS)
var fs = require("fs");
var schedule = require('node-schedule');
require('date-utils');

var flag = 0;

module.exports.studentID = function (content, callback) {
	QRGenerator(content);
	
	if (flag == 1) {
		let message = {
			"message": {
				"text": '학번 ' + content + '의 QR 코드입니다.\n약 4분 후 자동 만료됩니다.',
				"photo": {
					"url": 'http://kakao.mebot.kro.kr/MeBot/public/data/studentID.png',
					"width": 640,
					"height": 640
				}

			},
		};
		//카톡에 메시지 전송
		return callback(message);
	} else {
		
		let message = {
			"message": {
				"text": 'QR code 생성에 에러 발생. 다시 입력해주시기 바랍니다.'
			},
		};
		//카톡에 메시지 전송
		return callback(message);
	}
}

function QRGenerator(content) {
	var dDate = new Date();
	var today = dDate.toFormat('YYYYMMDDHH24MISS');
	var studentID = content;

	var info = 'm' + studentID + today;
	console.log(info);

	var QRCode = require('qrcode');

	QRCode.toFile('public/data/studentID.png', info, {
		color: {
			dark: '#000000', // Blue dots
			light: '#ffffff' // Transparent background
		}
	}, function (err) {
		if (err)
			throw err;
		//console.log('done ');
	})

	flag = 1;
}