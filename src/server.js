import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

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

// ✅ 모든 API 엔드포인트는 /api 로 시작
app.use('/api', router);

app.listen(ENV.port, () => {
  console.log(`✅ Server running on port ${ENV.port}`);
});
