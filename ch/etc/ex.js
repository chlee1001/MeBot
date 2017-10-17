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

router.post('/friend', (req, res) => {
    const user_key = req.body.user_key;
    console.log(`${user_key}���� ���ù濡 �����߽��ϴ�.`);
    
    res.set({
        'content-type': 'application/json'
    }).send(JSON.stringify({success:true}));
});

router.delete('/friend', (req, res) => {
    const user_key = req.body.user_key;
    console.log(`${user_key}���� ���ù��� �����߽��ϴ�.`);
    
    res.set({
        'content-type': 'application/json'
    }).send(JSON.stringify({success:true}));
});