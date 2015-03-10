# unique-s3-uploader
Client-side S3 CORS uploader for Amazon S3 using server side defined unique file names and file types using signed upload urls.

At Moniker, we use this module when we need to collect data from website visitors for crowd-sourcing purposes. Having clients upload their data directly to S3 saves us from having to worry about scaling issues when thousands of people are uploading data at the same time. All our server needs to do is create a signed upload url, the clients do the rest.

## Bucket settings
You will need to set up your s3 bucket's CORS Configuration to:
```
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
   <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedMethod>GET</AllowedMethod>
        <AllowedMethod>POST</AllowedMethod>
        <AllowedMethod>PUT</AllowedMethod>
        <AllowedHeader>*</AllowedHeader>
    </CORSRule>
</CORSConfiguration>
```

## Javascript
``` javascript
var UniqueS3Uploader = require('./UniqueS3Uploader');
var signUrl = 'http://yourserver.local/getSignedUrl.php';
var uploader = new UniqueS3Uploader(signUrl);

var json = JSON.stringify({
	yourData: 'goes here',
	yourDate: new Date()
});

// Each call to UniqueS3Uploader#upload will upload the data to the same unique file.
// Create a new UniqueS3Uploader to get a new unique uri to upload to
uploader.upload(json), function(error, data) {
	if (error) return console.log(error);
	console.log('Uploaded: ' + data.uri);
});
```

## PHP Example
PHP example is provided for generating of unique filenames and signed upload urls.

To run it:
```
npm install
gulp example
```

Set up your aws settings in:
```
php-example/settings.ini
```

Then serve the www directory through php and load index.html in your browser.

### License

The MIT License (MIT)

Copyright (c) 2015 Moniker

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

