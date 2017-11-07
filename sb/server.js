var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs")

	app.get('/', function (req, res) {
		res.send("Hello World\n This page is playground");
	});

var server = app.listen(3003, function () { // port 3003으로 서버 실행
		console.log("Express server has started on port 3003")
	});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
		secret: '@#@$MYSIGN#@$#$',
		resave: false,
		saveUninitialized: true
	}));

var router = require('./start')(app, fs);