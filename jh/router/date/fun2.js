module.exports = function () {
             var now=new Date();
	let message = {
		"message": {
			"text":"now "+now.getHours()+" : "+now.getMinutes()+ " " +now.getSeconds()+' s'
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