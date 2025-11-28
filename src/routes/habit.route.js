import { Router } from "express";
import {
  getHabits, 
  createHabit,
  deleteHabit,
  getTodayHabits,
  toggleTodayHabit,
} from "../controllers/habit.controller.js";

const router = Router({ mergeParams: true });

router.get("/today", getTodayHabits);
router.get("/", getHabits);
router.post("/", createHabit);
router.delete("/:habitId", deleteHabit);
router.patch("/:habitId/today", toggleTodayHabit);

export default router;