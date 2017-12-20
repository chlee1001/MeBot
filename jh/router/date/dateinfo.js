module.exports = function () {

var request = require("request");
             var now=new Date();
var year=now.getFullYear();
var week = now.getDay();
var arrayDay = Array('일','월','화','수','목','금','토');
var month=now.getMonth()+1;
var day=now.getDate();
var middle='%EC%9B%94%20';
var last='%EC%9D%BC&kind=all';
 var url="http://krdic.naver.com/search.nhn?query=";
url+=month+middle+day+last;
var fs = require('fs');
request(url, function(error, response, body) {  
  if (error) throw error;
fs.writeFile('./router/date/date.txt', body, function(err) {
  if(err) throw err;
}); 
  });  //store at file
var text = fs.readFileSync( './router/date/date.txt' , 'UTF-8') ;
console.log(text);
//read from file
var position=text.search('<ul class="lst3">');  //문장 시작
text=text.substring(position);
position= text.search('<div>');
var last_position=text.search('</div>');
text=text.substring(position,last_position);
position = text.search('>');
text=text.substring(position+1,last_position);
position = text.search('>');
text=text.substring(position+1,last_position);
last_position=text.search('<sup>');
text=text.substring(0,last_position);
if(text.length>10){
text="";
}
else{
text=text+"의 날입니다.";
}
var day='오늘은 '+year+" 년 "+month+' 월 '+day+' 일 '+arrayDay[week]+"요일";
let message = {
		"message": {
			"text": day+" "+text
		},
		"keyboard": {
			"type": "buttons",
			"buttons": [
				"날짜",
				"바로가기"	
]
		}
	};
 return message;
}