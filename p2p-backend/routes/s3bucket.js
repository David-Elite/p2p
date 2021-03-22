const S3 = require('aws-sdk/clients/s3');

const bucket = new S3(
    {
        secretAccessKey: '+saPvs5PPR6At6Adf6dHfWmJh6nAYOs9QHjMA40L',
        accessKeyId: 'AKIA2AFEKM2Z2U2TWRCE',
        region: 'ap-south-1'
    }
);

module.exports = bucket;