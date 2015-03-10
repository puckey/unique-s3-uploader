var UniqueS3Uploader = require('../../UniqueS3Uploader');

var uploader = new UniqueS3Uploader('getSignedUrl.php');

var count = 0;

function uploaded(error, data) {
	if (error)
		return console.log(error);
	console.log(`Uploaded ${data.uri}`);
}

function uploadJSON() {
	uploader.upload(JSON.stringify({
		yourData: 'goes here',
		yourDate: new Date(),
		yourCount: count++
	}), uploaded);
}

window.onload = function() {
	var button = document.createElement('button');
	var text = document.createTextNode('Click me to upload');
	button.appendChild(text);
	button.addEventListener('click', uploadJSON);
	document.body.appendChild(button);
}
