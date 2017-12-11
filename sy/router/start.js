module.exports = function (app, fs) {
	// User Modules
	var main = require('./function/main'); // 처음으로..
	var menu = require('./function/menu'); // 메뉴..
	
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
						"일정 등록",
						"일정 확인",
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

		} if (_obj.content == '일정 등록') {
			
			let message = {
				"message": {
					"text": '원하는 날짜를 YYYY/MM/DD 형식으로 입력하세요.'
				},
				/*"keyboard": {
					"type": "buttons",
					"buttons": [
						"일정 등록",
						"일정 확인",
						"처음으로"
					]
				}*/
			};
			
			var result;
			//var picture = require('./function/calender');
			
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));
			
		} else if (_obj.content == '일정 확인') {
			
			let message = {
				"message": {
					"text": '확인하고 싶으신 일정의 날짜를 선택하세요.'
				},
				"keyboard": {
					"type": "buttons",
					"buttons": [
						"오늘 일정",
						"내일 일정",
						"이번주 일정",
						"이번달 일정",
						"처음으로"
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