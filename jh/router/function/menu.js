module.exports = function () {
	let message = {
		"message": {
			"text": '메뉴'
		},
		"keyboard": {
			"type": "buttons",
			"buttons": [
				"날짜",
				"바로가기"			]
		}
	};
	console.log(message);
	return message;
}