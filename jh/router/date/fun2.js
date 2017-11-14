module.exports = function () {
	let message = {
		"message": {
			"text": 'success2'
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