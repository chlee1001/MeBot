module.exports = function (app, fs) {
	// User Modules
	var main = require('./main'); // 처음으로..
	var menu = require('./menu'); // 메뉴..
	
	// 키보드
	app.get('/keyboard', function (req, res) {
		fs.readFile(__dirname + "/./data/" + "keyboard.json", 'utf8', function (err, data) {
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
						"사진분석",
						"사진분석 예시",
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
		} else if (_obj.content == '돌아가기' || _obj.content == '/취소') {

			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(menu()));

		} else if (_obj.content == '처음으로') {

			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(main()));

		} else if (_obj.content == '사진분석') {
			
			let message = {
				"message": {
					"text": '방법을 모르신다면 >사진분석 예시< 버튼을 눌러주세요!'
				},
				"keyboard": {
					"type": "buttons",
					"buttons": [
						"사진분석",
						"사진분석 예시",
						"처음으로"
					]
				}
			};
			
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