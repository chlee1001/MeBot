module.exports = function () {
             var now=new Date();
	let message = {
		"message": {
			"text":now.getSeconds()+""
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