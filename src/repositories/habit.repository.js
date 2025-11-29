import prisma from "../config/prisma.client.js";

// 전체 습관 목록 조회
export const findHabitsByStudyId = (studyId) => {
  return prisma.hABIT.findMany({
    where: { STUDY_ID: studyId },
    orderBy: { HABIT_ID: "asc" },
  });
};

// 습관 생성
export const createHabit = (data) => {
  return prisma.hABIT.create({ data });
};

// 습관 삭제
export const deleteHabit = (habitId) => {
  return prisma.hABIT.delete({
    where: { HABIT_ID: habitId },
  });
};

// 오늘의 습관 조회
export const findHabitById = (id) =>
  prisma.hABIT.findUnique({
    where: {HABIT_ID: id},
  });

// 오늘 요일 업데이트
export const updateToday = (habitId, todayKey, isDone) =>
  prisma.hABIT.update({
    where: {HABIT_ID: habitId},
    data: {[todayKey]: isDone},
  });

// 주차 초기화 + 요일 초기화
export const resetWeek = (habitId, newWeek) =>
  prisma.hABIT.update({
    where: { HABIT_ID: habitId },
    data: {
      WEEK_NUM: newWeek,
      MON: false,
      TUE: false,
      WED: false,
      THU: false,
      FRI: false,
      SAT: false,
      SUN: false,
    }
});

