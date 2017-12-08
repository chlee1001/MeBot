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
						"무당이 시간표",
						"처음으로"
					]
				}
			};

			// 카톡으로 전송
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));

		} else if (_obj.content == '처음으로') {

			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(main()));

		} else if (_obj.content == '사진분석') {
			
			let message = {
				"message": {
					"text": '방법을 모르신다면 <<사진분석 예시>> 버튼을 눌러주세요!\n\n text로 변환하고 싶은 사진을 보내주세요'
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
			
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));
			
		} else if (_obj.content.indexOf('http') > -1) {
			
			var result;
			var content = _obj.content;
			var picture = require('./picture');
			
			picture.cloud(content, function (result) {
				console.log(result);

				res.set({
					'content-type': 'application/json'
				}).send(JSON.stringify(result));
			})
			
		} else if (_obj.content == '사진분석 예시') {
			
			let message = {
				"message": {
					"text": '사진분석에서는 원하는 사진을 전송하면 text로 추출받을 수 있습니다.'
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
			
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));
			
		} else if (_obj.content == '무당이 시간표') {
			let message = {
				"message": {
					"photo": {
						"url": 'http://kakao.mebot.kro.kr/sb/무당이.jpg',
						"width" : 640,
						"height" : 1200
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
			
		res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));
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