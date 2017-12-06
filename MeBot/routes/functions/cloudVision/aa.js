
	var vision = require('google-vision-api-client');

	var requtil = vision.requtil;

 

//Prepare your service account from trust preview certificated project

	var jsonfile = './visionKey.json';

 

//Initialize the api

	vision.init(jsonfile);

 

//Build the request payloads

	var d = requtil.createRequests().addRequest(

		requtil.createRequest('http://dn-m.talk.kakao.com/talkm/oWJfpczH9i/0ZxdZ3Yqfge8V0piHY8eH0/i_wxu8xwjx91w6.jpg')

		.withFeature('Optical Character Recognition', 3)

		.build()
	);

 

//Do query to the api server

	vision.query(d, function(e, r, d){

		if(e) console.log('ERROR:', e);

		console.log(JSON.stringify(d));

	});

