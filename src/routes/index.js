import { Router } from 'express';
import studyRouter from './study.route.js';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API server running' });
});

router.use('/studies', studyRouter);

export default router;
