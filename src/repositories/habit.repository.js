import prisma from "../config/prisma.client.js";

// 전체 습관 목록 조회
export function findHabitsByStudyAndWeek(studyId, weekNum) {
  return prisma.hABIT.findMany({
    where: {
      STUDY_ID: Number(studyId),
      WEEK_NUM: weekNum,
    },
    orderBy: { HABIT_ID: "asc" },
  });
}

// 습관 생성
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

// 습관 이름 변경
export function updateHabitName(studyId, oldName, newName) {
  return prisma.hABIT.updateMany({
    where: { //옛날이름 자리
      STUDY_ID: Number(studyId),
      NAME: oldName,
    },
    data: { //새이름넣기
      NAME: newName,
      UPT_DATE: new Date(),
    },
  });
}

export function findHabitById(habitId) {
  return prisma.hABIT.findUnique({
    where: { HABIT_ID: Number(habitId) },
  }); //어떤습관?
}

export function deleteHabitById(habitId) {
  return prisma.hABIT.delete({
    where: {
      HABIT_ID: Number(habitId),
    },
  });
}

// // 오늘의 습관 조회
// export const findHabitById = (id) =>
//   prisma.hABIT.findUnique({
//     where: {HABIT_ID: id},
//   });

// // 오늘 요일 업데이트
// export const updateToday = (habitId, todayKey, isDone) =>
//   prisma.hABIT.update({
//     where: {HABIT_ID: habitId},
//     data: {[todayKey]: isDone},
//   });

// // 주차 초기화 + 요일 초기화
// export const resetWeek = (habitId, newWeek) =>
//   prisma.hABIT.update({
//     where: { HABIT_ID: habitId },
//     data: {
//       WEEK_NUM: newWeek,
//       MON: false,
//       TUE: false,
//       WED: false,
//       THU: false,
//       FRI: false,
//       SAT: false,
//       SUN: false,
//     }
// });

