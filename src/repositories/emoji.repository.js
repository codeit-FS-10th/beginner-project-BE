import prisma from '../config/prisma.client.js';

// 1) 특정 스터디 + 특정 이모지 한 줄 찾기
export async function findEmojiByStudyAndUnicode(studyId, unicode) {
  return prisma.eMOJI.findFirst({
    where: {
      STUDY_ID: studyId,
      UNICODE: unicode,
    },
  });
}

// 2) 새 이모지 row 생성
export async function createEmoji(studyId, unicode) {
  return prisma.eMOJI.create({
    data: {
      STUDY_ID: studyId,
      UNICODE: unicode,
      // COUNTING 은 기본값 0 이면 생략 가능
    },
  });
}

// 3) COUNTING + 1
//   PK 가 UNICODE 라고 가정 (schema.prisma 기준)
export async function increaseEmojiCount(unicode) {
  return prisma.eMOJI.update({
    where: { UNICODE: unicode },
    data: {
      COUNTING: {
        increment: 1,
      },
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
