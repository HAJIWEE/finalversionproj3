const express = require("express");
const router = express.Router();
const { S3Client } = require("@aws-sdk/client-s3");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
const upload = multer();

const region = "ap-southeast-1";
const bucketName = "imagesbucketp3rocket";
const accessKeyId = "AKIASDMQVHSXT2ZO2IBR";
const secretAccessKey = "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";

const s3Client = new S3Client({
  region: region,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
});

class imageRouter {
  constructor(auth) {
    this.auth = auth;
  }
  routes() {
    // // we will insert routes into here later on
    // router.get("/", this.auth, this.controller.getAll.bind(this.controller));
    router.post("/", this.auth, upload.single("file"), async (req, res) => {
      console.log(req.file);
      const filename = req.file.originalname;
      const params = {
        Bucket: bucketName, // The name of the bucket. For example, 'sample_bucket_101'.
        Key: filename, // The name of the object. For example, 'sample_upload.txt'.
        Body: req.file.buffer, // The content of the object. For example, 'Hello world!".
      };
      const results = await s3Client.send(new PutObjectCommand(params));
      return res.send({
        url: `https://${bucketName}.s3.amazonaws.com/${filename}`,
      });
    });
    return router;
  }
}

module.exports = imageRouter;
