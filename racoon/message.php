<?php

$data = json_decode(file_get_contents('php://input'), true);

$content = $data["content"];

if($content == "안녕"){ 

echo <<< EOD

{

    "message": {

        "text": "안녕하세요 주인님"

    }

  
}

EOD;

}

else if($content == "반가워"){

echo <<< EOD

{

    "message": {

        "text" : "저도 반가워요."
    }

}

EOD;

}
else{

echo <<< EOD

{

    "message": {

        "text" : "안녕히 가세요."
    }

}

EOD;

}

?>