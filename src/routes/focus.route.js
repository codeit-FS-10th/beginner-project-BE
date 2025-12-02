import { Router } from 'express';
import * as focusController from '../controllers/focus.controller.js';

const router = Router({ mergeParams: true});

router.post('/', focusController.focusSuccess);

export default router;