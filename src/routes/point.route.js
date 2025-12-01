import { Router } from 'express';
import * as pointController from '../controllers/point.controller.js';

const router = Router();

// 포인트 이력 생성
router.post('/:studyId/points/history', pointController.createPointHistory);
router.get('/:studyId/points', pointController.getPointSummary);

export default router;
