var vision = require('@google-cloud/vision');

var visionClient = vision({
    projectId: 'mebot-184316',
    credentials: 'visionKey.json'
});

var gcsImageUri = 'gs://gapic-toolkit/President_Barack_Obama.jpg';
var source = {
    gcsImageUri : gcsImageUri
};
var image = {
    source : source
};
var type = vision.v1.types.Feature.Type.FACE_DETECTION;
var featuresElement = {
    type : type
};
var features = [featuresElement];
var requestsElement = {
    image : image,
    features : features
};
var requests = [requestsElement];
visionClient.batchAnnotateImages({requests: requests}).then(function(responses) {
    var response = responses[0];
    // doThingsWith(response)
})
.catch(function(err) {
    console.error(err);
});