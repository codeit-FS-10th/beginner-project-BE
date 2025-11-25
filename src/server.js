import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import router from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('OK: Server running (ESM)');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
