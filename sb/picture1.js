/**
 * Created by starfishda on 2017-12-07.
 */

module.exports.cloud = function (content, callback) {
	var vision = require('google-vision-api-client');
	var requtil = vision.requtil;

	//Prepare your service account from trust preview certificated project
	var jsonfile = './routes/functions/cloudVision/visionKey.json';

	//Initialize the api

	vision.init(jsonfile);

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

		var result;
		//	var checksum=d.responses[0];

		var d = requtil.createRequests().addRequest(

				requtil.createRequest('./routes/functions/cloudVision/test.jpg')

				.withFeature('TEXT_DETECTION', 3)

				.build())

			//Do query to the api server
			vision.query(d, function (e, r, d) {

				if (e)
					console.log('ERROR:', e);

				if (isEmptyObject(d) != 0) {
					result = d.responses[0].fullTextAnnotation.text;
					console.log(result);
					let message = {
						"message": {
							"text": result

						},
					};
					//카톡에 메시지 전송
					return callback(message);

				} else {
					result = 'No text';
					console.log(result);
					let message = {
						"message": {
							"text": result

						},
					};
					//카톡에 메시지 전송
					return callback(message);
				}

			});
	}).catch ((err) => {
		throw err
	})

		function isEmptyObject(obj) {
			return Object.keys(obj.responses[0]).length;
		}
}