import { Router } from "express";
import * as habitController from "../controllers/habit.controller.js";

const router = Router({ mergeParams: true });

router.get("/today", habitController.getTodayHabits);
router.get("/", habitController.getHabits);
router.post("/", habitController.createHabit);
router.delete("/:habitId", habitController.deleteHabit);
router.patch("/:habitId/today", habitController.toggleTodayHabit);

export default router;