const fs = require('fs');
const path = require('path');
const {s3, bucketName} = require('../config/s3.config');

const uploadFiles = (file, dir) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: path.join(bucketName, dir),
    Body: fileStream,
    Key: file.filename
  };

  return s3.upload(uploadParams).promise();
};

module.exports = {uploadFiles};