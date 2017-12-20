/**
 * Created by chlee1001 on 2017-11-07.
 */

module.exports = function (req, res) {
	// DataBase
	var mysql = require("mysql");
	var express = require('express');
	var app = express();

	var connection = mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "a40844084",
			database: "computerNetwork"
		});
	connection.connect(function (err) {
		if (err) {
			console.log('Error connecting: ' + err.stack);
		} else
			console.log('Connection as id ' + connection.threadId);
	});

	connection.query('SELECT * from restaurantList', function (err, rows, fields) { // DB 호출
		connection.end();
		if (!err) {
			var data = "<html><head><title>식당리스트</title></head>"
				data += "<h1>식당리스트</h1>"
				data += "<table border=\"1\">"
				data += "<tr><th>id</th><th>title</th><th>category</th></th><th>roadAddress</th></th><th>link</th></tr>"

				for (var i in rows) {
					data += "<tr>"
					data += "<td>" + rows[i].id + "</td>"
					data += "<td>" + rows[i].title + "</td>";
					data += "<td>" + rows[i].category + "</td>";
					data += "<td>" + rows[i].roadAddress + "</td>";
					data += "<td>" + rows[i].link + "</td>";
					data += "</tr>"
				}

				data += "</table></html>"

				res.send(data);
		} else
			console.log('Error while performing Query.');
	});

}