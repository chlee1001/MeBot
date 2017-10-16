<?php

$data = json_decode(file_get_contents('php://input'), true);

$content = $data["content"];

 

if($content == "안녕"){ 

echo <<< EOD

{

    "message": {

        "text": "ㅈ ㅏ ㄹ ㅜ ㅁ ㅏ ㄷ ㅣ\\n를 낱말로 만든다면 무엇이 될까?"

    },

    "keyboard": {

        "type": "buttons",

        "buttons": ["동물", "도시", "행성", "물고기"]

    }

}

EOD;

}

else{

echo <<< EOD

{

    "message": {

        "text" : "안녕히 가세요.",

        "photo": {

            "url": "http://52.78.69.152/img_m.jpg",

            "width": 240,

            "height": 240

        }

    }

}

EOD;

}

?>