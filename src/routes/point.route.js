import { Router } from 'express';
import * as pointController from '../controllers/point.controller.js';

const router = Router();

/**
 * @openapi
 * /api/studies/{studyId}/points/history:
 *   post:
 *     summary: 포인트 이력 생성 + 누적 포인트 업데이트
 *     tags:
 *       - Point
 *     parameters:
 *       - in: path
 *         name: studyId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               point:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       201:
 *         description: 생성된 포인트 이력과 최신 누적 포인트 반환
 */

/**
 * @openapi
 * /api/studies/{studyId}/points:
 *   get:
 *     summary: 누적 포인트 + 포인트 이력 목록 조회
 *     tags:
 *       - Point
 *     parameters:
 *       - in: path
 *         name: studyId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 누적 포인트와 이력 목록 조회 성공
 */

router.post('/:studyId/points/history', pointController.createPointHistory);
router.get('/:studyId/points', pointController.getPointSummary);

export default router;
