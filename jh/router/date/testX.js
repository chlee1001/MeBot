
module.exports = function () {
             var now=new Date();
var month=now.getMonth()+1;
var day=now.getDate();
var jsontext = '{"info":["http://krdic.naver.com/search.nhn?query="]}';
var middle='%EC%9B%94%20';
var last='%EC%9D%BC&kind=all';
var contact = JSON.parse(jsontext);
contact.info[0]+=month+middle+day+last;
	let message = {
		"message": {
			"text":contact.info[0]
		},
		"keyboard": {
			"type": "buttons",
			"buttons": [
				"날짜",
				"바로가기"	
]
		}
	};
	console.log(message);
	return message;
}