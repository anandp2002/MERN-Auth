import express from 'express';
import { configDotenv } from 'dotenv';

import { connectDB } from './db/connectDB.js';
import authRoutes from './routes/auth.route.js';

configDotenv();
const app = express();

app.use('/api/auth', authRoutes);

app.listen(3000, () => {
  connectDB();
  console.log('server is running on port 3000');
});
