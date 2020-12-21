const path = require('path')
const { get } = require('lodash')
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

aws.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: 'us-east-1'
})

const s3 = new aws.S3()

const getStorage = bucket => multerS3({
    s3: s3,
    acl: 'public-read',
    bucket,
    key: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const getUpload = (bucket, fileSize = 10) => multer({
    storage: getStorage(bucket),
    limit: {
        fileSize: 1024 * 1024 * fileSize
    },
})

exports.getArr = (obj, ltr) => get(obj, ltr) || []
exports.getUpload = getUpload
