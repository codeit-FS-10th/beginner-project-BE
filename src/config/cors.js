import cors from 'cors';

const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];

export const corsMiddleware = cors({
  origin: allowedOrigins,
  credentials: true,
});
