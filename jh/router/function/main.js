module.exports = function () {
	let message = {
		"message": {
			"text": '처음으로'
		},
		"keyboard": {
			"type": "buttons",
			"buttons": [
				"날짜",
				"바로가기"

			]
		}
	};
	console.log(message);
	return message;
}