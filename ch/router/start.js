/**
 * Created by chlee1001 on 2017-10-17.
 */
module.exports = function (app, fs) {
	// User Modules
	var main = require('./functions/main'); // 처음으로..
	var menu = require('./functions/menu'); // 메뉴..

	// 키보드
	app.get('/keyboard', function (req, res) {
		fs.readFile(__dirname + "/../data/" + "keyboard.json", 'utf8', function (err, data) {
			console.log(data);
			res.end(data);
		});
	});

	// 메시지
	app.post('/message', function (req, res) {
		const _obj = {
			user_key: req.body.user_key,
			type: req.body.type,
			content: req.body.content
		};
		console.log(_obj.content)

		if (_obj.content == '시작하기') {
			let message = {
				"message": {
					"text": '안녕 나는 미봇이야'
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

			// 카톡으로 전송
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));

		} else if (_obj.content == '사용방법') {
			let message = {
				"message": {
					"text": "나는 미봇.. 도움말은 준비중",
					"photo": {
						"url": 'http://kakao.mebot.kro.kr/MeBot/img/tmp.jpg',
						"width": 640,
						"height": 640
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
			// 카톡으로 전송
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));
		} else if (_obj.content == '문의하기') {
			var qna = require('./qna')();

			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(qna));

		} else if (_obj.content == "학식") {
			let message = {
				"message": {
					"text": '식당을 골라주세요! (컴온)'
				},
				"keyboard": {
					"type": "buttons",
					"buttons": [
						"비전타워",
						"창조관",
						"아름관",
						"돌아가기"
					]
				}
			};
			// 카톡으로 전송
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));

		} else if (_obj.content == "비전타워") {
			var result = '';
			var meal = require('./functions/meal/school/mealVisionTower');
			meal.visionTower(function (result) {
				console.log(result);

				res.set({
					'content-type': 'application/json'
				}).send(JSON.stringify(result));
			})

		} else if (_obj.content == "창조관") {
			var result = '';
			var meal = require('./functions/meal/school/mealCreator');
			meal.creator(function (result) {
				console.log(result);

				res.set({
					'content-type': 'application/json'
				}).send(JSON.stringify(result));
			})

		} else if (_obj.content == "아름관") {
			var result = '';
			var meal = require('./functions/meal/school/mealBeautiful');
			meal.beautiful(function (result) {
				console.log(result);

				res.set({
					'content-type': 'application/json'
				}).send(JSON.stringify(result));
			})

		} else if (_obj.content == '식당추천' || _obj.content == '더 추천받기') {
			var result = '';
			var meal = require('./functions/meal/restaurantRandom');
			meal.restaurant(function (result) {
				console.log(result);

				res.set({
					'content-type': 'application/json'
				}).send(JSON.stringify(result));
			})

		} else if (_obj.content == '식당 리스트') {
			let message = {
				"message": {
					"text": "가천대 주변의 100개의 식당 리스트",
					"message_button": {
						"label": '여기야',
						"url": 'http://kakao.mebot.kro.kr:3000/list'
					}
				},
				"keyboard": {
					"type": "buttons",
					"buttons": [
						'더 추천받기',
						'식당 리스트',
						'돌아가기'
					]
				}
			};
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));

		} else if (_obj.content == "날씨") {
			var result = '';
			var ww = require('./functions/weather');
			ww.weather(function (result) {
				console.log(result);

				res.set({
					'content-type': 'application/json'
				}).send(JSON.stringify(result));
			})

		} else if (_obj.content == '돌아가기' || _obj.content == '/취소') {

			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(menu()));

		} else if (_obj.content == '처음으로') {

			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(main()));

		} else if (_obj.content == '번역기') {
			let message = {
				"message": {
					"text": "안녕 나는 미봇번역기야! 사용방법 !말, (돌아갈려면 '/취소')"
				}
			};
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));

		} else if (_obj.content.indexOf('!') > -1) {
			var result;
			var content = _obj.content.replace('!', '');
			var translate = require('./functions/translate');
			translate.papago(content, function (result) {
				console.log(result);

				res.set({
					'content-type': 'application/json'
				}).send(JSON.stringify(result));
			})
		}
	});

	app.post('/friend', (req, res) => {
		const user_key = req.body.user_key;
		console.log(`${user_key}님이 채팅방에 참가했습니다.`);

		res.set({
			'content-type': 'application/json'
		}).send(JSON.stringify({
				success: true
			}));
	});

	app.delete ('/chat_room/:user_key', (req, res) => {
		user_key = req.params.user_key;
		console.log(`${user_key}님이 채팅방에서 나갔습니다.`);

		res.set({
			'content-type': 'application/json'
		}).send(JSON.stringify({
				success: true
			}));
	});
}