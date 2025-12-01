import * as habitService from "../services/habit.service.js";

// ========== 컨트롤러 구현 ==========

// 전체 습관 목록 조회 , 오늘의 목록 조회
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
export async function createHabit(req, res, next) {
  try {
    const { studyId } = req.params;
    const result = await habitService.createHabit(studyId, req.body);
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}
// 습관 이름 변경
export async function updateHabit(req, res, next) {
  try {
    const { studyId, habitId } = req.params;
    const result = await habitService.updateHabit(studyId, habitId, req.body);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}


// 습관 삭제
export async function deleteHabit(req, res, next) {
  try {
    const { studyId, habitId } = req.params;
    const result = await habitService.deleteHabit(studyId, habitId);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}


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

// 오늘의 습관 체크/해제
export async function toggleTodayHabit(req, res, next) {
  try {
    const { studyId, habitId } = req.params;
    const { isDone } = req.body;

    const result = await habitService.toggleTodayHabit(studyId, habitId, isDone);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}