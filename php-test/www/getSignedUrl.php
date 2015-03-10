<?php
ini_set('display_errors', '0');     # don't show any errors...
error_reporting(E_ALL | E_STRICT);  # ...but do log them

$settings = parse_ini_file('../settings.ini');

function getUniqueUri($fileSuffix) {
  // Create a unique id in the form of 2015_0310_1136_58_eab01d96 (year_monthday_hourminute_second_randomizedstring)
  $uid = date_format(date_create(), 'Y_md_Hi_s_').bin2hex(openssl_random_pseudo_bytes(4));
  return "$uid.$fileSuffix";
}

function sign($uri, $settings) {
  $awsKey = $settings['s3_key'];
  $awsSecret = $settings['s3_secret'];
  $bucket = $settings['s3_bucket'];
  $expireTime = time() + 60 * $settings['s3_expire_time']; // in minutes
  $s3Url = 'https://'.$settings['s3_endpoint'];
  $amzHeaders = 'x-amz-acl:'.$settings['s3_acl'];
  $mimeType = $settings['file_mime_type'];
  $toSign = "PUT\n\n$mimeType\n$expireTime\nx-amz-acl:public-read\n/$bucket/$uri";
  $signature = urlencode(base64_encode(hash_hmac('sha1', utf8_encode($toSign), $awsSecret, true)));
  return "$s3Url/$bucket/$uri?AWSAccessKeyId=$awsKey&Expires=$expireTime&Signature=$signature";
}

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Access-Control-Allow-Methods: POST');
header('Content-type: application/json');

$uri = getUniqueUri($settings['file_suffix']);
echo json_encode(array(
    'uri' => $uri,
    'signedUrl' => sign($uri, $settings),
    'mimeType' => $settings['file_mime_type'],
    's3Acl' => $settings['s3_acl']
  ));
?>