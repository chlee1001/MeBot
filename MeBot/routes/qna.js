/**
 * Created by chlee1001 on 2017-10-31.
 */
module.exports = function (content) {
	let message = {
		"message": {
			"text": '문의사항은 깃허브 Issues에 남겨주시거나 1대1 채팅으로 보내주세요!! (하트뿅)(하트뿅)',
			"message_button": {
				"label": '여기야',
				"url": 'https://github.com/chlee1001/MeBot/issues'
			}
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

	return message;
}