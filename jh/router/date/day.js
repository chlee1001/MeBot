module.exports = function () {
             var now=new Date();
var year=now.getFullYear();
var month=now.getMonth()+1;
var day=now.getDate();
var week = now.getDay();
var arrayDay = Array('일','월','화','수','목','금','토');
var day='오늘은 '+year+" 년 "+month+' 월 '+day+' 일 '+arrayDay[week]+"요일";
	let message = {
		"message": {
			"text":day
		},
		"keyboard": {
			"type": "buttons",
			"buttons": [
				"오늘에 대해 알아보기",
				"넘기기"
                                                     
			]
		}
	};
	console.log(message);
	return message;
}