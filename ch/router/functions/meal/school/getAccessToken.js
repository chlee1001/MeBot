/**
 * Created by chlee1001 on 2017-11-04.
 */
var request = require("request");
require('date-utils');

const token = 'eKQSrvdomvDQ0LeYLjsMSrzk8HdZS6kevWXUDW7yn5Cgz37BgF';
var dDate = new Date();
var today = dDate.toFormat('YYYY-MM-DD');
console.log(today);
var options = {
	url: 'https://bds.bablabs.com:443/openapi/v1/auths?key=' + token,
	method: 'GET',
};

request.get(options, function (error, response, body) {

	if (!error && response.statusCode == 200) { //request 성공했으면..
		//json 파싱
		var objBody = JSON.parse(response.body);
		console.log(objBody);

	} else {
		console.log('error = ' + response.statusCode);

	}
});