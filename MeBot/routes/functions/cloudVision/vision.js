/**
 * Created by chlee1001 on 2017.11.24.
 */

var vision = require('google-vision-api-client');
var requtil = vision.requtil;
var request = require('request');
var fs = require('fs');
//var Log = require('/usr/lib/node_modules/log');
//var sizeOf = require('image-size');

var jsonfile = './routes/functions/cloudVision/visionKey.json';
vision.init(jsonfile);

var result;

module.exports.ocr = function (content, callback) {
	//Initialize the api

	//Build the request payloads

	const download = require('image-downloader')

		// Download to a directory and save with the original filename
		const options = {
		url: content,
		dest: './routes/functions/cloudVision/test.jpg' // Save to /path/to/dest/image.jpg
	}

	download.image(options)
	.then(({
			filename,
			image
		}) => {
		console.log('File saved to', filename);

		var d = requtil.createRequests().addRequest(

				requtil.createRequest('./routes/functions/cloudVision/test.jpg')

				.withFeature('TEXT_DETECTION', 3)

				.build())

			//Do query to the api server
			vision.query(d, function (e, r, d) {

				if (e)
					console.log('ERROR:', e);

				result = d.responses[0].fullTextAnnotation.text;
				console.log(result);
				let message = {
					"message": {
						"text": result

					},
				};
				//카톡에 메시지 전송
				return callback(message);
			});
	}).catch ((err) => {
		throw err
	})

}