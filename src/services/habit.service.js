import * as habitRepo from "../repositories/habit.repository.js";

// 날짜 관련 유틸
function getWeekNumber(date = new Date()) {
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();

  const today = new Date(y, m, d);
  const dow = today.getDay(); // 일 0 ~ 토 6
  const diffToMon = (dow + 6) % 7; // 월요일과 비교

  const monday = new Date(y, m, d - diffToMon);
  const firstDay = new Date(y, 0, 1);

  const diff = monday - firstDay;
  return Math.floor(diff / 864e5 / 7) + 1;
}

// 전체 목록 조회
export async function getHabits(studyId) {
  const id = Number(studyId);
  if (!id) {
    const err = new Error("studyId가 유효하지 않습니다.");
    err.status = 400;
    throw err;
  }
  const weekNum = getWeekNumber(); // 몇주차
  const habits = await habitRepo.findHabitsByStudyAndWeek(id, weekNum); //studyid, 주차
  return habits;
}

// 습관 생성
export async function createHabit(studyId, payload) {
  const id = Number(studyId);
  if (!id) {
    const err = new Error("studyId가 유효하지 않습니다.");
    err.status = 400;
    throw err;
  }

  const { name } = payload;
  if (!name) {
    const err = new Error("name은 필수입니다.");
    err.status = 400;
    throw err;
  }

  const weekNum = getWeekNumber(); // 이번 주차 구하기
  const newHabit = await habitRepo.createHabit(id, weekNum, name);

  return newHabit;
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
