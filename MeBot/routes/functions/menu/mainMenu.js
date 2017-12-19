 /**
  * Created by chlee1001 on 2017-10-30.
  */
 module.exports = function () {
 	let message = {
 		"message": {
 			"text": '안녕 나는 미봇이야!!(씨익)(신나)\n\n원하는 기능을 선택해주세요!!'
 		},
 		"keyboard": {
 			"type": 'buttons',
 			"buttons": [
 				'학교 기능',
 				'생활 기능',
 				'편의 기능',
				'처음으로'
 			]
 		}
 	};

 	return message;
 }