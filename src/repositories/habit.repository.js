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
export const findTodayHabits = (studyId, todayKey) => {
  return prisma.hABIT.findMany({
    where: { STUDY_ID: studyId, [todayKey]: true },
    orderBy: { HABIT_ID: "asc" },
  });
};

// 오늘의 습관 조회
export const findTodayRecords = (habitIds, todayStart, tomorrowStart) => {
  return prisma.hABIT_RECORD.findMany({
    where: {
      HABIT_ID: { in: habitIds },
      DATE: { gte: todayStart, lt: tomorrowStart },
    },
  });
};

// 체크 업서트
export const upsertRecord = (habitId, today, isDone) => {
  return prisma.hABIT_RECORD.upsert({
    where: { HABIT_ID_DATE: { HABIT_ID: habitId, DATE: today } },
    update: { IS_DONE: isDone },
    create: { HABIT_ID: habitId, DATE: today, IS_DONE: isDone },
  });
};