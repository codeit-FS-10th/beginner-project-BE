import * as habitRepo from "../repositories/habit.repository.js";

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
    UPD_DATE: new Date(),
  });
}

// 습관 삭제
export async function deleteHabit(habitId) {
  return habitRepo.deleteHabit(habitId);
}