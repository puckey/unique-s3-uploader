var request = require('superagent');

class ClientSideS3Uploader {
  constructor (signUrl) {
    this.signUrl = signUrl;
  }

  getUploadSettings(callback) {
    if (this.uploadSettings)
      return setTimeout(() => {
        callback(null, this.uploadSettings);
      }, 0);
    var that = this;
    request
      .get(this.signUrl)
      .set('Accept', 'application/json')
      .end((error, res) => {
        if (error) return callback(error);
        this.uploadSettings = res.body;
        callback(null, this.uploadSettings);
      });
  }

  upload(data, callback) {
    this.getUploadSettings((error, settings) => {
      if (error) return callback(error);
      request
        .put(settings.signedUrl)
        .set({
          'Content-Type': settings.mimeType,
          'x-amz-acl': settings.s3Acl
        })
        .send(data)
        .end(function(error, res) {
          callback(error, {
            res: res,
            uri: settings.uri,
            mimeType: settings.mimeType,
            s3Acl: settings.s3Acl
          })
        });
    });
  }
}

module.exports = ClientSideS3Uploader;