
var vision = require('google-vision-api-client');

var requtil = vision.requtil;

//Prepare your service account from trust preview certificated project

var jsonfile = './My First Project-c6eb31f048f8.json';

//Initialize the api

vision.init(jsonfile);

//Build the request payloads

var d = requtil.createRequests().addRequest(

		requtil.createRequest('test1.jpg')

		.withFeature('TEXT_DETECTION', 3)

		.build());

//Do query to the api server

vision.query(d, function (e, r, d) {

	if (e)
		console.log('ERROR:', e);

	result = d.responses[0].fullTextAnnotation.text;
	console.log(result);
});