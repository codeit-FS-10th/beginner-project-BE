import { Router } from 'express';
import * as habitController from '../controllers/habit.controller.js';

const router = Router({ mergeParams: true });

router.get('/', habitController.getHabits);
router.get('/today', habitController.getTodayHabits);
router.post('/', habitController.createHabit);
router.patch('/:habitId', habitController.updateHabit);
router.delete('/:habitId', habitController.deleteHabit);
router.patch('/:habitId/today', habitController.toggleTodayHabit);

/**
 * @openapi
 * /api/studies/{studyId}/habits/today:
 *   get:
 *     summary: 오늘 날짜 기준으로 해당 스터디의 오늘의 습관 목록 조회
 *     tags:
 *       - Habit
 *     parameters:
 *       - in: path
 *         name: studyId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 오늘의 습관 목록 조회 성공
 */

/**
 * @openapi
 * /api/studies/{studyId}/habits/{habitId}:
 *   delete:
 *     summary: 습관 삭제
 *     tags:
 *       - Habit
 *     parameters:
 *       - in: path
 *         name: studyId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: habitId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: 습관 삭제 성공
 */

/**
 * @openapi
 * /api/studies/{studyId}/habits/{habitId}/today:
 *   patch:
 *     summary: 오늘의 습관 완료/취소 토글
 *     tags:
 *       - Habit
 *     parameters:
 *       - in: path
 *         name: studyId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: habitId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 오늘의 습관 상태 변경 성공
 */

export default router;
