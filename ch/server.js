/**
 * Created by chlee1001 on 2017-10-17.
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs")
 
app.get('/',function(req, res) {
	res.send("Hellow World");
});

var server = app.listen(3000, function(){ // port 3000으로 서버 실행
 console.log("Express server has started on port 3000") 
});
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
 secret: '@#@$MYSIGN#@$#$',
 resave: false,
 saveUninitialized: true
}));

var router = require('./router/main')(app, fs);
