import express from 'express';
import { configDotenv } from 'dotenv';

import { connectDB } from './db/connectDB.js';

configDotenv();
const app = express();

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(3000, () => {
  connectDB();
  console.log('server is running on port 3000');
});
