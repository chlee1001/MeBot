/**
 * Created by chlee1001 on 2017.10.30.
 */

const
request = require('request'),
message = require('../service/message'),
Bot = {};

Bot.choseMenu = (req, content, callback) => {

	switch (content) {
	case message.buttons[0]: //교내식단
		callback(null, message.baseType('기능 추가중입니다.', '시간', '번역기', '처음으로'));
		break;
	case message.buttons[1]: //BTL식단
		RedisDAO.getByKey(req.cache, RedisDAO.key_diet_BTL, (err, result) => {
			callback(err, message.baseType(JSON.parse(result)));
		});
		break;
	case message.buttons[2]: //하교 광주
		callback(null, message.messageButtonType(getSongJeongSchedule(), '링크를 클릭하시면 시간표가 보입니다.', 'http://i.imgur.com/71CHVU2.png'));
		break;
	case message.buttons[3]: //하교 목포
		callback(null, message.messageButtonType('하교[목포권 노선 23편(학교버스 5편/도서관 차량 포함), 일로권 1편 운행]', '링크를 클릭하시면 시간표가 보입니다.', 'http://i.imgur.com/QU66mjA.png'));
		break;
	case message.buttons[4]: //기능추가요청
		callback(null, message.messageButtonType('버그 및 추가기능 요청', '링크를 클릭해서 등록해주세요.', 'https://github.com/cheese10yun/Node-Boot/issues'));
		break;
	default:
		callback(null, message.baseType('올바른 입력값이 아닙니다.'));
		break;
	}
};

module.exports = Bot;