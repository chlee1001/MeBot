
module.exports = function (app, fs) {

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

		if (_obj.content == 'a') {
			let message = {
				"message": {
					"text": 'a'
				},
				"keyboard": {
					"type": "buttons",
					"buttons": [
						"a",
						"b",
						"c"
					]
				}
			};

			// 카톡으로 전송
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));

		} else if (_obj.content == 'b') {
			let message = {
				"message": {
					"text": 'b'
				},
				"keyboard": {
					"type": "buttons",
					"buttons": [
						"a",
						"b",
						"c"
					]
				}
			};

			// 카톡으로 전송
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));

		}
		else {
			let message = {
				"message": {
					"text": 'cccc'
				},
				"keyboard": {
					"type": "buttons",
					"buttons": [
						"a",
						"b",
						"c"
					]
				}
			};

			// 카톡으로 전송
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));
		}

	});

	app.post('/friend', (req, res) => {
		const user_key = req.body.user_key;
		console.log(`${user_key}`);

		res.set({
			'content-type': 'application/json'
		}).send(JSON.stringify({
				success: true
			}));
	});

	app.delete ('/chat_room/:user_key', (req, res) => {
		user_key = req.params.user_key;
		console.log(`${user_key}`);

		res.set({
			'content-type': 'application/json'
		}).send(JSON.stringify({
				success: true
			}));
	});
}