import * as habitRepo from "../repositories/habit.repository.js";

// 날짜 관련 유틸
// 주차 계산 함수
function getWeekNumber(date = new Date()) { 
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDays = Math.floor((date - firstDayOfYear) / 864e5);
  return Math.floor((pastDays + firstDayOfYear.getDay() + 1) / 7) + 1;
}

// 날짜 시작 / 다음날 시작 구하기
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
    const now = new Date();

return habitRepo.createHabit({
    STUDY_ID: studyId,
    WEEK_NUM: getWeekNumber(now),
    NAME: name,
    MON: false,
    TUE: false,
    WED: false,
    THU: false,
    FRI: false,
    SAT: false,
    SUN: false,
    REG_DATE: now,
    UPT_DATE: now,
  });
}

// 습관 삭제
export async function deleteHabit(habitId) {
    return habitRepo.deleteHabit(habitId);
}

// 오늘의 습관 조회 일단 전체 조회로.
export async function getTodayHabits(studyId) {
    const today = new Date();
}

// 오늘 체크 갱신
export async function toggleTodayHabit(habitId, isDone) {
    const now = new Date();
    const weekNum = getWeekNumber(now);
    const todayKey = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][now.getDay()];

  const habit = await habitRepo.findHabitById(habitId);


// 주차가 바뀌면 초기화 후 저장
if ( habit.WEEK_NUM !== weekNum) {
    await habitRepo.resetWeek(habitId, weekNum);
}

return habitRepo.updateToday(habitId, todayKey, isDone);
}
