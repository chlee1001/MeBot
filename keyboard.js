var finalhandler = require('finalhandler');
var http         = require('http');
var Router       = require('router');
 
var router = Router();

router.get('/keyboard', (req, res) => {
  const menu = {
      type: 'buttons',
      buttons: ["�޴�1", "�޴�2", "�޴�3"]
  };

  res.set({
      'content-type': 'application/json'
  }).send(JSON.stringify(menu));
});

router.post('/message', (req, res) => {
    const _obj = {
        user_key: req.body.user_key,
        type: req.body.type,
        content: req.body.content
    };
    let massage = {
        "message": {
            "text": '���� �޼���...'
        },
        "keyboard": {
            "type": "buttons",
            "buttons": [
                "�޴�1",
                "�޴�2",
                "�޴�3"
            ]
        }
    };
    res.set({
        'content-type': 'application/json'
    }).send(JSON.stringify(massage));
});