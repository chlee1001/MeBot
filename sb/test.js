// a simple node app for kakao api

var express = require('express');

var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/keyboard', function (req, res) { // setting keyboard for first open

	let keyboard = {

		"type": "text"

		/*

		or button, like this

		"type" : "buttons",

		"buttons" : ["btn 1", "btn 2", "btn 3"]

		 */

	};

	res.send(keyboard);

});

app.post('/message', function (req, res) {

	let user_key = decodeURIComponent(req.body.user_key); // user's key

	let type = decodeURIComponent(req.body.type); // message type

	let content = decodeURIComponent(req.body.content); // user's message

	console.log(user_key);

	console.log(type);

	console.log(content);

	let answer = {

		"message": {

			"text": "your message is arrieved server : " + content // in case 'text'

		}

	}

	res.send(answer);

	/*

	answer can use
	{

	"message": {

	"text": "������ ������ ���������� ��ϵǾ����ϴ�. �����մϴ�!",

	"photo": {

	"url": "https://photo.src",

	"width": 640,

	"height": 480

	},

	"message_button": {

	"label": "���� �����ޱ�",

	"url": "https://coupon/url"

	}

	},

	"keyboard": {

	"type": "buttons",

	"buttons": [

	"ó������",

	"�ٽ� ����ϱ�",

	"����ϱ�"

	]

	}

	}

	 */

});

app.listen(3003, function () {

	console.log('Connect 3003 port!')

});