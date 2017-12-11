module.exports = function () {
	let message = {
		"message": {
			"text": '메뉴'
		},
		"keyboard": {
			"type": "buttons",
			"buttons": [
				"학식",
				"식당추천",
				"날씨",
				"번역기",
				"사진",
				"일정",
				"처음으로"
			]
		}
	};
	console.log(message);
	return message;
}