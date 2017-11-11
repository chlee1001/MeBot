/**
 * Created by chlee1001 on 2017-10-30.
 */
module.exports = function () {
	let message = {
		"message": {
			"text": '메뉴얼 설명은 준비중이야.. 그래서 그냥 버튼을 보여줄게'
		},
		"keyboard": {
			"type": "buttons",
			"buttons": [
				"학식",
				"식당추천",
				"날씨",
				"번역기",
				"사진",
				"처음으로"
			]
		}
	};
	console.log(message);
	return message;
}