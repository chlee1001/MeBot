var finalhandler = require('finalhandler');
var http         = require('http');
var Router       = require('router');
 
var router = Router();

router.get('/keyboard', (req, res) => {
    const menu = {
        type: 'button',
        buttons: ['��ư1', '��ư2', '��ư3']
    };
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(menu));
});

router.post('/message', (req, res) => {
    const _obj = {
        user_key: req.body.user_key,
        type: req.body.type,
        content: req.body.content
    };
    console.log(_obj);

    let message = {
        "message": {
            "text": "���� �޼���..."
        },
        "keyboard": {
            "type": "buttons",
            "buttons": [
                "menu1",
                "menu2",
                "menu3"
            ]
        } 
    };
});
 
var server = http.createServer((req, res) => {
  router(req, res, finalhandler(req, res));
})

server.listen(3000);