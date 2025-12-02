import { Router } from 'express';
import {
  addOrIncreaseEmoji,
  getEmojisByStudy,
} from '../controllers/emoji.controller.js';

const router = Router();

// POST /api/studies/:studyId/emoji
router.post('/:studyId/emoji', addOrIncreaseEmoji);

// GET  /api/studies/:studyId/emoji
router.get('/:studyId/emoji', getEmojisByStudy);

export default router;
