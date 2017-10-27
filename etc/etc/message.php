<?php

$data = json_decode(file_get_contents('php://input'), true);

$content = $data["content"];

 

if($content == "메뉴1"){ 

echo <<< EOD

{

    "message": {

        "text": "안녕 나는 미봇이야",
		"photo": {

            "url": "http://52.78.69.152/img_m.jpg",

            "width": 240,

            "height": 240

        }

    },

    "keyboard": {

        "type": "buttons",

        "buttons": ["메뉴1", "메뉴2"]

    }

}

EOD;

}

else if ($content == "메뉴2"){
	
	echo <<< EOD
	{
		"message": {
			 "text": "나는 아직 개발중이야"
		},
		"keyboard": {

        "type": "buttons",

        "buttons": ["시작하기", "도움말"]
		}
	}
EOD;
}

else {
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