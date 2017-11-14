var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs")
var schedule = require('node-schedule');

 
app.get('/',function(req, res) {
	res.send("Hello");
})

var server = app.listen(3001, function(){ 
 console.log("Express server has started on port 3001") 
});
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
 secret: '@#@$MYSIGN#@$#$',
 resave: false,
 saveUninitialized: true
}));

var router = require('./router/start')(app, fs);
