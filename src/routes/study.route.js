import { Router } from 'express';
import * as studyController from '../controllers/study.controller.js';

const router = Router();

router.post('/', studyController.createStudy);
router.get('/', studyController.getStudy);
router.get('/:studyId', studyController.getStudyDetail);

export default router;
