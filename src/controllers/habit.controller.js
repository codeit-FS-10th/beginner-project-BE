import * as habitService from "../services/habit.service.js";

// ========== 컨트롤러 구현 ==========

// 전체 습관 목록 조회
export async function getHabits(req, res, next) {
  try {
    const { studyId } = req.params;
    const result = await habitService.getHabits(studyId);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

// 습관 생성
export const createHabit = async (req, res) => {
  const studyId = +req.params.studyId;
//const { name, days = [] } = req.body;

  try {
    const habit = await habitService.createHabit(studyId, req.body);
    res.status(201).json(habit);
  } catch (err) {
    console.error("Create Habit Error:", err);
    res.status(500).json({ message: "습관 생성 실패" });
  }
};

// 습관 삭제
export const deleteHabit = async (req, res) => {
  const habitId = +req.params.habitId;

  try {
    await habitService.deleteHabit(habitId);
    res.json({ message: "습관 삭제" });
  } catch (err) {
    res.status(500).json({ message: "습관 삭제 실패" });
  }
};

// 오늘의 습관 조회
export const getTodayHabits = async (req, res) => {
  const studyId = +req.params.studyId;

   try {
    const habits = await habitService.getTodayHabits(studyId);
    res.json(habits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "오늘의 습관 불러오기 실패" });
  }
};

// 오늘 체크 갱신
export const toggleTodayHabit = async (req, res) => {
  const habitId = +req.params.habitId;
  const { isDone } = req.body;

  try {
    const record = await habitService.toggleTodayHabit(habitId, isDone);
    res.json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "갱신 실패" });
  }
};