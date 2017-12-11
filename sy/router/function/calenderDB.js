module.exports = function (app, mysql, connection) {
	// DataBase
	var mysql = require("mysql");
	var express = require('express');
	var app = express();

	var db_config = {
		host: "localhost",
		user: "root",
		password: "a40844084",
		database: "computerNetwork"
	};


	function handleDisconnect() {
		var connection = mysql.createConnection(db_config); // Recreate the connection, since
		// the old one cannot be reused.

		connection.connect(function (err) { // The server is either down
			if (err) { // or restarting (takes a while sometimes).
				console.log('error when connecting to db:', err);
				setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
			} // to avoid a hot loop, and to allow our node script to
			else {
				console.log('Connection as id ' + connection.threadId);
				updateDB(connection);
			}
		}); // process asynchronous requests in the meantime.
		// If you're also serving http, display a 503 error.
		connection.on('error', function (err) {
			console.log('db error', err);
			if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
				handleDisconnect(); // lost due to either server restart, or a
			} else { // connnection idle timeout (the wait_timeout
				throw err; // server variable configures this)
			}
		});
	}

	handleDisconnect();
}

function updateDB(connection) {

	request.get(options, function (error, response, body) {
		//request 성공했으면..
		if (!error && response.statusCode == 200) {

} else {
			console.log(' airpollution error ');
			//console.log(' error = ' + response.statusCode);

		}
	});

}	

