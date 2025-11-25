import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import router from './routes/index.js';
import { ENV } from './config/env.js';
import { corsMiddleware } from './config/cors.js';
import { securityMiddleware } from './config/security.js';

dotenv.config();

const app = express();

app.use(corsMiddleware);
app.use(securityMiddleware);
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('OK: Server running (ESM + config)');
});

app.listen(ENV.port, () => {
  console.log(`Server running on port ${ENV.port}`);
});
