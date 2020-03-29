import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.IAM_ACCESS_KEY,
  secretAccessKey: process.env.IAM_SECRET_KEY,
  region: 'sa-east-1',
});

export default new AWS.S3();
