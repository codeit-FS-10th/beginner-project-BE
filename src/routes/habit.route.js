import { Router } from "express";
import * as habitController from '../controllers/habit.controller.js';

const router = Router({ mergeParams: true });

router.get("/", habitController.getHabits);
router.get("/today", habitController.getTodayHabits);
router.post("/", habitController.createHabit);
router.delete("/:habitId", habitController.deleteHabit);
router.patch("/:habitId/today", habitController.toggleTodayHabit);

export default router;