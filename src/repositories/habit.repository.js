import prisma from '../config/prisma.client.js';

export function findHabitsByStudyAndWeek(studyId, weekNum) {
  return prisma.hABIT.findMany({
    where: {
      STUDY_ID: Number(studyId),
      WEEK_NUM: weekNum,
    },
    orderBy: { HABIT_ID: 'asc' },
  });
}

export function createHabit(studyId, weekNum, name) {
  return prisma.hABIT.create({
    data: {
      STUDY_ID: Number(studyId),
      WEEK_NUM: weekNum,
      NAME: name,
      UPT_DATE: new Date(),
    },
  });
}

export function updateHabitName(studyId, oldName, newName) {
  return prisma.hABIT.updateMany({
    where: {
      STUDY_ID: Number(studyId),
      NAME: oldName,
    },
    data: {
      NAME: newName,
      UPT_DATE: new Date(),
    },
  });
}

export function findHabitById(habitId) {
  return prisma.hABIT.findUnique({
    where: { HABIT_ID: Number(habitId) },
  });
}

export function deleteHabitById(habitId) {
  return prisma.hABIT.delete({
    where: {
      HABIT_ID: Number(habitId),
    },
  });
}

export function updateToday(habitId, todayKey, isDone) {
  return prisma.hABIT.update({
    where: { HABIT_ID: Number(habitId) },
    data: {
      [todayKey]: isDone,
      UPT_DATE: new Date(),
    },
  });
}
