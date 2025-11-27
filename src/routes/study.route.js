import { Router } from 'express';
import * as studyController from '../controllers/study.controller.js';

const router = Router();

router.post('/', studyController.createStudy);

export default router;
