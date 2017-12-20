module.exports = function (app, fs) {
	// User Modules
	var main = require('./function/main'); // 筌ｌ꼷???곗쨮..
	var menu = require('./function/menu'); // 筌롫뗀??.
	var jsontext = '{"info":["http://www.gachon.ac.kr/index.html","http://wind.gachon.ac.kr/index.do","http://cafe.naver.com/gachon2010"]}';
           var contact = JSON.parse(jsontext);
	// ??삳궖??
	app.get('/keyboard', function (req, res) {
		fs.readFile(__dirname + "/../data/" + "keyboard.json", 'utf8', function (err, data) {
			console.log(data);
			res.end(data);
		});
	});

	// 筌롫뗄?놅쭪?
	app.post('/message', function (req, res) {
		const _obj = {
			user_key: req.body.user_key,
			type: req.body.type,
			content: req.body.content
		};
		console.log(_obj.content)

		if (_obj.content == "날짜") {   //?醫롮?甕곌쑵??
			var date=require('./date/dateinfo')();      //?醫롮? 揶쎛?紐꾩궎疫?
                                  
			// 燁삳똾???곗쨮 ?袁⑸꽊
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(date));


		}
		 else if (_obj.content == "바로가기") {
		 var move=require('./date/go')();

			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(move));

		}
		 else if (_obj.content == '학교 홈페이지') {
	let message = {
				"message": {
					"text": contact.info[0]
				},
				"keyboard": {
					"type": "buttons",
					"buttons": [
					"날짜",
					      	"바로가기"
					
					]
				}
			};	
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));	

		}
 else if (_obj.content == '윈드 가천') {
	let message = {
				"message": {
					"text": contact.info[1]
				},
				"keyboard": {
					"type": "buttons",
					"buttons": [
					"날짜",
					      	"바로가기"
					
					]
				}
			};	
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));	

		}
 else if (_obj.content == '학과 카페') {
	let message = {
				"message": {
					"text": contact.info[2]
				},
				"keyboard": {
					"type": "buttons",
					"buttons": [
						"날짜",
					      	"바로가기"
					
					]
				}
			};	
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));	
		}	
		 else if (_obj.content == '넘기기') {
					let message = {
				"message": {
					"text": '돌아가기'
				},
				"keyboard": {
					"type": "buttons",
					"buttons": [
						"날짜",
					      	"바로가기"
					
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