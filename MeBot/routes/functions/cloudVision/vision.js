/**
 * Created by chlee1001 on 2017.11.24.
 */
module.exports.ocr = function (content, callback) {
	var vision = require('google-vision-api-client');
	var requtil = vision.requtil;
	var request = require('request');
	var fs = require('fs');
	var Log = require('/usr/lib/node_modules/log');
	var sizeOf = require('image-size');

	var tmpfile = './mytmpfile.png';
	var jsonfile = 'visionKey.json';
	vision.init(jsonfile);

	var imgurl = content;
	console.log('module:' + imgurl);
	
	if (imgurl.indexOf('http') > -1) {
		var url = imgurl;
		var req = request.get(url);
		var result;
		req.pipe(fs.createWriteStream(tmpfile));
		req.on('end', function () {
			result = main(tmpfile);
		});
		
		let message = {
			"message": {
				"text": result

			},
		};
		
		return callback(result);
	} else {
		main(imgurl);
	}
}
function main(imgfile) {
	var d = requtil.createRequests().addRequest(
			requtil.createRequest(imgfile)
			.withFeature('TEXT_DETECTION', 50)
			//.withFeature('LABEL_DETECTION', 20)
			.build());

	var imgSize = sizeOf(imgfile);
	console.log(imgSize.width, imgSize.height);

	vision.query(d, function (e, r, d) {
		if (e)
			return console.log('ERROR:', e);

		//log = new Log(JSON.stringify(d), fs.createWriteStream('my.log'));
		//log.debug(JSON.stringify(d.responses[0].fullTextAnnotation.text));

		var result = d.responses[0].fullTextAnnotation.text;
		console.log('visionlog:' + result);

		
		
		return callback(result);

		/*
		if (!d.responses[0].faceAnnotations)
		return;


		//var v = d.responses[0].faceAnnotations[0].boundingPoly.vertices;
		var v = [];
		d.responses[0].faceAnnotations.forEach(function (o) {
		v.push(o.boundingPoly.vertices);
		})
		console.log('-->', v);
		 */
	});
}