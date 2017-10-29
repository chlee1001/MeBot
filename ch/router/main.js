/**
 * Created by chlee1001 on 2017-10-30.
 */
module.exports = function () {
	let message = {
		"message": {
			"text": '메인화면'
		},
		"keyboard": {
			"type": "buttons",
			"buttons": [
				"시작하기",
				"사용방법",
				"문의하기",
			]
		}
	};
	console.log(message);
	return message;
}