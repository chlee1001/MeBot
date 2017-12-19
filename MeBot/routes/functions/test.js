/**
 * Created by chlee1001 on 2017.12.15.
 */

module.exports.newW = function (Input, callback) {
	var user_key = Input.user_key;
	var user_content = Input.content;
	
	result=user_key+user_content;
	
	
	
	let message = {
					"message": {
						"text": result + '\n\n테스트 기능입니다. \n메인메뉴로 돌아갑니다.'
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
				
				return callback(message);
}
