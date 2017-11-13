module.exports = function () {
	let message = {
		"message": {
			"text": '처음으로'
		},
		"keyboard": {
			"type": "buttons",
			"buttons": [
				"시작하기",
				"사용방법",
				"문의하기"
			]
		}
	};
	console.log(message);
	return message;
}