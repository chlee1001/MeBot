/**
 * Created by chlee1001 on 2017.10.17.
 */
module.exports = function (app, fs) {
	// User Modules
	var main = require('./functions/menu/main'); // 처음으로..
	var menu = require('./functions/menu/mainMenu'); // 메인 메뉴..

	// 키보드
	app.get('/keyboard', function (req, res) {
		fs.readFile(__dirname + "/../public/data/" + "keyboard.json", 'utf8', function (err, data) {
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

		if (_obj.content == '시작하기') { // 시작하기
			var result = '';
			var gostart = require('./functions/specialDay/goStart');
			gostart.start(function (result) {
				result += '\n안녕 나는 미봇이야!!(씨익)(신나)\n\n내가 처음이면 초기화면으로 돌아가서 사용방법을 눌러봐!!(제발)';

				let message = {
					"message": {
						"text": result
					},
					"keyboard": {
						"type": "buttons",
						"buttons": [
							'학교 기능',
							'생활 기능',
							'편의 기능',
							'처음으로'
						]
					}
				};

				res.set({
					'content-type': 'application/json'
				}).send(JSON.stringify(message));
			});

		} else if (_obj.content == '사용방법') {
			let message = {
				"message": {
					"text": "나는 미봇.. 도움말은 준비중",
					"photo": {
						"url": 'http://kakao.mebot.kro.kr/MeBot/public/images/tmp.jpg',
						"width": 640,
						"height": 640
					}
				},

				"keyboard": {
					"type": "buttons",
					"buttons": [
						"시작하기",
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

		}

		/* 학교 기능 */
		else if (_obj.content == '학교 기능') { // 학교 기능
			var schoolMenu = require('./functions/menu/schoolMenu')();

			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(schoolMenu));

		} /* 학교 기능 - 학식 */ else if (_obj.content == '학식') { // 학교 기능 (1) - 학식
			let message = {
				"message": {
					"text": '식당을 골라주세요!! (컴온)'
				},
				"keyboard": {
					"type": "buttons",
					"buttons": [
						'비전타워',
						'창조관',
						'아름관',
						'돌아가기'
					]
				}
			};
			// 카톡으로 전송
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));

		} else if (_obj.content == '비전타워') { // 학교 기능 (1) - 학식_비전타워
			var result = '';
			var meal = require('./functions/meal/school/mealVisionTower');
			meal.visionTower(function (result) {
				console.log(result);

				res.set({
					'content-type': 'application/json'
				}).send(JSON.stringify(result));
			})

		} else if (_obj.content == '창조관') { // 학교 기능 (1) - 학식_창조관
			var result = '';
			var meal = require('./functions/meal/school/mealCreator');
			meal.creator(function (result) {
				console.log(result);

				res.set({
					'content-type': 'application/json'
				}).send(JSON.stringify(result));
			})

		} else if (_obj.content == '아름관') { // 학교 기능 (1) - 학식_아름관
			var result = '';
			var meal = require('./functions/meal/school/mealBeautiful');
			meal.beautiful(function (result) {
				console.log(result);

				res.set({
					'content-type': 'application/json'
				}).send(JSON.stringify(result));
			})
		} /* 학교 기능 - 학번 QR코드 */ else if (_obj.content == '학번 QR코드') { // 학교 기능 (2) - QR코드 (1)
			let message = {
				"message": {
					"text": "학번을 찾고 싶으면 '학번 20XXXXXXX' 라고 입력해주세요!!"
				}
			};
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));

		} else if (_obj.content.indexOf('학번 20') > -1) { // 학교 기능 (2) - QR코드 (2)
			var result;
			var content = _obj.content.replace('학번 ', '');
			var qr = require('./functions/QR_studentID');
			qr.studentID(content, function (result) {
				console.log(result);
				res.set({
					'content-type': 'application/json'
				}).send(JSON.stringify(result));
			})

		} /* 학교 기능 - 무당이 시간표 */ else if (_obj.content == '무당이 시간표') { // 학교 기능 (3) - 무당이 시간표
			let message = {
				"message": {
					"photo": {
						"url": 'http://kakao.mebot.kro.kr/MeBot/public/images/무당이시간표.png',
						"width": 640,
						"height": 1007
					}
				},
				"keyboard": {
					"type": "buttons",
					"buttons": [
						'학식',
						'학번 QR코드',
						'무당이 시간표',
						'돌아가기'
					]
				}
			};

			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));

		}

		/* 생활 기능 */
		else if (_obj.content == '생활 기능') { // 생활 기능
			var lifeMenu = require('./functions/menu/lifeMenu')();

			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(lifeMenu));

		} /* 생활 기능 - 식당 */ else if (_obj.content == '식당 추천' || _obj.content == '더 추천받기') { // 생활 기능 (1) - 식당 (1)
			var result = '';
			var meal = require('./functions/meal/restaurantRandom');
			meal.restaurant(function (result) {
				console.log(result);

				res.set({
					'content-type': 'application/json'
				}).send(JSON.stringify(result));
			})

		} else if (_obj.content == '식당 리스트') { // 생활 기능 (1) - 식당 (2)
			let message = {
				"message": {
					"text": "가천대 주변의 100개의 식당 리스트",
					"message_button": {
						"label": '여기야',
						"url": 'http://kakao.mebot.kro.kr:9000/list'
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

		} /* 생활 기능 - 날씨 */ else if (_obj.content == '날씨 정보' || _obj.content == '현재 날씨') { // 생활 기능 (2) - 날씨 (1)
			var result = '';
			var ww = require('./functions/weather/currentWeather');
			ww.weather(function (result) {
				console.log(result);

				res.set({
					'content-type': 'application/json'
				}).send(JSON.stringify(result));
			})

		} else if (_obj.content == '오늘 날씨') { // 생활 기능 (2) - 날씨 (2)
			var result = '';
			var ww = require('./functions/weather/todayWeather');
			ww.todayWeather(function (result) {
				console.log(result);

				res.set({
					'content-type': 'application/json'
				}).send(JSON.stringify(result));
			})

		} else if (_obj.content == '내일 날씨') { // 생활 기능 (2) - 날씨 (3)
			var result = '';
			var ww = require('./functions/weather/tomorrowWeather');
			ww.tomorrowWeather(function (result) {
				console.log(result);

				res.set({
					'content-type': 'application/json'
				}).send(JSON.stringify(result));
			})

		}

		/* 편의 기능 */
		else if (_obj.content == '편의 기능') { // 편의 기능
			var convMenu = require('./functions/menu/convMenu')();

			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(convMenu));

		} /* 편의 기능 - 번역기 */ else if (_obj.content == '번역기') { // 편의 기능 (1) - 번역기 (1)
			let message = {
				"message": {
					"text": '번역하고 싶은 언어를 골라주세요!!'
				},
				"keyboard": {
					"type": "buttons",
					"buttons": [
						"한글 to 영어",
						"영어 to 한글",
						'돌아가기'
					]
				}
			};
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));

		} else if (_obj.content == '한글 to 영어') { // 편의 기능 (1) - 번역기 (2) - 한영
			tran = _obj.content;
			let message = {
				"message": {
					"text": "한영 번역기입니다!!\n사용방법은 '!입력'\n돌아가기 방법은 '?취소'라고 입력하세요"
				}
			};
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));

		} else if (_obj.content == '영어 to 한글') { // 편의 기능 (1) - 번역기 (3) - 영한
			tran = _obj.content;
			let message = {
				"message": {
					"text": "영한 번역기입니다!!\n사용방법은 '!입력'\n돌아가기 방법은 '?취소'라고 입력하세요"
				}
			};
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));

		} else if (_obj.content.indexOf('!') > -1) { // 편의 기능 (1) - 번역기 (4)
			var result;
			var content = _obj.content.replace('!', '');
			if (tran == '한글 to 영어') {
				var translate = require('./functions/translateKE');
				translate.papago(content, function (result) {
					console.log(result);

					res.set({
						'content-type': 'application/json'
					}).send(JSON.stringify(result));
				})
			} else if (tran == '영어 to 한글') {
				var translate = require('./functions/translateEK');
				translate.papago(content, function (result) {
					console.log(result);

					res.set({
						'content-type': 'application/json'
					}).send(JSON.stringify(result));
				})
			}

		} else if (_obj.content == '?취소') { // 편의 기능 (1) - 번역기 (5)
			let message = {
				"message": {
					"text": '취소됐습니다.\n번역하고 싶은 언어를 골라주세요!!'
				},
				"keyboard": {
					"type": "buttons",
					"buttons": [
						"한글 to 영어",
						"영어 to 한글",
						'돌아가기'
					]
				}
			};
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));

		} /* 편의 기능 - 사진 분석 */ else if (_obj.content == '사진 분석') { // 편의 기능 (2) - 사진 분석
			let message = {
				"message": {
					"text": '방법을 모르신다면 <사진 분석 예시> 버튼을 눌러주세요!!\n\ntext로 변환하고 싶은 사진을 보내주세요!!'
				},
				"keyboard": {
					"type": "buttons",
					"buttons": [
						"사진 분석 예시",
						"주의사항",
						"돌아가기"
					]
				}
			};

			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));

		} else if (_obj.content == '사진 분석 예시') { // 편의 기능 (2) - 사진 분석 예시

			let message = {
				"message": {
					"photo": {
						"url": 'http://kakao.mebot.kro.kr/MeBot/public/images/사진변환.jpg',
						"width": 640,
						"height": 1137
					}
				},
				"keyboard": {
					"type": "buttons",
					"buttons": [
						"사진 분석",
						"주의사항",
						'돌아가기'
					]
				}
			};

			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));

		} else if (_obj.content == '주의사항') { // 편의 기능 (2) - 사진 분석 주의사항

			let message = {
				"message": {
					"photo": {
						"url": 'http://kakao.mebot.kro.kr/MeBot/public/images/주의사항.jpg',
						"width": 640,
						"height": 1137
					}
				},
				"keyboard": {
					"type": "buttons",
					"buttons": [
						"사진 분석",
						"사진 분석 예시",
						'돌아가기'
					]
				}
			};

			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(message));

		} else if (_obj.content.indexOf('http') > -1) { // 편의 기능 (2) - 사진_Text Detect
			var result;
			var content = _obj.content;
			var picture = require('./functions/cloudVision/picture');

			picture.cloud(content, function (result) {
				console.log(result);

				res.set({
					'content-type': 'application/json'
				}).send(JSON.stringify(result));
			})

		}

		/* 기타 기능 */
		else if (_obj.content == '메뉴얼' || _obj.content == '메뉴' || _obj.content == '돌아가기') {
			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(menu()));

		} else if (_obj.content == '처음으로') {

			res.set({
				'content-type': 'application/json'
			}).send(JSON.stringify(main()));

		} else {
			var result;
			var content = _obj;
			var test = require('./functions/test');

			test.newW(content, function (result) {
				console.log(result);

				res.set({
					'content-type': 'application/json'
				}).send(JSON.stringify(result));
			})

			/*
			var result;
			var content = _obj.content;
			var simsimi = require('./functions/simsimi/test');
			simsimi.test(content, function (result) {
			console.log(result);

			// 카톡으로 전송
			res.set({
			'content-type': 'application/json'
			}).send(JSON.stringify(result));
			})
			 */
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