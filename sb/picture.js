module.exports.cloud = function (content, callback) {
var vision = require('google-vision-api-client');
var requtil = vision.requtil;

//Prepare your service account from trust preview certificated project
var jsonfile = './My First Project-c6eb31f048f8.json';

//Initialize the api

vision.init(jsonfile);

//Build the request payloads

const download = require('image-downloader')

// Download to a directory and save with the original filename
const options = {
  url: content,
  dest: './test.jpg'                  // Save to /path/to/dest/image.jpg
}

download.image(options)
  .then(({ filename, image }) => { 
    console.log('File saved to', filename);
	  
var d = requtil.createRequests().addRequest(

		requtil.createRequest('test.jpg')

		.withFeature('TEXT_DETECTION', 3)

		.build())

//Do query to the api server
vision.query(d, function (e, r, d) {

	if (e)
		console.log('ERROR:', e);
	
	result = d.responses[0].fullTextAnnotation.text;
	if(result != null) {
	console.log(result);
	let message = {
				"message": {
					"text": result

				},
			};
			//카톡에 메시지 전송
			return callback(message);
	} else {
		let message = {
				"message": {
					"text": '사진에 text가 없습니다'

				},
			};
			//카톡에 메시지 전송
			return callback(message);
	}
	});
  }).catch((err) => {
    throw err
  })


}
