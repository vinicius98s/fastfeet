import { Request, Response } from 'express';
import fs from 'fs';
import { promisify } from 'util';

import File from '@models/File';
import s3 from '@config/aws';

const readFileAsync = promisify(fs.readFile);
const unlinkAsync = promisify(fs.unlink);

async function store(req: Request, res: Response): Promise<Response> {
  try {
    const filePath = req.file.path;
    const fileBuffer = await readFileAsync(filePath);

    let path = '';
    if (process.env.NODE_ENV === 'production') {
      const params = {
        Bucket: process.env.S3_BUCKET as string,
        Key: req.file.filename,
        Body: fileBuffer,
      };

      await s3.putObject(params).promise();
      await unlinkAsync(filePath);
      path = `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${req.file.filename}`;
    } else {
      path = req.file.filename;
    }

    const file = await File.create({
      name: req.file.originalname,
      path,
    });

    return res.json({ file });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Error uploading file' });
  }
}

export default {
  store,
};
