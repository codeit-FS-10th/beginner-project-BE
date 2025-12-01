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


// 습관이름변경
export async function updateHabit(studyId, habitId, payload) {
  const id = Number(studyId);
  const hid = Number(habitId);
  if (!id || !hid) {
    const err = new Error("유효한 studyId, habitId가 필요합니다.");
    err.status = 400;
    throw err;
  }

  const { name: newName } = payload;
  if (!newName) {
    const err = new Error("name은 필수입니다.");
    err.status = 400;
    throw err;
  }

  // 기존 습관 찾기
  const habit = await habitRepo.findHabitById(hid);
  if (!habit) {
    const err = new Error("해당 습관을 찾을 수 없습니다.");
    err.status = 404;
    throw err;
  }

  // 같은 이름이면 그냥 성공 처리
  if (habit.NAME === newName) {
    return { message: "변경할 내용 없음", updated: false };
  }

  // STUDY_ID + 기존 NAME 로 전체 업데이트
  const result = await habitRepo.updateHabitName(id, habit.NAME, newName);
  return { updated: result.count, newName };
}


// 습관 삭제
export async function deleteHabit(studyId, habitId) {
  const id = Number(studyId);
  const hid = Number(habitId);

  if (!id || !hid) {
    const err = new Error("유효한 studyId, habitId가 필요합니다.");
    err.status = 400;
    throw err;
  }

  const habit = await habitRepo.findHabitById(hid);
  if (!habit) {
    const err = new Error("해당 습관을 찾을 수 없습니다.");
    err.status = 404;
    throw err;
  }

  // 스터디 ID가 일치하는지
  if (habit.STUDY_ID !== id) {
    const err = new Error("해당 스터디에 속하지 않은 습관입니다.");
    err.status = 403;
    throw err;
  }

  await habitRepo.deleteHabitById(hid);

  return { success: true };
}



export async function getTodayHabits(studyId) {
  const id = Number(studyId);
  if (!id) {
    const err = new Error("studyId가 유효하지 않습니다.");
    err.status = 400;
    throw err;
  }

  const now = new Date();
  const dow = now.getDay();
  const todayField = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][dow];

  const weekNum = getWeekNumber();
  const habits = await habitRepo.findHabitsByStudyAndWeek(id, weekNum);

  const result = habits.map(h => ({
    HABIT_ID: h.HABIT_ID,
    NAME: h.NAME,
    isDone: h[todayField]
  }));

  return {
    serverTime: now,
    weekNum,
    day: todayField,
    habits: result
  };
}


// 오늘의 습관 체크/해제
export async function toggleTodayHabit(studyId, habitId, isDone) {
  const id = Number(studyId);
  const hid = Number(habitId);

  if (!id || !hid) {
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

  // 스터디id 검증
  if (habit.STUDY_ID !== id) {
    const err = new Error("해당 스터디의 습관이 아닙니다.");
    err.status = 403;
    throw err;
  }

  const now = new Date();
  const dow = now.getDay();
  const todayKey = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][dow];

  const weekNum = getWeekNumber();
  if (habit.WEEK_NUM !== weekNum) {
    // 주차가 바뀌었으므로 create 후 update하는 방식 필요하지만,
    // 현재는 신규 생성 순간부터 체크 가능하므로 그냥 업데이트 진행
  }

  const updated = await habitRepo.updateToday(hid, todayKey, isDone);

  return {
    HABIT_ID: hid,
    NAME: updated.NAME,
    isDone: updated[todayKey],
  };
}

