module.exports = function () {
	let message = {
		"message": {
			"text":'원하는 사이트를 골라주세요'
		},
		"keyboard": {
			"type": "buttons",
			"buttons": [
				"학교 홈페이지",
				"윈드 가천",
                                                       "학과 카페"
		]
		}
	};
	console.log(message);
	return message;
}				
  