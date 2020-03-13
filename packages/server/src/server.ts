import express, { Request, Response } from 'express';
import 'dotenv/config';
const app = express();

app.get('/', (req: Request, res: Response) => {
  console.log(process.env.DB_HOST);
  res.send('Hello World!');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🚀 Running on port ${port}`);
});
