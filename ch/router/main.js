/**
 * Created by chlee1001 on 2017-10-17.
 */
module.exports = function(app, fs)
{
	//네이버 TTS 용 패키지 웹 요청 용
	var request = require('request');

	//카카오톡 파싱용 패키지
	var bodyParser = require('body-parser');
	var client_id = 'jGddVefbv4vkbp6ZdIGv';//'당신의 네이버 API ID';
	var client_secret = 'zQsi6SaVMy';//'당신의 네이버 API 암호키';
	var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
	var flag =0; //번역기가 처음인지 아닌지
	
	// 키보드
	app.get('/keyboard', function(req, res){
        fs.readFile( __dirname + "/../data/" + "keyboard1.json", 'utf8', function (err, data) {
           console.log( data );
           res.end( data );
        });
    });
	// 메시지
	app.post('/message', function(req, res){
		const _obj = {
        user_key: req.body.user_key,
        type: req.body.type,
        content: req.body.content
		};
		console.log(_obj.content)
		
		if(_obj.content == '시작하기')
		{
			//"안녕"이라고 메시지 보내고
			let massage = {
				"message": {
					"text": '안녕'
				},
				"keyboard": {
					"type": "buttons",
					"buttons": [
						"번역기",
						"취소하기"
					]
				}
			};
			
			// 카톡으로 전송
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(massage));
		}
		else if(_obj.content == '도움말')
		{
			let massage = {
				"message": {
					"text": "나는 미봇.. 도움말은 준비중"
				},
				"photo": {
					"url": "http://52.78.69.152/img_m.jpg",
					"width": 640,
					"height": 640
				},
				"keyboard": {
					"type": "buttons",
					"buttons": [
						"시작하기",
						"도움말"
					]
				}
			};
			// 카톡으로 전송
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(massage));
		}
		else if(_obj.content == '취소하기')
		{
			flag = 0;
			let massage = {
				"message": {
					"text": "취소됨!"
			},
			"keyboard": {
				"type": "buttons",
				"buttons": [
					"시작하기",
					"도움말"
				]
			}
			};
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(massage));
		}
		else
		{
			if(flag == 0){
			flag =1;
			let massage = {
				"message": {
					"text": "안녕 나는 미봇번역기야!"
				}
			};
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(massage));
			}
			else{
				var options = {
					url: api_url,
					//한국어(source : ko) > 영어 (target : en ), 카톡에서 받은 메시지(text)
					form: {'source':'ko', 'target':'en', 'text':req.body.content},
					headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
				};
			//네이버로 번역하기 위해 전송(post)
			request.post(options, function (error, response, body) {
			//번역이 성공하였다면.
			if (!error && response.statusCode == 200) {
				//json 파싱
				var objBody = JSON.parse(response.body);
				//번역된 메시지
				console.log(objBody.message.result.translatedText);

				//카톡으로 번역된 메시지를 전송하기 위한 메시지
				let massage = {
					"message": {
						"text": objBody.message.result.translatedText
					},
				};
				//카톡에 메시지 전송
				res.set({
					'content-type': 'application/json'
				}).send(JSON.stringify(massage));
	
			} else {
					//네이버에서 메시지 에러 발생
					res.status(response.statusCode).end();
					console.log('error = ' + response.statusCode);

					let massage = {
						"message": {
							"text": response.statusCode
						},
					};
					//카톡에 메시지 전송 에러 메시지
					res.set({
						'content-type': 'application/json'
					}).send(JSON.stringify(massage));

				}
				});
			}
		}

	});	
	
	app.post('/friend', (req, res) => {
    const user_key = req.body.user_key;
    console.log(`${user_key}님이 채팅방에 참가했습니다.`);
    
    res.set({
        'content-type': 'application/json'
    }).send(JSON.stringify({success:true}));
	});
	
	app.delete('/chat_room/:user_key', (req, res) => {
    user_key = req.params.user_key;
    console.log(`${user_key}님이 쳇팅방에서 나갔습니다.`);

    res.set({
        'content-type': 'application/json'
    }).send(JSON.stringify({success:true}));
	});

}