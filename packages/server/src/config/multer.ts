import multer from 'multer';
import { resolve, extname } from 'path';
import crypto from 'crypto';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        const fileName = `${res.toString('hex')}${extname(file.originalname)}`;
        if (err) return cb(err, fileName);
        return cb(null, fileName);
      });
    },
  }),
};
