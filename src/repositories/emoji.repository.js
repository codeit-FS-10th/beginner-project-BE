import prisma from '../config/prisma.client.js';

// 1) 특정 스터디 + 특정 이모지 한 줄 찾기
export async function findEmojiByStudyAndCode(studyId, code) {
  return prisma.eMOJI.findFirst({
    where: {
      STUDY_ID: studyId,
      CODE: code,
    },
  });
}

// 2) 새 이모지 row 생성
export async function createEmoji(studyId, code) {
  return prisma.eMOJI.create({
    data: {
      STUDY_ID: studyId,
      CODE: code,
      COUNTING: 1,
    },
  });
}

// 3) COUNTING + 1
//   PK 가 UNICODE 라고 가정 (schema.prisma 기준)
export async function increaseEmojiCount(code) {
  return prisma.eMOJI.update({
    where: { CODE: code },
    data: {
      COUNTING: { increment: 1 },
    },
  });
}

// 4) 해당 스터디의 이모지 목록 조회 (옵션)
export async function findEmojisByStudy(studyId) {
  return prisma.eMOJI.findMany({
    where: { STUDY_ID: studyId },
    orderBy: { COUNTING: 'desc' },
  });
}
