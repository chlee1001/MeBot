module.exports = function () {
      var now = new Date();
            var wkdays=new Array('Sun','Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur');
	let message = {
		"message": {
			"text":'Today is '+(now.getYear()%100+2000)+" year "+
(now.getMonth()+1)+' month '+now.getDate()+'th '+wkdays[now.getDay()]+'day'
		},
		"keyboard": {
			"type": "buttons",
			"buttons": [
				"a",
				"b","c"
			]
		}
	};
	console.log(message);
	return message;
}