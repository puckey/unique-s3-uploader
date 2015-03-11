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

Set up your aws settings in:
```
php-example/settings.ini
```

Then serve the www directory through php and load index.html in your browser.

### License

MIT
