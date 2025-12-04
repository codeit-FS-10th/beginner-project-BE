import * as habitRepo from "../repositories/habit.repository.js";
import * as dateUtil from "../utils/date.util.js";

// 전체 습관 목록 조회
export async function getHabits(studyId) {
  const id = Number(studyId);
  if (Number.isNaN(id)) {
    const err = new Error("studyId가 유효하지 않습니다.");
    err.status = 400;
    throw err;
  }

  const weekNum = dateUtil.getWeekNumber();
  let habits = await habitRepo.findHabitsByStudyAndWeek(id, weekNum);

  // 습관 없으면 전 주차 습관 복사
  if (habits.length === 0) {
    await habitRepo.cloneHabitsToNextWeek(id, weekNum);
    habits = await habitRepo.findHabitsByStudyAndWeek(id, weekNum);
  }

  return habits;
}

// 습관 생성
export async function createHabit(studyId, payload) {
  const id = Number(studyId);
  if (Number.isNaN(id)) {
    const err = new Error("유효한 studyId가 필요합니다.");
    err.status = 400;
    throw err;
  }

  const { name } = payload;
  if (!name) {
    const err = new Error("name은 필수입니다.");
    err.status = 400;
    throw err;
  }

  const weekNum = dateUtil.getWeekNumber();
  return habitRepo.createHabit(id, weekNum, name);
}

// 오늘의 습관 조회
export async function getTodayHabits(studyId) {
  const id = Number(studyId);
  if (Number.isNaN(id)) {
    const err = new Error("studyId가 유효하지 않습니다.");
    err.status = 400;
    throw err;
  }

  const now = dateUtil.getNowKST();
  const weekNum = dateUtil.getWeekNumber();
  const todayKey = dateUtil.getDayFieldFromDate(now);

  let habits = await habitRepo.findHabitsByStudyAndWeek(id, weekNum);

  const result = habits.map(h => ({
    HABIT_ID: h.HABIT_ID,
    NAME: h.NAME,
    isDone: h[todayKey],
  }));

  return {
    serverTime: now.format("YYYY-MM-DD HH:mm:ss"),
    weekNum,
    day: todayKey,
    habits: result,
  };
}

// 오늘의 습관 체크/해제
export async function toggleTodayHabit(studyId, habitId, isDone) {
  const id = Number(studyId);
  const hid = Number(habitId);

  if (Number.isNaN(id) || Number.isNaN(hid)) {
    const err = new Error("유효한 studyId, habitId가 필요합니다.");
    err.status = 400;
    throw err;
  }

  const habit = await habitRepo.findHabitById(hid);
  if (!habit) {
    const err = new Error("해당 습관이 존재하지 않습니다.");
    err.status = 404;
    throw err;
  }

  if (habit.STUDY_ID !== id) {
    const err = new Error("해당 스터디의 습관이 아닙니다.");
    err.status = 403;
    throw err;
  }

  const now = dateUtil.getNowKST();
  const todayKey = dateUtil.getDayFieldFromDate(now);

  // 주차 자동 보정
  if (habit.WEEK_NUM !== dateUtil.getWeekNumber()) {
    throw new Error("이전 주차 습관은 수정할 수 없습니다.");
  }

  const updated = await habitRepo.updateToday(hid, todayKey, isDone);

  return {
    HABIT_ID: hid,
    NAME: updated.NAME,
    isDone: updated[todayKey],
  };
}