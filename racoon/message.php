<?php

$data = json_decode(file_get_contents('php://input'), true);

$today=getdate();
$content = $data["content"];
if($content == "대화"||substr($content,0,6) == "하이"||substr($content,0,3) == "안"){ 
echo <<< EOD
{
    "message": {
"text": "안녕하세요 주인님" }
}
EOD;
}

else if(substr($content,0,6) == "반가"||substr($content,0,6) == "방가"){
echo <<< EOD

    "message": {
        "text" : "반갑습니다 ^^"
    }
}
EOD;
}
else if ($content="날짜"){
echo <<< EOD
{
    "message": {
      "text" :"오늘은 $today[year] 년 $today[mon] 월 $today[mday] 일 $today[weekday] $today[hours]시 $today[minutes]분 $today[seconds]초"
    }
}

EOD;
}



?>