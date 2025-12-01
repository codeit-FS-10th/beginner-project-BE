import { Router } from 'express';
import {
  getHabits,
  createHabit,
  deleteHabit,
  getTodayHabits,
  toggleTodayHabit,
} from '../controllers/habit.controller.js';

const router = Router({ mergeParams: true });

/**
 * @openapi
 * /api/studies/{studyId}/habits:
 *   get:
 *     summary: 특정 스터디의 주간 습관 리스트 조회
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
 *         description: 습관 리스트 조회 성공
 *
 *   post:
 *     summary: 특정 스터디에 새로운 습관 생성
 *     tags:
 *       - Habit
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
 *               name:
 *                 type: string
 *                 example: 하루 30분 코딩
 *               weekNum:
 *                 type: integer
 *                 example: 48
 *     responses:
 *       201:
 *         description: 습관 생성 성공
 */

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

router.get('/today', getTodayHabits);
router.get('/', getHabits);
router.post('/', createHabit);
router.delete('/:habitId', deleteHabit);
router.patch('/:habitId/today', toggleTodayHabit);

export default router;
