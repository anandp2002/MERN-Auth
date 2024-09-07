import express from 'express';
import { configDotenv } from 'dotenv';

import { connectDB } from './db/connectDB.js';
import authRoutes from './routes/auth.route.js';

configDotenv();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); //allow us to parse incoming requests : req.body

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`server is running on : http://localhost:${PORT}`);
});
