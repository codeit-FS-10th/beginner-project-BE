import { Router } from 'express';
import * as studyController from '../controllers/study.controller.js';

import habitRouter from "./habit.route.js";

const router = Router();

router.post('/', studyController.createStudy);

router.use("/:studyId/habits", habitRouter);

export default router;
