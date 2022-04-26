import express from 'express';
import * as mongoose from 'mongoose';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';

const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get('/', (req, res) => {
  res.render('Hello World!');
});

app.listen(PORT, () => console.log(`Server is working on ${PORT}`));
