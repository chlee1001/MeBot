module.exports = function () {
      
	let message = {
		"message": {
			"text": 'success1'
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