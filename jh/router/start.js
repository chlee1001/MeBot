
module.exports = function (app, fs) {
	// ?¤ë³´??

	app.get('/keyboard', function (req, res) {
		fs.readFile(__dirname + "/../data/" + "keyboard.json", 'utf8', function (err, data) {
			console.log(data);
			res.end(data);
		});
	});

	// ë©”ì‹œì§€
	app.post('/message', function (req, res) {
		const _obj = {
			user_key: req.body.user_key,
			type: req.body.type,
			content: req.body.content
		};
		console.log(_obj.content)

		if (_obj.content == 'a') {
			var date = require ('./date/special')();			// ì¹´í†¡?¼ë¡œ ?„ì†¡
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(date));  //special date ¿¬°á 

		} else if (_obj.content == 'b') {
			
		var fun2 = require ('./date/fun2')();			// ì¹´í†¡?¼ë¡œ ?„ì†¡
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(fun2));  //special date ¿¬°á 


		}
		else {
			let message = {
				"message": {
					"text": "picture",
					"photo": {
						"url": "www.naver.com",
						"width": 640,
						"height": 640
					}
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

			// ì¹´í†¡?¼ë¡œ ?„ì†¡
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