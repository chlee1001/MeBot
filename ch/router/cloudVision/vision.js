var vision = require('google-vision-api-client');
var requtil = vision.requtil;

//Prepare your service account from trust preview certificated project
var jsonfile = 'visionKey.json';

//Initialize the api
vision.init(jsonfile);

//Build the request payloads
var d = requtil.createRequests().addRequest(
		requtil.createRequest('test.jpg')
		.withFeature('FACE_DETECTION', 3)
		.withFeature('LABEL_DETECTION', 2)
		.build());

//Do query to the api server
vision.query(d, function (e, r, d) {
	if (e)
		console.log('ERROR:', e);
	console.log(JSON.stringify(d));
});