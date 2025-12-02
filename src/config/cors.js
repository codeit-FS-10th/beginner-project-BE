import cors from 'cors';

const allowedOrigins = [
  'http://localhost:5173', // Frontend dev 서버
  'http://localhost:3000', // Backend dev 서버
];

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.warn('❌ Blocked by CORS:', origin);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true, // 쿠키/인증정보 같이 쓸 가능성 있으면 true
});
