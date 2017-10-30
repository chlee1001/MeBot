/**
 * Created by chlee1001 on 2017-10-30.
 */
module.exports = function (content) {
	require('date-utils');
	var dt = new Date();
	var d = dt.toFormat('YYYY-MM-DD HH24:MI:SS');

	let message = {
		"message": {
			"text": d
		},
		"keyboard": {
			"type": "buttons",
			"buttons": [
				"학식",
				"번역기",
				"시간",
				"사진",
				"돌아가기"
			]
		}
	};

	return message;
}