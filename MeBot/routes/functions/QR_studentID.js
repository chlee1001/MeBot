/**
 * Created by chlee1001 on 2017.11.10.
 */

// m+학번+현재시각(YYYYMMDDHH24MISS)
var flag = 0;
module.exports.studentID = function (content, callback) {

	if (flag == 1) {
		let message = {
			"message": {
				"text": '학번 ' + content + '의 QR 코드입니다.\n약 4분 후 자동 페기됩니다.',
				"photo": {
					"url": 'http://kakao.mebot.kro.kr/ch/data/studentIDQR.png',
					"width": 640,
					"height": 640
				}

			},
		};
		//카톡에 메시지 전송
		return callback(message);
	} else {
		QRGenerator(content);
	}
}

function QRGenerator(content) {
	require('date-utils');
	var dDate = new Date();
	var today = dDate.toFormat('YYYYMMDDHH24MISS');
	var studentID = 'content';

	var info = 'm' + studentID + today;
	console.log(info);

	var qr = require('qr-image');
	var fs = require('fs');

	var code = qr.image(info, {
			type: 'png'
		});

	var output = fs.createWriteStream('../../data/studentIDQR.png');
	code.pipe(output);

	flag = 1;
}