const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { v4 } = require("uuid");
require("dotenv").config();

const S3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
  s3BucketEndpoint: false,
  endpoint: "https://s3.amazonaws.com",
});

const getUniqFileName = (originalname) => {
  const name = v4();
  const ext = originalname.split(".").pop();
  return `${name}.${ext}`;
};

let fileName = null;
var handleUploadMiddleware = multer({
  storage: multerS3({
    s3: S3,
    bucket: "leonoronhas-bucket",
    acl: "public-read",
    key: (req, file, cb) => {
      fileName = getUniqFileName(file.originalname);
      cb(null, fileName);
    },
  })
});

module.exports = { S3, handleUploadMiddleware };
