import * as habitRepo from "../repositories/habit.repository.js";

// 날짜 관련 유틸
const startOfDay = (date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate());
const startOfNextDay = (date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

// 전체 목록 조회
export async function getHabits(studyId) {
  return habitRepo.findHabitsByStudyId(studyId);
}

// 습관 생성
export async function createHabit(studyId, payload) {
  const { name, days = [] } = payload;

  return habitRepo.createHabit({
    STUDY_ID: studyId,
    WEEK_NUM: 0,
    NAME: name,
    MON: days.includes("MON"),
    TUE: days.includes("TUE"),
    WED: days.includes("WED"),
    THU: days.includes("THU"),
    FRI: days.includes("FRI"),
    SAT: days.includes("SAT"),
    SUN: days.includes("SUN"),
    REG_DATE: new Date(),
    UPT_DATE: new Date(),
  });
}

// 습관 삭제
export async function deleteHabit(habitId) {
  return habitRepo.deleteHabit(habitId);
}

// 오늘의 습관 조회
export async function getTodayHabits(studyId) {
  const today = new Date();
  const todayStart = startOfDay(today);
  const tomorrowStart = startOfNextDay(today);

  const weekMap = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const todayKey = weekMap[today.getDay()];

  const habits = await habitRepo.findTodayHabits(studyId, todayKey);
  const habitIds = habits.map((h) => h.HABIT_ID);
  const records = await habitRepo.findTodayRecords(habitIds, todayStart, tomorrowStart);

  return habits.map((h) => {
    const record = records.find((r) => r.HABIT_ID === h.HABIT_ID);
    return {
      ...h,
      isDoneToday: record ? record.IS_DONE : false,
    };
  });
}

// 오늘 체크 갱신
export async function toggleTodayHabit(habitId, isDone) {
  const today = startOfDay(new Date());
  return habitRepo.upsertRecord(habitId, today, isDone);
}