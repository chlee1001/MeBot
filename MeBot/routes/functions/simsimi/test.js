var Simsimi = require('simsimi');

module.exports.test = function (content, callback) {
	var simsimi = new Simsimi({
			key: '8e4315ee-9eaf-4822-a5af-d4439660e504'
		});

	simsimi.listen(content, function (err, msg) {
		if (err)
			return console.error(err);
		
		let message = {
				"message": {
					"text": msg
				}
			};
		return callback(message);
	});
}