import { Router } from 'express';
import * as studyController from '../controllers/study.controller.js';
import habitRouter from './habit.route.js';

const router = Router();

/**
 * @openapi
 * /api/studies:
 *   get:
 *     summary: 스터디 목록 조회
 *     tags:
 *       - Study
 *     responses:
 *       200:
 *         description: 스터디 목록을 성공적으로 가져옴
 *
 *   post:
 *     summary: 스터디 생성
 *     tags:
 *       - Study
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: 오늘의 습관 스터디
 *               nickname:
 *                 type: string
 *                 example: 킴명
 *               password:
 *                 type: string
 *                 example: "1234"
 *               intro:
 *                 type: string
 *                 example: 열심히 해보자
 *               image:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       201:
 *         description: 생성된 스터디 정보
 */

/**
 * @openapi
 * /api/studies/{studyId}:
 *   get:
 *     summary: 스터디 상세 조회
 *     tags:
 *       - Study
 *     parameters:
 *       - in: path
 *         name: studyId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 스터디 상세 정보
 *
 *   patch:
 *     summary: 스터디 정보 수정
 *     tags:
 *       - Study
 *     parameters:
 *       - in: path
 *         name: studyId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               nickname:
 *                 type: string
 *               password:
 *                 type: string
 *               intro:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: 수정된 스터디 정보
 *
 *   delete:
 *     summary: 스터디 삭제
 *     tags:
 *       - Study
 *     parameters:
 *       - in: path
 *         name: studyId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: 스터디 삭제 성공
 */

/**
 * @openapi
 * /api/studies/{studyId}/verify-password:
 *   post:
 *     summary: 스터디 비밀번호 검증
 *     tags:
 *       - Study
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
 *               password:
 *                 type: string
 *                 example: "1234"
 *     responses:
 *       200:
 *         description: 비밀번호 검증 결과
 */

router.post('/', studyController.createStudy); // 스터디 생성
router.get('/', studyController.getStudy); // 스터디 목록 조회
router.get('/:studyId', studyController.getStudyDetail); // 스터디 단건 조회
router.patch('/:studyId', studyController.updateStudy); // 스터디 수정
router.delete('/:studyId', studyController.deleteStudy); // 스터디 삭제

// 비밀번호 검증 API
router.post('/:studyId/verify-password', studyController.verifyStudyPassword);

// 오늘의 습관 하위 라우트
router.use('/:studyId/habits', habitRouter);

export default router;
