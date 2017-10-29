
var vision = require('@google-cloud/vision')({
    projectId: 'mebot-184316',
    credentials: 'visionKey.json'
});

var options = {
    verbose: true,
    types:[
        'properties',
        'label'
    ]
};

function detectImage(work, callback){

    var img = dale2.jpg;
    var workid = work.work;
    vision.detect(img, options, function (err, detections, apiResponse) {
        if (err) {
            if (err) console.log(err);
            callback();
        } else {
            var colors = detections.properties.colors;
            var labels = detections.labels;

            async.parallel([
                function(cb){
                    if (colors.length > 0){
                        addColors(workid, colors, function(err){
                            cb(err, workid);
                        });
                    } else {
                        cb('No Colors', workid);
                    }
                },
                function(cb){
                    if (labels.length > 0){
                        addLabels(workid, labels, function(err){
                            cb(err, workid);
                        });
                    } else {
                        cb('No Labels', workid);
                    }
                }
            ], function(err, result){
                callback();
            });
        }
    });

}