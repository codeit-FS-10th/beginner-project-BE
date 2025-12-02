import { Router } from 'express';
import * as EmojiController from '../controllers/emoji.controller.js';

const router = Router();

/**
 * @openapi
 * /api/studies/{studyId}/emoji:
 *   post:
 *     summary: 스터디에 이모지 추가 또는 카운트 증가
 *     tags:
 *       - Emoji
 *     parameters:
 *       - in: path
 *         name: studyId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 스터디 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - unicode
 *             properties:
 *               unicode:
 *                 type: string
 *                 description: 추가하거나 증가시킬 이모지 유니코드 문자
 *           example:
 *             unicode: "🔥"
 *     responses:
 *       201:
 *         description: 해당 스터디에 이모지가 처음 생성된 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     STUDY_ID:
 *                       type: integer
 *                     UNICODE:
 *                       type: string
 *                     COUNTING:
 *                       type: integer
 *             example:
 *               message: "이모지 첫 생성"
 *               data:
 *                 STUDY_ID: 1
 *                 UNICODE: "🔥"
 *                 COUNTING: 1
 *       200:
 *         description: 기존 이모지의 카운트가 증가한 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     STUDY_ID:
 *                       type: integer
 *                     UNICODE:
 *                       type: string
 *                     COUNTING:
 *                       type: integer
 *             example:
 *               message: "이모지 카운트 증가"
 *               data:
 *                 STUDY_ID: 1
 *                 UNICODE: "🔥"
 *                 COUNTING: 3
 *       400:
 *         description: 유효하지 않은 studyId 이거나 unicode 누락
 *       500:
 *         description: 서버 에러
 *   get:
 *     summary: 스터디에 달린 이모지 목록 조회
 *     tags:
 *       - Emoji
 *     parameters:
 *       - in: path
 *         name: studyId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 스터디 ID
 *     responses:
 *       200:
 *         description: 이모지 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       STUDY_ID:
 *                         type: integer
 *                       UNICODE:
 *                         type: string
 *                       COUNTING:
 *                         type: integer
 *             example:
 *               data:
 *                 - STUDY_ID: 1
 *                   UNICODE: "🔥"
 *                   COUNTING: 3
 *                 - STUDY_ID: 1
 *                   UNICODE: "👍"
 *                   COUNTING: 5
 *       400:
 *         description: 유효하지 않은 studyId
 *       500:
 *         description: 서버 에러
 */

// POST /api/studies/:studyId/emoji
router.post('/:studyId/emoji', EmojiController.addOrIncreaseEmoji);

// GET  /api/studies/:studyId/emoji
router.get('/:studyId/emoji', EmojiController.getEmojisByStudy);

export default router;
