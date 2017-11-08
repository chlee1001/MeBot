module.exports = function (server) {
	var io = require('socket.io')(server);

	io.on('connection', function (socket) {
		socket.on('message', function (msg) {
			console.log(msg);
			socket.emit('my message', msg);
			if (msg == '날씨') {
				var result = '';
				var ww = require('./routes/weather');
				ww.weather(function (result) {
					console.log(result);
					socket.emit('other message', result);
				})
			}
			else if(msg == '학식'){
				var result = '';
				var meal = require('./routes/meal');
				meal.visionTower(function (result) {
					console.log(result);
					socket.emit('other message', result);

				})
			}
			//socket.broadcast.emit('other message', msg);
		});
	});
	return io;
}