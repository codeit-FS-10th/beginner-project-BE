import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import router from './routes/index.js';
import { ENV } from './config/env.js';
import { corsMiddleware } from './config/cors.js';
import { securityMiddleware } from './config/security.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const app = express();

app.use(corsMiddleware);
app.use(securityMiddleware);
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// 🔹 헬스 체크
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ✅ 모든 API 엔드포인트는 /api 로 시작
app.use('/api', router);

// 🔹 404 + 에러 핸들러 (항상 마지막)
app.use(notFound);
app.use(errorHandler);

app.listen(ENV.port, () => {
  console.log(`✅ Server running on port ${ENV.port}`);
});
