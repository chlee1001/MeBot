module.exports = function () {
var cheerio = require('cheerio');

var request = require('request');

 

var url = 'http://blog.naver.com/kkj6369';

 

request(url, function(err, res, html){

    if(err) {throw err};

 

    console.log(html);

});
}
