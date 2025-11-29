import prisma from "../config/prisma.client.js";

export const findHabitsByStudyId = (studyId) => {
  return prisma.hABIT.findMany({
    where: { STUDY_ID: studyId },
    orderBy: { HABIT_ID: "asc" },
  });
};

export const createHabit = (data) => {
  return prisma.hABIT.create({ data });
};

export const deleteHabit = (habitId) => {
  return prisma.hABIT.delete({
    where: { HABIT_ID: habitId },
  });
};

export const findTodayHabits = (studyId, todayKey) => {
  return prisma.hABIT.findMany({
    where: { STUDY_ID: studyId, [todayKey]: true },
    orderBy: { HABIT_ID: "asc" },
  });
};

export const findTodayRecords = (habitIds, todayStart, tomorrowStart) => {
  return prisma.hABIT_RECORD.findMany({
    where: {
      HABIT_ID: { in: habitIds },
      DATE: { gte: todayStart, lt: tomorrowStart },
    },
  });
};

export const upsertRecord = (habitId, today, isDone) => {
  return prisma.hABIT_RECORD.upsert({
    where: { HABIT_ID_DATE: { HABIT_ID: habitId, DATE: today } },
    update: { IS_DONE: isDone },
    create: { HABIT_ID: habitId, DATE: today, IS_DONE: isDone },
  });
};