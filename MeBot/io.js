/**
 * Created by chlee1001 on 2017.11.08.
 */
module.exports = function (server) {
	var io = require('socket.io')(server);

	io.on('connection', function (socket) {

		socket.on('message', function (msg) {
			console.log(msg);
			
			socket.emit('my message', msg);

			if (msg == '안녕') {
				var message = '안녕 나는 미봇이야\n학식이랑 날씨라고 입력해봐';
				socket.emit('other message', message);

			} else if (msg == '날씨') {
				var result = '';
				var ww = require('./routes/homepage/weather');
				ww.weather(function (result) {
					console.log(result);
					socket.emit('other message', result);
				})
			} else if (msg == '학식') {
				var result = '';
				var meal = require('./routes/homepage/meal');
				meal.visionTower(function (result) {
					console.log(result);
					socket.emit('other message', result);

				})
			}
			else{
				var message = '안녕이랑 학식이랑 날씨라고 입력해봐';
				socket.emit('other message', message);
			}
			//socket.broadcast.emit('other message', msg);
		});
	});
	return io;
}