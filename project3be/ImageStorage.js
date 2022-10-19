const AWS = require("aws-sdk");
const crypto = require("crypto");
const util = require("util");
const { formControlClasses } = require("@mui/material");
const { CompareSharp } = require("@mui/icons-material");
const randomBytes = util.promisify(crypto.randomBytes);

const region = "ap-southeast-1";
const bucketName = "imagesbucketp3rocket";
const accessKeyId = "AKIASDMQVHSXRYQC36T2";
const secretAccessKey = "RfKAvnQMjSItLP1KqhUNWNHANZoJkMTKk";

const s3 = new AWS.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

async function generateUploadURL() {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex");

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
}

module.exports = generateUploadURL;
